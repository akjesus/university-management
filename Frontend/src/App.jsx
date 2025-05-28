import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Faculty from './components/Faculty';
import Courses from './pages/Courses';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/faculty" element={<Faculty />} />
                <Route path="/courses" element={<Courses />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
