// function to validate the email while adding or editing the user details
export const validateEmail = (email) => {
    email = email.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};