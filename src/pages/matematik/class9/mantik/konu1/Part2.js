import React from 'react';
import "../../../../../index.css";
import { Container,  MainBar, SideBar} from '../../../../courses/course'
import Slider from "../../../../../componets/Slider"
import jsonData from './data.json';
import { ArticleContainer, FormulasContainer, InlineFormula, Paragraph, SubTitle, Title, List,ListItem } from '../../../../lessons/article';


function Part2() {
  
  return (
    <div>
      <Container>
        <SideBar>   
          <Slider data={jsonData}/>     

        </SideBar>
        <MainBar>
          <FormulasContainer className='formulas'>
            <ArticleContainer>
              <Title>Doğru ve Yanlış Önerme</Title>
              <SubTitle>Alt Başlık</SubTitle>
              <Paragraph>
                Önermeler p,q,r,s gibi harflerle gösterilir. Eğer bir önerme doğru ise  <InlineFormula math={' p \\equiv 1'}/> ile yanlış ise <InlineFormula math={' p \\equiv 0'} /> ile gösterilir.
              </Paragraph>
            <Paragraph>Aşağıda verilen örnekler doğru önermedir.</Paragraph>
            <List>
              <ListItem> Güneş doğudan doğar.</ListItem>
              <ListItem> Ankara Türkiye'nin başkentidir.</ListItem>
              <ListItem> 3 x 3 = 9'dur.</ListItem>
            </List>
            <Paragraph>Aşağıda verilen örnekler ise yanlış önermedir.</Paragraph>
            <List>
              <ListItem> Bir hafta sekiz gündür.</ListItem>
              <ListItem> Türkiye'nin nüfusu en yoğun ili Çankırı'dır.</ListItem>
              <ListItem> <InlineFormula math={'\\sqrt{9} = 4'} />'tür.</ListItem>
            </List>

            </ArticleContainer>

          </FormulasContainer>
          
          
        </MainBar>

      </Container>
    </div>
  )
}

export default Part2
