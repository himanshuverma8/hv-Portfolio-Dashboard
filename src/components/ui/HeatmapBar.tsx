"use client";
import { useMemo } from "react";
import dayjs from "dayjs";

export default function HeatmapBar({data}: {data: any}) {
    // Accept pre-fetched data via props. No API calls here.
    const githubRecent = data?.githubData?.recentCommitTime ?? data?.github?.recentCommitTime;
    const leetcodeRecentUnix = data?.leetCodeData?.lastSubmissionTime ?? Number(data?.leetcode?.lastSubmissionTime);
    const codeforcesRecent = data?.codeforcesData?.lastSubmission?.timestamp ?? data?.codeforces?.lastSubmission?.timestamp;

    const githubDone = useMemo(() => !!githubRecent && dayjs(githubRecent).isSame(dayjs(), "day"), [githubRecent]);
    const leetcodeDone = useMemo(() => !!leetcodeRecentUnix && dayjs.unix(leetcodeRecentUnix).isSame(dayjs(), "day"), [leetcodeRecentUnix]);
    const codeforcesDone = useMemo(() => !!codeforcesRecent && dayjs(codeforcesRecent).isSame(dayjs(), "day"), [codeforcesRecent]);

    const fillPercent = useMemo(() => {
        const total = [githubDone, leetcodeDone, codeforcesDone].filter(Boolean).length;
        return (total / 3) * 100;
    }, [githubDone, leetcodeDone, codeforcesDone]);

    return (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-[260px] md:w-[320px]">
            <div className="w-full h-2 rounded-full bg-zinc-700/50 overflow-hidden">
                <div
                    className={`h-full bg-green-500 transition-all duration-500 ${fillPercent === 100 ? "hv-blink" : ""}`}
                    style={{ width: `${fillPercent}%` }}
                />
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-400">
                <span className={leetcodeDone ? "text-green-400" : ""}>LeetCode</span>
                <span className={githubDone ? "text-green-400" : ""}>GitHub</span>
                <span className={codeforcesDone ? "text-green-400" : ""}>Codeforces</span>
            </div>
            <style jsx>{`
                @keyframes hvBlink {
                    0% { opacity: 1; }
                    50% { opacity: 0.4; }
                    100% { opacity: 1; }
                }
                .hv-blink { animation: hvBlink 1.2s ease-in-out infinite; }
            `}</style>
        </div>
    );
}


