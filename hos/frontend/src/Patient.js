import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Patient.css'; // Import the CSS file

function Patient({ patients, setPatients }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                setPatients(res.data.reverse()); // Reverse the array when setting patients
            })
            .catch(err => console.log(err));
    }, [setPatients]);

    useEffect(() => {
        const filtered = patients.filter(patient => {
            if (patient && patient.NAME) {
                return patient.NAME.toLowerCase().includes(searchQuery.toLowerCase());
            } else {
                console.error("Patient without NAME property or undefined patient:", patient);
                return false;
            }
        });
        setFilteredPatients(filtered);
    }, [patients, searchQuery]);

    function deletePatient(id) {
        axios.delete(`http://localhost:8081/patient/${id}`)
            .then(res => {
                console.log(res);
                setPatients(patients.filter(patient => patient.ID !== id));
            })
            .catch(err => console.log(err));
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className='container'>
            <h2 className='my-4'>Patient List</h2>
            <div className="mb-3">
                <Link to='/create' className='btn btn-primary mb-3'>Add Patient</Link>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Description</th>
                        <th>Protocol</th>
                        <th>Physician</th>
                        <th>Location</th>
                        <th>Body Part Examined</th>
                        <th>Description Of Scan</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(searchQuery ? filteredPatients : patients).map(patient => {
                        // Add logging to check each patient object
                        console.log("Rendering patient:", patient);

                        return (
                            <tr key={patient.ID}>
                                <td>{patient.ID}</td>
                                <td>{patient.NAME}</td>
                                <td>{patient.Email}</td>
                                <td>{patient.age}</td>
                                <td>{patient.Gender}</td>
                                <td>{patient.Description}</td>
                                <td>{patient.Protocol}</td>
                                <td>{patient.Physician}</td>
                                <td>{patient.Location}</td>
                                <td>{patient.BodyPartExamined}</td>
                                <td>{patient.DescriptionOfScan}</td>
                                <td>{new Date(patient.Date).toLocaleDateString('en-GB')}</td>
                                <td>
                                    <div className="d-flex flex-column">
                                        <Link to={`/update/${patient.ID}`} className='btn btn-sm btn-outline-primary mb-2'>Edit</Link>
                                        <button className='btn btn-sm btn-outline-danger mb-2' onClick={() => deletePatient(patient.ID)}>Delete</button>
                                        <Link to={`/view/${patient.ID}`} className='btn btn-sm btn-outline-primary mb-2'>View</Link>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Patient;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function Patient({ patients, setPatients }) {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredPatients, setFilteredPatients] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:8081')
//             .then(res => {
//                 setPatients(res.data.reverse()); // Reverse the array when setting patients
//             })
//             .catch(err => console.log(err));
//     }, [setPatients]);

//     useEffect(() => {
//         const filtered = patients.filter(patient => {
//             if (patient && patient.NAME) {
//                 return patient.NAME.toLowerCase().includes(searchQuery.toLowerCase());
//             } else {
//                 console.error("Patient without NAME property or undefined patient:", patient);
//                 return false;
//             }
//         });
//         setFilteredPatients(filtered);
//     }, [patients, searchQuery]);

//     function deletePatient(id) {
//         axios.delete(`http://localhost:8081/patient/${id}`)
//             .then(res => {
//                 console.log(res);
//                 setPatients(patients.filter(patient => patient.ID !== id));
//             })
//             .catch(err => console.log(err));
//     }

//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     return (
//         <div style={{ marginTop: '60px', marginBottom: '100px' }} className='container'>
//             <h2 className='my-4'>Patient List</h2>
//             <div className="mb-3">
//                 <Link to='/create' className='btn btn-primary mb-3'>Add Patient</Link>
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search by Name"
//                     value={searchQuery}
//                     onChange={handleSearch}
//                 />
//             </div>
//             <table className='table table-striped'>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Description</th>
//                         <th>Protocol</th>
//                         <th>Physician</th>
//                         <th>Location</th>
//                         <th>Body Part Examined</th>
//                         <th>Description Of Scan</th>
//                         <th>Date</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {(searchQuery ? filteredPatients : patients).map(patient => {
//                         // Add logging to check each patient object
//                         console.log("Rendering patient:", patient);

//                         return (
//                             <tr key={patient.ID}>
//                                 <td>{patient.ID}</td>
//                                 <td>{patient.NAME}</td>
//                                 <td>{patient.Email}</td>
//                                 <td>{patient.age}</td>
//                                 <td>{patient.Gender}</td>
//                                 <td>{patient.Description}</td>
//                                 <td>{patient.Protocol}</td>
//                                 <td>{patient.Physician}</td>
//                                 <td>{patient.Location}</td>
//                                 <td>{patient.BodyPartExamined}</td>
//                                 <td>{patient.DescriptionOfScan}</td>
//                                 <td>{new Date(patient.Date).toLocaleDateString('en-GB')}</td>
//                                 <td>
//                                     <div className="d-flex flex-column">
//                                         <Link to={`/update/${patient.ID}`} className='btn btn-sm btn-outline-primary mb-2'>Edit</Link>
//                                         <button className='btn btn-sm btn-outline-danger mb-2' onClick={() => deletePatient(patient.ID)}>Delete</button>
//                                         <Link to={`/view/${patient.ID}`} className='btn btn-sm btn-outline-primary mb-2'>View</Link>
//                                     </div>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Patient;
