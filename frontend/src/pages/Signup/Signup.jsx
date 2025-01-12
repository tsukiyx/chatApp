import { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignUp();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    const success = await signup(inputs);

    if (success) {
      setInputs({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-left text-pink-200">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label px-1 ">
              <span className="text-base label-text">Full name</span>
            </label>
            <input
              type="text"
              placeholder="Nick Gray"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label px-1 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label px-1 ">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label px-1 ">
              <span className="text-base label-text">Confirm password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password again"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckBox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-pink-300 mt-2 inline-block"
          >
            Already have an account?
          </Link>
          <button
            className="btn btn-block btn-sm mt-2 hover:bg-purple-200 hover:text-black"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
