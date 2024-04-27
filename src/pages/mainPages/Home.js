import React from "react";
import MainMenu from "../../components/MainMenu";
import OgrenciMenu from "../../components/OgrenciMenu";
import OgretmenMenu from "../../components/OgretmenMenu";
import VeliMenu from "../../components/VeliMenu";
import Slider from "../../components/sliderLogo/logos/Slider"

function Home() {
  return (
    <div>
      <MainMenu />
      <OgrenciMenu />
      <OgretmenMenu />
      <VeliMenu />
      <Slider direction={"row"} />
    </div>
  );
}

export default Home;
