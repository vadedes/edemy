import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "@/components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    //1. make the request
    const { data } = await axios.get("/api/instructor-courses");
    //2. set courses in state
    setCourses(data);
  };

  return (
    <>
      <InstructorRoute className='container mx-auto py-10 flex flex-col justify-center items-center w-96'>
        <h1 className='text-5xl text-bold text-center mx-auto mb-10'>Instructor Dashboard</h1>
        <pre>{JSON.stringify(courses, null, 4)}</pre>
        {/* {courses &&
          courses.map((course) => (
            <div className='pt-2'>
              <Avatar size={80} src={course.image ? course.image.Location : "/course.png"} />

              <div></div>
            </div>
          ))} */}
      </InstructorRoute>
    </>
  );
};

export default InstructorIndex;
