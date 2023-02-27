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

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <>
      <InstructorRoute className='container mx-auto py-10 flex flex-col justify-center items-center w-96'>
        <h1 className='text-5xl text-bold text-center mx-auto mb-10'>Instructor Dashboard</h1>
        {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
        {courses &&
          courses.map((course) => (
            <div className='media pt-2 px-10 flex items-center justify-start mb-4 w-full'>
              <Avatar size={80} src={course.image ? course.image.Location : "/course.png"} />

              <div className='media-body pl-4 w-full'>
                <div className='flex w-full justify-between'>
                  <div className='flex flex-col justify-start'>
                    <Link
                      href={`/instructor/course/view/${course._id}`}
                      className='cursor-pointer mt-2 text-2xl font-bold pb-2'>
                      {course.name}
                    </Link>
                    <p className='mt-[-10px]'>{course.lessons.length} Lessons</p>

                    {course.lessons.length < 5 ? (
                      <p style={{ myStyle }} className='text-red-500'>
                        At least 5 lessons are required to publish a course
                      </p>
                    ) : course.published ? (
                      <p style={{ myStyle }} className='text-green-500'>
                        Your course is live in the marketplace
                      </p>
                    ) : (
                      <p style={{ myStyle }} className='text-blue-500'>
                        {" "}
                        Your course is ready to be published
                      </p>
                    )}
                  </div>

                  <div className='mt-3 text-center w-1/3'>
                    {course.published ? (
                      <Tooltip title='Published'>
                        <CheckCircleOutlined className='text-xl cursor-pointer' />
                      </Tooltip>
                    ) : (
                      <Tooltip title='Unpublished'>
                        <CloseCircleOutlined className='text-xl cursor-pointer' />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </InstructorRoute>
    </>
  );
};

export default InstructorIndex;
