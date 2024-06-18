const bcrypt = require('bcrypt');

const password = '12345678';
const hashedPassword = bcrypt.hashSync(password, 10);

console.log('Plain Password:', password);
console.log('Hashed Password:', hashedPassword);

const isMatch = bcrypt.compareSync(password, hashedPassword);
console.log('Password comparison result:', isMatch);

