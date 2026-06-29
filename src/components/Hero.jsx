import { useEffect, useRef } from "react";
import { useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react"; // React wrapper for GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    // States for controlling video behavior and UI state
    const [currentIndex, setCurrentIndex] = useState(1); // Tracks the current video index
    const [hasClick, setHashClicked] = useState(false); // Tracks if the button has been clicked
    const [isLoading, setIsLoading] = useState(false); // Tracks loading state
    const [loadedVideo, setLoadedVideos] = useState(0); // Tracks how many videos have been loaded
    const totalVideos = 4; // Total number of videos available

    // Ref for controlling the upcoming video DOM element
    const nextVdRef = useRef(null);

    // Calculates the index of the upcoming video
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    // Handles the click event for the video button
    const handleMinVdClick = () => {
        setHashClicked(true); // Mark that the button has been clicked
        setCurrentIndex(upcomingVideoIndex); // Update to the next video index
    };

    // GSAP animations for transitioning videos when the button is clicked
    useGSAP(() => {
        if (hasClick) {
            // Show the next video and animate its scaling and dimensions
            gsap.set("#next-video", { visibility: "visible" });
            gsap.to("#next-video", {
                transformOrigin: "center center", // Sets the transform origin for scaling
                scale: 1, // Scale it up to its full size
                width: "100%",
                height: "100%",
                duration: 1, // Animation duration
                ease: "power1.inOut", // Easing for smooth animation
                onStart: () => nextVdRef.current.play(), // Play the video when animation starts
            });

            // Animate the current video shrinking and disappearing
            gsap.from("#current-video", {
                transformOrigin: "center center",
                scale: 0, // Starts from zero size
                duration: 1.5, // Animation duration
                ease: "power1.inOut", // Smooth easing
            });
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    // GSAP animation for styling and revealing the video frame with ScrollTrigger
    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)", // Sets initial shape
            borderRadius: "0% 0% 40% 10%", // Adds rounded corners
        });

        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Starts as a rectangle
            borderRadius: "0% 0% 0% 0%", // Starts without rounded corners
            ease: "power1.inOut", // Smooth easing for animation
            scrollTrigger: {
                trigger: "#video-frame", // Element that triggers the animation
                start: "center center", // Start animation when element is centered
                end: "bottom center", // End animation when element's bottom is centered
                scrub: true, // Smooth scrubbing based on scroll position
            },
        });
    });

    // Updates the loaded video count
    const handleVdLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    // Reacts when all videos are loaded
    useEffect(() => {
        if (loadedVideo === loadedVideo - 1) // Fix logic issue in comparison
            setIsLoading(false);
    }, [loadedVideo]);

    // Function to generate video source based on index
    const getVdSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {/* Loading screen */}
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                    </div>
                </div>
            )}

            {/* Video Frame */}
            <div id="video-frame" className="relativ z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    {/* Mask for the next video */}
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMinVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video
                                ref={nextVdRef}
                                src={getVdSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-105"
                                onLoadedData={handleVdLoad}
                            />
                        </div>
                    </div>

                    {/* Next video */}
                    <video
                        ref={nextVdRef}
                        src={getVdSrc(currentIndex)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVdLoad}
                    />

                    {/* Current playing video */}
                    <video
                        src={getVdSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVdLoad}
                    />
                </div>

                {/* Heading and Button */}
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>A</b>MING
                </h1>
                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>
                        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 flex-center gap-1" />
                    </div>
                </div>
            </div>

            {/* Background Heading */}
            <h1 className="special-font hero-heading absolute bottom-5 right-5 -z-40 text-black">
                G<b>A</b>MING
            </h1>
        </div>
    );
};

export default Hero;
