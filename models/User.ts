import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
      {
            email: {type: String, required: true, unique: true},
            name: {type: String, required: true},
            password: {type: String, required: true},
            isAdmin: {type: Boolean, default: false}
      },
      {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema)