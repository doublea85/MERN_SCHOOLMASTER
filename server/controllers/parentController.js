import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';


/** POST: http://localhost:3001/api/registerStudent 
 * @param : {
  "password" : "Adminadmin123",
  "email": "example@gmail.com",
  "firstName" : "Bill",
  "lastName": "William",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/

export async function registerParent(req, res) {
  const { firstName, lastName, email, profile } = req.body;

  try {
      // check for existing email
      const existingUser = await UserModel.findOne({ email }).exec();
      if (existingUser) {
          return res.status(400).send({ error: 'Email address is already in use' });
      }

      // generate random password
      const password = crypto.randomBytes(16).toString('base64');

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          profile: profile || '',
          role: 'parent'
      });
      // save user
      const savedUser = await user.save();

      //send password to user via email
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: ENV.EMAIL,
          pass: ENV.PASSWORD,
        },
      });
      await transporter.sendMail({
        from: ENV.EMAIL,
        to: email,
        subject: 'Your New Account',
        text: `Hi ${firstName},\n\nYour account has been created successfully. Here's your temporary password: ${password}`,
      });

      return res.status(201).send({ msg: 'User registered successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Server error' });
  }
}

/**
 * GET: http://localhost:3001/api/parents 
 */
export const parents = async (req, res) => {
  try {
    const parents = await UserModel.find({ role: 'parent' });
    res.status(200).json(parents);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/** -------- Specific parent ---------- */
export const parent = async(req, res) => {
  try {
    const { id } = req.params;
    const parent = await UserModel.findOne({ _id : id });
    res.status(200).json(parent);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/** UPDATE STUDENT */
// export const updateStudent = async(req, res) => {
//   try {
//   const { id } = req.params;
//   const student = await UserModel.findOneAndUpdate({ _id: id, role: 'student' }, req.body, 
//   { new: true })
//       res.status(200).json(student);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   } 
    
// };

export async function updateParent(req, res) {
  try {
      const { userId } = req.params;
      if (!userId) {
          return res.status(400).send({ error : "User ID not found...!" });
      }

      const body = req.body;
      // Add validation for req.body here...
      await UserModel.updateOne({ _id: userId }, body);

      return res.status(200).send({ msg: "Record updated...!"});
  } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Server error" });
  }
};



/** DELETE PARENT */
export const deleteParent = async (req, res) => {
  try {
    const { id } = req.params;
    const parent = await UserModel.findOneAndDelete(id)
      if (!parent) {
        res.status(404).json({ message: "Parent not found" });
        return;
      }
      res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

