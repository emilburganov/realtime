import {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LongPooling from "./pages/LongPooling";
import "./styles/App.css";

const App: FC = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LongPooling/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
