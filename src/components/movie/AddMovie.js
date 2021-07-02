import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

const tmpgenres = ['Action', 'Adventure', 'Comedy', 'Crime and mystery', 'Fantasy', 'Historical', 'Horror', 'Romance'];

function AddMovie() {
    
    const history = useHistory();

    const [actorsName, setActorName] = useState('');
    const [actorNames, setActorNames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieObj, setMovieObj] = useState({});
    const [movieSubmitObj, setMovieSubmitObj] = useState({});
    const [error, setError] = useState(null);

    const movies = useSelector(state => state);
    const dispatch = useDispatch(state => state);

    const setActorsName = (actorsName) => {
        setActorName({ actorsName });
    }
    const onAdd = () => {
        setActorNames([...actorNames, { actorsName }]);
        setActorName('');
    }

    const addGenres = (evt) => {
        if (evt.target.checked) {
            setGenres([...genres, evt.target.value]);
        } else {
            let index = genres.findIndex((val) => val === evt.target.value)
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
        let artists = actorNames.map((val) => val.actorsName.actorsName);
        if (e.target.name.value && genres.length !==0 && artists.length !== 0) {  
            const Obj  = { id:Math.random(),genres: genres, artists: artists, ...movieObj };
            setMovieSubmitObj(Obj);
            dispatch({ type: 'ADD_MOVIE', payload:Obj });
            setError('');
            history.push("/");
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
                                <input type="text" className="form-control" name="name" onChange={onLabelChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Banner URL</label>
                                <input type="text" className="form-control" name="bannerURL" onChange={onLabelChange} />
                                <div className="form-text">Add img URL (http://i.imgur.com/I86rTVl.jpg)</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Genre <span className="text-danger">*</span></label>
                                <br />
                                {
                                    tmpgenres.map((genre, i) => {
                                        return (
                                            <div className="form-check form-check-inline" key={i}>
                                                <input className="form-check-input" id={genre} type="checkbox" name="genres" value={genre} onChange={addGenres} />
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
                                <input type="text" value={itr.actorsName.actorsName} className="form-control" placeholder="Add Actors" />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => { onRemoveActor(index) }}>Remove</button>
                            </div>))
                            }

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" name="description" onChange={onLabelChange} />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddMovie;