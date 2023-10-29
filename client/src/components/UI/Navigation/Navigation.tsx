import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <div className="flex g-20">
            <Link className="link" to="/long-polling">LongPolling</Link>
            <Link className="link" to="/event-sourcing">EventSourcing</Link>
            <Link className="link" to="/web-socket">WebSocket</Link>
        </div>
    );
};

export default Navigation;