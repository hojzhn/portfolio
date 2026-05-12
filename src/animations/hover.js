
import gsap from 'gsap';


export const push = (ref) => {
    gsap.to(ref.current, {
    scale: 1.2,
    backgroundColor: '#f0f0f0',
    duration: 0.3,
});
}; 

