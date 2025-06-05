"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import SpotifyPlayer from "@/components/ui/SpotifyLastFmWidget";
import fetchCodeforcesStats from "../utils/codeforcesApi";
import fetchCodechefStats from "../utils/codechefApi";
import { CardTechStack } from "@/components/ui/card";
import axios from "axios";
import Footer from "@/components/ui/Footer";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/ui/Header";
import HvCursiveAnimated from "@/components/ui/HvCursiveAnimated";
import GridItem from "@/components/ui/GridItem";
import { useIsPlaying } from "./store/useVisitorStore.ts";

// api utility to fetch all the data from different coding platforms
const fetchDataTanStack = async () => {
  const [cf, cc, gh, lc, gfg, li] = await Promise.all([
    fetchCodeforcesStats("himanshu_ver"),
    fetchCodechefStats("hvin8"),
    axios.get("/api/github/himanshuverma8"),
    axios.get("/api/leetcode/himanshuverma8"),
    axios.get("/api/gfg/himanshu_ver"),
    axios.get("/api/linkedin")
  ]);
  return {
    codeforcesData: cf,
    codechefData: cc,
    githubData: gh.data,
    leetCodeData: lc.data,
    gfgData: gfg.data,
    linkedinData: li.data
  };
};

//using ReactTanStack query to make ultra fast page reloads and local storage caching and in memory caching.

