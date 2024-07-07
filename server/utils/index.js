const crypto = require("crypto");

const originalKey = process.env.SECRET_KEY;

function get32ByteKey(key) {
  return crypto.createHash("sha256").update(key).digest();
}

const algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16); // Initialization vector must be 16 bytes

// Encrypt function
function encrypt(text) {
  const secretKey = get32ByteKey(originalKey);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

// Decrypt function
function decrypt(encryptedText) {
  const secretKey = get32ByteKey(originalKey);
  const textParts = encryptedText.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encrypted = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function isEmpty(value) {
  // Check for null or undefined
  if (value === null || value === undefined) {
    return true;
  }
  // Check for empty string
  if (typeof value === "string" && value.trim() === "") {
    return true;
  }
  // Check for empty array
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  // Check for empty object
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }
  // Check for 0 or false (not strictly empty but often considered as such in some contexts)
  if (value === 0 || value === false) {
    return false; // Return false explicitly since these are not empty in a strict sense
  }
  // Otherwise, consider it non-empty
  return false;
}

module.exports = { encrypt, decrypt, isEmpty };
