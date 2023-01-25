import { Menu } from 'antd';
import Link from 'next/link'
import {AppstoreOutlined, LoginOutlined, UserAddOutlined} from '@ant-design/icons';

const { Item } = Menu;

export default function TopNav() {
  const linkitems = [
    {
      label: "Home",
      key: "home",
      href: '/',
      icon: <AppstoreOutlined/>,
    },
    {
      label: "Login",
      key: "login",
      href: '/login',
      icon: <LoginOutlined/>,
    },
    {
      label: "Register",
      key: "register",
      href: '/register',
      icon: <UserAddOutlined/>,
    },
  ]

  return (
    <>
      <Menu mode="horizontal">
        {linkitems.map(item => (
          <Item key={item.key} icon={item.icon}>
            <Link href={item.href}>
              {item.label}
            </Link>
          </Item>
        ))}
      </Menu>
    </>
  )
}

