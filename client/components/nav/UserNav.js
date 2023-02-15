import Link from "next/link";

const UserNav = () => {
  return (
  <>
    <div className="flex flex-col mt-2 rounded-sm">
      <Link href='/user' className="px-3 py-1">
          Dashboard
      </Link>
    </div>
  </>
  )
}

export default UserNav;
