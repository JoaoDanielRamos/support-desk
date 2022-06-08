"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
// @desc    Register new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include all fields');
    }
    // Find if user already exists
    const userExists = yield User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    // Hash password
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(password, salt);
    // Create User
    const user = yield User.create({
        name,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));
exports.registerUser = registerUser;
// @desc    Login
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User.findOne({ email });
    // Check user and password
    if (user && (yield bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        throw new Error('Invalid Credentials');
    }
}));
exports.loginUser = loginUser;
// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    };
    res.status(200).json(user);
}));
exports.getMe = getMe;
// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
