import React, { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email:"",
    password:""
  })

  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>{
    const{name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    });
    setErrMsg("");
  }

  const perfomChecks = () =>{
    const {email, password} = user
      if(email && password ){
          LoginUser();
      }
      else{
          setErrMsg("All feilds are mandatory");
      }
  }

  const LoginUser = async () =>{
    try{
      const response = await fetch("http://localhost:3001/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await response.json();

        if (response.ok) {
          setErrMsg(data.message)
          console.log(data.message);

          sessionStorage.setItem('token' , data.token);
          sessionStorage.setItem('user' , JSON.stringify(data.user));
          navigate("/dashboard");

          
        } else {
          setErrMsg(data.message)
          if(data.error) {console.error(data.error)}
        }

      }
      catch (error){
        console.error(error);
      }
  }


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
          Login
        </Typography>

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
          Login
        </Button>
        <Button onClick={()=>{navigate("/")}}>Register</Button>
      </Box>
    </div>
  );
};

export default LoginPage;
