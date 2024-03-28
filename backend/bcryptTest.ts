import bcrypt from "bcrypt";

const testPassword = "password"; // Replace with the actual password text
const knownHash = "$$2b$10$amz8Szd/o9JhhJKQNys1EeJUnEJJw9X8sP82iqpp4n/.PdtTwzJLi"; // Replace with an actual hash from your database

bcrypt.compare(testPassword, knownHash, (err, result) => {
  if (err) {
    console.error("Error during comparison", err);
    return;
  }
  console.log("Password comparison result:", result); // Should be true if the password matches the hash
});