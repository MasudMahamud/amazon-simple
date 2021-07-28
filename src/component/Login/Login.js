import { useState } from 'react';
import Button from '@material-ui/core/Button';
import './Login.css';
import { useContext } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn,  initializeLoginFramework, resetPassword, signInWithEmailAndPassword } from './LoginManager';


initializeLoginFramework();

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
  };

  // const googleSignOut = () => {
  //   handleSignOut()
  //     .then(res => {
  //       setUser(res);
  //       setLoggedInUser(res);
  //     })
  // }

  const fbSignIn = () => {
    handleFacebookSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    }) 
  };

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber
    }

    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }


  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
        })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
        })
    }

    e.preventDefault();
  }



  return (
    <div className="login-main">
      <h2>Log in</h2>
       <input className="checkbox" onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
      <label htmlFor="newUser">New user Sign Up </label>
      <form onSubmit={handleSubmit}>
      <br />
        {
          newUser && <input type="text" placeholder="Enter your name" />
        } <br /> <br />
        <input onBlur={handleBlur} type="text" name="email" placeholder="Your email" required />
        <br /><br />
        <input onBlur={handleBlur} type="password" name="password" id="" placeholder="password" required />
        <br /><br />
        <input  type="submit" value={newUser ? 'Sign In' : 'Sign up'} /> <br /><br />
      </form>
      <button onClick={() => resetPassword(user.email) }>Forget Password</button> <br/><br/>
      {
      user.success && <p style={{ color: 'green' }} >user {newUser ? 'create' : 'Log in'} successfully </p>
      } 

      <Button variant="contained" onClick={googleSignIn}> Google </Button>
      <Button className="btn-btn" variant="contained" color="secondary" onClick={fbSignIn}> Facebook </Button>



    </div>
  );
}

export default Login;
