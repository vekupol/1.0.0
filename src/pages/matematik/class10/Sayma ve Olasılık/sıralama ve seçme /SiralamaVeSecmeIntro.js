import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Icons,
  Title,
  UnitContainer,
  Parts,
  Unit,
  Part,
} from "../../../../courses/drawers/intro";
import { IoHomeSharp } from "react-icons/io5";
import {
  CustomLink,
  Button,
} from "../../../../../components/buttons/Button.styled";
import { BsArrowRightShort } from "react-icons/bs";
import ProgressBarTableLessons from "../../../../../components/progressBar/ProgressBarTableLessons";
import { VideoIcon, ArticleIcon, ExamIcon } from "../../../../courses/course";
import jsonData from "../../MatematikLiseOn.json";

function SiralamaVeSecmeIntro() {
  const [unit, setUnit] = useState([]);

  useEffect(() => {
    setUnit(jsonData.units[0]); 
  }, []);
  return (
    <div>
      <Icons>
        <CustomLink to="/">
          <IoHomeSharp style={{ color: "var(--main-color)" }} />
        </CustomLink>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <CustomLink to="/matematik/10-sinif">
          <div> 10. Sınıf Matematik </div>
        </CustomLink>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <CustomLink to="/matematik/10-sinif/sayma-ve-olasilik">
          <div> {unit?.name} </div>
        </CustomLink>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        {unit.konular && unit.konular.length > 0 && (
          <div>{unit.konular[0].name}</div>
        )}
      </Icons>
      <Title>
        {unit.konular && unit.konular.length > 0 && (
          <h1>{unit.konular[0].name}</h1>
        )}
      </Title>
      {unit.konular && unit.konular.length > 0 && (
        <ProgressBarTableLessons progressArray={unit.konular[0]?.dersler} />
      )}

      <Title>
        <h2>Konular</h2>
        <CustomLink
          to={`/matematik/10-sinif/${unit?.link}/${unit.konular && unit.konular[0].link}`}
        >
          <Button> Konuya Git</Button>
        </CustomLink>
      </Title>
      <UnitContainer>
        <LessonsShadow>
          <Unit>{unit.konular && unit.konular[0].name}</Unit>
          <Parts>
            {unit.konular &&
              unit.konular[0].dersler &&
              unit.konular &&
              unit.konular[0].dersler.map((ders) => (
                <Part
                  style={{
                    cursor: "default",
                    textDecoration: "none",
                    fontSize: "20px",
                  }}
                  key={ders.kazanimId}
                >
                  {ders.type === "v" && <VideoIcon />}
                  {ders.type === "a" && <ArticleIcon />}
                  {ders.type === "e" && <ExamIcon />}
                  {ders.name}
                </Part>
              ))}
          </Parts>
        </LessonsShadow>
      </UnitContainer>
    </div>
  );
}

export const LessonsShadow = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 9px;
  box-shadow: 5px 5px 14px #666666, -5px -5px 14px #ffffff;
`;
export default SiralamaVeSecmeIntro;
