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
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_STUDENT } from "../../context/Action.type";

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

export default function StudentViewUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stateStudent, dispatchStudent } = useContext(Context);
  let objIndex = -1;

  function getInitialValues() {
    objIndex = stateStudent.studentList.findIndex((item) => item.id === id);
    if (objIndex < 0) {
      return {
        id: id,
        name: "",
        grade: "",
        gender: "",
        rollNo: "",
        fatherName: "",
        motherName: "",
        address: "",
        phone: "",
      };
    }
    return {
      id: id,
      name: stateStudent.studentList[objIndex].name,
      grade: stateStudent.studentList[objIndex].grade,
      gender: stateStudent.studentList[objIndex].gender,
      rollNo: stateStudent.studentList[objIndex].rollNo,
      fatherName: stateStudent.studentList[objIndex].fatherName,
      motherName: stateStudent.studentList[objIndex].motherName,
      address: stateStudent.studentList[objIndex].address,
      phone: stateStudent.studentList[objIndex].phone,
    };
  }

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: (values) => {
      dispatchStudent({
        type: UPDATE_STUDENT,
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
        {stateStudent.readOnlyS ? (
          <h1>View Student Details</h1>
        ) : (
          <h1>Edit Student Details</h1>
        )}

        {objIndex < 0 ? (
          <p className="error">No Data Found for ID {id}</p>
        ) : (
          <React.Fragment>
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
                    readOnly: stateStudent.readOnlyS,
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
                    readOnly: stateStudent.readOnlyS,
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
                    readOnly: stateStudent.readOnlyS,
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
                    readOnly: stateStudent.readOnlyS,
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
                    readOnly: stateStudent.readOnlyS,
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
                    readOnly: stateStudent.readOnlyS,
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
                    readOnly: stateStudent.readOnlyS,
                    startAdornment: (
                      <InputAdornment position="start">+91-</InputAdornment>
                    ),
                  }}
                  {...formik.getFieldProps("phone")}
                />
              </div>

              {stateStudent.readOnlyS ? (
                ""
              ) : (
                <Button type="submit" variant="contained" color="secondary">
                  Edit Student
                </Button>
              )}
            </form>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
