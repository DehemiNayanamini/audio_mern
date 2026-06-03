import User from '../modules/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

export function registerUser(req, res) {

    const data = req.body;

    data.password = bcrypt.hashSync(data.password, 10);

    const newUser = new User(data)
     
    newUser.save().then(()=>{
        res.status(201).json({ message: 'User registered successfully' });
    }).catch((error) => {
        res.status(500).json({ message: 'Error registering user', error: error });
    });
}
export function loginUser(req, res) {
    const data = req.body;

    User.findOne({
        email: data.email
    }).then(
        (user) => {
            if (user == null){
                res.status(404).json({ message: 'User not found' });
            } else {
                
                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    role : user.role,
                    profilePicture : user.profilePicture,
                    phone : user.phone
                }, process.env.JWT_SECRET);
                if(bcrypt.compareSync(data.password, user.password))
                    res.json({ message: 'Login successful', token: token });
                else
                    res.status(401).json({ message: 'Invalid password' });
            }
            
        }
    )
}
export function isITAdmin(req) {
    let isAdmin = false;
    if(req.user != null ){
        if(req.user.role == 'admin'){
            isAdmin = true;
    }
}
return isAdmin;
}
export function isITCustomer(req) {
    let isCustomer = false;
    if(req.user != null ){
        if(req.user.role == 'customer'){
            isCustomer = true;
        }
    }
    return isCustomer;
}