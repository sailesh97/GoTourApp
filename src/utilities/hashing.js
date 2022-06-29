import bcrypt from 'bcrypt'

require('dotenv').config()

export const SALT_ROUNDS = +process.env.SALT_ROUNDS;

// bcrypt works
export async function hash(password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
