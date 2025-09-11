import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./Pages/Login"
import Student from "./Pages/Student"
import Faculty from "./Pages/Faculty";
import Driver from "./Pages/Driver";
import Admin from "./Pages/Admin";

function App() {
 

  return (
    <Router>
      <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/student" element={<Student />} />
    <Route path="/faculty" element={<Faculty/>}/>
    <Route path="/driver" element={<Driver/>}/>
    <Route path="/admin" element={<Admin/>}/>

   
      </Routes>
    </Router>
  )
}

export default App
