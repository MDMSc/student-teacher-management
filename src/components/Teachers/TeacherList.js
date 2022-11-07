import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Context } from "../../context/Context";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./list.css";
import { useNavigate } from "react-router-dom";
import { DELETE_TEACHER, EDIT_TEACHER, VIEW_TEACHER } from "../../context/Action.type";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

export default function TeacherList() {
  const { stateTeacher, dispatchTeacher } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Teacher List</h1>
      <div className="table-container">
        <div className="add-button">
        <Tooltip title="Add New Teacher">
          <IconButton color="primary" onClick={() => navigate("/teachers/add")}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        </div>

        {
          stateTeacher.teacherList.length > 0 ? (
            <TableContainer
          component={Paper}
          sx={{ width: "100%", maxWidth: "80vw" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Subject</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stateTeacher.teacherList.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.subject}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton color="info" onClick={() => {
                        dispatchTeacher({
                          type: VIEW_TEACHER
                        })
                        navigate(`/teachers/${row.id}`);
                      }}>
                        <VisibilityIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                      <IconButton color="success" onClick={() => {
                        dispatchTeacher({
                          type: EDIT_TEACHER
                        })
                        navigate(`/teachers/${row.id}`);
                      }}>
                        <BorderColorIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => {
                        dispatchTeacher({
                          type: DELETE_TEACHER,
                          payload: row.id,
                        })
                        navigate(`/teachers`);
                      }}>
                        <DeleteIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          ) : (
            <p>No Data Found...</p>
          )
        }
        
      </div>
    </div>
  );
}
