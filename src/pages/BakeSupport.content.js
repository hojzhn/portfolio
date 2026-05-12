import React from "react";
import { CodeBlock, CodeInline } from "../components/Code";

import ArticleParagraph from "../components/ArticleParagraph";
import { ListVertical, BulletVertical } from "../components/ListVertical";
import BolFlowChart from "../components/ReactFlow/BolFlowChart";
import BolFlowChartScale from "../components/ReactFlow/BolFlowChartScale";
import BolFlowChartConversion from "../components/ReactFlow/BolFlowChartConversion";
import { InlineMath } from "react-katex";
import PainPointsInteractive from "../components/Bol/PainPoints";
import GraphicCaption from "../components/GraphicCaption";
import Reordering from "../components/Bol/Reordering";
import InlineEditing from "../components/Bol/InlineEditing";
import ProcessAlignment from "../components/Bol/ProcessAlignment";
import UnitRep from "../components/Bol/UnitRep";
import PageRecipeFlow from "../components/Bol/PageRecipeFlow";
import ScreenShowcase from "../components/ScreenShowcase";

import img1_1 from "../images/bol/1-1.gif";
import img1_2 from "../images/bol/1-2.png";
import img1_3 from "../images/bol/1-3.gif";
import img1_4 from "../images/bol/1-4.gif";
import img1_5 from "../images/bol/1-5.gif";

import img2_1 from "../images/bol/2-1.png";
import img2_2 from "../images/bol/2-2.png";
import img2_3 from "../images/bol/2-3.png";

import img3_1 from "../images/bol/3-1.png";
import img3_2 from "../images/bol/3-2.png";
import img3_3 from "../images/bol/3-3.png";
import img3_4 from "../images/bol/3-4.png";

import img4_1 from "../images/bol/4-1.png";
import img4_2 from "../images/bol/4-2.png";

import img5_1 from "../images/bol/5-1.png";
import img5_2 from "../images/bol/5-2.png";
import img5_3 from "../images/bol/5-3.png";
import img5_4 from "../images/bol/5-4.png";

import img6_1 from "../images/bol/6-1.png";
import img6_2 from "../images/bol/6-2.png";
import img6_3 from "../images/bol/6-3.png";
import img6_4 from "../images/bol/6-4.png";
import img6_5 from "../images/bol/6-4.png";
import img6_6 from "../images/bol/6-4.png";

import img7_1 from "../images/bol/7-1.gif";
import img7_2 from "../images/bol/7-2.gif";
import img7_3 from "../images/bol/7-3.gif";

import img8_1 from "../images/bol/8-1.png";
import img8_2 from "../images/bol/8-2.png";
import img8_3 from "../images/bol/8-3.png";

import img9_1 from "../images/bol/9-1.png";
import img9_2 from "../images/bol/9-2.png";
import img9_3 from "../images/bol/9-3.png";
import img9_4 from "../images/bol/9-4.png";
import ResponsiveColumns from "../components/ResponsiveColumns";
import DescriptionHeader from "../components/DescriptionHeader";

const Overview = () => (
  <>
    <DescriptionHeader>Cooking app for recipe development</DescriptionHeader>
    <p>
      A design exploration aimed at cooks who iterate. Built end-to-end as a
      working prototype, with design decisions tested in code rather than in
      mockup.
    </p>
  </>
);

