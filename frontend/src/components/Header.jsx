import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1976d2',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  padding: '24px 16px',
  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
  color: 'white',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
  },
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSubmenuToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawerContent = (
    <Box role="presentation">
      <DrawerHeader>
        <Typography variant="h5" fontWeight="bold">
          Employee Portal
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
          Management System
        </Typography>
      </DrawerHeader>
      
      <List>
        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        
        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <ListItem button onClick={handleSubmenuToggle}>
          <ListItemIcon>
            <SettingsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Management" />
          {submenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/')}>
              <ListItemIcon>
                <PeopleIcon fontSize="small" color="action" />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/')}>
              <ListItemIcon>
                <AssessmentIcon fontSize="small" color="action" />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ my: 1 }} />

        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        
        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <ContactIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Employee Management System
          </Typography>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <StyledLink to="/">
              <Box display="flex" alignItems="center" gap={1}>
                <HomeIcon fontSize="small" />
                Home
              </Box>
            </StyledLink>
            <StyledLink to="/">
              <Box display="flex" alignItems="center" gap={1}>
                <DashboardIcon fontSize="small" />
                Dashboard
              </Box>
            </StyledLink>
            <StyledLink to="/">
              <Box display="flex" alignItems="center" gap={1}>
                <InfoIcon fontSize="small" />
                About
              </Box>
            </StyledLink>
            <StyledLink to="/">
              <Box display="flex" alignItems="center" gap={1}>
                <ContactIcon fontSize="small" />
                Contact
              </Box>
            </StyledLink>
          </Box>
        </Toolbar>
      </StyledAppBar>
      
      <StyledDrawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </StyledDrawer>
    </>
  );
};

export default Header;
