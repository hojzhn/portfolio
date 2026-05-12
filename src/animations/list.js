import gsap from "gsap";
import { delay } from "lodash";

export const animateItemIn = (id) => {
  const element = document.getElementById(`item-${id}`);
  if (element) {
    gsap.fromTo(
      element,
      { opacity: 0, y: 20 }, // Ensure it starts hidden
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
    );
  }
};

// Function to animate an item out (fade-out effect)
export const animateItemOut = (id) => {
  const element = document.getElementById(`item-${id}`);
  if (element) {
    gsap.to(element, {
      opacity: 0,
      y: -20, // Slightly above position
      duration: 0.3,
      ease: "power2.in",
    });
  }
};

export const postViewAnim = (postMode = false, design, id, layout) => {
  const allItems = document.querySelectorAll(".item-wrapper");
  const targetItem = document.getElementById(`item-${id}`);
  const nonTargetItems = Array.from(allItems).filter(
    (item) => item !== targetItem,
  );

  const tl = gsap.timeline({ paused: true });

  if (postMode) {
    tl.to(
      nonTargetItems,
      {
        duration: 0.4,
        opacity: 0,
        padding: 0,
      },
      // "<",
    );

    tl.to(targetItem, {
      duration: 0.4,
      height: "100%",
    });
    tl.to(".profile", { opacity: 0, height: 0 }, "<");
    tl.to(".profile-container", { maxWidth: "1200px" });
    tl.to(".list-image", { height: 0 }, "<");

    tl.set(nonTargetItems, { height: 0, display: "none" });

    tl.play();
  } else {
    tl.to(targetItem, { opacity: 0 });
    tl.to(targetItem, { height: 0 });
    tl.to(".profile-container", { maxWidth: "600px" });
    tl.to(".profile", { height: "auto" });
    tl.to(".profile", { opacity: 1 });
    tl.set(nonTargetItems, { height: 0, display: "block" });
    tl.to(".list-image", { height: "100%" }, "<");

    allItems.forEach((input) => {
      const item = input.closest(".item-wrapper");
      tl.set(
        item,
        {
          display: "block",
        },
        "<",
      );

      tl.to(
        item,
        {
          opacity: 1,
          height: "auto",
        },
        "<",
      );
    });

    tl.play();
  }
};
