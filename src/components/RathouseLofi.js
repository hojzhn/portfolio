import React, { useState, useMemo, useEffect, useRef } from "react";
import CarouselMenu from "./CarouselMenu";
import InfiniteGrid from "./InfiniteGrid";
import TextPlaceholder from "./TextPlaceholder";
import IconSmall from "./IconSmall";
import Input from "./Input";
import TimelinePlaceholder from "./TimelinePlaceholder";
import Toggle from "./Toggle";
import { BulletVertical } from "./ListVertical";
import { AnimatePresence, motion } from "framer-motion";

const pageIcons = {
  Main: "fa-home",
  "Press & Exhibition": "fa-newspaper",
  Works: "fa-th-large",
  Contact: "fa-envelope",
};

const panelVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const pagesByFormat = {
  A: ["Main", "Contact"],
  B: ["Main", "Press & Exhibition", "Contact"],
  C: ["Main", "Works", "Press & Exhibition", "Contact"],
};

const formatDesc = [
  "Artist as personality. The interface emphasizes visual presence, tone, and social immediacy, mirroring social media aesthetics.",
  "Artist as professional. Content balances personal narrative with recognizable markers of credibility and structured achievements.",
  "Artist as historical and market entity. The layout adopts an encyclopedic tone, referencing institutional formats and gallery affiliation.",
];

const ArtistHeader = ({ format }) => (
  <div className="flex-1 flex flex-col w-full border-b pb-4 border-[var(--txt3)]">
    {/* Header row */}
    <div className="w-full flex flex-row justify-between mb-4">
      <div>
        <div className="font-mono text-[var(--txt2)] text-xs">
          Painter · Berlin
        </div>
        <h2 className="text-2xl instrument">
          Artist Name <span className="font-normal text-sm"></span>
        </h2>
      </div>

      {/* Desktop button */}
      <button className="hidden sm:block bg-[var(--txt)] text-xs text-[var(--bg)] px-3 py-1 h-8 font-mono leading-normal">
        Message
      </button>
    </div>

    {format === "A" && (
      <p className="text-sm mb-2">
        Social media-style brief bio gives minimal context in this example.
      </p>
    )}

    {format === "C" && (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm mb-4">
        <div className="rounded-xl bg-[var(--bg)] px-3 py-3 min-w-0">
          <div className="mb-1.5 text-[11px] font-mono opacity-60">Born</div>
          <div className="font-['Instrument_Serif'] text-2xl leading-none">
            1987
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg)] px-3 py-3 min-w-0">
          <div className="mb-1.5 text-[11px] font-mono opacity-60">Based</div>
          <div className="font-['Instrument_Serif'] text-xl sm:text-2xl leading-tight truncate">
            New York, USA
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg)] px-3 py-3 min-w-0">
          <div className="mb-1.5 text-[11px] font-mono opacity-60">
            Current Status
          </div>
          <div className="font-['Instrument_Serif'] text-2xl sm:text-3xl leading-none">
            Active
          </div>
        </div>
      </div>
    )}

    {/* Mobile button */}
    <button className="block sm:hidden w-full mt-4 bg-[var(--txt)] text-[var(--bg)] px-3 py-2 font-mono text-xs leading-normal">
      Message
    </button>
  </div>
);

