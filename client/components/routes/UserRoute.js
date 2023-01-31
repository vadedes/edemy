import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SyncOutlined } from '@ant-design/icons';

const UserRoute = ({ children }) => {
  //state
  const [ok, setOk] = useState(false);

  //router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/current-user');
      // console.log(data);
      if (data.ok) setOk(true);
    } catch (error) {
      console.log(error);
      setOk(false);
      router.push('/login');
    }
  };

  return (
    <>{!ok ? <SyncOutlined spin className="flex justify-center p5 text-4xl" /> : <>{children}</>}</>
  );
};

export default UserRoute;
