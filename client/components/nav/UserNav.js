import Link from "next/link";

const UserNav = () => {
  return (
  <>
    <div className="flex flex-col mt-4 rounded-sm">
      <Link href='/user' className="px-4 py-2 bg-slate-200 text-black rounded-md hover:bg-slate-500 hover:text-white transition-all transition-duration: 75ms">
          Dashboard
      </Link>
    </div>
  </>
  )
}

export default UserNav;
