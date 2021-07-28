import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}


export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
               success: true,
            }
            return signInUser;
        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
        })
}



export const handleFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            
            const user = result.user;
            user.success = true;
            return user;
        })
        .catch((error) => {
        });
}


// export const handleSignOut = () => {
//     return firebase.auth().signOut()
//         .then(res => {
//             const signOutUser = {
//                 isSignIn: false,
//                 name: '',
//                 email: '',
//                 photo: '',
//                 error: '',
//                 success: false,
//             }
//             return signOutUser;
//         })
//         .catch(error => {
//             console.log(error);
//             console.log(error.message);
//         });
// }

export const createUserEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword( email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            verifyEmail();
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    }).then(() => {
         console.log('user update successful');
    }).catch((error) => {
     console.log(error)
    });
}

const verifyEmail = () =>{
 var user = firebase.auth().currentUser;
 user.sendEmailVerification().then( function ()  {
    // Email verification sent!
    // ...
  } );
}

export const resetPassword = email   =>{
    firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
  })
  .catch((error) => {
    // ..
  });
}