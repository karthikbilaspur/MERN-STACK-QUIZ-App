// components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import { getLeaders } from '../api/api';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getLeaders().then((data) => setLeaders(data));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{leader.name}</td>
              <td>{leader.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;