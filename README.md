# 🌟hv's Portfolio Dashboard  

**Optimizations, Fixes And Improvements With Time**:

1. Initially I used to fetch all the IPs from the IP API, which led to a very high number of API calls. I reached the monthly limit, so I decided to save all the IPs in the MongoDB database with all details. Now the API call is only for the IP which doesn't exist.
2. When there were a lot of IPs saved in the DB (like more than 600), it used to take more than 1 to 2 sec to fetch all the IPs. To optimize this I used Redis caching and pagination logic to fetch only the 100 most recent IPs and the remaining from MongoDB. Now it takes much less time.
3. Initially it used to take more than 2sec to 4 secs to fetch all the details from different coding platforms using axios. On every reload it took a lot of time to show the page. So I used React TanStack Query persist storage method to cache the details in local storage and memory, which makes page reload and API fetching ultra fast (now it takes less than 100ms).
4. I also implemented conditional component rendering and animation based on if, in real time, a song is playing from Spotify. If it is playing, the Spotify grid component will automatically shift to the top, with infinite circular animation and animate-pulse while a song is playing. When the song is stopped, the component goes down to its original position.
5. I also faced an issue of infinite reload, which was occurring because I was trying to render a loading screen when the data from the APIs is being fetched using React TanStack Query but as i was using the header children and footer in layout.tsx and the query is being used in the children component but if i want to know if it is fetched or not i need to keep track of isLoading in the layout but if i render the loading screen without children how i will access the isLoding state as child is not rendered and QueryClient Provider need to be wrapped outside the child. how it is possible if child is not rendered to get the isLoding state i solved this issue by rendering the loading screen in the child itself instead of layout.tsx but due to this i need to transfer the header and footer from layout.tsx to page.tsx.

---

The UI is created using **Aceternity UI** and **shadcn** components. I have modified the UI and params according to my use case.

---



An interactive, visually appealing **personal dashboard** that dynamically fetches and displays statistics from **competitive programming platforms, GitHub, LinkedIn, and Spotify**. Designed with **Next.js, React, Tailwind CSS**, this project features **real-time updates, a glowing UI, and dark mode support**.  

## 🚀 Features

- ✅ **Live Competitive Programming Stats** (Codeforces, CodeChef, LeetCode, GeeksforGeeks)  
- ✅ **GitHub Insights** (Followers, Repositories, Activity)  
- ✅ **LinkedIn Profile Overview**  
- ✅ **Spotify Realtime Now Playing Widget And Recent Played Songs** 🎵  
- ✅ **Glowing UI Effects Using Aceternity** for a futuristic feel  
- ✅ **Dark Mode Toggle** 🌙  
- ✅ **Real-time Active Visitors Count Using Websocket(Socket.IO)**  
- ✅ **Redis Caching For Instant Look Up Of Ips and Pagination**  
- ✅ **ReactTanStack Query For Ultra Fast Page Reloads And Caching**  
- ✅ **SVG Path Animation Using GSAP On LoadinScreen**  
- ✅ **AnimeJS For creating bouncy, draggable and rotating animations on logo and grid icons**


## 📸 Preview  

**Dashboard Screenshot**  
![Dashboard Screenshot](https://res.cloudinary.com/de5vcnanx/image/upload/v1750172587/Screenshot_2025-06-17_at_8.31.58_PM_talvnl.png)  

**Spotify Live Playing**  
![Spotify live playing](https://res.cloudinary.com/de5vcnanx/image/upload/v1750173323/Screenshot_2025-06-17_at_8.42.38_PM_zqj6po.png)
![Spotify live playing](https://res.cloudinary.com/de5vcnanx/image/upload/v1750173323/Screenshot_2025-06-17_at_8.42.43_PM_w1rr9d.png)

**IP List View**  
![ip list](https://res.cloudinary.com/de5vcnanx/image/upload/v1750173345/Screenshot_2025-06-17_at_8.44.23_PM_fo9rnk.png)
![ip list](https://res.cloudinary.com/de5vcnanx/image/upload/v1750173541/Screenshot_2025-06-17_at_8.44.51_PM_tauoax.png)
![ip list](https://res.cloudinary.com/de5vcnanx/image/upload/v1750173541/Screenshot_2025-06-17_at_8.43.36_PM_app8dh.png)

**Mobile Preview**  
<img src="https://res.cloudinary.com/de5vcnanx/image/upload/v1750711321/photo_6253454967339862813_w_urdnln.jpg" alt="Mobile Screenshot 1" width="200" />
<img src="https://res.cloudinary.com/de5vcnanx/image/upload/v1750711321/photo_6253454967339862812_w_ho0waw.jpg" alt="Mobile Screenshot 2" width="200" />

**iPad Preview**  
<img src="https://res.cloudinary.com/de5vcnanx/image/upload/v1750711320/photo_6253454967339862810_y_b3wlt5.jpg" alt="iPad Screenshot 1" width="250" />
<img src="https://res.cloudinary.com/de5vcnanx/image/upload/v1750711321/photo_6253454967339862811_y_1_zxru8p.jpg" alt="iPad Screenshot 2" width="250" />

---

## 🎬 Video Walkthrough

[![Dashboard Video Walkthrough](https://res.cloudinary.com/de5vcnanx/image/upload/v1750172587/Screenshot_2025-06-17_at_8.31.58_PM_talvnl.png)](https://res.cloudinary.com/de5vcnanx/video/upload/v1750171849/document_6235648955892374043_lycmxt.mp4)
- **Click the image above or [watch the walkthrough video here](https://res.cloudinary.com/de5vcnanx/video/upload/v1750171849/document_6235648955892374043_lycmxt.mp4).**
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
