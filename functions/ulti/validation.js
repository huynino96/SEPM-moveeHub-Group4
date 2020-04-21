module.exports = (email) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) {
      return true;
    } else {
      return false;
    }
  };
  
  const isEmpty = (string) => {
    if (string.trim() === "") {
      return true;
    } else {
      return false;
    }
  };

  exports.validateSignupData = (data) => {
    let errors = {};
  
    // Validate a legal email address
    if (isEmpty(newUser.email)) {
      errors.email = "Must not be empty";
    } else if (!isEmail(newUser.email)) {
      errors.email = "Must be a valid email address";
    }
  
    // Password must not be empty
    if (isEmpty(newUser.password)) {
      errors.password = "Must not be empty";
    }
  
    //Password and confirm must match
    if (newUser.password !== newUser.confirmPassword) {
      errors.confirmPassword = "Password must match";
    }
  
    if (isEmpty(newUser.handle)) {
      errors.handle = "Must not be empty";
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
  };

  exports.validateLoginData = (data) => {
    let errors = {};
  
    // Check both email and password must be entered
    if (isEmpty(user.email)) {
      errors.email = "Must not be empty";
    }
    if (isEmpty(user.password)) {
      errors.password = "Must not be empty";
    }
  
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
  }