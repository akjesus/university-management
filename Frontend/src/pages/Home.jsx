import React from "react";
import HomeCard from "../components/cards/HomeCard";
import studentImage from "../assets/student.jpg";
import instructorImage from "../assets/instructor.jpg";
import adminImage from "../assets/admin.jpg";
import HomeLayout from "../layouts/HomeLayout";

export default function Home() {
  return (
    <HomeLayout>
      <HomeCard
        image={instructorImage}
        alt={"instructor"}
        text={"INSTRUCTOR"}
        path={"/instructor/login"}
      />
      <HomeCard
        image={studentImage}
        alt={"student"}
        text={"STUDENT"}
        path={"/student/login"}
      />
      <HomeCard
        image={adminImage}
        alt={"admin"}
        text={"ADMIN"}
        path={"/admin/login"}
      />
    </HomeLayout>
  );
}
