import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loader from './Loader';
import Header from './Header';
import '../styles/Search.css';

class Search extends Component {
  state = {
    search: '',
    artist: '',
    albums: [],
    isSearchButtonDisabled: true,
    isLoading: false,
    isSearching: false,
  };

  componentDidMount () {
    document.title = 'TrybeTunes | Search';
  }

  validateForm = () => {
    const { search } = this.state;
    const isSearchValid = (search.length > 0);

    this.setState({
      isSearchButtonDisabled: !isSearchValid
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.validateForm();
    });
  };

  onSearchButtonClick = (event) => {
    event.preventDefault();

    const { search } = this.state;

    this.setState({
      search: '',
      artist: search,
      isLoading: true,
    }, async () => {
      const albums = await searchAlbumsAPI(search);

      this.setState({
        albums,
        isSearching: true,
        isLoading: false,
      }, () => {
        this.validateForm();
      });
    });
  };

  render () {
    const {
      search,
      artist,
      albums,
      isSearchButtonDisabled,
      isLoading,
      isSearching,
    } = this.state;

    return (
      <div className="search">
        <Header />

        <div className="search-banner-container">
          <h1 className="search-banner-title">Search</h1>
        </div>

        <form className="search-form-container">
          <input
            className="search-artist-input"
            name="search"
            type="text"
            placeholder="Artist name"
            value={search}
            autoComplete="off"
            onInput={this.onInputChange}
          />

          <button
            className="search-artist-button"
            type="submit"
            disabled={isSearchButtonDisabled}
            onClick={this.onSearchButtonClick}
          >
            Search
          </button>
        </form>

        <div className="search-content-container">
          {
            (isLoading) && <Loader />
          }

          {
            (!isLoading && isSearching && albums.length === 0) && <h1 className="search-empty-title" >No album was found.</h1>
          }

          {
            (!isLoading && isSearching && albums.length > 0) && <h1 className="search-result-title" >{`Albums result by: "${artist}"`}</h1>
          }

          {
            (!isLoading && isSearching && albums.length > 0) && (
              <div className="search-album-container">
                {

                  albums.map((album) => {
                    const {
                      artistName,
                      artworkUrl100,
                      collectionId,
                      collectionName
                    } = album;

                    return (
                      <div key={collectionId} className="search-collection-container">
                        <h1 className="search-collection-title">{collectionName}</h1>

                        <img
                          className="search-collection-image"
                          src={artworkUrl100}
                          alt="Album thumbnail"
                        />

                        <h2 className="search-artist-title">{artistName}</h2>

                        <div className="search-link-container">
                          <Link to={`/album/${collectionId}`}>See Album</Link>
                        </div>
                      </div>);
                  })
                }
              </div>)
          }
        </div>
      </div>
    );
  }
}

export default Search;
