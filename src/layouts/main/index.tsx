/* eslint-disable prettier/prettier */
import { Link as ScrollLink } from 'react-scroll';
import { useLocation, Outlet } from 'react-router-dom';
// material
import { Box, Link, Container, Typography } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainNavbar from './MainNavbar';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}
