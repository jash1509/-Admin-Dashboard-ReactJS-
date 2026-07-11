# 🛡️ Admin Dashboard — ReactJS

A modern, responsive **Admin Dashboard** built with **ReactJS (Vite)**, **Material UI**, and **React Hook Form**. Demonstrates reusable components, form validation, performance optimization with `React.memo` / `useCallback` / `useMemo`, and lazy loading with `React.lazy` + `Suspense`.

---

## 📸 Screenshots

> **Dashboard** — Metric cards, recent users list, role distribution, activity log.
> **Users** — Full DataTable with search, filter, add/edit form, and delete confirmation.
> **Settings** — Profile form with live preview and dark/light mode toggle.

---

## ✨ Features

- **Dashboard Overview** — Metric cards (Total Users, Active Users, Orders, Revenue), recent users preview, role distribution chart, and activity log.
- **User Management** — Full CRUD: add, edit, delete users with confirmation dialogs and toast notifications.
- **Users DataTable** — Searchable, filterable table with ID, Name, Email, Role, Status columns.
- **Add/Edit User Form** — React Hook Form with full validation (required, email format, role required).
- **Sidebar Navigation** — Dashboard, Users, Settings with active state highlighting.
- **Header** — Search box, notification bell with dropdown, user avatar & name, dark/light mode toggle.
- **Dark / Light Mode** — System-wide theme toggle with localStorage persistence.
- **Lazy Loading** — Users and Settings pages loaded on demand via `React.lazy` + `Suspense`.
- **Performance Optimization** — `React.memo`, `useCallback`, `useMemo` throughout.
- **Responsive Design** — Desktop fixed sidebar, tablet/mobile hamburger menu, stacked cards.
- **Toast Notifications** — MUI Snackbar alerts for add/edit/delete operations.
- **LocalStorage Persistence** — Users, notifications, theme, and profile are persisted across sessions.

---

## 🛠 Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| React.js | ^19 | Core UI library |
| Vite | ^8 | Build tool |
| Material UI (MUI) | ^9 | UI component library |
| React Router DOM | ^7 | Client-side routing |
| React Hook Form | ^7 | Form management & validation |
| React Icons (via MUI Icons) | ^9 | Icon set |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd admin-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 📁 Project Structure

```
admin-dashboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Sidebar.jsx         # Navigation sidebar (React.memo)
│   │   ├── Header.jsx          # Top bar with search, notifications, avatar
│   │   ├── DashboardCard.jsx   # Reusable metric card (React.memo)
│   │   ├── DataTable.jsx       # Reusable users table (React.memo)
│   │   ├── UserForm.jsx        # Add/Edit form with React Hook Form (React.memo)
│   │   └── Loader.jsx          # Suspense fallback spinner (React.memo)
│   ├── context/
│   │   └── AppContext.jsx      # Global state: users, theme, notifications
│   ├── data/
│   │   └── users.js            # Dummy user data
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main dashboard overview
│   │   ├── Users.jsx           # User management (lazy loaded)
│   │   └── Settings.jsx        # Account settings (lazy loaded)
│   ├── routes/
│   │   └── AppRoutes.jsx       # React Router configuration
│   ├── App.jsx                 # Root component with ThemeProvider
│   └── main.jsx                # Entry point
├── package.json
└── README.md
```

---

## 🌐 Routing

| Path | Component | Loading |
|---|---|---|
| `/` | Redirects to `/dashboard` | — |
| `/dashboard` | Dashboard | Eager |
| `/users` | Users | **Lazy** |
| `/settings` | Settings | **Lazy** |

---

## 🎯 Performance Optimization

### React.memo
Prevents unnecessary re-renders of pure components when parent re-renders:

```jsx
// Applied to:
export default React.memo(DashboardCard);
export default React.memo(Sidebar);
export default React.memo(DataTable);
export default React.memo(UserForm);
export default React.memo(Loader);
```

