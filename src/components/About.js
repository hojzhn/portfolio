import React, { useEffect } from "react";
import Profile from "../pages/Profile.js";
import History from "./History.js";
import { enter } from "../animations/index.js"; // Import the animation function

function About() {
  useEffect(() => {
    // Select the .main-l-content element
    const mainContent = document.querySelector(".main-l-content");

    // Create a MutationObserver
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (
          mutation.attributeName === "style" &&
          mainContent.style.display === "block"
        ) {
          enter("main-l-content"); // Trigger the animation
        }
      });
    });

    // Observe style changes on the .main-l-content element
    observer.observe(mainContent, {
      attributes: true, // Observe attribute changes
    });

    // Cleanup the observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div className="main-l-content h100">
      <Profile />
      <section className="top main-l-section  h100"></section>
    </div>
  );
}

export default About;