const SummaryDesc = () => (
  <>
    <p>
      Bol's design rests on four moves. Each is detailed in the sections that
      follow: interaction, data, computation, and the structure that ties them
      together.
    </p>
  </>
);
const Summary = () => (
  <>
    <ResponsiveColumns>
      <ScreenShowcase
        className="mb-8"
        images={[img1_1, img1_2, img1_3, img1_4, img1_5]}
        description="App Overview"
      />
      <div>
        <ArticleParagraph title="Design approach" className="mb-[2em]">
          Recipes are modeled as compositions of blocks rather than flat
          ingredient lists. Each block holds quantitative attributes that
          compute across the full recipe, preserving phase structure and
          system-level ratios.
        </ArticleParagraph>
        <div className="border-b border-[var(--bg3)] mb-[2em]" />
        <ArticleParagraph title="Editing model" className="mb-[2em]">
          The recipe is treated as a live source of truth. Users scale, adjust,
          and restructure it inline before saving, without losing consistency
          across the formula.
        </ArticleParagraph>{" "}
        <div className="border-b border-[var(--bg3)] mb-[2em]" />
        <ArticleParagraph title="Versioning" className="mb-[2em]">
          Iterations are first-class. Recipes can be saved as versions, compared
          with previous states, and rolled back over time.
        </ArticleParagraph>{" "}
        <div className="border-b border-[var(--bg3)] mb-[2em]" />
        <ArticleParagraph title="Implementation" className="mb-[2em]">
          Built in React Native with a state-driven architecture and a custom
          computation layer. Designed and implemented end-to-end from data
          model, interaction patterns, core logic, and the full front-end
          interface.
        </ArticleParagraph>
      </div>
    </ResponsiveColumns>
  </>
);
const DesignMotivation = () => (
  <>
    <DescriptionHeader>My Approach</DescriptionHeader>
    <p>
      I approached cooking as a problem of structured data and state
      transformation. A recipe is closer to programming or experimental workflow
      than to static content. Its outcome depends on how components are defined,
      combined, and modified over time. The design treats it that way.
    </p>
  </>
);

const Approach = () => (
  <>
    <ListVertical>
      <BulletVertical title="Structure">
        How recipes are modeled as components and relationships.
      </BulletVertical>
      <BulletVertical title="View">
        How the current state of the system is exposed.
      </BulletVertical>
      <BulletVertical title="Transformation">
        How changes are made and applied to that system.
      </BulletVertical>
      <BulletVertical title="Persistence and Versioning">
        How states are stored, compared, and recovered over time.
      </BulletVertical>
    </ListVertical>
    <p>
      The following sections outline specific pain points in existing recipe
      tools and how each is addressed within this framework.
    </p>
  </>
);
const PainsSolutions = () => (
  <>
    <PainPointsInteractive />
  </>
);

const Interaction = () => (
  <>
    <DescriptionHeader>Steps for intuitive editing</DescriptionHeader>
    <p>
      The interaction model removes the boundary between viewing and editing.
      Every visible element is mutable, and structural changes happen through
      direct manipulation of what's already on screen.
    </p>
  </>
);
const EditingModelDescription = () => (
  <p>
    Editing is inline and applied directly to the working document. Fields are
    editable in place without modal transitions or separate edit modes.
  </p>
);
const EditingModel = () => (
  <>
    <div className=" max-w-[520px] mx-auto w-full">
      <GraphicCaption className="my-4">Editing Model Demo</GraphicCaption>
      <InlineEditing />
    </div>
  </>
);
const DirectManipulationDescription = () => (
  <p>
    Structural changes are performed through direct manipulation of visible
    elements.
  </p>
);
const DirectManipulation = () => (
  <>
    <div className=" max-w-[520px] mx-auto w-full">
      <GraphicCaption className="my-4">Reordering Demo</GraphicCaption>
      <Reordering />
    </div>
    <ListVertical>
      <BulletVertical title="Line Reordering">
        Lines can be reordered within or across groups. This updates{" "}
        <CodeInline text="line_ids" /> without modifying line data.
      </BulletVertical>
      <BulletVertical
        title="Grouping
"
      >
        Moving a line between groups updates membership through references.
      </BulletVertical>
    </ListVertical>{" "}
    <div className=" max-w-[520px] mx-auto w-full">
      <GraphicCaption className="my-4">Direction Demo</GraphicCaption>
      <ProcessAlignment />
    </div>
    <ListVertical>
      <BulletVertical
        title="Direction Linking
"
      >
        Direction steps append ingredient lines by referencing existing{" "}
        <CodeInline text="line_id" />
        s. This creates links through <CodeInline text="line_refs" /> rather
        than duplicating content.
      </BulletVertical>
      <BulletVertical
        title="Feedback

"
      >
        All actions update the layout immediately, reflecting the current
        structure.{" "}
      </BulletVertical>
    </ListVertical>
  </>
);
const UnitRepresentationDescription = () => (
  <p>
    Units are handled as a display layer over a consistent internal
    representation.
  </p>
);
const UnitRepresentation = () => (
  <>
    <div className=" max-w-[520px] mx-auto w-full">
      <GraphicCaption className="my-4">Unit Representation Demo</GraphicCaption>
      <UnitRep />
    </div>
  </>
);

