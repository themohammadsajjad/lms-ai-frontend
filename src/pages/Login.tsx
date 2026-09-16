import { useState, type FormEvent } from 'react';
import { ArrowRight, BrainCircuit, LockKeyhole, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import type { UserRole } from '../types/auth';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    authService.login({
      email: email.trim(),
      password,
      role,
    });

    navigate('/dashboard');
  }

  return (
    <div className="auth-page">
      <section className="auth-showcase">
        <div className="brand">
          <div className="brand-icon">
            <BrainCircuit size={26} />
          </div>
          <span>VertexLearn</span>
        </div>

        <div className="auth-showcase-content">
          <span className="eyebrow">AI-powered learning platform</span>
          <h1>Learn smarter. Build skills that matter.</h1>
          <p>
            Access structured courses, track your progress and get
            personalized learning support from an AI tutor.
          </p>

          <div className="auth-feature-grid">
            <div className="auth-feature">
              <strong>Course focused</strong>
              <span>Learn through structured modules and lessons.</span>
            </div>

            <div className="auth-feature">
              <strong>AI assisted</strong>
              <span>Get contextual help while you study.</span>
            </div>

            <div className="auth-feature">
              <strong>Progress driven</strong>
              <span>Track learning goals, streaks and achievements.</span>
            </div>
          </div>
        </div>

        <p className="auth-footer-text">
          Built for students, instructors and learning teams.
        </p>
      </section>

      <main className="auth-form-section">
        <div className="auth-mobile-brand">
          <div className="brand-icon">
            <BrainCircuit size={24} />
          </div>
          <span>VertexLearn</span>
        </div>

        <div className="auth-card">
          <div className="auth-heading">
            <span className="eyebrow">Welcome back</span>
            <h2>Sign in to your account</h2>
            <p>Continue your learning journey from where you left off.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="form-group">
              <span>Email address</span>
              <div className="input-wrapper">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>
            </label>

            <label className="form-group">
              <span>Password</span>
              <div className="input-wrapper">
                <LockKeyhole size={18} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </label>

            <label className="form-group">
              <span>Sign in as</span>
              <select
                className="role-select"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as UserRole)
                }
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="primary-button">
              Sign in
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            New to VertexLearn? <Link to="/register">Create an account</Link>
          </p>
        </div>

        <p className="demo-note">
          Demo environment — choose any role to explore the platform.
        </p>
      </main>
    </div>
  );
}

export default Login;