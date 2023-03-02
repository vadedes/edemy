import { Button, Progress, Tooltip } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  return (
    <div className='container mx-auto pt-3'>
      <form onSubmit={handleAddLesson}>
        <input
          type='text'
          className='mb-4 p-4 border-solid border-2 border-slate-300 rounded-md w-full'
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder='Title'
          autoFocus
          required
        />

        <textarea
          className='mb-4 p-4 border-solid border-2 border-slate-300 rounded-md w-full'
          cols='7'
          rows='7'
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder='Content'></textarea>

        <div className='flex justify-center'>
          <label className='block w-5/6 mb-4 p-3 border-solid border-2 border-slate-300 rounded-md cursor-pointer font-bold text-slate-800 hover:bg-slate-400 hover:text-white transition ease-in-out duration-300'>
            {uploadButtonText}
            <input onChange={handleVideo} type='file' accept='video/*' hidden />
          </label>

          {!uploading && values.video.Location && (
            <Tooltip title='Remove'>
              <span onClick={handleVideoRemove} className='pt-1 pl-3'>
                <CloseCircleFilled className='text-xl cursor-pointer text-red-500' />
              </span>
            </Tooltip>
          )}
        </div>

        {progress > 0 && (
          <Progress className='flex justify-center pt-2' percent={progress} steps={10} />
        )}

        <Button
          onClick={handleAddLesson}
          className='px-6 py-4 h-[55px] flex justify-center items-center uppercase font-bold w-full bg-slate-500 text-white rounded-md transition ease-in-out duration-300 hover:!text-white'
          size='large'
          type='primary'
          loading={uploading}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddLessonForm;
