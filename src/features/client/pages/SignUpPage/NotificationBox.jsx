import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export default function NotificationBox({ message }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {open ? (
        <Alert severity="success" onClose={handleClose}>
          {message}
        </Alert>
      ) : null}
    </Box>
  );
}
