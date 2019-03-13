import React from 'react';

import AuthLayout from '../../hoc/AuthLayout/AuthLayout';

const userInfo = (props) => {
    const disabled = props.disabled ? true : false;

    return (
        <AuthLayout>
            <div>
                <form onSubmit={props.onSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                    <input
                        type="text"
                        value={props.user.name}
                        onChange={props.onChange}
                        name="name"
                        placeholder="Name" 
                        disabled={disabled} ></input>
                    <input
                        type="email"
                        value={props.user.email}
                        onChange={props.onChange}
                        name="email"
                        placeholder="Email"
                        disabled={disabled} ></input>
                    <input
                        type="password"
                        value={props.user.password}
                        onChange={props.onChange}
                        name="password"
                        placeholder="Password"
                        disabled={disabled} ></input>
                    
                    <div>
                        <input
                            type="file"
                            onChange={props.fileHandler}
                            disabled={disabled} ></input>
                         {!disabled ? <a className="text-danger" onClick={props.removeFile}>Remove file</a> : null}
                    </div>
                    {props.user.picture ? <img src={props.user.picture.imagePreviewUrl}></img> : null}
                    {!disabled ? props.button : null}
                </form>
            </div>
        </AuthLayout>
    )
}

export default userInfo;