import React, { useState, useEffect } from "react";
import { fetchNowPlaying, fetchRecentTracks } from "../../utils/spotifyService";

const SpotifyLastFmWidget: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [recentSongs, setRecentSongs] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const nowPlaying = await fetchNowPlaying();
      setCurrentSong(nowPlaying);

      const recentTracks = await fetchRecentTracks();
      setRecentSongs(recentTracks.slice(0, 2)); // Limit to 3 most recent songs
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-transparent">
      <h2 className="text-lg font-bold">🎵 Now Playing</h2>
      {currentSong ? (
        <div className="flex items-center mt-2">
          <img src={currentSong.albumArt} alt="Album Art" className="w-16 h-16 rounded-lg" />
          <div className="ml-3">
            <p className="text-sm font-bold">{currentSong.name}</p>
            <p className="text-xs">{currentSong.artist}</p>
            {currentSong.isPlaying ? (
              <span className="text-green-400 text-xs">Now Playing...</span>
            ) : (
              <span className="text-green-400 text-xs">Paused</span>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm">No song is playing</p>
      )}

      <h2 className="mt-4 text-lg font-bold">🔄 Recently Played</h2>
      <ul className="mt-2 space-y-2">
        {recentSongs.map((song, index) => (
          <li key={index} className="flex items-center">
            <img src={song.albumArt} alt="Album Art" className="w-10 h-10 rounded-md" />
            <div className="ml-2">
              <p className="text-sm font-bold">{song.name}</p>
              <p className="text-xs">{song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyLastFmWidget;