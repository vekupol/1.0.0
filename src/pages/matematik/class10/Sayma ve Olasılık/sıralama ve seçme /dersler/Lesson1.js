import React from "react";
import VideoLesson from "../../../../../../components/lessons/videoLesson";

function Lesson1() {
  return (
    <div>
      <VideoLesson
        baslik = "Toplama Yoluyla Sayma"
        videoUrlOut="https://www.youtube-nocookie.com/embed/AbI6SfLSD1g?si=o9Hw6B6P-dfJk7uv"
        videoDescriptionOut="Barış Özcan - SpaceX"
        commentsCollection="commentsMatematikOn"
        unitNoOut={12}
        konuNoOut={21}
        partNoOut={31}
      />
    </div>
  );
}

export default Lesson1;
