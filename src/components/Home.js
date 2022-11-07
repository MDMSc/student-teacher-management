import React, { useContext, useState } from "react";
import "./home.css";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Collapse,
  Paper,
  Grid,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export default function Home() {
  const {stateStudent, stateTeacher} = useContext(Context);
  const [sopen, setSopen] = useState(false);
  const [topen, setTopen] = useState(false);

  const handleClickStudent = () => {
    setSopen(!sopen);
  };
  const handleClickTeacher = () => {
    setTopen(!topen);
  };

  const nav = useNavigate();

  return (
    <>
      <h1>Student & Teacher Management System</h1>
      <div className="container">
        <Paper
          elevation={24}
          sx={{ maxWidth: 400, minWidth: 400 }}
          className="paper-container"
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            className="list-container"
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <h2>Admin Dashboard</h2>
              </ListSubheader>
            }
          >
            <ListItemButton
              onClick={handleClickStudent}
              className="clickStudent"
            >
              <ListItemText primary="Students" />
              {sopen ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => nav("/students/add")}
                >
                  <ListItemText primary="Add Student" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => nav("/students")}>
                  <ListItemText primary="Student List" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton
              onClick={handleClickTeacher}
              className="clickTeacher"
            >
              <ListItemText primary="Teachers" />
              {topen ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse in={topen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => nav("/teachers/add")}
                >
                  <ListItemText primary="Add Teacher" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => nav("/teachers")}>
                  <ListItemText primary="Teacher List" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Paper>

        <Grid container spacing={2} sx={{maxWidth: "80%"}} justifyContent="center" alignSelf="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Item sx={{backgroundColor: "pink"}}>
              <h3>Number of Teachers</h3>
              <h1>{stateTeacher.teacherList.length}</h1>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Item sx={{backgroundColor: "#CBFFD8"}}>
              <h3>Number of Students</h3>
              <h1>{stateStudent.studentList.length}</h1>
            </Item>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
