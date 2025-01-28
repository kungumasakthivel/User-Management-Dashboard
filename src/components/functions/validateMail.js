// function to validate the email while adding or editing the user details
export const validateEmail = (email) => {
    email = email.trim();                        // trim off leading and trailing whitespace
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // regular expressions to validate email
    return regex.test(email);                    // return true if email is valid else false
};