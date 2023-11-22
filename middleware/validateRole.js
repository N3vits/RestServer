

export const isAdminRole = (req, res, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'Role verification required without validating the token first'
        })
    }
    const {role, name} = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `The user is not an administrator ${name} Insufficient permissions`
        })
    }
    next();

}


export const validateRole = (...role) => {
    return (req, rest, next) =>{
        if(!req.user){
            return res.status(500).json({
                msg: 'Role verification required without validating the token first'
            })
        }
        if(!role.includes(req.user.role)){
            return res.status(401).json({
                msg: `Insufficient permissions, some of the following roles are required in order to proceed ${role}`
            })
        }
        next();
    }
}