import React, { useState, useContext } from "react";
import { api } from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";

export const AuthForm = ({ onSuccess, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister ? "/users" : "/sessions";
      const body = isRegister ? { name, email, password } : { email, password };

      const res = await api.post(url, body);
      login(res.data.accessToken);
      onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Could not connect to server",
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <form onSubmit={handleSubmit}>
          <h2>{isRegister ? "Register" : "Login"}</h2>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          {isRegister && (
            <>
              <label htmlFor="fname">Name</label>

              <input
                id="fname"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name.."
              />
            </>
          )}
          <label htmlFor="femail">Email</label>
          <input
            id="femail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email.."
          />
          <label htmlFor="fpassword">Password</label>

          <input
            id="fpassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password.."
          />

          <button className="log-button" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>

          <button
            className="log-button2"
            type="button"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};
