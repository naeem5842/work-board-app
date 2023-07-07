import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const ShowDashboard = () => {

    const [msg, setMsg] = useState("");
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const [userLoggedIN, setUserLoggedIn] = useState(false);

    const handleLogout = () =>{
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user')
        navigate('/login');
    }

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () =>{
        try{
        console.log("called fetch");
        const token = sessionStorage.getItem('token');
        
        const response = await fetch("http://localhost:3001/user/dashboard", {
            method : "GET",
            headers : {
                authorization : `Bearer ${token}`,
                'Content-type' : 'application/json'
            }
        });
        if(response.ok){
            const data = await response.json();
            setMsg(data.message);
            setUserLoggedIn(true);
        }
        
        }
        catch (error){
            console.error(error);
        }
    }


    

  return (
    <div>
        {userLoggedIN ? <Dashboard  handleLogout = {handleLogout}/> : msg}
    </div>
  )
}


export default ShowDashboard;