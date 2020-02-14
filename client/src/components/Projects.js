import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Actions from './Actions';

const Projects = () => {
  const [api] = useState("http://localhost:5001/api/projects");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(api)
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <h2>Projects</h2>
      {
        projects.map((item, i) => {
          return (
            <div key={i}>
              <p>{item.name}</p>
              <Actions id={item.id} />
            </div>
          )
        })
      }
    </div>
  );
};

export default Projects;