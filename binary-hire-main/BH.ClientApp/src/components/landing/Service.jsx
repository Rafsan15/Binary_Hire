import React from "react";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import FindInPageIcon from "@mui/icons-material/FindInPage";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import "./Service.css";
const Service = () => {
  return (
    <>
    
      <Box sx={{ marginTop: { xs: "6rem", md: "4rem" } }}>
        <Box className="service-section">
       
          <h1> Services</h1>

          <Box
            sx={{ marginTop: { xs: "6rem", md: "4rem" } }}
            className="service-cards"
          >
            <Box data-aos="fade-left" className="service-card">
              <FindInPageIcon
                sx={{
                  placeContent: "center",
                  display: "inline-block",
                  margin: "auto",
                  color: " rgb(79, 104, 93 )",
                  width: "20%",
                  height: "20%",
                }}
              />
              <Box className="service-content">
                <h3> CV Parsing and Analysis</h3>
                <p>
                We offer you a seamless experience of the hiring process. 
                Our system can handle the manual tasks for you, providing automation throughout. 
                </p>
                <Link style={{ textDecoration: "none" }} href="https://binarybrenz.com/">
                  <Button
                    sx={{
                      placeContent: "center",
                      display: "flex",
                      margin: "auto auto 10px auto",
                      backgroundColor: "rgb(79, 104, 93)",
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: "2rem",

                      "&:hover": {
                        color: "rgb(79, 104, 93)",
                      },
                    }}
                  >
                    Get Start
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box data-aos="fade-up" className="service-card">
              <AccountTreeIcon
                sx={{
                  placeContent: "center",
                  display: "inline-block",
                  margin: "auto",
                  color: " rgb(79, 104, 93  )",
                  width: "20%",
                  height: "20%",
                }}
              />
              <Box className="service-content">
                <h3>Dynamic Workflow</h3>
                <p>
                Our unique selling proposition, the Dynamic Workflow feature, 
                empowers you to tailor the model to suit your preferences seamlessly.                 
                </p>
                <Link style={{ textDecoration: "none" }} href="https://binarybrenz.com/">
                  <Button
                    sx={{
                      placeContent: "center",
                      display: "flex",
                      margin: "auto auto 10px auto",
                      backgroundColor: "rgb(79, 104, 93)",
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: "2rem",
                      "&:hover": {
                        color: "rgb(79, 104, 93)",
                      },
                    }}
                  >
                    Get Start
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box data-aos="fade-right" className="service-card">
              <Diversity3Icon
                sx={{
                  placeContent: "center",
                  display: "inline-block",
                  margin: "auto",
                  color: " rgb(79, 104, 93  )",
                  width: "20%",
                  height: "20%",
                }}
              />
              <Box className="service-content">
                <h3> Automated Hiring Process</h3>
                <p>
                Our system enhances the overall recruitment experience for employers and 
                candidates in a more agile and competitive hiring environment.
                </p>
                <Link style={{ textDecoration: "none" }} href="https://binarybrenz.com/">
                  <Button
                    sx={{
                      placeContent: "center",
                      display: "flex",
                      margin: "auto auto 10px auto",
                      backgroundColor: "rgb(79, 104, 93)",
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: "2rem",
                      marginBottom: "2rem",
                      "&:hover": {
                        color: "rgb(79, 104, 93)",
                      },
                    }}
                  >
                    Get Start
                  </Button>
                </Link>
              </Box>
            </Box>

            <Box data-aos="fade-left" className="service-card">
              <DocumentScannerIcon
                sx={{
                  placeContent: "center",
                  display: "inline-block",
                  margin: "auto",
                  color: " rgb(79, 104, 93 )",
                  width: "20%",
                  height: "20%",
                }}
              />
              <Box className="service-content">
                <h3>Information Extarction</h3>
                <p>
                Utilizing advanced scraping technology, we conduct an in-depth analysis of 
                your website, extracting all reqquired job informations. 
                </p>
                <Link style={{ textDecoration: "none" }} href="https://binarybrenz.com/">
                  <Button
                    sx={{
                      placeContent: "center",
                      display: "flex",
                      margin: "auto auto 10px auto",
                      backgroundColor: "rgb(79, 104, 93)",
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: "2rem",
                      "&:hover": {
                        color: "rgb(79, 104, 93)",
                      },
                    }}
                  >
                    Get Start
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box data-aos="fade-up" className="service-card">
              <ImportantDevicesOutlinedIcon
                sx={{
                  placeContent: "center",
                  display: "inline-block",
                  margin: "auto",
                  color: " rgb(79, 104, 93  )",
                  width: "20%",
                  height: "20%",
                }}
              />
              <Box className="service-content">
                <h3>Communication Via Email </h3>
                <p>
                Our system facilitates seamless communication with applicants through email, 
                empowering you to engage with candidates effectively and efficiently.                
                </p>
                <Link style={{ textDecoration: "none" }} href="https://binarybrenz.com/">
                  <Button
                    sx={{
                      placeContent: "center",
                      display: "flex",
                      margin: "auto auto 10px auto",
                      backgroundColor: "rgb(79, 104, 93)",
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: "2rem",
                      marginBottom: "2rem",
                      "&:hover": {
                        color: "rgb(79, 104, 93)",
                      },
                    }}
                  >
                    Get Start
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box data-aos="fade-right" className="service-card">
              <WorkspacePremiumOutlinedIcon
                sx={{
                  placeContent: "center",
                  display: "inline-block",
                  margin: "auto",
                  color: " rgb(79, 104, 93  )",
                  width: "20%",
                  height: "20%",
                }}
              />
              <Box className="service-content">
                <h3> Scheduling and Interview</h3>
                <p>
                Our system provides you with the capability to effortlessly schedule interviews, 
                empowering you to coordinate and manage candidate meetings with ease.
                </p>
                <Link style={{ textDecoration: "none" }} href="https://binarybrenz.com/">
                  <Button
                    sx={{
                      placeContent: "center",
                      display: "flex",
                      margin: "auto auto 10px auto",
                      backgroundColor: "rgb(79, 104, 93)",
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: "2rem",
                      "&:hover": {
                        color: "rgb(79, 104, 93)",
                      },
                    }}
                  >
                    Get Start
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Service;