### useCallback
Stabilizes event handler references across renders:

```jsx
// Examples in Users.jsx:
const handleDelete = useCallback((id) => { setDeleteConfirmId(id); }, []);
const handleSearch = useCallback((e) => { setSearchTerm(e.target.value); }, []);
const handleEdit   = useCallback((id) => { /* ... */ }, [users]);
```

### useMemo
Memoizes expensive computations:

```jsx
// Examples in Dashboard.jsx:
const stats = useMemo(() => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  // ...
}, [users]);
```

### Lazy Loading & Suspense

```jsx
// In AppRoutes.jsx:
const Users    = React.lazy(() => import('../pages/Users'));
const Settings = React.lazy(() => import('../pages/Settings'));

<Suspense fallback={<Loader message="Loading Users..." />}>
  <Users />
</Suspense>
```

---

## 📋 Form Validation (React Hook Form)

```jsx
const { register, handleSubmit, formState: { errors } } = useForm();

// Name: required, minLength 2
{...register('name', { required: 'Name is required', minLength: { value: 2, message: '...' } })}

// Email: required, valid format
{...register('email', {
  required: 'Email is required',
  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
})}

// Role: required
{...register('role', { required: 'Role is required' })}
```

---

## 📊 Sample Dummy Data (src/data/users.js)

```js
const users = [
  { id: 1, name: "John Smith",    email: "john@gmail.com",    role: "Admin",   status: "Active"   },
  { id: 2, name: "Sara Johnson",  email: "sara@gmail.com",    role: "User",    status: "Inactive" },
  { id: 3, name: "Michael Lee",   email: "michael@gmail.com", role: "Manager", status: "Active"   },
  // ... 10 users total
];
```

---

## 🎨 UI / Design

- **MUI v9** component library
- **Inter** Google Font for premium typography
- **Sky blue (#0ea5e9)** primary + **Indigo (#6366f1)** secondary palette
- **Dark sidebar** (#1e293b) with gradient brand logo
- **Glass-like cards** with border + subtle shadow
- **Gradient accent top-bar** on DashboardCards
- **Smooth transitions** on hover effects
- **Responsive** — hamburger menu on mobile, fixed sidebar on desktop

---

## 🔮 Future Improvements

- [ ] Pagination for Users table
- [ ] Chart.js / Recharts charts on Dashboard
- [ ] JWT-based authentication
- [ ] REST API integration (Axios)
- [ ] User profile image upload
- [ ] Export to CSV/Excel
- [ ] Advanced role-based access control

---

## 📦 Deployment Steps

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy 'dist/' folder to:
# - Vercel: drag & drop or `vercel --prod`
# - Netlify: drag & drop 'dist/'
# - GitHub Pages: push with gh-pages
```

---

## ✅ Assessment Checklist

| Requirement | Status |
|---|---|
| UI Library (Material UI) | ✅ |
| Sidebar Navigation (Dashboard, Users, Settings) | ✅ |
| Header with Title, Search, Notifications, Avatar | ✅ |
| Dashboard Cards (Total Users, Active Users, Orders, Revenue) | ✅ |
| Users Table (ID, Name, Email, Role, Status) | ✅ |
| Add User Form (React Hook Form) | ✅ |
| Form Validation (Name, Email, Role) | ✅ |
| React.memo on reusable components | ✅ |
| useCallback for event handlers | ✅ |
| useMemo for computed stats | ✅ |
| React.lazy for Users and Settings | ✅ |
| Suspense with Loader fallback | ✅ |
| Responsive Design | ✅ |
| Dark Mode (Optional) | ✅ |
| Toast Notifications (Optional) | ✅ |
| Edit User (Optional) | ✅ |
| Delete User (Optional) | ✅ |
| LocalStorage persistence (Optional) | ✅ |

---

*Built for Assessment 14 — Admin Dashboard (ReactJS)*
