import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  LockKeyhole,
  Mail,
  UserRound,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import type { UserRole } from '../types/auth';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    const user = authService.register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
    });
    navigate(authService.getHomePath(user.role));
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
          <span className="eyebrow">Start learning today</span>
          <h1>Your personalized learning space starts here.</h1>
          <p>
            Explore courses, complete assessments, monitor progress and use
            AI-powered study tools from one workspace.
          </p>

          <div className="auth-feature-grid">
            <div className="auth-feature">
              <strong>Flexible learning</strong>
              <span>Study lessons at your own pace.</span>
            </div>

            <div className="auth-feature">
              <strong>Smart assistance</strong>
              <span>Ask questions using course-aware AI support.</span>
            </div>

            <div className="auth-feature">
              <strong>Real progress</strong>
              <span>Build streaks and earn learning achievements.</span>
            </div>
          </div>
        </div>

        <p className="auth-footer-text">
          One platform for learning, teaching and management.
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
            <span className="eyebrow">Get started</span>
            <h2>Create your account</h2>
            <p>Set up your profile and enter your learning workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="form-group">
              <span>Full name</span>
              <div className="input-wrapper">
                <UserRound size={18} />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </div>
            </label>

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
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </label>

            <label className="form-group">
              <span>Account type</span>
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
              Create account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;