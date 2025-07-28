import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import imgSrc from "../assets/images.png";

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const payload = isSignUp
      ? { username, password: pass, email, confirmPassword: confirm }
      : { username, password: pass };

    fetch(`${import.meta.env.VITE_API_URL}/auth/${isSignUp ? 'register' : 'login'}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => console.log(data.token || data.message))
      .catch(err => console.log(err));
  };

  return (
    <div className="container-fluid vh-100">
      <style>
  {`
    @media (max-width: 767.98px) {
      .custom-bg-change {
        background-color: #28a745 !important;
      }
    }
  `}
</style>

      <div className="row h-100 position-relative">
        {/* LEFT: Form */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center bg-light position-relative custom-bg-change"
        >
          <div
            className="position-relative p-4 bg-body-secondary bg-opacity-75 rounded-4 shadow z-1"
            style={{
              backdropFilter: "blur(8px)",
              width: "100%",
              maxWidth: "400px"
            }}
          >
            <h3 className="mb-4 text-center">
              {isSignUp ? "Sign Up" : "Log In"}
            </h3>

            {/* LOGIN FORM */}
            {!isSignUp && (
              <>
                <div className="pt-3 mb-3">
                  <input
                    className="w-100 py-2 px-3 bg-secondary-subtle fw-medium rounded-3 border-0 shadow-sm"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <input
                    className="w-100 py-2 px-3 bg-secondary-subtle fw-medium rounded-3 border-0 shadow-sm"
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* SIGNUP FORM */}
            {isSignUp && (
              <>
                <div className="pt-3 mb-3">
                  <input
                    className="w-100 py-2 px-3 bg-secondary-subtle fw-medium rounded-3 border-0 shadow-sm"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    className="w-100 py-2 px-3 bg-secondary-subtle fw-medium rounded-3 border-0 shadow-sm"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    className="w-100 py-2 px-3 bg-secondary-subtle fw-medium rounded-3 border-0 shadow-sm"
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <input
                    className="w-100 py-2 px-3 bg-secondary-subtle fw-medium rounded-3 border-0 shadow-sm"
                    type="password"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              className="btn btn-success px-4 py-2 fs-5 w-100 mb-3 rounded-pill shadow-sm"
              onClick={handleSubmit}
              disabled={username.trim() === "" || pass.trim() === ""}
            >
              {isSignUp ? "Create Account" : "Log In"}
            </button>

            <p className="text-center text-muted">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <span
                className="text-primary ms-2"
                role="button"
                style={{ cursor: "pointer" }}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT: Image & BG */}
        <div
          className="top-0 end-0 h-100 d-none d-md-flex flex-column justify-content-center align-items-center text-white text-center position-absolute"
          style={{
            width:'70%',
            backgroundColor: '#28a745',
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        >
          <img
            src={imgSrc}
            alt="cart"
            style={{
              maxWidth: '60%',
              maxHeight: '60%',
              opacity: 0.8,
              filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.2))',
            }}
          />
          <h3 className="fw-bold mt-4 ps-5 ms-3">
            Everything you need. <br />
            All in one place.
          </h3>
        </div>
      </div>
    </div>
  );
}
