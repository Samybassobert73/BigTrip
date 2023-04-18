import React from 'react'
import { GroupProps, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import Avion from './Avion'
import Earth from './Earth'
import { Group } from 'three'

type cursor = {
  x:number,
  y:number,
} 

function Model() {

  //Ref
  const earthRef = useRef<Group>(null!)
  const avionRef = useRef<Group>(null!)

  // Paralax
  let cursor:cursor = {
    x:0,
    y:0
  }
  window.addEventListener('mousemove', (event) =>
  {
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = event.clientY / window.innerHeight - 0.5
  })
 
  //Animation
  useFrame((state, delta) =>
    {   
      state.camera.position.x =  cursor.x * 0.2
      state.camera.position.y = - cursor.y * 0.2
      earthRef.current.rotation.y += delta * 0.1
      avionRef.current.rotation.y += -delta * 0.3
      avionRef.current.rotation.x +=  -delta * 0.005
      avionRef.current.children[0].rotation.z =  Math.sin(state.clock.getElapsedTime())*0.3
      avionRef.current.children[0].position.x =  2 + Math.sin(state.clock.getElapsedTime())*0.05 
    })

  return (
    <>
      <group ref={avionRef } position={[1.5, 0.2, 0]} dispose={null}>
        <Avion/>
      </group>
      <group ref={ earthRef }  position={[1.5, 0.2, 0]} dispose={null}>
        <Earth/>
      </group>
    </>
    
  )
}

export default Model