// posts/Rathouse.content.js
import React, { useState } from "react";
import { ListHorizontal, BulletHorizontal } from "../components/ListHorizontal";
import { ListVertical, BulletVertical } from "../components/ListVertical";
import { ListGrid, BulletGrid } from "../components/ListGrid";
import AnimatedStripes from "../components/AnimatedStripes";
import PyramidDiagram from "../components/Pyramid";
import GridPlot from "../components/GridPlot";
import AxisPlot from "../components/AxisPlot";
import ArticleParagraph from "../components/ArticleParagraph";
import Quote from "../components/Quote";
import RathouseLofi from "../components/RathouseLofi";
import H4 from "../components/H4";
import H3 from "../components/H3";
import Toggle from "../components/Toggle";
import Reference from "../components/Reference";
import HmwRotator from "../components/Rathouse/HMWRotator";
import { AnimatePresence, motion } from "framer-motion";
import FindingParagraph from "../components/FindingParagraph.js";
import raffinity from "../images/r_affinity.png";
import rvalence from "../images/r_valence.png";

import pf1 from "../images/pf1.jpg";
import pf2 from "../images/pf2.jpg";
import pf3 from "../images/pf3.jpg";
import pf4 from "../images/pf4.jpg";
import pf5 from "../images/pf5.jpg";
import pf6 from "../images/pf6.jpg";

import r11 from "../images/r1-1.png";
import r12 from "../images/r1-2.png";
import r21 from "../images/r2-1.png";
import r22 from "../images/r2-2.png";
import r31 from "../images/r3-1.png";
import r32 from "../images/r3-2.png";
import ill1 from "../images/ill1.png";
import ill2 from "../images/ill2.png";
import ill3 from "../images/ill3.png";

import rh1 from "../images/rh-1.gif";
import rh2 from "../images/rh-2.gif";
import rh3 from "../images/rh-3.gif";
import rh4 from "../images/rh-4.gif";

import GraphicCaption from "../components/GraphicCaption";
import SpeechBubble from "../components/SpeechBubble";
import HmwScenario from "../components/Rathouse/HmwScenario";
import Interviewee from "../components/Rathouse/Interviewee";
import List from "../components/List";
import ModelTable from "../components/Rathouse/ModelTable";
import ScreenShowcase from "../components/ScreenShowcase";
import ResponsiveColumns from "../components/ResponsiveColumns";
import DescriptionHeader from "../components/DescriptionHeader";
import { ChartContainer } from "./Flag.content";
import MonoLabel from "../components/MonoLabel";

// Overview Subsections
const Overview = () => (
  <>
    {/* <DescriptionHeader>THE FINDING</DescriptionHeader>

    <p>

    </p> */}
  </>
);
const RTdesc = () => (
  <>
    <p>
      {" "}
      I conducted a multi-stage qualitative investigation combining
      literature-based expert interviews, stakeholder interviews, and on-site
      observational research in New York galleries.
    </p>
    <p>
      Data were analyzed using thematic analysis. Open coding and affinity
      clustering revealed three recurring tensions.
    </p>
  </>
);

const Process = () => (
  <>
    <ListVertical>
      <BulletVertical title="Credibility overload">
        Participants relied heavily on reputation cues, even in informal or
        hybrid contexts. Social and professional signaling often blurred.
      </BulletVertical>
      <BulletVertical title="Conceptual expansion vs institutional containment">
        “Art” as a concept continues to expand, while institutional validation
        remains spatially and hierarchically bounded.
      </BulletVertical>
      <BulletVertical title="Legitimacy–access tradeoff">
        Gatekeeping preserves value, but restricts participation and long-term
        sustainability.
      </BulletVertical>
    </ListVertical>
  </>
);
const TDdesc = () => (
  <>
    <p>
      Synthesis identified two structural problems: instability in credibility
      signaling under digital visibility, and high transactional thresholds that
      limit market participation. This led to two design directions.
    </p>{" "}
    <p>
      Only the discovery model was empirically tested at this stage; the
      transactional model remains conceptual.
    </p>
  </>
);
const InsightToConcept = () => (
  <>
    <ResponsiveColumns>
      <ScreenShowcase
        className="mb-8"
        images={[rh1, rh2, rh3, rh4]}
        description="App Overview"
      />

      <ArticleParagraph title="Social Media - Database Hybrid Navigation">
        <p>
          Artists depend on exposure platforms, yet legitimacy remains
          institutionally anchored. Social feeds increase visibility but weaken
          credibility signals, while institutional formats preserve credibility
          but limit access. The proposed hybrid format restructures presentation
          to surface credibility cues without reproducing gatekeeping.
        </p>
        <p>
          To evaluate the discovery direction, I isolated a single functional
          variable: presentation format. Fictional artist profiles varied in
          contextual framing and institutional signaling. A controlled
          behavioral study measured how these differences shaped engagement.
        </p>
      </ArticleParagraph>
      <ArticleParagraph title="Crowdfunded Revenue Share Model">
        <p>
          Art markets balance exclusivity, which protects value, against
          accessibility, which sustains participation. Traditional transactions
          are high-risk and low-liquidity, restricting entry. The proposed model
          reframes acquisition as incremental participation, lowering financial
          thresholds while maintaining structured exchange.
        </p>
      </ArticleParagraph>
    </ResponsiveColumns>
  </>
);

const ConceptualFraming = () => (
  <>
    <DescriptionHeader>THE APPROACH</DescriptionHeader>
    <p>
      Before fieldwork, I examined academic literature and conducted expert
      interviews to clarify the structural relationship between the physical art
      world and digitally mediated creative economies. Rather than treating
      digitization as a technological overlay, I approached it as an
      infrastructural condition reshaping communication and value formation.
    </p>
  </>
);

