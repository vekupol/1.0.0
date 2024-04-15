import SearchResults from "../components/SearchResults";
import Donate from "../pages/Donate";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";
import OurStory from "../components/footer/footerPages/OurStory";
import Sss from "../components/footer/footerPages/Sss";

export const MainRouter = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/destek-ol",
        element: <Donate/>,
    },
    {
        path: "/kayit-ol",
        element: <Signup/>,
    },
    {
        path: "/giris-yap",
        element: <Login/>,
    },
    {
        path: "/arama-sonuclari",
        element: <SearchResults/>,
    },
    {
        path: "/hikayemiz",
        element: <OurStory/>,
    },
    {
        path: "/sikca-sorulan-sorular",
        element: <Sss/>,
    },
    {
        path: "*",
        element: <NotFound/>,
    },
    
]