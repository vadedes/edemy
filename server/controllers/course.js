import AWS from "aws-sdk";
import { nanoid } from "nanoid";
import Course from "../models/course";
import slugify from "slugify";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

//upload avatar image on course create form, save to aws s3 first then
//return back the uploaded image object data to be saved in the database
export const uploadImage = async (req, res) => {
  // console.log(req.body);
  try {
    //1. get the image from req body
    const { image } = req.body;

    //2.check if no img
    if (!image) return res.status(400).send("No image");

    //3. prepare the image
    const data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(data, "base64");
    const type = image.split(";")[0].split("/")[1];

    //4. image params
    const params = {
      Bucket: "vade-edemy-bucket",
      Key: `${nanoid()}.${type}`, //fdsaf.jpeg output file name sample
      Body: buffer,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    //upload to s3
    const uploadedData = await S3.upload(params).promise();
    console.log(uploadedData);

    res.send(uploadedData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

//remove uploaded avatar on course create form
export const removeImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image || !image.Bucket || !image.Key) {
      return res.status(400).json({ message: "Invalid request" });
    }

    //image params
    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    };

    //send remove request to s3
    await S3.deleteObject(params).promise();

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete image" });
  }
};

//create a course
export const create = async (req, res) => {
  try {
    const { name } = req.body;
    //1. Check if the course already exists by checking the course name
    if (!name) return res.status(400).send(`Invalid request, course name is required`);

    const alreadyExist = await Course.findOne({
      slug: slugify(name.toLowerCase()), //convert course name into a slug
    });

    if (alreadyExist) {
      return res.status(400).send("Course name is already taken");
    }

    //2. save the course to the database
    const course = await Course.create({
      slug: slugify(name), //generate slug based on name
      instructor: req.auth._id,
      ...req.body,
    });

    //3. respond to frontend with json data containing course object
    res.json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Course create failed. Try again.");
  }
};

export const read = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate("instructor", "_id name") //2nd arg here is we are selecting just the data about the instructor we want to pull
      .exec();
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};

export const addLesson = async (req, res) => {
  try {
    const { slug, instructorId } = req.params;
    const { title, content, video } = req.body;

    if (req.user._id != instructorId) {
      return res.status(400).send("Unauthorized");
    }

    const updated = await Course.findOneAndUpdate(
      { slug },
      {
        $push: { lessons: { title, content, video, slug: slugify(title) } },
      },
      { new: true }
    )
      .populate("instructor", "_id name")
      .exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Add lesson failed");
  }
};
