import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { IoMdDownload } from "react-icons/io";
import {
  Title,
  Text,
  Container,
  Main,
} from "../../student/Drawers/studentDrawerKonularim";
import { InputText } from "../../student/studentAyarlar";
import { Button } from "../../../components/buttons/Button.styled";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 450px) {
    font-size: 8px;
  }
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  text-align: center;
  position: sticky;
  top: -1px;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
  background-color: var(--main-color);
  color: white;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: .8rem;
  }

  @media (max-width: 450px) {
    font-size: .6rem;
  }
`;


 

const DownloadIcon = styled(IoMdDownload)`
  color: var(--main-color);
  padding: 5px 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const DrawerDokumanAra = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(files)

  useEffect(() => {
    fetchFiles();
  }, []);

  const getFileType = (contentType) => {
    if (contentType.includes("pdf")) {
      return "Pdf";
    } else if (contentType.includes("spreadsheetml.sheet")) {
      return "Excel";
    } else if (contentType.includes("wordprocessingml.document")) {
      return "Word";
    } else if (
      contentType.includes("image/jpeg") ||
      contentType.includes("image/jpg")
    ) {
      return "Jpeg";
    } else if (contentType.includes("image/png")) {
      return "Png";
    } else if (contentType.includes("zip")) {
      return "Rar";
    } else {
      return "Diğer";
    }
  };

  const fetchFiles = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, "documents");

    try {
      const filesList = await listAll(storageRef);
      const filesData = await Promise.all(
        filesList.items.map(async (fileRef) => {
          try {
            const metadata = await getMetadata(fileRef);
            if (metadata) {
              return {
                name: metadata.name || "N/A",
                url: await getDownloadURL(fileRef),
                class: metadata.customMetadata.class || "N/A",
                unit: metadata.customMetadata.unit || "N/A",
                tag: metadata.customMetadata.tag || "N/A",
                created: metadata.timeCreated || "N/A",
                contentType: metadata.contentType || "N/A",
                fileType: getFileType(metadata.contentType || "N/A"),
              };
            } else {
              console.error("Dosya metadata alınamıyor:", fileRef);
              return null;
            }
          } catch (error) {
            console.error("Dosya referansı beklenen türde değil:", fileRef);
            return null;
          }
        })
      );

      setFiles(filesData);
    } catch (error) {
      console.error("Dosyaları çekerken bir hata oluştu:", error.message);
    }
  };

  const formatCreatedDate = (createdDate) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(createdDate).toLocaleDateString("tr-TR", options);
  };

  const handleDownloadFile = (url, fileName) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.click();
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      return; // Boş arama yapılmasını engelle
    }
    const storage = getStorage();
    const storageRef = ref(storage, "documents");

    try {
      const filesList = await listAll(storageRef);
      const filesData = await Promise.all(
        filesList.items.map(async (fileRef) => {
          try {
            const metadata = await getMetadata(fileRef);
            if (metadata) {
              const data = {
                name: metadata.name || "N/A",
                url: await getDownloadURL(fileRef),
                class: metadata.customMetadata.class || "N/A",
                unit: metadata.customMetadata.unit || "N/A",
                tag: metadata.customMetadata.tag || "N/A",
                created: metadata.timeCreated || "N/A",
                contentType: metadata.contentType || "N/A",
                fileType: getFileType(metadata.contentType || "N/A"),
              };
              if (
                data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.fileType
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                (data.created &&
                  data.created
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
                (data.contentType &&
                  data.contentType
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
              ) {
                return data;
              } else {
                return null;
              }
            } else {
              console.error("Dosya metadata alınamıyor:", fileRef);
              return null;
            }
          } catch (error) {
            console.error("Dosya referansı beklenen türde değil:", fileRef);
            return null;
          }
        })
      );

      // Filtrelenmiş dosyaları ayıklama
      const filteredFiles = filesData.filter((file) => file !== null);
      setFiles(filteredFiles);
    } catch (error) {
      console.error("Dosyaları çekerken bir hata oluştu:", error.message);
    }
  };

  const handleReset = async () => {
    setSearchTerm("");
    fetchFiles();
  };

  const highlightSearchTerm = (text) => {
    if (searchTerm !== "") {
      const regex = new RegExp(`(${searchTerm})`, "gi");
      return text.split(regex).map((part, index) =>
        regex.test(part) ? (
          <strong style={{ color: "#c4302b" }} key={index}>
            {part}
          </strong>
        ) : (
          part
        )
      );
    } else {
      return text;
    }
  };

  return (
    <Container>
      <Title>
        <Text>Doküman Ara</Text>
      </Title>
      <Main>
        <div>
        <InputText
          type="text"
          placeholder="Doküman Adı İle Ara"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button onClick={handleSearch}>Ara</Button>
        <Button onClick={handleReset}>Sıfırla</Button>
        </div>
        <Table>
          <thead>
            <tr>
              <TableHeader>No</TableHeader>
              <TableHeader style={{ textAlign: "left", paddingLeft: "15px" }}>
                İsim
              </TableHeader>
              <TableHeader style={{ maxWidth: "50px" }}>Sınıf</TableHeader>
              <TableHeader>Türü</TableHeader>
              <TableHeader>Eklenme Tarihi</TableHeader>
              <TableHeader>İndir</TableHeader>
            </tr>
          </thead>
          <tbody>
            {files.map(
              (file, index) =>
                file && (
                  <tr key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      style={{ textAlign: "left", paddingLeft: "15px" }}
                    >
                      {highlightSearchTerm(file.name || "N/A")}
                    </TableCell>
                    <TableCell>
                      {highlightSearchTerm(file.class || "N/A")}
                    </TableCell>
                    <TableCell>
                      {highlightSearchTerm(file.fileType || "N/A")}
                    </TableCell>
                    <TableCell>
                      {highlightSearchTerm(
                        file.created ? formatCreatedDate(file.created) : "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      <DownloadIcon
                        onClick={() => handleDownloadFile(file.url, file.name)}
                      />
                    </TableCell>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      </Main>
    </Container>
  );
};

export default DrawerDokumanAra;
