import { useState, useEffect, useContext } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
} from '@ant-design/icons';
import { Context } from '@/context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const { Item, SubMenu } = Menu;

export default function TopNav() {
  const [current, setCurrent] = useState('');

  //initialize context
  const { state, dispatch } = useContext(Context);

  //conditionally render login/logout buttons based on current state -> if user is logged in or not
  const { user } = state;

  //initialize next router to redirect users on logout
  const router = useRouter();

  //set current menu key to what the current url is
  //we want to show the correct menu item is highlighted based on current url
  let isServer = typeof window === 'undefined' ? false : true;

  useEffect(() => {
    isServer && setCurrent(window.location.pathname);
  }, [isServer && window.location.pathname]);

  //logout
  const logout = async () => {
    //get logout type from dispatch
    dispatch({ type: 'LOGOUT' });
    //clear local storage
    window.localStorage.removeItem('user');
    //make logout request to the backend
    const { data } = await axios.get('/api/logout');
    toast(data.message);
    //redirect user to login screen when they logout successfully
    router.push('/login');
  };

  const linkitems = [
    {
      label: 'Home',
      key: '/',
      href: '/',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Register',
      key: '/register',
      href: '/register',
      icon: <UserAddOutlined />,
    },
  ];

  return (
    <>
      <Menu mode="horizontal" selectedKeys={[current]} onClick={(e) => setCurrent(e.key)}>
        {/* {linkitems.map((item) => (
          <Item key={item.key} icon={item.icon}>
            <Link href={item.href}>{item.label}</Link>
          </Item>
        ))} */}
        <Item key="/" icon={<AppstoreOutlined />}>
          <Link href="/">Home</Link>
        </Item>
        {!user && (
          <>
            <Item key="/login" icon={<LoginOutlined />}>
              <Link href="/login">Login</Link>
            </Item>

            <Item key="/register" icon={<UserAddOutlined />}>
              <Link href="/register">Register</Link>
            </Item>
          </>
        )}

        {user && (
          //make sure submenu is destructured from Menu object
          <SubMenu
            icon={<CoffeeOutlined />}
            title={user && user.name}
            className="!m-0 !ml-auto !mr-2"
            key="profile"
          >
            <Item className="" key="/logout" onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}
      </Menu>
    </>
  );
}
