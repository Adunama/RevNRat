import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/navbar.component';
import Login from './components/login.component';
import Signup from './components/signup.component';
import React from 'react';
import Profile from './components/profile.component';
import EditProfile from './components/editProfile.component';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

class App extends React.Component{
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render(){
    return(
      <Router>
        <NavBar {...this.props}/>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
