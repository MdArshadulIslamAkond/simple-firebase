import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";
// import {  } from "firebase/auth/web-extension";

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
        .then((result)=>{
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
        }).catch((error) => {
            // const email = error.customData.email;
            console.log('error', error.message);
        })
    }
    const handleGithubSignIn =()=>{
        signInWithPopup(auth, githubProvider)
       .then((result)=>{
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
       })
       .catch((error)=>{
        console.log('error', error.message);
       })

    }
    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser(null);
        }).catch((error) => {
            console.log(error.message);
        })
    }

    return (
        <div>
            {
            user ? <button onClick={handleSignOut}>Sign out</button> :
            <>
                <button onClick={handleGoogleSignIn}>Google login</button>
                <button onClick={handleGithubSignIn}>Github login</button>
            </>
            }
            {user && <div>
                <h3>User: {user.displayName }</h3>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;