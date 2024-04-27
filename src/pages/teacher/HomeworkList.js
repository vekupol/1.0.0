import {
  TableRow,
  TableHeader,
  TableCell,
  ButtonSil,
  ButtonO,
} from "./ClassEdit";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import {
  getDocs,
  deleteDoc,
  collection,
  doc,
  where,
  getDoc,
  updateDoc,
  query as firestoreQuery,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const storage = getStorage();

function HomeworkList({ paramsUid }) {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("Tüm Ödevler");
  const [sortBy, setSortBy] = useState("Bitiş Tarihi");
  const [showCompleted, setShowCompleted] = useState(false);

  const classAddedClassUid = paramsUid;
  const [classHomework, setClassHomework] = useState([]);

  const filteredHomeworks = classHomework.filter((item) => {
    const isCompleted = item.doneStudent === item.totalStudent;

    if (filterType === "Tüm Ödevler") {
      return showCompleted ? !isCompleted : true;
    } else {
      const isTypeMatch = item.homeworkType === filterType;
      return isTypeMatch && (showCompleted ? !isCompleted : true);
    }
  });

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const sortedHomeworks = [...filteredHomeworks];
  sortedHomeworks.sort((a, b) => {
    const dateA = formatDate(a.endDate);
    const dateB = formatDate(b.endDate);

    if (sortBy === "Bitiş Tarihi") {
      return dateA - dateB;
    } else if (sortBy === "Puan") {
      return b.puan - a.puan;
    }
    return 0;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Öğrencileri getir
        const classRef = collection(db, "classes");
        const query = firestoreQuery(
          classRef,
          where("classUid", "==", classAddedClassUid)
        );
        const classQuerySnapshot = await getDocs(query);

        if (!classQuerySnapshot.empty) {
          const classDoc = classQuerySnapshot.docs[0];
          const userDocData = classDoc.data();
          const allStudents = userDocData.students || [];

          console.log(allStudents);
        } else {
          console.log("Sınıf belgesi bulunamadı!");
        }

        // Homeworks koleksiyonundan classAddedClassUid'e sahip belgeleri getir
        const homeworksRef = collection(db, "homeworks");
        const homeworksQuery = firestoreQuery(
          homeworksRef,
          where("classUid", "==", classAddedClassUid)
        );
        const homeworksQuerySnapshot = await getDocs(homeworksQuery);

        if (!homeworksQuerySnapshot.empty) {
          const homeworksData = homeworksQuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setClassHomework(homeworksData);

          // İlgili ödevleri kullanmak için burada bir işlem yapabilirsiniz
        } else {
          console.log("Ödev belgeleri bulunamadı!");
        }
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };

    fetchData();
  }, [classAddedClassUid]);

  const handleHomeworkDelete = async (
    itemId,
    itemFileName,
    itemHomeworkType
  ) => {
    const confirmDelete = window.confirm(
      "Bu ödevi silmek istediğinizden emin misiniz?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      // Dosya ödevi kontrolü
      if (itemHomeworkType === "Dosya Ödevi") {
        // Dosya ödevi ise storage'dan dosyayı sil
        const storageRef = ref(
          storage,
          `homework-files/${classAddedClassUid}/${itemFileName}`
        );
        await deleteObject(storageRef);
      }

      // Ödevi sadece belirtilen itemId ile sil
      const homeworkRef = doc(db, "homeworks", itemId);
      await deleteDoc(homeworkRef);

      // Sınıf içerisindeki ödevleri güncelleme
      const classDocRef = doc(db, "classes", classAddedClassUid);
      const classDocSnap = await getDoc(classDocRef);

      if (classDocSnap.exists()) {
        const classData = classDocSnap.data();
        const currentHomeworks = classData.homeworks || [];
        const updatedHomeworksForClass = currentHomeworks.filter(
          (homework) => homework.refId !== itemId
        );

        await updateDoc(classDocRef, { homeworks: updatedHomeworksForClass });

        console.log("Ödev ve sınıf ödevleri güncellendi.");
        window.location.reload();
      } else {
        console.log("Sınıf belgesi bulunamadı!");
      }

      // Öğrenci belgelerini güncelleme
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      snapshot.forEach(async (doc) => {
        const userData = doc.data();
        const userHomeworks = userData.homeworks || [];

        const updatedHomeworks = userHomeworks.filter(
          (homework) => homework.refId !== itemId
        );
        await updateDoc(doc.ref, { homeworks: updatedHomeworks });
      });

      console.log("Ödev ve ilişkili öğrenci ödevleri silindi.");
    } catch (error) {
      console.error("Ödev silme hatası:", error);
    }
  };

  const handleHomeworkDetail = (itemId) => {
    navigate(`/ogretmenpaneli/odev-detay/${itemId}`);
  };

  return (
    <TableCustom>
      <Filter>
        <label>
          <FaFilter />
        </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="Tüm Ödevler">Ödev Türü</option>
          <option value="Platform Ödevi">Platform Ödevi</option>
          <option value="Kitap Ödevi">Kitap Ödevi</option>
          <option value="Dosya Ödevi">Dosya Ödevi</option>
        </select>

        <label>Tamamlanan Ödevleri Gösterme</label>
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />

        <label>Sırala:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="Bitiş Tarihi">Bitiş Tarihi</option>
          <option value="Puan">Puan</option>
        </select>
      </Filter>

      <TableStyled>
        <thead>
          <TableRow>
            <TableHeader>No</TableHeader>
            <TableHeader>Ödev Türü </TableHeader>
            <TableHeader>Puanı </TableHeader>
            <TableHeader>
              Veriliş Tarihi <FaSort />
            </TableHeader>
            <TableHeader>
              Bitiş Tarihi <FaSort />
            </TableHeader>
            <TableHeader>Ödev Teslim Durumu</TableHeader>
            <TableHeader></TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {sortedHomeworks.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.homeworkType}</TableCell>
              <TableCell>{item.puan}</TableCell>
              <TableCell>{item.startDate}</TableCell>
              <TableCell>{item.endDate}</TableCell>
              <TableCell>
                {item.doneStudent === item.totalStudent
                  ? "Tamamlandı"
                  : `Öğrenci: ${item.doneStudent} / ${item.totalStudent}`}
              </TableCell>
              <TableCell>
                <ButtonSil
                  onClick={() =>
                    handleHomeworkDelete(
                      item.id,
                      item.fileName,
                      item.homeworkType
                    )
                  }
                >
                  Ödevi Sil
                </ButtonSil>
              </TableCell>
              <TableCell>
                <ButtonO onClick={() => handleHomeworkDetail(item.id)} >Detaylar</ButtonO>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableStyled>
    </TableCustom>
  );
}

const TableCustom = styled.table`
  border: none;
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px;
`;

const Filter = styled.div`
  width: 100%;
  padding: 20px 0px 0px 40px;
  display: flex;
  align-items: center;
  color: var(--main-color);

  label {
    margin-right: 10px;
  }
  select {
    margin-right: 30px;
    border: 1px solid var(--main-color);
    border-radius: 4px;
    padding: 5px;
  }
  input {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    :checked {
      accent-color: var(--main-color);
    }
  }
`;

export default HomeworkList;
