import express from 'express'
import { deleteUser, getUser, patchUser, postUser, putUser } from '../controller/user.controller.js';
import { check } from 'express-validator';
import { validateFields } from '../middleware/validateFields.js';
import { emailValidation, roleValidation } from '../helpers/validations.js';


export const router = express.Router();

router.get('/', getUser);

router.put('/', putUser);

router.post('/', [
    check('email', 'This email is not valid').isEmail(),
    check('email').custom( emailValidation ),
    check('password', 'The minimum length must be 6').isLength({min: 6}),
    check('name', 'User name required').not().isEmpty(),
    check('role').custom( roleValidation ),
    validateFields
] 
, postUser);

router.delete('/', deleteUser);

router.patch('/', patchUser);


