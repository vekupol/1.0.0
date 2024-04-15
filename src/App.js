import { Route, Routes } from "react-router-dom";
import { MainRouter } from "./router/MainRouter";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <MainLayout>
      <Routes>
        {MainRouter.map((item, index) => (
          <Route key={index} {...item} />
        ))}
      </Routes>
    </MainLayout>
  );
}

export default App;
