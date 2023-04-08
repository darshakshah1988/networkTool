import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MapsHomeWorkIcon from '@mui/icons-material/RoofingTwoTone';
import { Link, useNavigate } from 'react-router-dom';
import CustomizedSwitches from '../Switch';
import { ThemeContext } from '../ThemeContext';
import { AuthContext } from '../AuthContext'
import { logout } from '../../service';
import { toast } from 'react-toastify';

const pages = [
  { name: 'Home', route: '/' },
];
const loggedOut = [{ name: 'Login', route: '/login' }, { name: 'Sign Up', route: '/login' },];
const loggedIn = [{ name: 'Profile', route: '/login' },{ name: 'My Listings', route: '/myProperties' }, { name: 'Sell', route: '/sell' },{ name: 'Logout', route: '/logout' }];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated,setIsAuthenticated, setUser } = React.useContext(AuthContext);
  const { dark } = React.useContext(ThemeContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserOptions = async (item) =>{
    if(item.name !== 'Logout'){
      navigate(item.route);
    } else{
      const resp = await logout();
      if(resp?.data?.success){
        toast.success(resp?.data?.message)
        setIsAuthenticated(false);
        setUser({});
        navigate('/')
      } else{
        toast.error(resp);
      }

    }
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: `${dark ? 'black' : 'white'}` }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <MapsHomeWorkIcon sx={{ display: { xs: 'none', md: 'flex', color: `${!dark ? 'black' : 'white'}`, }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: `${!dark ? 'black' : 'white'}`,
              textDecoration: 'none',
            }}
          >
            APP
          </Typography>
          {/* Mobile Design  */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: `${!dark ? 'black' : 'white'}`}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={page.route}>
                  <MenuItem onClick={handleCloseNavMenu} >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Web Design  */}
          <MapsHomeWorkIcon sx={{ display: { xs: 'flex', color: `${!dark ? 'black' : 'white'}`, md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: `${!dark ? 'black' : 'white'}`,
              textDecoration: 'none',
            }}
          >
            APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
            <div className='flex justify-evenly w-[50%]'>
              {pages.map((page) => (
                <Link to={page.route}>
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: `${!dark ? 'black' : 'white'}`, display: 'block' }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </div>
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            {/* <CustomizedSwitches /> */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAuthenticated && loggedIn.map((setting) => (
                // <Link to={setting.route}>
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={()=> handleUserOptions(setting)}>{setting.name}</Typography>
                  </MenuItem>
                // </Link>
              ))}
              {isAuthenticated === false && loggedOut.map((setting) => (
                <Link to={setting.route}>
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
