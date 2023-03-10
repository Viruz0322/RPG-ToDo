import React from 'react'
import ShieldIcon from '@mui/icons-material/Shield';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';


export const navBarData = [
  {
    title: 'Warrior',
    icon: <ShieldIcon/>,
    link: '/home'
  },

  {
    title: 'Healer',
    icon: <LocalHospitalIcon/>,
    link: '/home'
  },

  {
    title: 'Scholar',
    icon: <SchoolIcon/>,
    link: '/home'
  },

  {
    title: 'Sign Out',
    icon: <LogoutIcon/>,
    link: '/home'
  },
]
