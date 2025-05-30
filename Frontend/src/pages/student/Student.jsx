import React from 'react'
import { useAuth } from '../../contexts/authContext';
import OneOnOneDynamicTable from '../../components/tables/OneOnOneDynamicTable';
import StudentLayout from '../../layouts/StudentLayout';

export default function Student() {
  const { studentData } = useAuth();

  return (
    <StudentLayout>
      <OneOnOneDynamicTable
        data={[
          {
            title: "Name",
            value: studentData.fname,
          },
          {
            title: "Matric Number",
            value: studentData.regNumber,
          },
          {
            title: "Email Address",
            value: studentData.email,
          },
          {
            title: "Joining Date",
            value: studentData.createdAt,
          },
        ]}
        styles={"bg-secondary text-white"}
      />
    </StudentLayout>
  );
}
