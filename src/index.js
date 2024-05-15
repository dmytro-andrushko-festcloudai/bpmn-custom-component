import BpmnModeler from "bpmn-js/lib/Modeler";
import diagramXML from '../resources/diagram.bpmn';

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";

import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import "./assets/style/main.scss";

const containerEl = document.getElementById("root");

// create modeler
const bpmnModeler = new BpmnModeler({
  container: containerEl,
});

// import XML
bpmnModeler.importXML(diagramXML).then(() => {})
