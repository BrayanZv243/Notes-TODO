import React from "react";
import "./Loading.css";

const Loading = () => {
    return (
        <div className="loading-container">
            <svg
                className="loading-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="50"
                height="50"
            >
                <circle
                    className="loading-circle"
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                />
                <defs>
                    <linearGradient id="gradient">
                        <stop offset="5%" stopColor="#7C3AED" />
                        <stop offset="45%" stopColor="#C084FC" />
                        <stop offset="65%" stopColor="#F472B6" />
                        <stop offset="95%" stopColor="#7C3AED" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default Loading;
