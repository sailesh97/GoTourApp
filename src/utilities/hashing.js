import bcrypt from 'bcrypt'
export const SALT_ROUNDS = 10;

// bcrypt works
export async function hash(password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}