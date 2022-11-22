import React, { useState } from 'react';
import filled_star from '../photos/filled_star.png';
import empty_star from '../photos/empty_star.png';
import InfiniteScroll from "react-infinite-scroller";
import { Link } from 'react-router-dom';
function Profile(){
    const reviews = new Array(17).fill().map(() => ({
        author: "Username",
        Rating: 3,
        Date: "August 6, 2021",
        ReviewOf: "Hotel XYZ",
        Review: "Nice Place! uag puqg piueh hf viegh bvojdgh 8erg eqpg ege gouqeg oujab voug oukagv97igb uegvaoeukgvb yhdbtlihbvbi8adyg vl,hdvibyg l,habvlo7eat blae",
    }));
    const showRating = (rating) => {
        var items = [];
        for (var i = 0; i < rating; i++) {
            items.push(
                <div Style="width: fit-content; margin: 0px; padding: 0px"><img src={filled_star} alt="filled star" Style="max-width: 20px; margin: 0px"/></div>
            );
        }
        for (var j = 0; j < 5-rating; j++) {
            items.push(
                <div Style="width: fit-content; margin: 0px; padding: 0px"><img src={empty_star} alt="empty star" Style="max-width: 20px"/></div>
            );
        }
        return items;
    }
    const showItems = (posts) => {
        var items = [];
        for (var i = 0; i < records; i++) {
            items.push(
                <div className="row m-2 d-flex justify-content-center gutters-sm">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="card shadow">
                            <div className="card-header d-flex justify-content-between">
                                <div>{reviews[i].author}</div>
                                <div className='text-muted'>{reviews[i].Date}</div>
                            </div>
                            <div className="card-body">
                                <div className="row m-1">{showRating(reviews[i].Rating)}</div>
                                <p className="m-1">{reviews[i].Review}</p>
                            </div>
                            <div className="card-footer">
                                <p>{reviews[i].ReviewOf}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return items;
    };
    const itemsPerPage = 5;
    const [hasMore, setHasMore] = useState(true);
    const [records, setrecords] = useState(0);
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
        <div className="main-body">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card mt-2">
                        <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Hubble_ultra_deep_field.jpg" alt="User" className="rounded-circle" width="150"/>
                            <div className="mt-4">
                                <h4>Username</h4>
                                <p className="text-secondary mb-1">Intro</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mt-2">
                    <div className="card mb-3">
                        <div className="card-body">
                        <div className="row justify-content-end align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Full Name</h6>
                            </div>
                            <div className="col"> Real Name </div>
                            <div className="col d-flex justify-content-end">
                            <Link className="btn btn-primary" to="/edit-profile">Edit Details</Link>
                            </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col"> example@example.com </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Sex</h6>
                            </div>
                            <div className="col">  </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Date Of Birth</h6>
                            </div>
                            <div className="col">  </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Contact</h6>
                            </div>
                            <div className="col"> +91 9999999999 </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <h2 Style="text-align: center"> User Reviews </h2>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<h7 className="loader" Style="text-align: center" key={0}>Loading More Reviews...</h7>}
                useWindow={false}
            >
                {showItems(reviews)}
            </InfiniteScroll>
        </div>
        </div>
    )
}
export default Profile;