import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/index.jsx";
import DetailPage from "./pages/DetailPage/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";




const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/pokemon/:id' element={<DetailPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
