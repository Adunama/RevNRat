import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        console.log(this.state);
        this.props.onAuth(this.state.username, this.state.password);
    }
    render(){
        return(
            <div className="align-items-stretch d-flex bg-light" style={{minHeight: "100vh"}}>
                <div className="container-fluid">
                <div className="row justify-content-center align-items-stretch d-flex-row text-center h-100" style={{marginTop: "15vh"}}>
                    <div className="col-auto col-md-4 col-lg-3 h-50">
                    <div className="card shadow">
                        <h3 className="mt-3 card-title">LOG IN</h3>
                        <div className="card-body mx-auto">
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-2 form-group input-group">
                                <input name="" type="text" className="form-control" onChange={(e) => this.setState({username: e.target.value})} placeholder="Username"/>
                            </div>
                            <div className="mt-2 mb-2 form-group input-group">
                                <input name="" type="password" className="form-control" onChange={(e) => this.setState({password: e.target.value})} placeholder="Password"/>
                            </div>
                            <div className="mt-2 mb-2 form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Submit </button>
                            </div>
                            <p className="text-center">First Time?&nbsp;
                            <a href="/signup">Sign Up</a>
                            </p>
                        </form>
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
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);