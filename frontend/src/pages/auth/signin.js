import './auth.sass';
import { useState, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { ApiPOST } from '../../components/api';
import Popup from '../../components/popup/popup';
import { DataContext } from '../../App';

export default function Signin()
{
    const [username, setUsername] = useState('');
    const [passwd, setPasswd] = useState('');
    const [warning, setWarning] = useState('');
    const context = useContext(DataContext);

    if(context?.data == false)
    {
        setTimeout(() => {
            context.setData(null);
            setWarning('Die Angaben sind falsch');
        }, 100);
    }
    else if(context?.data)
    {
        return <Navigate replace to={'/dashboard'}></Navigate>
    };

    function submit()
    {
        if(!username || !passwd){return};
        if(warning){return};
        let data = {'Username':username, 'Passwd':passwd};
        ApiPOST('./signin', data, context.setData);
    };

    function changeUsername(value)
    {
        setUsername(value);
        setWarning('');
    };

    function changePasswd(value)
    {
        setPasswd(value);
        setWarning('');
    };

    window.history.replaceState({}, document.title);

    const content = <div id='signin'>
        <input type='text' onChange={e => changeUsername(e.target.value)} placeholder='Benutzername'></input>
        <input type='password' onChange={e => changePasswd(e.target.value)} placeholder='Passwort'></input>
        <label id='warning'>{warning}</label>
        <button onClick={submit}>Weiter</button>
        {useLocation().state && <Popup txt={useLocation().state}></Popup>}
    </div>
    return content;
}