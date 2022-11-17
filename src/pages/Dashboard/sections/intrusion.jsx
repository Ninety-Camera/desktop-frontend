import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import INTRUDER_IMG1 from "../../../assets/images/Intruder1.jpg";
import INTRUDER_IMG2 from "../../../assets/images/intruder2.webp";
import api from "../../../api";

const notifications = [
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
  {
    date: "20/02/2022",
    time: "09:34",
    images: [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG1],
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function IntrusionSection() {
  const navigate = useNavigate();
  const [intrusions, setIntrusions] = useState([]);

  async function getPreviousIntrusions() {
    try {
      const response = await api.local_intrusions.getIntrusions();
      if (response?.status === 200) {
        setIntrusions(response?.data?.data);
      }
      console.log("All intrusions are: ", response);
    } catch (error) {}
  }

  useEffect(() => {
    getPreviousIntrusions();
  }, []);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableBody>
            {intrusions.map((intrusion) => (
              <StyledTableRow key={intrusion[0]}>
                <StyledTableCell component="th" scope="row">
                  <Stack direction="row" spacing={5}>
                    <img
                      src={INTRUDER_IMG1}
                      alt=""
                      style={{ width: "2vw" }}
                    ></img>
                    Intrusion Alert on {intrusion[1]} at {intrusion[1]}
                  </Stack>
                </StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => navigate("/viewNotification")}>
                    View more
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
