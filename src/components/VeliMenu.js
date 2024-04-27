import React from "react";
import styled from "styled-components";
import ellipse1 from "../images/ellipse1.svg";
import parent2 from "../images/parent2.svg";
import parent3 from "../images/parent3.svg";
import parent4 from "../images/parent4.svg";
import { Btn } from "./buttons/ButtonStudent";
import { Link } from "react-router-dom";

function VeliMenu() {
  return (
    <Container>
      <Menu>
        <ImageContainer>
          <Image src={ellipse1} alt="ellipse1" className="img-1" />
          <StudentImage1 src={parent2} alt="parent2" />
          <StudentImage2 src={parent3} alt="parent3" />
          <StudentImage3 src={parent4} alt="parent4" />
        </ImageContainer>
        <TextContainer>
          <Title>Veli</Title>
          <Subtitle>UZAKTAN KONTROL SİZDE</Subtitle>
          <Description>
            Çocuğunuzun velisi olmaktan daha çok annesi/babası olmanız için
            gereken raporlar elinizin altında.
          </Description>
          <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
            <Btn
              style={{
                borderRadius: "15px",
                fontSize: "25px",
              }}
            >
              Veli
            </Btn>{" "}
          </Link>
        </TextContainer>
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  width: 100vw;
`;

const Menu = styled.div`
  display: flex;
  width: 1200px;
  height: auto;
  background-color: #fff;
  margin: 6rem 4rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    margin: 3rem 2rem;
    flex-direction: column;
    height: auto;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Image = styled.img`
  max-width: 100%;
`;

const StudentImage = styled.img`
  max-width: 50%;
  position: absolute;
`;

const StudentImage1 = styled(StudentImage)`
  top: 1%;
  left: 8%;
`;

const StudentImage2 = styled(StudentImage)`
  left: 8%;
  bottom: 60px;
`;

const StudentImage3 = styled(StudentImage)`
  left: 50%;
  bottom: 25%;
`;

const TextContainer = styled.div`
  text-align: right;
  font-family: Roboto;
  font-style: normal;
  line-height: normal;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.p`
  color: #989898;
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;
const Subtitle = styled.p`
  color: #000;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;
const Description = styled.p`
  color: #000;
  font-family: "Roboto Condensed";
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export default VeliMenu;
