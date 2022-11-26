import img from '../photos/restaurant.jpeg';
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function RestaurantResults(){
    let { searchWord } = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantFound, setRestaurantFound] = useState(true);
    const [newSearchWord, setNewSearchWord] = useState("");
    const [searched, setSearched] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [city, setCity] = useState("");

    let searchQuery = searchWord.replace(/_/g,' ');
    useEffect(()=>{
        setNewSearchWord("");
        setSearched(false);
        axios.post(`http://127.0.0.1:8000/restaurants/search`, {
            searchword: searchQuery,
        })
        .then(res => {
            setRestaurants(res.data)
            if(res.data.norestaurantsfound===true) setRestaurantFound(false);
            else{
                setCity(res.data[0].city);
            }
        })
    }, [searchQuery])

    function handleSubmit(e){
        e.preventDefault();
        setSearched(true);
        let newQuery = newSearchWord.replace(/ /g, '_');
        setNewSearchWord(newQuery);
    }

    function applyFilters(e){
        e.preventDefault();
        axios.post(`http://127.0.0.1:8000/restaurants/filter`, {
            city: city,
            rating: minRating,
        })
        .then(res => {
           setRestaurants(res.data)
        })
    }

    function showRestaurants(){
        var items = [];
        for (var i = 0; i < restaurants.length; i++) {
            items.push(
                <div className="col-10 col-md-8">
                <Link to={`/restaurants/${restaurants[i].id}`} style={{color: "black", textDecoration: "none"}}>
                <div className="card mb-3 mt-3" style={{width: "80%"}}>
                    <div className="card-header text-light" style={{backgroundColor: "rgb(30,30,30)"}}>
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col"><h3>{restaurants[i].name}</h3></div>
                            <div className="col-12 col-2">{restaurants[i].cityname}</div>
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
                                    {restaurants[i].address}
                                </div>
                                <hr />
                                <div className="card-text">Cuisine: {restaurants[i].cuisinetype}</div>
                                <hr />
                                <div className="card-text">Timing: {restaurants[i].timing}</div>
                                <hr />
                                <div className="card-text">Website: {restaurants[i].website}</div>
                                <hr />
                                <div className="card-text">Contact: {restaurants[i].phone}</div>
                                <hr />
                                <div className="card-text">Rating: {restaurants[i].rating} </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                </Link>
                </div>
            );
        }
        return items;
    }

    return (
        <div style={{backgroundColor: "rgb(230,230,230)", minHeight: "110vh"}}>
            {searched && <Navigate to={`/restaurants/search/${newSearchWord}`}></Navigate>}
            <div className="row d-flex justify-content-evenly align-items-center">
                <div className="col-10 col-md-9 col-lg-8 mt-2 mb-2 pt-1 pb-1">
                    <form className="d-flex" style={{width: "100%"}} onSubmit={(e) => {handleSubmit(e)}}>
                        <input className="form-control me-2" type="search" placeholder="Enter a City" onChange={(e) => {setNewSearchWord(e.target.value)}}/>
                        <button className="btn btn-dark" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <hr />
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-6" style={{textAlign: "center"}}>
                    Showing Results For: {searchQuery}
                </div>
            </div>
            <hr />
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-2" style={{textAlign: "center"}}>
                    Filters:
                </div>
                <div className="col-12 col-md-8">
                    <div className="col-12 col-md-6">
                        <input type="number" onChange={(e) => {setMinRating(e.target.value)}} placeholder="Min Rating"/>
                    </div>
                </div>
                <div className="col">
                    <form onSubmit={(e) => applyFilters(e)}>
                        <button className="btn btn-success" type="submit">Apply Filters</button>
                    </form>
                </div>
            </div>
            <hr />
            {restaurantFound ? 
                <div className="row d-flex justify-content-center">
                    {showRestaurants()}
                </div>
            :
                <div style={{textAlign: "center"}}>
                    No Results Found! Please Try Again
                </div>
            }
        </div>
    )
}
export default RestaurantResults;