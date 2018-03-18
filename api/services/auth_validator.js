const validation = (username, password) => {
    let error = "";

    if (username.length == 0){
        error = "the user name is not entered";
    }
    if (password.length == 0){
        error = "password not entered";
    }
    if (password.length < 8){
        error = "min password length 8 characters";
    }

    return {error, isValid: !error.length}
};

export default validation;