export default function Page() {
  const { data, error, isLoading: loading } = useQuery({
    queryKey: ['all-stats'],
    queryFn: fetchDataTanStack
  });
    const makeSpotifyFirst = useIsPlaying((state)=>state.isPlaying); 

  const { codechefData, codeforcesData, githubData, leetCodeData, gfgData, linkedinData } = data || {};
 console.log(linkedinData);
   //loading animation

  if (loading) {
    return (
      <BackgroundBeamsWithCollision>
        <HvCursiveAnimated />
      </BackgroundBeamsWithCollision>
    );
  }
  //the spotify playing widget i created when i see that discord has this feature i thought of implementing this in my project
  //the hv cursive animation is created using svg path animation using gsap i used text to svg converter to get the svg path for both the letters and then animated it using gsap i got to see this animation in anime js library from there i thought to create this
  //the grid layout is created using the components of https://ui.aceternity.com/components i have modified them according to my usecase and added custom params and value for populating it in the ui
  //every grid item accepts a area to define the grid layout iconsrc for src of the icons used in the grid title for title and href for the profile link of th respective platform 
  //the data param accepts an array of objects just to populate the values in grid item component using map method to reduce the code repetation
  //makeSpotifyFirst is a global state variable created using zustand to track if a song is playing and dynamically render the spotify grid at the top if song is playing also show infinite circular animation while song is playing
  // the variable is also used to apply dynamic css to the container to make it responsive.
  const spotifyPT = makeSpotifyFirst ? "pt-24" : "pt-10";
  const mainGridPT = makeSpotifyFirst? "pt-8 md:pt-20 lg:pt-24": "pt-24";
  const spotifyTitle = makeSpotifyFirst ? "SpotifyPlaying" : "Spotify";
  // Main Grid
  const MainGrid = (
    <ul className={`${mainGridPT} grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2`}>
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        iconsrc="https://files.hvin.tech/github.svg"
        linkhref="https://github.com/himanshuverma8"
        title="Github"
        data={[
          { heading: "Username:", description: "himanshuverma8" },
          { heading: "Followers:", description: githubData ? githubData.followers : "fetching from api..." },
          { heading: "Following:", description: githubData ? githubData.following : "fetching from api..." },
          { heading: "Repos:", description: githubData ? githubData.publicRepos + githubData.privateRepos : "fetching from api..." },
          { heading: "Recent Updated Repo:", description: githubData ? githubData.recentRepo : "fetching from api..." },
          { heading: "Total Commits:", description: githubData ? githubData.totalCommits : "fetching from api..." },
          {
            heading: "Recent Commit:",
            description: githubData
              ? `${githubData.recentCommit} (${dayjs(githubData.recentCommitTime).fromNow()})`
              : "fetching from api..."
          }
        ]}
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        iconsrc="https://files.hvin.tech/codechef.png"
        title="Codechef"
        linkhref="https://www.codechef.com/users/hvin8"
        data={[
          { heading: "Username:", description: "hvin8" },
          { heading: "MaxRating:", description: codechefData ? codechefData.maxRating : "fetching from api..." },
          { heading: "Last Contest:", description: codechefData ? `${codechefData.lastContest} (${dayjs(codechefData.lastContestTime).fromNow()})` : "fetching from api..." },
          { heading: "Best Rank:", description: codechefData ? `${codechefData.bestRankWithContest} ` : "fetching from api..." }
        ]}
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        iconsrc="https://files.hvin.tech/codeforces.png"
        linkhref="https://codeforces.com/profile/himanshu_ver"
        title="Codeforces"
        data={[
          { heading: "Username:", description: "himanshu_ver" },
          { heading: "MaxRating:", description: codeforcesData ? codeforcesData.maxRatingWithRank : "api error..." },
          { heading: "Solved:", description: codeforcesData ? codeforcesData.totalSolved : "api error..." },
          { heading: "Friends Of:", description: codeforcesData ? codeforcesData.friendsCount : "api error..." },
          { heading: "Best Rank:", description: codeforcesData ? `${codeforcesData.bestRank} | ${codeforcesData.bestContest}` : "fetching from api..." },
          { heading: "Last Submission:", description: codeforcesData ? `${codeforcesData.lastSubmission.title} (${dayjs(codeforcesData.lastSubmission.timestamp).fromNow()})` : "fetching from api..." }
        ]}
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        iconsrc="https://files.hvin.tech/linkedin.png"
        linkhref="https://www.linkedin.com/in/himanshuver/"
        title="Linkedin"
        data={[
          { heading: "Username:", description: linkedinData ? linkedinData.username : "api error"},
          { heading: "Followers:", description: linkedinData ? linkedinData.followers : "api error" },
          { heading: "Connections:", description: linkedinData ? linkedinData.connections : "api error" },
          { heading: "About:", description: linkedinData ? linkedinData.about : "api error" }
        ]}
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        iconsrc="https://files.hvin.tech/gfg.png"
        linkhref="https://www.geeksforgeeks.org/user/himanshu_ver/"
        title="GFG"
        data={[
          { heading: "Username:", description: "himanshu_ver" },
          { heading: "Solved:", description: gfgData ? gfgData.totalProblemsSolved : "fetching from api..." },
          { heading: "MaxStreak:", description: gfgData ? gfgData.currentStreak : "fetching from api..." },
          { heading: "Coding Score:", description: gfgData ? gfgData.codingScore : "fetching from api..." }
        ]}
      />
    </ul>
  );

  // LeetCode grid
  const LeetCodeGrid = (
    <ul className="pt-10 grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-4 xl:max-h-[34rem]">
      <GridItem
        area="md:[grid-area:1/1/2/13] xl:[grid-area:1/1/2/13]" // Occupies all 12 columns
        iconsrc="https://files.hvin.tech/leetcode.png"
        linkhref="https://leetcode.com/himanshuverma8/"
        title="LeetCode"
        data={[
          { heading: "Username:", description: "himanshuverma8" },
          { heading: "MaxRating:", description: leetCodeData ? leetCodeData.maxRating : "fetching from api..." },
          { heading: "Solved:", description: leetCodeData ? leetCodeData.solvedString : "fetching from api..." },
          { heading: "Top%:", description: leetCodeData ? leetCodeData.topPercentage : "fetching from api..." },
          {
            heading: "Last Submission:",
            description: leetCodeData ? `${leetCodeData.lastSubmission} (${dayjs.unix(leetCodeData.lastSubmissionTime).fromNow()})` : "fetching from api..."
          }
        ]}
      />
    </ul>
  );

  // Spotify grid
  const SpotifyGrid = (
    <ul className={`${spotifyPT} grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-4 xl:max-h-[34rem]`}>
      <GridItem
        area="md:[grid-area:1/1/2/13] xl:[grid-area:1/1/2/13]" // Occupies all 12 columns
        iconsrc="https://files.hvin.tech/spotify.svg"
        linkhref="https://open.spotify.com/playlist/1VgdBB6b6ule86Qmdp1jYz"
        title={spotifyTitle}
        data={[
          { heading: "", description: <SpotifyPlayer /> }
        ]}
      />
    </ul>
  );

  // Conditional rendering: Spotify at top or bottom
  return (
    <>
      <Header />
      <div className="main-container overflow-x-hidden ">
        {makeSpotifyFirst ? (
          <>
            {SpotifyGrid}
            {MainGrid}
            {LeetCodeGrid}
          </>
        ) : (
          <>
            {MainGrid}
            {LeetCodeGrid}
            {SpotifyGrid}
          </>
        )}
        <div className="pt-10 pb-10">
          <CardTechStack />
        </div>
      </div>
      <Footer />
    </>
  );
}