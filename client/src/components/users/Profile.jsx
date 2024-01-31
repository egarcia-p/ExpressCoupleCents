import React, { useState } from 'react'
import { getUser } from '../../services/users.service';

const Profile = () => {
  const { user, setUser } = useState(getUser('658cec6bc586a046a046172b'));
  const {isLoading, setIsLoading} = useState();
  const {isAuthenticated, setIsAuthenticated} = useState();


  if (isLoading) {
    return <div>Loading ...</div>
  }



  return (
    isAuthenticated && (
      <div>
        <h2>{user}</h2>
        <p>{user.email}</p>
      </div>
    )
  )
}

export default Profile