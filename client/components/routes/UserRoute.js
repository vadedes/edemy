import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SyncOutlined } from '@ant-design/icons';
import UserNav from '../nav/UserNav';

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
    <>{!ok ? (<SyncOutlined spin className="flex justify-center p5 text-4xl" />
    ) : (
      <>
        <div className='container mx-auto'>
          <div className='flex'>
              <div className='flex flex-col w-1/6'>
                <UserNav/>
              </div>
              <div className='flex flex-col w-full'>
                {children}
              </div>
          </div>
        </div>
      </>)}</>
  );
};

export default UserRoute;
