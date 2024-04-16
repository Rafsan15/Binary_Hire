import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { Link } from 'react-router-dom';




function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent ",
        height: "6rem",
        justifyItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="./src/assets/logo.png"
              alt="..."
              style={{
                height: "3rem",
              }}
            />
          </Box>

          <Box
            variant="h5"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="./BinaryBrenz.png"
              alt="..."
              style={{
                height: "3.5rem",
              }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              justifyContent: "end",
              marginLeft: { xs: "1rem", md: "80%" },
            }}
          >
            <IconButton
              sx={{
                p: 0,
                color: "black",
                fontWeight: "bold",
                // fontSize: "1.3rem",
              }}
            >
             <Link to="/login">LOG IN</Link> 
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
