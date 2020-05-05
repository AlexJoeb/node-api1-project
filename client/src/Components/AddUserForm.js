import React, { useState } from 'react'

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export default function AddUserForm({ username, bio, handleChange, addUser, editing, finishEditing }) {

    const handleSubmit = e => {
        e.preventDefault();

        if (!username || !bio) return;

        if (!editing) {
            addUser(username, bio);
        } else {
            finishEditing();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input css={css`
                border: 0;
                border-radius: 5px;
                padding: 5px;

                &:active, &:focus {
                    outline: none;
                }
            `}
                value={username}
                onChange={handleChange}
                autoComplete="off"
                type="text"
                name="username" 
                id="username" 
                placeholder="Username"
            />
            <br />
            <textarea css={css`
                border: 0;
                border-radius: 5px;
                margin: 15px 0;
                padding: 5px;

                width: 500px;
                height: 200px;

                resize: none;

                &:active, &:focus {
                    outline: none;
                }
            `} value={bio} onChange={handleChange} autoComplete="off" type="text" name="bio" id="bio" placeholder='Bio' />
            <br /><button
                css={css`
                    width: 250px;
                    height: 40px;
                    font-weight: bold;
                    padding: 5px;
                    border: 0;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    background: #0080E3;
                    color:white;

                    &:hover{ 
                        cursor: pointer
                    }

                    &:active, &:focus {
                        outline: none;
                    }
                `}
                type="submit">{editing ? "Save User" : "Add User"}</button>
        </form>
    )
}
