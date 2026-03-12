import Image from 'next/image';
import React from 'react'
interface Props{
    title:string;
    description:string;
    imagesrc?:string;
}
const EmptyState = ({title,description,imagesrc}:Props) => {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
      <Image src={imagesrc || "/empty-state.svg"} alt="Empty State" width={150} height={150} />
      <h2 className='text-2xl font-semibold mt-4'>{title || "No Playgrounds Found"}</h2>
      <p className='text-muted-foreground mt-2'>{description || "Create your first playground to get started!"}</p> 
    </div>
  )
}

export default EmptyState
