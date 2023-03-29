import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(
  process.env.MONGOURL!,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected")
);
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  pass: {
    type: String,
    required: true,
  },
  isOnline: {
    type: Boolean,
    default: true
  },
  cover: {
    type: String,
    default: "/images/OH-IMG.jpg"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const User = mongoose.model("User", UserSchema);
export default User;
