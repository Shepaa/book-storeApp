import CustomLayout from "./components/Layout/CustomLayout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BooksList} from "./components/Book/BookList/BookList";
import {FavoriteBooks} from "./components/Favorite/Favorite";
import {Basket} from "./components/Basket/Basket";
import "../src/utilites/Scrollbar/scrollbar.css"
import {Balance} from "./components/Balance/Balance";
import AboutUs from "./components/About/AboutUs";

function App() {
    return (
        // <div style={{overflowY: 'scroll', height: '100vh'}}>
            <BrowserRouter>
                <Routes>
                    <Route element={<CustomLayout/>}>
                        <Route element={<BooksList/>} path={"/"}/>
                        <Route element={<Basket/>} path={"/basket"}/>
                        <Route element={<AboutUs/>} path={"/about"}/>
                        <Route element={<FavoriteBooks/>} path={'/favorite'}/>
                    </Route>
                    <Route element={<Balance/>} path={"/balance"}/>
                </Routes>
            </BrowserRouter>
        // </div>
    );
}

export default App;
