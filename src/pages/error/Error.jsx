import React from 'react'
import "./error.scss"
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="container-err">
        <div className="card-container-err">
            <h1>404 Page Not Found</h1>
            <hr />
            <Link to="/">Return to homepage</Link>
        </div>
    </div>
  )
}

export default Error