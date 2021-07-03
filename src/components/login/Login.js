import React, { useState } from "react";
import classes from "./Login.module.css";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [enterEmail, setEmail] = useState("");
  const [enterPassword, setPassword] = useState("");
  const [status, setStatus] = useState(false); //false=sign in //true=sign up
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  let emailError = "";
  let passwordError = "";
  let buttonError = "";
  if (error === "INVALID_EMAIL") {
    emailError = "*email is invalid";
  } else if (error.includes("WEAK_PASSWORD")) {
    passwordError = "*password must be 7 characters long";
  } else if (error.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
    buttonError = "*to many attemps, try later";
  }else if(error==='*please enter your email'){
    emailError=error;
  }else if(error==='*please enter your password'){
    passwordError=error;
  } else {
    buttonError = error;
  }
  const statusHandler = (event) => {
    event.preventDefault();
    setStatus((state) => !state);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const signupHandler = async (email, password) => {
    setLoading(true);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEz2WJY4IGu6NAJqF50F-natVacz_Eyqo",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      setError("");
      response.json().then((data) => {
        dispatch(
          authActions.loginHandler({ token: data.idtoken, username: email })
          );
        });
        localHandler();

    } else {
      response.json().then((data) => {
        setError(data.error.message);
      });
    }
    setLoading(false);
  };

  const signinHandler = async (email, password) => {
    setLoading(true);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEz2WJY4IGu6NAJqF50F-natVacz_Eyqo",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      setError("");
      response.json().then((data) => {
        dispatch(
          authActions.loginHandler({ token: data.idtoken, username: email })
          );
        });
      } else {
        response.json().then((data) => {
          setError(data.error.message);
          console.log(data.error.message);
        });
        setLoading(false);
        return;
      }
      localHandler();
    setLoading(false);
  };

  const localHandler = () => {
    if (!error) {
      localStorage.setItem("email", enterEmail);
      localStorage.setItem("status", "1");

      history.replace("/");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const emailValid=enterEmail.trim().includes('@');
    const passwordValid=enterPassword.trim().length>7;

    if(!enterEmail){
      setError('*please enter your email');
      return;
    }
    if(!enterPassword){
      setError('*please enter your password');
      return;
    }
    if(!emailValid && !passwordValid){
      setError('*Email or Password is InValid');
      return;
    }

    if (status) {
      //sign up
      signupHandler(enterEmail, enterPassword);
    } else {
      signinHandler(enterEmail, enterPassword);
    }

  };

  return (
    <div className={classes["big-container"]}>
      <div className={classes.header}>
        <img
          src="https://games.mxdwn.com/wp-content/uploads/2016/12/amazon.png"
          alt=""
        />
      </div>
      <form className={classes.container}>
        <h2>{status ? "Sign up" : "Sign in"}</h2>
        <div className={classes.input}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name=""
            className={!emailError ? classes.valid : classes.Invalid}
            onChange={emailHandler}
          />
          {emailError && <p className={classes["error-text"]}>{emailError}</p>}
        </div>
        <div className={classes.input}>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name=""
            className={!passwordError ? classes.valid : classes.Invalid}
            onChange={passwordHandler}
          />
          {passwordError && (
            <p className={classes["error-text"]}>{passwordError}</p>
          )}
        </div>
        {loading ? <div className="center"><img src="https://www.freeiconspng.com/uploads/load-icon-png-27.png" className="Loading"/></div>: (
          <>
            <button className={classes.login} onClick={submitHandler}>
              {status ? "Sign up" : "Sign in"}
            </button>
            {buttonError && (
              <p className={classes["error-text"]}>{buttonError}</p>
            )}
          </>
        )}
        <p>
          By signing-{status ? "up" : "in"} you agree to the AMAZON FAKE CLONE
          conditions of Use & Sale . Please see our Privacy Notice, our Cookies
          Notice and our Interest-Based Ads Notice
        </p>
        <button className={classes.register} onClick={statusHandler}>
          {status ? "Sign in with your own Account" : "Create your own Account"}
        </button>
      </form>
    </div>
  );
};

export default Login;
