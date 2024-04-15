import React from "react";
import styled from "styled-components";
import TYT from "./tyt.json";
import { Link } from "react-router-dom";

function DropdownMenu() {
  return (
    <Dropdown>
      <Box style={{ gridArea: "1 / 1 / 3 / 2" }}>
        <ColumnTitle>TYT Matematik</ColumnTitle>
        {TYT.map((item) => (
          <Li key={item.id}>
            <A href={item.url} target="_self" rel="noopener noreferrer">
              {item.title}
            </A>
          </Li>
        ))}
      </Box>
      <Box style={{ gridArea: "1 / 2 / 3 / 3" }}>
        <ColumnTitle>AYT Matematik</ColumnTitle>
      </Box>
      <Box style={{ gridArea: "1 / 3 / 2 / 4" }}>
        <ColumnTitle>12. Sınıf</ColumnTitle>
      </Box>
      <Box style={{ gridArea: "1 / 4 / 2 / 5" }}>
        <ColumnTitle>11. Sınıf</ColumnTitle>
      </Box>
      <Box style={{ gridArea: "2 / 3 / 3 / 4" }}>
        <ColumnTitle>10. Sınıf</ColumnTitle>
      </Box>
      <Box style={{ gridArea: "2 / 4 / 3 / 5" }}>
        <Link to="/kurslar/9-sinif">
          <ColumnTitle>9. Sınıf</ColumnTitle>
        </Link>
      </Box>
    </Dropdown>
  );
}

const Dropdown = styled.div`
  background-color: #efecf3;
  height: 100vh;
  transition: max-height 0.2s ease-in;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`;

const Box = styled.div`
  background-color: #d7d4da;
`;

const ColumnTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  position: sticky;
  top: 0;
  background-color: #d7d4da;
  width: 200px;
  padding: 5px 0px 0px 20px;
  color: var(--main-color);

  @media (max-width: 730px) {
    font-size: 16px;
  }
`;

const Li = styled.li`
 list-style-type: circle;
 padding-left: 20px;
  :hover {
    font-weight: bold;
  }
`;

const A = styled.a`
  color: var(--main-color);
  text-decoration: none;

  @media (max-width: 730px) {
    font-size: 12px;
  }
`;

export default DropdownMenu;
