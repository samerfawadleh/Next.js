import React from 'react';

import AuthLayout from '../../hoc/AuthLayout/AuthLayout';
import UserInfo from '../UserInfo/UserInfo';

import Spinner from '../UI/Spinner/Spinner';

const signup = (props) => {
    const emptyRequiredFields = () => {
        const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const validEmail = emailPattern.test(props.user.email);
        return !props.user.name || !validEmail || !props.user.password
    }

    let button = <button className="btn btn-primary" disabled={emptyRequiredFields()}>Sign up</button>;

    if(props.loading) {
        button = <Spinner />;
    }

    return (
        <AuthLayout>
            <h1>Sign Up</h1>
            <UserInfo
                button={button}
                user={props.user}
                onChange={props.onChange}
                onSubmit={props.onSubmit}
                fileHandler={props.fileHandler} />
        </AuthLayout>
    )
}

export default signup;