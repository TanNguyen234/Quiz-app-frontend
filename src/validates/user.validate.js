export const userValidationLogin = (email, password) => {
    if(!email || !password) {
        return false;
    }
    return true
}

export const userValidationRegister = (fullName, email, password, conformPassword) => {
    if(!fullName ||!email ||!password ||!conformPassword) {
        return false;
    }
    if(password !== conformPassword) {
        return false;
    }
    return true
}