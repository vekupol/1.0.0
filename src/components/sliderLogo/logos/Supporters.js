import React from "react";
import {
  Container,
  LeftContainer,
  MainBox,
  RightContainer,
} from "../../../pages/mainPages/Login";
import Slider from "./Slider";

function Supporters() {
  return (
    <div>
      <Container>
        <LeftContainer>
          <MainBox style={{ color: "#fff" }}>
            <h1>Destekcilerimiz</h1>
            <h3 style={{ fontSize: "1.5rem" }}>Çıktığımız bu yolda bizim hep yanımızda olan ,maddi ve manevi desteklerde bulunan tüm kurumlarımıza teşekkür ederiz.</h3>
          </MainBox>
        </LeftContainer>
        <RightContainer>
            <Slider direction={"column"} />
        </RightContainer>
      </Container>
    </div>
  );
}

export default Supporters;
