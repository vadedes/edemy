import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    content: {
      type: String,
      minlength: 200,
    },
    video: String,
    free_preview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      minlength: 200,
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      default: 9.99,
    },
    image: {
      type: String,
      required: true,
    },
    category: [String],
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    instructor: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [lessonSchema],
  },

  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
