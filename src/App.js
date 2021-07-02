import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import MovieList from './components/movie/MoviesList';
import AddMovie from './components/movie/AddMovie';
import MovieDetails from './components/movie/MovieDetails';
import Login from './components/login/Login';
import NotFound from './components/404';
import EditMovie from './components/movie/EditMovie';
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <div className="container">
          <Switch>
            <Route path="/" exact > <MovieList /> </Route>
            <Route path="/addMovie" exact > <AddMovie /> </Route>
            <Route path="/movieDetail/:id" param={'id'}> <MovieDetails /> </Route>
            <Route path="/editMovie/:id" exact > <EditMovie /> </Route>
            <Route path="/login" exact > <Login /> </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
