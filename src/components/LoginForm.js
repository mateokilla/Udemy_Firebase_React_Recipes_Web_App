import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

function LoginForm({ existingUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginUser(username, password);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  }

  function handleLogout() {
    FirebaseAuthService.logoutUser();
  }

  async function handleSendResetPasswordEmail() {
    if (!username) {
      alert("Missing username!");
      return;
    }

    try {
      await FirebaseAuthService.sendPasswordResetEmail(username);
      alert("sent the password reset email");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleLoginWithGoogle() {
    try {
      await FirebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  }


  async function handleRegister() {
    try {
      await FirebaseAuthService.registerUser(username, password);
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Csá, {existingUser.email}</h3>
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Kijelentkezés
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Felhasználónév (email):
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Jelszó:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-button">Bejelentkezés</button>
            <button
              type="button"
              onClick={handleSendResetPasswordEmail}
              className="primary-button"
            >
              Jelszó visszaállítása
            </button>
            <button type="button" className="primary-button" onClick={handleLoginWithGoogle}>Google</button>
            <button onClick={handleRegister} type="button" className="primary-button" >Regisztráció</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
