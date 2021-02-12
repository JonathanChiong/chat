import { useDispatch } from "react-redux";
import { addUser } from "../../redux/user/action";
import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import socket from "../../socket/socket";

export const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [id, setID] = useState("");
  const [error, setError] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    socket.on("getID", (id) => {
      setID(id.id);
    });
  }, []);

  const handleRegister = ({ name, room }) => {
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        return setError(error);
      }
      setError("");
      setLogin(true);
      name = name.toLowerCase();
      room = room.toLowerCase();
      console.log(name, room);
      dispatch(addUser(name, room));
    });
  };

  return (
    <div className="loginForm">
      <h1>Login</h1>
      {!id ? (
        <Fragment>
          <label htmlFor="name">Username:</label>
          <input
            name="name"
            type="text"
            value={name}
            className="formInput"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Chat room:</label>

          <input
            name="room"
            type="text"
            className="formInput"
            onChange={(e) => setRoom(e.target.value)}
          />
        </Fragment>
      ) : (
        <Fragment>
          <h2>Your unique ID is : </h2>
          <p>{id}</p>
        </Fragment>
      )}

      {login ? (
        <Link to="/chat">
          <button type="button" className="formButton">
            Join
          </button>
        </Link>
      ) : (
        <button
          type="button"
          className="formButton"
          onClick={() => {
            handleRegister({ name, room });
          }}
        >
          Register
        </button>
      )}
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
};
