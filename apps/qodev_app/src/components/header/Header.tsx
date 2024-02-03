
import {  useEffect, useRef, useState, MouseEvent } from 'react'
import { HeaderElements } from '@repo/utils/context'
import { uihooks } from '@repo/ui'
import { useRouter } from 'next/router'
import {
  Grid,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import { HeaderLogoNavigation } from './HeaderLogoNavigation';
import { HeaderLogo } from './HeaderLogo';

interface Props {
    menu: HeaderElements['menus']
    useRawLogoUrl?: boolean
    onLogout(): void
}

export const Header: React.FC<Props> = ({
    useRawLogoUrl,
    onLogout,
    menu
}) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const router = useRouter()
    // authentication context
    const { isMobile } = uihooks.useResolution()
  
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    console.log(menu)

    return (
        <>
            <Box
                role="banner"
                component="header"
                width="100%"
                display="flex"
                justifyContent="center"
                zIndex={999}
                sx={{
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderBottomStyle: 'solid',
                    borderBottomColor: 'divider',
                    ...(isMobile ? { position: 'fixed', top: 0, left: 0, right: 0} : {})
                }}
            >
               <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }}>
                <Container maxWidth="xl">
                <Toolbar disableGutters>
          <Grid item xs={12} md={1}>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon sx={{ color: 'black' }} />
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
                {/* {menu.map((menus, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{menus.name}</Typography>
                  </MenuItem>
                ))} */}
              </Menu>
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', mr: 1, width: '25%' }}>
            {/* Qodev logo */}
            <HeaderLogoNavigation shouldNavigateToNewTab={false} href="/">
                <HeaderLogo />
            </HeaderLogoNavigation>
          </Grid>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {menu.map((menus, idx) => (
              <Button
                key={idx}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: '400',
                  paddingRight: '30px',
                }}
              >
                {menus.name}
              </Button>
            ))}
          </Box>

          <Grid container item xs={12} display="flex" justifyContent="end">
            <Grid display="flex" alignItems="center">
              <Button>
                {/* <Image src={search_icon} /> */}
              </Button>
            </Grid>
            <Button
              size="small"
              variant="contained"
              startIcon={<LockIcon />}
              sx={{ background: '#059ED8', borderRadius: '9999px' }}
            >
              LOGIN
            </Button>
          </Grid>
        </Toolbar>
                </Container>
               </AppBar>
            </Box>
        </>
    )
}

