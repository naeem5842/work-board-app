import dotenv from "dotenv";

dotenv.config();

const config = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: '1h',
  };
  
  export default config;