"use client";
import { useEffect, useState } from "react";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
//import {CardDemo} from "@/components/ui/cardDemo";
import DarkModeButton from "@/components/ui/darkModeButton";
import SpotifyPlayer from "@/components/ui/SpotifyLastFmWidget";
import fetchCodeforcesStats from "../../utils/codeforcesApi";
import fetchCodechefStats from "../../utils/codechefApi";
import fetchGithubStats  from "../../utils/githubApi";
import fetchLeetcodeStats from "../../utils/leetcodeApi";
import { Card, CardDemo } from "@/components/ui/cardDemo";
import axios from "axios";

export default function GlowingEffectDemoSecond() {
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [codechefData, setCodechefData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [leetCodeData, setleetCodeData] = useState(null);
  useEffect(() => {
    const fetchCodeforcesData = async () => {
      const data = await fetchCodeforcesStats("himanshu_ver");
      setCodeforcesData(data); // Update state to trigger re-render
    };

    fetchCodeforcesData();
  }, []);
  useEffect(() => {
    const fetchCodechefData = async () => {
      const data = await fetchCodechefStats("hvin8");
      setCodechefData(data); // Update state to trigger re-render
    };

    fetchCodechefData();
  }, []);
  useEffect(() => {
    const fetchGithubData = async () => {
      const data = await fetchGithubStats("himanshuverma8");
      setGithubData(data); // Update state to trigger re-render
    };

    fetchGithubData();
  }, []);
  useEffect(() => {
    const fetchLeetCodeData = async () => {
      const response = await axios.get("/api/leetcode/himanshuverma8");
      const data = response.data;
      setleetCodeData(data); // Update state to trigger re-render
    };

    fetchLeetCodeData();
  }, []);
  console.log(leetCodeData);
  return (
    <div className="main-container">
     <div>
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
  <img 
    src="https://files.hvin.tech/lighting_logo.png" 
    alt=""  
    style={{ height: "50px", width: "50px" }}
  />
</div>


         <DarkModeButton style={{ position: 'absolute', top: '20px', right: '16px' }} />
         <ul className="pt-24 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        iconsrc="https://files.hvin.tech/linkedin.png"
        linkhref="https://www.linkedin.com/in/himanshuver/"
        title="Linkedin"
        heading1="Username:"
        description1="himanshu_ver"
        heading2="Followers:"
        description2="595"
        heading3="Connections:"
        description3="494"
         heading4="About:"
        description4="Hi, There!!
I'm pursuing Btech in Information Technology branch from Madan Mohan Malaviya University of Technology, Gorakhpur.
I'm excited to learn more things related to tech that interest me the most."
       heading5=""
       description5=""
      />
 
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        iconsrc="https://files.hvin.tech/codechef.png"
        title="Codechef"
        linkhref=""
        heading1="Username:"
        description1="hvin8"
        heading2="MaxRating:"
        description2={codechefData ? codechefData.maxRating : "fetching from api.."}
        heading3="Last Contest:"
        description3={codechefData ? codechefData.lastContest : "fetching from api.."}
        heading4="Best Rank:"
        description4={codechefData ? codechefData.bestRankWithContest : "fetching from api.."}
        heading5=""
        description5=""
      />
 
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        iconsrc="https://files.hvin.tech/codeforces.png"
        linkhref=""
        title="Codeforces"
        heading1="Username:"
        description1="himanshu_ver"
        heading2="MaxRating:"
        description2={codeforcesData ? codeforcesData.maxRatingWithRank : "fetching from api..."} // Ensuring it doesn't break
        heading3="Solved:"
        description3="517"
        heading4="Friends Of:"
        description4="13"
        heading5="Best Rank:"
        description5={codeforcesData ? `${codeforcesData.bestRank} | ${codeforcesData.bestContest}` : "fetching from api..."}

      />
 
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        iconsrc="https://upload.wikimedia.org/wikipedia/commons/a/ae/Github-desktop-logo-symbol.svg"
        linkhref="https://github.com/himanshuverma8"
        title="Github"
        heading1="Username:"
        description1="himanshuverma8"
        heading2="Followers:"
        description2={githubData ? githubData.followers : "fetching from api..."}
        heading3="Following:"
        description3={githubData ? githubData.following : "fetching from api..."}
        heading4="Repos:"
        description4={githubData ? githubData.publicRepos : "fetching from api..."}
        heading5="Recent Updated Repo:"
        description5={githubData ? githubData.recentRepo : "fetching from api..."}
    
      />
 
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        iconsrc="https://files.hvin.tech/gfg.png"
        linkhref="https://www.geeksforgeeks.org/user/himanshu_ver/"
        title="GFG"
        heading1="Username:"
        description1="himanshu_ver"
        heading2="MaxRating:"
        description2="null"
        heading3="Solved:"
        description3="264"
        heading4="Coding Score:"
        description4="13"
        heading5="Streak:"
        description5="13"
      />
    </ul>
    <ul className="pt-10 grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-4 xl:max-h-[34rem]">
  <GridItem
    area="md:[grid-area:1/1/2/13] xl:[grid-area:1/1/2/13]" // Occupies all 12 columns
    iconsrc="https://files.hvin.tech/leetcode.png"
    title="LeetCode"
    heading1="Username:"
    description1="himanshuverma8"
    linkhref="https://www.geeksforgeeks.org/user/himanshu_ver/"
    heading2="MaxRating:"
    description2={leetCodeData ? leetCodeData.maxRating : "fetching from api..."}
    heading3="Solved:"
    description3={leetCodeData ? leetCodeData.solvedString : "fetching from api..."}
    heading4="Top%:"
    description4={leetCodeData ? leetCodeData.topPercentage : "fetching from api..."}
    heading5="Last Submission:"
    description5={leetCodeData ? leetCodeData.lastSubmission : "fetching from api..."}
  />
</ul>
<ul className="pt-10 grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-4 xl:max-h-[34rem]">
  <GridItem
    area="md:[grid-area:1/1/2/13] xl:[grid-area:1/1/2/13]" // Occupies all 12 columns
    iconsrc="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
    linkhref="https://open.spotify.com/playlist/1VgdBB6b6ule86Qmdp1jYz"
    title="Spotify"
    heading1={<SpotifyPlayer />}
    description1=""
    heading2=""
    description2=""
    heading3=""
    description3=""
    heading4=""
    description4=""
    heading5=""
    description5=""
  />
</ul>
     </div>

  <CardDemo />
    </div>
  );
}

interface GridItemProps {
  area: string;
  iconsrc: string;
  linkhref: string;
  title: string;
  description1: React.ReactNode;
  description2: React.ReactNode;
  description3: React.ReactNode;
  description4: React.ReactNode;
  description5: React.ReactNode;
  heading1: React.ReactNode;
  heading2: React.ReactNode;
  heading3: React.ReactNode;
  heading4: React.ReactNode;
  heading5: React.ReactNode;
}

const GridItem = ({ area, iconsrc,linkhref, title, heading1,heading2,heading3,heading4,heading5, description1, description2, description3, description4, description5 }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
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
            <a href={linkhref} target="_blank"> <img src={iconsrc} alt=""  style={{ height: "30px", width: "30px" }}/></a>
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
                <span className="font-bold">{heading1}</span> {description1}
              </h2>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
               <span className="font-bold">{heading2}</span> {description2}
              </h2>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
               <span className="font-bold">{heading3}</span> {description3}
              </h2>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
               <span className="font-bold">{heading4}</span> {description4}
              </h2>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
               <span className="font-bold">{heading5}</span> {description5}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
