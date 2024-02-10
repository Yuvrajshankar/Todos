import { generateToken } from "../middlewares/GenerateToken.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// REGISTER
export const register = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(409);
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({ userName, email, password: passwordHash });

        if (newUser) {
            generateToken(res, newUser._id);
            res.status(201).json({ newUser });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: "User does not exist." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid password." });
        }

        // Generate token and send the response only if the user exists and the password is valid
        generateToken(res, user._id);
        delete user.password;
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

// LOGOUT
export const logout = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

// CHECK AUTH
export const checkAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            return res.json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                profileImage: user.profileImage,
            });
        }
    } catch (error) {
        next(error);
    }
};
