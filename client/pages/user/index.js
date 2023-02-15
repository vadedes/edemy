import { useContext } from 'react';
import { Context } from '@/context';
import UserRoute from '../../components/routes/UserRoute';

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="text-5xl mt-4 text-bold text-center mx-auto mb-10">
        User dashboard
      </h1>
    </UserRoute>
  );
};

export default UserIndex;
