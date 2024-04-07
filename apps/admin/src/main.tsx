import ReactDOM from "react-dom";
import {
  AdminGuesser,
  HydraAdmin,
  OpenApiAdmin,
  hydraDataProvider,
  fetchHydra,
  openApiDataProvider,
  openApiSchemaAnalyzer,
} from "@api-platform/admin";

import { parseHydraDocumentation } from "@api-platform/api-doc-parser";

import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ accept: "application/json" });
  }
  // add your own headers here
  // options.headers.set("X-Custom-Header", "foobar");
  return fetchUtils.fetchJson(url, options);
};

const apiDocumentationParser = (entrypoint) =>
  parseHydraDocumentation(entrypoint, {
    headers: new Headers({ accept: "application/json" }),
  });

// const dataProvider = openApiDataProvider({
//   // Use any data provider you like
//   dataProvider: simpleRestProvider("http://223.130.128.93:8080", httpClient),
//   entrypoint: "http://223.130.128.93:8080",
//   docEntrypoint: "http://223.130.128.93:8080/v3/api-docs",
//   apiDocumentationParser: apiDocumentationParser,
// });

const schemaAnalyzer = openApiSchemaAnalyzer();

const dataProvider = hydraDataProvider({
  entrypoint: "http://223.130.128.93:8080",
  httpClient: fetchHydra,
  apiDocumentationParser: parseHydraDocumentation,
  mercure: true,
  useEmbedded: false,
});

const Admin = () => (
  <HydraAdmin
    entrypoint={"http://223.130.128.93:8080"}
    dataProvider={dataProvider}
    schemaAnalyzer={schemaAnalyzer}
  />
);

// To use OpenAPI (with a very simple REST data provider):
// const Admin = () => (
//   <OpenApiAdmin
//     // Replace with your own OpenAPI documentation entrypoint
//     docEntrypoint="http://localhost:5220/api-docs.json"
//     // Replace with your own API entrypoint
//     entrypoint="http://localhost:5220/"
//   />
// );

ReactDOM.render(<Admin />, document.getElementById("root"));
