import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";

export default function Consent() {
  const [open, setOpen] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setAccepted(true);
    setOpen(false);
  };

  React.useEffect(() => {
    if (!accepted) {
      handleClickOpen();
    }
  }, [accepted]);

  const handleBackdropClick = (event) => {
    event.stopPropagation(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClick={handleBackdropClick}
      maxWidth="lg"
    >
      <div>
        <DialogTitle>
          <Typography variant="h5" component="span" color="primary">
            Terms and Conditions
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" color="primary">
            1. Website Access for Bot Operation
          </Typography>
          <Typography sx={{ mb: 2 }} variant="body1">
            By utilizing our services, you are hereby granting explicit
            permission for our platform to access your website for the purpose
            of deploying bots. These bots are designed to systematically gather
            information and identify potential dark patterns on your website. It
            is important to note that our bots will operate in accordance with
            industry-standard web protocols. Moreover, any directives such as
            robots.txt or bot blockers on your website shall not be implemented.
          </Typography>

          <Typography variant="subtitle1" color="primary">
            2. Data Storage and Utilization
          </Typography>
          <Typography variant="body1">
            In alignment with our commitment to providing a state-of-the-art
            service, we reserve the right to store data collected by our bots on
            our secure servers. This stored data will be leveraged for
            analytical purposes, with the primary objective of identifying
            patterns, trends, and opportunities for refining our bot's
            capabilities. Rest assured, all data stored will be handled with the
            highest degree of confidentiality and in strict adherence to
            relevant data protection regulations. By accepting these terms, you
            acknowledge and provide explicit consent for the storage and
            processing of data on our servers. This process is essential for
            optimizing the functionality and overall performance of our bot
            system.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1">
            By accepting these terms, you acknowledge and provide explicit
            consent for the storage and processing of data on our servers. This
            process is essential for optimizing the functionality and overall
            performance of our bot system.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccept} color="primary" variant="contained">
            Accept
          </Button>
          <Button onClick={handleClose} color="error" sx={{ mx: 2 }}>
            Reject
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
