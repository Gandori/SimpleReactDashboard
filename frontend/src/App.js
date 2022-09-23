import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import './layout.sass';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Signin from './pages/auth/signin';
import Signup from './pages/auth/signup';
import Dashboard from './pages/dashboard/dashboard';
import { ApiGET } from './components/api';

export const DataContext = createContext({data: null, setData:()=>{},});

export default function App()
{
  const [data, setData] = useState(null);

  useEffect(() =>{ApiGET('/data', setData);}, [])
  
  return(
    <DataContext.Provider value={{data:data, setData:(value)=>{setData(value);},}}>
      <div id='app'>
        <BrowserRouter>
        
          <Header></Header>
        
          <div id='content'>
            <Routes>
              <Route path='/'>
                    <Route path='*' element={<h1>404</h1>}></Route>
                    <Route index element={<Signin></Signin>}></Route>
                    <Route path={'registrieren'} element={<Signup></Signup>}></Route>
                    <Route path={'dashboard'} element={<Dashboard></Dashboard>}></Route>
                </Route>
            </Routes>
          </div>
        
          <Footer></Footer>
      
        </BrowserRouter>
      </div>
    </DataContext.Provider>
  );
}