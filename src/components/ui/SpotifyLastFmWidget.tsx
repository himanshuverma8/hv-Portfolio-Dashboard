import React, { useState, useEffect } from "react";
import { fetchNowPlaying, fetchRecentTracks } from "../../utils/spotifyService";

interface Song {
  name: string;
  artist: string;
  albumArt: string;
  isPlaying?: boolean;
}

const SpotifyLastFmWidget: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [recentSongs, setRecentSongs] = useState<Song[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const nowPlaying = await fetchNowPlaying();
        if (nowPlaying) setCurrentSong(nowPlaying);

        const recentTracks = await fetchRecentTracks();
        if (recentTracks) setRecentSongs(recentTracks.slice(0, 3));
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    loadData();
    const interval = setInterval(loadData, 3000); 
    return () => clearInterval(interval);
  }, []);

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
      <ul className="mt-2 space-y-2">
        {recentSongs.length > 0 ? (
          recentSongs.map((song, index) => (
            <li key={index} className="flex items-center">
              <img src={song.albumArt} alt="Album Art" className="w-10 h-10 rounded-md" />
              <div className="ml-2">
                <p className="text-sm font-bold">{song.name}</p>
                <p className="text-xs">{song.artist}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-400">No recent songs found</p>
        )}
      </ul>
    </div>
  );
};

export default SpotifyLastFmWidget;
