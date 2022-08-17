import { Box, Button, Typography } from "@mui/material";
import React, { FC, FormEvent } from "react";

export interface ImagesUploadDialogProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancelClick: () => void;
}

const ImagesUploadDialog: FC<ImagesUploadDialogProps> = ({
  onSubmit,
  onCancelClick,
}) => {
  return (
    <>
      <Typography
        variant="h5"
        style={{ marginLeft: "20px", marginTop: "20px" }}
      >
        Upload Image
      </Typography>
      <form onSubmit={onSubmit}>
        <Box
          style={{ maxWidth: "500px", margin: "20px" }}
          display="flex"
          flexDirection="column"
        >
          <input type="file" name="image" accept="image/*" required />
        </Box>
        <Box style={{ margin: "20px" }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button onClick={onCancelClick}>Cancel</Button>
        </Box>
      </form>
    </>
  );
};

export default ImagesUploadDialog;
