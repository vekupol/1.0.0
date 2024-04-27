import React from 'react';
import "../../../../../index.css";
import styled from 'styled-components';
import Navbar from '../../../../../componets/Navbar'
import { Container,  MainBar, SideBar} from '../../../../courses/course'
import Slider from "../../../../../componets/Slider"
import jsonData from './data.json';
import Exercises from '../../../../lessons/Exercises';


function Part3() {
  
  return (
    <div>
      <Navbar />
      <Container>
        <SideBar>   
          <Slider data={jsonData}/>     
        </SideBar>
        <MainBar>
          <Exercises/>          
        </MainBar>
      </Container>
      
    </div>
  )
}




export default Part3
