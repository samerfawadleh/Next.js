import React, { useState } from 'react';

const note = (props) => {
    const [editable, setEditable] = useState(false);

    let output = (
        <>
            <div className="card" >
                <div className="card-body">
                    <p className="card-text">{props.value}</p>

                    <div className="action-icons" >
                        <a onClick={() => setEditable(true)} title="Edit">
                            <img  src="/static/icons/edit-icon.svg" />
                        </a>

                        <a onClick={props.onDelete} title="Delete">
                            <img  src="/static/icons/delete-icon.svg" />
                        </a>
                    </div>
                </div>
            </div>

            <style jsx> {`
                img {
                    width: 20px;
                }

                p {
                    white-space: pre-wrap;
                }

                .card:hover {
                    background-color: rgba(200, 200, 200);
                }

                .action-icons {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            `} </style>
        </>
    );

    if(editable) {
        output = (
            <>
                <div className="note-div">
                    <textarea className="form-control" value={props.value} onChange={props.onChange} ></textarea>
                </div>
                <div className="action-div">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setEditable(false)} >Cancel</button>
                    
                    <button
                        className="btn btn-success btn-save"
                        disabled={!props.value}
                        onClick={() => {props.onUpdate(); setEditable(false);}} >Save</button>
                </div>

                <style jsx> {`
                    button {
                        align-self: end;
                    }
                    
                    .btn-save {
                        margin-top: 5px;
                    }

                    .action-div {
                        display: flex;
                        justify-content: end;
                    }

                    .note-div {
                        min-height: 200px;
                    }

                    .note-div textarea {
                        height: 100%;
                    }
                `} </style>
            </>
        );
    }

    return (
        <div className="Note">
            {output}
            <style jsx>{`
                .Note {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
}

export default note;