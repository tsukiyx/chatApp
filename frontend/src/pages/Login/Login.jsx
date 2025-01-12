import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login(inputs);

    setInputs({
      username: "",
      password: "",
    });
  };

  return (
    <section className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-left text-pink-200">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-pink-300 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <button className="btn btn-block btn-sm mt-2 hover:bg-purple-200 hover:text-black">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
