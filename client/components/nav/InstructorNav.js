import Link from 'next/link';

const InstructorNav = () => {
	return (
		<>
			<div className='flex flex-col mt-4 rounded-sm gap-4'>
				<Link
					href='/instructor'
					className='px-4 py-2 bg-slate-200 text-black rounded-md hover:bg-slate-500 hover:text-white transition-all transition-duration: 75ms'
				>
					Dashboard
				</Link>
				<Link
					href='/instructor/course/create'
					className='px-4 py-2 bg-slate-200 text-black rounded-md hover:bg-slate-500 hover:text-white transition-all transition-duration: 75ms'
				>
					Create Course
				</Link>
			</div>
		</>
	);
};

export default InstructorNav;
