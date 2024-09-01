const User = require("../models/user-model");
const bcrypt = require('bcryptjs');


const home = async (req, res) => {
    try {
        res.status(200).send("Welcome using router");
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        });

        res
        .status(201)
        .json({ msg: "registration successfull", 
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),
            });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
};

// User login logic 
const login = async (req, res) => {
    try{
        const {email, password } = req.body;

        const userExist = await User.findOne({email});

        console.log(userExist);

        if(!userExist) {
            return res.status(400).json({ message : "Invalid Credentials "});
        }

        //const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);


        if(user) {
            res.status(200).json({ 
                message: "Login successfull", 
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),

        });
    } else {
        res.status(500)
        .json({message:"Invalid email or password"});
    }

    }catch(error){
       // res.status(500).json("internal server error");
    next(error);
    }
};

//user logic
const user = async (req, res) => {
    try {
        //const userData = await User.find({});
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData});
    } catch (error) {
        console.log(`error from the user route ${error}`);
        
    }
};


module.exports = { home, register,login, user};