const Concept1 = () => (
  <>
    <p>
      With over 4.7 billion internet users globally and more than 90 percent
      active on social media{" "}
      <Reference
        index={1}
        href="https://datareportal.com/reports/digital-2023-global-overview-report"
        label="Datareportal, 2023"
      />
      , digital platforms structure contemporary cultural circulation. The art
      world no longer exists outside this ecosystem.
    </p>
    <p>
      Artists increasingly rely on Instagram and similar platforms for audience
      development, brand construction, and market visibility. Studies show that
      social media presence functions as a form of professional signaling, where
      follower metrics, aesthetic coherence, and engagement rates shape
      perceived legitimacy{" "}
      <Reference
        index={2}
        href="https://www.researchgate.net/publication/282334355_Having_it_All_on_Social_Media_Entrepreneurial_Femininity_and_Self-Branding_Among_Fashion_Bloggers"
        label="Duffy & Hund, 2015"
      />{" "}
      <Reference
        index={3}
        href="https://www.researchgate.net/publication/230764911_The_end_of_the_art_connoisseur_Experts_and_knowledge_production_in_the_visual_arts_in_the_digital_age"
        label="Arora & Vermeylen, 2013"
      />
      . In practice, online branding has become intertwined with artistic career
      progression.
    </p>
    <p>
      This positions the art world within the same communicative logic as other
      digitally native creative industries.
    </p>
  </>
);

const Concept2 = () => (
  <>
    <p>
      The digital content creation sector shares core characteristics with the
      art market: creative labor, reputation-based value, and audience-dependent
      monetization. However, unlike fine art institutions, this sector has
      embraced digitization at scale.
    </p>
    <p>
      Valued at $25.6 billion and driven by demand for interactivity and creator
      autonomy{" "}
      <Reference
        index={4}
        href="https://www.grandviewresearch.com/industry-analysis/digital-content-creation-market-report"
        label="Grand View Research, 2023"
      />
      , the content economy demonstrates how visibility, algorithmic
      distribution, and personal branding can become central value mechanisms.
      As a comparative reference group, it reveals what full digital integration
      looks like when creative work is native to platform logics.
    </p>
    <p>
      This contrast highlights the art world’s partial adaptation and its
      unresolved tensions.
    </p>
  </>
);

const Concept3 = () => (
  <>
    <p>
      Despite operating within digital communication systems, the art market
      remains materially and institutionally anchored. Physical exhibition
      spaces preserve scarcity, spatial authority, and curated legitimacy.
    </p>
    <p>
      Digital environments operate differently. They privilege circulation,
      reproducibility, and user reinterpretation{" "}
      <Reference
        index={5}
        href="https://www.researchgate.net/publication/366705973_The_status_of_art_in_the_modern_digital_space"
        label="Olenina, 2022"
      />
      , which complicates the translation of artistic value and authorship into
      digital contexts. As Benjamin argued in The Work of Art in the Age of
      Mechanical Reproduction, reproducibility alters the perceived aura of the
      work. In digital contexts, ease of copying and sharing often reduces
      perceived material value.
    </p>
    <p>
      Attempts to reintroduce scarcity through NFTs illustrate the difficulty of
      translating institutional value structures into platform environments. By
      2023, over 95 percent of NFT collections had lost significant market value
      <Reference
        index={6}
        href="https://www.sciencedirect.com/search?qs=NFT%20market%20value%20decline"
        label="ScienceDirect"
      />
      , suggesting that technical scarcity does not automatically recreate
      symbolic legitimacy.
    </p>
    <p>
      Digital tools expand access and participation, but they also destabilize
      interpretive authority and authenticity{" "}
      <Reference
        index={7}
        href="https://www.researchgate.net/publication/325004755_Challenging_prevailing_narratives_with_Twitter_An_AustraliaDay_case_study_of_participation_representation_and_elimination_of_voice_in_an_archive"
        label="Fransen-Taylor & Narayan, 2018"
      />{" "}
      <Reference
        index={8}
        href="https://www.researchgate.net/publication/353739967_A_critical_appraisal_of_diversity_in_digital_knowledge_production_Segregated_inclusion_on_YouTube"
        label="Chen et al., 2021"
      />
      . The result is not seamless integration but structural friction between
      exposure, credibility, and exchange.
    </p>
  </>
);

const InterviewDesc = () => (
  <>
    {" "}
    <p>
      To examine how credibility, access, and digital behaviors operate across
      stakeholder groups, I conducted 12 semi-structured interviews with
      artists, consumers, and distributors. Sampling was purposive. Participants
      were selected to represent variation in role, market experience, and media
      orientation.
    </p>
  </>
);

const InDepthInterviews = () => {
  const [role, setRole] = useState(1);

  const panelVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };
  function RolePanel({ role }) {
    if (role === 1) {
      return (
        <>
          <div className="w-full flex flex-wrap justify-center flex-row gap-16 mt-4 mb-12">
            <Interviewee image={pf1} />
            <Interviewee
              image={pf2}
              name="M"
              bio="Female, American, Late 40s"
              location="New York City"
              description="Performance and video art"
            />
          </div>
          <div className="bg-[var(--bg2)] p-[1em] rounded-lg mb-[2em] overflow-hidden">
            <H4>Artists</H4> included both traditional practitioners, such as
            painters and sculptors, and those working in digital-first or
            time-based forms such as video, installation, and online
            commissions.{" "}
          </div>
        </>
      );
    }

    if (role === 2) {
      return (
        <>
          <div className="w-full flex flex-wrap justify-center flex-row gap-16 mt-4 mb-12">
            <Interviewee
              image={pf3}
              name="O"
              bio="Female, American, Early 50s"
              location="Boston, MA"
              description="Active individual collector"
            />
            <Interviewee
              image={pf4}
              name="B"
              bio="Female, Korean, Late 50s"
              location="Seoul, Korea"
              description="Hotel management business"
            />
          </div>
          <div className="bg-[var(--bg2)] p-[1em] rounded-lg mb-[2em] overflow-hidden">
            <H4>Consumers</H4> ranged from seasoned collectors to first-time
            buyers engaging with handmade or digital works through informal
            channels such as Etsy or Instagram.
          </div>
        </>
      );
    }

    return (
      <>
        <div className="w-full flex flex-wrap justify-center flex-row gap-16 mt-4 mb-12">
          <Interviewee
            image={pf5}
            name="D"
            bio="Male, Spanish, Early 40s"
            location="New York City"
            description="Art dealer"
          />
          <Interviewee
            image={pf6}
            name="Y"
            bio="Female, Korean, Late 50s"
            location="Seoul, Korea"
            description="Gallery owner"
          />
        </div>
        <div className="bg-[var(--bg2)] p-[1em] rounded-lg mb-[2em] overflow-hidden">
          <H4>Distributors</H4> represented gallerists and curators involved in
          either physical or hybrid models of exhibition and sales.
        </div>
      </>
    );
  }

  return (
    <>
      <ResponsiveColumns>
        <div className="">
          <GraphicCaption className="mb-[3em]">
            Interviewee Profiles (6 of 12)
          </GraphicCaption>
          <div className="text-[0.8em]">
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <RolePanel role={role} />
              </motion.div>
            </AnimatePresence>
          </div>

          <Toggle
            items={[
              { label: "Artists", value: 1 },
              { label: "Consumers", value: 2 },
              { label: "Distributors", value: 3 },
            ]}
            value={role}
            onChange={setRole}
          />
        </div>
        <ListVertical desc="Interview Prompts">
          <BulletVertical>
            Daily workflows and decision processes
          </BulletVertical>
          <BulletVertical>
            Mechanisms of value recognition and signaling
          </BulletVertical>
          <BulletVertical>
            Platform use and online branding practices
          </BulletVertical>
          <BulletVertical>
            Discovery and sales strategies across physical and digital contexts
          </BulletVertical>
          <BulletVertical>
            Institutional versus peer-based legitimacy
          </BulletVertical>
          <BulletVertical>
            Anecdotes on pain points and struggles
          </BulletVertical>
        </ListVertical>{" "}
      </ResponsiveColumns>
    </>
  );
};

