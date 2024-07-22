import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ViewPatient.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ViewPatient() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/patient/${id}`)
            .then(res => setPatient(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleCopy = () => {
        if (patient) {
            navigator.clipboard.writeText(patient.ID)
                .then(() => alert("ID copied to clipboard!"))
                .catch(err => console.log('Something went wrong', err));
        }
    };

    const handleGeneratePDF = () => {
        if (!patient) return;
    
        const doc = new jsPDF('p', 'pt');
        doc.setFontSize(12);
    
        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('Patient Details', 40, 40); // Title position
    
        // General and Medical Info combined
        const info = [
            { attribute: 'ID', value: patient.ID },
            { attribute: 'Name', value: patient.NAME },
            { attribute: 'Email', value: patient.Email },
            { attribute: 'Age', value: patient.age },
            { attribute: 'Gender', value: patient.Gender },
            { attribute: 'Description', value: patient.Description },
            { attribute: 'Protocol', value: patient.Protocol },
            { attribute: 'Physician', value: patient.Physician },
            { attribute: 'Location', value: patient.Location },
            { attribute: 'Body Part Examined', value: patient.BodyPartExamined },
            { attribute: 'Description of Scan', value: patient.DescriptionOfScan },
            { attribute: 'Date', value: new Date(patient.Date).toLocaleDateString('en-GB') },
        ];
    
        // Table Headers
        const headers = [['Attribute', 'Value']];
    
        // Table Data with bold font for attribute names
        const tableData = info.map(item => [
            { content: item.attribute, styles: { fontStyle: 'bold' } },
            item.value
        ]);
    
        // AutoTable options
        doc.autoTable({
            head: headers,
            body: tableData,
            startY: 70, // Start table below the title
            styles: { halign: 'left' },
        });
    
        // Save PDF with file name as "ID_PatientID.pdf"
        doc.save(`ID_${patient.ID}.pdf`);
    };    

    if (!patient) return <div>Loading...</div>;

    return (
        <div style={{ marginTop: '60px', marginBottom: '55px' }} className='container'>
            <div className='patient-details'>
                <h2 className='my-4'>Patient Details</h2>
                <div className='detail-box'>
                    <strong>ID:</strong> {patient.ID}
                    <button onClick={handleCopy} className='copy-btn'>Copy</button>
                </div>
                <div className='detail-box'>
                    <strong>Name:</strong> {patient.NAME}
                </div>
                <div className='detail-box'>
                    <strong>Email:</strong> {patient.Email}
                </div>
                <div className='detail-box'>
                    <strong>Age:</strong> {patient.age}
                </div>
                <div className='detail-box'>
                    <strong>Gender:</strong> {patient.Gender}
                </div>
                <div className='detail-box'>
                    <strong>Description:</strong> {patient.Description}
                </div>
                <div className='detail-box'>
                    <strong>Protocol:</strong> {patient.Protocol}
                </div>
                <div className='detail-box'>
                    <strong>Physician:</strong> {patient.Physician}
                </div>
                <div className='detail-box'>
                    <strong>Location:</strong> {patient.Location}
                </div>
                <div className='detail-box'>
                    <strong>Body Part Examined:</strong> {patient.BodyPartExamined}
                </div>
                <div className='detail-box'>
                    <strong>Description of Scan:</strong> {patient.DescriptionOfScan}
                </div>
                <div className='detail-box'>
                    <strong>Date:</strong> {new Date(patient.Date).toLocaleDateString('en-GB')}
                </div>
            </div>
            <div className='button-group'>
                <Link to="/" className='btn btn-primary mr-2'>Back to Patient List</Link>
                <button onClick={handleGeneratePDF} className='btn btn-primary'>Generate PDF</button>
            </div>
        </div>
    );
}

export default ViewPatient;
