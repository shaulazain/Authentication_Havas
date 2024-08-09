import React from 'react'

const userProfile = ({params} : any) => {
  return (
    <div
    className='flex flex-col items-center justify-center py-2 min-h-screen bg-black text-white'
    >
        
        <p>Porn  <span className='p-2 mt-2 bg-orange-500 rounded ml-2 text-black'>{params.id}</span>
        </p>
    </div>
  )
}

export default userProfile