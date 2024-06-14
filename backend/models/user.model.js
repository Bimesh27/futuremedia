import mongoose from "mongoose";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema(
     {
          username: {
               type: String,
               required: [true, "username is required"],
               unique: true,
               minLength: [3, "Username must be atleast 3 character long"],
          },
          email: {
               type: String,
               required: [true, "email is required"],
               unique: true,
               match: [emailRegex, "please enter a valid email address"],
          },
          password: {
               type: String,
               required: [true, "password is required"],
          },
          profilePic: {
               type: String,
               default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
          },
          bio: {
               type: String,
               default: "",
          },
     },
     { timestamps: true }
);

const User = mongoose.model("User", userSchema)

export default User;