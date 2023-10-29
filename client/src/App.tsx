import {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EventSourcing from "./pages/EventSourcing";
import LongPooling from "./pages/LongPooling";
import "./styles/App.css";

const App: FC = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/long-pooling" element={<LongPooling/>}/>
                    <Route path="/event-sourcing" element={<EventSourcing/>}/>
                    <Route path="*" element={<LongPooling/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
