import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  UserOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "@/context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const { Item, SubMenu, ItemGroup } = Menu;

export default function TopNav() {
  const [current, setCurrent] = useState("");

  //initialize context
  const { state, dispatch } = useContext(Context);

  //conditionally render login/logout buttons based on current state -> if user is logged in or not
  const { user } = state;

  //initialize next router to redirect users on logout
  const router = useRouter();

  //set current menu key to what the current url is
  //we want to show the correct menu item is highlighted based on current url
  let isServer = typeof window === "undefined" ? false : true;

  useEffect(() => {
    isServer && setCurrent(window.location.pathname);
  }, [isServer && window.location.pathname]);

  //logout
  const logout = async () => {
    //get logout type from dispatch
    dispatch({ type: "LOGOUT" });
    //clear local storage
    window.localStorage.removeItem("user");
    //make logout request to the backend
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    //redirect user to login screen when they logout successfully
    router.push("/login");
  };

  const linkitems = [
    {
      label: "Home",
      key: "/",
      href: "/",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Register",
      key: "/register",
      href: "/register",
      icon: <UserAddOutlined />,
    },
  ];

  return (
    <>
      <Menu
        mode='horizontal'
        selectedKeys={[current]}
        onClick={(e) => setCurrent(e.key)}
        className='mb-2'>
        {/* {linkitems.map((item) => (
          <Item key={item.key} icon={item.icon}>
            <Link href={item.href}>{item.label}</Link>
          </Item>
        ))} */}

        <Item key='/' icon={<AppstoreOutlined />}>
          <Link href='/'>Home</Link>
        </Item>

        {/* Instructor buttons */}
        {user && user.role && user.role.includes("Instructor") ? (
          <Item key='/instructor/course/create' icon={<CarryOutOutlined />}>
            <Link href='/instructor/course/create'>Create Course</Link>
          </Item>
        ) : (
          <Item key='/user/become-instructor' icon={<TeamOutlined />}>
            <Link href='/user/become-instructor'>Become and Instructor</Link>
          </Item>
        )}
        {user && user.role && user.role.includes("Instructor") ? (
          <Item key='/instructor' icon={<UserOutlined />}>
            <Link href='/instructor'>Instructor</Link>
          </Item>
        ) : null}

        {!user && (
          <>
            <Item key='/login' icon={<LoginOutlined />}>
              <Link href='/login'>Login</Link>
            </Item>

            <Item key='/register' icon={<UserAddOutlined />}>
              <Link href='/register'>Register</Link>
            </Item>
          </>
        )}

        {/* make sure submenu is destructured from Menu object */}
        {user && (
          <SubMenu
            icon={<CoffeeOutlined />}
            title={user && user.name}
            key='profile'
            className='!m-0 !ml-auto !mr-2'>
            <ItemGroup>
              <Item key='/user' icon={<UserOutlined />}>
                <Link href='/user'>Profile</Link>
              </Item>

              <Item className='' key='/logout' onClick={logout}>
                Logout
              </Item>
            </ItemGroup>
          </SubMenu>
        )}
      </Menu>
    </>
  );
}
