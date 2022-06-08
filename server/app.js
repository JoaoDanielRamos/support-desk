"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colors = require('colors');
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = require("./config/db");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' });
});
// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
