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
import { ADD_STUDENT } from "../../context/Action.type";
import { useNavigate } from "react-router-dom";

const gradeList = [
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

const genderList = ["Male", "Female", "Others"];

const initialValuesStudents = {
  id: "",
  name: "",
  grade: "",
  gender: "",
  rollNo: "",
  fatherName: "",
  motherName: "",
  address: "",
  phone: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Required!!!"),
  grade: yup.string().required("Required!!!"),
  gender: yup.string().required("Required!!!"),
  fatherName: yup.string().required("Required!!!"),
  motherName: yup.string().required("Required!!!"),
  address: yup.string().required("Required!!!"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Required!!!"),
});

function getID() {
  const date = new Date();
  const id =
    "ABCS" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    date.getFullYear() +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  return id;
}

function getRollNo(list, grade) {
  let roll = 0;
  const filterList = list.filter((item) => item.grade === grade);
  if (filterList.length) {
    roll = filterList.length;
  }
  let rollStr = String(roll + 1).padStart(4, "0");
  const checkRoll = filterList.filter((item) => item.rollNo === rollStr);

  if (checkRoll.length) {
    roll = parseInt(filterList[-1].rollNo);
    rollStr = String(roll + 1).padStart(4, "0");
  }
  return rollStr;
}

export default function StudentAddForm() {
  const navigate = useNavigate();
  const { stateStudent, dispatchStudent } = useContext(Context);

  const formik = useFormik({
    initialValues: initialValuesStudents,
    onSubmit: (values) => {
      values.id = getID();
      values.rollNo = getRollNo(stateStudent.studentList, values.grade);

      dispatchStudent({
        type: ADD_STUDENT,
        payload: values,
      });

      navigate("/students");
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
        <h1>Add New Student Details</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-fields">
            {/* Roll No */}
            <TextField
              id="rollNo"
              name="rollNo"
              label="Roll No"
              fullWidth
              sx={{ m: 1 }}
              helperText="No input required for Roll No. It will be auto-generated after submission."
              disabled
              variant="filled"
              {...formik.getFieldProps("rollNo")}
            />

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
                readOnly: false,
              }}
              {...formik.getFieldProps("name")}
            />

            {/* Grade */}
            <TextField
              id="grade"
              name="grade"
              label="Grade"
              fullWidth
              sx={{ m: 1 }}
              select
              helperText={
                formik.errors.grade && formik.touched.grade
                  ? formik.errors.grade
                  : "Enter Grade"
              }
              required
              error={formik.errors.grade && formik.touched.grade}
              InputProps={{
                readOnly: false,
              }}
              {...formik.getFieldProps("grade")}
            >
              {gradeList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Gender */}
            <TextField
              id="gender"
              name="gender"
              label="Gender"
              fullWidth
              sx={{ m: 1 }}
              select
              helperText={
                formik.errors.gender && formik.touched.gender
                  ? formik.errors.gender
                  : "Enter Gender"
              }
              required
              error={formik.errors.gender && formik.touched.gender}
              InputProps={{
                readOnly: false,
              }}
              {...formik.getFieldProps("gender")}
            >
              {genderList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            {/* Father's Name*/}
            <TextField
              id="fatherName"
              name="fatherName"
              label="Father's Name"
              fullWidth
              sx={{ m: 1 }}
              helperText={
                formik.errors.fatherName && formik.touched.fatherName
                  ? formik.errors.fatherName
                  : "Enter Father's Name"
              }
              required
              error={formik.errors.fatherName && formik.touched.fatherName}
              InputProps={{
                readOnly: false,
              }}
              {...formik.getFieldProps("fatherName")}
            />

            {/* Mother's Name */}
            <TextField
              id="motherName"
              name="motherName"
              label="Mother's Name"
              fullWidth
              sx={{ m: 1 }}
              helperText={
                formik.errors.motherName && formik.touched.motherName
                  ? formik.errors.motherName
                  : "Enter Mother's Name"
              }
              required
              error={formik.errors.motherName && formik.touched.motherName}
              InputProps={{
                readOnly: false,
              }}
              {...formik.getFieldProps("motherName")}
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
          </div>
          <Button type="submit" variant="contained" color="secondary">
            Add Student
          </Button>
        </form>
      </Box>
    </div>
  );
}
