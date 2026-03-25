import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// importing icons from react-icons
import { FiArrowLeft, FiMail, FiPhone, FiGlobe, FiUser, FiMapPin } from 'react-icons/fi'
import { BsBuildingsFill } from 'react-icons/bs'

function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // fetch single user details based on url param
  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true)
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        )

        if (!res.ok) {
          throw new Error('User not found')
        }

        const data = await res.json()
        setUser(data)
      } catch (err) {
        console.error('Error fetching user:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [id])

  // helper to grab first letter of each word in name
  function getInitials(name) {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // loading spinner
  if (loading) {
    return (
      <div className="detail-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <span className="loading-text">Loading user details...</span>
          </div>
        </div>
      </div>
    )
  }

  // user not found / error
  if (error || !user) {
    return (
      <div className="detail-page">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/')}>
            <FiArrowLeft /> Back to Dashboard
          </button>
          <div className="empty-state">
            <div className="empty-icon">
              <FiUser size={48} />
            </div>
            <h2 className="empty-title">User not found</h2>
            <p className="empty-subtitle">
              {error || 'This user does not exist.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-page">
      {/* header / navbar */}
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <div
              className="logo"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <div className="logo-icon">UD</div>
              <span className="logo-text">UserDirectory</span>
            </div>
            <div className="header-stats">
              <div className="stat-badge">
                <FiUser size={14} />
                Viewing Profile
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div style={{ paddingTop: '32px' }}>
          <button
            id="back-btn"
            className="back-btn"
            onClick={() => navigate('/')}
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
        </div>

        {/* profile hero section with gradient banner */}
        <div className="detail-hero">
          <div className="detail-hero-bg"></div>
          <div className="detail-hero-content">
            <div className="detail-avatar">{getInitials(user.name)}</div>
            <h1 className="detail-name">{user.name}</h1>
            <p className="detail-username">@{user.username}</p>
          </div>
        </div>

        {/* info cards arranged in a grid */}
        <div className="detail-grid">

          {/* -- contact info card -- */}
          <div className="detail-card">
            <div className="detail-card-title">
              <span className="icon"><FiMail size={16} /></span>
              Contact Information
            </div>
            <div className="detail-row">
              <span className="detail-label">Email</span>
              <span className="detail-value">
                <a href={`mailto:${user.email}`}>{user.email.toLowerCase()}</a>
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone</span>
              <span className="detail-value">{user.phone}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Website</span>
              <span className="detail-value">
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.website}
                </a>
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Username</span>
              <span className="detail-value">@{user.username}</span>
            </div>
          </div>

          {/* -- address card -- */}
          <div className="detail-card">
            <div className="detail-card-title">
              <span className="icon"><FiMapPin size={16} /></span>
              Address
            </div>
            <div className="detail-row">
              <span className="detail-label">Street</span>
              <span className="detail-value">{user.address.street}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Suite</span>
              <span className="detail-value">{user.address.suite}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">City</span>
              <span className="detail-value">{user.address.city}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Zipcode</span>
              <span className="detail-value">{user.address.zipcode}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Coordinates</span>
              <span className="detail-value">
                {user.address.geo.lat}, {user.address.geo.lng}
              </span>
            </div>
          </div>

          {/* -- company details card -- */}
          <div className="detail-card">
            <div className="detail-card-title">
              <span className="icon"><BsBuildingsFill size={16} /></span>
              Company Details
            </div>
            <div className="detail-row">
              <span className="detail-label">Company</span>
              <span className="detail-value">{user.company.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Catch Phrase</span>
              <span className="detail-value">{user.company.catchPhrase}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Business</span>
              <span className="detail-value">{user.company.bs}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
