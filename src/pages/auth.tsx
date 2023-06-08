import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
interface props {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  label: string;
  onSubmit: (event: React.FormEvent<YourFormElement>) => {};
}
interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
export const Auth = () => {
  return (
    <div>
      <div className="login">
        <Login />
      </div>
      <div className="register">
        <Register />
      </div>
    </div>
  );
};
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<YourFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        userName: username,
        password,
      });
      const res = response.data.message;
      if (res) {
        return alert(res);
      }
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Form
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        onSubmit={onSubmit}
        label="Login"
      />
    </div>
  );
};
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (event: React.FormEvent<YourFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", {
        userName: username,
        password,
      });
      alert("registration successfull now you can login!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        onSubmit={onSubmit}
        label="Register"
      />
    </div>
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}: props) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input
            type="text"
            id="username"
            value={username}
            className="form-control"
            onChange={(event) => setUsername(event.target.value)}
          />
          <label className="form-label">UserName</label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="password"
            value={password}
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
          />
          <label className="form-label">Password</label>
        </div>

        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          {label}
        </button>
      </form>
    </div>
  );
};
