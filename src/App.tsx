import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";
import { useLenis } from "./hooks/useLenis";


const App = () => {
  useLenis();
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default App;