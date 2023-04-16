import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useForm } from "react-hook-form";
const bcrypt = require("bcryptjs");

function App() {
  const [error, setErr] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds); //another catch
    // const hashedPassword = bcrypt.hashSync(data.password, 10);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      redirect: "follow",
    };

    fetch("http://localhost:3001/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          localStorage.setItem("token", result.token);
          navigate("/home");
        } else setErr(result.error);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="center">
      <h1>Login </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="txt-field">
          <input
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "This is not a valid email",
              },
            })}
          />
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt-field">
          <input
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be less than 4 characters",
              },
              maxLength: {
                value: 10,
                message: "Password must not be more than 10 chars",
              },
            })}
          />
          <span></span>
          <label>Password</label>
        </div>

        <input type="submit" value="Login" />
        <div className="signup-link">
          {" "}
          Not a member?{" "}
          <div onClick={() => navigate("/register")}>Register</div>
        </div>
      </form>
      <div className="error-mssg">{error}</div>
    </div>
  );
}

export default App;
