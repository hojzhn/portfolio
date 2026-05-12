import gsap from "gsap";
const tl = gsap.timeline();

export const preLoaderAnim = (mobiler, design, setLayout, options = {}) => {
  const { skip = false } = options;

  tl.to("body", {
    duration: 0.1,
    css: { overflowY: "hidden" },
    ease: "power3.inOut",
  })

    .set(".main-r", { display: "none" })
    .from(".texts-container span", {
      duration: 0.2,
      delay: 1,
      y: 70,
      skewY: 10,
      stagger: 0.4,
      ease: "Power3.easeOut",
    })

    .to(".main-l", {
      duration: 0.5,
      css: { background: "transparent", border: mobiler ? "" : "1px solid" },
    })

    .from(
      ".main-box",
      {
        gap: 0,
      },
      "<"
    )

    .from(
      ".preload",
      {
        opacity: 0,
      },
      "<"
    );

  if (!mobiler) {
    tl.from(
      ".outer",
      {
        duration: 0.5,
        padding: "0px",
      },
      "<"
    );
  } else {
    tl.to(".outer", { padding: `0px` }, 0.3);

    tl.to(".main-l", { borderColor: "transparent" }, 0.3, "<");
    tl.to(".item-wrapper", { padding: `0px` }, 0.3);
  }

  tl.set(".main-l-content", {
    display: "block",
    delay: -0.5,
  });

  // tl.add(() => {
  //   setLayout((prev) => ({ ...prev, menu: true }));
  // });

  if (skip) {
    tl.progress(1); // jump timeline to the end instantly
  }
  return tl;
};

export const enter = (className) => {
  gsap.fromTo(
    `.${className} .anim`, // Target child elements with .anim
    { opacity: 0, y: 20 }, // Initial styles
    {
      opacity: 1,
      y: 0,
      stagger: 0.2, // Apply stagger
      delay: 0.5, // Delay before animation starts
      duration: 1, // Animation duration
      ease: "Power3.easeOut", // Smooth easing
    }
  );
};

