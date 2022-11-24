import React from "react";
import ReviewList from "./reviewList.component";
import { useParams } from 'react-router-dom';
import img from '../photos/movie.jpg';
function Movie(){
    let { movieID } = useParams();
    if(movieID !== "titanic") return(<div>Movie Not Found</div>)
    return (
        <div className="container">
            <div className="d-flex justify-content-center">
            <div className="card mb-3 mt-3" style={{width: "80vw"}}>
                <div className="card-header text-light" style={{backgroundColor: "rgb(30,30,30)"}}>
                    <div className="row  d-flex justify-content-between align-items-center">
                        <div className="col-12 col-md-8 col-lg-9 ps-3 pt-1"><h1>Titanic</h1></div>
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="row d-flex justify-content-end">
                                <div className="text-muted col-6 ps-3">Release Year</div>
                                <div className="text-muted col-6">Duration</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-12 col-md-6 col-lg-4">
                        <img src={img} className="img-fluid" alt="movie poster" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-8">
                    <div className="card-body" style={{minHeight: "100%", backgroundColor: "rgb(240,240,240)"}}>
                        <div className="row d-flex flex-column justify-content-evenly">
                            <div className="pb-3">
                                <button type="button" class="btn btn-outline-dark me-2" style={{width: "fit-content"}}>Romance</button>
                                <button type="button" class="btn btn-outline-dark ms-2 me-2" style={{width: "fit-content"}}>Tragedy</button>
                            </div>
                            <hr />
                            <p className="card-text"><b>Director(s):</b> </p>
                            <hr />
                            <p className="card-text"><b>Cast:</b> </p>
                            <hr />
                            <p className="card-text"><b>Writers:</b> </p>
                            <hr />
                            <p className="card-text"><b>Rating:</b> </p>
                        </div>
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
export default Movie;