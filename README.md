# 🌟hv's Portfolio Dashboard  

**Optimizations, Fixes And Improvements With Time**:
1.initially i use to fetch all the ips from the ip api which leads to very high number of api calls i reached the monthly limit so i think of saving all the ips in the mongo db database with all details and the api call is now only for the ip which doesn't exist.
2.when there were a lot of ips saved in the db like more than 600ips it use to take more than 1 to 2 sec to fetch all the ips to optimize this i used redis caching and pagination logic to only fetch the 100 most recent ips and remaining from mongo db now its takes very less time.
3.initally it use to take more than 2sec to 4 secs to fetch all the details from diffrerent coding platforms using axios get method hence on every reload it takes a lot of time to show the page hence i used react tanstack query persist storage method to cache the details in local storage and in memory which makes the page reload and api fetching ultra fast like now it takes less than 100ms 
4.i also implemented conditional component rendering and animation based on if in real time the song is playing from spotify if it is playing the spotify grid component will automatically shift at the top with infinite circulat animation and animate-pulse while song is playing when the song is stopped the component goes down to its orignal position.
5.i also faced an issuse of infinite reload which was occuring because i was trying to render a loading screen when the data from the apis are being fetched using the react tanstack query but the issue is that need to re
ui by **https://ui.aceternity.com/components**

the ui is created using **aceternity ui** and **shadcn** components i have modified the ui and params aq to my use case.




An interactive, visually appealing **personal dashboard** that dynamically fetches and displays statistics from **competitive programming platforms, GitHub, LinkedIn, and Spotify**. Designed with **Next.js, React, Tailwind CSS**, this project features **real-time updates, a glowing UI, and dark mode support**.  

## 🚀 Features

✅ **Live Competitive Programming Stats** (Codeforces, CodeChef, LeetCode, GeeksforGeeks)  
✅ **GitHub Insights** (Followers, Repositories, Activity)  
✅ **LinkedIn Profile Overview**  
✅ **Spotify Realtime Now Playing Widget And Recent Played Songs** 🎵  
✅ **Glowing UI Effects Using Aceternity** for a futuristic feel  
✅ **Dark Mode Toggle** 🌙  
✅ **Real-time Active Visitors Count Using Websocket(Socket.IO)**  
✅ **Redis Caching For Instant Look Up Of Ips and Pagination** 
✅ **ReactTanStack Query For Ultra Fast Page Reloads And Caching** 
✅ **SVG Path Animation Using GSAP On LoadinScreen** 
✅ **AnimeJS For creating bouncy, draggable and rotating animations on logo and grid icons** 
---

## 📸 Preview  

![Dashboard Screenshot](https://files.hvin.tech/hv-s-Portfolio-Dashboard.png)  

---

## 🛠️ Tech Stack  

- **Frontend:** React, Next.js, Tailwind CSS.  
- **UI Components:** Lucide Icons, Framer Motion.  
- **API Integration:** Axios, Custom Fetch Functions.
- **Real-time Active Visitors:** Express,NodeJS,SocketIO.

---

This project fetches data using the following APIs:

- **Codeforces API**  
- **CodeChef API**  
- **LeetCode API** (via custom `/api/leetcode` route)  
- **GeeksforGeeks API**  
- **GitHub API**  
- **Spotify API(last.fm)**  
