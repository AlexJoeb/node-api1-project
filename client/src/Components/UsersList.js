/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export default function UsersList({ users, startEditing, removeUser }) {
    return (
        <div>
            {
                users.map(user => (
                    <div key={user.id}
                        css={css`
                            display: flex;
                            & + & {
                                margin-top: 15px;
                            }
                        `}
                    >
                    <span
                        css={css`
                            color:red;
                            
                            &:hover{
                                cursor: pointer;
                            }

                            &:active {
                                color: tomato;
                            }
                    `}
                        onClick={() => removeUser(user.id)}
                        >✖</span>
                    <span
                        css={css`
                            color:aqua;
                            
                            &:hover{
                                cursor: pointer;
                            }

                            &:active {
                                color: blue;
                            }
                    `}
                        onClick={() => startEditing(user)}
                        >&nbsp;&nbsp;✎</span>
                        <p css={css`
                            color: #E8E8E8;
                        `}>&nbsp;&nbsp;{user.username}&nbsp;→&nbsp;</p>
                        <p css={css`
                            color: #E8E8E8;
                        `}>{user.bio}</p>
                    </div>
                ))
            }
        </div>
    )
}
