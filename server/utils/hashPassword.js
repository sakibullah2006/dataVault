import crypto from 'crypto';

export const hashPassword = (password) => {
    return crypto.createHash('md5').update(password).digest('hex')
}