import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

// importing icons from react-icons (using feather icon set)
import { FiSearch, FiUsers, FiFilter, FiList, FiGrid, FiArrowRight, FiMail, FiPhone, FiChevronUp, FiChevronDown, FiChevronsUp } from 'react-icons/fi'
import { HiOutlineSwitchVertical } from 'react-icons/hi'

function Dashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState(null)   // either 'name' or 'company'
  const [sortOrder, setSortOrder] = useState('asc')
  const [viewMode, setViewMode] = useState('table')  // table or grid toggle
  const navigate = useNavigate()

  // fetch all users once when the component first loads
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        const res = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!res.ok) {
          throw new Error('Something went wrong while fetching users')
        }

        const data = await res.json()
        setUsers(data)
      } catch (err) {
        console.error('Failed to load users:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // handles both filtering (search) and sorting in one go
  // useMemo so we dont recalculate on every render
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users]

    // filter by search query - checking both name and email
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((user) => {
        return (
          user.name.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q)
        )
      })
    }

    // apply sorting if user has selected a sort option
    if (sortField) {
      result.sort((a, b) => {
        let valA, valB

        if (sortField === 'name') {
          valA = a.name.toLowerCase()
          valB = b.name.toLowerCase()
        } else {
          // sort by company name
          valA = a.company.name.toLowerCase()
          valB = b.company.name.toLowerCase()
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [users, searchQuery, sortField, sortOrder])

  // toggle sort - if same field clicked again, flip the order
  function handleSort(field) {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  // get initials from full name for avatar
  function getInitials(name) {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // shows correct sort icon depending on current state
  function renderSortArrow(field) {
    if (sortField !== field) return <HiOutlineSwitchVertical />
    return sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />
  }

  // error state
  if (error) {
    return (
      <div className="dashboard-page">
        <header className="header">
          <div className="container">
            <div className="header-inner">
              <div className="logo">
                <div className="logo-icon">UD</div>
                <span className="logo-text">UserDirectory</span>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">
              <FiUsers size={48} />
            </div>
            <h2 className="empty-title">Failed to load users</h2>
            <p className="empty-subtitle">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      {/* top navigation bar */}
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <div className="logo">
              <div className="logo-icon">UD</div>
              <span className="logo-text">UserDirectory</span>
            </div>
            <div className="header-stats">
              <div className="stat-badge">
                <FiUsers size={14} />
                Total Users: <span className="count">{users.length}</span>
              </div>
              <div className="stat-badge">
                <FiFilter size={14} />
                Showing: <span className="count">{filteredAndSortedUsers.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* search bar + sort buttons + view toggle */}
        <div className="controls-section">
          <div className="controls-row">
            <div className="search-wrapper">
              <span className="search-icon">
                <FiSearch size={16} />
              </span>
              <input
                id="search-input"
                type="text"
                className="search-input"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* sorting controls */}
            <div className="sort-group">
              <span className="sort-label">Sort by:</span>
              <button
                id="sort-name-btn"
                className={`sort-btn ${sortField === 'name' ? 'active' : ''}`}
                onClick={() => handleSort('name')}
              >
                Name
                <span className="arrow">{renderSortArrow('name')}</span>
              </button>
              <button
                id="sort-company-btn"
                className={`sort-btn ${sortField === 'company' ? 'active' : ''}`}
                onClick={() => handleSort('company')}
              >
                Company
                <span className="arrow">{renderSortArrow('company')}</span>
              </button>
            </div>

            {/* switch between table and card views */}
            <div className="view-toggle">
              <button
                id="view-table-btn"
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Table view"
              >
                <FiList size={18} />
              </button>
              <button
                id="view-grid-btn"
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <FiGrid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* show spinner while data is being fetched */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <span className="loading-text">Loading users...</span>
          </div>
        )}

        {/* no results found */}
        {!loading && filteredAndSortedUsers.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <FiSearch size={48} />
            </div>
            <h2 className="empty-title">No users found</h2>
            <p className="empty-subtitle">
              Try adjusting your search query "{searchQuery}"
            </p>
          </div>
        )}

        {/* ---- TABLE VIEW ---- */}
        {!loading && filteredAndSortedUsers.length > 0 && viewMode === 'table' && (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedUsers.map((user) => (
                  <tr key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
                    <td>
                      <div className="user-name-cell">
                        <div className="user-avatar">{getInitials(user.name)}</div>
                        <span className="user-name">{user.name}</span>
                      </div>
                    </td>
                    <td className="user-email-cell">{user.email.toLowerCase()}</td>
                    <td className="user-phone-cell">{user.phone}</td>
                    <td>
                      <span className="user-company-cell">{user.company.name}</span>
                    </td>
                    <td>
                      <span className="row-arrow">
                        <FiArrowRight />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ---- GRID / CARD VIEW ---- */}
        {!loading && filteredAndSortedUsers.length > 0 && viewMode === 'grid' && (
          <div className="users-grid">
            {filteredAndSortedUsers.map((user) => (
              <div
                key={user.id}
                className="user-card"
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <div className="card-header">
                  <div className="card-avatar">{getInitials(user.name)}</div>
                  <div>
                    <div className="card-name">{user.name}</div>
                    <div className="card-company">{user.company.name}</div>
                  </div>
                </div>
                <div className="card-info">
                  <div className="card-info-row">
                    <div className="card-info-icon">
                      <FiMail size={14} />
                    </div>
                    <span>{user.email.toLowerCase()}</span>
                  </div>
                  <div className="card-info-row">
                    <div className="card-info-icon">
                      <FiPhone size={14} />
                    </div>
                    <span>{user.phone}</span>
                  </div>
                </div>
                <div className="card-arrow">
                  <FiArrowRight />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
