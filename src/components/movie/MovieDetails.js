import React from 'react';
import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux';

function MovieDetails(props) {
    const params = useParams();
    const movie = useSelector(state => state.movie.movies.find(item => item.id == params.id));
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4 text-center">
                                    <img src={movie&&movie.bannerURL?movie.bannerURL:"http://www.riobeauty.co.uk/images/product_image_not_found.gif"} className="img-fluid"  alt="movie-banner"/>
                                </div>
                                {movie ?
                                (<div className="col-sm-8">
                                    <h4>{movie.name}</h4>
                                    <p><b>Artists: </b>
                                    {movie.artists.map((actor) => {
                                        return (
                                            <span className="badge rounded-pill bg-info">{actor} </span>
                                        )
                                    }
                                    )}
                                    </p>
                                    <p><b>Genre: </b>
                                    {movie.genres.map((gener) => {
                                        return (
                                            <span className="badge rounded-pill bg-info">{gener}</span>
                                        )
                                    }
                                    )}

                                </p>
                                    <h5>Movie Description:</h5>
                                    <p class="card-text mb-auto">{movie.description}</p>
                                </div>)
                                : (<h3>Movie Not Found! </h3>)  }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   

}
export default MovieDetails;