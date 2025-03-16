"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

// Function to check if the URL is a Spotify playlist
const isSpotifyPlaylist = (url: string) => {
  return /https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+/.test(url);
};

// Function to extract the Spotify playlist ID
const getSpotifyEmbedUrl = (url: string) => {
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
  return match ? `https://open.spotify.com/embed/playlist/${match[1]}` : "";
};

export const LinkPreview = ({
  children,
  url,
  className,
  width = 400,
  height = 250,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if the URL is a Spotify playlist
  const isSpotify = isSpotifyPlaylist(url);
  const spotifyEmbedSrc = isSpotify ? getSpotifyEmbedUrl(url) : "";

  let src;
  if (!isStatic && !isSpotify) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
      "viewport.device": "desktop",
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: any) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Subtle effect
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted && !isSpotify ? (
        <div className="hidden">
          <Image
            src={src}
            width={width}
            height={height}
            quality={quality}
            layout={layout}
            priority={true}
            alt="hidden image"
          />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => setOpen(open)}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="shadow-xl rounded-xl"
                style={{ x: translateX }}
              >
                <Link
                  href={url}
                  className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                >
                  {isSpotify ? (
                    // Spotify Embed
                    <iframe
                      src={spotifyEmbedSrc}
                      width={width}
                      height={height+140}
                      frameBorder="0"
                      allow="encrypted-media"
                      className="rounded-lg"
                    ></iframe>
                  ) : (
                    // Normal Image Preview (Microlink Screenshot)
                    <Image
                      src={isStatic ? imageSrc : src}
                      width={width}
                      height={height}
                      quality={quality}
                      layout={layout}
                      priority={true}
                      className="rounded-lg"
                      alt="preview image"
                    />
                  )}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};
