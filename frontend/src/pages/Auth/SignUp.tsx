import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthService, LoginData } from "../../api/auth";
import { useContext } from "react";
import { AuthContext } from "../../context";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await AuthService.register(formData);
      setIsAuth(true);
      navigate("/todo");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to sign up. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1 className="auth-title">Sign Up</h1>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
