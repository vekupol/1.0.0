import React from "react";
import Footer from "../components/footer";
import {
  BiLogoInstagram,
  BiLogoYoutube,
} from "react-icons/bi";

export function FooterContainer() {
  return (
    <Footer>
      <Footer.Wrapper>
        <Footer.Row>
          <Footer.Column>
            <Footer.Title>Hakkımızda</Footer.Title>
            <Footer.Link href="/hikayemiz">Hikayemiz</Footer.Link>
            <Footer.Link href="/destekcilerimiz">Destekçilerimiz</Footer.Link>
            <Footer.Link href="/sikca-sorulan-sorular">SSS</Footer.Link>

          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Kurslarımız</Footer.Title>
            <Footer.Link href="/ayt-matematik">AYT Matematik</Footer.Link>
            <Footer.Link href="/tyt-matematik">TYT Matematik</Footer.Link>
            <Footer.Link href="/12-sinif-matematik">12. Sınıf Matematik</Footer.Link>
            <Footer.Link href="/11-sinif-matematik">11. Sınıf Matematik</Footer.Link>
            <Footer.Link href="/10-sinif-matematik">10. Sınıf Matematik</Footer.Link>
            <Footer.Link href="/9-sinif-matematik">9. Sınıf Matematik</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>İletişim</Footer.Title>
            <Footer.Link >Telefon</Footer.Link>
            <Footer.Link >0530 682 68 49</Footer.Link>
            <Footer.Link >Email</Footer.Link>
            <Footer.Link style={{ fontSize: "12px"}}>iletisim@venusegitim.com</Footer.Link>
          </Footer.Column>

          <Footer.Column>
            <Footer.Title>Sosyal Medya Hesaplarımız</Footer.Title>
            <Footer.Link
              href="https://www.instagram.com/egitimvenus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoInstagram />
              Instagram
            </Footer.Link>
            <Footer.Link
              href="https://www.youtube.com/@venusegitim"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoYoutube />
              Youtube
            </Footer.Link>
          </Footer.Column>
        </Footer.Row>
      </Footer.Wrapper>
    </Footer>
  );
}
