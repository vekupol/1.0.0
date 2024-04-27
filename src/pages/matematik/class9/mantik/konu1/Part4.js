import React from 'react'
import Exercises2 from '../../../../lessons/Exercises2'
import Navbar from '../../../../../componets/Navbar'
import { Container, MainBar, SideBar } from '../../../../courses/course'
import Slider from '../../../../../componets/Slider'
import jsonData from './data.json';

function Part4() {
  return (
    <div>
      <Navbar/>
      <Container>
        <SideBar>
          <Slider data={jsonData}/>
        </SideBar>
        <MainBar>
        <Exercises2/>
        </MainBar>
      </Container>     
      
    </div>
  )
}

export default Part4
