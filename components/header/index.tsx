import React, { useEffect } from "react";
import Link from "next/link";
import Button from "../ui/button";
import styles from "../../styles/header.module.scss";
import { signIn, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
const navbars = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Category", link: "/category" },
  { id: 3, name: "Product", link: "/blogs/1" },
  { id: 4, name: "Post", link: "/posts" },
  { id: 4, name: "Me", link: "/user/profile" },
];

const Header = () => {
  const [userInfo, setUserInfo] = React.useState<{
    name: string;
    picture: string;
  }>();
  useEffect(() => {
    const fetchU = async () => {
      const user = await fetch("/api/user/jwt");
      const data = await user.json();
      setUserInfo(data);
      console.log("data", data);
    };
    fetchU();
  }, []);
  return (
    <header className={styles.header}>
      <a href="/" className={styles["header-logo"]}>
        VHM
      </a>
      <nav className={styles["header-menu"]}>
        <ul className={styles["header-menu-list"]}>
          {navbars.map((nav) => (
            <li className={styles["header-menu-item"]} key={nav.id}>
              <Link href={nav.link}>{nav.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {userInfo ? (
        <div className={styles.header__user}>
          {userInfo.picture && (
            <>
              <Image
                src={userInfo.picture}
                className={styles["header__user-avatar"]}
                width={50}
                height={50}
                alt={userInfo.name}
              />

              <div className={styles.header__cta}>
                <span className={styles["header__user-info"]}>
                  {userInfo.name ? userInfo.name : "Guest"}
                </span>
                <a
                  className={styles["header__auth-signout"]}
                  href={`/api/auth/signout`}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles["header-cta"]}>
          <div className={`${styles["header-cta-item"]} mr-1`}>
            <Button href="/auth/signin">SignIn</Button>
          </div>
          <div
            className={styles["header-cta-item"]}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <Button>SignUp</Button>
          </div>
        </div>
      )}
      <iframe src="/api/user/jwt" />
    </header>
  );
};

export default Header;
