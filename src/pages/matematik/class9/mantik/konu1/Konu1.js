import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../../../../componets/Navbar'
import { FooterContainer } from '../../../../../componets/footer/containers/footer'
import { Container, CourseTitle, MainBar, SideBar, CourseName, CourseUnits} from '../../../../courses/course';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { MdOutlineSlowMotionVideo,MdOutlineArticle,MdOutlineBallot} from "react-icons/md";
import { darken } from '@mui/material';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import "../../../../../index.css";
import VideoLesson from '../../../../lessons/videoLesson';
import ArticleLesson from '../../../../lessons/article';
import Exercises from '../../../../lessons/Exercises';
import class9Data from "../../../data/YoutubeURL/class9.json"
import { Link } from 'react-router-dom';


function Konu1() {
  const [activeComponent, setActiveComponent] = useState(0); // İlk olarak Video bileşeni görünsün
  const components = [
    <VideoLesson
      videoUrlOut={class9Data.mantik.konu1.part2.url}
      videoDescriptionOut={class9Data.mantik.konu1.part2.description}
      unitNoOut="1"
      konuNoOut="12"
      partNoOut="123"
    />,
    <ArticleLesson />,
    <Exercises />
  ];

  const handleRightArrowClick = () => {
    if (activeComponent < components.length - 1) {
      setActiveComponent(activeComponent + 1);
    }
  };

  const handleLeftArrowClick = () => {
    if (activeComponent > 0) {
      setActiveComponent(activeComponent - 1);
    }
  };

  return (
    <div>
        <Navbar/>
        <Container>
            <SideBar>
              <CourseTitle >
                    <CourseName>Mantık</CourseName>                    
                </CourseTitle>
                <CourseSubTitle >
                    <LeftArrow onClick={handleLeftArrowClick}/>
                    <CourseSubName>Konu 1 : Doğru Önerme ve Yanlış Önerme</CourseSubName>
                    <RightArrow onClick={handleRightArrowClick}/>
                </CourseSubTitle>                 

                <CourseUnits>
                      <Part data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!" onClick={() => setActiveComponent(0)}>
                          <IconDiv>
                            <MdOutlineSlowMotionVideo className='icons'/>
                          </IconDiv>                           
                          <PartDescription>Bu ünitede birden fazla sayının EBOB'unu EKOK'unu bulmayı ,</PartDescription>                                                                             
                      </Part>
                      <Part data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!" onClick={() => setActiveComponent(1)}>
                          <IconDiv>
                            <MdOutlineArticle className='icons'/>
                          </IconDiv>                                                       
                          <PartDescription>Bu ünitede birden fazla sayının EBOB'unu EKOK'unu bulmayı ,  </PartDescription>                                                     
                      </Part>
                      <Part data-tooltip-id="my-tooltip" data-tooltip-content="Bu ünitede birden  " onClick={() => setActiveComponent(2)}>
                          <IconDiv>
                            <MdOutlineBallot className='icons'/>
                          </IconDiv>                                                     
                          <PartDescription>Bu ünitede birden fazla sayının EBOB'unu EKOK'unu bulmayı ,  </PartDescription>                                                    
                      </Part>
                      
                                     
                    
                </CourseUnits>
            </SideBar>
            <MainBar>
              <Link to="/kurslar/9-sinif/mantik/konu1/part1"> Part 1 </Link>
              <Link to="/kurslar/9-sinif/mantik/konu1/part2"> Part 2 </Link>
              <Link to="/kurslar/9-sinif/mantik/konu1/part3"> Part 3 </Link>
              
              {components[activeComponent]}
            </MainBar>
        </Container>       
        <FooterContainer/>      
    </div>
  )
}

export const Image = styled.div`
border: 1px solid red;
width: 60px;
height: 60px;
margin-right: 20px;`

export const CourseSubTitle = styled.div`
background-color:var(--second-color);
display: flex;
align-items: center;
height: 70px;
`

export const CourseSubName = styled.p`
padding: 0 1.5rem;
font-size: 1.1rem;
color: var(--main-color);
font-weight: bold;
height: 100%;
display: flex;
align-items: center;
`

export const LeftArrow = styled(FaArrowCircleLeft)`
color : var(--main-color);
font-size: 2rem;
height: 100%;
padding-left : 1rem;
:hover{
  cursor: pointer;         
}
`
export const RightArrow = styled(FaArrowCircleRight)`
color : var(--main-color);
font-size: 2rem;
height: 100%;
padding-right : 1rem;
:hover{
  cursor: pointer;       
}
`

export const Part = styled.div`
padding: 1rem 1rem .5rem 1rem;
height: 40px;
display: flex;
align-items: center;
:hover{
    cursor: pointer;
    background-color:  ${darken('#fff', 0.1)};
        
}`


export const PartDescription = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;`

export const IconDiv = styled.div`
font-size: 1.5rem;
margin-right: 1rem;
width: 60px;
display: flex;
align-items: center;
justify-content: center;
`



export default Konu1
