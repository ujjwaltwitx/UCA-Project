import React, { useState } from "react";
import { signup } from "../../Utils/Firebase/auth";
import { EyeOpen, EyeClose } from "../../Components/Icons";

export default function Signup() {
  const [credentials, setCredentials] = useState({ username: "", pass: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (credentials.username.length > 0 && credentials.pass.length > 0) {
      setError(null);
    }
  };
  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(credentials.username, credentials.pass);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.code);
      setError(err.message);
    }
  };

  const { username, pass } = credentials;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-p1">
      <div className="max-w-full w-[26rem] rounded-md bg-black-1 text-white p-8 shadow-lg">
        <div className="flex flex-col gap-6 items-center">
          <h1 className="font-black text-5xl">Welcome, sigup</h1>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            {/* Fields */}
            <div className="flex flex-col gap-4">
              {/* username */}
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="username"
                  className="text-[12px] font-semibold uppercase text-zinc-400"
                >
                  USERNAME
                  <span className="text-red-500 pl-1">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  value={username}
                  className="bg-zinc-900 rounded-md text-[16px] p-2 outline-none border-none"
                />
              </div>

              {/* password */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="pass"
                    className="text-[12px] font-semibold uppercase text-zinc-400"
                  >
                    PASSWORD
                    <span className="text-red-500 pl-1">*</span>
                  </label>
                  <div className="bg-zinc-900 rounded-md text-[16px] p-2 flex items-center">
                    <input
                      type={showPass ? "text" : "password"}
                      name="pass"
                      id="pass"
                      onChange={handleChange}
                      value={pass}
                      className="w-full bg-transparent outline-none border-none"
                    />
                    <button
                      onClick={handleShowPass}
                      type="button"
                      className="text-blue-400 hover:text-blue-500 outline-none text-sm"
                    >
                      {showPass ? (
                        <EyeOpen fill="white" />
                      ) : (
                        <EyeClose fill="white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="">
                  <button className="text-blue-400 hover:text-blue-500 text-sm">
                    Forgot your password?
                  </button>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex gap-2 text-red-500 text-[12px] font-semibold">
                <div>X</div>
                <div>{error}</div>
              </div>
            )}

            {/* Submit */}
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-inner rounded-md text-white text-[15px] font-semibold py-2"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
