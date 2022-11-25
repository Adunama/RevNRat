import React from "react";
import axios from "axios";
import ReviewList from "./reviewList.component";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import img from '../photos/restaurant.jpeg'
function Restaurant(props){
    let { restaurantID } = useParams();
    const [data, setData] = useState({
        id: restaurantID,
        aggrating: 0,
        name: "",
        price: 0,
        city: "",
        disttocc: 0,
        imgurl: "",
        is_free_cancellable: "",
        address: "",
        reviewlist: []
    });
    const [review, setReview] = useState("");
    const [rating, setRating] = useState();
    const [user, setUser] = useState("");
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/restaurants/${restaurantID}`)
        .then(res => {
            setData(res.data)
        })
        axios.get(`http://127.0.0.1:8000/user/${props.token}`)
        .then(res => {
            setUser(res.data.user.username)
        })
    }, [restaurantID, props.token])

    function addReview(e){
        e.preventDefault();
        if(props.token === null){
            window.alert("Login to Add a review");
            return;
        }
        axios.post(`http://127.0.0.1:8000/restaurants/${restaurantID}/add`, {
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
        axios.post(`http://127.0.0.1:8000/restaurants/${restaurantID}/update`, {
            token: props.token,
            description: review,
            rating: rating
        })
        .then(res => {
           setData(res.data)
        })
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

    if(data === null) return(<div>Restaurant Not Found</div>)
    return (
        <div className="container">
            {data && 
            <div>
            <div className="d-flex justify-content-center">
            <div className="card mb-3 mt-3" style={{width: "80vw"}}>
                <div className="card-header text-light" style={{backgroundColor: "rgb(30,30,30)"}}>
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col"><h3>{data.name}</h3></div>
                        <div className="col-12 col-2">{data.cityname}</div>
                    </div>
                </div>
                <div className="row g-0 d-flex justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                        <img src={img} className="img-fluid" alt="restaurant" style={{minWidth: "100%"}}/>
                    </div>
                    <div className="col-12 col-md-6 col-lg-8">
                    <div className="card-body" style={{minHeight: "100%", backgroundColor: "rgb(240,240,240)"}}>
                        <div className="row d-flex flex-column justify-content-evenly">
                            <div className="pb-3">
                                {data.address}
                            </div>
                            <hr />
                            <div className="card-text">Cuisine: {data.cuisinetype}</div>
                            <hr />
                            <div className="card-text">Timing: {data.timing}</div>
                            <hr />
                            <div className="card-text">Website: {data.website}</div>
                            <hr />
                            <div className="card-text">Contact: {data.phone}</div>
                            <hr />
                            <div className="card-text">Rating: {data.rating} </div>
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
export default Restaurant;