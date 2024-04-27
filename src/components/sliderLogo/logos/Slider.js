import React from "react";
import styled from "styled-components";
import aa1 from "./coca-cola-2021.svg";
import aa2 from "./logo-lg.svg";
import aa5 from "./opet-logo.svg";
import aa6 from "./turkcell-logo-2.svg";

const Container = styled.div`
  background: #f2f2f2;
  margin: 5rem 0;
`;

const LogosSlide = styled.div`
  display: inline-block;

  margin-bottom: 30px;
`;

const LogoImage = styled.img`
  height: 40px;
  margin: 0 15px;
`;

const Baslik = styled.div`
  background: #fff;
  text-align: center;
  font-size: 32px;
  font-family: Georgia, "Times New Roman", Times, serif;
`;

const Slider = ({ direction }) => {
  const LogosContainer = styled.div`
    overflow: hidden;
    padding: 60px 0;
    background: white;
    white-space: nowrap;
    display: flex;
    flex-direction: ${(props) => props.direction};
    align-items: center;
    justify-content: center;

    @media (max-width: 950px) {
      flex-direction: column;
    }
  `;

  return (
    <Container>
      <Baslik>Ana Destekçilerimiz </Baslik>
      <LogosContainer direction={direction}>
        <LogosSlide>
          <LogoImage src={aa1} alt="Logo" />
          <LogoImage src={aa2} alt="Logo" />
        </LogosSlide>
        <LogosSlide>
          <LogoImage src={aa5} alt="Logo" />
          <LogoImage src={aa6} alt="Logo" />
        </LogosSlide>
      </LogosContainer>
    </Container>
  );
};

export default Slider;
