import React from 'react';
class Login extends React.Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.LoginUser = this.LoginUser.bind(this);
    }
    LoginUser(){
        this.props.loginCallBack(this.myRef.current.name);
    }
    render(){
        return(
            <div class="align-items-stretch d-flex bg-light" Style="min-height: 100vh;">
                <div class="container-fluid">
                <div class="row justify-content-center align-items-stretch d-flex-row text-center h-100" Style="margin-top: 15vh;">
                    <div class="col-auto col-md-4 col-lg-3 h-50">
                    <div class="card shadow">
                        <h3 class="mt-3 card-title">LOG IN</h3>
                        <div class="card-body mx-auto">
                        <form>
                            <div class="mb-2 form-group input-group">
                                <input name="" type="text" class="form-control" placeholder="Username"  ref= {this.myRef}/>
                            </div>
                            <div class="mt-2 mb-2 form-group input-group">
                                <input name="" type="password" class="form-control" placeholder="Password"  />
                            </div>
                            <div class="mt-2 mb-2 form-group">
                                <button onClick={this.LoginUser} type="submit" class="btn btn-primary btn-block"> Submit </button>
                            </div>
                            <p class="text-center">First Time?&nbsp;
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