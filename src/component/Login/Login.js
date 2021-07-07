import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import './Login.css';
import {useContext} from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";


firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn:false,
    name:'',
    email:'',
    password:'',
    photo:''
  });

  const [loogedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const loocation = useLocation();
  const { from } = loocation.state || { from: {pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = ()=>{
    firebase.auth().signInWithPopup(googleProvider)
    .then(res =>{
      const {displayName, photoURL, email} =res.user;
      
      const signInUser={
        isSignIn:true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signInUser);
      //console.log(displayName,email,photoURL);
    })
    .catch(error=>{
      console.log(error);
      console.log(error.message);
    })
  }

 const handleSignOut = ()=>{
    firebase.auth().signOut()
    .then(res => {
      const signOutUser ={
        isSignIn:false,
        name:'',
        email:'',
        photo:'',
        error:'',
        success:false,
      }
      setUser(signOutUser);
    })
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    });
 }
 
const handleFbSignIn = ()=>{
  firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
   // var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    console.log('facebook user', user)

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
   // var accessToken = credential.accessToken;

  })
  .catch((error) => {
    // Handle Errors here.
   // var errorCode = error.code;
   // var errorMessage = error.message;
    // The email of the user's account used.
    //var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    //var credential = error.credential;

    // ...
  });
}

 const handleBlur = (e)=>{
  let isFormValid =true;
   if(e.target.name==='email'){
    isFormValid = /\S+@\S+\.\S+/.test(e.target.value); 
   }

   if(e.target.name==='password'){
    const isPasswordValid = e.target.value.length > 5;
    const passwordHasNumber = /\d{1}/.test(e.target.value);
    isFormValid =  isPasswordValid && passwordHasNumber
   }

   if(isFormValid){
     const newUserInfo = {...user};
     newUserInfo[e.target.name] = e.target.value;
     setUser(newUserInfo);
   }
 }


const handleSubmit = (e)=>{
  if( newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res =>{
      const newUserInfo = {...user};
      newUserInfo.error ='';
      newUserInfo.success = true;
      setUser(newUserInfo);
      updateUserName(user.name);
    })
    .catch( error => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    });

  }

  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((res) => {
    const newUserInfo = {...user};
      newUserInfo.error ='';
      newUserInfo.success = true;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      history.replace(from);
  })
  .catch((error) => {
    const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
  });
  }

  e.preventDefault();
}

const updateUserName = name =>{
  const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(() => {
      console.log('user update successful')
    }).catch((error) => {
      console.log(error)
    });
}


  return (
    <div className="login-main">
        
         
        {/* {
          user.isSignIn && <div>
            <p>welcome {user.name}</p>
            <p>Email: {user.email}</p>
            <img src={user.photo} alt="" />
          </div>
        } */}
      
      <h2>Log in</h2>
      <input className="checkbox" onChange={()=>setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
      <label htmlFor="newUser">New user</label>        
        <form onSubmit={handleSubmit}>
          <br />
          {
            newUser && <input type="text" placeholder="Enter your name" /> 
          } <br /> <br />
         <input onBlur={handleBlur} type="text" name="email" placeholder="Your email" required />
          <br/><br/>
         <input onBlur={handleBlur} type="password" name="password" id="" placeholder="password" required /> 
         <br/><br/>
         <input type="submit" value={newUser ? 'Sign In' : 'Sign up'} /> <br/><br/>
         
        </form>
        <p style={{color:'red'}}>{user.error}</p>
        {user.success && <p style={{color:'green'}} >user { newUser ? 'create' : 'Log in'} successfully </p>}


        {
          user.isSignIn ? <Button variant="contained" color="secondary" onClick={handleSignOut} >Sign out</Button>:
          <Button variant="contained" onClick={handleSignIn} >Google</Button>
        }
        
        <Button className="btn-btn" variant="contained" color="secondary" onClick={handleFbSignIn} >Facebook</Button>
         
    </div>
  );
} 

export default Login;
