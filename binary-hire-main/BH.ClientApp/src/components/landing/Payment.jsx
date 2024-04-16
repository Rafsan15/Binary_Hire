import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Link from "@mui/material/Link";

import "./Payment.css";
const Payment = () => {
  return (
    <Box>
      <Box className="payment-section">
        <h1> Payment Plans</h1>

        <Box className="payment-cards">
          <Box className="payment-card">
            <Box
              className="payment-card1"
              sx={{
                background: `linear-gradient( 0deg, rgba(255,255,255,1) 80%, rgba(131,58,180,1)25%)`,
              }}
            >
              <Box className="payment-content">
                <h3 style={{ color: "white" }}> Silver  
                <h4 style={{ color: "white" }}>€5 / Month</h4> 
                </h3>
                <br/>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(131,58,180,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  20 Screening Sessions
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(131,58,180,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  250 Emails
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(131,58,180,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  20 Scheduling
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(131,58,180,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  Standalone
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(131,58,180,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  No Audit Log
                </p>

                <Link style={{ textDecoration: "none" }} href="https://binarybrenz.com/">
                  <Button
                    sx={{
                      placeContent: "center",
                      display: "flex",
                      margin: "auto auto 10px auto",
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "rgba(131,58,180,1) ",
                      padding: "1rem",
                      borderRadius: "5rem",
                      fontSize: "1rem",
                      marginTop: "5vw",
                      width: "100%",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(131,58,180,0.9)",
                      },
                    }}
                  >
                    REGISTER
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box className="payment-card">
            <Box
              className="payment-card1"
              sx={{
                background: `linear-gradient( 0deg, rgba(255,255,255,1) 80%, rgba(176, 219, 114, 1)25%)`,
                marginTop: "-5dvh",
              }}
            >
              <Box className="payment-content">
                <h3>Standard
                  <h4>€10 / Month</h4>
                </h3>
                <br></br>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(176, 219, 114,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                      50 Screening Sessions                
                      </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(176, 219, 114,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  500 Emails
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(176, 219, 114,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  100 Scheduling
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(176, 219, 114,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  Standalone
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(176, 219, 114,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  Audit Log
                </p>
                
                <Link style={{ textDecoration: "none" }} href="https://binarybrenz.com/">
                  <Button
                    sx={{
                      placeContent: "center",
                      display: "flex",

                      color: "black",
                      fontWeight: "bold",
                      backgroundColor: "rgba(176, 219, 114, 1) ",
                      padding: "1rem",
                      borderRadius: "5rem",
                      fontSize: "1rem",
                      width: "100%",
                      alignContent: "center",
                      marginTop: "5vw",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(176, 219, 114,0.9)",
                      },
                    }}
                  >
                    REGISTER
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box className="payment-card">
            <Box
              className="payment-card1"
              sx={{
                background: `linear-gradient( 0deg, rgba(255,255,255,1) 80%, rgba(228,138,19,1) 25%)`,
              }}
            >
              <Box className="payment-content">
                <h3 style={{ color: "white" }}> Premium
                <h4 style={{ color: "white" }}>€20 / Month</h4></h3>
                <br></br>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(228,138,19,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  Unlimited Screening Sessions
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(228,138,19,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  1000 Emails
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(228,138,19,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  500 Scheduling
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(228,138,19,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  Standalone
                </p>
                <p>
                  <DoneOutlineIcon
                    sx={{
                      color: "rgba(228,138,19,0.9)",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                    }}
                  />{" "}
                  Audit Log
                </p>
                <Link style={{ textDecoration: "none" }} href="https://binarybrenz.com/">
                  <Button
                    sx={{
                      placeContent: "center",
                      display: "flex",
                      margin: "auto auto 10px auto",
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "rgba(228,138,19,1) ",
                      padding: "1rem",
                      borderRadius: "5rem",
                      fontSize: "1rem",
                      marginTop: "5vw",
                      width: "100%",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(228,138,19,0.9)",
                      },
                    }}
                  >
                    REGISTER
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
