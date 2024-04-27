import React from "react";
import "../../../../../index.css";
import { Container, MainBar, SideBar } from "../../../../courses/course";
import Slider from "../../../../../components/Slider";
import jsonData from "./data.json";

function Home1() {
  return (
    <div>
      <Container>
        <SideBar>
          <Slider data={jsonData} />
        </SideBar>
        <MainBar></MainBar>
      </Container>
    </div>
  );
}

export default Home1;
