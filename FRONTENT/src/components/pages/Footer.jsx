import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center ">
      <div>
        &copy; {new Date().getFullYear()} RustShortner. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
