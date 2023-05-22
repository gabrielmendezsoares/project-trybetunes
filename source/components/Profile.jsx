import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loader from './Loader';
import '../styles/Profile.css';

class Profile extends Component {
  state = {
    user: {},
    isLoading: true,
  };

  componentDidMount () {
    document.title = 'TrybeTunes | Profile';
    this.handleProfile();
  }

  handleProfile = async () => {
    const user = await getUser();

    this.setState({
      user,
      isLoading: false,
    });
  };

  render () {
    const {
      user: {
        name,
        email,
        image,
        description,
      },
      isLoading,
    } = this.state;

    return (
      <div className="profile">
        <Header />

        <div className="profile-banner-container">
          <h1 className="profile-banner-title">Profile</h1>
        </div>

        <div className="profile-information-container">
          {
            (isLoading) && <Loader />
          }

          {
            (!isLoading)
            && (
              <>
                <div className="profile-preview-container">
                  <img
                    className="profile-user-preview"
                    src={image}
                    alt="Profile image"
                  />
                </div>

                <div className="profile-name-container">
                  <label
                    className="profile-user-label"
                    htmlFor="profile-user-name"
                  >
                    Name
                  </label>

                  <input
                    id="profile-user-name"
                    className="profile-user-name"
                    type="text"
                    value={name}
                    autoComplete="off"
                    disabled={true}
                  />
                </div>

                <div className="profile-email-container">
                  <label
                    className="profile-user-label"
                    htmlFor="profile-user-email"
                  >
                    Email
                  </label>

                  <input
                    id="profile-user-email"
                    className="profile-user-email"
                    type="text"
                    value={email}
                    autoComplete="off"
                    disabled={true}
                  />
                </div>

                <div className="profile-image-container">
                  <label
                    className="profile-user-label"
                    htmlFor="profile-user-image"
                  >
                    Image
                  </label>

                  <input
                    id="profile-user-image"
                    className="profile-user-image"
                    type="text"
                    value={image}
                    autoComplete="off"
                    disabled={true}
                  />
                </div>

                <div className="profile-description-container">
                  <label
                    className="profile-user-label"
                    htmlFor="profile-user-description"
                  >
                    Description
                  </label>

                  <textarea
                    id="profile-user-description"
                    className="profile-user-description"
                    cols="30"
                    rows="10"
                    autoComplete="off"
                    disabled={true}
                  >
                    {description}
                  </textarea>
                </div>

                <div className="profile-edit-button">
                  <Link to="/profile/edit">Edit profile</Link>
                </div>
              </>)
          }
        </div>
      </div>
    );
  }
}

export default Profile;
