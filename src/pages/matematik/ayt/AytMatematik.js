import React, { useState } from "react";
import { Container, MainBar, SideBar, CourseTitle, CourseName, CourseContent, CourseUnits, Units, UnitName } from "../../courses/course";
import { Image } from "../class9/Class9";

function AytMatematik() {

    const [activeDiv, setActiveDiv] = useState(1);
    const handleButtonClick = (divNumber) => {
      setActiveDiv(divNumber);
    };

  return (
    <div>
      <Container>
        <SideBar><CourseTitle onClick={() => handleButtonClick(1)}>
                    <CourseName>AYT Matematik</CourseName>
                    <CourseContent> 6 Ünite </CourseContent>
                </CourseTitle>                 

                <CourseUnits>
                    <Units onClick={() => handleButtonClick(2)}> 
                        <Image>
                        </Image>                         
                        <UnitName>Ünite 1 : Mantık</UnitName>                   
                    </Units >
                    <Units onClick={() => handleButtonClick(2)}>
                        <Image>
                        </Image>                         
                        <UnitName>Ünite 2 : Kümeler</UnitName>                   
                    </Units>
                    
                </CourseUnits></SideBar>
        <MainBar></MainBar>
      </Container>
    </div>
  );
}

export default AytMatematik;
