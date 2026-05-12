import gsap from 'gsap';

export const hover = (id, animation) => {
    const element = document.getElementById(id);

    if (element) {
        element.addEventListener("mouseenter", () => {
            animation.play();
        });

        element.addEventListener("mouseleave", () => {
            animation.reverse();
        });
    } else {
        console.error(`Element with id ${id} not found.`);
    }
};