const SystemDesign = () => (
  <>
    <DescriptionHeader>Logic</DescriptionHeader>
    <p>
      The data model separates what a thing is from where it sits. Ordering is
      handled through arrays of stable IDs, and references travel through those
      IDs, This lets parts move without breaking links.
    </p>
  </>
);
const RecipeSchemaDescription = () => (
  <p>
    The recipe is stored as a single document and used as the source of truth
    during editing. Instead of deep nesting, it is split into parallel sections
    that reference each other through stable IDs.
  </p>
);

const RecipeSchema = () => (
  <>
    <div>
      <GraphicCaption className="my-4">Recipe Document Schema</GraphicCaption>
      <CodeBlock
        language="json"
        text={` {
    "recipe_id": "r_001",

    // Metadata (title, tags, version info, source, etc.)
    // Timestamps (created, updated, touched)
    
    "group_order": ["g_1", "g_2", "g_3"],

    "groups": {
      "g_1": {
        "id": "g_1",
        "name": "Main Dough",
        "line_ids": ["l_0", "l_3", "l_5"]
      },
      "g_2": {
        "id": "g_2",
        "name": "Preferment",
        "line_ids": ["l_1", "l_4"]
      }
    },

    "lines": {
      "l_0": {
        "id": "l_0",
        "ingredient_id": "in_1",
        "type": "base",
        "g": 400,
        "locked": false,
        "note": null
      },
      "l_1": {
        "id": "l_1",
        "ingredient_id": "in_1",
        "type": "base",
        "g": 100
      }
    },

    "dir_group_order": ["dg_1", "dg_2"],

    "dir_groups": {
      "dg_1": {
        "id": "dg_1",
        "name": "Preparation",
        "dir_line_ids": ["d_1", "d_2"]
      }
    },

    "dir_lines": {
      "d_1": {
        "id": "d_1",
        "title": "Mix ingredients and rest 30 min",
        "body": null,
        "line_refs": ["l_0", "l_3"]
      }
    }
  }`}
      />
    </div>

    <ListVertical>
      <BulletVertical title="Structure">
        Groups define structure, lines hold content. Both ingredients and
        directions follow the same pattern: ordered groups referencing ordered
        line IDs.
      </BulletVertical>

      <BulletVertical title="Ordering">
        Ordering is handled through arrays like{" "}
        <CodeInline text="group_order" /> and <CodeInline text="line_ids" />,
        separating identity from position. Elements can be moved or reorganized
        without breaking references, and diffs can be computed by comparing ID
        lists and record changes.
      </BulletVertical>

      <BulletVertical title="Referencing">
        Direction lines reference ingredient <CodeInline text="line_id" />s
        through <CodeInline text="line_refs" />, linking steps to specific
        inputs without duplicating data.
      </BulletVertical>

      <BulletVertical title="Consistency">
        Groups organize but do not own data. Lines remain independent, so moving
        or updating a line propagates everywhere it is referenced.
      </BulletVertical>

      <BulletVertical title="Storage">
        The document is stored directly as JSON locally for fast editing. In the
        backend, it is decomposed into relational tables and reconstructed into
        this shape when loaded.
      </BulletVertical>
    </ListVertical>
  </>
);
const IngredientModelDescription = () => (
  <p>
    Pantry and ingredients are separated into two layers. Shelves organize
    ingredients for navigation, while the ingredient database defines the
    ingredients themselves.
  </p>
);
const IngredientModel = () => (
  <>
    <div>
      <GraphicCaption className="my-4">Shelf Document Schema</GraphicCaption>
      <CodeBlock
        text={`{
  "shelf_id": "s_1",
  "shelf_name": "Favorites",
  "ingredient_ids": ["in_1", "in_2", "in_3"],
  "nav_visible": true,
  "pinned": true,
  "memo": null,
  "touched_at": "ISO_TIMESTAMP"
}`}
      />
    </div>{" "}
    <div>
      <GraphicCaption className="my-4">
        Ingredient Document Schema
      </GraphicCaption>
      <CodeBlock
        text={`{
  "in_id": 1,

    // Metadata (name, brand, description, favorited, etc.)
    // Timestamps (created, updated, touched)

  "in_comp": [
    {
      "id": "cmp_1",
      "name": "Protein",
      "value": 0.135,
      "basis": "fraction",
      "calc": true
    },
    {
      "id": "cmp_2",
      "name": "Ash",
      "value": 0.005,
      "basis": "fraction",
      "calc": true
    }
  ],

  "conversions": {
    "volume": {
      "enabled": true,
      "unit": "cup",
      "grams_per_unit": 120
    },
    "single": {
      "enabled": false,
      "unit": "piece",
      "grams_per_unit": null
    }
  }
}`}
      />
    </div>
    <ListVertical>
      <BulletVertical title="Structure">
        Shelves define grouping and order, while ingredients remain independent
        records referenced by <CodeInline text="in_id" />.
      </BulletVertical>

      <BulletVertical title="Referencing">
        Recipes and pantry both reference the same ingredient records, keeping
        definitions consistent across contexts.
      </BulletVertical>

      <BulletVertical title="Composition">
        <CodeInline text="in_comp" /> stores user-defined attributes as
        name–value pairs with a basis, used when needed for simple calculations.
      </BulletVertical>

      <BulletVertical title="Conversions">
        <CodeInline text="conversions" /> defines how an ingredient maps to
        volume or unit-based measurements.
      </BulletVertical>

      <BulletVertical title="Consistency">
        Shelves organize but do not own data, so updates propagate wherever the
        ingredient is referenced.
      </BulletVertical>
    </ListVertical>
  </>
);

