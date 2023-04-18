import React from 'react'
import { AiFillStar } from "react-icons/ai";
type props = {
    numStars:number
}
export default function StarRating({numStars}:props) { 
    console.log(numStars) 
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(<AiFillStar key={i} />);
    }
    console.log(stars)
    return <div className='flex text-yellow-300 mb-4'>{stars}</div>;
}
