import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout()
    };
    return (
        <header className=''>
            <div className=''>
                <div>
                    <Link>
                        <h1>Derma:</h1>
                    </Link>
                    <p>Your Skin. Your Choice.</p>
                </div>
                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <Link>
                                {Auth.getProfile().data.username}'s Profile
                            </Link>
                            <button className='' onClick={logout}></button>
                        </>
                    ) : (
                        <>
                            <Link className='' to="">
                                login
                            </Link>
                            <Link className='' to="">
                                Signup
                            </Link>
                        </>
                    )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;