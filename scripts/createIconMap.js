const fs = require("fs");
const path = require("path");

const ICON_PATH = path.join(__dirname, "..", "src", "asset", "icon");

const filesUnresolved = fs
  .readdirSync(ICON_PATH)
  .filter((fileName) => /.svg$/.test(fileName));

const iconFileNameResolver = (unresolvedPathArr) =>
  unresolvedPathArr.map((fileName) => {
    const fileNameArr = fileName.split(".")[0].replace(/icon-/, "").split(/-/);
    return fileNameArr
      .map((str) => str[0].toUpperCase() + str.slice(1).toLowerCase())
      .join("");
  });

const importScript = (fileName, resolvedName) =>
  `import { ReactComponent as ${resolvedName} } from "${path.join(
    "asset",
    "icon",
    fileName
  )}";\n`;

function createIconMapJSON(filesUnresolved) {
  const fileNamesResolved = iconFileNameResolver(filesUnresolved);

  let script = "";

  fileNamesResolved.forEach((resolvedName, index) => {
    script += importScript(filesUnresolved[index], resolvedName);
  });

  script += `

import styled from "styled-components";

const SMoreVertical = styled(MoreVertical)\`
  width: 18px;
  height: 18px;

  path {
    fill: #c4c4c4;
  }
\`;

`;

  script += `const Icons = {${fileNamesResolved.join(",")}, SMoreVertical}\n`;

  script += `export default Icons;`;

  fs.writeFile(path.join(ICON_PATH, "icons.js"), script, () =>
    console.info("스크립트 생성 완료")
  );
}

createIconMapJSON(filesUnresolved);
