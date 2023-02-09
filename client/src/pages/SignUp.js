import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; 

import {
    Form,
    Button,
    Grid,
    Header as SemanticHeader,
    Segment,
  } from "semantic-ui-react";

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data}] = useMutation(ADD_USER);
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleFormSubmit = async(event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
      <main>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 400, marginTop: 30 }}>
          <SemanticHeader>Create New Account</SemanticHeader>

          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <Form.Field>
                            <Form.Input
                            className='form-input'
                            placeholder='Your username'
                            name='username'
                            type="text"
                            value={formState.name}
                            onChange={handleChange}
                            /></Form.Field>
                            <Form.Field><Form.Input
                            className='form-input'
                            placeholder='Enter a Valid Email Address'
                            name='email'
                            type='email'
                            value={formState.email}
                            onChange={handleChange}
                            /></Form.Field>
                            <Form.Field>
                            <Form.Inputnput
                            className='form-input'
                            placeholder='************'
                            name='password'
                            type="password"
                            value={formState.password}
                            onChange={handleChange}
                            /></Form.Field>
                            <button
                            className=''
                            style={{ cursor: "pointer" }}
                            type="submit" fluid primary
                            >Submit
                            </button>
                        </form>
                    )}

{error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
                    <Segment>
            Already have an account? <Link to="/login">Login</Link>.
          </Segment>
                   </Grid.Column>
                   </Grid>
      </main>  
    );
};

export default Signup;