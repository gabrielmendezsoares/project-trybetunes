import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import Loader from './Loader';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    isSubmitButtonDisabled: true,
    isLoading: true,
  };

  componentDidMount () {
    document.title = 'TrybeTunes | Profile Edit';
    this.handleProfile();
  }

  handleProfile = async () => {
    const {
      name,
      email,
      description,
      image,
    } = await getUser();

    this.setState({
      name,
      email,
      description,
      image,
      isLoading: false,
    }, () => {
      this.validateForm();
    });
  };

  validateForm = () => {
    const {
      name,
      email,
      description,
      image,
    } = this.state;

    const minimumNameLength = 3;
    const isNameValid = name.length >= minimumNameLength;
    const isEmailValid = email.length > 0;
    const isDescriptionValid = description.length > 0;
    const isImageValid = image.length > 0;

    const isFormValid = (
      isNameValid
      && isEmailValid
      && isDescriptionValid
      && isImageValid
    );

    this.setState({
      isSubmitButtonDisabled: !isFormValid,
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

  onSubmitButtonClick = () => {
    const {
      name,
      email,
      description,
      image,
    } = this.state;

    this.setState({
      isLoading: true,
    }, async () => {
      const { history } = this.props;

      await updateUser({
        name,
        email,
        description,
        image,
      });

      this.setState({
        isLoading: false,
      });

      history.push('/profile');
    });
  };

  render () {
    const {
      name,
      email,
      description,
      image,
      isSubmitButtonDisabled,
      isLoading,
    } = this.state;

    return (
      <div className="profile-edit">
        <Header />

        <div className="profile-edit-banner-container">
          <h1 className="profile-edit-banner-title">Profile Edit</h1>
        </div>

        <form className="profile-edit-information-container">
          {
            (isLoading) && <Loader />
          }

          {
            (!isLoading)
            && (
              <>
                <div className="profile-edit-preview-container">
                  <img
                    className="profile-edit-user-preview"
                    src={image}
                    alt="Profile image"
                    onError="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjE'"
                  />
                </div>

                <div className="profile-edit-name-container">
                  <label
                    className="profile-edit-user-label"
                    htmlFor="profile-edit-user-name"
                  >
                    Name
                  </label>

                  <input
                    id="profile-edit-user-name"
                    className="profile-edit-user-name"
                    name="name"
                    type="text"
                    value={name}
                    autoComplete="off"
                    onInput={this.onInputChange}
                  />
                </div>

                <div className="profile-edit-email-container">
                  <label
                    className="profile-edit-user-label"
                    htmlFor="profile-edit-user-email"
                  >
                    Email
                  </label>

                  <input
                    id="profile-edit-user-email"
                    className="profile-edit-user-email"
                    name="email"
                    type="text"
                    value={email}
                    autoComplete="off"
                    onInput={this.onInputChange}
                  />
                </div>

                <div className="profile-edit-image-container">
                  <label
                    className="profile-edit-user-label"
                    htmlFor="profile-edit-user-image"
                  >
                    Image
                  </label>

                  <input
                    id="profile-edit-user-image"
                    className="profile-edit-user-image"
                    name="image"
                    type="text"
                    value={image}
                    autoComplete="off"
                    onInput={this.onInputChange}
                  />
                </div>

                <div className="profile-edit-description-container">
                  <label
                    className="profile-edit-user-label"
                    htmlFor="profile-edit-user-description"
                  >
                    Description
                  </label>

                  <textarea
                    id="profile-edit-user-description"
                    className="profile-edit-user-description"
                    name="description"
                    cols="30"
                    rows="10"
                    autoComplete="off"
                    value={description}
                    onInput={this.onInputChange}
                  >
                    {description}
                  </textarea>
                </div>

                <button
                  className="profile-edit-save-button"
                  type="submit"
                  disabled={isSubmitButtonDisabled}
                  onClick={this.onSubmitButtonClick}
                >
                  Save
                </button>
              </>)
          }
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
