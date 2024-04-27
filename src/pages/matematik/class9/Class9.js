import React, { useState } from "react";
import styled from "styled-components";
import {
  Container,
  CourseTitle,
  MainBar,
  SideBar,
  CourseName,
  CourseContent,
  CourseUnits,
  Units,
  UnitName,
  UnitDescription,
} from "../../courses/course";
import Intro from "./Intro";
import UnitsClass from "./Units";

function Class9() {
  const [activeDiv, setActiveDiv] = useState(1);
  const handleButtonClick = (divNumber) => {
    setActiveDiv(divNumber);
  };

  return (
    <div>
      <Container>
        <SideBar>
          <CourseTitle onClick={() => handleButtonClick(1)}>
            <CourseName>9. Sınıf</CourseName>
            <CourseContent> 6 Ünite </CourseContent>
          </CourseTitle>

          <CourseUnits>
            <Units onClick={() => handleButtonClick(2)}>
              <Image></Image>
              <UnitName>Ünite 1 : Mantık</UnitName>
            </Units>
            <Units onClick={() => handleButtonClick(2)}>
              <Image></Image>
              <UnitName>Ünite 2 : Kümeler</UnitName>
            </Units>
          </CourseUnits>
        </SideBar>
        <MainBar>
          {activeDiv === 1 && <Intro />}
          {activeDiv === 2 && <UnitsClass />}
        </MainBar>
      </Container>
    </div>
  );
}

export const Image = styled.div`
  border: 1px solid red;
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

export default Class9;
