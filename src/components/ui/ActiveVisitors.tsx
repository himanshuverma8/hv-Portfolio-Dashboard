"use client";

import { div, h2 } from "motion/react-client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ActiveVisitors() {
    const [activeUsers, setActiveUsers] = useState(0);

    useEffect(() => {
        const socket = io("https://real-time-active-visitors-count-backend.onrender.com/", { transports: ["websocket"] });

        socket.on("update_count", (count) => {
            setActiveUsers(count);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
       <div className="absolute top-5 left-1/2 transform -translate-x-1/2 ">
        <div className="flex items-center justify-center">
        <h2 className="w-2 h-2 border-green-500 p-0.5 bg-green-500 rounded-full"></h2>
        <h2 className="text-xs ml-1">{`Active Visitors: ${activeUsers}`}</h2>
        </div>
       </div>
    );
}
