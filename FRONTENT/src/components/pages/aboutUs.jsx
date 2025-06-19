import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-8  rounded-lg min-h-screen ">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">About Us</h1>
      <p className="mb-2 text-gray-700">
        We are a team of dedicated individuals...
      </p>
      <p className="mb-2 text-gray-700">
        Our mission is to provide the best service...
      </p>
      <p className="text-gray-700">
        Contact us at:{" "}
        <a
          href="mailto:info@example.com"
          className="text-blue-600 hover:underline"
        >
          info@example.com
        </a>
      </p>
    </div>
  );
};

export default AboutUs;
