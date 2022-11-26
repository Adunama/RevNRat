import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
class EditProfile extends React.Component{
    constructor (props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    state = {
        username: "",
        fullname: "",
        email: "",
        bio: "",
        contact: "",
        sex: "",
        dob: ""
    }
    getUserInfo(){
        axios.get(`http://127.0.0.1:8000/user/${this.props.token}/`)
        .then(res => {
            this.setState({
                username: res.data.user.username,
                email: res.data.user.email,
                fullname: (res.data.fullname),
                bio: (res.data.bio),
                contact: (res.data.contact),
                sex: (res.data.sex),
                dob: (res.data.dob)
            })
        })
    }
    handleSubmit(){
        axios.post(`http://127.0.0.1:8000/user/${this.props.token}/`, {
            fullname: this.state.fullname,
            bio: this.state.bio,
            contact: this.state.contact,
            dob: this.state.dob,
            sex: this.state.sex
        })
    }
    componentDidUpdate(prevProps) {
        if(prevProps.token !== this.props.token){
            this.getUserInfo();
        }
    }
    componentDidMount(){
        this.getUserInfo();
    }
    render(){
        return(
            <div className="container">
            <div className="main-body">
                <form>
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mt-2">
                            <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Hubble_ultra_deep_field.jpg" alt="User" className="rounded-circle" width="150"/>
                                <div className="mt-4">
                                    <h4>{this.state.username}</h4>
                                    <input name="" className="form-control" type="text" placeholder="Write about Yourself" defaultValue={this.state.bio} onChange={(e) => {this.setState({bio: e.target.value})}}/>                                  
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
                                    <input name="" type="text" className="form-control" placeholder="Enter Your Name" defaultValue={this.state.fullname} onChange={(e) => {this.setState({fullname: e.target.value})}}/>
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-center">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col col-lg-6">
                                    {this.state.email}
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-center">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Sex</h6>
                                </div>
                                <div className="col form-check">
                                    {this.state.sex==="Male" ? 
                                        <input className="form-check-input" type="radio" name="sex" id="sex1" value="Male" onChange={(e) => {this.setState({sex: e.target.value})}} defaultChecked/>
                                        :
                                        <input className="form-check-input" type="radio" name="sex" id="sex1" value="Male" onChange={(e) => {this.setState({sex: e.target.value})}}/>
                                    }
                                    <label className="form-check-label" htmlFor="sex1"> Male </label>
                                </div>
                                <div className="col form-check">
                                    {this.state.sex==="Female" ? 
                                        <input className="form-check-input" type="radio" name="sex" id="sex2" value="Female" onChange={(e) => {this.setState({sex: e.target.value})}}defaultChecked/>
                                        :
                                        <input className="form-check-input" type="radio" name="sex" id="sex2" value="Female" onChange={(e) => {this.setState({sex: e.target.value})}}/>
                                    }
                                    <label className="form-check-label" htmlFor="sex2"> Female </label>
                                </div>
                                <div className="col form-check">
                                    {this.state.sex==="Others" ? 
                                        <input className="form-check-input" type="radio" name="sex" id="sex3" value="Others" onChange={(e) => {this.setState({sex: e.target.value})}} defaultChecked/>
                                        :
                                        <input className="form-check-input" type="radio" name="sex" id="sex3" value="Others" onChange={(e) => {this.setState({sex: e.target.value})}}/>
                                    }
                                    <label className="form-check-label" htmlFor="sex3"> Others </label>
                                </div>
                                <div className="col form-check">
                                    {this.state.sex==="Prefer Not to Say" ? 
                                        <input className="form-check-input" type="radio" name="sex" id="sex4" value="Prefer Not to Say" onChange={(e) => {this.setState({sex: e.target.value})}} defaultChecked/>
                                        :
                                        <input className="form-check-input" type="radio" name="sex" id="sex4" value="Prefer Not to Say" onChange={(e) => {this.setState({sex: e.target.value})}}/>
                                    }
                                    
                                    <label className="form-check-label" htmlFor="sex4"> Prefer Not to Say </label>
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-center">
                                <div className="col-sm-3">
                                <h6 className="mb-0">Date Of Birth</h6>
                                </div>
                                <div className="col col-lg-6">
                                <input type="date" id="start" name="trip-start" onChange={(e) => {this.setState({dob: e.target.value})}} defaultValue={this.state.dob} min="1900-01-01" max="2020-12-31" />
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-center">
                                <div className="col-sm-3">
                                <h6 className="mb-0">Contact</h6>
                                </div>
                                <div className="col col-lg-6">
                                    <input name="" type="tel" className="form-control" placeholder="Enter Your Phone Number" onChange={(e) => {this.setState({contact: e.target.value})}} defaultValue={this.state.contact}/>
                                </div>
                            </div>
                            <hr />
                            <div className="row align-items-between">
                                <div className="col">
                                    <Link to="/profile"><button className="btn btn-success" type="submit" onClick={this.handleSubmit}>Save</button></Link>
                                </div>
                                <div className="col d-flex justify-content-end">
                                    <Link className="btn btn-danger" to="/profile">Cancel</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
            </div>
        )
    }
}
export default EditProfile;