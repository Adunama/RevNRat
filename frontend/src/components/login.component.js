import React from 'react';
class Login extends React.Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.LoginUser = this.LoginUser.bind(this);
    }
    LoginUser(){
        this.props.loginCallBack();
    }
    render(){
        return(
            <div className="align-items-stretch d-flex bg-light" Style="min-height: 100vh;">
                <div className="container-fluid">
                <div className="row justify-content-center align-items-stretch d-flex-row text-center h-100" Style="margin-top: 15vh;">
                    <div className="col-auto col-md-4 col-lg-3 h-50">
                    <div className="card shadow">
                        <h3 className="mt-3 card-title">LOG IN</h3>
                        <div className="card-body mx-auto">
                        <form>
                            <div className="mb-2 form-group input-group">
                                <input name="" type="text" className="form-control" placeholder="Username"  ref= {this.myRef}/>
                            </div>
                            <div className="mt-2 mb-2 form-group input-group">
                                <input name="" type="password" className="form-control" placeholder="Password"  />
                            </div>
                            <div className="mt-2 mb-2 form-group">
                                <button onClick={this.LoginUser} type="submit" className="btn btn-primary btn-block"> Submit </button>
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
export default Login;