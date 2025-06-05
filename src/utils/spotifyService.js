const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
const USERNAME = process.env.NEXT_PUBLIC_LASTFM_USERNAME; 
const API_URL = "https://ws.audioscrobbler.com/2.0/";

/**
 * Fetch currently playing song or the most recently played song.
 */
export const fetchNowPlaying = async () => {
  try {
    const response = await fetch(
      `${API_URL}?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`
    );
    const data = await response.json();

    if (!data.recenttracks || !data.recenttracks.track.length) return null;

    const track = data.recenttracks.track[0]; // Latest track
    const isPlaying = track["@attr"]?.nowplaying === "true"; // Check if currently playing

    return {
      name: track.name,
      artist: track.artist["#text"],
      album: track.album["#text"],
      albumArt: track.image[track.image.length - 1]["#text"], // Get highest resolution image
      url: track.url,
      isPlaying,
    };
  } catch (error) {
    console.error("Error fetching Last.fm data:", error);
    return null;
  }
};

/**
 * Fetch recently played songs (excluding currently playing).
 */
export const fetchRecentTracks = async () => {
  try {
    const response = await fetch(
      `${API_URL}?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=5`
    );
    const data = await response.json();

    if (!data.recenttracks || !data.recenttracks.track.length) return [];

    return data.recenttracks.track
      .filter((track) => !track["@attr"]?.nowplaying) // Exclude currently playing song
      .map((track) => ({
        name: track.name,
        artist: track.artist["#text"],
        album: track.album["#text"],
        albumArt: track.image[track.image.length - 1]["#text"],
        url: track.url,
      }));
  } catch (error) {
    console.error("Error fetching Last.fm data:", error);
    return [];
  }
};
