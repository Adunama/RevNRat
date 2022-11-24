import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; 
import img from '../photos/hotel.jpeg';
class Hotels extends React.Component{
    render(){
      return(
        <div style={{backgroundColor: "rgb(230,230,230)", minHeight: "100vh"}}>
            <div className="row d-flex justify-content-evenly">
                <div className="col-10 col-md-4 col-lg-3">
                <Link to="/hotels/1" style={{ textDecoration: "none"}}>
                <div class="card mt-3 mb-3" style={{border: "solid", borderColor: "violet", boxShadow: "2px 2px 2px 1px rgba(200,0,200,0.3)"}}>
                    <img src={img} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <div className="row d-flex justify-content-center"><h2 style={{width: "fit-content", color: "black"}}>Title</h2></div>
                    </div>
                </div> 
                </Link>
                </div>
                
                <div className="col-10 col-md-4 col-lg-3">
                <Link to="/hotels" style={{ textDecoration: "none"}}>
                <div class="card mt-3 mb-3" style={{border: "solid", borderColor: "violet", boxShadow: "2px 2px 2px 1px rgba(200,0,200,0.3)"}}>
                    <img src={img} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <div className="row d-flex justify-content-center"><h2 style={{width: "fit-content", color: "black"}}>Title</h2></div>
                    </div>
                </div> 
                </Link>
                </div>

                <div className="col-10 col-md-5 col-lg-3">
                <Link to="/hotels" style={{ textDecoration: "none"}}>
                <div class="card mt-3 mb-3" style={{border: "solid", borderColor: "violet", boxShadow: "2px 2px 2px 1px rgba(200,0,200,0.3)"}}>
                    <img src={img} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <div className="row d-flex justify-content-center"><h2 style={{width: "fit-content", color: "black"}}>Title</h2></div>
                    </div>
                </div> 
                </Link>
                </div>
            </div>
        </div>
      )
    }
}
export default Hotels;
