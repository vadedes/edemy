import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "@/components/routes/InstructorRoute";
import CourseCreateForm from "@/components/forms/CourseCreateForm";

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
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    //1. Select the file uploaded to the input field with type=file
    //createObjectURL comes with browsers by default
    //create a temporary URL representing the first file that was selected by the user.
    //use this URL only for temporary preview purposes and not to rely on it for long-term storage or retrieval of the file
    setPreview(window.URL.createObjectURL(e.target.files[0]));
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
          />
        </div>
        <pre>{JSON.stringify(values, null, 4)}</pre>
        {/* preview data in json format in the frontend for easy viewing */}
      </InstructorRoute>
    </>
  );
};

export default Coursecreate;
