import { useEffect, useState, useContext } from 'react';
import { Context } from '@/context';
import axios from 'axios';

const UserIndex = () => {
  //state
  const [hidden, setHidden] = useState(true);

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/current-user');
      console.log(data);
      setHidden(false);
    } catch (error) {
      console.log(error);
      setHidden(true);
    }
  };

  return (
    <>
      {!hidden && (
        <h1 className="text-5xl text-bold text-center mx-auto mb-10">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      )}
    </>
  );
};

export default UserIndex;
