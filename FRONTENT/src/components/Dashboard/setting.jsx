import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { BACKEND_URL } from "../../config/api.config.js";

const Settings = () => {
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [nameEdit, setNameEdit] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [oldPassCorrect, setOldPassCorrect] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.name && user?.email) {
      setUserName(user.name);
      setUserEmail(user.email);
    }
  }, [user]);

  const checkPassword = async () => {
    const response = await fetch(
      `${BACKEND_URL}/api/auth/changePassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: userEmail, password: oldPassword }),
      }
    );
    if (!response.ok) {
      setError("Server error. Please try again later.");
      setOldPassCorrect(false);
      return;
    }
    const result = await response.json();
    const { isPasswordValid } = result;
    if (!isPasswordValid) {
      setError("Old password is incorrect");
      setOldPassCorrect(false);
      setOldPassword("");
    } else {
      setOldPassCorrect(true);
      setError("");
      setPasswordEdit(true); // Show new password input after old password is correct
    }
  };

  const updateDetails = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/auth/updateDetails`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: newPassword,
          }),
        }
      );
      if (!response.ok) {
        setError("Failed to update.");
        console.log("Failed to update user details.");
      }
      setError("");
      setPasswordEdit(false);

      setOldPassCorrect(false);
      setOldPassword("");
      setNewPassword("");
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div>
      <h1 className=" font-bold">
        <h2 className="text-3xl font-semibold text-center">User Settings</h2>
        <p className="text-gray-600 text-center">
          Manage your account settings below.
        </p>
      </h1>

      <div className="mt-8 flex flex-row gap-4 items-center">
        {nameEdit ? (
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-300 rounded p-2 flex-grow"
            placeholder="Enter your new name"
          />
        ) : (
          <span className="text-lg font-medium">Name : {userName}</span>
        )}
        {nameEdit ? (
          <div
            className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline"
            onClick={() => {
              updateDetails();
              setNameEdit(false);
            }}
          >
            Save
          </div>
        ) : (
          <div
            className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline"
            onClick={() => {
              setUserName(userName);
              setNameEdit(true);
              setError("");
            }}
          >
            Edit
          </div>
        )}
      </div>
      {error && (
        <div className="text-red-500 mt-2">
          {error ? error : "Please fill all fields."}
        </div>
      )}

      <div className="mt-4 flex flex-row gap-4 items-center">
        {emailEdit ? (
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 flex-grow"
            placeholder="Enter your new email"
          />
        ) : (
          <span className="text-lg font-medium">Email : {userEmail}</span>
        )}

        {emailEdit ? (
          <div
            className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline"
            onClick={() => {
              updateDetails();
              setEmailEdit(false);
              setError("");
            }}
          >
            Save
          </div>
        ) : (
          <div
            className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline"
            onClick={() => {
              setUserEmail(userEmail);
              setEmailEdit(true);
              setError("");
            }}
          >
            Edit
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-row gap-4 items-center">
        <div>
          {!passwordEdit ? (
            <button
              className="border p-1 rounded hover:bg-red-500"
              onClick={() => {
                setPasswordEdit(true);

                setOldPassCorrect(false);
                setError("");
                setOldPassword("");
                setNewPassword("");
              }}
            >
              Change Password
            </button>
          ) : !oldPassCorrect ? (
            <div>
              <input
                className="border p-1 rounded"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter Your old Password"
              />
              <button
                onClick={checkPassword}
                className="ml-4 border p-1 rounded hover:bg-green-500"
              >
                Submit
              </button>
              <button
                className="ml-2 border p-1 rounded hover:bg-gray-300"
                onClick={() => {
                  setPasswordEdit(false);

                  setOldPassword("");
                  setError("");
                }}
              >
                Cancel
              </button>
              {error && <div className="text-red-500">{error}</div>}
            </div>
          ) : (
            <div>
              <input
                className="border p-1 rounded"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
              />
              <button
                className="ml-4 border p-1 rounded hover:bg-blue-500"
                onClick={updateDetails}
              >
                Update
              </button>
              <button
                className="ml-2 border p-1 rounded hover:bg-gray-300"
                onClick={() => {
                  setPasswordEdit(false);

                  setOldPassCorrect(false);
                  setOldPassword("");
                  setNewPassword("");
                  setError("");
                }}
              >
                Cancel
              </button>
              {error && <div className="text-red-500">{error}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
