import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loader from './Loader';
import MusicCard from './MusicCard';
import '../styles/Favorites.css';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    isLoading: true,
  };

  componentDidMount () {
    document.title = 'TrybeTune | Favorites';
    this.handleFavorites();
  }

  handleFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      favoriteSongs,
      isLoading: false,
    });
  };

  setFavorite = (track) => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { favoriteSongs } = this.state;
      const isFavoriteSong = favoriteSongs
        .some(({ trackId }) => track.trackId === trackId);

      if (isFavoriteSong) {
        await removeSong(track);
      } else {
        await addSong(track);
      }

      const stateFavoriteSongs = await getFavoriteSongs();

      this.setState({
        favoriteSongs: stateFavoriteSongs,
        isLoading: false,
      });
    });
  };

  render () {
    const { favoriteSongs, isLoading } = this.state;

    return (
      <div className="favorites">
        <Header />

        <div className="favorites-banner-container">
          <h1 className="favorites-banner-title">Favorites</h1>
        </div>

        {(isLoading)
          ? <Loader />
          : (
            <div className="favorites-list-container">
              {
                favoriteSongs.map((track) => {
                  const {
                    trackId,
                    trackName,
                    previewUrl,
                  } = track;

                  return (
                    <MusicCard
                      key={trackId}
                      track={track}
                      trackId={trackId}
                      trackName={trackName}
                      favoriteSongs={favoriteSongs}
                      previewUrl={previewUrl}
                      setFavorite={this.setFavorite}
                    />
                  );
                })
              }
            </div>)}
      </div>
    );
  }
}

export default Favorites;
