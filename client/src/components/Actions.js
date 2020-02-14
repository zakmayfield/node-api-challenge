import React, { useState } from 'react';
import axios from 'axios';

const Actions = ({ id }) => {
  const [api] = useState(`http://localhost:5001/api/actions/`);
  const [actions, setActions] = useState([]);

  const fetchSteps = () => {
    axios.get(api)
      .then(res => {
        setActions(res.data);
      })
      .catch(err => console.log(err));
  }

  const hideSteps = () => {
    setActions([]);
  }

  return (
    <div>
      {
        actions.length === 0
          ? <button onClick={fetchSteps}>Show Steps</button>
          : <button onClick={hideSteps}>Hide Steps</button>
      }
      {
        actions.map((item, i) => {
          return (
            <div key={i}>
              <p>{item.description}</p>
            </div>
          )
        })
      }
    </div>
  );
};

export default Actions;