import SendMessageToTeacher from "../components/messageApp/SendMessageToTeacher";
import Home from "../pages/mainPages/Home";
import StudentClass from "../pages/student/Drawers/StudentClass";
import EditLessons from "../pages/student/Drawers/bolumler/EditLessons";
import StudentPanel from "../pages/student/studentPanel";
import { Navigate } from "react-router-dom";

export const StudentRouter1 = [
  {
    path: "/ogrenci-ekrani",
    element: <StudentPanel />,
  },
  {
    path: "/ogrenci-ekrani/sinifim/:classUid",
    element: <StudentClass />,
  },
  {
    path: "/ogrenci-ekrani/derslerimi-duzenle",
    element: <EditLessons />,
  }
];

export const StudentRouter2 = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ogrenci-ekrani",
    element: <Navigate to="/" />,
  },
];
