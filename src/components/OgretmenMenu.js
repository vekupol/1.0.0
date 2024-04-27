import React from "react";
import styled from "styled-components";
import ellipse1 from "../images/ellipse1.svg";
import teacher2 from "../images/teacher-2.svg";
import teacher3 from "../images/teacher-3.svg";
import teacher4 from "../images/teacher-4.svg";
import { Btn } from "./buttons/ButtonStudent";
import { Link } from "react-router-dom";


function OgretmenMenu() {
  return (
    <Container>
      <Menu>
        <TextContainer>
          <Title>Öğretmen</Title>
          <Subtitle>EMEĞİNİZİN DEĞERİNİ ALIN</Subtitle>
          <Description>
            Öğrencinize çok kolay bir şekilde rehberlik edecek ve onların
            ödevlerini kolaylıkla takip edebileceksiniz. Zamanınız size kalacak.
          </Description>
          <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
            <Btn
              style={{
                borderRadius: "15px",
                fontSize: "25px",
              }}
            >
              Öğretmen
            </Btn>
          </Link>
        </TextContainer>

        <ImageContainer>
          <Image src={ellipse1} alt="ellipse1" className="img-1" />
          <StudentImage1 src={teacher2} alt="teacher2" />
          <StudentImage2 src={teacher3} alt="teacher3" />
          <StudentImage3 src={teacher4} alt="teacher4" />
        </ImageContainer>
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
    flex-direction: column-reverse;
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
  transform: scaleX(-1);
`;

const StudentImage = styled.img`
  max-width: 50%;
  position: absolute;
`;

const StudentImage1 = styled(StudentImage)`
  top: 3%;
  left: 6%;
`;

const StudentImage2 = styled(StudentImage)`
  left: 18%;
  bottom: 15%;
`;

const StudentImage3 = styled(StudentImage)`
  left: 55%;
  bottom: 35%;
`;

const TextContainer = styled.div`
  text-align: left;
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

export default OgretmenMenu;
