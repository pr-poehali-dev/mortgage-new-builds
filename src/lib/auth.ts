interface User {
  email: string;
  bot?: {
    id: number;
    username: string;
    name: string;
  };
}

const AUTH_KEY = 'botbuilder_user';

export const auth = {
  getUser(): User | null {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  setUser(user: User): void {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('auth-change'));
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event('auth-change'));
  },

  isAuthenticated(): boolean {
    return this.getUser() !== null;
  }
};
