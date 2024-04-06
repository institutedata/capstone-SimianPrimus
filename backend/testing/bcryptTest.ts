import bcrypt from "bcrypt";

// Test hashing a password
const testPassword = "password"; 
// Hash the password
const knownHash = "$$2b$10$amz8Szd/o9JhhJKQNys1EeJUnEJJw9X8sP82iqpp4n/.PdtTwzJLi"; 

// Compare the password to the hash
bcrypt.compare(testPassword, knownHash, (err, result) => {
  if (err) {
    console.error("Error during comparison", err);
    return;
  }
  console.log("Password comparison result:", result); // Should be true if the password matches the hash
});