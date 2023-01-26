import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { AppstoreOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const { Item } = Menu;

export default function TopNav() {
  const [current, setCurrent] = useState('');

  //set current menu key to what the current url is
  //we want to show the correct menu item is highlighted based on current url
  let isServer = typeof window === 'undefined' ? false : true;

  useEffect(() => {
    isServer && setCurrent(window.location.pathname);
  }, [isServer && window.location.pathname]);

  const linkitems = [
    {
      label: 'Home',
      key: '/',
      href: '/',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Login',
      key: '/login',
      href: '/login',
      icon: <LoginOutlined />,
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
        {linkitems.map((item) => (
          <Item key={item.key} icon={item.icon}>
            <Link href={item.href}>{item.label}</Link>
          </Item>
        ))}
      </Menu>
    </>
  );
}
