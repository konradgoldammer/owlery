import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const MainFooter = () => {
  return (
    <div className="main-footer mt-5">
      <div className="container-md">
        <div className="row">
          <div className="col-md-8 mt-4 p-0">
            <div className="row">
              <div className="col-md-2">
                <h4 className="footer-brand text-lowercase">Owlery</h4>
              </div>
              <div className="col-md-10">
                <div className="row mt-1">
                  <div className="col-1 d-flex justify-content-center">
                    <Link className="footer-nav-link text-decoration-none">
                      <strong>About</strong>
                    </Link>
                  </div>
                  <div className="col-1 d-flex justify-content-center">
                    <Link className="footer-nav-link text-decoration-none">
                      <strong>Help</strong>
                    </Link>
                  </div>
                  <div className="col-1 d-flex justify-content-center">
                    <Link className="footer-nav-link text-decoration-none">
                      <strong>Contact</strong>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <p>&copy; 2021 Owlery. Podcast data from Listen API.</p>
            </div>
          </div>
          <div className="col-md-4 my-4 p-0">
            <div className="float-end">
              <a
                href="https://instagram.com"
                className="footer-socials-element"
              >
                <FaInstagram className="footer-socials-icon" />
              </a>
              <a
                href="https://twitter.com"
                className="footer-socials-element ms-2"
              >
                <FaTwitter className="footer-socials-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
