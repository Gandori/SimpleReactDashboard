import './dashboard.sass';
import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DataContext } from '../../App';
import { ApiGET } from '../../components/api';

export default function Dashboard()
{
    const data = useContext(DataContext);

    useEffect(() =>
    {
        const i = setInterval(() =>
        {
            ApiGET('/data', data.setData);
        }, 1000);
        return () => {clearInterval(i)}
    }, [])

    if(!data?.data){return <Navigate replace to='/'></Navigate>}

    const content = (
        <div id='dashboard'>
            <div id='column1'>
                <div id='statistics'>
                    <div id='cpu'>
                        <label>CPU</label>
                        <label id={(parseInt(data?.data?.cpu) <= 80)?'green':'red'}>{data?.data?.cpu}{data?.data?'%':''}</label>
                    </div>
                
                    <div id='ram'>
                        <label>RAM</label>
                        <label id={(parseInt(data?.data?.ram) <= 80)?'green':'red'}>{data?.data?.ram}{data?.data?'%':''}</label>
                    </div>

                    <div id='updates'>
                        <label>Updates</label>
                        <label>None</label>
                    </div>

                    <div id='users'>
                        <label>Users</label>
                        <label>{data.data?.users.length}</label>
                    </div>

                    <div id='online'>
                        <label>Online</label>
                        <label>None</label>
                    </div>

                    <div id='None'>
                        <label>None</label>
                        <label>None</label>
                    </div>
                </div>

                <div id='userTable'>
                    <div id='userTableHeader'>
                        <label>Name</label>
                        <label>Status</label>
                    </div>
                    <div id='userTableContent'>
                        {(data?.data?(data.data?.users):[]).map((user, key)=>
                            <div id='row' key={key}>
                                <label>{user[0]}</label>
                                <label id={(user[1] =='offline')?'red':'green'}>{user[1]}</label>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
    return ( content );
};