export const menuAnim = (orientation, design, isOpen, options = {}) => {
  const { skip = false } = options;
  const tl = gsap.timeline(); // 💥 Create a new timeline every time

  tl.set(".temp-hide", { willChange: "opacity", pointerEvents: "none" });

  if (isOpen) {
    console.log("Menu Open");

    tl.to(
      ".temp-hide",
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );

    if (orientation === "portrait") {
      console.log("landscape");
      tl.set(".reformat", { display: "none" });
      tl.set(".main-box", { flexDirection: "row" });
      tl.set(".main-l", { width: "100%", height: "100%", flex: "none" });
      tl.set(".main-r", {
        width: "0px",
        height: "100%",
        flex: "auto",
        display: "block",
      });

      tl.to(".main-box", { gap: `${design.globalMargin / 2}px` }, 0.3);

      tl.to(
        ".main-l",
        {
          duration: 0.8,
          width: `${design.mainLWidth}px`,
          ease: "Power2.easeOut",
          onStart: () => {
            document.querySelector(".main-l").style.scrollSnapType = "none";
          },
          onComplete: () => {
            document.querySelector(".main-l").style.scrollSnapType =
              "y mandatory";
          },
        },
        "<"
      );

      tl.set(".main-r", { width: "100%" });
      tl.set(".main-right", { delay: 0.1, css: { display: "flex" } });
      tl.set(".reformat", { display: "block" });
    } else if (orientation === "landscape") {
      console.log("portrait");
      tl.set(".reformat", { display: "none" });
      tl.set(".main-box", { flexDirection: "column" });
      tl.set(".main-l", { width: "100%", height: "100%", flex: "auto" });
      tl.set(".main-r", {
        width: "100%",
        height: "0px",
        flex: "none",
        display: "block",
      });

      tl.to(".main-box", { gap: `${design.globalMargin / 2}px` }, 0.3);

      tl.to(
        ".main-l",
        {
          duration: 0.8,
          height: `0px`,
          top: 0,
          opacity: 0.1,
        },
        "<"
      );

      tl.to(
        ".main-r",
        {
          duration: 0.8,
          height: `100%`,
          ease: "expo.out",
        },
        "<"
      );

      tl.set(".main-box", {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      });
      tl.set(".main-l", {
        width: "100%",
        height: "100%",
        flex: "auto",
      });

      tl.set(".main-r", {
        width: "100%",
        height: `100%`,
        flex: "none",
        position: "relative",
        right: "unset",
        bottom: "unset",
      });

      tl.set(".main-right", { delay: 0.1, css: { display: "flex" } });
      tl.set(".reformat", { display: "block" });
    }

    tl.set(".main-r", { display: "block" });

    tl.to(
      ".temp-hide",
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.in",
      },
      ">"
    );
  } else {
    console.log("Menu Close");

    tl.to(
      ".temp-hide",
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );

    if (orientation === "portrait") {
      tl.set(".reformat", { display: "none" });
      tl.set(".main-right", { display: "none" });

      tl.to(".main-box", { gap: "0px" }, 0.3);
      tl.to(
        ".main-l",
        {
          duration: 1.2,
          width: "100%",
          ease: "expo.out",
          opacity: 1,
        },
        "<"
      );

      tl.set(".main-r", { width: "0px" });
      tl.set(".reformat", { display: "block" });
    } else if (orientation === "landscape") {
      tl.set(".reformat", { display: "none" });
      tl.set(".main-l", { width: "100%" });
      tl.set(".main-right", { display: "none" });

      tl.to(".main-box", { gap: "0px" }, 0.3);

      tl.to(".main-l", { opacity: 1, height: "100%", width: "100%" }, 0.3);
      tl.to(
        ".main-r",
        {
          duration: 0.8,
          height: "0px",
          ease: "expo.out",
        },
        "<"
      );

      tl.set(".reformat", { display: "block" });
    }

    tl.to(".main-r", { display: "none" });

    tl.to(
      ".temp-hide",
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.in",
      },
      "<"
    );
  }

  tl.set(
    ".temp-hide",
    {
      pointerEvents: "auto",
      clearProps: "opacity,willChange",
    },
    ">"
  );

  if (skip) tl.progress(1);

  return tl;
};

