import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/navbar.component';
import Login from './components/login.component';
import Signup from './components/signup.component';
import React from 'react';
import Profile from './components/profile.component';
import EditProfile from './components/editProfile.component';

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      logged_in: "true", username: "test_user"
    }
    this.LogoutUser = this.LogoutUser.bind(this);
    this.LoginUser = this.LoginUser.bind(this);
  }
  
  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }
  
  LogoutUser(){
    this.setState({
      logged_in: "false"
    });
  }
  LoginUser(){
    this.setState({
      logged_in: "true",
    });
  }
  render(){
    return(
      <Router>
        <NavBar logged_in={this.state.logged_in} username={this.state.username} navCallBack={this.LogoutUser}/>
        <Routes>
          <Route path="/login" element={<Login  loginCallBack = {this.LoginUser}/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </Router>
    )
  }
}

function App() {
  return (
    <Main />
  );
}

export default App;
