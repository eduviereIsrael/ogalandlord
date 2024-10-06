import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="contain">
        <img src="/logo-footer.png" alt="" className="logo" />
        <div className="links">
          <div className="menu-column">
            <h3>Listings</h3>
            <ul>
              <li>Rent</li>
              <li>Sell</li>
              <li>Lease</li>
              <li>Shared</li>
            </ul>
          </div>
          <div className="menu-column">
            <h3>Property Type</h3>
            <ul>
              <li>Flat</li>
              <li>Self contained</li>
              <li>Duplex</li>
              <li>Shortlet</li>
            </ul>
          </div>
          <div className="menu-column">
            <h3>About</h3>
            <ul>
              <li>Agents</li>
              <li>Contact</li>
              <li>Newsletter</li>
              <li>Testimonials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
