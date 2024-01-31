import React from 'react'
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import Home from '../Home'
import Profile from '../components/users/Profile'
import Login from '../Login'

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/profile" exact element={<Profile />} />
      {/* <Route
        path="/recipe_equipments/:id"
        exact
        element={<RecipeEquipments />}
      /> */}
    </Routes>
  </BrowserRouter>
)
