import { useContext } from "react"
import { Box, IconButton, useTheme } from "@mui/material"
import { ColorModeContext, tokens } from "../../theme"
import { Link, useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search"
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Cookies from 'js-cookie';

const Topbar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    try {
        signOut();
        Cookies.remove('userId');
        Cookies.remove('organizationId');
        Cookies.remove('userName');
        navigate("/login");
    } catch (error) {
        console.error('Error signing out:', error);
    }
};

  return (
    <Box display="flex" justifyContent="space-between" p={2} >
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={colors.primary[800]} borderRadius="3px">

        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" ></InputBase>
        <IconButton type="button" sx={{ p: 1 }} >
          <SearchIcon />
        </IconButton> */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {
            theme.palette.mode === "dark"
            ? <LightModeOutlinedIcon />
            : <DarkModeOutlinedIcon />
          }
          
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleSignOut}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Topbar