const ObsDesc = () => (
  <>
    <p>
      To complement interview findings, I conducted structured field observation
      across multiple Chelsea-based galleries in New York. The objective was to
      examine how credibility signaling, access control, and transactional
      discretion operate in physical exhibition contexts.
    </p>
  </>
);
const QSDesc = () => <></>;
const ObservationalResearch = () => (
  <>
    <ListVertical desc="Observation Focus">
      <BulletVertical>
        Spatial organization and boundary signaling
      </BulletVertical>
      <BulletVertical>
        Interaction patterns between artists, gallerists, collectors, and casual
        visitors
      </BulletVertical>
      <BulletVertical>
        Visibility of pricing and transactional cues
      </BulletVertical>
      <BulletVertical>
        Informal markers of status, affiliation, and insider recognition
      </BulletVertical>
    </ListVertical>
  </>
);

const QualitativeSynthesis = () => (
  <>
    <p>
      Interview transcripts and observational notes were analyzed using a
      structured thematic process.
    </p>
    <p>
      First, transcripts were reviewed and segmented into discrete observations.
      Using an empathy-mapping framework, notes were organized around what
      participants said, thought, felt, and did. This helped separate explicit
      statements from inferred motivations and observable behaviors.
    </p>
    <p>
      Initial open codes were then generated to capture recurring concepts
      related to credibility, exposure, legitimacy, transaction structure, and
      digital behavior. All notes were tagged by stakeholder role, artists,
      consumers, and distributors, to preserve perspective differences during
      subsequent clustering.
    </p>
    <p>
      The coded dataset was then reorganized through two complementary analytic
      passes.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="w-full">
        <div className="aspect-square w-full my-8">
          <img
            src={raffinity}
            alt="Affinity Mapping"
            className="w-full h-full object-cover"
          />
        </div>
        <H4>Affinity Mapping</H4> was used to cluster thematically similar codes
        into broader structural patterns.
      </div>
      <div className="w-full">
        <div className="aspect-square w-full my-8">
          <img
            src={rvalence}
            alt="Valence Mapping"
            className="w-full h-full object-cover"
          />
        </div>
        <H4>Valence Mapping</H4> was applied to the same body of notes to
        distinguish enabling conditions from friction points.
      </div>
    </div>

    <p>
      These mappings operated independently, one to identify thematic
      convergence, the other to assess directional impact.
    </p>
    <p>
      Themes were reviewed for cross-role recurrence and structural relevance.
      Priority was given to tensions that appeared across multiple stakeholder
      groups and shaped observable behaviors.
    </p>
  </>
);

// Synthesis Subsections

