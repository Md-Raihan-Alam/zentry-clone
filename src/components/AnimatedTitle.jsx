import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import gsap from "gsap";
const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    // gsap context first argument is the animation function, second argument is the container reference
    const ctx = gsap.context(() => {
      // gsap timeline is used to create animation when the container is in view
      // argument trigger is used to specify the trigger element, start is the start position of the animation, end is the end position of the animation, toggleActions is the action to take when the animation is toggled
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current, // trigger element
          start: "100 bottom", // 100 px from the bottom
          end: "center bottom", // center of the element
          toggleActions: "play none none reverse", //the four arguments are onEnter, onLeave, onEnterBack, onLeaveBack, so play the animation when the element is in view, and reverse the animation when the element is out of view and for onLeave and onEnterBack do nothing
        },
      });
      // to method is used to animate the element, first argument is the element to animate, second argument is the animation properties
      titleAnimation.to(".animated-word", {
        opacity: 1, // set the opacity to 1
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)", // set the transform property
        ease: "power2.inOut", // set the easing function to power2.inOut which means the animation will start slow, then speed up, then slow down again
        stagger: 0.02, // stagger the animation by 0.02 seconds which means the animation will start 0.02 seconds after the previous element
      });
    }, containerRef);
    return () => ctx.revert(); // revert the animation when the component is unmounted, here unmounting the component means the component is out of view
  }, []);
  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default AnimatedTitle;
AnimatedTitle.propTypes = {
  title: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
};
