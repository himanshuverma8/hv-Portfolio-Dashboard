"use client"
import React, { useState, useEffect } from "react";
import { fetchNowPlaying, fetchRecentTracks } from "../../utils/spotifyService";
import { useIsPlaying } from "@/app/store/useVisitorStore.ts";
import toast, { Toaster } from "react-hot-toast";
interface Song {
  name: string;
  artist: string;
  albumArt: string;
  isPlaying?: boolean;
}

const SpotifyLastFmWidget: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [recentSongs, setRecentSongs] = useState<Song[]>([]);
  // setIsPlaying is use to track if a song is playing or not globally.
  const setIsPlaying = useIsPlaying(state => state.setIsPlaying);
 
  useEffect(() => {
    const loadData = async () => {
      try {
        const nowPlaying = await fetchNowPlaying();
        if (nowPlaying){
          setCurrentSong(nowPlaying);
          if(nowPlaying?.isPlaying){
              toast.success(`hv is playing ${nowPlaying.name} on spotify`)
              setIsPlaying(true);
          }else{
            setIsPlaying(false);
          }
        }
        // type Track = {album: string, albumArt: string, artist: string, name: string, url: string};
        // let recentTracksSet: Set<Track> = new Set();
        const recentTracks = await fetchRecentTracks();
        if(recentTracks){
        //   for(const item of recentTracks){
        //     recentTracksSet.add(item);
        // }
        const uniquerecentTracks = new Map(recentTracks.map(track => [track.url, track]));
        setRecentSongs(Array.from(uniquerecentTracks.values()))
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };
   
    loadData();
    // refresh every 10 secs
    
    const interval = setInterval(loadData, 10*1000); 
    return () => clearInterval(interval);
  }, []);

  console.log(recentSongs);

  return (
    <div className="bg-transparent p-4">
      <h2 className="text-lg font-bold">🎵 Now Playing</h2>

      {currentSong?.isPlaying ? (
        <div className="flex items-center mt-2">
          <img src={currentSong.albumArt} alt="Album Art" className="w-16 h-16 rounded-lg" />
          <div className="ml-3">
            <p className="text-sm font-bold">{currentSong.name}</p>
            <p className="text-xs">{currentSong.artist}</p>
            <span className="text-green-400 text-xs">Now Playing...</span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400">No song is currently playing</p>
      )}

      <h2 className="mt-4 text-lg font-bold">🔄 Recently Played</h2>
      <div className="mt-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <ul className="space-y-2 pr-2">
          {recentSongs.length > 0 ? (
            recentSongs.map((song, index) => (
              <li key={`${song.name}-${song.artist}-${index}`} className="flex items-center">
                <img src={song.albumArt} alt="Album Art" className="w-10 h-10 rounded-md flex-shrink-0" />
                <div className="ml-2 min-w-0 flex-1">
                  <p className="text-sm font-bold truncate">{song.name}</p>
                  <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-400">No recent songs found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SpotifyLastFmWidget;
