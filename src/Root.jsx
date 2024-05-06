import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function Root() {

  return (
    <div className="container mx-auto px-4">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  )
}

export default Root;
