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
} from "../../../courses/course";
import Intro from "./Intro";

function Mantik() {
  const [activeDiv, setActiveDiv] = useState(1);
  const handleButtonClick = (divNumber) => {
    setActiveDiv(divNumber);
  };

  return (
    <div>
      <Container>
        <SideBar>
          <CourseTitle onClick={() => handleButtonClick(1)}>
            <CourseName>Mantık</CourseName>
            <CourseContent> 5 Konu - 14 Bölüm </CourseContent>
          </CourseTitle>

          <CourseUnits>
            <Units onClick={() => handleButtonClick(2)}>
              <div>
                <UnitName>Konu 1</UnitName>
                <UnitDescription>
                  Bu ünitede birden fazla sayının EBOB'unu EKOK'unu bulmayı,{" "}
                </UnitDescription>
              </div>
            </Units>
            <Units onClick={() => handleButtonClick(2)}>
              <div>
                <UnitName>Konu 2</UnitName>
                <UnitDescription>
                  Bu ünitede birden fazla sayının EBOB'unu EKOK'unu bulmayı,{" "}
                </UnitDescription>
              </div>
            </Units>
          </CourseUnits>
        </SideBar>
        <MainBar>
          <Intro />
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

export default Mantik;
