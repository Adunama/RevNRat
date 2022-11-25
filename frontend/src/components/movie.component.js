import React from "react";
import axios from "axios";
import ReviewList from "./reviewList.component";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
function Movie(props){
    let { movieID } = useParams();
    const [data, setData] = useState({
        id: movieID,
        title: "",
        runningtime: 0,
        year: 0,
        plotline: "",
        imgurl: "",
        caststr: "",
        directorstr: "",
        genrestr: "",
        reviewlist: []
    });
    const [review, setReview] = useState("");
    const [rating, setRating] = useState();
    const [user, setUser] = useState("");
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/movies/${movieID}`)
        .then(res => {
            setData(res.data)
        })
        axios.get(`http://127.0.0.1:8000/user/${props.token}`)
        .then(res => {
            setUser(res.data.user.username)
        })
    }, [movieID, props.token])
    
    function showGenres(){
        var items = [];
        const jsonFormattedStr = data.genrestr.split(",");
        const genreList = jsonFormattedStr;
        for(var i = 0; i < genreList.length; i++){
            items.push(
                <button type="button" className="btn btn-outline-dark m-1" style={{width: "fit-content"}}>{genreList[i]}</button>
            )
        }
        return items
    }

    function addReview(e){
        e.preventDefault();
        if(props.token === null){
            window.alert("Login to Add a review");
            return;
        }
        axios.post(`http://127.0.0.1:8000/movies/${movieID}/add`, {
            token: props.token,
            description: review,
            rating: rating
        })
        .then(res => {
           setData(res.data)
        })
    }

    function updateReview(e){
        e.preventDefault();
        axios.post(`http://127.0.0.1:8000/movies/${movieID}/update`, {
            token: props.token,
            description: review,
            rating: rating
        })
        .then(res => {
           setData(res.data)
        })
    }

    function showList(arr){
        return <div>{arr}</div>;
    }

    function reviewField(){
        for(var i = 0; i < data.reviewlist.length; i++){
            if(data.reviewlist[i].owner.username === user){
                return(
                <div className="col-12 col-md-10 col-lg-6 ps-5 pe-5">
                    <div className="row d-flex justify-content-center"><h2 style={{textAlign: "center"}}>Edit Review</h2></div>
                    <form onSubmit={(e) => {updateReview(e)}}>
                    <div className="row">
                        <input name="" className="form-control m-2" type="number" min="1" max="5" defaultValue={data.reviewlist[i].rating} placeholder="Enter rating between 1 and 5" onChange={(e) => {setRating(e.target.value)}}/>
                    </div>
                    <div className="row">
                        <input name="" className="form-control m-2" type="text" defaultValue={data.reviewlist[i].description} onChange={(e) => {setReview(e.target.value)}} placeholder="Write what you think" style={{minHeight: "100px"}}/>
                    </div>
                    <div className="row d-flex">
                        <div className="col"><button className="btn btn-info" type="submit">Edit</button></div>
                    </div>
                    </form>
                </div>
                )
            }
        }
        return (
            <div className="col-12 col-md-10 col-lg-6 ps-5 pe-5">
                <div className="row d-flex justify-content-center"><h2 style={{textAlign: "center"}}>Add a Review</h2></div>
                <form onSubmit={(e) => {addReview(e)}}>
                <div className="row">
                    <input name="" className="form-control m-2" type="number" min="1" max="5" placeholder="Enter rating between 1 and 5" onChange={(e) => {setRating(e.target.value)}}/>
                </div>
                <div className="row">
                    <input name="" className="form-control m-2" type="text" onChange={(e) => {setReview(e.target.value)}} placeholder="Write what you think" style={{minHeight: "100px"}}/>
                </div>
                <div className="row d-flex">
                    <div className="col"><button className="btn btn-success" type="submit">Submit</button></div>
                </div>
                </form>
            </div>
        )
    }

    if(data === null) return(<div>Movie Not Found</div>)
    return (
        <div className="container">
            {data && 
            <div>
            <div className="d-flex justify-content-center">
            <div className="card mb-3 mt-3" style={{width: "80vw"}}>
                <div className="card-header text-light" style={{backgroundColor: "rgb(30,30,30)"}}>
                    <div className="row  d-flex justify-content-between align-items-center">
                        <div className="col-12 col-md-8 col-lg-9 ps-3 pt-1"><h1>{data.title}</h1></div>
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="row d-flex justify-content-end">
                                <div className="text-muted col-6 ps-3">{data.year}</div>
                                <div className="text-muted col-6">{data.runningtime}m</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-12 col-md-6 col-lg-4">
                        <img src={data.imgurl} className="img-fluid" alt="movie poster" style={{width: "100%"}} />
                    </div>
                    <div className="col-12 col-md-6 col-lg-8">
                    <div className="card-body" style={{minHeight: "100%", backgroundColor: "rgb(240,240,240)"}}>
                            <div className="row d-flex flex-column justify-content-evenly">
                                <div className="pb-3">
                                    {showGenres()}
                                </div>
                                <hr />
                                {data.plotline !== null && <div><p className="card-text">{data.plotline}</p><hr /></div>}
                                <div className="card-text">Cast: {showList(data.caststr)}</div>
                                <hr />
                                <div className="card-text">Director(s): {showList(data.directorstr)}</div>
                                <hr />
                                {<p className="card-text">Rating: {data.aggrating} </p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <hr />
            <div className="row">
                {reviewField()}
                <div className="col-12 col-md-10 col-lg-6">
                    <div className="row d-flex justify-content-center"><h2 style={{textAlign: "center"}}>User Reviews</h2></div>
                    <ReviewList reviewlist={data.reviewlist}/>
                </div>
            </div>
            </div>
            }
        </div>
    )
}
export default Movie;