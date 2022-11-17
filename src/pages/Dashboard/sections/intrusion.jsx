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
import api from "../../../api";
import * as moment from "moment";
import HeightBox from "../../../components/HeightBox";

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
      } else {
        // Error occured in getting the previous intrusions
      }
    } catch (error) {
      // Error occured in getting the prevoius intrusions
    }
  }

  useEffect(() => {
    getPreviousIntrusions();
  }, []);

  return (
    <div
      style={{
        overflow: "hidden",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <HeightBox height={10} />
          <div style={{ paddingLeft: 10 }}>
            <h3>Previous Intrusions</h3>
          </div>

          <TableBody>
            {intrusions.reverse().map((intrusion) => (
              <StyledTableRow key={intrusion[0]}>
                <StyledTableCell component="th" scope="row">
                  <Stack direction="row" spacing={5}>
                    <img
                      src={INTRUDER_IMG1}
                      alt=""
                      style={{ width: "2vw" }}
                    ></img>
                    Intrusion Alert on
                    {" " + moment(intrusion[1]).format("YYYY-MM-DD HH:MM")}
                  </Stack>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() =>
                      navigate(
                        "/viewNotification/" + intrusion[0] + "/" + intrusion[1]
                      )
                    }
                  >
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
