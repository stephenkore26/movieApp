import {movies} from "../jsonData/data"
const userDetails = JSON.parse(localStorage.getItem('userDetails'));
console.log("movies",movies)
const initState = {
    user:userDetails?userDetails:{"email":"","isLoggedin":false},
    movies: movies,
    };

//Define Actions
const movieReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_MOVIE':
            return {
                ...state,
                movies: [...state.movies,action.payload]
            }
        case 'UPDATE_MOVIE':
             state.movies.map((item, i) => {
                if(item.id == action.payload.id){
                    state.movies[i] = action.payload
                    return {
                        ...state,
                        movies: [{item}]
                    } 
                }else{
                    return {
                        movies: [{...item}]
                    }
                }
            })
        case 'IS_LOGIN':
            return {
                    ...state,
                    user: action.payload
            }
        default:
            return state
    }
}

export default movieReducer;