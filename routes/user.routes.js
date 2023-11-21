import express from 'express'
import { deleteUser, getUser, patchUser, postUser, putUser } from '../controller/user.controller.js';
import { check } from 'express-validator';
import { validateFields } from '../middleware/validateFields.js';
import { emailValidation, idValidation, roleValidation } from '../helpers/validations.js';


export const router = express.Router();

router.get('/', getUser);

router.put('/:id',[
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom( idValidation ),
    check('role').custom( roleValidation ),
    validateFields
] ,putUser);

router.post('/', [
    check('email', 'This email is not valid').isEmail(),
    check('email').custom( emailValidation ),
    check('password', 'The minimum length must be 6').isLength({min: 6}),
    check('name', 'User name required').not().isEmpty(),
    check('role').custom( roleValidation ),
    validateFields
] 
, postUser);

router.delete('/:id',[
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom( idValidation ),
    validateFields
], deleteUser);

router.patch('/', patchUser);


