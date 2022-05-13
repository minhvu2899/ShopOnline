import Image from "next/image";
import React, { useEffect } from "react";

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = React.useState<{
    name: string;
    picture: string;
    email: string;
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
    <div>
      {userInfo && (
        <>
          <p>{userInfo.name}</p>
          <Image
            src={userInfo.picture}
            // className={styles["header__user-avatar"]}
            width={200}
            height={200}
            alt={userInfo.name}
          />
          <p>{userInfo.email}</p>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
