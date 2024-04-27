import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  getDocs,
  deleteDoc,
  collection,
  where,
  updateDoc,
  query as firestoreQuery,
} from "firebase/firestore";
import backgroundImg from "./Drawers/images/a.png";
import HomeworkList from "./HomeworkList";

function ClassEdit() {
  const navigate = useNavigate();
  const { classUid } = useParams();
  const paramsUid = classUid;
  const [students, setStudents] = useState([]);
  const [classAdded, setClassAdded] = useState("");
  const [newClassName, setNewClassName] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const classRef = collection(db, "classes");
        const query = firestoreQuery(
          classRef,
          where("classUid", "==", paramsUid)
        );
        const classQuerySnapshot = await getDocs(query);

        if (!classQuerySnapshot.empty) {
          const classDoc = classQuerySnapshot.docs[0];
          const classDocData = classDoc.data();
          const studentsData = classDocData.students || [];
          setClassAdded(classDocData);
          setStudents(studentsData);
        } else {
          console.log("Sınıf belgesi bulunamadı!");
        }
      } catch (error) {
        console.error("Öğrenci getirme hatası:", error);
      }
    };

    fetchStudents();
  }, [paramsUid]);

  const handleAddStudent = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const studentEmail = formData.get("studentEmail");

    try {
      const userRef = collection(db, "users");
      const query = firestoreQuery(
        userRef,
        where("userData.email", "==", studentEmail)
      );
      const querySnapshot = await getDocs(query);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data().userData;
        const displayName = userData.displayName;
        const userDoc = querySnapshot.docs[0];
        const uid = userDoc.data().uid;

        const classRef = collection(db, "classes");
        const classQuery = firestoreQuery(
          classRef,
          where("classUid", "==", paramsUid)
        );
        const classQuerySnapshot = await getDocs(classQuery);

        if (!classQuerySnapshot.empty) {
          const classDoc = classQuerySnapshot.docs[0];
          const studentsArray = classDoc.data().students || [];
          const isStudentAlreadyAdded = studentsArray.some(
            (student) => student.uid === uid
          );

          if (!isStudentAlreadyAdded) {
            const newStudent = { displayName, uid };
            studentsArray.push(newStudent);
            await updateDoc(classDoc.ref, { students: studentsArray });
            setStudents([...studentsArray]); // Yeni öğrenci eklenmiş halde state güncelleniyor
          } else {
            alert("Öğrenci zaten eklenmiş!");
            // İstenilen işlem yapılabilir, mesela bir hata mesajı gösterilebilir
          }
        } else {
          console.log("Sınıf belgesi bulunamadı!");
        }
      } else {
        alert("Bu mail adresine sahip öğrenci bulunamadı!");
        // Kullanıcı yoksa ekrana bir hata mesajı verebilirsiniz
      }
    } catch (error) {
      alert("Kullanıcı arama hatası:", error);
    }
  };

  const handleClassChange = async (event) => {
    event.preventDefault();

    try {
      const classRef = collection(db, "classes");
      const classQuery = firestoreQuery(
        classRef,
        where("classUid", "==", paramsUid)
      );
      const classQuerySnapshot = await getDocs(classQuery);

      if (!classQuerySnapshot.empty) {
        const classDoc = classQuerySnapshot.docs[0];
        await updateDoc(classDoc.ref, { className: newClassName });
        setClassAdded((prevState) => ({
          ...prevState,
          className: newClassName,
        }));
        setNewClassName("");
      } else {
        console.log("Sınıf belgesi bulunamadı!");
      }
    } catch (error) {
      console.error("Sınıf ismi güncelleme hatası:", error);
    }
  };

  const handleDeleteStudent = async (studentUid) => {
    const confirmDelete = window.confirm(
      "Öğrenciyi silmek istediğinizden emin misiniz?"
    );

    if (confirmDelete) {
      try {
        const classRef = collection(db, "classes");
        const classQuery = firestoreQuery(
          classRef,
          where("classUid", "==", paramsUid)
        );
        const classQuerySnapshot = await getDocs(classQuery);

        if (!classQuerySnapshot.empty) {
          const classDoc = classQuerySnapshot.docs[0];
          const studentsArray = classDoc.data().students || [];
          const updatedStudents = studentsArray.filter(
            (student) => student.uid !== studentUid
          );

          await updateDoc(classDoc.ref, { students: updatedStudents });
          setStudents(updatedStudents); // Güncel öğrenci listesini state'e aktar
        } else {
          console.log("Sınıf belgesi bulunamadı!");
        }
      } catch (error) {
        console.error("Öğrenci silme hatası:", error);
      }
    }
  };

  const handleClassDelete = async (event) => {
    event.preventDefault();

    // Kullanıcıya silme işlemini onaylatan bir alert göster
    const confirmDelete = window.confirm("Silmek istediğinizden emin misiniz?");

    // Kullanıcı onayladıysa işlemi gerçekleştir
    if (confirmDelete) {
      try {
        const classRef = collection(db, "classes");
        const q = firestoreQuery(classRef, where("classUid", "==", paramsUid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const classDoc = querySnapshot.docs[0];
          // Silme işlemi burada gerçekleştirilebilir
          await deleteDoc(classDoc.ref);

          // Sınıf silindikten sonra /ogretmenpaneli sayfasına yönlendirme
          navigate("/ogretmenpaneli");
        } else {
          console.log("Sınıf belgesi bulunamadı!");
        }
      } catch (error) {
        console.error("Sınıf silme hatası:", error);
      }
    }
  };

  const handleStudentSelection = (studentUid) => {
    navigate(`/ogretmen-ekrani/ogrenci-duzenle/${studentUid}`);
  };

  const handleAddClassHomework = (classAddedClassUid) => {
    navigate(`/ogretmen-ekrani/sinif-duzenle/odev-ekle/${classAddedClassUid}`);
  };

  return (
    <ClassContainer>
      <ClassContainer2>
        <Name>
          <ClassName>{classAdded.className} </ClassName>
        </Name>
        <Container>
          <div>
            <Students>
              <MyStudents>Öğrencilerim</MyStudents>
              <Aciklama>
                Sınıfınıza öğrenci eklemek için öğrencinizin mail adresini
                girdikten sonra <span>Öğrenci Ekle</span> butonuna tıklayın.
              </Aciklama>
              <form onSubmit={handleAddStudent}>
                <Input
                  type="text"
                  name="studentEmail"
                  placeholder="Öğrencinizin mail adresini giriniz"
                />
                <ButtonO type="submit">Öğrenci Ekle</ButtonO>
              </form>
              <StyledTable>
                <thead>
                  <TableRow>
                    <TableHeader>No</TableHeader>
                    <TableHeader>Adı</TableHeader>
                    <TableHeader>Puanı</TableHeader>
                    <TableHeader></TableHeader>
                    <TableHeader></TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.displayName}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>
                        <ButtonO
                          onClick={() => handleStudentSelection(student.uid)}
                        >
                          Öğrenci Seç
                        </ButtonO>
                      </TableCell>
                      <TableCell>
                        <ButtonSil
                          onClick={() => handleDeleteStudent(student.uid)}
                        >
                          Öğrenci Sil
                        </ButtonSil>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </StyledTable>
            </Students>
          </div>
          <div>
            <Homeworks>
              <MyStudents>Ödevler</MyStudents>
              <Aciklama>
                Sınıfın tamamına ödev vermek için <span>Ödev Ekle</span>
                butonuna tıklayın.
              </Aciklama>
              <ButtonO
                onClick={() => handleAddClassHomework(classAdded.classUid)}
              >
                Ödev Ekle
              </ButtonO>
              <Aciklama>
                Bireysel ödev vermek için ise öğrencinin yanındaki{" "}
                <span>Öğrenci Seç</span> butonuna tıklayın.
              </Aciklama>
            </Homeworks>
          </div>
        </Container>
        <Homeworks style={{ width: "92%" }}>
          <HomeworkList paramsUid={paramsUid} />
        </Homeworks>
        <Container>
          <Homeworks>
            <Form onSubmit={handleClassChange}>
              <Input
                type="text"
                placeholder={classAdded.className}
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
              />
              <ButtonO type="submit">Sınıf İsmini Değiştir</ButtonO>
            </Form>
          </Homeworks>
          <Homeworks>
            <Form>
              <Aciklama>Sınıfı silmek için butona tıklayınız.</Aciklama>
              <ButtonSil type="submit" onClick={handleClassDelete}>
                Sınıfı Kalıcı Olarak Sil
              </ButtonSil>
            </Form>
          </Homeworks>
        </Container>
      </ClassContainer2>
    </ClassContainer>
  );
}

