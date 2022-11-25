import React from "react";
import background1 from '../photos/hotel.jpeg';
import background2 from '../photos/movies.jpeg';
import { Link } from "react-router-dom";
class Dashboard extends React.Component{
    state = {
        movieSearch: "",
        hotResSearch: ""
    }
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center" style={{backgroundImage: `url(${background1})`, minHeight: "95vh", backgroundSize: "cover"}}>
                        <input className="form-control me-2" type="search" placeholder="Enter City Name" aria-label="SearchRestaurantHotel" onChange={(e) => {this.setState({hotResSearch: e.target.value})}} style={{width: "60%"}}/>
                        <Link to={`hotels/search/${this.state.hotResSearch}`} style={{color: "black", textDecoration: "none"}}><button className="btn btn-dark me-1" type="submit">Hotels</button></Link>
                        <Link to={`restaurants/search/${this.state.hotResSearch}`} style={{color: "black", textDecoration: "none"}}><button className="btn btn-dark" type="submit">Restaurants</button></Link>
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center" style={{backgroundImage: `url(${background2})`, minHeight: "95vh", backgroundSize: "cover"}}>
                        <input className="form-control me-2" type="search" placeholder="Search for Movies" aria-label="SearchMovies" onChange={(e) => {this.setState({movieSearch: e.target.value})}} style={{width: "60%"}}/>
                        <Link to={`movies/search/${this.state.movieSearch}`} style={{color: "black", textDecoration: "none"}}><button className="btn btn-dark" type="submit">Search</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;