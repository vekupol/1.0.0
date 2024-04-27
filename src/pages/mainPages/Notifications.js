import React from "react";
import styled from "styled-components";

function Notifications() {
  return (
    <Container>
      <NotificationContainer>
        <Text>
          <Title>Bildirimlerim</Title>
        </Text>
        <Messages>
          <h2>Mesajlarım</h2>
          <h3>Henüz mesajınız yok</h3>
        </Messages>
        <Messages>
          <h2>Ödevlerim</h2>
          <h3>Henüz ödeviniz yok</h3>
        </Messages>
      </NotificationContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--main-color);
  text-align: center;
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  justify-content: start;
  width: 100%;
  padding: 2rem;
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin-bottom: 15px;

  h2 {
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 22px;
  }
  h3 {
    text-align: left;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 16px;
    }
    h3 {
      font-size: 14px;
    }
  }
`;

export default Notifications;