const Finding1 = () => (
  <>
    <GraphicCaption>Creative Work Pyramid</GraphicCaption>
    <PyramidDiagram
      levels={[
        {
          title: "Art",
          subtitle: "Institutional",
          caption:
            "This refers to work that is institutionally validated. It appears in museums, commercial galleries, and curated exhibitions.",
        },
        {
          title: "Indie Art",
          subtitle: "Independent / Scene-driven",
          caption:
            "This is made by artists who are part of the scene but not yet institutionally absorbed. It circulates through zines, project spaces, alternative venues, and informal networks.",
        },
        {
          title: "Popular Art",
          subtitle: "Commercial / Personal",
          caption:
            "This includes everyday creative work like pet portraits, Etsy prints, or hobbyist illustration. It's not formally recognized as 'art' but serves expressive or ornamental functions.",
        },
        {
          title: "Creative Contents",
          subtitle: "Functional / Attention-based",
          caption:
            "This refers to generial media created for engagement. It may include tutorials, ads, entertainment clips, or visually engaging material intended to be consumed quickly.",
        },
      ]}
    />
    <ResponsiveColumns>
      <p>
        Traditional art occupies a structurally privileged position at the top
        of the broader creative economy. Despite the expansion of digital and
        popular creative markets, works outside institutional contexts are often
        denied cultural legitimacy. Value in the art world continues to be
        shaped by gatekeeping mechanisms such as curation, market history and
        professional reputation, which define what counts as art versus content.
      </p>
      <p>
        Yet across both institutional and informal domains, the value of
        creative work is mediated through systems of credibility. This is where
        a structural parallel emerges: in both contexts, social proximity and
        network play a central role in validating value. In digital and informal
        markets, credibility is conferred through audience engagement, perceived
        authenticity, and peer validation. Subcultural spaces develop their own
        forms of gatekeeping grounded in shared values and insider recognition.
      </p>

      <p>
        Credibility, then, acts as the connective infrastructure between
        visibility and transaction. This concept serves both legacy institutions
        and emerging creative markets, and it will continue to play a central
        role as the art world becomes more digitally integrated.
      </p>
    </ResponsiveColumns>
  </>
);
const Finding2 = () => (
  <>
    <GridPlot
      gridSize={20}
      points={[
        {
          name: "Fine Art",
          x: -2.6,
          y: -4,
          dx: 16,
          dy: 14,
          highlight: true,
        },
        { name: "Music", x: -1, y: 1, dx: 18, dy: 15 }, // dx: (9/7)*9, dy: (3/7)*9

        {
          name: "Interactive Installation",
          x: 0,
          y: -1,
          dx: 19,
          dy: 12,
          isArt: true,
        },
        { name: "Public Art", x: -7.71, y: -9, isArt: true },
        { name: "Digital Art", x: -2, y: 9, dx: 14, dy: 0, isArt: true },
        { name: "Membership Content", x: 6.43, y: 9 },
        { name: "Social Media Presence", x: 5, y: 7, dx: 8 },
        { name: "Flea Market Booth", x: 7.71, y: -9 },

        { name: "Game Development", x: 0, y: 7.8, dx: 15.43, dy: 0 }, // dx: (12/7)*9, dy: (2/7)*9
        { name: "Blog/Personal Essay", x: 7, y: 3.86 },
        { name: "Crafts (Etsy)", x: 5.14, y: -2.57 },

        { name: "Animation (studio)", x: -7, y: 6.43 },
        { name: "Freelance Journalism", x: -2.57, y: 3.86 },

        { name: "Film", x: -2, y: 4, dx: 14 },
        {
          name: "Performance Art",
          x: 1.93,
          y: -6.43,
          dx: 9,
          dy: 5.14,
          isArt: true,
        }, // dx: (7/7)*9, dy: (4/7)*9
        { name: "Zines/Prints", x: 5.14, y: -7 },
        { name: "Broadcast Journalism", x: -7.71, y: 0 },
        { name: "Academic Publishing", x: -9, y: -3.86 },
      ]}
    />
    <p>
      While the category itself resists containment, its subversive and
      experimental nature allows it to blur into adjacent forms that are not
      confined in the physical realm. Meanwhile, other creative fields operate
      comfortably in decentralized, digital-first environments. This porousness
      reveals that art continues to evolve alongside, but not uniformly with,
      other creative industries.
    </p>

    <ChartContainer>
      <GraphicCaption>
        Modes of Digital Integration in the Art Sector
      </GraphicCaption>
      <AxisPlot
        points={[
          { name: "E-mail Inquiries", value: -9 },
          { name: "Online Journals", value: -7 },
          { name: "Online Archiving", value: -5 },
          { name: "Online Auction", value: -2 },
          { name: "Social Media", value: 0 },
          { name: "Online Community Building", value: 2 },
          { name: "Live Broadcasting", value: 4 },
          { name: "Digital Arts", value: 6 },
          { name: "Full-Online Art Exhibition", value: 7 },
          { name: "Net Arts", value: 9 },
        ]}
        min={-10}
        max={10}
      />
    </ChartContainer>
    <p>
      Though social media is a widely used tool among artists, deeper
      integration of digital platforms into core professional practices remains
      uneven. Cultural perceptions equating digital tools with inauthenticity or
      disposability prevent many from engaging beyond promotional use. These are
      perceptual limitations that hinder deeper digital integration by
      disrupting traditional notions of artistic value and professionalism.
    </p>
  </>
);
const Finding3 = () => (
  <>
    <ResponsiveColumns>
      <p>
        For the art ecosystem to remain sustainable, it must support both the
        retention of established participants and the entry of new ones. This
        includes creating viable conditions for emerging artists and reducing
        barriers for new audiences.
      </p>
      <p>
        Emerging artists need accessible pathways to visibility, collaboration,
        and income. These pathways cannot rely solely on prestige-based
        recognition or slow-moving market validation. Many artists sustain
        themselves through day-to-day creative labor that sits outside
        institutional endorsement such as digital commissions, teaching, or
        commercial work, while continuing to develop their independent practice.
        These forms of work should not be dismissed as marginal, but understood
        as integral to how artistic careers are built and sustained.
      </p>
      <p>
        From the audience perspective, lack of engagement is often rooted in
        uncertainty. Many potential buyers question their ability to evaluate
        art, especially in the absence of clear signals of value. This
        hesitation reflects a broader issue: without accessible interpretive
        frameworks, the perceived risks of participating in the art market
        increase.
      </p>
      <p>
        Where credibility defines how value is stabilized, accessibility ensures
        that value can circulate. It supports the arrival of new actors, the
        growth of alternative markets, and the possibility of broader
        participation without diluting the integrity of the system.
      </p>
    </ResponsiveColumns>
  </>
);

const HowMightWe1 = () => {
  return (
    <HmwScenario
      caption="In a gallery..."
      images={[r11, r12]}
      description="A casual buyer considers a $4,000 artwork but quickly disengages. Jargon-heavy wall text and lack of social cues erode his confidence. The moment of potential purchase slips away, not because of price, but because of uncertainty."
      problems={[
        "Lack of interpretive entry points for non-experts",
        "Cultural gatekeeping embedded in language and presentation",
        "Fear of misreading or misjudging value",
      ]}
      responses={[
        "help buyers assess legitimacy without insider knowledge?",
        "support discovery beyond popularity signals?",
        "make credibility cues legible without gatekeeping?",
      ]}
    />
  );
};
const HowMightWe2 = () => (
  <HmwScenario
    caption="At an opening..."
    images={[r21, r22]}
    description="A promising exchange between an artist and a curator ends on an
          awkward note. The tone of Instagram is ambiguous, feeling personal to
          some and accessible to others, leaving both parties unsure whether
          they misread the situation."
    problems={[
      "Mixed expectations around how to present and contact professionally",
      "Blurred boundary between social and institutional norms",
      "Friction in transitioning from informal discovery to formal contact",
    ]}
    responses={[
      "support mode-switching between casual visibility and professional credibility?",
      "recognize and adapt to the social-professional ambiguity of the art world?",
      "help users signal availability and intent more clearly in mixed settings?",
    ]}
  />
);

const HowMightWe3 = () => (
  <HmwScenario
    caption="Once upon a day..."
    images={[r31, r32]}
    description="An emerging artist juggles teaching and freelance gigs, but lacks a
          space that feels both professional and approachable. Relying on
          Instagram, he’s mistaken as a hobbyist. The credibility gap lies not
          in the work, but in the format."
    problems={[
      "Professional identity is obscured by fragmented income streams",
      "Lack of consistent representation undermines perceived legitimacy",
      "Informal or multi-track artists are often overlooked",
    ]}
    responses={[
      "help emerging artists present a coherent professional narrative across informal work?",
      "surface credibility cues for artists outside institutional frameworks?",
      "design tools that validate hybrid creative labor, not penalize it?",
    ]}
  />
);

