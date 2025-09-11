import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./Pages/Login"
import Student from "./Pages/Student"

function App() {
 

  return (
    <Router>
      <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/student" element={<Student />} />
   
      </Routes>
    </Router>
  )
}

export default App
