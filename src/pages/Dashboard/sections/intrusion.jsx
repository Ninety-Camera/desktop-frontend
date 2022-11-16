import * as React from "react";
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
            {notifications.map((notification) => (
              <StyledTableRow key={notifications.indexOf(notification)}>
                <StyledTableCell component="th" scope="row">
                  <Stack direction="row" spacing={5}>
                    <img
                      src={INTRUDER_IMG1}
                      alt=""
                      style={{ width: "2vw" }}
                    ></img>
                    Intrusion Alert on {notification.date} at{" "}
                    {notification.time}
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
