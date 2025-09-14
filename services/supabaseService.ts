import type { User, InterviewSession } from '../types';

// Helper functions for Local Storage
const getFromLS = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null');
  } catch {
    return null;
  }
};
const setToLS = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

// Simulate network delay
const apiCall = <T,>(data: T, delay = 500): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};
const apiError = (message: string, delay = 500): Promise<any> => {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), delay));
};

// Initialize "tables" in local storage if they don't exist
if (getFromLS('users') === null) {
  setToLS('users', []);
}
if (getFromLS('sessions') === null) {
  setToLS('sessions', {});
}
if (getFromLS('currentUser') === null) {
  setToLS('currentUser', null);
}

// --- Auth ---
const signUp = async ({ name, email, password }: any): Promise<User> => {
  const users = getFromLS('users');
  if (users.find((u: any) => u.email === email)) {
    return apiError('User with this email already exists.');
  }
  const newUser: User = { id: Date.now().toString(), name, email };
  // In a real app, hash the password. Storing it in plaintext is for demo purposes only.
  const newUsers = [...users, { ...newUser, password }];
  setToLS('users', newUsers);
  setToLS('currentUser', newUser);
  return apiCall(newUser);
};

const signIn = async ({ email, password }: any): Promise<User> => {
  const users = getFromLS('users');
  const user = users.find((u: any) => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    setToLS('currentUser', userWithoutPassword);
    return apiCall(userWithoutPassword);
  }
  return apiError('Invalid email or password.');
};

const signOut = async (): Promise<void> => {
  setToLS('currentUser', null);
  return apiCall(undefined);
};

const getUser = async (): Promise<User | null> => {
  const user = getFromLS('currentUser');
  return apiCall(user);
};

// --- Data ---
const getSessions = async (): Promise<InterviewSession[]> => {
  const user: User | null = getFromLS('currentUser');
  if (!user) return apiCall([]);
  const allSessions = getFromLS('sessions');
  const userSessions = allSessions[user.id] || [];
  return apiCall(userSessions);
};

const addSession = async (session: InterviewSession): Promise<InterviewSession> => {
  const user: User | null = getFromLS('currentUser');
  if (!user) return apiError('User not authenticated.');

  const allSessions = getFromLS('sessions');
  const userSessions = allSessions[user.id] || [];
  const newSessions = [...userSessions, session];
  allSessions[user.id] = newSessions;
  setToLS('sessions', allSessions);
  return apiCall(session);
};

export const supabase = {
  signUp,
  signIn,
  signOut,
  getUser,
  getSessions,
  addSession,
};
