import jwt from 'jsonwebtoken';
import config from '../Configurations/Config.js';

const taskMiddleware = (req, res, next) =>{    

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
          
        try{
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded.user;
            next();
        } catch(error){
            console.error(error)
            res.status(401).json({message : "Access Denied"});
        }
    
}


export default taskMiddleware;