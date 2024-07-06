
import './App.css';
import Index from './components/home/Index';
import {Routes,Route} from 'react-router-dom'
import Adduser from './components/adduser/Adduser'
import Edituser from './components/edituser/Edituser'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/add" element={<Adduser />} />
      <Route path="/edit/:id" element={<Edituser />} />
    </Routes>
   
    </>
  );
}

export default App;
