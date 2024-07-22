import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import CreatePatient from './CreatePatient';
import Patient from './Patient';
import UpdatePatient from './UpdatePatient';
import ViewPatient from './ViewPatient';
import Login from './Login';
import axios from 'axios';

function App() {
    const [patients, setPatients] = useState([]);

    // Fetch initial patient data
    useState(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                // Reverse the order of patients to display the latest one on top
                setPatients(res.data.reverse());
            })
            .catch(err => console.log(err));
    }, []);

    function addPatient(newPatient) {
        setPatients([newPatient, ...patients]);
    }

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path='/' element={isAuthenticated ? <Patient patients={patients} setPatients={setPatients} /> : <Navigate to="/login" />} />
                    <Route path='/create' element={isAuthenticated ? <CreatePatient addPatient={addPatient} /> : <Navigate to="/login" />} />
                    <Route path='/update/:id' element={isAuthenticated ? <UpdatePatient /> : <Navigate to="/login" />} />
                    <Route path='/view/:id' element={isAuthenticated ? <ViewPatient /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
