"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
// @desc    Register new user
// @route   /api/users
// @access  Public
function registerUser(req, res) {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include all fields');
    }
    res.send('Register Route');
}
exports.registerUser = registerUser;
// @desc    Login
// @route   /api/users/login
// @access  Public
function loginUser(req, res) {
    res.send('Login Route');
}
exports.loginUser = loginUser;
