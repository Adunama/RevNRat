import React from "react";
import ReviewList from "./reviewList.component";
import img from '../photos/hotel.jpeg';
class Hotel extends React.Component{
    render(){
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                <div className="card mb-3 mt-3" style={{width: "80vw"}}>
                    <div className="card-header text-light" style={{backgroundColor: "rgb(30,30,30)"}}>
                        <div className="row  d-flex justify-content-between align-items-center">
                            <div className="col-12 col-md-8 col-lg-9 ps-3 pt-1"><h1>Hyatt</h1></div>
                            <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-end">
                                <div className="text-muted">Established: Year</div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={img} className="img-fluid" alt="movie poster" />
                        </div>
                        <div className="col-md-8">
                        <div className="card-body" style={{minHeight: "100%", backgroundColor: "rgb(180,180,180)"}}>
                            <p className="card-text"><b>Location:</b> </p>
                            <p className="card-text"><b>Price:</b> </p>
                            <p className="card-text"><b>Availability:</b> </p>
                            <p className="card-text"><b>Rating:</b> </p>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-md-10 col-lg-6 ps-5 pe-5">
                        <div className="row d-flex justify-content-center"><h2 style={{textAlign: "center"}}>Add a Review</h2></div>
                        <form>
                        <div className="row">
                            <input name="" className="form-control m-2" type="text" placeholder="Write what you think" style={{minHeight: "100px"}}/>
                        </div>
                        <div className="row d-flex">
                            <div className="col"><button className="btn btn-success">Submit</button></div>
                        </div>
                        </form>
                    </div>
                    <div className="col-12 col-md-10 col-lg-6">
                        <div className="row d-flex justify-content-center"><h2 style={{textAlign: "center"}}>User Reviews</h2></div>
                        <ReviewList />
                    </div>
                </div>
            </div>
        )
    }
}
export default Hotel;