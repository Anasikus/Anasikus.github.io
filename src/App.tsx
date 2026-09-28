import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";
import ScrollManager from "./components/ScrollManager/ScrollManager";
import { useLenis } from "./hooks/useLenis";


const App = () => {
  useLenis();
  return (
    <>
      <ScrollManager />

      <Header />

      <Outlet />
    </>
  );
};

export default App;