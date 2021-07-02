import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

const tmpgenres = ['Action', 'Adventure', 'Comedy', 'Crime and mystery', 'Fantasy', 'Historical', 'Horror', 'Romance'];

function EditMovie() {

    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch(state => state);
    const movie = useSelector(state => state.movie.movies.find(item => item.id == params.id));

    const [actorsName, setActorName] = useState('');
    const [actorNames, setActorNames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieObj, setMovieObj] = useState({});
    const [movieSubmitObj, setMovieSubmitObj] = useState({});
    const [error, setError] = useState(null);

    const setActorsName = (actorsName) => {
        setActorName(actorsName);
    }
    const onAdd = () => {
        setActorNames([...actorNames, actorsName]);
        setActorName('');
    }
   const mapGenre = (genre) => {
       return genres.find((i)=> i === genre);
   }
    useEffect(()=>{
        setMovieObj({name:movie.name,bannerURL:movie.bannerURL,description:movie.description});
        setActorNames(movie.artists);
        setGenres(movie.genres);
    },[])

    const addGenres = (evt) => {
        if (evt.target.checked) {
            setGenres([...genres, evt.target.value]);
        } else {
            let index = genres.findIndex((val) => val === evt.target.value);
            if (index !== -1) {
                genres.splice(index, 1);
            }
            setGenres([...genres])
        }
    }

    const onLabelChange = ({ target: { name, value } }) => {
        setMovieObj({ ...movieObj, [name]: value });
    }

    const setMovieSubmit = (e) => {
        e.preventDefault();
        if (e.target.name.value && genres.length !== 0 && actorNames.length !== 0) {
            const Obj  = { id:movie.id,genres: genres, artists: actorNames, ...movieObj };
            setMovieSubmitObj({ genres: genres, artists: actorNames, ...movieObj });
            dispatch({ type: 'UPDATE_MOVIE', payload: Obj });
            history.push("/");
            setError('');
        }
        else {
            setError("All fileds is required!");
        }

    }

    const onRemoveActor = (index) => {
        actorNames.splice(index, 1);
        setActorNames([...actorNames]);
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <p className="text-danger">  {error && error} </p>

                        <form onSubmit={setMovieSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Movie Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="name" value={movieObj.name} onChange={onLabelChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Banner URL</label>
                                <input type="text" className="form-control" value={movieObj.bannerURL} name="bannerURL" onChange={onLabelChange} />
                                <div className="form-text">Add img URL (http://i.imgur.com/I86rTVl.jpg)</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Genre <span className="text-danger">*</span></label>
                                <br />
                                {
                                    tmpgenres&&tmpgenres.map((genre, i) => {
                                        return (
                                            <div className="form-check form-check-inline" key={i}>
                                                <input className="form-check-input" id={genre} checked={mapGenre(genre)} type="checkbox" name="genres" value={genre} onChange={addGenres} />
                                                <label className="form-check-label" htmlFor={genre}>{genre}</label>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                                                     
                            <label className="form-label">Actors <span className="text-danger">*</span></label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Add Actors" value={actorsName && actorsName.actorsName} onChange={event => setActorsName(event.target.value)} />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => { onAdd() }}>Add</button>
                            </div>
                            {actorNames.map((itr, index) => (<div className="input-group mb-3" key={index} id={index}>
                                <input type="text" value={itr} className="form-control" placeholder="Add Actors" />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => { onRemoveActor(index) }}>Remove</button>
                            </div>))
                            }
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" value={movieObj.description} name="description" onChange={onLabelChange} />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditMovie;