import axios from "axios";
import React, { useState, useEffect } from "react";
import MainNavBar from "../components/subcomponents/MainNavbar";

const PodcastScreen = () => {
  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    //fetch
  }, []);

  return (
    <div>
      <MainNavBar />
    </div>
  );
};

export default PodcastScreen;
