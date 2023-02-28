import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "@/components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "@/components/forms/AddLessonForm";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";

const CourseView = () => {
  const [course, setCourse] = useState({});
  // for lessons
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);
  // student count
  const [students, setStudents] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course && studentCount();
  }, [course]);

  //Load the courses
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  const studentCount = async () => {
    //
  };

  //Functions for Adding Lessons
  const handleAddLesson = async (e) => {
    e.preventDefault();
  };

  const handleVideo = async (e) => {
    //
  };

  const handleVideoRemove = async () => {
    //
  };

  const handlePublish = async (e, courseId) => {
    //
  };

  return (
    <InstructorRoute>
      <div className='container mx-auto px-5 w-full'>
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className='container mx-auto pt-1 flex w-full items-center justify-between'>
            <div className='media pt-2 flex justify-start items-center w-full'>
              <Avatar
                className='object-cover min-w-[80px]'
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />

              <div className='media-body pl-4 flex justify-between w-full'>
                <div className='flex flex-col'>
                  <h5 className='mt-2 text-xl'>{course.name}</h5>
                  <p style={{ marginTop: "-5px" }}>
                    {course.lessons && course.lessons.length} Lessons
                  </p>
                  <p style={{ fontSize: "10px" }}>{course.category}</p>
                </div>

                <div className='flex pt-4'>
                  <Tooltip title='Edit'>
                    <EditOutlined
                      onClick={() => router.push(`/instructor/course/edit/${slug}`)}
                      className='h5 pointer mr-6 cursor-pointer'
                    />
                  </Tooltip>

                  <Tooltip title='Publish'>
                    <CheckOutlined
                      onClick={(e) => handlePublish(e, course._id)}
                      className='h5 pointer text-red-500 cursor-pointer'
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <hr />
            <div></div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
