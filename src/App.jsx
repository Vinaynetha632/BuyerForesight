import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import UserDetail from './pages/UserDetail'

// main app component - handles all routing
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  )
}

export default App
