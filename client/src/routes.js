import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { LoginPage } from './pages/LoginPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path='/links' element={<LinksPage />}/>
        <Route path='/create' element={<CreatePage />}/>
        <Route path='/detail/:id' element={<DetailPage />}/>
        <Route path="*" element={<Navigate replace to="/create" />} />
      </Routes>
    )
  }
  return ( 
    <Routes>
      <Route path="/" element={<RegistrationPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}