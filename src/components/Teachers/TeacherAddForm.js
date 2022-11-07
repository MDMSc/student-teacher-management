import React, { useContext } from "react";
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
import { ADD_TEACHER } from "../../context/Action.type";
import { useNavigate } from "react-router-dom";

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

const initialValuesTeachers = {
  id: "",
  name: "",
  email: "",
  address: "",
  phone: "",
  qualification: "",
  subject: "",
};

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

function getID() {
  const date = new Date();
  const id = "ABCT" + ("0"+(date.getMonth()+1)).slice(-2) + ("0"+date.getDate()).slice(-2) + date.getFullYear() + ("0"+date.getHours()).slice(-2) + ("0"+date.getMinutes()).slice(-2) + ("0"+date.getSeconds()).slice(-2);
  return id;
}

export default function TeacherAddForm() {
  const navigate = useNavigate();
  const {dispatchTeacher} = useContext(Context);

  const formik = useFormik({
    initialValues: initialValuesTeachers,
    onSubmit: (values) => {
      values.id = getID();

      dispatchTeacher({
        type: ADD_TEACHER,
        payload: values
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
          justifyContent: "center",
          width: "100%",
          maxWidth: "50vw",
          m: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Add New Teacher Details</h1>

        {/* Full Name */}
        <form onSubmit={formik.handleSubmit}>
        <div className="form-fields">
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
              readOnly: false,
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
              readOnly: false,
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
              readOnly: false,
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
              readOnly: false,
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
            error={formik.errors.qualification && formik.touched.qualification}
            InputProps={{
              readOnly: false,
            }}
            {...formik.getFieldProps("qualification")}
          />

          {/* Subject */}
          <TextField
                id="subject"
                name="subject"
                label="Subject"
                fullWidth sx={{ m: 1 }}
                select
                helperText={
                  formik.errors.subject && formik.touched.subject
                    ? formik.errors.subject
                    : "Enter Subject"
                }
                required
                error={formik.errors.subject && formik.touched.subject}
                InputProps={{
                  readOnly: false,
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

          <Button type="submit" variant="contained" color="secondary">Add Teacher</Button>
        </form>
      </Box>
    </div>
  );
}
