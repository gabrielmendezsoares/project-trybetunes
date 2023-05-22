import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';
import Profile from './Profile';
import Favorites from './Favorites';
import Album from './Album';
import Search from './Search';
import Login from './Login';
import NotFound from './NotFound';
import '../styles/App.css';

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="project-trybetunes/profile/edit" render={(props) => <ProfileEdit {...props} />} exact />
          <Route path="project-trybetunes/profile" component={Profile} exact />
          <Route path="project-trybetunes/favorites" component={Favorites} exact />
          <Route path="project-trybetunes/album/:id" component={Album} exact />
          <Route path="project-trybetunes/search" component={Search} exact />
          <Route path="project-trybetunes/" render={(props) => <Login {...props} />} exact />
          <Route path="*" component={NotFound} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
