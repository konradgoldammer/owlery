import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MainNavbar from "./subcomponents/MainNavbar";
import "../App.css";

const Home = (props) => {
  useEffect(() => {
    // Set page title
    document.title = props.title;
  }, [props.title]);

  return (
    <div>
      <MainNavbar />
    </div>
  );
};

Home.propTypes = {
  title: PropTypes.string,
};

export default Home;