const StoryboardsAndHMWs = () => {
  return <></>;
};

const Direction1Desc = () => (
  <div>
    <span className="inline-block font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-1 rounded border text-green-500 border-green-500/40 bg-green-500/10">
      ● Tested
    </span>
  </div>
);

const Direction2Desc = () => (
  <>
    <div>
      <span className="inline-block font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-1 rounded border text-[var(--txt3)] border-[var(--txt3)] bg-[var(--bg2)]">
        ○ Designed
      </span>
    </div>
  </>
);
const Direction1 = () => (
  <>
    <img
      src={ill2}
      alt="Affinity Mapping"
      className="max-w-[900px] min-h-[150px] mx-auto w-full h-auto object-cover"
    />
    <p>
      {" "}
      This proposal positions a platform between social networks and databases.
      Social platforms prioritize speed and reach, but context is fragmented and
      short-lived. Databases preserve structured information, but tend to limit
      interaction. The design assumes a gap between visibility and structured
      representation.{" "}
    </p>{" "}
    <p>
      {" "}
      The model combines persistent profiles with navigability. Similar to a
      wiki, it organizes biography, works, exhibitions, and references in a
      structured, indexable format. Contact functions are integrated to support
      direct inquiry from within the profile. Artists can opt in to manage their
      profiles, while non-participating artists remain as indexed entries. This
      is intended to maintain coverage without relying solely on
      self-promotion.{" "}
    </p>{" "}
    <img
      src={ill1}
      alt="Affinity Mapping"
      className="max-w-[900px] min-h-[150px] mx-auto w-full h-auto object-cover"
    />
    <p>
      {" "}
      The platform also introduces relational navigation. Artists, movements,
      themes, and exhibitions are linked to form a network of references. The
      design assumes that this structure can support exploration and contextual
      understanding, particularly for non-specialist users. Whether this leads
      to more informed discovery, compared to feed-based systems or static
      archives, remains to be tested.{" "}
    </p>
  </>
);

const Direction2 = () => (
  <>
    <img
      src={ill3}
      alt="Affinity Mapping"
      className="max-w-[900px] min-h-[200px] mx-auto w-full h-auto object-cover"
    />
    <p>
      {" "}
      Another proposal is a crowdfunded revenue share model funding an artwork
      at the production stage through pooled capital. Contributors provide
      upfront funding and receive a proportional claim on proceeds after the
      initial sale, without taking possession of the work. The structure
      resembles early-stage investment, where capital enters before pricing and
      timing are known. The design applies this logic to a single artwork rather
      than a company, with returns tied to one sale event.{" "}
    </p>{" "}
    <p>
      {" "}
      It differs from commissions, where one patron funds and owns the piece,
      and from reward-based crowdfunding, where contributors receive goods
      without a revenue claim. It also differs from the gallery model, where
      ownership and potential appreciation are tied to possession.{" "}
    </p>{" "}
    <ModelTable />
    <p>
      The model is intended to convert early interest into working capital and
      distribute financial risk across multiple contributors. It is also
      designed to separate ownership from participation, allowing smaller
      commitments while maintaining a single physical work. By linking returns
      to sale outcomes rather than rewards, the approach aims to frame
      participation as capital allocation. Whether this maintains focus on the
      artwork and avoids the dynamics of reward-driven crowdfunding remains to
      be tested.{" "}
    </p>
  </>
);
const TestDesignA = () => {
  return (
    <>
      <ArticleParagraph title="Purpose">
        <p>
          This test examines how differences in profile contextualization shape
          contact initiation, hesitation, and perceived credibility across
          formats. Across all interactions, the study also tracks whether
          participants use relational navigation features, such as related
          artists, as part of their decision-making process.
        </p>
      </ArticleParagraph>
      <ArticleParagraph title="Experimental Setup">
        <p>
          Participants were presented with three artist profiles simultaneously.
          Each profile represented the same underlying type of artist but was
          expressed through a different presentation format. The formats varied
          in the degree and type of contextual information provided,
          particularly around institutional affiliation, professional framing,
          and narrative structure.
        </p>
      </ArticleParagraph>
      <GraphicCaption>Profile Formats</GraphicCaption>
      <RathouseLofi />
      <ResponsiveColumns>
        <ArticleParagraph title="Logic">
          <p>
            While the presentation format varied, the following elements were
            held constant across all profiles:
          </p>

          <ListVertical>
            <BulletVertical>Artist Name</BulletVertical>
            <BulletVertical>A “related artists” section</BulletVertical>
            <BulletVertical>A browsable preview of works</BulletVertical>
            <BulletVertical>On-site messaging</BulletVertical>
            <BulletVertical>External contact information</BulletVertical>
          </ListVertical>

          <p>
            Artist identities were controlled to reduce content variance. All
            profiles represented established painters in their 40s–50s based in
            Europe, with comparable levels of implied career maturity.
          </p>
        </ArticleParagraph>
        <ArticleParagraph title="Interaction Context">
          <p>
            Participants were asked to engage with the profiles under one of
            three scenarios:
          </p>
          <ListVertical>
            <BulletVertical>Casual Networking</BulletVertical>
            <BulletVertical>Art Purchase</BulletVertical>
            <BulletVertical>Business Inquiry</BulletVertical>
          </ListVertical>
          <p>
            These scenarios were used to observe how intent interacts with
            presentation format in shaping engagement behavior.
          </p>
        </ArticleParagraph>
      </ResponsiveColumns>
    </>
  );
};

