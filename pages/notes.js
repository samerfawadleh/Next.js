import React, { useState } from 'react';
import Redirect from 'next-redirect';

import axios from 'axios';

import Note from '../components/Note/Note';
import Layout from '../hoc/Layout';

import { getUserId } from '../shared/utilities/userCookie';
import { BACKEND_URL } from '../shared/constants/constants';

const Notes = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState(null);
    const [filter, setFilter] = useState('');

    const initNewNote = () => {
        setNewNote({
            value: '',
            editable: true
        });
    }

    const newNoteChangedHandler = (event) => {
        setNewNote({...newNote, value: event.target.value});
    }

    const editNoteHandler = (event, id) => {
        const note = {...notes[id]};
        note.value = event.target.value;
        setNotes({
            ...notes,
            [id]: note
        });
    }

    const deleteNoteHandler = (id) => {
        axios.delete(BACKEND_URL + '/notes/' + id + '.json')
            .then(response => {
                const notesClone = {...notes};
                delete notesClone[id];
                setNotes(notesClone);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const updateNoteHandler = (id) => {
        axios.put(BACKEND_URL + '/notes/' + id + '.json', {...notes[id]})
            .catch(err => {
                console.log("ERROR", err);
            });
    }

    const addNewNoteHandler = () => {
        const newNoteClone = {
            ...newNote,
            userId: props.userId,
            creationDate: new Date()
        }
        
        axios.post(BACKEND_URL + '/notes.json', newNoteClone)
            .then(response => {
                setNotes({...notes, [response.data.name]: newNoteClone});
                setNewNote(null);
            }).catch(err => {
                console.log("ERROR", err);
            });
    }

    const filterNotesHandler = (event) => {
        setFilter(event.target.value);
    }

    const newNoteBtn = <button className="btn btn-secondary" onClick={initNewNote}>New Note</button>;
    const filterField = <input value={filter} placeholder="Search" onChange={filterNotesHandler}></input>;
    let newNoteSection = null;

    if(newNote) {
        newNoteSection = (
            <div>
                <div className="filterSection">{filterField}</div>
                <div className="newNoteSection">
                    <textarea className="form-control" value={newNote.value} onChange={newNoteChangedHandler} ></textarea>
                    <div className="action-div">
                        <button className="btn btn-secondary" onClick={() => setNewNote(null)} >Cancel</button>
                        <button className="btn btn-success" onClick={addNewNoteHandler} disabled={!newNote.value}>Add</button>
                    </div>
                </div>

                <style jsx>{`
                    .filterSection, .newNoteSection .action-div {
                        display: flex;
                        justify-content: end;
                    }

                    .newNoteSection, .filterSection {
                        margin-bottom: 10px
                    }
                `}</style>  
            </div>
        );
    } else {
        newNoteSection = (
            <div>
                {newNoteBtn}
                {filterField}

                <style jsx>{`
                    div {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                    }
                `}</style>  
            </div>
        )
    }

    let filteredNotes = null;

    if(notes) {
        if(filter) {
            filteredNotes = Object.keys(notes).map(key => {
                if(notes[key].value.toLowerCase().includes(filter.toLowerCase())){
                    return (
                        <div key={key}>
                            <Note
                                value={notes[key].value}
                                onDelete={() => deleteNoteHandler(key)}
                                onUpdate={() => updateNoteHandler(key)}
                                onChange={(e) => editNoteHandler(e, key)} />
                        </div>
                    )
                }
            }).reverse()
        } else {
            filteredNotes = Object.keys(notes).map(key => {
                return (
                    <div key={key}>
                        <Note
                            value={notes[key].value}
                            onDelete={() => deleteNoteHandler(key)}
                            onUpdate={() => updateNoteHandler(key)}
                            onChange={(e) => editNoteHandler(e, key)} />
                    </div>
                )
            }).reverse()
        }
    }

    return (
        <Layout>
            <div>
                <h1>My Notes</h1>
                {newNoteSection}
                {filteredNotes}
            </div>
        </Layout>
    )
}

Notes.getInitialProps = async (ctx) => {
    const userId = getUserId(ctx.req);

    if(!userId) {
        return Redirect(ctx, "/");
    }

    const res = await axios(BACKEND_URL + '/notes.json?orderBy="userId"&equalTo="' + userId + '"');
    const data = await res.data;

    return {
        userId: userId,
        notes: data
    }
}

export default Notes;