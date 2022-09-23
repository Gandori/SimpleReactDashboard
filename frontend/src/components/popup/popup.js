import './popup.sass';

export default function Popup({ txt })
{
    const content = ( <div id='popup'>{txt}</div> );

    return( content );
};