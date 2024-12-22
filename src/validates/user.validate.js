export const userValidationLogin = (email, password) => {
    if(!email || !password) {
        return true;
    }
    return false
}

export const userValidationRegister = (fullName, email, password, conformPassword) => {
    if(!fullName ||!email ||!password ||!conformPassword) {
        return true;
    }

    if(password !== conformPassword) {
        return true;
    }

    return false
}
