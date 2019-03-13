import React, { useState } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import Link from 'next/link';

import AuthLayout from '../../hoc/AuthLayout/AuthLayout';

const login = (props) => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const [loginMessage, setLoginMessage] = useState('');

    const inputChangedHandler = (event) => {
        setState({...state, [event.target.name]: event.target.value})
    }

    const loginHadnler = (event) => {
        event.preventDefault();
        let loginSuccess = false;

        for(let user of props.users) {
            if(user.email === state.email && user.password === state.password){
                new Cookies().set('userId', user.id, {path: '/'});
                loginSuccess = true;
                break;
            }
        }

        if(loginSuccess){
            Router.push("/notes");
        } else {
            setLoginMessage("Email or password is incorrect!");
        }
        
    }

    return (
        <AuthLayout>
            <h1>Login</h1>
            
            <div>
                <form onSubmit={loginHadnler} >
                    <input
                        type="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={inputChangedHandler}
                        name="email" ></input>
                    <input
                        type="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={inputChangedHandler}
                        name="password" ></input>
                    {loginMessage ? <p className="text-danger">{loginMessage}</p> : null}
                    <button className="btn btn-primary" disabled={!state.email || !state.password}>Login</button>
                </form>
                <div>Don't have an account? <Link href="/signup"><a>Sign up!</a></Link></div>
            </div>
        </AuthLayout>
    )
}

export default login;