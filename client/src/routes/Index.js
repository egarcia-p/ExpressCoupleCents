import React from 'react'
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import Home from '../Home'

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      {/* <Route
        path="/recipe_equipments/:id"
        exact
        element={<RecipeEquipments />}
      /> */}
    </Routes>
  </BrowserRouter>
)
