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
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    console.log("STUDENT COUNT => ", data);
    setStudents(data.length);
  };

  //Functions for Adding Lessons
  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      // console.log(data)
      setValues({ ...values, title: "", content: "", video: {} });
      setProgress(0);
      setUploadButtonText("Upload video");
      setVisible(false);
      setCourse(data);
      toast("Lesson added");
    } catch (err) {
      console.log(err);
      toast("Lesson add failed");
    }
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      // once response is received
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video upload failed");
    }
  };

  const handleVideoRemove = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButtonText("Upload another video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video remove failed");
    }
  };

  const handlePublish = async (e, courseId) => {
    //
  };

  const handleUnpublish = async (e, courseId) => {
    //
  };

  return (
    <InstructorRoute>
      <div className='container mx-auto px-5 w-full'>
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className='container mx-auto pt-1 flex flex-col w-full justify-start'>
            <div className='media pt-2 flex justify-start items-center w-full'>
              <Avatar
                className='object-cover min-w-[80px]'
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />

              <div className='media-body pl-4 flex justify-between w-full'>
                <div className='flex justify-start'>
                  <div className='flex flex-col'>
                    <h5 className='mt-2 text-2xl font-bold'>{course.name}</h5>
                    <p style={{ marginTop: "-5px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ fontSize: "10px" }}>{course.category}</p>
                  </div>
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
            <hr className='mt-4' />
            <div className='flex flex-col justify-start items-start mt-4'>
              <ReactMarkdown children={course.description} />
            </div>

            <div className='flex'>
              <Button
                onClick={() => setVisible(true)}
                className='h-[50px] w-3/6 mt-4 text-center bg-slate-500 text-white hover:text-white transition-all duration-200 ease-in flex justify-center items-center'
                type='primary'
                icon={<UploadOutlined />}
                size='middle'>
                Add Lesson
              </Button>
            </div>

            <Modal
              title='+ Add Lesson'
              centered
              open={visible}
              onCancel={() => setVisible(false)}
              footer={null}>
              <AddLessonForm
                values={values}
                setValues={setValues}
                handleAddLesson={handleAddLesson}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemove={handleVideoRemove}
              />
            </Modal>

            <div className='flex pb-5'>
              <div className='flex flex-col lesson-list'>
                <h4>{course && course.lessons && course.lessons.length} Lessons</h4>
                <List
                  itemLayout='horizontal'
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}></Item.Meta>
                    </Item>
                  )}></List>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
