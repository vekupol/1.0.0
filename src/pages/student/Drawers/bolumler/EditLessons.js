import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FooterContainer } from '../../../../components/footer/containers/footer';
import { ButtonSil } from '../../../teacher/ClassEdit';
import konularJson from '../../../../components/dropdown/all.json';
import { db, auth } from '../../../../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import ProgressBar from '../../../../components/progressBar/ProgressBar'

function EditLessons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessons, setLessons] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchLessons = async () => {
      const currentUser = auth.currentUser;
      const currentUserUid = currentUser ? currentUser.uid : null;

      if (currentUserUid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUserUid));
          if (userDoc.exists()) {
            const lessons = userDoc.data().lessons || [];
            setLessons(lessons);
          } else {
            console.error('Kullanıcı belgesi bulunamadı.');
          }
        } catch (error) {
          console.error('Öğrenci bilgilerini alma hatası:', error);
        }
      }
    };
    fetchLessons();
  }, []);

  const handleKonuEkle = async (item) => {
    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      try {
        const userDocRef = doc(db, 'users', currentUserUid);
        await updateDoc(userDocRef, {
          lessons: arrayUnion({
            id: item.id,
            name: item.title,
            aciklama: item.aciklama,
            url: item.url
          })
        });
        const updatedDoc = await getDoc(userDocRef);
        if (updatedDoc.exists()) {
          const updatedLessons = updatedDoc.data().lessons || [];
          setLessons(updatedLessons);
        }
      } catch (error) {
        console.error('Hata:', error);
      }
    }
  };

  const handleKonuSil = async (item) => {
    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      try {
        const userDocRef = doc(db, 'users', currentUserUid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const updatedLessons = userDoc.data().lessons.filter(lesson => lesson.id !== item.id);
          await updateDoc(userDocRef, { lessons: updatedLessons });
          setLessons(updatedLessons);
        }
      } catch (error) {
        console.error('Hata:', error);
      }
    }
  };

  return (
    <Container>
      <Container2>
        <h1>Konularım</h1>
        <ButtonDiv>
          <ButtonSil style={{ backgroundColor: "var(--main-color)" }} onClick={openModal}>Konu Ekle</ButtonSil>
        </ButtonDiv>
        <Konular>
          {lessons.map((item) => (
            <KonuDiv key={item.id}>
              <Metin>
                <KonuAdi>{item.name}</KonuAdi>
                <KonuAciklama>{item.aciklama}</KonuAciklama>
              </Metin>
              <ProgressDiv>
                <ProgressBar totalPeople={100} donePeople={50} />
              </ProgressDiv>
              <Buttons>
                <Link to={`/${item.url}`}><ButtonSil style={{ backgroundColor: "var(--main-color)", marginTop: "10px" }}>Konuya Git </ButtonSil></Link>
                <ButtonSil style={{ marginTop: "10px" }} onClick={() => handleKonuSil(item)}>Konu Sil</ButtonSil>
              </Buttons>
            </KonuDiv>
          ))}
        </Konular>
      </Container2>
      <FooterContainer />
      {isModalOpen && <KonuEkleModal onClose={closeModal} handleKonuEkle={handleKonuEkle} />}
    </Container>
  )
}

const Container = styled.div``;

const Container2 = styled.div`
  min-height: 70vh;
  border: 1px solid var(--main-color);
  padding: 2rem;
  h1 {
    padding-left: 20px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  width: 220px;
`;

const Konular = styled.div`
  padding: 20px;
`;

const KonuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: .7rem;
  display: flex;
  align-items: center;
  width: 98%;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 15px;
`;

const KonuAdi = styled.div`
  font-weight: bold;
  font-size: 24px;
  min-width: min-content;
  padding-right: 20px;
`;

const KonuAciklama = styled.p`
  min-width: min-content;
  padding-right: 20px;
`;

const Metin = styled.div`
width: 60%;`

const Buttons = styled.div`
width: 20%;`

const ProgressDiv = styled.div`
width: 20%;`

const KonuEkleModal = ({ onClose, handleKonuEkle}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Konu Ekle</h2>         
        <ButtonSil onClick={onClose}>Kapat</ButtonSil>
        <AllKonular>           
            {
              konularJson.map((item) =>(
                <KonuDiv key={item.id}>
                  <KonuAciklama>{item.title}</KonuAciklama>
                  <ButtonSil style={{backgroundColor: "var(--main-color)",maxWidth: "50px", minWidth: "50px"}} onClick={() => handleKonuEkle(item)}>Ekle</ButtonSil>
                </KonuDiv>
              ))
            }  
        </AllKonular>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: start;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 100px;
  height: 50%;
`;

const AllKonular = styled.div`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 30px;
`;

export default EditLessons;
