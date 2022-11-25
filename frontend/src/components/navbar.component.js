import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import axios from 'axios';
class NavBar extends React.Component{
    state = {
        username: ''
    }
    getUserInfo(){
        axios.get(`http://127.0.0.1:8000/user/${this.props.token}/`)
        .then(res => {
            this.setState({username: res.data.user.username})
        })
    }
    componentDidUpdate(prevProps) {
        if(prevProps.token !== this.props.token){
            this.getUserInfo();
        }
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">RnR</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link" href="/movies">Movies</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/restaurants">Restaurants</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/hotels">Hotels</a>
                    </li>
                </ul>
                {/* <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-light" type="submit" id="search-button-navbar">Search</button>
                </form> */}
                {!this.props.isAuthenticated && <Link to="/login" className="btn btn-outline-light me-2">Log In</Link>}
                {!this.props.isAuthenticated && <Link to="/signup" className="btn btn-outline-light">Sign Up</Link>}
                {this.props.isAuthenticated &&
                    <div className="nav-item dropdown">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {this.state.username}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/">Dashboard</a></li>
                                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={this.props.logout} type="submit" > <a className="dropdown-item" href="/">Logout</a></button></li>
                            </ul>
                            </li>
                        </ul>
                    </div>
                }
                </div>
            </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);