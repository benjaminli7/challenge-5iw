import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

function Root() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
