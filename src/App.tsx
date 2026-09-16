import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import AdminDashboard from './pages/AdminDashboard';
import Assignments from './pages/Assignments';
import CourseDetails from './pages/CourseDetails';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import LearningPlayer from './pages/LearningPlayer';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Quizzes from './pages/Quizzes';
import Register from './pages/Register';
import { authService } from './services/authService';

function App() {
  const user = authService.getCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                user
                  ? authService.getHomePath(user.role)
                  : '/login'
              }
              replace
            />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/:courseId"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <CourseDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/learn/:courseId/:lessonId"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <LearningPlayer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/assignments"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Assignments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quizzes"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Quizzes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quiz/:quizId"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Quiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor"
            element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;