import React, { useState, useEffect } from 'react';
import StudentForm from '../components/Sidebar';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentStudent, setCurrentStudent] = useState({});

    useEffect(() => {
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            setStudents(JSON.parse(storedStudents));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students));
    }, [students]);

    const handleAddStudent = (student) => {
        setStudents([...students, student]);
    };

    const handleEditStudent = (student) => {
        setEditing(true);
        setCurrentStudent(student);
    };

    const handleUpdateStudent = (updatedStudent) => {
        setStudents(students.map((student) => student.id === updatedStudent.id ? updatedStudent : student));
        setEditing(false);
    };

    const handleDeleteStudent = (id) => {
        setStudents(students.filter((student) => student.id !== id));
    };

    return (
        <div>
            <h1>Student Management</h1>
            <StudentForm
                editing={editing}
                currentStudent={currentStudent}
                handleAddStudent={handleAddStudent}
                handleUpdateStudent={handleUpdateStudent}
            />
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.name} - {student.email}
                        <button onClick={() => handleEditStudent(student)}>Edit</button>
                        <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Students;


