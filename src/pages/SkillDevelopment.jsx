import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SkillDevelopment = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: "React Basics", level: "Beginner", progress: 20 },
    { id: 2, name: "JavaScript Mastery", level: "Intermediate", progress: 50 },
    { id: 3, name: "Bootstrap Essentials", level: "Beginner", progress: 75 },
  ]);

  const courses = [
    { id: 1, name: "Full-Stack Web Development", link: "#" },
    { id: 2, name: "JavaScript Advanced Concepts", link: "#" },
    { id: 3, name: "React & Redux Masterclass", link: "#" },
  ];

  const mentors = [
    { id: 1, name: "John Doe", expertise: "Frontend Development", contact: "john@example.com" },
    { id: 2, name: "Jane Smith", expertise: "Full-Stack Development", contact: "jane@example.com" },
  ];

  const tips = [
    "Stay consistent with daily coding practice.",
    "Join online communities and open-source projects.",
    "Build real-world projects to enhance your portfolio.",
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary fw-bold">📚 Skill Development</h2>
      <p className="text-center lead mb-5">Explore courses, mentorship, and career growth resources to elevate your skills.</p>

      {/* Skill Progress */}
      <div className="row g-4">
        {skills.map((skill) => (
          <div key={skill.id} className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body">
                <h5 className="card-title fw-bold">{skill.name}</h5>
                <p className="card-text text-muted">Level: {skill.level}</p>
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className={`progress-bar ${
                      skill.progress >= 75 ? "bg-success" : "bg-primary"
                    } progress-bar-striped progress-bar-animated`}
                    role="progressbar"
                    style={{ width: `${skill.progress}%` }}
                    aria-valuenow={skill.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {skill.progress}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Courses/Certifications */}
      <div className="mt-5">
        <h3 className="text-secondary fw-bold">🎓 Courses & Certifications</h3>
        <table className="table table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Enroll</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>
                  <a href={course.link} className="btn btn-sm btn-primary">
                    Enroll Now 🚀
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mentorship */}
      <div className="mt-5">
        <h3 className="text-secondary fw-bold">👩‍🏫 Mentorship</h3>
        <div className="row g-3 mt-3">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="col-md-6">
              <div className="card shadow-sm border-0 p-3 rounded-4">
                <h5 className="fw-bold">{mentor.name}</h5>
                <p className="text-muted">Expertise: {mentor.expertise}</p>
                <a href={`mailto:${mentor.contact}`} className="btn btn-outline-primary">
                  Contact Mentor ✉️
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Growth Tips */}
      <div className="mt-5">
        <h3 className="text-secondary fw-bold">🚀 Career Growth Tips</h3>
        <ul className="list-group mt-3">
          {tips.map((tip, index) => (
            <li key={index} className="list-group-item border-0 shadow-sm rounded-3">
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Dashboard Button */}
      <div className="text-center mt-5">
        <button className="btn btn-outline-dark" onClick={() => (window.location.href = "/dashboard")}>
          🔙 Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SkillDevelopment;
