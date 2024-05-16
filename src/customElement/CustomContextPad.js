import svgIcon from "../assets/images/graphql.svg";

const SUITABILITY_SCORE_LOW = "GraphQl";

export default class CustomContextPad {
  constructor(
    bpmnFactory,
    config,
    contextPad,
    create,
    elementFactory,
    injector,
    translate
  ) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get("autoPlace", false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const { autoPlace, bpmnFactory, create, elementFactory, translate } = this;

    function appendServiceTask(suitabilityScore) {
      return function (event, element) {
        if (autoPlace) {
          const businessObject = bpmnFactory.create("bpmn:ServiceTask");

          businessObject.suitable = suitabilityScore;

          const shape = elementFactory.createShape({
            type: "bpmn:ServiceTask",
            businessObject: businessObject,
          });

          autoPlace.append(element, shape);
        } else {
          appendServiceTaskStart(event, element);
        }
      };
    }

    function appendServiceTaskStart(suitabilityScore) {
      return function (event) {
        const businessObject = bpmnFactory.create("bpmn:ServiceTask");

        businessObject.suitable = suitabilityScore;

        const shape = elementFactory.createShape({
          type: "bpmn:ServiceTask",
          businessObject: businessObject,
        });

        create.start(event, shape, element);
      };
    }

    return {
      "append.low-task": {
        group: "model",
        className: "bpmn-icon-task red",
        title: translate("Create Service Task with GraphQl params"),
        imageUrl: svgIcon,
        action: {
          click: appendServiceTask(SUITABILITY_SCORE_LOW),
          dragstart: appendServiceTaskStart(SUITABILITY_SCORE_LOW),
        },
      },
    };
  }
}

CustomContextPad.$inject = [
  "bpmnFactory",
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
];
