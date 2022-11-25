import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function MovieResults(){
    let { searchWord } = useParams();
    const [movies, setMovies] = useState([]);
    const [movieFound, setMovieFound] = useState(true);
    const [newSearchWord, setNewSearchWord] = useState("");
    const [searched, setSearched] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [runTime, setRunTime] = useState(100000);
    const [action, setAction] = useState(false);
    const [drama, setDrama] = useState(false);
    const [comedy, setComedy] = useState(false);
    const [romance, setRomance] = useState(false);
    const [IDS, setIDS] = useState([]);

    let searchQuery = searchWord.replace(/_/g,' ');
    useEffect(()=>{
        setNewSearchWord("");
        setSearched(false);
        axios.post(`http://127.0.0.1:8000/movies/`, {
            searchword: searchQuery,
        })
        .then(res => {
            setMovies(res.data)
            if(res.data.nomoviesfound===true) setMovieFound(false);
            else{
                var ids = []
                for(var i = 0; i < res.data.length; i++){
                    ids.push(res.data[i].id)
                }
                setIDS(ids);
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
        var genres = [];
        if(action) genres.push("Action")
        if(drama) genres.push("Drama")
        if(romance) genres.push("Romance")
        if(comedy) genres.push("Comedy")
        axios.post(`http://127.0.0.1:8000/movies/filter`, {
            id_list: JSON.stringify(IDS),
            rating: minRating,
            maxruntime: runTime,
            genre: JSON.stringify(genres)
        })
        .then(res => {
           setMovies(res.data)
        })
    }

    function showGenres(genres){
        var items = [];
        const jsonFormattedStr = genres.split(",");
        const genreList = jsonFormattedStr;
        for(var i = 0; i < genreList.length; i++){
            items.push(
                <button type="button" className="btn btn-outline-dark m-1" style={{width: "fit-content"}}>{genreList[i]}</button>
            )
        }
        return items
    }

    function showList(arr){
        return <div>{arr}</div>;
    }

    function showMovies(){
        var items = [];
        for (var i = 0; i < movies.length; i++) {
            items.push(
                <div className="col-8">
                <Link to={`/movies/${movies[i].id}`} style={{color: "black", textDecoration: "none"}}>
                <div className="card mb-3 mt-3" style={{width: "100%"}}>
                    <div className="card-header text-light" style={{backgroundColor: "rgb(30,30,30)"}}>
                        <div className="row  d-flex justify-content-between align-items-center">
                            <div className="col-12 col-md-8 col-lg-9 ps-3 pt-1"><h3>{movies[i].title}</h3></div>
                            <div className="col-12 col-md-4 col-lg-3">
                                <div className="row d-flex justify-content-end">
                                    {movies[i].year!==0 && <div className="text-muted col-6 ps-3">{movies[i].year}</div>}
                                    {movies[i].runningtime!==0 && <div className="text-muted col-6">{movies[i].runningtime} m</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 d-flex justify-content-center">
                        {movies[i].imgurl !== null && 
                        <div className="col-12 col-md-6 col-lg-4">
                            <img src={movies[i].imgurl} className="img-fluid" alt="Movie Poster" style={{minWidth: "100%"}}/>
                        </div>
                        }
                        <div className="col-12 col-md-6 col-lg-8">
                        <div className="card-body" style={{minHeight: "100%", backgroundColor: "rgb(240,240,240)"}}>
                            <div className="row d-flex flex-column justify-content-evenly">
                                <div className="pb-3">
                                    {showGenres(movies[i].genrestr)}
                                </div>
                                <hr />
                                {movies[i].plotline !== null && <div><p className="card-text"><b>{movies[i].plotline}</b></p><hr /></div>}
                                <div className="card-text">Cast: {showList(movies[i].caststr)}</div>
                                <hr />
                                <div className="card-text">Director(s): {showList(movies[i].directorstr)}</div>
                                <hr />
                                {<p className="card-text">Rating: {movies[i].ratingstr} </p>}
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
            {searched && <Navigate to={`/movies/search/${newSearchWord}`}></Navigate>}
            <div className="row d-flex justify-content-evenly align-items-center">
                <div className="col-10 col-md-9 col-lg-8 mt-2 mb-2 pt-1 pb-1">
                    <form className="d-flex" style={{width: "100%"}} onSubmit={(e) => {handleSubmit(e)}}>
                        <input className="form-control me-2" type="search" placeholder="Search for Movies" aria-label="SearchRestaurantHotel" onChange={(e) => {setNewSearchWord(e.target.value)}}/>
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
                        <input type="number" onChange={(e) => {setRunTime(e.target.value)}} placeholder="Max runtime"/>
                    </div>
                    <div className="col-12">
                        <input className="form-check-input" type="checkbox" id="Action" value="Action" onChange={(e) => {setAction(e.target.checked)}}/>
                        <label className="form-check-label" htmlFor="Action">Action</label>
                        <input className="form-check-input" type="checkbox" id="Romance" value="Romance" onChange={(e) => {setRomance(e.target.checked)}}/>
                        <label className="form-check-label" htmlFor="Romance">Romance</label>
                        <input className="form-check-input" type="checkbox" id="Drama" value="Drama" onChange={(e) => {setDrama(e.target.checked)}}/>
                        <label className="form-check-label" htmlFor="Drama">Drama</label>
                        <input className="form-check-input" type="checkbox" id="Comedy" value="Comedy" onChange={(e) => {setComedy(e.target.checked)}}/>
                        <label className="form-check-label" htmlFor="Comedy">Comedy</label>
                    </div>
                </div>
                <div className="col">
                    <form onSubmit={(e) => applyFilters(e)}>
                        <button className="btn btn-success" type="submit">Apply Filters</button>
                    </form>
                </div>
            </div>
            <hr />
            {movieFound ? 
                <div className="row d-flex justify-content-center">
                    {showMovies()}
                </div>
            :
                <div style={{textAlign: "center"}}>
                    No Results Found! Please Try Again
                </div>
            }
        </div>
    )
}
export default MovieResults;