const TestExecution = () => (
  <>
    <ArticleParagraph title="Procedure">
      <p> 10 Participants were given the following prompt:</p>

      <ChartContainer className="my-[1em]">
        <div className="font-mono text-[0.8em] tracking-[0.16em] text-[var(--txt2)] mb-[1em]">
          THE PROMPT
        </div>
        For a given reason, you need to contact all three artists. Please move
        through the profiles naturally, and explain what you are thinking and
        doing as you engage with each one.
      </ChartContainer>
      <p>
        All three profiles were displayed simultaneously on a neutral interface.
        Participants were encouraged to think aloud while interacting, allowing
        both behavioral and cognitive data to be captured.
      </p>
      <p>
        Participants were not given a prescribed order of interaction, allowing
        natural prioritization and comparison behavior to emerge.
      </p>
    </ArticleParagraph>
    <ArticleParagraph title="Participants">
      The participant pool included 4 individual buyers (assigned the art
      purchase scenario), 4 practicing artists, and 2 business-affiliated
      participants. Participants in the latter group completed multiple
      scenarios across the three formats, allowing comparison of behavior under
      different engagement intents.
    </ArticleParagraph>
    <ArticleParagraph title="Measures">
      <p>
        The study captured both behavioral and interpretive data across four
        dimensions:
      </p>
      <ListVertical>
        <BulletVertical title="Interaction Order">
          Which profile was approached first, second, and third.
        </BulletVertical>
        <BulletVertical title="Contact Behavior">
          Mode of contact (message, external email, or disengagement). Presence
          of hesitation or delay before initiating contact.
        </BulletVertical>
        <BulletVertical title="Cognitive Responses">
          Verbalized reasoning during interaction, including expressions of
          uncertainty, confidence, or risk.
        </BulletVertical>
        <BulletVertical title="Perception">
          Perceived clarity, professionalism, and legitimacy. Perceived social
          risk associated with contacting each artist.
        </BulletVertical>
        <BulletVertical title="Context-Seeking Behavior">
          Whether participants used the “related artists” feature. When
          navigation occurred relative to contact decisions. Frequency and depth
          of lateral navigation.
        </BulletVertical>
      </ListVertical>
      <p>
        Because the relational navigation feature was present across all
        formats, its usage is treated as an observational measure rather than an
        experimentally isolated variable.
      </p>
    </ArticleParagraph>
  </>
);

const FramingShapedCommunicationDescription = () => (
  <p>
    Participants did not follow a fixed order when choosing which artist to
    contact. However, communication method varied consistently by format.
  </p>
);

const FramingShapedCommunication = () => (
  <>
    <ListVertical>
      <BulletVertical title="Format A">
        Used for browsing and visual exploration.
        <br />
        Avoided completely for transactional or professional inquiries.
        <br />
        Redirected contact to more formal channels (e.g., email).
      </BulletVertical>
      <BulletVertical title="Format B">
        Treated as a semi-private, semi-professional space.
        <br />
        Used for context-aware messages.
      </BulletVertical>
      <BulletVertical title="Format C">
        Enabled direct purchase inquiries, with 4 participants using in-app
        messaging in place of email.
        <br />
        Described as “most legitimate” yet "moderated"
        <br /> Also prompted external browsing on social platforms for lighter,
        lateral exploration (e.g., “I would look them up on social media”).
      </BulletVertical>
    </ListVertical>
    <FindingParagraph
      tagline="Presentation style acted as a proxy for tone and intent. "
      desc="The features were identical across formats; the format alone determined which channels participants considered appropriate."
    />
  </>
);

const PurchasePrioritizedStructureAndAffiliationDescription = () => (
  <p>
    In purchase-related tasks, users showed clear preference for formats that
    projected transactional legitimacy.
  </p>
);

const PurchasePrioritizedStructureAndAffiliation = () => (
  <>
    <ListVertical>
      <BulletVertical>
        With Format A, all participants avoided in-app messaging and used
        external links. Although visually compelling, the lack of structural
        cues signaled that it was not an appropriate channel for initiating
        monetary exchanges.
      </BulletVertical>
      <BulletVertical>
        Format C supported confident transactional behavior. Participants
        reported feeling "pretty legitimate" using its messaging function, and
        several cited the presence of contextual depth and institutional framing
        as reasons.
      </BulletVertical>
      <BulletVertical>
        Three participants sought gallery affiliations proactively. They used
        provided contact info when available or indicated they would ask via
        email.
      </BulletVertical>
    </ListVertical>
    <FindingParagraph
      tagline="Visual appeal did not signal transactional legitimacy. Structural cues did."
      desc="Buyers needed institutional framing, contextual depth, affiliation markers to feel confident initiating monetary exchange, not aesthetics."
    />
  </>
);

const ContextWasBuiltThroughExploratoryChecksDescription = () => (
  <p>
    Contextual depth was sought but not required prior to engagement. Rather
    than following a fixed sequence, participants maintained a layered,
    non-committal approach, sampling different signals before deciding how to
    proceed.
  </p>
);
const ContextWasBuiltThroughExploratoryChecks = () => (
  <>
    <ListVertical>
      <BulletVertical>
        All cases explored additional context through profile text (especially
        in Format C), artwork previews, or external searches.
      </BulletVertical>
      <BulletVertical>
        Three participants explicitly asked if they could "like their content"
        before initiating conversation, suggesting a desire for soft engagement
        cues.
      </BulletVertical>
      <BulletVertical>
        Four participants checked profile recency as a proxy for responsiveness,
        particularly in Format B, where activity was ambiguous between the
        social Format A and the more moderated Format C.
      </BulletVertical>
      <BulletVertical>
        Within this broader approach, Format A functioned as a low-commitment
        entry point. Two participants noted they "would look them up on
        Instagram too" as part of a wider context-building process.
      </BulletVertical>
    </ListVertical>
    <FindingParagraph
      tagline="Participants did not require contextual depth before engaging. They sampled signals in a layered, non-committal sequence."
      desc="Context was assembled through probing action. Format A served as a low-commitment entry point into a wider context-building process."
    />
  </>
);

const LateralExplorationReliedOnRelationalCuesDescription = () => <></>;
const LateralExplorationReliedOnRelationalCues = () => (
  <>
    <ListVertical>
      <BulletVertical>
        Six participants used the related-artist feature unprompted. In purchase
        scenarios, three explicitly described their goal as "I want to identify
        stylistic alternatives."
      </BulletVertical>
      <BulletVertical>
        Beyond finding alternatives, participants used relational cues to
        understand how artists were positioned. They turned to external
        platforms to check mutual connections or affiliations, favoring
        SNS-style formats for lateral navigation.
      </BulletVertical>
      <BulletVertical>
        When interpreting these relationships, participants questioned whether
        they reflected actual social ties or system-generated associations: "Did
        the artist put that in themselves? Is this like a friend feature?"
      </BulletVertical>
    </ListVertical>

    <FindingParagraph
      tagline="Users preferred socially grounded signals over abstract similarity."
      desc="Whether artists were meaningfully connected in practice mattered more than whether the system grouped them stylistically."
    />
  </>
);

