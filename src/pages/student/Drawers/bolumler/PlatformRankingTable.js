import React from 'react';
import styled from 'styled-components';

const PlatformRankingTable = () => {
  // Sıralama platformundaki verilerin örnek halini oluşturuyoruz
  const rankingData = [
    { id: 1, name: 'User 1', score: 95 },
    { id: 2, name: 'User 2', score: 88 },
    { id: 3, name: 'User 3', score: 75 },
    // Daha fazla kullanıcı ve puan bilgisi eklenebilir
  ];

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {rankingData.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
border-top: 3px solid var(--main-color);
width: 100%;
height: 100%;`

export default PlatformRankingTable;
