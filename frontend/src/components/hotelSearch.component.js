import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function HotelResults(){
    let { searchWord } = useParams();
    const [hotels, setHotels] = useState([]);
    const [hotelFound, setHotelFound] = useState(true);
    const [newSearchWord, setNewSearchWord] = useState("");
    const [searched, setSearched] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [city, setCity] = useState("");
    const [maxPrice, setMaxPrice] = useState(10000000);
    const [cancellable, setCancellable] = useState(false);

    let searchQuery = searchWord.replace(/_/g,' ');
    useEffect(()=>{
        setNewSearchWord("");
        setSearched(false);
        axios.post(`http://127.0.0.1:8000/hotels/search`, {
            searchword: searchQuery,
        })
        .then(res => {
            setHotels(res.data)
            if(res.data.nohotelsfound===true) setHotelFound(false);
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
        axios.post(`http://127.0.0.1:8000/hotels/filter`, {
            city: city,
            rating: minRating,
            price: maxPrice,
            cancellable: cancellable
        })
        .then(res => {
           setHotels(res.data)
        })
    }

    function showHotels(){
        var items = [];
        for (var i = 0; i < hotels.length; i++) {
            items.push(
                <div className="col-8">
                <Link to={`/hotels/${hotels[i].id}`} style={{color: "black", textDecoration: "none"}}>
                <div className="card mb-3 mt-3" style={{width: "100%"}}>
                    <div className="card-header text-light" style={{backgroundColor: "rgb(30,30,30)"}}>
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col"><h3>{hotels[i].name}</h3></div>
                            <div className="col-12 col-2">{hotels[i].city}</div>
                        </div>
                    </div>
                    <div className="row g-0 d-flex justify-content-center">
                        {hotels[i].imgurl !== null && 
                        <div className="col-12 col-md-6 col-lg-4">
                            <img src={hotels[i].imgurl} className="img-fluid" alt="hotel" style={{minWidth: "100%"}}/>
                        </div>
                        }
                        <div className="col-12 col-md-6 col-lg-8">
                        <div className="card-body" style={{minHeight: "100%", backgroundColor: "rgb(240,240,240)"}}>
                            <div className="row d-flex flex-column justify-content-evenly">
                                <div className="pb-3">
                                    {hotels[i].address}
                                </div>
                                <hr />
                                <div className="card-text">Price: {hotels[i].price}</div>
                                <hr />
                                <div className="card-text">Cancellable: {hotels[i].is_free_cancellable}</div>
                                <hr />
                                <div className="card-text">Distance to City Center: {hotels[i].disttocc}</div>
                                <hr />
                                {<p className="card-text">Rating: {hotels[i].aggrating} </p>}
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
            {searched && <Navigate to={`/hotels/search/${newSearchWord}`}></Navigate>}
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
                    <div className="col-12 col-md-6">
                        <input type="number" onChange={(e) => {setMaxPrice(e.target.value)}} placeholder="Max Price"/>
                    </div>
                    <div className="col-12">
                        <input className="form-check-input" type="checkbox" id="Action" value="FreeCancel" onChange={(e) => {setCancellable(e.target.checked)}}/>
                        <label className="form-check-label" htmlFor="FreeCancel">Free Cancellation</label>
                    </div>
                </div>
                <div className="col">
                    <form onSubmit={(e) => applyFilters(e)}>
                        <button className="btn btn-success" type="submit">Apply Filters</button>
                    </form>
                </div>
            </div>
            <hr />
            {hotelFound ? 
                <div className="row d-flex justify-content-center">
                    {showHotels()}
                </div>
            :
                <div style={{textAlign: "center"}}>
                    No Results Found! Please Try Again
                </div>
            }
        </div>
    )
}
export default HotelResults;