import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { pPositions } from "../Constants"
import {useEffect} from "react"
import { MotionPathPlugin } from "gsap/all"
import {Canvas} from "@react-three/fiber"
import Gear1 from "./models/Gear1"
import Gear2 from "./models/Gear2"
import { PresentationControls, Html, OrbitControls } from '@react-three/drei';
import Lights from "./models/Lights"
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)



const Showcase = () => {
     useEffect(() => {
            const timer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
            
            return () => clearTimeout(timer);
        }, []);
    useGSAP(()=>{

            const timeline =  gsap.timeline({
                
                scrollTrigger: {
                    trigger: '#showcase',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });
            timeline.to('.temp img', {

                scale: 10,
                yPercent: -250,
                
                duration: 1,
                ease: "power4.inOut"
                
            });
            timeline.to("#rotgear",{y: '80vh', ease: "power4.in", onComplete: () => {}},"<").to([".temp img"], {opacity: 0}).to([".temp img"],{scale: 0.1})
            

            /*gsap.to("#rotgear",{
                rotation: 360,
                repeat: -1,
                duration: 4,
                transformOrigin: "center center",
                ease: "none"
            })*/
            
        
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }});
    return(
        <section id = "showcase" className=" relative z-50">
            <div> 
                <img src="/gsmst.jpg" className="w-full h-full "/>
                    <div className="temp">
                        <div className="mask" > 
                            <img src="/3318mask.png" className="w-full h-full"/>
                        </div>
                        <div id="gear-container" className=" absolute bottom-[-5vh] left-[53vh] z-20">
                            <img id = "rotgear" src="/gear3.png" className="relative  h-[50vh] w-[70vh]"/>
                        </div>
                    </div>
                <div>
                    <h1> HI FRC</h1>
                </div>
            </div>
            
            
            
        </section>  
    )
}
export default Showcase