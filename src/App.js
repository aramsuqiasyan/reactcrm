import React from 'react';
import './App.css';
import Auth from './Components/Auth/Auth';
import System from './Components/System/System'
import {useState} from 'react';

function App() {
    let [login, setLogin] = useState({isLoggedIn: window.localStorage.getItem('user')});

    function loginHandler() {
        setLogin({isLoggedIn: true})
    }

    function logoutHandler() {
        window.localStorage.removeItem('user');
        setLogin({isLoggedIn: false})
    }

    return (
        <div>
            {
                login.isLoggedIn ? <System onLogout={logoutHandler}/> : <Auth onLogin={loginHandler}/>
            }
        </div>
    );
}

export default App;
