import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "../pages/home.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../redux/userSlice";

function Home() {
  const user = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [prog,setProg] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const veryfyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          { user: user },
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          if (!data.user) {
            navigate("/admin");
          } else {
            if (data.user.image) {
              dispatch(
                setUserDetails({
                  id: data.user._id,
                  email: data.user.email,
                  phone: data.user.phone,
                  image: data.user.image,
                })
              );
            }
          }
        }
      }
    };
    veryfyUser();
  }, [cookies, navigate, removeCookie]);

  const getAllUsers = () => {
    axios
      .get("http://localhost:4000/admin", {
        onDownloadProgress: (pre) => {
          console.log("pre", pre.total,pre.progress);
          setProg((prev)=> [...prev,pre.download])
        },
      })
      .then((res) => {
        console.log("prog",prog,"res", res);
      });
  };

  return (
    <>
      <div>
        <div>
          <img
            onClick={() => {
              navigate("/profile");
            }}
            className="profile"
            src={
              user.image
                ? process.env.PUBLIC_URL + `/image/${user.image}`
                : "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
            }
            alt=""
          />
          <h1 id="homeHead">Wellcome User</h1>
        </div>
      </div>
      <button
        id="logout"
        onClick={() => {
          removeCookie("jwt");
          navigate("/login");
        }}
      >
        Log out
      </button>

      <button onClick={getAllUsers}>getAllUsers</button>
    </>
  );
}

export default Home;
