import { useState, useEffect } from "react";
import ColourfulText from "./colourful-text";
import axios from "axios";
import { useVisitorStore } from "@/app/store/useVisitorStore.ts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Footer: React.FC = () => {
  const [uniqueViews, setUniqueViews] = useState<number>(0);
  const { activeUsers } = useVisitorStore();
  const [ipDetails, setIpDetails] = useState<object[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const getUniqueViews = async () => {
      try {
        const response = await axios.get("/api/unique-views");
        setUniqueViews(response.data.totalVisits);
      } catch (error) {
        console.error("Error fetching unique views:", error);
      }
    };

    getUniqueViews();
  }, [activeUsers]);

  useEffect(() => {
    if (isDialogOpen) {
      const fetchIpDetails = async () => {
        try {
          const response = await axios.get("/api/unique-views", {
            params: { fetchIPDetails: true }
          });
          setIpDetails(response.data.ipDetails);
        } catch (error) {
          console.error("Error fetching IP details:", error);
        }
      };

      fetchIpDetails();
    }
  }, [isDialogOpen]);

  return (
    <footer className="flex items-center justify-between bg-transparent w-full mx-auto p-4 dark:bg-transparent shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group">
      <div className="start flex items-center justify-center gap-2">
        <a href="https://www.instagram.com/hv__in/" target="_blank" rel="noopener noreferrer">
        <svg className="m-2 w-5 h-5 text-blue-500 transition-transform duration-200 hover:scale-125 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width='1em' height='1em'><path fill="currentColor" d="M8 0C5.829 0 5.556.01 4.703.048C3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7C.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297c.04.852.174 1.433.372 1.942c.205.526.478.972.923 1.417c.444.445.89.719 1.416.923c.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417c.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046c.78.035 1.204.166 1.486.275c.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485c.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598c-.28.11-.704.24-1.485.276c-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598a2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485c-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486c.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276c.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92a.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217a4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334a2.667 2.667 0 0 1 0-5.334"/></svg>
        </a>
        <a href="https://x.com/hv__in" target="_blank" rel="noopener noreferrer">
          <svg className="m-2 w-5 h-5 text-blue-500 transition-transform duration-200 hover:scale-125" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.8 10.5L20.7 2h-3l-5.3 6.5L7.7 2H1l7.8 11l-7.3 9h3l5.7-7l5.1 7H22zm-2.4 3l-1.4-2l-5.6-7.9h2.3l4.5 6.3l1.4 2l6 8.5h-2.3l-4.9-7Z"/>
          </svg>
        </a>
        <a href="https://discord.com/users/hvin8" target="_blank" rel="noopener noreferrer">
          <svg className="m-2 w-6 h-6 text-blue-500 transition-transform duration-200 hover:scale-125" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011a.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0a8 8 0 0 0-.412-.833a.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02a.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595a.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085a8 8 0 0 1-1.249.594a.05.05 0 0 0-.03.03a.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019a13.2 13.2 0 0 0 4.001-2.02a.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613c0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613c0 .888-.631 1.612-1.438 1.612"/>
          </svg>
        </a>
      </div>
      <div className="middle flex flex-col items-center justify-center">
        <h1 className="text-xs font-bold text-center text-blue-500 relative z-2 font-sans">
          © {new Date().getFullYear()} <ColourfulText text="hv" />
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              className="text-xs text-center text-green-500 hover:cursor-pointer hover:text-red-500"
              onTouchStart={(e) => e.currentTarget.classList.add("text-red-500")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("text-red-500")}
            >
              Unique Views: {uniqueViews>0 ? uniqueViews : "fetching..."}
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                
              </DialogDescription>
            </DialogHeader>

            {/* Scrollable Container */}
            <div className="max-h-[60vh] overflow-y-auto space-y-2">
              {ipDetails.length > 0 ? (
                  ipDetails
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) 
                  .map((ipInfo, index) => (
                  <div key={index} className="border p-2 rounded-md">
                    <p><strong>Time:</strong> {dayjs(ipInfo.createdAt).fromNow()}</p>
                    <p><strong>IP:</strong> {ipInfo.ip}</p>
                    <p><strong>City:</strong> {ipInfo.city}</p>
                    <p><strong>Region:</strong> {ipInfo.region}</p>
                    <p><strong>Country:</strong> {ipInfo.country}</p>
                    <p><strong>Location:</strong> {ipInfo.
location}</p>
                    <p><strong>Org:</strong> {ipInfo.org}</p>
                    <p><strong>Postal Code:</strong> {ipInfo.postalCode}</p>
                    <p><strong>Timezone:</strong> {ipInfo.timezone}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Loading...</p>
              )}
            </div>

            <DialogFooter>
            <button onClick={() => setIsDialogOpen(false)} className="text-sm text-blue-500 hover:text-blue-600 hover:cursor-pointer">
            Close
          </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="end flex items-center justify-center">
        <a href="mailto:hvinprimary@gmail.com"><p className="text-xs text-center text-blue-500 hover:text-blue-600 transition-transform duration-200 hover:scale-115">Collaborate with me!</p></a>
      </div>
    </footer>
  );
};

export default Footer;