import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
      firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      email: {
        type: String,
        required: [true, "Email is invalid or already taken"],
        max: 50,
        unique: [true, "Email is invalid or already taken"],
        index: true,
      },
      password: {
        type: String,
        required: [true, "Please provide password"],
        min: 8,
      },
      mobile: {
        type: Number,
        min: 10,
        max: 14,
      },
      address : {
        type: String
      },
      profile : {
        type: String
      },
      role: {
        type: String,
        enum: ['admin', 'teacher', 'student', 'parent'],
        default: 'student'
      }
});

export default mongoose.models.Users || mongoose.model('User', UserSchema);