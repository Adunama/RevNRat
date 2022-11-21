import React from 'react';
import { Link } from 'react-router-dom';
class NavBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {logged_in: this.props.logged_in, username: this.props.username};
        this.Logout = this.Logout.bind(this);
    }
    Logout(){
        this.props.navCallBack();
    }
    componentDidUpdate(prevProps){
        if(prevProps.logged_in !== this.props.logged_in) {
            this.setState({logged_in: this.props.logged_in});
        }
        if(prevProps.username !== this.props.username) {
            this.setState({username: this.props.username});
        }
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">RnR</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link" href="/">Movies</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/">Restaurants</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/">Hotels</a>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit" id="search-button-navbar">Search</button>
                </form>
                {this.state.logged_in==="false" && <Link to="/login" className=" btn btn-outline-success">Log In</Link>}
                {this.state.logged_in==="false" && <Link to="/signup" className="btn btn-outline-success">Sign Up</Link>}
                {this.state.logged_in==="true" &&
                    <div className="nav-item dropdown">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {this.state.username}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/">Dashboard</a></li>
                                <li><a className="dropdown-item" href={this.user_link}>Profile</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button onClick={this.Logout} className="dropdown-item" type="button">Logout</button></li>
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
export default NavBar;