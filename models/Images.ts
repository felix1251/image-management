import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
      {
            hits: {type: Number, default: 1},
            url: {type: String, required: true},
      },
      {timestamps: true}
);

export default mongoose.model("Image", ImageSchema)
