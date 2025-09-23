import React from 'react'
import { GlowingEffectInfinite } from './glowing-effect-without-mouse-hover'
import LogoAnimation from './LogoAnimation'
import ActiveVisitors from './ActiveVisitors'
import DarkModeButton from './darkModeButton'
import HeatmapBar from './HeatmapBar'

type Props = {}

const Header = (props: Props) => {
    return (
        <header>
            <div className="logo-icon absolute top-5 left-4 w-fit rounded-full border-gray-600 p-0.5">
                <GlowingEffectInfinite
                    blur={1}
                    borderWidth={4}
                    spread={80}
                    glow={true} 
                />
                <LogoAnimation />
            </div>
            <ActiveVisitors />
            <HeatmapBar />
            <DarkModeButton style={{ position: 'absolute', top: '20px', right: '16px' }} />
        </header>
    )
}

export default Header