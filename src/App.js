import "./App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import StudentList from "./components/Students/StudentList";
import StudentAddForm from "./components/Students/StudentAddForm";
import StudentViewUpdate from "./components/Students/StudentViewUpdate";
import TeacherList from "./components/Teachers/TeacherList";
import TeacherAddForm from "./components/Teachers/TeacherAddForm";
import TeacherViewUpdate from "./components/Teachers/TeacherViewUpdate";
import { useReducer } from "react";
import { studentReducer, teacherReducer } from "./context/Reducer";
import { Context } from "./context/Context";


function App() {
  const [stateStudent, dispatchStudent] = useReducer(studentReducer, {
    readOnlyS: false,
    studentList: []
  });

  const [stateTeacher, dispatchTeacher] = useReducer(teacherReducer, {
    readOnlyT: false,
    teacherList: []
  });

  return (
    <div className="App">
      <Context.Provider value={{ stateStudent, stateTeacher, dispatchStudent, dispatchTeacher }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/add" element={<StudentAddForm />} />
          <Route path="/students/:id" element={<StudentViewUpdate />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/add" element={<TeacherAddForm />} />
          <Route path="/teachers/:id" element={<TeacherViewUpdate />} />
        </Routes>
      </Context.Provider>
    </div>
  );
}
export default App;
