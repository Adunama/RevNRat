import React from "react";
import background1 from '../photos/hotel.jpeg';
import background2 from '../photos/movies.jpeg';
class Dashboard extends React.Component{
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center" style={{backgroundImage: `url(${background1})`, minHeight: "95vh", backgroundSize: "cover"}}>
                        <form className="d-flex" style={{width: "80%"}}>
                            <input className="form-control me-2" type="search" placeholder="Search for Restaurants/Hotels" aria-label="SearchRestaurantHotel" />
                            <button className="btn btn-dark" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center" style={{backgroundImage: `url(${background2})`, minHeight: "95vh", backgroundSize: "cover"}}>
                        <form className="d-flex" style={{width: "80%"}}>
                            <input className="form-control me-2" type="search" placeholder="Search for Movies" aria-label="SearchMovies" />
                            <button className="btn btn-dark" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;