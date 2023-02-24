import Link from "next/link";
import { useEffect, useState } from "react";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");

  let isServer = typeof window === "undefined" ? false : true;

  useEffect(() => {
    isServer && setCurrent(window.location.pathname);
  }, [isServer && window.location.pathname]);

  return (
    <>
      <div className='flex flex-col mt-4 rounded-sm gap-4'>
        <Link
          href='/instructor'
          className={`${
            current === "/instructor" ? "!bg-slate-500 text-white" : "bg-slate-200 text-black"
          } px-4 py-2 rounded-md hover:bg-slate-500 hover:text-white transition-all transition-duration: 75ms`}>
          Dashboard
        </Link>
        <Link
          href='/instructor/course/create'
          className={`${
            current === "/instructor/course/create"
              ? "!bg-slate-500 text-white"
              : "bg-slate-200 text-black"
          } px-4 py-2   rounded-md hover:bg-slate-500 hover:text-white transition-all transition-duration: 75ms`}>
          Create Course
        </Link>
      </div>
    </>
  );
};

export default InstructorNav;
