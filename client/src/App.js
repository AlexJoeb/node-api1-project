import React, { Component } from 'react'

import UsersList from './Components/UsersList';
import AddUserForm from './Components/AddUserForm';

import axios from 'axios';

import "./Reset.css";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NONAME } from 'dns';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      users: [],
      user: null,
      editing: false,
      username: '',
      bio: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/users')
      .then(({ data }) => {
        this.setState({
          users: data
        })
      })
      .catch(err => console.error(err.message));
  }

  addUser = (username, bio) => {
    axios.post('http://localhost:5000/api/users', {
      username,
      bio
    })
      .then(({ data }) => {
        this.setState({
          users: data,
        })
      })
      .catch(err => console.error(err.message));
  }

  removeUser = id => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(({ data }) => {
        this.setState({ users: data.users });
    })
    .catch(err => console.error(err.message));
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })

  }

  startEditing = user => {
    console.log(user);
    this.setState({
      username: user.username,
      bio: user.bio,
      editing: true,
      user
    }, () => {
        console.log(this.state);
    });
  }

  finishEditing = () => {
    axios.patch(`http://localhost:5000/api/users/${this.state.user.id}`, {
      username: this.state.username,
      bio: this.state.bio
    })
      .then(({ data }) => {
        this.setState({
          user: null,
          users: data.users,
          username: '',
          bio: '',
          editing: false,
        })
      })
      .catch(err => console.error(err.message));
  }

  render() {
    return (
      <div
        css={css`
          width: 100vw;
          height: 100vh;

          background-color: #16171E;

          padding: 3vw;
        `}
      >
        <AddUserForm
          addUser={this.addUser}
          handleChange={this.handleChange}
          editing={this.state.editing}
          finishEditing={this.finishEditing}
          username={this.state.username}
          bio={this.state.bio}
        />
        <hr />
        <br />
        <UsersList
          users={this.state.users}
          removeUser={this.removeUser}
          startEditing={this.startEditing}
        />
      </div>
    )
  }
}
