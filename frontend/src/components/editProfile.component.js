import React from "react";
import { Link } from "react-router-dom";
class EditProfile extends React.Component{
    render(){
        return(
            <div className="container">
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mt-2">
                            <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Hubble_ultra_deep_field.jpg" alt="User" className="rounded-circle" width="150"/>
                                <div className="mt-4">
                                    <h4>Username</h4>
                                    <form>
                                        <input name="" className="form-control" type="text" placeholder="Write about Yourself" defaultValue="Intro"/>
                                    </form>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 mt-2">
                        <div className="card mb-3">
                            <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Full Name</h6>
                                </div>
                                <div className="col col-lg-6">
                                    <input name="" type="text" className="form-control" placeholder="Enter Your Name" defaultValue="Real Name"/>
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-center">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col col-lg-6">
                                    <input name="" type="email" className="form-control" placeholder="Enter Your Email" defaultValue="example@example.com"/>
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-center">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Sex</h6>
                                </div>
                                <div className="col form-check">
                                    <input className="form-check-input" type="radio" name="sex" id="sex1" value="Male"/>
                                    <label className="form-check-label" for="sex1"> Male </label>
                                </div>
                                <div className="col form-check">
                                    <input className="form-check-input" type="radio" name="sex" id="sex2" value="Female"/>
                                    <label className="form-check-label" for="sex2"> Female </label>
                                </div>
                                <div className="col form-check">
                                    <input className="form-check-input" type="radio" name="sex" id="sex3" value="Others"/>
                                    <label className="form-check-label" for="sex3"> Others </label>
                                </div>
                                <div className="col form-check">
                                    <input className="form-check-input" type="radio" name="sex" id="sex4" value="PNTS"/>
                                    <label className="form-check-label" for="sex4"> Prefer Not to Say </label>
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-center">
                                <div className="col-sm-3">
                                <h6 className="mb-0">Date Of Birth</h6>
                                </div>
                                <div className="col col-lg-6">
                                <input type="date" id="start" name="trip-start" defaultValue="2000-01-01" min="1900-01-01" max="2020-12-31" />
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-center">
                                <div className="col-sm-3">
                                <h6 className="mb-0">Contact</h6>
                                </div>
                                <div className="col col-lg-6">
                                    <input name="" type="tel" className="form-control" placeholder="Enter Your Phone Number"/>
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-between">
                                <div className="col">
                                    <Link className="btn btn-success" to="/profile">Save</Link>
                                </div>
                                <div className="col d-flex justify-content-end">
                                    <Link className="btn btn-danger" to="/profile">Cancel</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default EditProfile;