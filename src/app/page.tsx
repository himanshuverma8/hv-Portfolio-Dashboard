"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import SpotifyPlayer from "@/components/ui/SpotifyLastFmWidget";
// import fetchCodeforcesStats from "../utils/codeforcesApi"; // moved to backend route
import { CardTechStack } from "@/components/ui/card";
import axios from "axios";
import Footer from "@/components/ui/Footer";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/ui/Header";
import HvCursiveAnimated from "@/components/ui/HvCursiveAnimated";
import GridItem from "@/components/ui/GridItem";
import { useIsPlaying } from "./store/useVisitorStore.ts";
import LiveTimer from "@/components/ui/LiveTimer";

// api utility to fetch all the data from different coding platforms
const fetchDataTanStack = async () => {
  const [cf, cc, gh, lc, gfg, li] = await Promise.allSettled([
    axios.get("/api/codeforces/himanshu_ver"),
    axios.get("/api/codechef/hvin8"),
    axios.get("/api/github/himanshuverma8"),
    axios.get("/api/leetcode/himanshuverma8"),
    axios.get("/api/gfg/himanshu_ver"),
    axios.get("/api/linkedin")
  ]);
  return {
    codeforcesData: cf.status === 'fulfilled' ? cf.value.data : null,
    codechefData: cc.status === 'fulfilled' ? cc.value.data : null,
    githubData: gh.status === 'fulfilled' ? gh.value.data : null,
    leetCodeData: lc.status === 'fulfilled' ? lc.value.data : null,
    gfgData: gfg.status === 'fulfilled' ? gfg.value.data : null,
    linkedinData: li.status === 'fulfilled' ? li.value.data : null
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
  const spotifyPT = makeSpotifyFirst ? "pt-24 animate-pulse" : "pt-10";
  const mainGridPT = makeSpotifyFirst? "pt-8 md:pt-20 lg:pt-24": "pt-24";
  const spotifyTitle = makeSpotifyFirst ? "SpotifyPlaying" : "Spotify";
  // Main Grid
  const MainGrid = (
    <ul className={`${mainGridPT} grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2`}>
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        iconsrc="https://cdn.hv6.dev/images/logos/github.svg"
        linkhref="https://github.com/himanshuverma8"
        title="Github"
        data={[
          { heading: "Username:", description: "himanshuverma8" },
          { heading: "Followers:", description: githubData ? githubData.followers : "api error" },
          { heading: "Following:", description: githubData ? githubData.following : "api error" },
          { heading: "Repos:", description: githubData ? githubData.publicRepos + githubData.privateRepos : "api error" },
          { heading: "Recent Updated Repo:", description: githubData ? githubData.recentRepo : "api error" },
          { heading: "Total Commits:", description: githubData ? githubData.totalCommits : "api error" },
          {
            heading: "Recent Commit:",
            description: githubData
              ? `${githubData.recentCommit} (${dayjs(githubData.recentCommitTime).fromNow()})`
              : "api error"
          }
        ]}
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        iconsrc="https://cdn.hv6.dev/images/logos/codechef.png"
        title="Codechef"
        linkhref="https://www.codechef.com/users/hvin8"
        data={[
          { heading: "Username:", description: "hvin8" },
          { heading: "MaxRating:", description: codechefData ? codechefData.maxRating : "api error" },
          { heading: "Last Contest:", description: codechefData ? `${codechefData.lastContest} (${dayjs(codechefData.lastContestTime).fromNow()})` : "api error" },
          { heading: "Best Rank:", description: codechefData ? `${codechefData.bestRankWithContest} ` : "api error" }
        ]}
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        iconsrc="https://cdn.hv6.dev/images/logos/codeforces.png"
        linkhref="https://codeforces.com/profile/himanshu_ver"
        title="Codeforces"
        data={[
          { heading: "Username:", description: "himanshu_ver" },
          { heading: "MaxRating:", description: codeforcesData ? codeforcesData.maxRatingWithRank : "api error" },
          { heading: "Solved:", description: codeforcesData ? codeforcesData.totalSolved : "api error" },
          { heading: "Friends Of:", description: codeforcesData ? codeforcesData.friendsCount : "api error" },
          { heading: "Best Rank:", description: codeforcesData ? `${codeforcesData.bestRank} | ${codeforcesData.bestContest}` : "api error" },
          { heading: "Last Submission:", description: codeforcesData ? `${codeforcesData.lastSubmission.title} (${dayjs(codeforcesData.lastSubmission.timestamp).fromNow()})` : "api error" }
        ]}
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        iconsrc="https://cdn.hv6.dev/images/logos/linkedin.png"
        linkhref="https://www.linkedin.com/in/himanshuver/"
        title="Linkedin"
        data={[
          { heading: "Username:", description: linkedinData ? linkedinData.username : "api error"},
          { heading: "Followers:", description: linkedinData ? `${linkedinData.followers} ` : "api error" },
          { heading: "Connections:", description: linkedinData ? `${linkedinData.connections} ` : "api error" },
          { heading: "About:", description: linkedinData ? linkedinData.about : "api error" }
        ]}
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        iconsrc="https://cdn.hv6.dev/images/logos/gfg.png"
        linkhref="https://www.geeksforgeeks.org/user/himanshu_ver/"
        title="GFG"
        data={[
          { heading: "Username:", description: "himanshu_ver" },
          { heading: "Solved:", description: gfgData ? gfgData.totalProblemsSolved : "api error" },
          { heading: "MaxStreak:", description: gfgData ? gfgData.currentStreak : "api error" },
          { heading: "Coding Score:", description: gfgData ? gfgData.codingScore : "api error" }
        ]}
      />
    </ul>
  );

  // LeetCode grid
  const LeetCodeGrid = (
    <ul className="pt-10 grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-4 xl:max-h-[34rem]">
      <GridItem
        area="md:[grid-area:1/1/2/13] xl:[grid-area:1/1/2/13]" // Occupies all 12 columns
        iconsrc="https://cdn.hv6.dev/images/logos/leetcode.png"
        linkhref="https://leetcode.com/himanshuverma8/"
        title="LeetCode"
        data={[
          { heading: "Username:", description: "himanshuverma8" },
          { heading: "MaxRating:", description: leetCodeData ? leetCodeData.maxRating : "api error" },
          { heading: "Solved:", description: leetCodeData ? leetCodeData.solvedString : "api error" },
          { heading: "Top%:", description: leetCodeData ? leetCodeData.topPercentage : "api error" },
          {
            heading: "Last Submission:",
            description: leetCodeData ? `${leetCodeData.lastSubmission} (${dayjs.unix(leetCodeData.lastSubmissionTime).fromNow()})` : "api error"
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
        iconsrc="https://cdn.hv6.dev/images/logos/spotify.svg"
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
      <Header data={data} />
      <LiveTimer />
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