const Representation = () => {
  const galleries = [
    {
      name: "Galeria Tres Patios",
      location: "Medellín, Colombia",
      type: "Gallery",
      years: "2021–Now",
    },
    {
      name: "Kunsthalle Berlin",
      location: "Berlin, Germany",
      type: "Institution",
      years: "2019–2023",
    },
    {
      name: "Studio Archive",
      location: "New York, USA",
      type: "Archive",
      years: "2018–Now",
    },
  ];
  return (
    <div className="mb-8 py-8 border-b border-[var(--txt3)]">
      <div className="font-mono text-[var(--txt2)] text-xs mb-4">
        Representation
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6">
        {/* Primary Gallery */}
        <div className="border border-[var(--txt3)]">
          <div className="h-24 bg-[var(--bg3)]" />

          <div className="p-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] opacity-70 mb-3">
              <span className="border border-[var(--txt3)] px-2 py-[2px] rounded-full">
                Primary
              </span>
              <span>New York, USA</span>
              <span>Since 2021</span>
            </div>

            <div className="font-['Instrument_Serif'] text-3xl leading-none mb-3">
              Gallery Name
            </div>

            <TextPlaceholder lines={1} />

            <div className="border-t border-[var(--txt3)] mt-4 pt-4 font-mono text-xs">
              <div className="opacity-60 mb-1">Works</div>
              <div className="font-['Instrument_Serif'] text-3xl leading-none">
                24
              </div>
            </div>
          </div>
        </div>

        {/* Other Placings */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-[var(--txt2)] text-xs">
              Other Placings
            </div>

            <button className="font-mono text-[10px] opacity-70 hover:opacity-100">
              Show more
            </button>
          </div>

          <div className="flex flex-col border-t border-[var(--txt3)]">
            {galleries.map((gallery, i) => (
              <div
                key={i}
                className="grid grid-cols-[44px_minmax(0,1fr)] sm:grid-cols-[44px_minmax(0,1fr)_auto] p-[1em] gap-[1em]"
              >
                <div className="w-11 h-11 bg-[var(--bg3)] rounded-sm" />

                <div className="min-w-0">
                  <div className="font-['Instrument_Serif'] text-xl leading-none truncate">
                    {gallery.name}
                  </div>
                  <div className="font-mono text-[10px] opacity-60 mt-1 truncate">
                    {gallery.location} · {gallery.type}
                  </div>
                </div>

                <div className="font-mono text-[10px] opacity-70 whitespace-nowrap">
                  {gallery.years}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const RelatedArtists = ({ viewMode }) => (
  <div
    className={`mb-8 pb-8 min-w-0 max-w-full ${
      viewMode !== "C" ? "border-b border-[var(--txt3)]" : ""
    }`}
  >
    <div className="flex w-full min-w-0 items-center justify-between">
      <div className="font-mono text-[var(--txt2)] text-xs mb-4">
        Art Relatives
      </div>
      <div className="text-xs opacity-80 font-mono">See more</div>
    </div>

    <div className="relative h-32 w-full min-w-0 max-w-full overflow-hidden">
      <div className="absolute left-0 top-0 flex h-32 items-center gap-4">
        {[
          { name: "Eleonor Tristan", role: "Collaborator" },
          { name: "Vito Sarmiento", role: "Collaborator" },
          { name: "Rin Halverson", role: "Collaborator" },
        ].map((item, i) => (
          <div
            key={i}
            className="relative flex h-28 w-32 shrink-0 flex-col gap-2 border border-[var(--txt3)] px-2"
          >
            <div className="absolute -top-2 left-2 bg-[var(--bg2)] px-2 text-[10px] text-[var(--txt3)]">
              {item.role}
            </div>

            <div className="mt-6 h-12 w-12 shrink-0 bg-[var(--bg3)]" />

            <div className="instrument truncate whitespace-nowrap text-base">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
const Artworks = ({ format }) => {
  const gridFormat = format === "B" ? 2 : 0;
  const rathouse = format === "A" ? 0 : 1;

  return (
    <>
      {format !== "C" && (
        <div className="font-mono text-[var(--txt2)] text-xs mb-4">Works</div>
      )}

      <InfiniteGrid rathouse={rathouse} format={gridFormat} />
    </>
  );
};
const ContactPage = () => {
  const contacts = [
    {
      type: "Studio",
      content: "studio@artistname.com",
    },
    {
      type: "Instagram",
      content: "@artistId",
    },
  ];

  return (
    <div className="mt-4 pb-20">
      <div className="p-4 pb-0 border border-[var(--txt3)] mb-8">
        <div className=" mb-4">
          <div className="font-mono text-[11px] opacity-60 mb-1 text-[var(--txt2)]">
            Contact of
          </div>
          <div className="font-['Instrument_Serif'] text-2xl leading-none">
            Artist Name
          </div>
          <div className="font-mono text-xs opacity-60 mt-2">New York, USA</div>
        </div>

        <div className="flex flex-col border-t border-[var(--txt2)] mb-6">
          {contacts.map((item, i) => {
            const isLast = i === contacts.length - 1;

            return (
              <button
                key={item.type}
                className={`grid grid-cols-[72px_minmax(0,1fr)_24px] gap-3 items-center text-left
        ${isLast ? "pt-4 pb-0 border-b-0" : "py-4 border-b border-[var(--txt3)]"}
      `}
              >
                <div className="font-mono text-[11px] opacity-60">
                  {item.type}
                </div>

                <div className="font-['Instrument_Serif'] text-xl leading-none truncate">
                  {item.content}
                </div>

                <i className="fa fa-arrow-up-right-from-square text-[11px] opacity-70 justify-self-end" />
              </button>
            );
          })}
        </div>
      </div>
      <div className="font-mono text-[11px] opacity-60 mb-2 text-[var(--txt2)]">
        In-app Message
      </div>

      <div className="font-['Instrument_Serif'] text-xl leading-none mb-3">
        Send a direct inquiry
      </div>

      <div className="w-full h-24 bg-[var(--bg3)] rounded-md my-4" />

      <button className="mt-4 bg-[var(--txt)] text-[var(--bg2)] font-mono text-xs py-2 px-3">
        Message Artist
      </button>
    </div>
  );
};

const PressExhibitionPage = () => {
  const items = [
    {
      year: "2025",
      type: "Solo",
      title: "After the Surface",
      source: "Galeria Tres Patios",
      description: "Solo exhibition",
    },
    {
      year: "2024",
      type: "Review",
      title: "Painting After the Feed",
      source: "Frieze",
      description: "Exhibition review",
    },
    {
      year: "2024",
      type: "Group",
      title: "Soft Systems",
      source: "Kunsthalle Berlin",
      description: "Group exhibition",
    },
    {
      year: "2023",
      type: "Feature",
      title: "New Material Languages",
      source: "Artforum",
      description: "Artist feature",
    },
  ];

  const tags = ["All", "Press", "Solo", "Group"];

  return (
    <div className="mt-4 pb-20">
      <div className="font-mono text-[var(--txt2)] text-xs mb-4">
        Press & Exhibition
      </div>

      {/* Tags */}
      <div className="flex gap-2 overflow-x-auto mb-6 pb-1 font-mono text-[10px]">
        {tags.map((tag, i) => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full border border-[var(--txt3)] whitespace-nowrap ${
              i === 0 ? "bg-[var(--txt)] text-[var(--bg2)]" : "bg-transparent"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col border-t border-[var(--txt3)]">
        {items.map((item, i) => {
          const isExhibition = item.type === "Solo" || item.type === "Group";
          const showYear = i === 0 || items[i - 1].year !== item.year;

          return (
            <div
              key={i}
              className="grid grid-cols-[56px_1fr] gap-4 py-4 border-b border-[var(--txt3)]"
            >
              {/* Year */}
              <div className="font-mono text-xs opacity-60 pt-1">
                {showYear ? item.year : ""}
              </div>

              {/* Content */}
              <div className="min-w-0">
                <div
                  className={`inline-flex mb-2 font-mono text-[10px] px-2 py-[2px] rounded-full ${
                    isExhibition
                      ? "border border-[var(--txt3)]"
                      : "bg-[var(--bg2)]"
                  }`}
                >
                  {item.type}
                </div>

                <div className="font-['Instrument_Serif'] text-xl leading-none text-ellipsis whitespace-nowrap overflow-hidden">
                  {item.title}
                </div>

                <div className="text-xs opacity-70 mt-2">
                  {item.source} · {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WorksPage = ({ viewMode }) => {
  const works = [
    {
      title: "Blue Interior Study",
      caption: "2024 · Oil on linen · 48 × 36 in",
      location: "New York, USA",
      status: "Available",
    },
    {
      title: "Afterimage Field",
      caption: "2023 · Acrylic and graphite · 30 × 40 in",
      location: "Private collection",
      status: "Sold",
    },
    {
      title: "Soft Architecture",
      caption: "2023 · Mixed media · 60 × 44 in",
      location: "Gallery 12",
      status: "On View",
    },
    {
      title: "Red Window",
      caption: "2022 · Oil on panel · 24 × 18 in",
      location: "Artist studio",
      status: "Available",
    },
  ];

  const tags = ["All", "Sold", "On View", "Available", "Archived"];

  return (
    <>
      {/* Sticky Controls */}
      <div className="sticky -top-8 z-20 bg-[var(--bg2)] pt-8 pb-3">
        {/* Search */}
        <div className="mb-3">
          <div className="flex items-center gap-2 border border-[var(--txt3)] rounded-full px-3 py-2 bg-[var(--bg)]">
            <i className="fa fa-search text-[11px] opacity-60" />
            <input
              placeholder="Search works"
              className="w-full bg-transparent outline-none font-mono text-xs placeholder:opacity-50"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 overflow-x-hidden pb-1 font-mono text-[10px]">
          {tags.map((tag, i) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full border border-[var(--txt3)] whitespace-nowrap ${
                i === 0 ? "bg-[var(--txt)] text-[var(--bg2)]" : "bg-transparent"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      {/* Catalogue List */}
      <div className="flex flex-col border-t border-[var(--txt3)]">
        {works.map((work, i) => (
          <div
            key={i}
            className="grid grid-cols-[36px_1fr_auto] gap-3 py-4 border-b border-[var(--txt3)] items-start"
          >
            {/* Index */}
            <div className="font-mono text-xs opacity-60 pt-1">
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Info */}
            <div className="min-w-0">
              <div className="font-['Instrument_Serif'] text-xl leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                {work.title}
              </div>
              <div className="font-mono text-[11px] opacity-60 mt-1">
                {work.caption}
              </div>
              <div className="text-xs opacity-70 mt-2">{work.location}</div>
            </div>

            {/* Status */}
            <div className="font-mono text-[10px] px-2 py-1 rounded-full border border-[var(--txt3)] whitespace-nowrap">
              {work.status}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

function RathouseLofi() {
  const [viewMode, setViewMode] = useState("A");
  const [activePage, setActivePage] = useState("Main");
  const availablePages = pagesByFormat[viewMode];

  const scrollRef = useRef(null);

  useEffect(() => {
    setActivePage("Main");
  }, [viewMode]);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: 0,
        behavior: "auto",
      });
    });
  }, [viewMode, activePage]);
  return (
    <>
      <motion.div
        layout
        style={{
          backgroundColor: "var(--bg2)",
          color: "var(--txt)",
        }}
        className="
    overflow-hidden
    w-full min-w-0 max-w-full
    xl:max-w-5xl
    h-[900px] max-h-[80vh]
    rounded-xl relative
  "
      >
        <div
          ref={scrollRef}
          className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar px-2 sm:px-4 pt-8 "
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`${viewMode}-${activePage}`}
              className="pb-16"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {activePage === "Main" ? (
                <>
                  <ArtistHeader format={viewMode} />
                  {viewMode === "C" && <Representation />}
                  {(viewMode === "C" || viewMode === "B") && (
                    <>
                      <div className="my-8 pb-8 border-b border-[var(--txt3)]">
                        <div className="font-mono text-[var(--txt2)] text-xs mb-4">
                          {viewMode === "C" ? "Biography" : "Statement"}
                        </div>
                        <TextPlaceholder lines={5} />
                      </div>
                    </>
                  )}{" "}
                  <div className="mt-8">
                    <RelatedArtists viewMode={viewMode} />
                  </div>
                  {viewMode !== "C" && <Artworks format={viewMode} />}
                </>
              ) : activePage == "Contact" ? (
                <ContactPage />
              ) : activePage == "Press & Exhibition" ? (
                <PressExhibitionPage />
              ) : (
                <WorksPage />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-2 right-2 z-20 min-w-0">
            <div className="relative flex min-w-0 w-full items-center rounded-full border border-[var(--txt3)] bg-[var(--bg2)] p-1 font-mono text-xs overflow-hidden">
              <div
                className="absolute top-1 bottom-1 rounded-full bg-[var(--txt)] transition-all duration-300 ease-out"
                style={{
                  width: `${100 / availablePages.length}%`,
                  left: `${(availablePages.indexOf(activePage) * 100) / availablePages.length}%`,
                }}
              />

              {availablePages.map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`relative z-10 flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-full px-1 sm:px-2 py-2 transition-colors duration-300 ${
                    activePage === page
                      ? "text-[var(--bg2)]"
                      : "text-[var(--txt)] opacity-70"
                  }`}
                >
                  <i className={`fa ${pageIcons[page]} text-[12px] shrink-0`} />

                  <span className="hidden sm:block min-w-0 max-w-full truncate whitespace-nowrap">
                    {page}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>{" "}
      <motion.div layout className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`desc-${viewMode}`}
            layout
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.24,
              ease: "easeOut",
              layout: { duration: 0.28, ease: "easeInOut" },
            }}
            className="bg-[var(--bg2)] p-4 text-[0.8em] rounded-lg my-4"
          >
            <BulletVertical className="mb-0">
              {viewMode === "A"
                ? formatDesc[0]
                : viewMode === "B"
                  ? formatDesc[1]
                  : formatDesc[2]}
            </BulletVertical>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <Toggle
        items={[
          { label: "Format A", value: "A" },
          { label: "Format B", value: "B" },
          { label: "Format C", value: "C" },
        ]}
        value={viewMode}
        onChange={setViewMode}
        className="mb-16"
      />
    </>
  );
}

export default React.memo(RathouseLofi);
