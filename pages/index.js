import React from 'react';
import axios from 'axios';

import Login from '../components/Auth/Login';
import Layout from '../hoc/Layout';

import { BACKEND_URL } from '../shared/constants/constants';

const Index = (props) => {
    return (
        <Layout>
            <Login users={props.users}></Login>
        </Layout>
    )
}

Index.getInitialProps = async ({ req }) => {
    const res = await axios(BACKEND_URL + '/users.json');
    const data = await res.data;

    const users = Object.keys(data).map(key => {
        return {...data[key], id: key}
    });

    return {users: users}
}

export default Index;