import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { Context } from "../../context/Context";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from '@mui/icons-material/Close';
import "./list.css";
import { useNavigate } from "react-router-dom";
import {
  DELETE_STUDENT,
  EDIT_STUDENT,
  VIEW_STUDENT,
} from "../../context/Action.type";

const gradeList = [
  {
    value: "",
    label: "Select a Grade",
  },
  {
    value: "LKG",
    label: "LKG",
  },
  {
    value: "UKG",
    label: "UKG",
  },
  {
    value: "1",
    label: "I",
  },
  {
    value: "2",
    label: "II",
  },
  {
    value: "3",
    label: "III",
  },
  {
    value: "4",
    label: "IV",
  },
  {
    value: "5",
    label: "V",
  },
  {
    value: "6",
    label: "VI",
  },
  {
    value: "7",
    label: "VII",
  },
  {
    value: "8",
    label: "VIII",
  },
  {
    value: "9",
    label: "IX",
  },
  {
    value: "10",
    label: "X",
  },
];

function getGrade(value) {
  const grade = gradeList.filter((item) => item.value === value);
  return grade[0];
}

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

export default function StudentList() {
  const { stateStudent, dispatchStudent } = useContext(Context);
  const [grade, setGrade] = useState(gradeList[0].value);
  const [filterStudentList, setFilterStudentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (grade) {
      setFilterStudentList([
        ...stateStudent.studentList.filter((item) => item.grade === grade),
      ]);
    } else {
      setFilterStudentList([...stateStudent.studentList]);
    }
  }, [stateStudent.studentList,grade]);

  return (
    <div>
      <h1>Student List</h1>
      <div className="table-container">
        <div className="add-button">
          <Tooltip title="Add New Student">
            <IconButton
              color="primary"
              onClick={() => navigate("/students/add")}
            >
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <TextField
            id="grade"
            name="grade"
            label="Filter by Grade"
            sx={{ m: 1, width: "11rem" }}
            select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="clear" sx={{ m: 1 }} onClick={() => {
                    setGrade(gradeList[0].value);
                  }}>
                    <CloseIcon fontSize="small" color="action" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          >
            {gradeList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {filterStudentList.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{ width: "100%", maxWidth: "80vw" }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="right">Roll No.</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Grade</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterStudentList.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.rollNo}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      {getGrade(row.grade).label}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title="View Details">
                        <IconButton
                          color="info"
                          onClick={() => {
                            dispatchStudent({
                              type: VIEW_STUDENT,
                            });
                            navigate(`/students/${row.id}`);
                          }}
                        >
                          <VisibilityIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit">
                        <IconButton
                          color="success"
                          onClick={() => {
                            dispatchStudent({
                              type: EDIT_STUDENT,
                            });
                            navigate(`/students/${row.id}`);
                          }}
                        >
                          <BorderColorIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => {
                            dispatchStudent({
                              type: DELETE_STUDENT,
                              payload: row.id,
                            });
                            navigate("/students");
                          }}
                        >
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
        )}
      </div>
    </div>
  );
}
