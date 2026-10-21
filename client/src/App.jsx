import { BrowserRouter,Routes,Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import MyTrip from "./pages/MyTrip"
import CreateTrip from "./pages/CreateTrips"
import EditForm from "./pages/EditForm";
// import createTrip from "./pages/CreateTrip"
function App(){
return(
<BrowserRouter>
<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
  <Route path="/MyTrip" element={<MyTrip />} />
  <Route path="/edit-trip/:id" element={<EditForm />} />
   <Route path="/CreateTrip" element={<CreateTrip />} /> 
</Routes>
</BrowserRouter>
)
}
export default App;