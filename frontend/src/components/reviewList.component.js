import React, { useState } from 'react';
import filled_star from '../photos/filled_star.png';
import empty_star from '../photos/empty_star.png';
import InfiniteScroll from "react-infinite-scroller";
function ReviewList(){
    const reviews = new Array(17).fill().map(() => ({
        author: "Username",
        Rating: 5,
        Date: "August 6, 2021",
        Review: "Nice! uag puqg piueh hf viegh bvojdgh 8erg eqpg ege gouqeg oujab voug oukagv97igb uegvaoeukgvb yhdbtlihbvbi8adyg vl,hdvibyg l,habvlo7eat blae",
    }));
    const itemsPerPage = 5;
    const [hasMore, setHasMore] = useState(true);
    const [records, setrecords] = useState(0);
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
        for (var i = 0; i < records; i++) {
            items.push(
                <div className="row m-2 d-flex justify-content-center">
                    <div>
                        <div className="card shadow">
                            <div className="card-header d-flex justify-content-between">
                                <div>{reviews[i].author}</div>
                                <div className='text-muted'>{reviews[i].Date}</div>
                            </div>
                            <div className="card-body">
                                <div className="row m-1">{showRating(reviews[i].Rating)}</div>
                                <p className="m-1">{reviews[i].Review}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return items;
    };
    const loadMore = () => {
        if (records === reviews.length) {
            setHasMore(false);
        } else if(records + itemsPerPage <= reviews.length){
            setTimeout(() => {
            setrecords(records + itemsPerPage);
            }, 2000);
        } else {
            setTimeout(() => {
            setrecords(reviews.length);
            }, 2000);
        }
    };
    return(
        <div className="container">
            {showItems()}
        </div>
    )
}
export default ReviewList;