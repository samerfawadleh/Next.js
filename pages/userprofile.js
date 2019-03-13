import React, { useState } from 'react';
import Redirect from 'next-redirect';

import axios from 'axios';

import Layout from '../hoc/Layout';
import UserInfo from '../components/UserInfo/UserInfo';
import Spinner from '../components/UI/Spinner/Spinner';

import { getUserId } from '../shared/utilities/userCookie';
import { BACKEND_URL } from '../shared/constants/constants';

const UserProfile = (props) => {
    const [disabled, setDisabled] = useState(true);
    const [user, setUser] = useState({
        ...props.user
    });
    const [loading, setLoading] = useState(false);

    const inputChangedHandler = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const saveHadnler = (event) => {
        event.preventDefault();

        setLoading(true);

        axios.put(BACKEND_URL + '/users/' + props.userId + '.json', {...user})
            .then(response => {
                setDisabled(true);
                setLoading(false);
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

    const removeFile = () => {
        setUser({
            ...user,
            picture: null
        });
    }

    const button = loading ? <Spinner /> : <button className="btn btn-success">Save</button>;
    let editIcon = null;
    
    if(disabled){
        editIcon = (
            <a onClick={() => setDisabled(false)} title="Edit Profile" >
                <img src="/static/icons/edit-icon.svg"></img>

                <style jsx>{`
                    a {
                        cursor: pointer;
                    }

                    img {
                        margin-left: 10px;
                        width: 30px;
                        height: 30px;
                    }
                `}</style>
            </a>
        )
    }

    return (
        <Layout>
            <div style={{display: 'flex'}}>
                <h1>My Profile</h1>
                {editIcon}
            </div>
            <UserInfo
                button={button}
                disabled={disabled}
                user={user}
                onChange={inputChangedHandler}
                onSubmit={saveHadnler}
                fileHandler={fileHandler}
                removeFile={removeFile} />

            <style jsx>{`
                div {
                    display: flex;
                }
            `}</style>
        </Layout>
    )
}

UserProfile.getInitialProps = async (ctx) => {
    const userId = getUserId(ctx.req);

    if(!userId) {
        return Redirect(ctx, "/");
    }

    const res = await axios(BACKEND_URL + '/users/' + userId + '.json');
    const data = await res.data;

    return {
        userId: userId,
        user: data
    }
}

export default UserProfile;