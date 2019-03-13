import React from 'react';

const authLayout = (props) => {
    return (
        <div className="auth-pages">
            {props.children}

            <style jsx> {`
                .auth-pages {
                    max-width: 500px;
                    margin: 0 auto;
                }

                :global(form > *) {
                    margin-bottom: 10px;
                }
            `} </style>

        </div>
    );
} 

export default authLayout;