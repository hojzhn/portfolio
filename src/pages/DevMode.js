import TwentyJourneyMap from "./TwentyJourneyMap";
import NorthStarMoment from "./NorthStarMoment";
import BeforeAfterTaskList from "./BeforeAfterTaskList";
import TaskActionComposer from "./TaskActionComposer";
import WireframeDemo from "./TwentyWireframe/WireframeDemo";
import { NapkinSketches } from "./TwentyWireframe/NapkinSketches";
import JourneyMap from "../components/Twenty/JourneyMap";
import TestContainer from "../components/Flag/Demo/TestContainer";
import TestPrototypes from "../components/Flag/Test/TestPrototypes";
const views = {
  journeyMap: <JourneyMap />,
  northStar: <NorthStarMoment />,
  wireframe: <WireframeDemo />,
  napkin: <NapkinSketches />,
  flag: <TestContainer />,
  flagPrototype: <TestPrototypes />,
};

export default function DevMode({ view = "journeyMap" }) {
  return views[view] || <div>Unknown dev view: {view}</div>;
}
