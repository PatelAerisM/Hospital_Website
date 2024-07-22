import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UpdatePatient.css'; // Make sure to import your CSS file

function UpdatePatient() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [description, setDescription] = useState('');
    const [protocol, setProtocol] = useState('');
    const [customProtocol, setCustomProtocol] = useState('');
    const [physician, setPhysician] = useState('');
    const [location, setLocation] = useState('');
    const [bodyPartExamined, setBodyPartExamined] = useState('');
    const [customBodyPart, setCustomBodyPart] = useState('');
    const [descriptionOfScan, setDescriptionOfScan] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8081/patient/${id}`)
            .then(res => {
                const patient = res.data;
                setName(patient.NAME);
                setEmail(patient.Email);
                setAge(patient.age);
                setGender(patient.Gender);
                setDescription(patient.Description);
                if (['Sentinel Lymph Node Biopsy', 'Flap Perfusion', 'Organ Perfusion', 'Lymphedema Screening', 'Axillary Reverse Mapping', 'Test Protocol', 'Perfusion'].includes(patient.Protocol)) {
                    setProtocol(patient.Protocol);
                } else {
                    setProtocol('Other');
                    setCustomProtocol(patient.Protocol);
                }
                setPhysician(patient.Physician);
                setLocation(patient.Location);
                if (['Left Breast', 'Right Breast', 'Left Arm', 'Right Arm', 'Left Leg', 'Right Leg'].includes(patient.BodyPartExamined)) {
                    setBodyPartExamined(patient.BodyPartExamined);
                } else {
                    setBodyPartExamined('Other');
                    setCustomBodyPart(patient.BodyPartExamined);
                }
                setDescriptionOfScan(patient.DescriptionOfScan);

                const formattedDate = formatDate(patient.Date);
                setDate(formattedDate);
            })
            .catch(err => console.log(err));
    }, [id]);

    function formatDate(dateString) {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObj.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const protocolToSubmit = protocol === 'Other' ? customProtocol : protocol;
        const bodyPartToSubmit = bodyPartExamined === 'Other' ? customBodyPart : bodyPartExamined;
        axios.put(`http://localhost:8081/update/${id}`, { name, email, age, gender, description, protocol: protocolToSubmit, physician, location, bodyPartExamined: bodyPartToSubmit, descriptionOfScan, date })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div style={{ marginTop: '500px', marginBottom: '550px' }} className='d-flex vh-100 bg-white justify-content-center align-items-center'>
            <div className='form-container bg-white rounded p-3'>
                <div className="box">
                    <form onSubmit={handleSubmit}>
                        <h3>Update Patient</h3>
                        <div className='form-details'>
                            <div className='mb-2 form-control'>
                                <label htmlFor='name'>Name</label>
                                <input
                                    type='text'
                                    id='name'
                                    placeholder='Enter Name'
                                    className='form-control'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-2 form-control'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    placeholder='Enter Email'
                                    className='form-control'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-2 form-control'>
                                <label htmlFor='age'>Age</label>
                                <input
                                    type='number'
                                    id='age'
                                    placeholder='Enter Age'
                                    className='form-control'
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-2 form-control'>
                                <label htmlFor='gender'>Gender</label>
                                <select
                                    id='gender'
                                    className='form-control'
                                    value={gender}
                                    onChange={e => setGender(e.target.value)}
                                    required
                                >
                                    <option value=''>Select Gender</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                            <div className='mb-2 form-control'>
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    id='description'
                                    placeholder='Enter Description'
                                    className='form-control'
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='mb-2 form-control'>
                                <label htmlFor='protocol'>Protocol</label>
                                <select
                                    id='protocol'
                                    className='form-control'
                                    value={protocol}
                                    onChange={e => setProtocol(e.target.value)}
                                    required
                                >
                                    <option value=''>Select Protocol</option>
                                    <option value='Sentinel Lymph Node Biopsy'>Sentinel Lymph Node Biopsy</option>
                                    <option value='Flap Perfusion'>Flap Perfusion</option>
                                    <option value='Organ Perfusion'>Organ Perfusion</option>
                                    <option value='Lymphedema Screening'>Lymphedema Screening</option>
                                    <option value='Axillary Reverse Mapping'>Axillary Reverse Mapping</option>
                                    <option value='Test Protocol'>Test Protocol</option>
                                    <option value='Perfusion'>Perfusion</option>
                                    <option value='Other'>Other</option>
                                </select>
                                {protocol === 'Other' && (
                                    <input
                                        type='text'
                                        className='form-control mt-2'
                                        placeholder='Enter Custom Protocol'
                                        value={customProtocol}
                                        onChange={e => setCustomProtocol(e.target.value)}
                                        required
                                    />
                                )}
                            </div>
                            <div className='mb-2 form-control'>
                                <label htmlFor='physician'>Physician</label>
                                <input
                                    type='text'
                                    id='physician'
                                    placeholder='Enter Physician'
                                    className='form-control'
                                    value={physician}
                                    onChange={e => setPhysician(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-2 form-control'>
                                <label htmlFor='location'>Location</label>
                                <input
                                    type='text'
                                    id='location'
                                    placeholder='Enter Location'
                                    className='form-control'
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-2 form-control'>
                                <label htmlFor='bodyPartExamined'>Body Part Examined</label>
                                <select
                                    id='bodyPartExamined'
                                    className='form-control'
                                    value={bodyPartExamined}
                                    onChange={e => setBodyPartExamined(e.target.value)}
                                    required
                                >
                                    <option value=''>Select Body Part</option>
                                    <option value='Left Breast'>Left Breast</option>
                                    <option value='Right Breast'>Right Breast</option>
                                    <option value='Left Arm'>Left Arm</option>
                                    <option value='Right Arm'>Right Arm</option>
                                    <option value='Left Leg'>Left Leg</option>
                                    <option value='Right Leg'>Right Leg</option>
                                    <option value='Other'>Other</option>
                                </select>
                                {bodyPartExamined === 'Other' && (
                                    <input
                                        type='text'
                                        className='form-control mt-2'
                                        placeholder='Enter Custom Body Part'
                                        value={customBodyPart}
                                        onChange={e => setCustomBodyPart(e.target.value)}
                                        required
                                    />
                                )}
                            </div>
                            <div className='mb-2 form-control'>
                                <label htmlFor='descriptionOfScan'>Description of Scan</label>
                                <textarea
                                    id='descriptionOfScan'
                                    placeholder='Enter Description of Scan'
                                    className='form-control'
                                    value={descriptionOfScan}
                                    onChange={e => setDescriptionOfScan(e.target.value)}
                                />
                            </div>
                            <div className='mb-2 form-control'>
                                <label htmlFor='date'>Date</label>
                                <input
                                    type='date'
                                    id='date'
                                    className='form-control'
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    //required
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePatient;