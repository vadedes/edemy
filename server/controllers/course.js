import AWS from "aws-sdk";
import { nanoid } from "nanoid";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

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
