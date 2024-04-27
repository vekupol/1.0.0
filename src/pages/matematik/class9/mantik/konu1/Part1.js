import React from "react";
import "../../../../../index.css";
import { Container, MainBar, SideBar } from "../../../../courses/course";
import Slider from "../../../../../componets/Slider";
import jsonData from "./data.json";
import VideoLesson from "../../../../lessons/videoLesson";

function Part1() {
  return (
    <div>
      <Container>
        <SideBar>
          <Slider data={jsonData} />
        </SideBar>
        <MainBar>
          <VideoLesson
            videoUrlOut="https://www.youtube-nocookie.com/embed/Un51zBkABxM?si=aNzoIoiklpg73FGr"
            videoDescriptionOut="aşk değil bu bana tuzaaaakakkkaka"
            unitNoOut="1"
            konuNoOut="1"
            partNoOut="1"
          />
        </MainBar>
      </Container>
    </div>
  );
}

export default Part1;
