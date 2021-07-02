import React, { useState,useEffect } from 'react';
import { Link,useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';


const Header = () =>{

    const history = useHistory();
    const userAuth = useSelector(state => state.movie.user);
    const dispatch = useDispatch(state => state);
    const [auth,setAuth] = useState(false);


    const logout = () =>{
        dispatch({ type: 'IS_LOGIN', payload: {"email":"","isLoggedin":false} });
        localStorage.setItem("userDetails",JSON.stringify({"email":"","isLoggedin":false}));
        history.push("/login");
    
    }

    useEffect(()=>{
        setAuth(userAuth.isLoggedin);
        const isLoggedin = JSON.parse(localStorage.getItem('userDetails'));
        if(isLoggedin&&isLoggedin.isLoggedin !=null ){
            //history.push("/");
        }else{
            localStorage.setItem("userDetails",null);
            //history.push("/login");
        }
  },[])


    return (       
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
            <div className="container">
            <Link className="navbar-brand" to="/">Movie</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
            </button>
           
            <div className="collapse d-inline-flex mt-2 mt-md-0 ms-md-auto" id="navbarNav">
                <ul className="navbar-nav">
                   
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home </Link>
                    </li>
                    {userAuth&&!userAuth.isLoggedin&&<li className="nav-item active">
                        <Link className="nav-link" to="/login">Login </Link>
                    </li>}
                    {userAuth&&userAuth.isLoggedin&&<><li className="nav-item active" >
                        <Link className="nav-link" to="/addMovie" >Add Movie </Link>
                    </li>
                    <li className="nav-item active">
                    <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
                    </li></>}                                
                </ul>
            </div>
            </div>
        </nav>        
        )
    }

    export default Header;