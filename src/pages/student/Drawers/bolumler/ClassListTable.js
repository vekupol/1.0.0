import React from 'react';
import styled from 'styled-components';

const ClassListTable = () => {
  // 10. sınıf öğrencilerinin örnek listesi
  const classList = [
    { id: 1, name: 'Student 1', grade: 'A' },
    { id: 2, name: 'Student 2', grade: 'B' },
    { id: 3, name: 'Student 3', grade: 'A' },
    // Daha fazla öğrenci eklenebilir
  ];

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {classList.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.grade}</td>
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

export default ClassListTable;
