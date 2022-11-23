import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import * as actions from '../store/actions/auth';
class Signup extends React.Component {
    state = {}
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.confirm
        );
    }

    compareToFirstPassword = () => {
        if (this.state.password !== this.state.confirm) {
            return (
                <div style={{color: "red", fontSize: "small"}}>Inconsistent Passwords!</div>
            )
        }
        else return true;
    }

    render(){
        return(
            <div>
            <div className = "row justify-content-center">
                    {this.props.error && <h5 style={{textAlign: "center"}}>Request Failed! <br /> Try another Username or check Email<br />Try Again!</h5>}
                    {this.props.token !== null && <Navigate to="/" replace={true} />}
                </div>
            <div className="align-items-stretch d-flex bg-light" style={{minHeight: "100vh"}}>
                <div className="container-fluid">
                <div className="row justify-content-center align-items-stretch d-flex-row text-center h-100" style={{marginTop: "15vh"}}>
                    <div className="col-auto col-md-4 col-lg-3 h-50">
                    <div className="card shadow">
                        <h3 className="mt-3 card-title">SIGN UP</h3>
                        <div className="card-body mx-auto">
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-2 form-group input-group">
                                <input name="" type="text" className="form-control" onChange={(e) => this.setState({username: e.target.value})} placeholder="Username" />
                            </div>
                            <div className="mb-2 form-group input-group">
                                <input name="" type="email" className="form-control" onChange={(e) => this.setState({email: e.target.value})} placeholder="Email Address" />
                            </div>
                            <div className="mt-2 mb-2 form-group input-group">
                                <input name="" type="password" className="form-control" onChange={(e) => this.setState({password: e.target.value})} placeholder="Password"  />
                            </div>
                            <div className="mt-2 mb-2 form-group input-group">
                                <input name="" type="password" className="form-control" onChange={(e) => this.setState({confirm: e.target.value})} placeholder="Repeat Password"  />
                            </div>
                            <div className="mt-2 mb-2">
                                {this.compareToFirstPassword()}
                            </div>
                            <div className="mt-2 mb-2 form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Create Account </button>
                            </div>
                            <p className="text-center">Already Registered?&nbsp;
                            <a href="/login">Log In</a>
                            </p>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        );
    };
}
const mapStateToProps = (state) => {
    return {
        error: state.error,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);