const ComputationLogic = () => (
  <>
    <ArticleParagraph title="Totals and Percentages">
      <div className="flex-col flex flex-0 m-auto gap-y-2 mb-8">
        <InlineMath math={`T = \\sum_{i} g_i`} />
        <InlineMath math={`B = \\sum_{i \\in \{baseLines}} g_i`} />
        <InlineMath math={`p_i = \\tfrac{g_i}{B} \\times 100`} />
      </div>
      <p>
        All totals and percentages are recalculated automatically whenever the
        recipe state changes, including complete total, group totals, and total
        weight of base ingredients for baker's percentage.
      </p>
    </ArticleParagraph>
    <div className="my-8 pointer-events-none">
      <GraphicCaption className="my-4">Scaling Flowchart</GraphicCaption>

      <BolFlowChartScale />
    </div>
    <ArticleParagraph title="Scaling">
      <p>
        Users can scale at three levels: single line, group, or recipe total.
        Ratios between lines are preserved, allowing the users to scale the
        recipe with ease.
      </p>
    </ArticleParagraph>

    <div className="my-8">
      <GraphicCaption className="my-4">Editing Flowchart</GraphicCaption>
      <BolFlowChart which={2} />
    </div>
    <ArticleParagraph title="Editing">
      <p>
        Editing differs from scaling because ratios are not preserved. Instead
        of uniformly applying a factor, bakers can make targeted changes: edit
        the weight of a single line, adjust a group total with redistribution
        among its lines, or modify the overall recipe total. The system
        recalculates dependent values accordingly.
      </p>
      <p>
        Editing is flexible: individual lines or whole groups can be locked so
        they remain fixed, while unlocked values redistribute. For example, a
        baker might lock the salt and preferment amounts, then raise the overall
        dough weight; the system will scale only the remaining ingredients,
        keeping the fixed elements unchanged.
      </p>
    </ArticleParagraph>
    <div className="my-8 pointer-events-none">
      <GraphicCaption className="my-4">Conversion Flowchart</GraphicCaption>
      <BolFlowChartConversion />
    </div>
    <ArticleParagraph title="Unit Conversion">
      <p>
        While the default unit is grams, users can switch between Metric and
        Customary systems, toggle between weight and volume, or define weight in
        terms of a custom unit. Each ingredient can carry its own conversion
        rates: a volume rate (e.g., grams or ounces per milliliter or cup) and a
        single-unit rate (e.g., grams per egg).
      </p>
      <p>
        These can be specified manually when defining an ingredient, ensuring
        accuracy for nonstandard items.
      </p>
      <p>
        To reduce setup work, common presets are offered, such as standard flour
        or water conversions, that can be applied directly or overridden with
        custom values. This makes scaling more adaptable, especially when
        recipes mix weights, volumes, and countable units.
      </p>
    </ArticleParagraph>
  </>
);
const VersioningDescription = () => (
  <p>
    This versioning structure separates the current working state from saved
    history. The structure was designed to keep restoration and comparison
    reliable, while also making the system extensible for branching, merging,
    and collaborative authorship later.
  </p>
);
const Versioning = () => (
  <>
    <div>
      <GraphicCaption className="my-4">Versioning Structure</GraphicCaption>
      <CodeBlock
        text={`{
  "recipe_id": "r_001",

  "version_state": {
    "active_branch_id": "main",
    "active_version_id": "v_012",
    "working_parent_version_id": "v_012",
    "has_uncommitted_changes": true
  },

  "branches": {
    "main": {
      "id": "main",
      "name": "Main",
      "head_version_id": "v_012",
      "created_at": "ISO_TIMESTAMP",
      "archived": false
    }
  },

  "versions": {
    "v_011": {
      "id": "v_011",
      "branch_id": "main",
      "parent_version_ids": ["v_010"],
      "created_at": "ISO_TIMESTAMP",
      "author_id": "u_001",
      "label": "Before hydration adjustment",
      "snapshot": { "/* full recipe document */": "..." },
      "diff_from_parent": [
        {
          "op": "update_line",
          "line_id": "l_3",
          "changes": {
            "g": { "from": 290, "to": 300 }
          }
        }
      ],
      "is_merge_commit": false
    },

    "v_012": {
      "id": "v_012",
      "branch_id": "main",
      "parent_version_ids": ["v_011"],
      "created_at": "ISO_TIMESTAMP",
      "author_id": "u_001",
      "label": "Adjusted hydration",
      "snapshot": { "/* full recipe document */": "..." },
      "diff_from_parent": [
        {
          "op": "update_line",
          "line_id": "l_3",
          "changes": {
            "g": { "from": 300, "to": 325 }
          }
        }
      ],
      "is_merge_commit": false
    }
  }
}`}
      />
    </div>

    <ListVertical>
      <BulletVertical>
        {" "}
        <CodeInline text="version_state" /> tracks what the editor is currently
        based on, including the active branch, the active saved version, and
        whether there are unsaved changes.{" "}
      </BulletVertical>
      <BulletVertical>
        <CodeInline text="branches" /> defines named version paths, even though
        only <CodeInline text="main" /> is used now, so the model can later
        support parallel experimentation without changing its shape.{" "}
      </BulletVertical>
      <BulletVertical>
        {" "}
        <CodeInline text="versions" /> stores immutable saved checkpoints. Each
        version points to one or more parents through{" "}
        <CodeInline text="parent_version_ids" />, which keeps the model simple
        today but leaves room for future merge behavior.{" "}
      </BulletVertical>
      <BulletVertical>
        {" "}
        Each checkpoint stores a full <CodeInline text="snapshot" /> of the
        recipe as the authoritative saved state, while{" "}
        <CodeInline text="diff_from_parent" /> provides a readable summary of
        what changed.
      </BulletVertical>
    </ListVertical>
  </>
);

