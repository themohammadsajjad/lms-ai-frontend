import type {
  LoginCredentials,
  RegisterData,
  User,
  UserRole,
} from '../types/auth';

const USER_KEY = 'lms_user';

function createUser(
  name: string,
  email: string,
  role: UserRole,
): User {
  return {
    id: crypto.randomUUID(),
    name,
    email,
    role,
  };
}

export const authService = {
  login(credentials: LoginCredentials): User {
    const name = credentials.email
      .split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

    const user = createUser(
      name || 'LMS User',
      credentials.email,
      credentials.role,
    );

    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  register(data: RegisterData): User {
    const user = createUser(data.name, data.email, data.role);

    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem(USER_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  getHomePath(role: UserRole): string {
    if (role === 'instructor') {
      return '/instructor';
    }

    if (role === 'admin') {
      return '/admin';
    }

    return '/dashboard';
  },

  logout(): void {
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};