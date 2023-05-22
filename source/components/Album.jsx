import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import MusicCard from './MusicCard';
import Loader from './Loader';
import '../styles/Album.css';

class Album extends Component {
  state = {
    album: {},
    tracks: [],
    favoriteSongs: [],
    isLoading: true,
  };

  componentDidMount () {
    document.title = 'TrybeTunes | Album';
    this.handleAlbum();
  }

  handleAlbum = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const musics = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();
    const album = musics[0];
    const tracks = musics.slice(1);

    this.setState({
      album,
      tracks,
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
    const {
      album: {
        artistName,
        collectionName,
      },
      tracks,
      favoriteSongs,
      isLoading,
    } = this.state;

    return (
      <div className="album">
        <Header />

        {(isLoading)
          ? <Loader />
          : (
            <>
              <div className="album-banner-container">
                <h1 className="album-banner-title">{collectionName || 'Unknown'}</h1>
                <h2 className="album-banner-subtitle">{artistName || 'Unknown'}</h2>
              </div>

              <div className="album-song-container">
                {
                  tracks.map((track) => {
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
              </div>
            </>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
