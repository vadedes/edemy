import Link from "next/link";
import { useEffect, useState } from "react";

const UserNav = () => {
  const [current, setCurrent] = useState("");

  let isServer = typeof window === "undefined" ? false : true;

  useEffect(() => {
    isServer && setCurrent(window.location.pathname);
  }, [isServer && window.location.pathname]);

  return (
    <>
      <div className='flex flex-col mt-4 rounded-sm'>
        <Link
          href='/user'
          className={`${
            current === "/user" ? "!bg-slate-500 text-white" : "bg-slate-200 text-black"
          } px-4 py-2 rounded-md hover:bg-slate-500 hover:text-white transition-all transition-duration: 75ms`}>
          Dashboard
        </Link>
      </div>
    </>
  );
};

export default UserNav;
