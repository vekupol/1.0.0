import React from "react";
import styled from "styled-components";

function OurStory() {
  return (
    <div>
      <OurStoryContainer>
        <Youtube
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/CjnCe46J9ok?si=vtNE7PS8rej2m4yH&autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></Youtube>
      </OurStoryContainer>
    </div>
  );
}

const OurStoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: calc(100vh - 100px);
  min-height: 500px;
  background-color: var(--third-color);
`;

const Youtube = styled.iframe`
  width: 100%;
  max-width: 1000px;
  height: auto;
  aspect-ratio: 16 / 9;
  margin-top: 2rem;
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.8);

`;

export default OurStory;
