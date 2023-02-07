import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; 

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
      <main className=''>
        <div className=''>
            <div className=''>
                <h4 className=''>Signup</h4>
                <div className=''>
                    {data ? (
                        <p>
                            <Link to="/"> Back to the Lobby with you.</Link>
                        </p>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <input
                            className=''
                            placeholder=''
                            name='username'
                            type="text"
                            value={formState.name}
                            onChange={handleChange}
                            />
                            <input
                            className=''
                            placeholder='Enter a Valid Email Address'
                            name='email'
                            type='email'
                            value={formState.email}
                            onChange={handleChange}
                            />
                            <input
                            className=''
                            placeholder='************'
                            name='password'
                            type="password"
                            value={formState.password}
                            onChange={handleChange}
                            />
                            <button
                            className=''
                            style={{}}
                            type="submit"
                            >Submit
                            </button>
                        </form>
                    )}

                    {error && (
                        <div className=''>
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
      </main>  
    );
};

export default Signup;