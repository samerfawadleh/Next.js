import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';

import { getUserId } from '../shared/utilities/userCookie';

const layout = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        if(getUserId()) {
           setUserLoggedIn(true); 
        }
    }, []);

    const logoutUser = () => {
        const cookies = new Cookies();
        cookies.remove("userId", {path: '/'});

        Router.push("/");
    }

    return (
        <div className="container">
            <Head>
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
                <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/sketchy/bootstrap.min.css" rel="stylesheet" integrity="sha384-N8DsABZCqc1XWbg/bAlIDk7AS/yNzT5fcKzg/TwfmTuUqZhGquVmpb5VvfmLcMzp" crossOrigin="anonymous" />
            </Head>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#"><img src="/static/images/logo.png" alt="Logo" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto" style={{justifyContent: 'space-between', width: '100%'}}>
                        <div className="navbar-nav" >
                            {!userLoggedIn ? <li className="nav-item">
                                <Link href="/"><a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a></Link>
                            </li> : null}
                            {userLoggedIn ? <li className="nav-item">
                                <Link href="/notes"><a className="nav-link" href="#">Notes</a></Link>
                            </li> : null}
                        </div>
                        
                        {userLoggedIn ? <div className="navbar-nav">
                            <li className="nav-item">
                                <Link href="/userprofile"><a className="nav-link" href="#">My Profile</a></Link>
                            </li>
                            <li className="nav-item"><a className="nav-link" onClick={logoutUser}>Logout</a></li>
                        </div> : null}
                        
                    </ul>
                </div>
            </nav>
            <div className="content">
                {props.children}
            </div>

            <style jsx> {`
                .content {
                    margin-top: 30px;
                }
            `} </style>
        </div>
  );
} 

export default layout;