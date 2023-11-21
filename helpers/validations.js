import Role from '../models/role.js'
import User from '../models/user.js'

/**
 * 
 * @param {String} role 
 * @returns Verifies if the role entered exists
 */
export const roleValidation = async (role = '') => {
    const thereIsRole = await Role.findOne({role});
    if(!thereIsRole){
        throw new Error(`This role does not exist ${role}`);
    }
}


/**
 * 
 * @param {String} email 
 * @returns verify if the email entered is valid
 */
export const emailValidation = async(email) => {
    const thereisEmail = await User.findOne({email});
    if(thereisEmail) {
        throw new Error(`This email already exists`)
    }
}