const Structure = () => (
  <>
    <DescriptionHeader>The application</DescriptionHeader>
    <p>
      The system is structured to reduce coupling between reusable data and
      recipe-specific composition. Pantry data is treated as a stable source of
      truth, while recipe data acts as a mutable layer that can diverge without
      affecting global state.
    </p>
  </>
);
const UXStructureMapDescription = () => (
  <p>
    The system is structured to reduce coupling between reusable data and
    recipe-specific composition. Pantry Data is treated as a stable source of
    truth, while Recipe Data acts as a mutable layer that can diverge without
    affecting global state.
  </p>
);
const StructureMap = () => (
  <>
    <GraphicCaption>Interactive Structure Map (Prototype)</GraphicCaption>
    <PageRecipeFlow />
  </>
);

const ExampleB = () => (
  <>
    <div className="flex flex-wrap justify-center gap-8">
      <ScreenShowcase
        className="w-full max-w-[320px]"
        images={[img2_1, img2_2, img2_3]}
        description="Add ingredient line"
      />
      <ScreenShowcase
        className="w-full max-w-[320px]"
        images={[img3_1, img3_2, img3_3, img3_4]}
        description="Edit ingredient line"
      />
    </div>
  </>
);
const ExampleC = () => (
  <>
    <div className="flex flex-wrap justify-center gap-8">
      <ScreenShowcase
        description="Create new block"
        className="w-full max-w-[320px]"
        images={[img4_1, img4_2]}
      />
      <ScreenShowcase
        description="Edit or export block"
        className="w-full max-w-[320px]"
        images={[img5_1, img5_2, img5_3, img5_4]}
      />
    </div>
  </>
);
const ExampleD = () => (
  <div className="flex flex-wrap justify-center gap-8">
    <ScreenShowcase
      description="Organize directions"
      className="w-full max-w-[320px] "
      images={[img6_1, img6_2, img6_3, img6_4, img6_5, img6_6]}
    />
  </div>
);
const ExampleE = () => (
  <>
    <ScreenShowcase
      description="Shelf Navigation"
      className="md:mb-8"
      images={[img7_1, img7_2, img7_3]}
    />

    <div className="flex flex-wrap justify-center gap-8">
      <ScreenShowcase
        description="Save Ingredient to Pantry"
        className="w-full max-w-[320px]"
        images={[img8_1, img8_2, img8_3]}
      />
      <ScreenShowcase
        description="Add Shelf"
        className="w-full max-w-[320px]"
        images={[img9_1, img9_2, img9_3]}
      />
    </div>
  </>
);

