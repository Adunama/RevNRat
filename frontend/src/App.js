import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/navbar.component';
import Login from './components/login.component';
import Signup from './components/signup.component';
import React from 'react';

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {logged_in: "false", username: ""};
    this.LogoutUser = this.LogoutUser.bind(this);
    this.LoginUser = this.LoginUser.bind(this);
  }
  LogoutUser(){
    this.setState({
      logged_in: "false"
    });
  }
  LoginUser(user){
    this.setState({
      logged_in: "true",
      username: user
    });
  }
  render(){
    return(
      <Router>
        <NavBar logged_in={this.state.logged_in} username={this.state.username} navCallBack={this.LogoutUser}/>
        <Routes>
          <Route path="/login" element={<Login  loginCallBack = {this.LoginUser}/>}/>
          <Route path="/signup" element={<Signup/>} />
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
