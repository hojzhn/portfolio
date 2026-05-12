import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const p = {
  bg: "#ffffff",
  surface: "#efe3f3",
  surface2: "#eadff0",
  border: "#dcdcdc",
  borderStrong: "#d7bfe2",
  text: "#3f284d",
  textSoft: "#8d789b",
  textAccent: "#4b2b5e",
  primary: "#a258d0",
  primaryStrong: "#6a3a86",
  overlay: "rgba(45, 24, 56, 0.25)",
};
const t = {
  accent: "arial", // swap this later
};
const accent = `font-['${t.accent}']`;

const artist = {
  name: "Ceal Floyer",
  navTitle: "CEAL FLOYER",
  initials: "CF",
  discipline: "CONCEPTUAL · INSTALLATION",
  based: "Berlin",
  born: "1968",
  backers: "142",
  bio: {
    before:
      "Conceptual artist known for spare, precise interventions in perception and language. She studied at Goldsmiths and later took up a residency at ",
    ref1: "Künstlerhaus Bethanien",
    middle: " in Berlin. Her work has been associated with ",
    ref2: "Esther Schipper",
    after: " and shown internationally.",
  },
  relatives: [
    {
      role: "Peer",
      initials: "RG",
      name: "Ryan Gander",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Ryan_Gander_2023.jpg",
    },
    {
      role: "Gallery",
      initials: "ES",
      name: "Esther Schipper",
      image: "https://i.imgur.com/f4siO05.jpeg",
    },
    {
      role: "Residency",
      initials: "KB",
      name: "Künstlerhaus Bethanien",
      image:
        "https://bethanien.de/wp-content/uploads/2012/04/R%C3%A4umlichkeiten_Bibliothek_kl.jpg",
    },
  ],
  works: [
    ["01", "A Nail Biting Performance", "2001 · Performance"],
    ["02", "Light Switch", "1992 · Projection"],
    ["03", "Monochrome Till Receipt", "1999 · Print"],
  ],
  heroImage:
    "https://lisson-art.s3.amazonaws.com/uploads/attachment/image/body/694/FLOY070007_5.jpg",

  modal: {
    meta: "GALLERY · BERLIN · EST. 1989",
    title: "Esther Schipper",
    body: "Contemporary art gallery based in Berlin and associated with conceptual and installation-based practices.",
    referencedBy: "represented artist →",
    images: [
      "https://news.artnet.com/app/news-upload/2017/02/Portrait_esther-683x1024.jpg",
      "https://images.squarespace-cdn.com/content/v1/5db73a80c704642558b02dd7/1744911675336-H8NAGJ16JDT0N5ACDD1N/Esther+Schipper+Seoul_Exterior_004.jpeg?format=1500w",
      "https://static-assets.artlogic.net/w_1500,h_1500,c_limit,f_auto,fl_lossy,q_auto:best/ws-estherschipper2/usr/exhibitions/images/exhibitions/1309/esther-schipper-seoul_tomasz-krecicki_003-web.jpg",
    ],
  },
};
const ImageSlot = ({ src, className = "", style = {}, children }) => (
  <div
    className={`overflow-hidden ${className}`}
    style={{ backgroundColor: p.surface, ...style }}
  >
    {src ? (
      <img src={src} alt="" className="w-full h-full object-cover" />
    ) : (
      <div
        className="w-full h-full opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(63,40,77,0.08) 0px, rgba(63,40,77,0.08) 8px, transparent 8px, transparent 18px)",
        }}
      />
    )}
    {children}
  </div>
);
const ArtistHero = ({ artist }) => (
  <section style={{ borderColor: p.border }} className="border-b">
    <div
      className="relative h-[380px] overflow-hidden"
      style={{ backgroundColor: p.surface }}
    >
      <ImageSlot src={artist.heroImage} className="absolute inset-0" />

      {/* TOP gradient for header visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

      <div className="absolute bottom-6 left-7 right-7 text-white">
        <div className="font-mono text-[10px] tracking-[0.2em] mb-2 uppercase">
          {artist.discipline} · {artist.based}
        </div>
        <div className={`${accent} text-5xl leading-none`}> {artist.name}</div>
      </div>
    </div>

    <div className="grid grid-cols-3  border-b">
      {[
        ["BASED", artist.based],
        ["BORN", artist.born],
        ["STATUS", "Deceased"],
      ].map(([label, value]) => (
        <div
          key={label}
          style={{ borderColor: p.border }}
          className="p-4 border-r last:border-r-0"
        >
          <div
            style={{ color: p.textSoft }}
            className="font-mono text-[10px] tracking-[0.2em] mb-2"
          >
            {label}
          </div>
          <div className={`${accent} text-xl leading-none`}>{value}</div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-[1fr_1fr_44px] gap-3 p-7 pt-5">
      <PrimaryButton className="py-2">Follow</PrimaryButton>
      <SecondaryButton className="py-2">View Projects</SecondaryButton>
      <button
        style={{ borderColor: p.border }}
        className="border rounded-full text-xl"
      >
        ☆
      </button>
    </div>
  </section>
);

const WorksPreview = ({ works }) => (
  <Section>
    <div className="flex justify-between items-start mb-4">
      <SectionTitle>03 WORKS</SectionTitle>
      <div style={{ color: p.textSoft }} className="font-mono text-xs">
        {works.length} listed
      </div>
    </div>

    <div style={{ borderColor: p.border }} className="border-t">
      {works.map(([index, title, meta]) => (
        <button
          key={index}
          style={{ borderColor: p.border }}
          className="w-full grid grid-cols-[36px_1fr] gap-3 py-3 border-b text-left"
        >
          <div style={{ color: p.textSoft }} className="font-mono text-xs">
            {index}
          </div>
          <div className="min-w-0">
            <div className={`${accent} text-xl leading-none truncate`}>
              {title}
            </div>
            <div
              style={{ color: p.textSoft }}
              className="font-mono text-[10px] mt-1 truncate"
            >
              {meta}
            </div>
          </div>
        </button>
      ))}
    </div>
  </Section>
);
const Section = ({ children }) => (
  <section style={{ borderColor: p.border }} className="p-7 border-b">
    {children}
  </section>
);

const SectionTitle = ({ children }) => (
  <div
    style={{ color: p.primary }}
    className="font-mono text-xs tracking-[0.28em] mb-5"
  >
    {children}
  </div>
);

const PrimaryButton = ({ children, className = "" }) => (
  <button
    style={{ backgroundColor: p.primary }}
    className={`text-white font-bold ${className}`}
  >
    {children}
  </button>
);

const SecondaryButton = ({ children, className = "" }) => (
  <button
    style={{ borderColor: p.primary, color: p.primaryStrong }}
    className={`border font-bold ${className}`}
  >
    {children}
  </button>
);

const InlineRef = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{ color: p.textAccent }}
    className="underline decoration-dotted underline-offset-4"
  >
    {children}
  </button>
);
const ArtRelativeCard = ({ role, initials, name, image, onClick }) => (
  <button
    onClick={onClick}
    style={{ borderColor: p.border }}
    className="relative border p-3 pt-5 text-left flex flex-col"
  >
    <div
      style={{
        backgroundColor: p.bg,
        border: 0,
      }}
      className="absolute -top-2 left-2 px-1.5 font-mono text-[9px]"
    >
      {role}
    </div>

    <ImageSlot
      src={image}
      className="w-12 h-12 rounded border mb-3"
      style={{ borderColor: p.border }}
    >
      {!image && (
        <div
          className={`w-full h-full flex items-center justify-center ${accent} text-xl`}
        >
          {initials}
        </div>
      )}
    </ImageSlot>

    <div className="${font-['Instrument_Serif']} text-xs leading-tight">
      {name}
    </div>
  </button>
);
const ReferenceModal = ({ open, onClose, reference }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        style={{ backgroundColor: p.overlay }}
        className="fixed inset-0 z-30 flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          style={{ backgroundColor: p.bg, borderColor: p.borderStrong }}
          className="w-full border shadow-2xl p-6"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{ backgroundColor: p.border }}
            className="w-10 h-1 rounded-full mx-auto mb-4"
          />

          <div
            style={{ color: p.primary }}
            className="font-mono text-[10px] tracking-[0.25em] mb-2"
          >
            {reference.meta}
          </div>

          <div className={`${accent} text-3xl mb-5`}>{reference.title}</div>

          <div className="grid grid-cols-4 gap-2 mb-5">
            {reference.images?.slice(0, 3).map((src, i) => (
              <ImageSlot key={i} src={src} className="h-16" />
            ))}

            <div
              style={{ borderColor: p.borderStrong, color: p.textSoft }}
              className="h-16 border border-dashed flex items-center justify-center font-mono text-xs"
            >
              +18
            </div>
          </div>

          <p
            style={{ color: p.textAccent }}
            className="${font-['Instrument_Serif']} text-base mb-5"
          >
            {reference.body}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <PrimaryButton className="py-3">Open page →</PrimaryButton>
          </div>

          <div
            style={{ borderColor: p.border, color: p.textSoft }}
            className="border-t pt-4 flex justify-between font-mono text-xs"
          >
            <span>also referenced by</span>
            <span>14 artists →</span>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
export default function RathouseMockupArtist() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundColor: p.bg,
        color: p.text,
      }}
    >
      <div className="absolute top-0 left-0 right-0 z-20 text-white">
        <div
          style={{ backgroundColor: p.primary }}
          className={`absolute inset-0 transition-transform duration-300 ease-out ${
            scrolled ? "translate-y-0" : "-translate-y-full"
          }`}
        />

        <div className="relative pt-12 pb-4 flex items-center justify-between px-6">
          <span className="text-2xl">‹</span>

          <span
            className={` text-xs tracking-[0.35em] transition-opacity duration-200 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          >
            {artist.navTitle}
          </span>

          <span className="text-xl">…</span>
        </div>
      </div>

      <div
        className="h-full overflow-y-auto"
        onScroll={(e) => {
          setScrolled(e.currentTarget.scrollTop > 100);
        }}
      >
        <ArtistHero artist={artist} />

        <Section>
          <SectionTitle>01 BIOGRAPHY</SectionTitle>

          <p className={`${accent} text-[19px] leading-[1.45]`}>
            {" "}
            {artist.bio.before}
            <InlineRef onClick={openModal}>{artist.bio.ref1}</InlineRef>
            {artist.bio.middle}
            <InlineRef onClick={openModal}>{artist.bio.ref2}</InlineRef>
            {artist.bio.after}
          </p>
        </Section>

        <Section>
          <div className="flex justify-between items-start mb-4">
            <SectionTitle>02 ART RELATIVES</SectionTitle>
            <div style={{ color: p.textSoft }} className="font-mono text-xs">
              {artist.relatives.length} pinned
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {artist.relatives.map((item) => (
              <ArtRelativeCard
                key={item.name}
                role={item.role}
                initials={item.initials}
                name={item.name}
                image={item.image}
                onClick={openModal}
              />
            ))}
          </div>
        </Section>

        <WorksPreview works={artist.works} />
      </div>

      <ReferenceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        reference={artist.modal}
      />
    </div>
  );
}
