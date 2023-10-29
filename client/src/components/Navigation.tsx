import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <div className="flex g-20">
            <Link className="link" to="/long-pooling">LongPooling</Link>
            <Link className="link" to="/event-sourcing">EventSourcing</Link>
        </div>
    );
};

export default Navigation;