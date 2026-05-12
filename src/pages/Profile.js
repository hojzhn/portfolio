import { useContext } from "react";

import { LayoutContext, SiteRoleContext } from "../context/LayoutContext.js";

import Lissajous from "../components/Lissajous.js";
import Paragraph from "../components/Paragraph.js";
import ElasticLines from "../components/ElasticLines.js";
import IconSmall from "../components/IconSmall.js";

import "../scss/profile.scss";
import ProfileArrow from "../components/ProfileArrow.js";

function Profile() {
  const { layout, setLayout } = useContext(LayoutContext);

  const { siteRole, setSiteRole } = useContext(SiteRoleContext);

  // Function to toggle siteRole
  const toggleSiteRole = () => {
    setSiteRole((prevRole) => (prevRole === "artist" ? "designer" : "artist"));
  };

  return (
    <section
      className="top main-l-section profile h100 flex flex-col justify-between"
      style={{
        padding: `${Math.min(layout.design.globalMargin * 0.8, 40)}px`,
      }}
    >
      <div>
        <header className="flex flex-justify flex-center">
          <div className="flex flex-center half">
            <Lissajous
              style={{
                width: "clamp(30px, 4vw, 40px)",
                height: "clamp(30px, 4vw, 40px)",
              }}
            />

            <div
              className="catchphrase w600 uppercase"
              style={{ fontSize: "clamp(12px, 3vw, 14px)" }}
            >
              WEB<br></br>PORTFOLIO
            </div>
          </div>
          <div
            className="hover:bg-[var(--bg2)] w-8 h-8 transition-all duration-300 rounded-full flex justify-center items-center"
            onClick={() => {
              setLayout((prev) => ({
                ...prev,
                palette: {
                  ...prev.palette,
                  mode: prev.palette.mode === "light" ? "dark" : "light",
                },
              }));
            }}
          >
            {layout.palette.mode === "light" ? (
              <i class="fa-sharp fa-solid fa-sun-bright"></i>
            ) : (
              <i class="fa-sharp fa-solid fa-moon"></i>
            )}
          </div>
          {/* <div className="flex half text-xs">
          <div className="left-align half">
            <div>NIGHT</div>
            <div>& DAY</div>
          </div>
          <div className="left-align half">
            <div>RHYTHM</div>
            <div>TO DETAIL</div>
          </div>
        </div> */}
        </header>

        <section>
          <div className="name grotesk uppercase anim">Savvy Ahn</div>
          <div className="catch anim  text-xs">
            {siteRole === "artist"
              ? "Multimedia Artist"
              : "Multimedia Designer"}
          </div>
          <div className="status anim text-xs">Looking for opportunities</div>
          <br></br>
          <div className="icons anim">
            <IconSmall iconId="fa-brands fa-linkedin" tooltip="LinkedIn" />
            <IconSmall iconId="fa-thin fa-envelope" tooltip="Email" />
          </div>
          <br></br>
        </section>
      </div>

      <section className="flex flex-justify-end ">
        <div
          className="half flex items-center"
          onClick={() =>
            setLayout((prev) => ({
              ...prev,
              menu: !prev.menu,
            }))
          }
        >
          Works
        </div>
      </section>

      <footer className="bot temp-hide">
        <ElasticLines />
        <br></br>
        <Paragraph id="1" className="anim" hideTitle={layout.mobiler} />
      </footer>
    </section>
  );
}

export default Profile;
