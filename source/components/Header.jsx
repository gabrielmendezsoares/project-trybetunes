import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loader from './Loader';
import '../styles/Header.css';

class Header extends Component {
  state = {
    name: '',
    image: '',
    isLoading: true,
  };

  componentDidMount () {
    this.handleUser();
  }

  handleUser = async () => {
    const { name, image } = await getUser();

    this.setState({
      name,
      image,
      isLoading: false,
    });
  };

  render () {
    const {
      name,
      image,
      isLoading,
    } = this.state;

    return (
      <header className="header">
        <div className="header-main-container">
          <h1 className="header-main-title">T</h1>

          <div className="header-navigation-container">
            <div className="header-navigation-link-1">
              <Link to="/search">Search</Link>
            </div>

            <div className="header-navigation-link-2">
              <Link to="/favorites">Favorites</Link>
            </div>

            <div className="header-navigation-link-3">
              <Link to="/profile">Profile</Link>
            </div>
          </div>
        </div>

        {
          (isLoading)
            ? <Loader />
            : (
              <div className="header-profile-container">
                <div className="header-image-container">
                  <img
                    className="header-profile-image"
                    src={image}
                    alt="User image"
                  />
                </div>

                <p className="header-profile-name">{name}</p>
              </div>)
        }
      </header>
    );
  }
}

export default Header;
