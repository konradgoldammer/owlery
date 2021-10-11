import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const MainFooter = () => {
  return (
    <div className="main-footer mt-5">
      <div className="container-md">
        <div className="row">
          <div className="col-md-8 mt-4">
            <h4 className="footer-brand text-lowercase d-inline">Owlery</h4>
            <Link className="footer-nav-link text-decoration-none ms-4">
              <strong>About</strong>
            </Link>
            <Link className="footer-nav-link text-decoration-none ms-2">
              <strong>Help</strong>
            </Link>
            <Link className="footer-nav-link text-decoration-none ms-2">
              <strong>Contact</strong>
            </Link>
            <div className="row">
              <p>&copy; 2021 Owlery. Podcast data from Listen API.</p>
            </div>
          </div>
          <div className="col-md-4 my-4">
            <div className="float-end">
              <a
                href="https://instagram.com"
                className="footer-socials-element"
                rel="noopener noreferrer"
                target="_blank"
                title="Owlery on Instagram"
              >
                <FaInstagram className="footer-socials-icon" />
              </a>
              <a
                href="https://twitter.com"
                className="footer-socials-element ms-2"
                rel="noopener noreferrer"
                target="_blank"
                title="Owlery on Twitter"
              >
                <FaTwitter className="footer-socials-icon" />
              </a>
              <a
                href="https://youtube.com"
                className="footer-socials-element ms-2"
                rel="noopener noreferrer"
                target="_blank"
                title="Owlery on YouTube"
              >
                <FaYoutube className="footer-socials-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
