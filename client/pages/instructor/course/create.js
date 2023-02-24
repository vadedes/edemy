import axios from 'axios';
import InstructorRoute from '@/components/routes/InstructorRoute';

const Coursecreate = () => {
	return (
		<>
			<InstructorRoute className='container mx-auto py-10 flex flex-col justify-center items-center w-96'>
				<h1 className='text-5xl text-bold text-center mx-auto mb-10'>
					Create Course
				</h1>
			</InstructorRoute>
		</>
	);
};

export default Coursecreate;
