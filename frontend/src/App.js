import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/navbar.component';
import Login from './components/login.component';
import Signup from './components/signup.component';
import React from 'react';
import Profile from './components/profile.component';
import Dashboard from './components/dashboard.component';
import EditProfile from './components/editProfile.component';
import Movie from './components/movie.component';
import Movies from './components/movies.component';
import MovieResults from './components/movieSearch.component';
import Hotel from './components/hotel.component';
import Hotels from './components/hotels.component';
import HotelResults from './components/hotelSearch.component';
import Restaurant from './components/restaurant.component';
import Restaurants from './components/restaurants.components';
import RestaurantResults from './components/restaurantSearch.component';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

class App extends React.Component{
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render(){
    return(
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/restaurants" element={<Restaurants />}/>
          <Route exact path="/restaurants/:restaurantID" element={<Restaurant {...this.props} /> }/>
          <Route exact path="/restaurants/search/:searchWord" element={<RestaurantResults {...this.props} /> }/>
          <Route path="/movies" element={<Movies />}/>
          <Route exact path="/movies/:movieID" element={<Movie {...this.props} /> }/>
          <Route exact path="/movies/search/:searchWord" element={<MovieResults {...this.props} /> }/>
          <Route path="/hotels" element={<Hotels />}/>
          <Route exact path="/hotels/:hotelID" element={<Hotel {...this.props} /> }/>
          <Route exact path="/hotels/search/:searchWord" element={<HotelResults {...this.props} /> }/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile {...this.props}/>} />
          <Route path="/edit-profile" element={<EditProfile {...this.props}/>} />
        </Routes>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
