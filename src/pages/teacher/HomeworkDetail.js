import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Text, Title } from "../student/Drawers/studentDrawerKonularim";
import { NotificationContainer, Messages } from "../mainPages/Notifications";
import { Container } from "../student/studentAyarlar";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }

  th {
    background-color: #f2f2f2;
  }
`;

function HomeworkDetail() {
  const { itemId } = useParams();
  const [homework, setHomework] = useState(null);
  const [studentsInfo, setStudentsInfo] = useState([]);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        // Ödev bilgisini al
        const docRef = doc(db, "homeworks", itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHomework(docSnap.data());
          // Ödev tamamlayan öğrencilerin bilgilerini al
          const doneStudents = docSnap.data().doneStudents;
          const studentsInfoPromises = doneStudents.map(async (uid) => {
            const userDocRef = doc(db, "users", uid);
            const userDocSnap = await getDoc(userDocRef);
            return userDocSnap.data();
          });
          const studentsInfo = await Promise.all(studentsInfoPromises);
          setStudentsInfo(studentsInfo);
        } else {
          console.log("Ödev bulunamadı!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchHomework();
  }, [itemId]);

  return (
    <Container>
      {homework ? (
        <NotificationContainer>
          <Text>
            <Title>Ödev Detayları</Title>
          </Text>
          <Messages>
            <StyledTable>
              <tbody>
                <tr>
                  <th>Ödev Türü</th>
                  <th>Başlangıç Tarihi</th>
                  <th>Bitiş Tarihi</th>
                  <th>Ödev Teslim Durumu</th>
                  <th> Notunuz</th>
                </tr>
                <tr>
                  <td>{homework.homeworkType}</td>
                  <td>{homework.startDate}</td>
                  <td>{homework.endDate}</td>
                  <td>
                    {homework.doneStudent} / {homework.totalStudent}
                  </td>
                  <td>{homework.note}</td>
                </tr>
              </tbody>
            </StyledTable>
          </Messages>
          <Messages>
            <h3>Ödevi Tamamlayan Öğrenciler</h3>
            <StyledTable>
              <thead>
                <tr>
                  <th>Öğrenci Adı</th>
                  <th>Ödev Tamamlama Durumu</th>
                </tr>
              </thead>
              <tbody>
                {studentsInfo.map((student, index) => (
                  <tr key={index}>
                    <td>{student.userData.displayName}</td>
                    <td>
                      {student.homeworks.filter((h) => h.refId === itemId)[0]
                        .doneStudent === 1
                        ? "Tamamladı"
                        : "Tamamlamadı"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </Messages>
        </NotificationContainer>
      ) : (
        <p>Ödev yükleniyor...</p>
      )}
    </Container>
  );
}

export default HomeworkDetail;
