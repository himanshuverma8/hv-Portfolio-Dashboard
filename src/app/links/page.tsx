"use client";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import DarkModeButton from "@/components/ui/darkModeButton";
import SpotifyPlayer from "@/components/ui/SpotifyLastFmWidget";
import fetchCodeforcesStats from "../../utils/codeforcesApi";
import fetchCodechefStats from "../../utils/codechefApi";
import fetchGithubStats  from "../../utils/githubApi";
import fetchLeetcodeStats from "../../utils/leetcodeApi";
import fetchGFGStats from "../../utils/gfgApi";
import { Card, CardDemo } from "@/components/ui/cardDemo";
import axios from "axios";
import ActiveVisitors from "@/components/ui/ActiveVisitors";
import Footer from "@/components/ui/Footer";
import { Loader } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import ColourfulText from "@/components/ui/colourful-text";
import { connect } from "@/dbConfig/dbConfig";
import { LinkPreview } from "@/components/ui/link-preview";
import Script from 'next/script';
import LogoAnimation from "@/components/LogoAnimation";
import { animate, createScope, createSpring, createDraggable } from 'animejs';
import AnimatedIcon from "@/components/AnimatedIcon";
export default function GlowingEffectDemoSecond() {

 // console.log(process.env.MONGO_URI);
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [codechefData, setCodechefData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [leetCodeData, setleetCodeData] = useState(null);
  const [gfgData, setgfgData] = useState(null);
  const [loading, setLoading] = useState(true);

  

  
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cf, cc, gh, lc, gfg] = await Promise.all([
          fetchCodeforcesStats("himanshu_ver"),
          fetchCodechefStats("hvin8"),
          axios.get("/api/github/himanshuverma8"),
          axios.get("/api/leetcode/himanshuverma8"),
          axios.get("/api/gfg/himanshu_ver"),
        ]);

        setCodeforcesData(cf);
        setCodechefData(cc);
        setGithubData(gh.data);
        setleetCodeData(lc.data);
        setgfgData(gfg.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
  if (!loading) {
    // Remove/hide the loader element
    const loader = document.getElementById("custom-loader");
    if (loader) loader.remove(); // or loader.remove()
  }
}, [loading]);

  if (loading) {
  return (
    <BackgroundBeamsWithCollision>
      <div id="custom-loader"></div>
      <Script src="https://unpkg.com/gsap@3/dist/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://files.hvin.tech/hvloader.js" strategy="afterInteractive" />
    </BackgroundBeamsWithCollision>
  );
}else{
    document.documentElement.classList.remove("dark");
  } 
  return (
    <div className="main-container overflow-x-hidden ">
     <div className="logo-icon absolute top-5 left-4 w-fit rounded-full border-gray-600 p-0.5">
  <GlowingEffect
    blur={1}
    borderWidth={4}
    spread={80}
    glow={true}
    disabled={false}
    proximity={64}
    inactiveZone={0.01}
  />
   <LogoAnimation/>
  {/* <img 
    src="https://files.hvin.tech/lighting_logo.png" 
    
    alt=""  
    style={{ height: "50px", width: "50px" }}
  /> */}
</div>

         <DarkModeButton style={{ position: 'absolute', top: '20px', right: '16px' }} />
         <ul className="pt-24 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <ActiveVisitors/>
         
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        iconsrc="https://upload.wikimedia.org/wikipedia/commons/a/ae/Github-desktop-logo-symbol.svg"
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
          { heading: "Username:", description: "himanshu_ver" },
          { heading: "Followers:", description: "596" },
          { heading: "Connections:", description: "496" },
          { heading: "About:", description: "Hi, There!! I'm pursuing BTech in Information Technology from Madan Mohan Malaviya University of Technology, Gorakhpur. I'm excited to learn more things related to tech that interest me the most." }
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
      { heading: "Last Submission:", 
        description: leetCodeData ? `${leetCodeData.lastSubmission} (${dayjs.unix(leetCodeData.lastSubmissionTime).fromNow()})` : "fetching from api..." 
      }
    ]}
  />
</ul>
<ul className="pt-10 grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-4 xl:max-h-[34rem]">
  <GridItem
    area="md:[grid-area:1/1/2/13] xl:[grid-area:1/1/2/13]" // Occupies all 12 columns
    iconsrc="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
    linkhref="https://open.spotify.com/playlist/1VgdBB6b6ule86Qmdp1jYz"
    title="Spotify"
    data={[
      { heading: "", description: <SpotifyPlayer /> }
    ]}
  />
</ul>
  <CardDemo />
  <Footer />
    </div>
  );
}

interface GridItemType {
  heading: string | React.ReactNode;
  description: string | React.ReactNode;
}

interface GridItemProps {
  area: string;
  iconsrc: string;
  linkhref: string;
  title: string;
  data: GridItemType[];
}

const GridItem = ({ area, iconsrc,linkhref, title, data }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area} grid-container`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-y-auto rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="relative w-fit rounded-lg border border-gray-600 p-2">
            <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
       <LinkPreview
          url={linkhref} >  
         <AnimatedIcon src={iconsrc} style={{ height: "30px", width: "30px" }} />
          </LinkPreview>
            
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
               <ColourfulText text={title}/>
              </h3>
              {data && data.map((item,index) => 
              (
                <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400" key={index}
              >
                <span className="font-bold">{item.heading}</span> {item.description}
              </h2>
              )
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};