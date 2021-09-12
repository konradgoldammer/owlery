import React from "react";
import MainNavbar from "./subcomponents/MainNavbar";
import "../App.css";
import ProfileInfo from "./ProfileInfo";

const Home = () => {
  return (
    <div>
      <MainNavbar />
      <ProfileInfo />
    </div>
  );
};

export default Home;