export const orientationAnim = (design, orientation, menu, post) => {
  if (post) {
    if (orientation === "portrait") {
      console.log("post change orientation to landscape");
      gsap.set(".main-box", {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      });
    } else if (orientation === "landscape") {
      console.log("post change orientation to portrait");
      gsap.set(".outer", { padding: 0 });
      gsap.set(".main-box", {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      });
    }
  } else if (orientation === "landscape") {
    console.log("landscape to portrait");

    tl.set(".reformat", { display: "none" });
    tl.set(".main-box", {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    });
    tl.set(".main-l", {
      width: `${design.mainLWidth}px`,
      height: "100%",
      flex: "none",
    });

    tl.set(".main-r", {
      width: "100%",
      height: "100%",
      flex: "auto",
    });

    // Animation Begin

    // Moving Object Initial Setup

    tl.set(".main-r", {
      position: "fixed",
      width: `calc(100% - ${design.mainLWidth + design.globalMargin * 2.5}px)`,
      height: `calc(100% - ${design.globalMargin * 2}px)`,
      top: "unset",
      bottom: `${design.globalMargin}px`,
      left: "unset",
      right: `${design.globalMargin}px`,
      flex: "none",
    });

    // Move Objects

    tl.to(".main-l", {
      duration: 0.8,

      opacity: menu ? 0 : 1,
      height: `calc(100% - ${
        design.mainRHeight + design.globalMargin * 0.5
      }px)`,
      onStart: () => {
        document.querySelector(".main-l").style.scrollSnapType = "none";
      },
      onComplete: () => {
        document.querySelector(".main-l").style.scrollSnapType = "y mandatory";
      },
      ease: "Power3.easeOut",
    });

    tl.to(".main-l", {
      duration: 0.8,
      delay: -0.6,
      width: "100%",
      onStart: () => {
        document.querySelector(".main-l").style.scrollSnapType = "none";
      },
      onComplete: () => {
        document.querySelector(".main-l").style.scrollSnapType = "y mandatory";
      },
      ease: "Power3.easeOut",
    });

    tl.to(
      ".main-r",
      {
        duration: 1,
        width: `calc(100% - ${design.globalMargin * 2}px)`,
        height: `${design.mainRHeight}px`,
        ease: "expo.out",
      },
      "<"
    );

    // Animation End

    tl.set(".main-box", {
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    });
    tl.set(".main-l", {
      width: "100%",
      height: "100%",
      flex: "auto",
    });

    tl.set(".main-r", {
      width: "100%",
      height: `100%`,
      flex: "none",
      position: "relative",
      right: "unset",
      bottom: "unset",
    });
  } else if (orientation === "portrait") {
    console.log("portrait to landscape");

    tl.set(".reformat", { display: "none" });
    tl.set(".main-box", {
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    });
    tl.set(".main-l", {
      width: "100%",
      height: "100%",
      flex: "auto",
    });

    tl.set(".main-r", {
      width: "100%",
      height: `100%`,
      flex: "none",
    });

    // Animation Begin

    // Moving Object Initial Setup

    tl.set(".main-l", {
      position: "fixed",
      height: `calc(100% - ${
        design.mainRHeight + design.globalMargin * 2.5
      }px)`,
      width: `calc(100% - ${design.globalMargin * 2}px)`,
      bottom: "unset",
      top: `${design.globalMargin}px`,
      right: "unset",
      left: `${design.globalMargin}px`,
      flex: "none",
    });

    // Move Objects

    tl.to(".main-r", {
      duration: 0.8,
      width: `calc(100% - ${design.mainLWidth + design.globalMargin * 0.5}px)`,
      ease: "Power3.easeOut",
    });

    tl.to(".main-r", {
      duration: 0.8,
      delay: -0.6,
      height: "100%",
      ease: "Power3.easeOut",
    });

    tl.to(
      ".main-l",
      {
        duration: 1,
        opacity: 1,
        height: `calc(100% - ${design.globalMargin * 2}px)`,
        width: `${design.mainLWidth}px`,
        ease: "Power3.easeOut",
        onStart: () => {
          document.querySelector(".main-l").style.scrollSnapType = "none";
        },
        onComplete: () => {
          document.querySelector(".main-l").style.scrollSnapType =
            "y mandatory";
        },
      },
      "<"
    );

    tl.set(".main-box", {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    });
    tl.set(".main-l", {
      width: `${design.mainLWidth}px`,
      height: "100%",
      flex: "none",
      position: "relative",
      top: "unset",
      left: "unset",
    });

    tl.set(".main-r", {
      width: "100%",
      height: "100%",
      flex: "auto",
    });
  }
};

export const toMobilerAnim = (mobiler, design, menu, post) => {
  const tl = gsap.timeline(); // 💥 Create a new timeline every time
  if (mobiler) {
    tl.to(".outer", { padding: `0px` }, 0.3);

    tl.to(".main-l", { borderColor: "var(--bg)", borderWidth: 0 });
    tl.to(".main-r", { height: "100%" }, 0.3, "<");

    tl.to(".item-wrapper", { padding: `0px` }, 0.3);
  } else {
    if (!post) {
      tl.to(".outer", { padding: `${design.globalMargin}px` }, 0.3);
    } else {
    }
    tl.to(".main-l", { borderColor: "var(--txt)", borderWidth: 1 }, 0.3, "<");
    tl.to(".selected", { padding: `${design.globalMargin}px` }, 0.3);
  }
  return tl;
};
