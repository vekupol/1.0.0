import React, { useCallback, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import styled from "styled-components";
import {
  Container,
  LeftContainer,
  MainBox,
  RightContainer,
} from "./Login";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email) {
        return;
      }

      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Mailine şifre sıfırlama linki gönderildi");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [email]
  );
  return (
    <div>
      <Container>
        <LeftContainer>
          <MainBox style={{ color: "white" }}>
            <h1>Parola Sıfırlama</h1>
            <h3 style={{ fontSize: "1.5rem" }}>
              Parolanızı mı unuttunuz? Yan Taraftaki formda şifrenizi sıfırlamak
              için mail adresinizi yazın ve Parolamı Sıfırla butonuna tıklayın.
            </h3>
          </MainBox>
        </LeftContainer>
        <RightContainer>
          <MainBox>
            <Form>
              <InputText
                type="email"
                placeholder="Mail Adresinizi Giriniz"
                onChange={(e) => setEmail(e.currentTarget.value)}
              ></InputText>
              <InputButton
                type="submit"
                value="Parolamı Sıfırla"
                onClick={handleSubmit}
              ></InputButton>
            </Form>
          </MainBox>
        </RightContainer>
      </Container>
      <Span>&nbsp;</Span>
    </div>
  );
}

const Span = styled.div`
  font-size: 0.1rem;
  width: 100%;
  color: white;
`;


const InputText = styled.input`
  width: 100%;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 0.5rem;

  ::placeholder {
    padding: 5px;
  }
`;
const InputButton = styled.input`
  width: 100%;
  padding: 5px;
  background-color: var(--main-color);
  color: white;
  border: 2px solid var(--main-color);
  border-radius: 5px;

  :hover {
    cursor: pointer;
    background-color: white;
    color: var(--main-color);
  }
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;

export default ForgotPassword;
