import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';


function MovieList() {
    const movieData = useSelector(state => state.movie.movies);
    const userAuth = useSelector(state => state.movie.user);
    
    const [searchTerm,setsearchTerm] = useState('a'); 

    const [moviesResult,setMoviesResult] = useState([]); 
    
    useEffect(() => {
        const results = movieData&&movieData.filter((obj)=>{
            return Object.keys(obj).some((key)=>{
              return obj[`${key}`] &&
               obj[`${key}`].toString().toLowerCase() &&
               obj[`${key}`].toString().toLowerCase().includes &&
               obj[`${key}`].toString().toLowerCase().includes(searchTerm.toString().toLowerCase());
            })
          });
        setMoviesResult(results);
    },[searchTerm]);

    return (
        <div className="row" >
            <div className="col-sm-12">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" className="form-control" onChange={(evt)=>setsearchTerm(evt.target.value)} />
                </div>
            </div>
            {moviesResult&&moviesResult.map((movie) => {
                const { name, bannerURL, artists, genres, id } = movie;
                return (
                    <div className="col-md-3 col-sm-6 mb-2" key={id}>
                        <div className="card" >
                            <img style={{ height: "150px" }} alt="avatar" className="card-img-top"
                                src={bannerURL ? bannerURL : "http://i.imgur.com/I86rTVl.jpg"} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {name}
                                </h5>
                                <p><b>Artists: </b>
                                    {artists.map((artist,i) => {
                                        return (
                                            <span key={i}>{artist}, </span>
                                        )
                                    }
                                    )}
                                </p>
                                <p><b>Genre: </b>
                                    {genres.map((gener,i) => {
                                        return (
                                            <span className="badge rounded-pill bg-info" key={i}>{gener}</span>
                                        )
                                    }
                                    )}

                                </p>
                                <p className="card-text"></p>
                                <Link to={{
                                    pathname: `/movieDetail/${movie.id}`,
                                }} className="btn btn-sm btn-outline-info" >More Details</Link>
                                {
                                    userAuth&&userAuth.isLoggedin&&
                                    <div className="d-grid gap-2 d-md-block float-end">
                                        <Link to={{
                                            pathname: `/editMovie/${movie.id}`,
                                        }} className="btn btn-sm btn-danger" >Edit</Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>

    )
}

export default MovieList