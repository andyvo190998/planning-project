import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"
import { AppBar, Toolbar, IconButton, Typography, Stack } from '@mui/material'


const NavBar = () => {

  return (
    <AppBar sx={{ bgcolor: "#6F2FA0" }} position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color='#6F2FA0' aria-label='logo'>
          </IconButton>
          <Typography variant="h9" component="div" sx={{ flexGrow: 0.5}}>
            Planning
          </Typography>
          <Stack direction="row" spacing={2}>
            <NavLink to="/tab" className="btn-tab"><span className="nav-link">Tab 1</span></NavLink>
            <NavLink className="btn-tab1">Tab 2</NavLink>
            <NavLink className="btn-tab1">Tab 3</NavLink>
          </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar