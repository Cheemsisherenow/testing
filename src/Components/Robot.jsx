import React from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { pPositions } from "../Constants"
import {useRef, Suspense, useState} from "react"
import { MotionPathPlugin } from "gsap/all"
import {Canvas} from "@react-three/fiber"
import Gear1 from "./models/Gear1"
import Gear2 from "./models/Gear2"
import { PresentationControls, Html, OrbitControls, Box } from '@react-three/drei';
import Lights from "./models/Lights"
import Tiltcard from './Tiltcard'
import clsx from 'clsx'
import { cards } from '../Constants/card'

const Robot = () => {

    const [canvasReady, setCanvasReady] = useState()
    const [counter, setCounter] = useState(0);
    const [number, setNumber] = useState(0);
    const timelineRef = useRef(null);
    const groupRef = useRef(null);
    const handleClickNext = () => {
        if(counter < 5){
            const nextProgress = (counter+1);
            console.log(nextProgress)
            const timeline = timelineRef.current;
            timeline.tweenTo(nextProgress, {duration: 1, ease: "power4.inOut"});
            setCounter(counter+1)
            setNumber(number+2)
            console.log("hi")
        }
    }
    const handleClickBack = () => {
        if(counter >= 0){
            const prevProgress = (counter-1);
            const timeline = timelineRef.current;
            timeline.tweenTo(prevProgress, {duration: 1, ease: "power4.inOut"});
            setCounter(counter-1)
            setNumber(number-2)
            console.log("hi")
        }
    }
    useGSAP(()=>{
        const timeline = gsap.timeline({
            paused: true,
            
        });
        if (canvasReady && groupRef){
        timeline.fromTo(['.box1',".box2"],{opacity: 0, y:100, z:0},{opacity: 1, y:0, duration: 1, z:50, ease: "none"})
        timeline.to(groupRef.current.rotation, {z: "+=1.57079632679", ease: 'power1.inOut', duration: 1}, "<")
        timeline.to(['.box1',".box2"],{opacity: 0, y:100, z:0, ease: "power4.inOut", duration: 1})
        timeline.fromTo(['.box3','.box4'],{opacity: 0, y:100, z:0},{opacity: 1, y:0, duration: 1, z:50, ease: "none"},"<")
        timeline.to(groupRef.current.rotation, {y: "+=1.57079632679", ease: 'power1.inOut', duration: 1}, "<")
        timeline.to(['.box3',".box4"],{opacity: 0, y:100, z:0, ease: "power4.inOut", duration: 1})
        timeline.fromTo(['.box5','.box6'],{opacity: 0, y:100, z:0},{opacity: 1, y:0, duration: 1, z:50, ease: "none"},"<")
        timeline.to(groupRef.current.rotation, {x: "+=1.57079632679", ease: 'power1.inOut', duration: 1}, "<")
        timeline.to(['.box5',".box6"],{opacity: 0, y:100, z:0, ease: "power4.inOut", duration: 1})
        timeline.fromTo(['.box7','.box8'],{opacity: 0, y:100, z:0},{opacity: 1, y:0, duration: 1, z:50, ease: "none"},"<")
        timeline.to(groupRef.current.rotation, {y: "+=1.57079632679", ease: 'power1.inOut', duration: 1}, "<")
        timeline.to(['.box7',".box8"],{opacity: 0, y:100, z:0, ease: "power4.inOut", duration: 1})
        timeline.fromTo(['.box9'],{opacity: 0, y:100, z:0},{opacity: 1, y:0, duration: 1, z:50, ease: "none"},"<")
        timeline.to(groupRef.current.rotation, {z: "+=1.57079632679", ease: 'power1.inOut', duration: 1}, "<")}
        
        
        
        timelineRef.current = timeline; 
    },[canvasReady, groupRef])
  return (
    <section className="relative h-screen bg-black w-full " id="Robot">
        
        <div className="absolute h-full text-black w-full ">
            <h1 className="absolute z-50 left-[50%] top-[-5%] -translate-x-1/2">Meet Our Team</h1>
            
            
            <div className=" absolute z-50 left-0 bottom-[50%] w-[10vw] bg-black">
                <button onClick = {handleClickNext}className="peer absolute bg-none flex items-center justify-center z-100 left-0 bottom-[50%] h-[10vh] w-[5vh] text-center  text-5xl translate-y-1/2 py-0 hover:bg-neutral-400 hover:py-60  hover:rounded-tr-3xl hover:rounded-br-3xl transition-all duration-300 ease-in-out"> ←</button>
                <p className="absolute pointer-events-none text-5xl right-0 top-6 -translate-y-full opacity-0  peer-hover:opacity-100 peer-hover:visible peer-hover:top-6 transition-all duration-300"> Next</p>
                
                
            </div>
            {counter >= 1 && (<div className=" absolute z-50 right-0 bottom-[50%] w-[15vw] bg-black">
                <button onClick = {handleClickBack} className="peer absolute bg-none flex items-center justify-center z-100 right-0 bottom-[50%] h-[10vh] w-[5vh] text-center  text-5xl translate-y-1/2 py-0 hover:bg-neutral-400 hover:py-60 hover:rounded-tl-3xl hover:rounded-bl-3xl transition-all duration-300 ease-in-out"> →</button>
                <p className="absolute pointer-events-none text-5xl left-0 top-6 -translate-y-full opacity-0  peer-hover:opacity-100 peer-hover:visible peer-hover:top-4 transition-all duration-300"> Previous</p>
                
                
            </div>)}
            <div className="flex flex-row absolute z-40 w-full h-full ">
                {cards.map((feature, index)=>(
                    <div key={feature.id} className={clsx('box',`box${index+1}`,feature.styles, (number-1 == index || number-2 == index) ? "z-50" : "z-0 pointer-events-none" )}>
                        {feature.card}
                    </div>

                ))}
            </div>
            
            
            <div className="w-full h-full">
            <Canvas className=" bg-neutral-200 h-full" onCreated={() => setCanvasReady(true)}>
                    <group ref={groupRef}>
                        <Box scale={3} material-color="black" >
                           
                        </Box>
                    </group> 
                </Canvas>
            </div>
               
           

            
        </div>
    </section>
  )
}

export default Robot
