import './header.sass';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../App';
import { ApiPOST } from '../api';

export default function Header()
{
    const data = useContext(DataContext);

    function logout()
    {
        ApiPOST('/logout','', data.setData);
    };

    function profile()
    {
        console.log(true);
    }

    const content = (
        <div id='header'>
            <div id='headerLeft'></div>
            <div id='headerRight'>
                {data?.data
                ?
                    <>
                        <img id='img' src='' onClick={profile}></img>
                        <button id='link' onClick={logout}>Logout</button>
                    </>
                :
                    <>
                        <Link replace id='link' to={'/registrieren'}>Registrieren</Link>
                        <Link replace id='link' to={'/'}>Login</Link>
                    </>
                }
            </div> 
        </div>
    );

    return( content );
};