import * as THREE from 'three'
import { useEffect } from 'react'
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import Link from 'next/link'
import gsap from "gsap";
import Model from "../components/error404/Model"


export default function error404() {
    const overlayRef = useRef(null)
    useEffect(()=>{
        gsap.to(overlayRef.current,{
        opacity:1,
        duration:4
        })
    },[])
  return (
    <div className='w-screen h-screen relative' >
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <Model  />
          <Environment preset="city" />
          <ContactShadows frames={2} scale={8} position={[0, -1, 0]} far={1} blur={5} opacity={0.5} color="#204080" />
        </Canvas>
      </div>
      <div ref={overlayRef} className='absolute top-[34%] left-[15%] opacity-0'>
        <h1 className='font-bold text-6xl'>WHOOPS ERROR 404</h1>
        <h2 className='my-4 text-2xl'>Vous êtes allé trop loin !!!</h2>
        <div className="my-8">
            <Link href={"/"} className='text-lg p-4 bg-green-300 hover:bg-green-200 rounded-md text-white'>
                Retour à l'accueil
            </Link>
        </div>
      </div>
    </div>
  )
}
