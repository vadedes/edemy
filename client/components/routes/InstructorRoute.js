import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from "../nav/InstructorNav";

const InstructorRoute = ({ children }) => {
  //state
  const [ok, setOk] = useState(false);

  //router
  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      // console.log('INSTRUCTOR ROUTE =>', data);
      if (data.ok) setOk(true);
    } catch (error) {
      console.log(error);
      setOk(false);
      router.push("/");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined spin className='flex justify-center p5 text-4xl' />
      ) : (
        <>
          <div className='container mx-auto'>
            <div className='flex'>
              <div className='flex flex-col w-1/6'>
                <InstructorNav />
              </div>
              <div className='flex flex-col w-full'>{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InstructorRoute;
