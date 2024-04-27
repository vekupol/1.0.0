import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import SliderOn from "../../SliderOn";
import Lesson1 from "./dersler/Lesson1";
import { Container, Main, Sidebar } from "../../../style/DerslerStyle";
import { CustomLink } from "../../../../../components/buttons/Button.styled";
import jsonData from "../../MatematikLiseOn.json";
import { Icons } from "../../../style/DerslerIntroStyle";

function SiralamaVeSecme({startTopicProps}) {
  const [unit, setUnit] = useState([]);

  const baslangicProps = startTopicProps;
  

  useEffect(() => {
    setUnit(jsonData.units[0]);
  }, []);

  return (
    <Container>
      <Sidebar>
        <SliderOn unitNumber={0} konuNumber={0} baslangicNumber={baslangicProps}/>
      </Sidebar>
      <Main>
        <Icons>
          <CustomLink to="/">
            <IoHomeSharp />
          </CustomLink>
          <BsArrowRightShort />
          <CustomLink to="/matematik/10-sinif">
            <div> 10. Sınıf Matematik </div>
          </CustomLink>
          <BsArrowRightShort />
          <CustomLink to="/matematik/10-sinif/sayma-ve-olasilik">
            <div> {unit?.name} </div>
          </CustomLink>
        </Icons>
        <Lesson1 />
      </Main>
    </Container>
  );
}

export default SiralamaVeSecme;
