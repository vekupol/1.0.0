import OnMatematik from "../pages/matematik/class10/OnMatematik";
import SaymaVeOlasilik from "../pages/matematik/class10/Sayma ve Olasılık/SaymaVeOlasilik";
import BasitOlaylarinOlasiliklari from "../pages/matematik/class10/Sayma ve Olasılık/basit olayların olasılıkları/BasitOlaylarinOlasiliklari";
import SiralamaVeSecme from "../pages/matematik/class10/Sayma ve Olasılık/sıralama ve seçme /SiralamaVeSecme";

export const Matematik10 = [
  {
    path: "/matematik/10-sinif",
    element: <OnMatematik activeDivProps={1} />
  },
  {
    path: "/matematik/10-sinif/sayma-ve-olasilik/intro",
    element: <OnMatematik activeDivProps={2} />,
  },
  {
    path: "/matematik/10-sinif/fonksiyonlar/intro",
    element: <OnMatematik activeDivProps={3} />,
  },
  {
    path: "/matematik/10-sinif/sayma-ve-olasilik",
    element : <SaymaVeOlasilik activeDivProps={1} />,
  },
  {
    path: "/matematik/10-sinif/sayma-ve-olasilik/siralama-ve-secme/intro",
    element : <SaymaVeOlasilik activeDivProps={2} />,
  },
  {
    path: "/matematik/10-sinif/sayma-ve-olasilik/basit-olaylarin-olasiliklari/intro",
    element : <SaymaVeOlasilik activeDivProps={3} />,
  },
  {
    path: "/matematik/10-sinif/sayma-ve-olasilik/siralama-ve-secme",
    element : <SiralamaVeSecme startTopicProps={1}/>,
  },
  {
    path: "/matematik/10-sinif/sayma-ve-olasilik/siralama-ve-secme/a-bolumu/ders-1",
    element : <SiralamaVeSecme startTopicProps={1}/>,
  },
  {
    path: "/matematik/10-sinif/sayma-ve-olasilik/siralama-ve-secme/b-bolumu/ders-1",
    element : <SiralamaVeSecme startTopicProps={2}/>,
  },
  {
    path: "/matematik/10-sinif/sayma-ve-olasilik/basit-olaylarin-olasiliklari",
    element : <BasitOlaylarinOlasiliklari/>,
  }
];

