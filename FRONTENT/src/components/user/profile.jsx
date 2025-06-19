import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
const Profile = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold">Welcome Back, {user.name}!</h1>
      <p className="text-lg text-gray-600">Your email: {user.email}</p>
      <p className="mt-4">Welcome to your profile page!</p>
    </div>
  );
};

export default Profile;
