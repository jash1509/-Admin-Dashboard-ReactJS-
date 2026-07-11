import React, { createContext, useState, useEffect } from 'react';
import initialUsers from '../data/users';

export const AppContext = createContext();

const initialNotifications = [
  {
    id: 'notif-1',
    type: 'success',
    text: 'New user "Riya Kapoor" registered as Admin.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'notif-2',
    type: 'warning',
    text: '2 users have been inactive for over 30 days.',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 'notif-3',
    type: 'info',
    text: 'Monthly user report is ready for download.',
    time: '1 day ago',
    unread: false,
  },
];

export const AppProvider = ({ children }) => {
  // Users state – persisted to localStorage
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('admin_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('admin_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('admin_theme') || 'light';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('admin_profile');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Jash Barot',
          role: 'Lead Administrator',
          email: 'jash.barot@admin.com',
          avatar: '',
        };
  });

  // Persist on changes
  useEffect(() => {
    localStorage.setItem('admin_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('admin_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('admin_theme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('admin_profile', JSON.stringify(user));
  }, [user]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addNotification = (type, text) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      type,
      text,
      time: 'Just now',
      unread: true,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearNotifications = () => setNotifications([]);

  // User CRUD
  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      avatar: userData.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
    };
    setUsers((prev) => [...prev, newUser]);
    addNotification('success', `New user "${userData.name}" added successfully.`);
    return newUser;
  };

  const updateUser = (id, data) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              ...data,
              avatar: data.name
                .split(' ')
                .map((w) => w[0])
                .join('')
                .toUpperCase()
                .slice(0, 2),
            }
          : u
      )
    );
    addNotification('info', `User "${data.name}" profile updated.`);
  };

  const deleteUser = (id) => {
    const target = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (target) {
      addNotification('warning', `User "${target.name}" was removed from the system.`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        addUser,
        updateUser,
        deleteUser,
        notifications,
        setNotifications,
        addNotification,
        markAllNotificationsRead,
        clearNotifications,
        themeMode,
        setThemeMode,
        toggleTheme,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
