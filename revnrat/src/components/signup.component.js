import React from 'react';
class Signup extends React.Component {
    render(){
        return(
            <div className="align-items-stretch d-flex bg-light" Style="min-height: 100vh;">
                <div className="container-fluid">
                <div className="row justify-content-center align-items-stretch d-flex-row text-center h-100" Style="margin-top: 15vh;">
                    <div className="col-auto col-md-4 col-lg-3 h-50">
                    <div className="card shadow">
                        <h3 className="mt-3 card-title">SIGN UP</h3>
                        <div className="card-body mx-auto">
                        <form>
                            <div className="mb-2 form-group input-group">
                                <input name="" type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="mb-2 form-group input-group">
                                <input name="" type="email" className="form-control" placeholder="Email Address" />
                            </div>
                            <div className="mt-2 mb-2 form-group input-group">
                                <input name="" type="password" className="form-control" placeholder="Password"  />
                            </div>
                            <div className="mt-2 mb-2 form-group input-group">
                                <input name="" type="password" className="form-control" placeholder="Repeat Password"  />
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
        );
    };
}
export default Signup;