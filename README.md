# User Directory Dashboard

A simple React app that fetches user data from an API and displays it in a clean dashboard. You can search, sort, and click on any user to view their full details.

Built this as a frontend assignment to practice working with APIs, routing, and building a proper UI.

## What it does

- Fetches users from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)
- Shows all users in a table (or grid view if you toggle it)
- Search users by name or email — filters in real time, no extra API calls
- Sort by Name or Company (ascending / descending)
- Click on any user to see their full profile — address, company info, website etc
- Has a loading spinner while data loads
- Shows a "no users found" message if search doesn't match anything

## Tech Stack

- **React** (with hooks — useState, useEffect, useMemo)
- **React Router** for page navigation
- **Vite** as the dev server / bundler
- **react-icons** for icons (Feather + Bootstrap icon sets)
- **Vanilla CSS** — no Tailwind or UI library, wrote all the styles manually

## How to run

Make sure you have Node.js installed, then:

```bash
# install dependencies
npm install

# start development server
npm run dev
```

App will open on `http://localhost:5173`

## Folder Structure

```
src/
├── main.jsx            # entry point, wraps app in BrowserRouter
├── App.jsx             # routes — dashboard and user detail
├── index.css           # all styles
└── pages/
    ├── Dashboard.jsx   # main page with user table, search, sort
    └── UserDetail.jsx  # individual user profile page
```

Kept it simple — didn't overcomplicate with too many components since it's a small project.

## Pages

**Dashboard (`/`)**
- Table with Name, Email, Phone, Company columns
- Search bar at the top
- Sort buttons for Name and Company
- Toggle between table view and grid/card view

**User Detail (`/user/:id`)**
- Shows full user info — username, email, phone, website
- Address with street, city, zipcode, coordinates
- Company details — name, catch phrase, business type
- Back button to go to dashboard

## API Used

```
GET https://jsonplaceholder.typicode.com/users       — all users
GET https://jsonplaceholder.typicode.com/users/:id   — single user
```


## Things I'd improve if I had more time

- Add dark/light theme toggle
- Add pagination if the user list was bigger
- Write some unit tests
- Maybe add a favorites feature with localStorage
- Better error handling with retry button

---

Made with React + Vite
