import bcrypt from 'bcryptjs'
export async function encryptPassword(password) {
    // Combine password with the secret key
    const combinedPassword = password + process.env.SECRET;

    // Generate a salt (bcrypt automatically generates one)
    const saltRounds = 12; // You can adjust the number of rounds for complexity
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the combined password with the salt
    const hash = await bcrypt.hash(combinedPassword, salt);

    return hash;
}

export async function comparePassword(inputPassword, storedHashedPassword) {
    // Combine the input password with the secret key
    const combinedPassword = inputPassword + process.env.SECRET

    // Compare the combined password hash with the stored hash
    const match = await bcrypt.compare(combinedPassword, storedHashedPassword);
    
    return match; // Returns true if the passwords match, false otherwise
}
