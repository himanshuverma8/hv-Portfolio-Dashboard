import React from 'react'

export const LoadingAnimation = () => {
  return (
    <BackgroundBeamsWithCollision>
      <div className='flex items-center justify-center min-h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
      </BackgroundBeamsWithCollision>
  )
}