const Insights = () => (
  <>
    <ArticleParagraph title="Framing Shaped Communication" className="">
      <p>
        Participants did not follow a fixed order when choosing which artist to
        contact. However, communication method varied consistently by format.
      </p>

      <p>
        Across contexts, participants adapted their communication behavior based
        on inferred platform norms. Presentation style acted as a proxy for tone
        and intent, guiding both how users approached artists and which channels
        they considered appropriate, even when the available features were
        identical.
      </p>
    </ArticleParagraph>
    <ArticleParagraph
      title="Purchase Prioritized Structure and Affiliation
"
      className=""
    >
      <p>
        In purchase-related tasks, users showed clear preference for formats
        that projected transactional legitimacy.
      </p>
      <ListVertical>
        <BulletVertical>
          With <span className="font-bold">Format A</span>, all participants
          avoided in-app messaging and used external links. Although visually
          compelling, the lack of structural cues signaled that it was not an
          appropriate channel for initiating monetary exchanges.
        </BulletVertical>
        <BulletVertical>
          <span className="font-bold">Format C</span>, in contrast, supported
          confident transactional behavior. Participants reported feeling
          “pretty legitimate” using its messaging function, and several cited
          the presence of contextual depth and institutional framing as reasons.
        </BulletVertical>
        <BulletVertical>
          3 participants sought gallery affiliations proactively. They used
          provided contact info when available or indicated they would ask via
          email.
        </BulletVertical>
      </ListVertical>
    </ArticleParagraph>
    <ArticleParagraph
      title="Context was Built Through Exploratory Checks"
      className=""
    >
      <p>
        Contextual depth was sought but not required prior to engagement. Rather
        than following a fixed sequence, participants maintained a layered,
        non-committal approach, sampling different signals before deciding how
        to proceed:
      </p>
      <ListVertical>
        <BulletVertical>
          All cases explored additional context through profile text (especially
          in Format C), artwork previews, or external searches.
        </BulletVertical>
        <BulletVertical>
          3 participants explicitly asked if they could "like their content"
          before initiating conversation, suggesting a desire for soft
          engagement cues.
        </BulletVertical>
        <BulletVertical>
          4 participants checked profile recency as a proxy for responsiveness,
          particularly in Format B, where activity was ambiguous between the
          social (Format A) and the more moderated or institutionally presented
          Format C.
        </BulletVertical>
      </ListVertical>
      <p>
        Within this broader approach, Format A functioned as a low-commitment
        entry point. While not considered sufficient for serious evaluation,
        participants were comfortable using it to initiate exploration, with 2
        noting they “would look them up on Instagram too” as part of a wider
        context-building process.
      </p>
    </ArticleParagraph>
    <ArticleParagraph
      title="Lateral Exploration Relied on Relational Cues"
      className=""
    >
      <p>
        6 participants used the related artist feature unprompted. On purchase
        scenario, 3 explicitly described that “I want to identify stylistic
        alternatives.”
      </p>
      <p>
        Beyond finding alternatives, participants also used relational cues to
        understand how artists are positioned. Participants used external
        platforms to check mutual connections or affiliations, favoring
        SNS-style formats for lateral navigation.
      </p>
      <p>
        When interpreting these relationships, participants questioned whether
        they reflected actual social ties or system-generated associations,
        asking “Did the artist put that in themselves? Is this like a friend
        feature?” This reflects a preference for socially grounded signals:
        users were less interested in abstract similarity and more in whether
        artists are meaningfully connected in practice (e.g., shared networks,
        real affiliations, or ongoing interaction).
      </p>
    </ArticleParagraph>
  </>
);

const TestDesignB = () => (
  <>
    <ResponsiveColumns>
      <ArticleParagraph title="Purpose">
        <p>
          The central question is whether a revenue-share model changes user
          behavior in ways that are materially different from more familiar
          artist support models. In particular, the test asks:
        </p>
        <ListVertical>
          <BulletVertical>
            Does revenue-share attract stronger initial interest?{" "}
          </BulletVertical>
          <BulletVertical>
            Does it lead users to inspect terms more carefully?{" "}
          </BulletVertical>
          <BulletVertical>
            Does it increase perceived value, or perceived risk?{" "}
          </BulletVertical>
          <BulletVertical>
            Does it produce stronger commitment, or more hesitation and
            deferral?
          </BulletVertical>
          <BulletVertical>
            Under what conditions does it outperform or underperform donation
            and reward-based support?
          </BulletVertical>
        </ListVertical>
        <p>
          This test is intended as an early step toward business-model
          validation. It evaluates not only whether users engage with the
          format, but whether the model shows signs of supporting viable
          transaction behavior.
        </p>
      </ArticleParagraph>

      <ArticleParagraph title="Setup">
        <p>
          Participants are shown the same artist project in three alternative
          versions. Each version presents an identical artist, project
          description, and interface structure. The only manipulated variable is
          the support model:
        </p>
        <ListVertical>
          <BulletVertical title="Donation" vertical>
            support the artist with no return.
          </BulletVertical>
          <BulletVertical title="Reward-based" vertical>
            support in exchange for a defined non-financial benefit.
          </BulletVertical>
          <BulletVertical title="Revenue Share" vertical>
            support in exchange for a share of future sale proceeds.
          </BulletVertical>
        </ListVertical>
        <p>
          Participants are asked to browse each version naturally while thinking
          aloud. They may inspect details, compare options, and decide whether
          they would support the project. To introduce tradeoffs, each
          participant is given a fixed amount of hypothetical platform credit
          and asked to allocate it across one or more options, or leave some or
          all of it unspent.
        </p>
        <p>
          Where useful, participants can also be shown secondary detail states,
          such as expanded terms, FAQ panels, risk explanations, or platform fee
          disclosures, in order to observe what information they seek before
          deciding.
        </p>
      </ArticleParagraph>
    </ResponsiveColumns>
  </>
);

