import BpmnModeler from "bpmn-js/lib/Modeler";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";
import diagramXML from "../resources/diagram.bpmn";
import customModule from "./customElement";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";

import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "@bpmn-io/properties-panel/assets/properties-panel.css";

import "./assets/style/main.scss";

// create modeler
const bpmnModeler = new BpmnModeler({
  container: "#canvas",
  additionalModules: [
    customModule,
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
  ],
  propertiesPanel: {
    parent: "#properties",
  },
});

// import XML
bpmnModeler.importXML(diagramXML).then(() => {});
