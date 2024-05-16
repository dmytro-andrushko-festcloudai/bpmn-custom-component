import svgIcon from "../assets/images/graphql.svg";

const SUITABILITY_SCORE_LOW = "GraphQl";

export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const { bpmnFactory, create, elementFactory, translate } = this;

    function createTask(suitabilityScore) {
      return function (event) {
        const businessObject = bpmnFactory.create("bpmn:ServiceTask");

        businessObject.suitable = suitabilityScore;

        const shape = elementFactory.createShape({
          type: "bpmn:ServiceTask",
          businessObject: businessObject,
        });

        create.start(event, shape);
      };
    }

    return {
      "create.low-task": {
        group: "activity",
        className: "bpmn-icon-task red",
        title: translate("Create Service Task with GraphQl params"),
        imageUrl: svgIcon,
        action: {
          dragstart: createTask(SUITABILITY_SCORE_LOW),
          click: createTask(SUITABILITY_SCORE_LOW),
        },
      },
    };
  }
}

CustomPalette.$inject = [
  "bpmnFactory",
  "create",
  "elementFactory",
  "palette",
  "translate",
];
