export default function routeResolver(...routes) {
  return (
    "/" +
    routes
      .map((ele) => {
        if (ele.startsWith("/")) {
          ele = ele.slice(1);
        }
        if (ele.endsWith("/")) {
          ele = ele.slice(0, ele.length - 1);
        }

        return ele;
      })
      .join("/")
  );
}
