import { GlowingEffect } from "./glowing-effect";
import { GlowingEffectInfinite } from "./glowing-effect-without-mouse-hover";
import { LinkPreview } from "./link-preview";
import AnimatedIcon from "./AnimatedIcon";
import ColourfulText from "./colourful-text";
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
    const isSpotifyPlaying = (title==="SpotifyPlaying");
  return (
    <li className={`min-h-[14rem] list-none ${area} grid-container`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        {isSpotifyPlaying ? <GlowingEffectInfinite
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
        /> : <GlowingEffect 
             blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />}
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-y-auto rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="relative w-fit rounded-lg border border-gray-600 p-2">
            <GlowingEffectInfinite
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
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

export default GridItem;