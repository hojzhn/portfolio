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
    if (!layout.mobiler) {
      tl.set(".outer", { padding: "25px" });
    }
    tl.to(targetItem, {
      duration: 0.4,
      height: "100%",
      marginBottom: "0px",
    });

    tl.to(
      nonTargetItems,
      {
        opacity: 0,
        height: "0px",
        padding: 0,
        ease: "power3.out",
        borderWidth: "0px",
        marginBottom: "0px",
        borderColor: "transparent",
      },
      "<",
    );

    tl.to(".main-right", { gap: 0 }, "<");
    tl.to(
      ".main-l",
      { width: "0px", height: "0px", opacity: 0, borderWidth: "0px" },
      "<",
    );
    tl.to(".main-r", { width: "100%", height: "100%" }, "<");
    tl.to(".main-box", { gap: 0 }, "<");
    tl.to(".list-sort", { height: 0, width: 0 }, "<");
    tl.to(".list-image", { height: 0 }, "<");

    tl.to(".outer", { padding: 0 });
    tl.to(".header", { opacity: 0 }, "<");

    tl.to(targetItem, {
      delay: 0.5,
      padding: !layout.mobiler ? "25px" : "0px",
      height: "100%",
    });

    console.log(tl.paused());
    tl.play();
  } else {
    console.log("close");
    gsap.killTweensOf(".outer");
    gsap.killTweensOf(".header");
    gsap.killTweensOf(".item-wrapper");

    tl.call(() => {
      if (targetItem) {
        targetItem.classList.remove("reading");
      }
    });

    tl.set(targetItem, { position: "relative", padding: "25px" });
    tl.set(".outer", { padding: 0 });
    tl.set(".main-l", {
      width: layout.orientation === "portrait" ? 0 : "100%",
      height: layout.orientation === "portrait" ? "100%" : 0,
    });

    if (!layout.mobiler) {
      tl.to(".outer", { padding: `${design.globalMargin}px` });
      tl.to(".header", { opacity: 1 }, "<");
      tl.to(".main-l", { borderWidth: "1px" }, "<");
    }

    tl.to(
      ".main-l",
      {
        width: layout.orientation === "portrait" ? `${design.mainLWidth}px` : 0,
        height: layout.orientation === "portrait" ? "100%" : 0,
        opacity: layout.orientation === "landscape" ? 0 : 1,
      },
      "<",
    );
    tl.to(".main-box", { gap: `${design.globalMargin / 2}px` }, "<");
    // tl.to(
    //   ".main-r",
    //   { width: layout.orientation === "portrait" ? "auto" : "100%" },
    //   "<"
    // );

    tl.to(".main-right", { gap: `${design.globalMargin / 2}px` }, "<");

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
          marginBottom: "10px",
          ease: "power3.out",
        },
        "<",
      );
    });

    tl.to(
      targetItem,
      {
        position: "relative",
        height: "auto",
        width: "100%",
        top: 0,
        left: 0,
        ease: "power3.out",
        borderRadius: 0,
        borderWidth: "1px",
        padding: 0,
      },
      "<",
    );

    tl.to(".list-sort", { height: "auto", width: "" }, "<");

    tl.play();
  }
};
