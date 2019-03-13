import React, { useState } from 'react';
import Router from 'next/router';

import axios from 'axios';

import Signup from '../components/Auth/Signup';
import Layout from '../hoc/Layout';

import { BACKEND_URL } from '../shared/constants/constants';

const SignupPage = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        picture: null,
    });

    const [loading, setLoading] = useState(false);

    const inputChangedHandler = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const signupHadnler = (event) => {
        event.preventDefault();

        setLoading(true);

        axios.post(BACKEND_URL + '/users.json', user)
            .then(response => {
                Router.push("/");
            }).catch(err => {
                console.log("ERROR", err);
                setLoading(false);
            });
    }

    const fileHandler = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setUser({
                ...user,
                picture: {
                    file: file,
                    imagePreviewUrl: reader.result
                }
            });
        }

        reader.readAsDataURL(file)
    }
    
    return (
        <Layout>
            <Signup 
               user={user}
               onChange={inputChangedHandler}
               onSubmit={signupHadnler}
               fileHandler={fileHandler}
               loading={loading} ></Signup>
        </Layout>
    )
}

export default SignupPage;