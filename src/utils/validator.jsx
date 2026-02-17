

export const validateEmail = (email) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


export const validatePassword = (password) => {
    let score  = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};