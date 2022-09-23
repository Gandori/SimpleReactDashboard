import './auth.sass';
import React, { useState } from 'react';
import { ApiPOST } from '../../components/api';
import { Navigate } from 'react-router-dom';

export default function Signup()
{
    const [username, setUsername] = useState('');
    const [usernameWarning, setUsernameWarning] = useState('');

    const [passwd, setPasswd] = useState('');
    const [passwdWarning, setPasswdWarning] = useState('');
    
    const [confirmPasswd, setConfirmPasswd] = useState('');
    const [confirmPasswdWarning, setConfirmPasswdWarning] = useState('');
    
    const [response, setResponse] = useState(null);

    if(response == false)
    {
        setResponse(null);
        setUsernameWarning('Bereits vergeben');
    }

    function submit()
    {
        if(!username || !passwd || !confirmPasswd){return;};
        if(usernameWarning || passwdWarning || confirmPasswdWarning){return;};
        let data = {'Username':username, 'Passwd':passwd};
        ApiPOST('/signup', data, setResponse);
    };

    function valueLengthMin(value, len, set)
    {
        value.length < len && set('Mindestens ' + len + ' Zeichen');
        return value.length < len;
    };

    function valueLengthMax(value, len, set)
    {
        value.length > len && set('Maximal ' + len + ' Zeichen');
        return value.length > len;
    };

    function isNumberInValue(value, set)
    {
        return '0123456789'.split('').some(n =>
        {
            value.includes(n) && set('Keine Zahlen');
            return value.includes(n);
        });
    };

    function isPunctuactionInValue(value, set)
    {
        return '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('').some(p =>
        {
            value.includes(p) && set('Keine Sonderzeichen');
            return value.includes(p);
        });
    };

    function isBlankSignInValue(value, set)
    {
        value.includes(' ') && set('Keine LeerZeichen');
        return value.includes(' ');
    };

    function changeUsername(value)
    {
        setUsername(value);
        setUsernameWarning('');
        if(valueLengthMin(value, 5, setUsernameWarning)){return};
        if(valueLengthMax(value, 10, setUsernameWarning)){return};
        if(isBlankSignInValue(value,setUsernameWarning)){return;};
        if(isNumberInValue(value, setUsernameWarning)){return;};
        if(isPunctuactionInValue(value, setUsernameWarning)){return};
    };

    function changePasswd(value)
    {
        setPasswd(value);
        setPasswdWarning('');
        if(confirmPasswd){setConfirmPasswdWarning('Muss mit Passwort gleich sein')};
        if(valueLengthMin(value, 7, setPasswdWarning)){return};
        if(value == confirmPasswd){setConfirmPasswdWarning('')};
    };

    function changeConfirmPasswd(value)
    {
        setConfirmPasswd(value);
        setConfirmPasswdWarning('');
        if(value != passwd){setConfirmPasswdWarning('Muss mit Passwort gleich sein');return;};
    };

    const content = <div id='signup'>
        <input type='text' value={username} onChange={e => changeUsername(e.target.value)} placeholder='Benutzername'></input>
        <label id='warning'>{usernameWarning}</label>
        <input type='password' value={passwd} onChange={e => changePasswd(e.target.value)} placeholder='Passwort'></input>
        <label id='warning'>{passwdWarning}</label>
        <input type='password' value={confirmPasswd} onChange={e => changeConfirmPasswd(e.target.value)} placeholder='Passwort widerholen'></input>
        <label id='warning'>{confirmPasswdWarning}</label>
        <button onClick={submit}>Weiter</button>
    </div>

    if(response == true){return <Navigate to={'/'} state={'Du hast dich Erfolgreich Registriert'} replace></Navigate>}
    return content;
}