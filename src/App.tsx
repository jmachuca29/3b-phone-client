import React from 'react'
import ThemeProvider from './theme'
import Router from 'src/routes/sections';

export const App = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  )
}
