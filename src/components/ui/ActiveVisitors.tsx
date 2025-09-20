"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import axios from "axios";
import { useVisitorStore } from "@/app/store/useVisitorStore.ts";
import { generateUserId, getUserToken, setUserToken, isValidUUID } from "@/utils/userTokenManager";

export default function ActiveVisitors() {
    const {activeUsers, setActiveUsers} = useVisitorStore();

    // Function to handle user identification and database saving
    const handleUserVisit = async (ip: string) => {
        try {
            // Get existing user token from browser
            let userId = getUserToken();
            let isNewUser = false;
            
            // Check if token exists and is valid
            if (!userId || !isValidUUID(userId)) {
                // Generate new UUID if no valid token exists
                userId = generateUserId();
                setUserToken(userId);
                isNewUser = true;
            }

            // Check if user exists in database
            const checkResponse = await axios.get(`/api/user-token?userId=${userId}`);
            
            if (checkResponse.data.success && checkResponse.data.exists) {
                // User exists in DB - update visit
                await axios.post("/api/user-token", { 
                    userId,
                    locationData: {} // You can add location data here if needed
                });
                toast.success(`Welcome back!`, { duration: 2000 });
            } else {
                // User doesn't exist in DB - create new user
                await axios.post("/api/user-token", { 
                    userId,
                    locationData: {} // You can add location data here if needed
                });
                
                // Only save IP for new users
                if (isNewUser) {
                    await axios.post("/api/save-user-ip", { ip });
                }
                
                toast.success(`New visitor joined!`, { duration: 3000 });
            }
        } catch (error) {
            // Silent fail
        }
    };

    useEffect(() => {
        const socket = io("https://real-time-active-visitors-count-backend.onrender.com/", { transports: ["websocket"] });

        // Listen for active users count
        socket.on("active-users", (count) => {
            setActiveUsers(count);
        });

        // Listen for new user connections - use the handleUserVisit function
        socket.on("new-user", (ip) => handleUserVisit(ip));

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