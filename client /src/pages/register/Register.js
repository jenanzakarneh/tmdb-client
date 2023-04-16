import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { useForm } from "react-hook-form";
const bcrypt = require("bcryptjs");

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [response, setResponse] = useState({});
  const [err, setErr] = useState();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds); //another catch
    // const hashedPassword = bcrypt.hashSync(data.password, 10);
    // const pass = bcrypt.hashSync("jenan", salt);
    // console.log("hashedpassss", hashedPassword);
    // console.log("passsss", pass);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        password: data.password,
      }),
      redirect: "follow",
    };

    fetch("http://localhost:3001/users/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          alert("Your account created, go to login page ");
          navigate("/login");
        } else setErr(result.error);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="center">
      <h1>Register</h1>
      {/* <pre>{JSON.stringify(userInfo, undefined, 2)}</pre> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="txt-field">
          <input
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            type="text"
            //name="name"
            {...register("name", {
              required: "Username is required",
              pattern: {
                value: /^[a-z0-9_.]+$/,
                message:
                  "Your username can contain only letters, numbers and _",
              },
            })}
          />
          <span></span>
          <label>Name </label>
        </div>
        <p>{errors.name?.message}</p>
        <div className="txt-field">
          <input
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            type="email"
            // name="email"
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
        <p>{errors.email?.message}</p>
        <div className="txt-field">
          <input
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            type="password"
            // name="password"
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
        <p>{errors.password?.message}</p>
        <input type="submit" value="Register" />
        <div className="signup-link">
          {" "}
          Already have account?{" "}
          <div onClick={() => navigate("/login")}>Login</div>
        </div>
      </form>
      <div className="error-mssg">{err}</div>
    </div>
  );
}

export default App;
