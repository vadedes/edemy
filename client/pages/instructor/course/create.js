import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "@/components/routes/InstructorRoute";
import CourseCreateForm from "@/components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";

const Coursecreate = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
  });
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    //1. Select the file uploaded to the input field with type=file
    //createObjectURL comes with browsers by default
    //create a temporary URL representing the first file that was selected by the user.
    //use this URL only for temporary preview purposes and not to rely on it for long-term storage or retrieval of the file
    let file = e.target.files[0];

    setPreview(window.URL.createObjectURL(file));

    //2. change the upload image button text first to whatever the uploaded file name is
    setUploadButtonText(file.name);

    //3. set the values and loading state - just spread the current values
    setValues({ ...values, loading: true });

    //4. resize the image
    //first arg is the file itself, 2nd arg is the size(w & h), 3rd is format, 4 is quality, 5 rotation
    //6th callback function where we will get the image data that we will send to the backend
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        //send data to the backend
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        //set image in the state
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <>
      <InstructorRoute className='container mx-auto py-10 flex flex-col justify-center items-center w-96'>
        <h1 className='text-5xl text-bold text-center mx-auto mb-10'>Create Course</h1>

        <div className='pt-3 pb-3'>
          <CourseCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleImage={handleImage}
            values={values}
            setValues={setValues}
            preview={preview}
            uploadButtonText={uploadButtonText}
          />
        </div>
        <pre>{JSON.stringify(values, null, 4)}</pre>
        {/* preview data in json format in the frontend for easy viewing */}
      </InstructorRoute>
    </>
  );
};

export default Coursecreate;
