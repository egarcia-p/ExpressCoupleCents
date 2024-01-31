import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div className="home">
    <div className="container">
      <div className="top">
        <h1 className="display-4">CoupleCents</h1>
        <p className="lead">
          App to manage transactions with your couple.
        </p>
        <hr className="my-4" />
        <Link to="/login" className="btn">
          Login
        </Link>
        <Link to="/profile" className="btn">
          Profile
        </Link>
      </div>
    </div>
  </div>
)
