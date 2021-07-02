import React, { useState,useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";


const credential  = {email:'admin@movie.com',password:"123456"}; 

function Login() {
    const history = useHistory();
    const [error, setError] = useState();
    const dispatch = useDispatch(state => state);
    const [userCredential, setUserCredential] = useState({});
    const userAuth = useSelector(state => state.movie.user);


    const handleCredetial = ({ target: { name, value } }) =>{
        setUserCredential({...userCredential,[name]:value});
    }

    const onSubmit = (e) => {
      e.preventDefault();
      if(credential.email== userCredential.email &&
         credential.password == userCredential.password ){
            const userDetails = {email:userCredential.email,isLoggedin:true};
            localStorage.setItem("userDetails",JSON.stringify(userDetails));
            dispatch({ type: 'IS_LOGIN', payload:userDetails });
            history.push("/")
         }else{
             setError("Username and password is incorrect!!!!!");
         }
    }
    
    useEffect(()=>{
          const isLoggedin = userAuth&&userAuth.isLoggedin;
          if(isLoggedin){
          history.push("/")
          }else{
            localStorage.setItem("userDetails",null);
            history.push("/login");
          }
        
    },[])


    
    return (
        <div className="form-signin m-auto">
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                        <p className="text-danger">  {error && error} </p>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" name="email"
                                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                        onChange={handleCredetial} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name="password"
                                        className="form-control" id="exampleInputPassword1"
                                        onChange={handleCredetial} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;