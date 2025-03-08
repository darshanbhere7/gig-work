import React, { useState } from "react";

const SkillDevelopment = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: "React Basics", level: "Beginner", progress: 20 },
    { id: 2, name: "JavaScript Mastery", level: "Intermediate", progress: 50 },
    { id: 3, name: "Bootstrap Essentials", level: "Beginner", progress: 75 },
  ]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">Skill Development</h2>
      <p className="text-center lead">Explore courses, tutorials, and resources to enhance your skills.</p>
      <div className="row">
        {skills.map((skill) => (
          <div key={skill.id} className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body">
                <h5 className="card-title fw-bold">{skill.name}</h5>
                <p className="card-text">Level: {skill.level}</p>
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
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
    </div>
  );
};

export default SkillDevelopment;
