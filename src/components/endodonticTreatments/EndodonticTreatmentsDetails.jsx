import React from "react";

import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const EndodonticTreamentsDetails = ({ patientId, endodonticTreatments }) => {
  return (
    <>
    <h1>Endodoncias</h1>
    {endodonticTreatments.map((treatment) => (
      <div key={treatment.id}>
        <h2>dienteEnd {treatment.dienteEnd}</h2>
        <p>grapaEnd: {treatment.grapaEnd}</p>
      </div>
    ))}
    </>
  );
};

export default EndodonticTreamentsDetails;
