import React from 'react'
import { useGLTF } from '@react-three/drei'

type GLTFResult = {
  nodes?:any,
  materials?:any
}

function Earth() {

  const { nodes, materials}: GLTFResult  = useGLTF('/models/earth.gltf')
  return (
    <>
      <mesh geometry={nodes['URF-Height_Lampd_Ice_0'].geometry} material={materials.Lampd_Ice} />
      <mesh geometry={nodes['URF-Height_watr_0'].geometry} material={materials.watr} material-roughness={0} />
      <mesh geometry={nodes['URF-Height_Lampd_0'].geometry} material={materials.Lampd} material-color="lightgreen"/>
    </>
  )
}
export default Earth