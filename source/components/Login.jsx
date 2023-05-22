import React, { Component } from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loader from './Loader';
import '../styles/Login.css';

class Login extends Component {
  state = {
    name: '',
    isSubmitButtonDisabled: true,
    isLoading: false,
  };

  componentDidMount () {
    document.title = 'TrybeTunes | Login';
  }

  validateForm = () => {
    const { name } = this.state;
    const minimumNameLength = 3;
    const isNameValid = (name.length >= minimumNameLength);

    this.setState({
      isSubmitButtonDisabled: !isNameValid
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

  onSubmitButtonClick = (event) => {
    event.preventDefault();

    const { name } = this.state;
    const { history } = this.props;

    this.setState({
      isLoading: true
    }, async () => {
      await createUser({ name, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjEkZGk1Cl3wt_AwYxUQnT_2YDUzEBvLQXFQ&usqp=CAU' });
      history.push('/search');

      this.setState({
        isLoading: false
      });
    });
  };

  render () {
    const {
      name,
      isSubmitButtonDisabled,
      isLoading
    } = this.state;

    return (
      <div className="login">
        {
          (isLoading)
            ? <Loader />
            : (
              <>
                <form className="login-form">
                  <div className="login-title-container">
                    <h1 className="login-main-title" >T</h1>
                    <h2 className="login-main-subtitle">TrybeTunes</h2>
                  </div>

                  <div className="login-data-container">
                    <input
                      className="login-name-input"
                      name="name"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your name"
                      value={name}
                      onInput={this.onInputChange}
                    />

                    <button
                      id="login-submit-button"
                      className="login-submit-button"
                      type="submit"
                      disabled={isSubmitButtonDisabled}
                      onClick={this.onSubmitButtonClick}
                    >
                      Enter
                    </button>
                  </div>
                </form>
              </>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Login;
