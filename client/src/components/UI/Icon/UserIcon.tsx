import {FC} from "react";

const UserIcon: FC = () => {
    return (
        <svg className="icon" width="36" height="36" viewBox="0 0 64 64">
            <g>
                <circle cx="32" cy="32" r="31" fill="#f5f5fe"></circle>
                <g fill="#4294ff">
                    <path d="M56.877 50.475a31.065 31.065 0 0 0-49.765-.016 30.967 30.967 0 0 0 49.765.016z"
                          fill="#243dbe"></path>
                    <circle cx="32" cy="22" r="12" fill="#243dbe" data-original="#4294ff"></circle>
                </g>
            </g>
        </svg>
    );
};

export default UserIcon;