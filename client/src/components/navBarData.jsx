import ShieldIcon from '@mui/icons-material/Shield';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';



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

]
