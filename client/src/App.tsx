import {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EventSourcingChat from "./pages/EventSourcingChat";
import LongPollingChat from "./pages/LongPollingChat";
import WebSocketChat from "./pages/WebSocketChat";
import "./styles/App.css";

const App: FC = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/long-polling" element={<LongPollingChat/>}/>
                    <Route path="/event-sourcing" element={<EventSourcingChat/>}/>
                    <Route path="/web-socket" element={<WebSocketChat/>}/>
                    <Route path="*" element={<LongPollingChat/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