const Next = () => (
  <>
    <DescriptionHeader>Version control and collaboration</DescriptionHeader>
    <p>
      The next phase is to clarify whether this system can operate as a
      version-control model for cooking rather than a conventional recipe
      manager.
    </p>
    <p>
      That means formalizing the mechanics of branching, revision, comparison,
      and merge. A recipe version cannot function like a generic save state. It
      needs to communicate what changed, whether that change is local or shared,
      and how one variation relates to another. In practice, this means defining
      a recipe diff model across ingredients, ratios, blocks, and directions,
      then making those differences legible enough for non-technical users.
    </p>
    <p>
      This also creates a social and collaborative direction for the product. If
      recipes can be forked, attributed, revised, and merged, the platform could
      support a network of derivative work rather than isolated personal files.
      Users would not only store recipes, but build on one another’s work in a
      traceable way.
    </p>
    <p>
      The open question is whether Git-like power can be translated into a form
      that still feels usable in a culinary context. The next step is to design
      and test that translation.
    </p>
  </>
);

// Recipe App: Computation-Driven UX
export default {
  Overview,
  Summary,
  SummaryDesc,
  //DesignMotivation
  "Design Motivation": DesignMotivation,
  "Areas of Focus": Approach,
  "Pain Points and Solutions": PainsSolutions,

  // // Interaction
  "Interaction Design": Interaction,
  "Editing Model": EditingModel,
  "Direct Manipulation": DirectManipulation,
  "Unit Representation": UnitRepresentation,

  // // System and Data Design
  "System and Data Design": SystemDesign,
  "Recipe Schema": RecipeSchema,
  "Ingredient Model": IngredientModel,
  "Computation Logic": ComputationLogic,
  Versioning: Versioning,

  // // Interaction Design

  // // Structure and Flows
  "Structure and Flows": Structure,
  "UX Structure Map": StructureMap,

  "Example A. Add / Edit Ingredient": ExampleB,
  "Example B. Add / Edit Block": ExampleC,
  "Example C. Manage Directions": ExampleD,
  "Example D. Shelf Navigation": ExampleE,
  // Takeaways
  "What Comes Next?": Next,

  // descriptions
  "Editing Model Description": EditingModelDescription,
  "Direct Manipulation Description": DirectManipulationDescription,
  "Unit Representation Description": UnitRepresentationDescription,
  "Recipe Schema Description": RecipeSchemaDescription,
  "Versioning Description": VersioningDescription,
  "Ingredient Model Description": IngredientModelDescription,
  "UX Structure Map Description": UXStructureMapDescription,
};
