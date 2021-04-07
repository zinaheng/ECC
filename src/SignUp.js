

import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import {Button, Grid, Paper, TextField} from '@material-ui/core'
import { auth, generateUserDocument } from "./firebase";
import './LoginPage.css';
import Logo2 from './Logo2.jpg'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <Grid>
      
      <h1 className ="message">
                Simple Budget <br></br>
                <span className="motto">Helping Family, Friends to save Income</span>
               </h1> 
    <div className="mt">
      {/* <h1 >Sign Up</h1> */}
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
      
        <form className="signUp">
        <div className="signupContainer">
        <img src= {Logo2}></img>
          <label htmlFor="displayName" >
            User Name:
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full "
            name="displayName"
            value={displayName}
            placeholder="E.g: example"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" >
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: example@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <br />{" "}
          <button
            className="signUp"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
          <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>{" "}
        </p>
        {error !== null && <div className = "errorMsg">{error}</div>}
         </div>
        </form>
        
       
      </div>
    </div>
    </Grid>
  );
};

export default SignUp;