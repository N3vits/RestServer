import bcryptjs from 'bcryptjs'
import User from '../models/user.js'

export const getUser = (req, res) => {
    const {q, token, username} = req.query;
    res.json({
        q,
        token,
        username
    })
}

export const postUser = async(req, res) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});
    
    //Password encryption
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Save info in database
    await user.save()
    res.json({
        user,
    })
}

export const deleteUser = (req, res) => {
    res.json({
        msg: 'delete API - Controller'
    })
}

export const putUser = (req, res) => {
    res.json({
        msg: 'put API - Controller'
    })
}

export const patchUser = (req, res) => {
    res.json({
        msg: 'patch API - Controller'
    })
}