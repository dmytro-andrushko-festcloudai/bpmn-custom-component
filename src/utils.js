function getUrl(data) {
  var encodedData = encodeURIComponent(data);

  return "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
}

function download(url, fileName) {
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function exportXML(bpmnModeler) {
  try {
    const { xml } = await bpmnModeler.saveXML({ format: true });
    const url = getUrl(xml);

    download(url, "xml-diagram.bpmn");
  } catch (err) {
    console.error("could not save BPMN 2.0 diagram", err);
  }
}

async function exportSVG(bpmnModeler) {
  try {
    const { svg } = await bpmnModeler.saveSVG();
    const url = getUrl(svg);

    download(url, "svg-diagram.svg");
  } catch (err) {
    console.error("could not save BPMN 2.0 diagram", err);
  }
}

export { exportXML, exportSVG };
