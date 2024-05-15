import BpmnModeler from "bpmn-js/lib/Modeler";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";
import diagramXML from "../resources/diagram.bpmn";
import customModule from "./customElement";
import magicPropertiesProviderModule from "./customProperty";
import magicModdleDescriptor from "./customProperty/descriptors/magic.json";
import { exportSVG, exportXML } from "./utils";

// bpmn library styles
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "@bpmn-io/properties-panel/assets/properties-panel.css";

// custom styles
import "./assets/style/main.scss";

// create modeler
const bpmnModeler = new BpmnModeler({
  container: "#canvas",
  additionalModules: [
    customModule,
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    magicPropertiesProviderModule,
  ],
  moddleExtensions: {
    magic: magicModdleDescriptor,
  },
  propertiesPanel: {
    parent: "#properties",
  },
});

// import XML
bpmnModeler.importXML(diagramXML).then(() => {});

// wire save button
document
  .getElementById("save-svg")
  .addEventListener("click", () => exportSVG(bpmnModeler));
document
  .getElementById("save-xml")
  .addEventListener("click", () => exportXML(bpmnModeler));
