import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from "../models/Resume.js";
const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
    return token;
}
//controller
//controller for user registration
//POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, jobRole, higherEducation, skills } = req.body;

        // check if required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User Already Exists' });
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            jobRole: jobRole || "",
            higherEducation: higherEducation || "",
            skills: skills || []
        });

        // generate token
        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return res.status(201).json({ message: 'User created successfully', token, user: newUser });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


//controller for user login
//POST: /api/users/login

export const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
      
        //check if user  exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'Invalid email or password'})
        }

        //check if password is correct
        if(!user.comparePassword(password)){
            return res.status(400).json({message:'Invalid email or pssword'})
        }

        //return success message
        const token=generateToken(user._id)
        user.password=undefined;

        return res.status(200).json({message:'User Login successfull',token,user})
     
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

// Update backend for /api/users/update
// PUT: /api/users/update
export const updateUser = async (req, res) => {
    try {
        const userId = req.userId; // from auth middleware
        const { name, jobRole, higherEducation, skills } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, jobRole, higherEducation, skills },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        updatedUser.password = undefined;
        return res.status(200).json({ message: 'Profile updated', user: updatedUser });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// controller for getting user by id
// GET: /api/users/data

export const getUserById=async(req,res)=>{
    try{
        
        const userId=req.userId;

        //check if user exists
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({message:'User not found'})
        }

        //return user
        user.password=undefined;
        return res.status(200).json({user})
     
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

//controller for getting user resumes
//GET: /api/users/resumes

export const getUserResumes=async(req,res)=>{
    try{
        const userId=req.userId;

        //return user resumes
        const resumes=await Resume.find({userId})
        return res.status(200).json({resumes})
    }catch(error){

    }
}

// GET: /api/users
// Get all users (basic admin function; password omitted)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE: /api/users/:id
// Delete a user by id
export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};