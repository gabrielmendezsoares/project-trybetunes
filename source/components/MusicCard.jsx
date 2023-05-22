import React, { Component } from 'react';
import propTypes from 'prop-types';
import '../styles/MusicCard.css';

class MusicCard extends Component {
  state = {
    favorite: false,
  };

  componentDidMount () {
    this.getFavorite();
  }

  getFavorite = () => {
    const {
      track,
      favoriteSongs,
    } = this.props;

    const isFavoriteSong = favoriteSongs
      .some(({ trackId }) => track.trackId === trackId);

    this.setState({
      favorite: isFavoriteSong,
    });
  };

  onFavoriteButtonClick = () => {
    const {
      track,
      setFavorite,
    } = this.props;

    setFavorite(track);
    this.getFavorite();
  };

  render () {
    const { favorite } = this.state;

    const {
      trackName,
      previewUrl,
    } = this.props;

    return (
      <div className="music-card">
        <h1 className="music-card-title">{trackName}</h1>

        <div className="music-card-container">
          <audio
            className="music-card-audio"
            src={previewUrl}
            alt="Song audio"
            controls
          >
            <track kind="captions" />
          </audio>

          <input
            className="music-card-input"
            type="checkbox"
            checked={favorite}
            onChange={this.onFavoriteButtonClick}
          />
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: propTypes.shape({
    trackId: propTypes.number.isRequired,
    trackName: propTypes.string.isRequired,
  }).isRequired,
  trackId: propTypes.number.isRequired,
  trackName: propTypes.string.isRequired,
  favoriteSongs: propTypes.arrayOf(propTypes.shape({
    trackId: propTypes.number.isRequired,
  })).isRequired,
  previewUrl: propTypes.string.isRequired,
  setFavorite: propTypes.func.isRequired,
};

export default MusicCard;
