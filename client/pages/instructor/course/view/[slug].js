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
      <div className='container mx-auto'>
        <pre>{JSON.stringify(course, null, 4)}</pre>
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