export const ClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const ClassContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
`;

export const Container = styled.div`
  padding: 20px 20px 100px;
  width: 95%;
  margin: 0px 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
`;

export const Name = styled.div`
  width: 92%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  height: 200px;
  margin: 30px 50px 0px;
  display: flex;
  justify-content: left;
  align-items: end;
  position: relative;
  background-image: url(${backgroundImg});
  background-size: cover;
`;
export const ClassName = styled.div`
  font-size: 2rem;
  text-align: left;
  font-weight: bold;
  padding: 20px;
  color: var(--main-color);
`;

export const MyStudents = styled.div`
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  border-radius: 0.5em solid var(--main-color);
  margin-bottom: 30px;
`;

export const Students = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
`;

export const FormContainer = styled.div`
  width: 100%;
`;

export const Form = styled.form`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  padding: 5px 10px;
  width: 100%;
  margin-bottom: 10px;
`;

export const ButtonO = styled.button`
  padding: 5px 10px;
  width: 100%;
  color: white;
  background-color: var(--main-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* başlangıçta gölge */
  font-size: 16px;

  &:hover {
    transform: translateY(-5px); /* yukarı doğru hafif kayma */
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* büyütülmüş gölge */
  }
`;

export const Homeworks = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin-bottom: 15px;
`;
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px;
  border: 3px solid var(--main-color);
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableHeader = styled.th`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

export const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

export const Aciklama = styled.p`
  margin-bottom: 12px;
  ::before {
    content: "!";
    color: var(--main-color);
    margin-right: 6px;
    font-weight: bold;
    font-size: 25px;
  }

  span {
    color: var(--main-color);
    font-weight: bold;
  }
`;

export const ButtonSil = styled.button`
  width: 100%;
  max-width: 1000px;
  padding: 5px 10px;
  color: white;
  background-color: var(--delete-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* başlangıçta gölge */
  font-size: 16px;

  &:hover {
    transform: translateY(-5px); /* yukarı doğru hafif kayma */
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* büyütülmüş gölge */
  }
`;

export default ClassEdit;
