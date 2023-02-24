import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "@/components/routes/InstructorRoute";
import { Select, Button, Avatar, Badge } from "antd";

const { Option } = Select;

const Coursecreate = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = () => {
    //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }

  const courseCreateForm = () => (
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
      <div className='w-5/6 flex'>
        <div className='w-3/6 pr-2'>
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
        </div>
        <div className='w-3/6 pl-2'>Upload button here</div>
      </div>
    </form>
  );

  return (
    <>
      <InstructorRoute className='container mx-auto py-10 flex flex-col justify-center items-center w-96'>
        <h1 className='text-5xl text-bold text-center mx-auto mb-10'>Create Course</h1>

        <div className='pt-3 pb-3'>{courseCreateForm()}</div>
      </InstructorRoute>
    </>
  );
};

export default Coursecreate;
