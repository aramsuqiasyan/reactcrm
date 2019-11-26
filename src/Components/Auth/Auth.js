import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import Login from './Login/Login';
import Register from './Register/Register';

class Auth extends React.Component {
    render() {
        return (
            <div className="auth">
                <div className="auth-container">
                    <div className="card">
                        <header className="auth-header">
                            <h1 className="auth-title">
                                <div className="logo">
                                    <span className="l l1"></span>
                                    <span className="l l2"></span>
                                    <span className="l l3"></span>
                                    <span className="l l4"></span>
                                    <span className="l l5"></span>
                                </div>
                                Home Money
                            </h1>
                        </header>
                        <Redirect path='/' to='/login'/>
                        <Route path="/login" render={() => <Login onLogin={this.props.onLogin}/>}/>
                        <Route path="/register" render={() => <Register onRegister={this.props.onLogin}/>}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;
