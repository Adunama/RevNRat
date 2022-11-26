import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom'; 
import { Navigate } from 'react-router-dom';
class Movies extends React.Component{
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
    }

    state = {
        searchWord: "",
        searched: false,
        suggestions: [{},{},{}]
    }

    search(e){
        e.preventDefault();
        this.setState({searched: true})
        let str = this.state.searchWord
        str.replace(/ /g, '_');
        this.setState({searchWord: str})
    }

    getSuggestions(){
        axios.get(`http://127.0.0.1:8000/movies/suggestions`)
        .then(res => {
            this.setState({
                suggestions: res.data.result
            })
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.token !== this.props.token){
            this.getSuggestions();
        }
    }

    componentDidMount(){
        this.getSuggestions();
    }

    showSuggestions(){
        var items = []
        for(var i = 0; i < this.state.suggestions.length; i++){
            items.push(
            <div className="col-10 col-md-4 col-lg-3">
                <Link to={`/movies/${this.state.suggestions[i].id}`} style={{ color: "black", textDecoration: "none"}}>
                <div className="row d-flex justify-content-center">
                    <div style={{width: "80%"}}>
                        <div className="card mt-3 mb-3" style={{border: "solid", borderColor: "violet", boxShadow: "2px 2px 2px 1px rgba(200,0,200,0.3)"}}>
                            <img src={this.state.suggestions[i].imgurl} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <div className="row d-flex justify-content-center"><h2 style={{width: "fit-content"}}>{this.state.suggestions[i].name}</h2></div>
                            </div>
                        </div> 
                    </div>
                </div>
                </Link>
            </div>  
            )
        }
        return items;
    }

    render(){
      return(
        <div style={{backgroundColor: "rgb(230,230,230)", minHeight: "110vh"}}>
            {this.state.searched && <Navigate to={`/movies/search/${this.state.searchWord}`}></Navigate>}
            <div className="row d-flex justify-content-evenly align-items-center">
                <div className="col-10 col-md-9 col-lg-8 mt-2 mb-2 pt-1 pb-1">
                    <form className="d-flex" style={{width: "100%"}} onSubmit={this.search}>
                        <input className="form-control me-2" type="search" placeholder="Search for Movies" aria-label="SearchRestaurantHotel" onChange={(e) => {this.setState({searchWord: e.target.value})}}/>
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
                {this.showSuggestions()}
            </div>
        </div>
      )
    }
}
export default Movies;
