import mongoose from "mongoose";

//custom validation
const validateEmail = (email:string): boolean => {
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(email)
};

const validatePassword = (password:string): boolean => {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{0,8}$/
      return re.test(password)
}

var passwordErrMsg:string = "must be eight characters long, "
passwordErrMsg += "must contain at least one uppercase character, "
passwordErrMsg += "must contain at least one lowercase character,"
passwordErrMsg += "must contain at least one digit, "
passwordErrMsg += "must contain at least one special character"

const UserSchema = new mongoose.Schema(
      {
            email: {
                  type: String, 
                  required: true, 
                  unique: true,
                  validate: [validateEmail, 'Please provide a valid email address'],
            },
            name: {type: String, required: true},
            password: {
                  type: String, 
                  required: true,
                  validate: [validatePassword, passwordErrMsg]
            },
            isAdmin: {type: Boolean, default: false}
      },
      {timestamps: true}
);

export default mongoose.model("User", UserSchema)
