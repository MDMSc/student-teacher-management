import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./form.css";
import { Context } from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_TEACHER } from "../../context/Action.type";

const subjectList = [
  "Advanced Mathematics",
  "Advanced Geography",
  "Advanced History",
  "Computer Science",
  "General English",
  "Mathematics",
  "MIL (Hindi)",
  "MIL (Kannada)",
  "MIL (Assamese)",
  "Science (Physics)",
  "Science (Chemistry)",
  "Science (Biology)",
  "Social Studies(Geography)",
  "Social Studies(History)",
  "Social Studies(Economics)",
  "Social Studies(Political Science)",
];

const validationSchema = yup.object().shape({
  name: yup.string().required("Required!!!"),
  email: yup.string().email("Invalid email").required("Required!!!"),
  address: yup.string().required("Required!!!"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Required!!!"),
  qualification: yup.string().required("Required!!!"),
  subject: yup.string().required("Required!!!"),
});

export default function TeacherViewUpdate() {
  const { id } = useParams();
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const { stateTeacher, dispatchTeacher } = useContext(Context);
  let objIndex = -1;

  function getInitialValues() {
    objIndex = stateTeacher.teacherList.findIndex((item) => item.id === id);
    if (objIndex < 0) {
      return {
        id: id,
        name: "",
        email: "",
        address: "",
        phone: "",
        qualification: "",
        subject: "",
      };
    }
    return {
      id: id,
      name: stateTeacher.teacherList[objIndex].name,
      email: stateTeacher.teacherList[objIndex].email,
      address: stateTeacher.teacherList[objIndex].address,
      phone: stateTeacher.teacherList[objIndex].phone,
      qualification: stateTeacher.teacherList[objIndex].qualification,
      subject: stateTeacher.teacherList[objIndex].subject,
    };
  }

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: (values) => {

      dispatchTeacher({
        type: UPDATE_TEACHER,
        payload: values,
      });
      navigate("/teachers");
    },
    validationSchema,
  });

  return (
    <div className="form-container">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "50vw",
          m: 2,
        }}
        noValidate
        autoComplete="off"
      >
        {stateTeacher.readOnlyT ? (
          <h1>View Teacher Details</h1>
        ) : (
          <h1>Edit Teacher Details</h1>
        )}

        {objIndex < 0 ? (
          <p className="error">No Data Found for ID {id}</p>
        ) : (
          <React.Fragment>
            <form onSubmit={formik.handleSubmit}>
            <div className="form-fields">
              {/* Full Name */}
              <TextField
                id="name"
                name="name"
                label="Full Name"
                fullWidth
                sx={{ m: 1 }}
                helperText={
                  formik.errors.name && formik.touched.name
                    ? formik.errors.name
                    : "Enter Full Name"
                }
                required
                error={formik.errors.name && formik.touched.name}
                InputProps={{
                  readOnly: stateTeacher.readOnlyT,
                }}
                {...formik.getFieldProps("name")}
              />

              {/* Email */}
              <TextField
                id="email"
                name="email"
                label="Email"
                fullWidth
                sx={{ m: 1 }}
                helperText={
                  formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : "Enter Email"
                }
                required
                error={formik.errors.email && formik.touched.email}
                InputProps={{
                  readOnly: stateTeacher.readOnlyT,
                }}
                {...formik.getFieldProps("email")}
              />

              {/* Address */}
              <TextField
                id="address"
                name="address"
                label="Address"
                fullWidth
                sx={{ m: 1 }}
                helperText={
                  formik.errors.address && formik.touched.address
                    ? formik.errors.address
                    : "Enter Address"
                }
                required
                error={formik.errors.address && formik.touched.address}
                InputProps={{
                  readOnly: stateTeacher.readOnlyT,
                }}
                multiline
                rows={3}
                {...formik.getFieldProps("address")}
              />

              {/* Phone Number */}
              <TextField
                id="phone"
                name="phone"
                label="Phone Number"
                fullWidth
                sx={{ m: 1 }}
                helperText={
                  formik.errors.phone && formik.touched.phone
                    ? formik.errors.phone
                    : "Enter Phone Number"
                }
                required
                error={formik.errors.phone && formik.touched.phone}
                InputProps={{
                  readOnly: stateTeacher.readOnlyT,
                  startAdornment: (
                    <InputAdornment position="start">+91-</InputAdornment>
                  ),
                }}
                {...formik.getFieldProps("phone")}
              />

              {/* Qualification */}
              <TextField
                id="qualification"
                name="qualification"
                label="Qualification"
                fullWidth
                sx={{ m: 1 }}
                helperText={
                  formik.errors.qualification && formik.touched.qualification
                    ? formik.errors.qualification
                    : "Enter Qualification"
                }
                required
                error={
                  formik.errors.qualification && formik.touched.qualification
                }
                InputProps={{
                  readOnly: stateTeacher.readOnlyT,
                }}
                {...formik.getFieldProps("qualification")}
              />

              {/* Subject */}
              <TextField
                id="subject"
                name="subject"
                label="Subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                fullWidth
                sx={{ m: 1 }}
                select
                helperText={
                  formik.errors.subject && formik.touched.subject
                    ? formik.errors.subject
                    : "Enter Subject"
                }
                required
                error={formik.errors.subject && formik.touched.subject}
                InputProps={{
                  readOnly: stateTeacher.readOnlyT,
                }}
                {...formik.getFieldProps("subject")}
              >
                {subjectList.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              </div>

              {stateTeacher.readOnlyT ? (
                ""
              ) : (
                <Button type="submit" variant="contained" color="secondary">
                  Edit Teacher
                </Button>
              )}
            </form>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
