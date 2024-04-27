import React from "react";
import styled from "styled-components";
import { Container, LeftContainer, MainBox, RightContainer } from "./Login";

function Donate() {
  return (
    <div>
      <Container>
        <LeftContainer>
          <MainBox style={{ color: "white" }}>
            <h1>Venüs Eğitime Destek Ol</h1>
            <h3 style={{ fontSize: "1.5rem" }}>
              Venüs Eğitim Vakfı kurmak için çalışmalarımız devam etmektedir. Bu
              süreçte eğitimlerimizin artarak devam edebilmesi için
              desteklerinize ihtiyacımız var.
            </h3>
          </MainBox>
        </LeftContainer>
        <RightContainer>
          <MainBox>
            <h1>Bize Nasıl Yardım Edebilirsin?</h1>
            <li>
              Sınırsız soru ve döküman ihtiyacımızdan dolayı bizlere soru ve
              döküman yazıp gönderebilirsiniz.Sorularınızı isminizle birlikte
              dilerseniz yayınlayabiliriz.
            </li>
            <li style={{ marginBottom: "1rem" }}>
              Video çekimi yapabilme imkanı olan öğretmenlerimiz platformumuzda
              bize yardımcı olabilir.
            </li>
            <li style={{ listStyleType: "none", fontWeight: "bold" }}>
              İletişim için; <br /> Mail adresimiz iletisim@venusegitim.com{" "}
              <br /> WhatsApp hattımız 0530 682 68 49{" "}
            </li>
          </MainBox>
        </RightContainer>
      </Container>
      <Span>&nbsp;</Span>
    </div>
  );
}

export const Span = styled.div`
  font-size: 0.1rem;
  width: 100%;
  color: white;
`;

export default Donate;
