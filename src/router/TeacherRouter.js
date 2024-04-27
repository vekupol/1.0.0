import Home from "../pages/mainPages/Home";
import { Navigate } from "react-router-dom";
import TeacherPaneli from "../pages/teacher/TeacherPaneli";
import ClassEdit from "../pages/teacher/ClassEdit";
import StudentEdit from "../pages/teacher/StudentEdit";
import HomeworkDetail from "../pages/teacher/HomeworkDetail";
import AddHomework from "../pages/teacher/AddHomework";

export const TeacherRouter1 = [
  {
    path: "/ogretmen-ekrani",
    element: <TeacherPaneli />,
  },
  {
    path: "/ogretmen-ekrani/sinif-duzenle/:classUid",
    element: <ClassEdit />,
  },
  {
    path: "/ogretmen-ekrani/ogrenci-duzenle/:studentUid",
    element: <StudentEdit />,
  },
  {
    path: "/ogretmen-ekrani/sinif-duzenle/odev-ekle/:classAddedClassUid",
    element: <AddHomework />,
  },
  {
    path: "/ogretmen-ekrani/odev-detay/:itemId",
    element: <HomeworkDetail />,
  },
];




export const TeacherRouter2 = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ogretmen-ekrani",
    element: <Navigate to="/" />,
  },
];
