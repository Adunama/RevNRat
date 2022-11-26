import React from 'react';
import filled_star from '../photos/filled_star.png';
import empty_star from '../photos/empty_star.png';
function ReviewList({reviewlist}){
    const reviews = reviewlist;
    const showRating = (rating) => {
        var items = [];
        for (var i = 0; i < rating; i++) {
            items.push(
                <div style={{width: "fit-content", margin: "0px", padding: "0px"}}><img src={filled_star} alt="filled star" style={{maxWidth: "20px", margin: "0px"}}/></div>
            );
        }
        for (var j = 0; j < 5-rating; j++) {
            items.push(
                <div style={{width: "fit-content", margin: "0px", padding: "0px"}}><img src={empty_star} alt="empty star" style={{maxWidth: "20px", margin: "0px"}}/></div>
            );
        }
        return items;
    }
    const showItems = () => {
        var items = [];
        for (var i = 0; i < reviews.length; i++) {
            items.push(
                <div className="row m-2 d-flex justify-content-center">
                    <div>
                        <div className="card shadow">
                            <div className="card-header d-flex justify-content-between">
                                <div>{reviews[i].owner.username}</div>
                            </div>
                            <div className="card-body">
                                <div className="row m-1">{showRating(reviews[i].rating)}</div>
                                <p className="m-1">{reviews[i].description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return items;
    };
    return(
        <div className="container">
            {showItems()}
        </div>
    )
}
export default ReviewList;