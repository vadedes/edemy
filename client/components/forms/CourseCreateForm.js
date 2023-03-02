import { Select, Button, Avatar, Badge } from "antd";

const { Option } = Select;

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButtonText,
  handleImageRemove,
}) => {
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full'>
        <div className='w-5/6'>
          <input
            type='text'
            name='name'
            className='mb-4 p-4 border-solid border-2 border-slate-300 rounded-md w-full'
            placeholder='Name'
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className='w-5/6'>
          <textarea
            name='description'
            placeholder='Write course description'
            className='mb-4 p-4 border-solid border-2 border-slate-300 rounded-md w-full'
            cols='7'
            rows='7'
            value={values.description}
            onChange={handleChange}></textarea>
        </div>
        <div className='w-5/6 flex flex-col'>
          <div className='w-full pr-2'>
            <Select
              style={{ width: "100%" }}
              size='large'
              value={values.paid}
              onChange={(v) => setValues({ ...values, paid: v, price: 0 })}>
              <Option value={true}>Paid</Option>
              <Option value={false}>Free</Option>
            </Select>
            {values.paid && (
              <div className='w-full pt-4'>
                <Select
                  defaultValue='$9.99'
                  style={{ width: "100%" }}
                  onChange={(v) => setValues({ ...values, price: v })}
                  tokenSeparators={[,]}
                  size='large'>
                  {children}
                </Select>
              </div>
            )}
            <div className='w-full pt-4'>
              <input
                type='text'
                name='category'
                className='mb-4 p-4 border-solid border-2 border-slate-300 rounded-md w-full'
                placeholder='Category'
                value={values.category}
                onChange={handleChange}
              />
            </div>
            <div className='w-full mt-4 mb-4 flex items-center justify-start'>
              <label className='block w-5/6 mb-4 p-3 border-solid border-2 border-slate-300 rounded-md cursor-pointer font-bold text-slate-800 hover:bg-slate-400 hover:text-white transition ease-in-out duration-300'>
                {uploadButtonText}
                <input
                  type='file'
                  name='image'
                  onChange={handleImage}
                  accept='image/*'
                  hidden
                  className='w-full'
                />
              </label>
              {preview && (
                <div className='w-3/6 ml-4'>
                  <Badge count='X' onClick={handleImageRemove} className='cursor-pointer'>
                    <Avatar src={preview} />
                  </Badge>
                </div>
              )}
            </div>
          </div>
          <div className='w-full mt-4'>
            <Button
              className='px-6 py-4 h-[55px] flex justify-center items-center uppercase font-bold w-full bg-slate-500 text-white rounded-md transition ease-in-out duration-300 hover:!text-white'
              onClick={handleSubmit}
              disabled={values.loading || values.uploading}
              loading={values.loading}
              type='primary'>
              {values.loading ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </div>
      </form>
      ;
    </>
  );
};

export default CourseCreateForm;
