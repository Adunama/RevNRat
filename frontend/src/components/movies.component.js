import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; 
import img from '../photos/movie.jpg';
class Movies extends React.Component{
    state = {hovered: [false, false, false]}
    showInfo(a){
        return (
            <div>
                {this.state.hovered[0] && <p>Other Details</p>}
            </div>
        )
    }
    render(){
      return(
        <div style={{backgroundColor: "rgb(230,230,230)", minHeight: "110vh"}}>
            <div className="row d-flex justify-content-evenly align-items-center">
                <div className="col-10 col-md-9 col-lg-8 mt-2 mb-2 pt-1 pb-1">
                    <form className="d-flex" style={{width: "100%"}}>
                        <input className="form-control me-2" type="search" placeholder="Search for Movies" aria-label="SearchRestaurantHotel" />
                        <button className="btn btn-dark" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <hr />
            <div className="row d-flex justify-content-evenly align-items-center">
                <div className="col-10 col-md-6 col-lg-4 mt-2 mb-2 pt-1 pb-1" style={{color: "white", backgroundColor: "black", border: "solid", borderColor: "violet", boxShadow: "2px 2px 2px 1px rgba(200,0,200,0.3)"}}>
                    <h1 style={{textAlign: "center"}}>Suggestions</h1>
                </div>
            </div>
            <div className="row d-flex justify-content-evenly">
                <div className="col-10 col-md-4 col-lg-3" onMouseEnter={() => this.setState({hovered: [true,false,false]})} onMouseLeave={() => this.setState({hovered: [false,false,false]})}>
                <Link to="/movies/titanic" style={{ color: "black", textDecoration: "none"}}>
                <div className="row d-flex justify-content-center">
                    <div style={{width: "80%"}}>
                        <div class="card mt-3 mb-3" style={{border: "solid", borderColor: "violet", boxShadow: "2px 2px 2px 1px rgba(200,0,200,0.3)"}}>
                            <img src={img} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <div className="row d-flex justify-content-center"><h2 style={{width: "fit-content"}}>Title</h2></div>
                                {this.showInfo(0)}
                            </div>
                        </div> 
                    </div>
                </div>
                </Link>
                </div>
                
                <div className="col-10 col-md-4 col-lg-3">
                <Link to="/movies/titanic" style={{ color: "black", textDecoration: "none"}}>
                <div className="row d-flex justify-content-center">
                    <div style={{width: "80%"}}>
                        <div class="card mt-3 mb-3" style={{border: "solid", borderColor: "violet", boxShadow: "2px 2px 2px 1px rgba(200,0,200,0.3)"}}>
                            
                            <img src={img} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <div className="row d-flex justify-content-center"><h2 style={{width: "fit-content"}}>Title</h2></div>
                                {this.showInfo(1)}
                            </div>
                        </div> 
                    </div>
                </div>
                </Link>
                </div>

                <div className="col-10 col-md-4 col-lg-3">
                <Link to="/movies/titanic" style={{ color: "black", textDecoration: "none"}}>
                <div className="row d-flex justify-content-center">
                    <div style={{width: "80%"}}>
                        <div class="card mt-3 mb-3" style={{border: "solid", borderColor: "violet", boxShadow: "2px 2px 2px 1px rgba(200,0,200,0.3)"}}>
                            <img src={img} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <div className="row d-flex justify-content-center"><h2 style={{width: "fit-content"}}>Title</h2></div>
                                {this.showInfo(2)}
                            </div>
                        </div> 
                    </div>
                </div>
                </Link>
                </div>
            </div>
        </div>
      )
    }
}
export default Movies;
