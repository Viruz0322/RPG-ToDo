import React from 'react'
import ShieldIcon from '@mui/icons-material/Shield';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import Warrior from './Warrior';


//add unique classnames or id to array
export const navBarData = [
  {
    title: 'Warrior',
    icon: <ShieldIcon/>,
    link: 'warrior',
  },
 
  {
    title: 'Healer',
    icon: <LocalHospitalIcon/>,
    link: 'healer'
  },

  {
    title: 'Scholar',
    icon: <SchoolIcon/>,
    link: 'scholar'
  },

  {
    title: 'Sign Out',
    icon: <LogoutIcon/>,
    link: 'sign-out'
  },
]
