import MainSection from "./components/MainSection/MainSection";
import SideNavigationBar from "./components/sideNavBar/SideNavigationBar";
// implementing react-toastify for better
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex">
      <SideNavigationBar />
      <MainSection />
      <ToastContainer />
    </div>
  );
}

export default App;
