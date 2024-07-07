const {
  generateToken,
} = require("../../middleware/authentication/authenticate");
const UserMaster = require("../../models/User.Model");
const { encrypt, decrypt, isEmpty } = require("../../utils");

async function login(req, res) {
  try {
    const errors = checkForm(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const { firstName, lastName, password, emailId } = req.body;

    const userMasterSchema = new UserMaster({
      firstName,
      lastName,
      password,
      emailId,
    });

    // Check if user already exist
    const user = await UserMaster.findOne({ email: userMasterSchema.email });
    if (user) {
      const decryptedPassword = decrypt(user.password);

      if (password == decryptedPassword) {
        const userDetails = {
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          id: user.id,
        };
        const token = generateToken(userDetails);
        return res.status(200).json({
          message: "Login successful",
          data: {
            userDetails,
            token,
          },
        });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

function checkForm(user) {
  const errors = {};

  if (isEmpty(user)) {
    errors.firstName = "First name is required";
    errors.password = "Password is required";
    errors.emailId = "Email is required";
  }

  if (isEmpty(user.firstName)) {
    errors.firstName = "First name is required";
  }

  if (isEmpty(user.password)) {
    errors.password = "Password is required";
  }

  if (isEmpty(user.emailId)) {
    errors.emailId = "EmailId is required";
  }

  return errors;
}

async function signUp(req, res) {
  try {
    // Validate user data

    const errors = checkForm(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const { firstName, lastName, password, emailId } = req.body;

    const user = new UserMaster({ firstName, lastName, password, emailId });

    // Check if user already exist
    const existingUser = await UserMaster.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    user.password = encrypt(user.password);

    const response = await user.save().catch((err) => {
      return res.status(400).json({ message: err.message });
    });

    if (response) {
      const token = generateToken(response._id);
      return res
        .status(201)
        .json({ message: "User created successfully", token });
    } else {
      return res.status(400).json({ message: "Invalid data" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

module.exports = { login, signUp };
