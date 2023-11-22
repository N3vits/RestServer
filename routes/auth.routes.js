import express from 'express'
import { check } from 'express-validator';
import { login } from '../controller/auth.controller.js';
import { validateFields } from '../middleware/validateFields.js';
export const router = express.Router();

router.post('/login',[
    check('email', 'The email must be valid').isEmail(),
    check('password', 'Incorrect password').not().isEmpty(),
    validateFields
] ,login)