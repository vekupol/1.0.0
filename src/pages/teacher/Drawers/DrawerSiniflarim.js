import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getDocs,
  doc,
  query,
  collection,
  where,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  Unit,
  UnitName,
  UnitDescription,
  Text,
  Title,
  Container,
  Main,
} from "../../student/Drawers/studentDrawerKonularim";
import { CustomLink2, Button } from "../../../components/buttons/Button.styled";
import {
  FormContainer,
  InputSave,
  InputText,
  LabelSubtitle
} from "../../student/studentAyarlar";

function DrawerSiniflarim() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      const q = query(
        collection(db, "classes"),
        where("teacherUid", "==", currentUserUid)
      );

      const getUserData = async () => {
        const querySnapshot = await getDocs(q);
        const userData = []; // Tüm belgeleri saklayacak boş bir dizi

        querySnapshot.forEach((doc) => {
          userData.push(doc.data()); // Her belgeyi diziye ekliyoruz
        });

        setUsers(userData); // Tüm belgeleri içeren diziyi state olarak güncelliyoruz
      };

      getUserData();
    }
  }, []); // user veya başka bir bağımlılık burada olabilir

  const handleAddClass = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const className = formData.get("className");

    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      try {
        // Yeni sınıf dökümanını oluştur
        const newClassRef = doc(collection(db, "classes"));
        const newClassUid = newClassRef.id;

        await setDoc(newClassRef, {
          className: className,
          teacherUid: currentUserUid,
          students: [],
          classUid: newClassUid,
        });

        console.log("Sınıf başarıyla eklendi!");

        // Yeni sınıfı oluşturup, eski sınıfların listesine ekleyerek state'i güncelle
        const newClass = {
          className,
          teacherUid: currentUserUid,
          students: [],
          classUid: newClassUid,
        };
        setUsers((prevUsers) => [...prevUsers, newClass]);

        // Sınıf başarıyla eklendiğinde navigasyon yapılabilir ya da başka bir işlem gerçekleştirilebilir
      } catch (error) {
        console.error("Sınıf ekleme hatası:", error);
      }
    }
  };

  const handleGoToClass = (classUid) => {
    // Seçilen sınıfın adını al ve ClassEdit bileşenine yönlendirme yap
    navigate(`/ogretmen-ekrani/sinif-duzenle/${classUid}`); // useNavigate kullanımı
  };

  return (
    <Container>
      <Title>
        <Text>Sınıflarım</Text>
      </Title>
      <Main>
        <Unit>
          <UnitName style={{ color: "#674188", fontSize: "1.5rem" }}>
            Sınıf Adı
          </UnitName>
          <UnitDescription
            style={{ color: "#674188", fontSize: "1.2rem", fontWeight: "bold" }}
          ></UnitDescription>
          <CustomLink2></CustomLink2>
        </Unit>
        {users.map((user, index) => (
          <Unit key={index}>
            <UnitName>{user.className}</UnitName>
            <UnitDescription></UnitDescription>
            <Button
              width={"100%"}
              onClick={() => handleGoToClass(user.classUid)}
            >
              Sınıfa Git
            </Button>
          </Unit>
        ))}
        <FormContainer>
          <Form onSubmit={handleAddClass}>
            <LabelSubtitle>
              Sayın öğretmenimiz sınıf eklemek için aktivasyon kodu alınız.
              Aktivasyon kodunu <Link to="/odeme-planlari">buraya</Link>{" "}
              tıklayarak temin edebilirsiniz. Herhangi bir hata durumunda <strong>0530 682 68 49</strong> numaralı iletişim hattını kullanabilirsiniz.
            </LabelSubtitle>
            <InputText
              type="text"
              name="className"
              placeholder="Sınıfınızın adını giriniz"
            />
            <InputText
              type="text"
              name="activationCode"
              placeholder="Aktivasyon kodu"
            />
            <InputSave type="submit" value="Sınıf Ekle" />
          </Form>
        </FormContainer>
      </Main>
    </Container>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;



export default DrawerSiniflarim;
