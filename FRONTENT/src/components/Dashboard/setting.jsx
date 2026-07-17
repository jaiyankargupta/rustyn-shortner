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
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user?.name && user?.email) {
      setUserName(user.name);
      setUserEmail(user.email);
    }
  }, [user]);

  const checkPassword = async () => {
    try {
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
        setError("Verification failed. Please try again.");
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
        setPasswordEdit(true);
      }
    } catch {
      setError("Failed to verify password.");
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
        setError("Failed to update user details.");
        return;
      }
      setError("");
      setSuccess("Account details updated successfully!");
      setPasswordEdit(false);
      setOldPassCorrect(false);
      setOldPassword("");
      setNewPassword("");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">User Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Manage your account settings below</p>
      </div>

      {success && (
        <div className="p-3 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg text-center font-medium">
          {success}
        </div>
      )}

      {error && (
        <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-100 rounded-lg text-center font-medium">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Name Field */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Full Name</span>
            {nameEdit ? (
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-350 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Enter new name"
              />
            ) : (
              <span className="text-sm font-semibold text-slate-800 mt-0.5 block">{userName}</span>
            )}
          </div>
          <button
            onClick={() => {
              if (nameEdit) {
                updateDetails();
              }
              setNameEdit(!nameEdit);
              setError("");
            }}
            className="px-4 py-1.5 border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 transition self-start sm:self-center cursor-pointer"
          >
            {nameEdit ? "Save" : "Edit"}
          </button>
        </div>

        {/* Email Field */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Email Address</span>
            {emailEdit ? (
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-350 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Enter new email"
              />
            ) : (
              <span className="text-sm font-semibold text-slate-800 mt-0.5 block">{userEmail}</span>
            )}
          </div>
          <button
            onClick={() => {
              if (emailEdit) {
                updateDetails();
              }
              setEmailEdit(!emailEdit);
              setError("");
            }}
            className="px-4 py-1.5 border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 transition self-start sm:self-center cursor-pointer"
          >
            {emailEdit ? "Save" : "Edit"}
          </button>
        </div>

        {/* Change Password */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Security Settings</span>
          
          {!passwordEdit ? (
            <button
              onClick={() => {
                setPasswordEdit(true);
                setOldPassCorrect(false);
                setError("");
                setOldPassword("");
                setNewPassword("");
              }}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              Change Password
            </button>
          ) : !oldPassCorrect ? (
            <div className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
                className="flex-grow px-3 py-1.5 bg-white border border-slate-350 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={checkPassword}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Verify
                </button>
                <button
                  onClick={() => setPasswordEdit(false)}
                  className="border border-slate-300 hover:bg-slate-100 text-slate-600 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="flex-grow px-3 py-1.5 bg-white border border-slate-350 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={updateDetails}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setPasswordEdit(false);
                    setOldPassCorrect(false);
                  }}
                  className="border border-slate-300 hover:bg-slate-100 text-slate-600 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