const TestMeasuresB = () => {
  const Keys = ({ list }) => (
    <div className="my-8 rounded-md bg-[var(--bg2)] px-3 py-2">
      <GraphicCaption icon="fa-flag">Key Metrics</GraphicCaption>

      <div className="flex flex-wrap gap-1 mt-[1em]">
        {list.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[0.9em] px-2 py-[2px] rounded bg-[var(--bg3)] text-[var(--txt2)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div>
        <MonoLabel>Main Measures</MonoLabel>
        <ListVertical>
          <BulletVertical title="Attraction">
            First view, time spent, and exploration behavior.
            <br />
            <Keys
              list={[
                "attention share",
                "detail expansion rate",
                "revisit frequency",
              ]}
            />
          </BulletVertical>

          <BulletVertical title="Evaluation">
            How participants interpret the model and what effort is required
            before judgment.
            <br />
            <Keys
              list={[
                "term inspection depth",
                "comparison behavior",
                "decision latency",
                "clarification requests",
                "perceived clarity",
                "fairness and risk perception",
              ]}
            />
          </BulletVertical>

          <BulletVertical title="Commitment">
            Whether evaluation leads to support behavior.
            <br />
            <Keys
              list={[
                "conversion rate",
                "allocation amount",
                "allocation concentration",
                "exclusive vs split support",
                "deferred intent",
              ]}
            />
          </BulletVertical>
        </ListVertical>
      </div>
      <div>
        <MonoLabel>Exploratory Measures</MonoLabel>
        <ListVertical>
          <BulletVertical title="Fee Sensitivity (Exploratory)">
            Response to the presence of platform fees and perceived fairness.
          </BulletVertical>

          <BulletVertical title="Trust Threshold">
            Information required before commitment, including terms,
            credibility, and payout clarity.
          </BulletVertical>

          <BulletVertical title="Risk Interpretation">
            How participants interpret uncertainty, delayed outcomes, and
            downside.
          </BulletVertical>
        </ListVertical>
      </div>
    </>
  );
};

const TestAnalysisB = () => (
  <>
    <ListVertical>
      <BulletVertical>
        Compare attention share and entry order to identify initial attraction.
      </BulletVertical>

      <BulletVertical>
        Compare inspection depth and decision latency to identify cognitive and
        trust-related friction.
      </BulletVertical>

      <BulletVertical>
        Compare conversion and allocation to distinguish shallow interest from
        meaningful commitment.
      </BulletVertical>

      <BulletVertical>
        Track drop-off points, such as abandonment after term inspection, to
        locate breakdowns in the flow.
      </BulletVertical>

      <BulletVertical>
        Segment participants by behavior, such as immediate supporters,
        evaluators, and non-converters, to identify who each model serves.
      </BulletVertical>
    </ListVertical>
  </>
);

const TestBDesc = () => (
  <>
    <p>
      This test examines how different support models shape user engagement with
      the same artist project. The objective is to isolate how the structure of
      participation affects attention, interpretation, trust, and willingness to
      commit.
    </p>
  </>
);

const TestBMeaDesc = () => (
  <>
    <p>
      Engagement is tracked as a staged process. Measures distinguish between
      attraction, evaluation, and commitment to separate curiosity from decision
      and decision from action.
    </p>
    <p>
      Alongside the main measures, lightweight probes are used to surface early
      constraints on viability without treating the study as a pricing test.
    </p>
  </>
);

const TestBAnaDesc = () => (
  <>
    <p>
      Analysis focuses on where each model gains or loses users across the
      engagement process, rather than on aggregate preference.
    </p>
    <p>
      The output is a behavioral map of how each model performs across stages.
      This defines where further testing is required, particularly around fee
      structure, trust signals, and clarity of return.
    </p>
  </>
);

const Next = () => (
  <>
    <DescriptionHeader>Conclusion</DescriptionHeader>
    <p>
      Test A established how presentation structure shapes credibility,
      context-building, and contact behavior. Test B extends this into
      transaction logic, examining how different support models affect
      attention, evaluation, and commitment.
    </p>
    <p>
      The next step is to execute Test B under controlled conditions to identify
      where each model gains or loses users across the engagement process. The
      focus is not on validating a final model, but on locating friction points,
      particularly around interpretation, trust, and perceived fairness.
    </p>
    <p>
      Findings from this stage will define whether revenue-share functions as a
      viable participation format, and under what conditions. These constraints
      will guide subsequent design decisions, including how terms are presented,
      what information is required before commitment, and how participation
      models are positioned within the platform. The outcome is a more
      constrained direction for the transactional layer, grounded in observed
      behavior rather than assumption.
    </p>
  </>
);
// Full export
export default {
  Overview,
  "Recurring Tensions": Process,
  "Two Directions": InsightToConcept,
  RTdesc,
  TDdesc,
  "Conceptual Framing": ConceptualFraming,
  "The art world now operates within a digital communication infrastructure":
    Concept1,
  "Digital content creation as a structural parallel": Concept2,
  "Integration produces structural tension": Concept3,
  "In-depth Interviews": InDepthInterviews,
  InterviewDesc,
  "Observational Research": ObservationalResearch,
  ObsDesc,
  "Qualitative Synthesis": QualitativeSynthesis,
  QSDesc,
  "Value Recognition Through Credibility": Finding1,
  "Malleable Nature of Art": Finding2,
  "Accessibility for Continuity": Finding3,

  "Buyer Uncertainty": HowMightWe1,
  "Social-Professional Ambiguity": HowMightWe2,
  "Artist Sustainability": HowMightWe3,

  "Social Media - Database Hybrid Navigation": Direction1,
  "Crowdfunded Revenue Share Model": Direction2,
  Direction1Desc,
  Direction2Desc,
  "Test Design (A)": TestDesignA,
  "Test Execution": TestExecution,
  Insights: Insights,

  "Framing Shaped Communication": FramingShapedCommunication,
  "Framing Shaped Communication Description":
    FramingShapedCommunicationDescription,

  "Purchase Prioritized Structure and Affiliation":
    PurchasePrioritizedStructureAndAffiliation,
  "Purchase Prioritized Structure and Affiliation Description":
    PurchasePrioritizedStructureAndAffiliationDescription,

  "Context was Built Through Exploratory Checks":
    ContextWasBuiltThroughExploratoryChecks,
  "Context was Built Through Exploratory Checks Description":
    ContextWasBuiltThroughExploratoryChecksDescription,

  "Lateral Exploration Relied on Relational Cues":
    LateralExplorationReliedOnRelationalCues,
  "Lateral Exploration Relied on Relational Cues Description":
    LateralExplorationReliedOnRelationalCuesDescription,

  "Test Design (B)": TestDesignB,
  "Test Measures (B)": TestMeasuresB,
  "Test Analysis (B)": TestAnalysisB,
  TestBDesc,
  TestBMeaDesc,
  TestBAnaDesc,
  "What Comes Next?": Next,
};
