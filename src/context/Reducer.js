import {
  ADD_STUDENT,
  EDIT_STUDENT,
  DELETE_STUDENT,
  VIEW_STUDENT,
  UPDATE_STUDENT,
} from "./Action.type";
import {
  ADD_TEACHER,
  DELETE_TEACHER,
  EDIT_TEACHER,
  UPDATE_TEACHER,
  VIEW_TEACHER,
} from "./Action.type";

export const studentReducer = (state, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return { ...state, studentList: [...state.studentList, action.payload] };
    case VIEW_STUDENT:
      return { ...state, readOnlyS: true };
    case DELETE_STUDENT:
      return {
        ...state,
        studentList: state.studentList.filter(
          (item) => item.id !== action.payload
        ),
      };
    case EDIT_STUDENT:
      return { ...state, readOnlyS: false };
    case UPDATE_STUDENT:
      const updatedStudent = action.payload;
      const updatedStudentList = state.studentList.map((item) => {
        if (item.id === updatedStudent.id) {
          return updatedStudent;
        }
        return item;
      });
      return {
        ...state,
        studentList: updatedStudentList,
      };

    default:
      return state;
  }
};

export const teacherReducer = (state, action) => {
  switch (action.type) {
    case ADD_TEACHER:
      return { ...state, teacherList: [...state.teacherList, action.payload] };
    case VIEW_TEACHER:
      return { ...state, readOnlyT: true };
    case DELETE_TEACHER:
      return {
        ...state,
        teacherList: state.teacherList.filter(
          (item) => item.id !== action.payload
        ),
      };
    case EDIT_TEACHER:
      return { ...state, readOnlyT: false };
    case UPDATE_TEACHER:
      const updatedTeacher = action.payload;
      const updatedTeacherList = state.teacherList.map((item) => {
        if (item.id === updatedTeacher.id) {
          return updatedTeacher;
        }
        return item;
      });
      return {
        ...state,
        teacherList: updatedTeacherList,
      };
    default:
      return state;
  }
};
