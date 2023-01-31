import { useContext } from 'react';
import { Context } from '@/context';
import UserRoute from '../../components/routes/UserRoute';

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="text-5xl text-bold text-center mx-auto mb-10">
        <pre>{JSON.stringify(user, null, 4)}</pre>
      </h1>
    </UserRoute>
  );
};

export default UserIndex;
