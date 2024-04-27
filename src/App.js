import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MainRouter1, MainRouter2 } from "./router/MainRouter";
import { StudentRouter1, StudentRouter2 } from "./router/StudentRouter";
import MainLayout from "./layout/MainLayout";
import NotFound from "./pages/mainPages/NotFound";
import Loading from "./components/Loading";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Matematik10 } from "./router/Matematik10Router";
import { TeacherRouter1, TeacherRouter2 } from "./router/TeacherRouter";
import FooterlessLayout from "./layout/FooterlessLayout";
import SendMessageToTeacher from "./components/messageApp/SendMessageToTeacher";

const authInstance = getAuth();

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setIsLoggedIn(!!user); // !!user, user değişkeninin var olup olmadığını kontrol eder
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          {isLoggedIn ? (
            // Kullanıcı giriş yapmışsa MainRouter1 ve StudentRouter1'i kullan
            <>
              <Route element={<MainLayout />}>
                {MainRouter1.map((item, index) => (
                  <Route key={index} {...item} />
                ))}
                {StudentRouter1.map((item, index) => (
                  <Route key={index} {...item} />
                ))}
                {TeacherRouter1.map((item, index) => (
                  <Route key={index} {...item} />
                ))}
              </Route>
            </>
          ) : (
            // Kullanıcı giriş yapmamışsa MainRouter2 ve StudentRouter2'yi kullan
            <>
              <Route element={<MainLayout />}>
                {MainRouter2.map((item, index) => (
                  <Route key={index} {...item} />
                ))}
                {StudentRouter2.map((item, index) => (
                  <Route key={index} {...item} />
                ))}
                {TeacherRouter2.map((item, index) => (
                  <Route key={index} {...item} />
                ))}
              </Route>
            </>
          )}
          <Route element={<MainLayout />}>
            {Matematik10.map((item, index) => (
              <Route key={index} {...item} />
            ))}
          </Route>
          <Route element={<FooterlessLayout />}>
            <Route
              path="/mesaj-gonder/:teacherUid"
              element={<SendMessageToTeacher />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
