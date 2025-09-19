"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import axios from "axios";
import { useVisitorStore } from "@/app/store/useVisitorStore.ts";

export default function ActiveVisitors() {
    const {activeUsers, setActiveUsers} = useVisitorStore();

    useEffect(() => {
        const socket = io("https://real-time-active-visitors-count-backend.onrender.com/", { transports: ["websocket"] });

        // Listen for active users count
        socket.on("active-users", (count) => {
            setActiveUsers(count);
        });

        // Listen for new user connections
        socket.on("new-user", async (ip) => {
            try {
                await axios.post("/api/save-user-ip", { ip }); // Save to database via API route
                toast.success(`New visitor joined IP: ${ip}`, { duration: 3000 });
            } catch (error) {
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center justify-center">
                <h2 className="w-2 h-2 border-green-500 p-0.5 bg-green-500 rounded-full"></h2>
                <h2 className="text-xs ml-1">{`Active Visitors: ${activeUsers > 0 ? activeUsers : "fetching from render..."}`}</h2>
            </div>
        </div>
    );
}