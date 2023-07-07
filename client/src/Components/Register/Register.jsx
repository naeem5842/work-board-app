import React, { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    
    const[user, setUser] = useState({
        name: "",
        email : "",
        password : "",
        reEnterPassword : "",
    })
    const [errMsg, setErrMsg] = useState("");

    
    const navigate = useNavigate()


    const navigateToLogin = () =>{
      navigate("/Login")
    }


    const handleChange = (e)=>{
        const {name, value } = e.target;
        setUser({
            ...user, 
            [name] : value
        });
        setErrMsg("");
    }

    const perfomChecks = () =>{
      const {name, email, password, reEnterPassword} = user
      if(name && email && password && reEnterPassword){
        if(password === reEnterPassword){
          registerUser();
        }
        else{
          setErrMsg('Passwords does not match')
        }
      }
      else{
          setErrMsg("All feilds are mandatory");
        }
    }
    


    const registerUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await response.json();
        console.log(data.message);

        if (response.ok) {
          console.log("Registeration successful");
          navigateToLogin()
        } else {
          setErrMsg(data.message)
          if(data.error) {console.log(data.error)}
        }
      } catch (error) {
        setErrMsg("Registration failed due to server error")
        console.log(error)
      }
    };

  return (
    <div>
      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={500}
        alignItems="center"
        justifyContent="center"
        margin="auto"
        marginTop={5}
        padding={5}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Typography variant="h2" padding={3} textAlign="center">
          Register
        </Typography>

        <TextField
          sx={{ width: "70%" }}
          margin="normal"
          type="text"
          label="Name"
          variant="outlined"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <TextField
          sx={{ width: "70%" }}
          margin="normal"
          type="email"
          label="Email"
          variant="outlined"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <TextField
          sx={{ width: "70%" }}
          margin="normal"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <TextField
          sx={{ width: "70%" }}
          margin="normal"
          type="password"
          label="Re-Enter Password"
          variant="outlined"
          name="reEnterPassword"
          value={user.reEnterPassword}
          onChange={handleChange}
        />
        <Typography
          variant="caption"
          marginTop={3}
          sx={{ color: "error.main" }}
        >
          {errMsg}
        </Typography>
        <Button
          sx={{ marginTop: 3, borderRadius: 3 }}
          variant="contained"
          color="warning"
          onClick={perfomChecks}
        >
          Register
        </Button>
        <Button onClick={navigateToLogin}> Login </Button>
      </Box>
    </div>
  );
};

export default Register;
