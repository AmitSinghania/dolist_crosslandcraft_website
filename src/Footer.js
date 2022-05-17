import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <p>Connect </p>
      <a href="mailto:amitsinghania60@gmail.com" target="_blank">
        <ion-icon name="mail-outline"></ion-icon>
      </a>
      <a
        href="https://www.facebook.com/Crossland-Crafts-110430727392700"
        target="_blank"
      >
        <ion-icon name="logo-facebook"></ion-icon>
      </a>
      <a href="" target="_blank">
        <ion-icon name="logo-twitter"></ion-icon>
      </a>
      <a href="" target="_blank">
        <ion-icon name="logo-instagram"></ion-icon>
      </a>
      <a href="https://api.whatsapp.com/send/?phone=917002011211&text&app_absent=0">
        <ion-icon name="logo-whatsapp"></ion-icon>
      </a>
    </div>
  );
};
export default Footer;
