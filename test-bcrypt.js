// test-bcrypt.js
import bcrypt from 'bcryptjs';

const password = 'admin123';
const newHash = bcrypt.hashSync(password, 10);
console.log('Generated hash:', newHash);

bcrypt.compare(password, newHash).then(isValid => {
  console.log('Password valid:', isValid);
});