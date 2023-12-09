import React from "react";
import ReactDOM from "react-dom/client";
import Header from "../Header";
import "../../../app/global.css";
import styles from "./HeaderIframe.module.scss";
import { packageFromPath } from "../../../common/utils";

const HeaderIframe = () => {
  const searchParams = new URL(window.document.location.href).searchParams;

  const force = !!searchParams.get("force");

  const { packageName: initialPackageName } = packageFromPath(
    window.location.pathname.split("/docs/")[1],
  );

  const handleSearchSubmit = async (pkg: string) => {
    const withForce = force ? "?force=true" : "";
    window.location.pathname = `/search/docs/${pkg}${withForce}`;
  };

  return (
    <div className={styles.docsHeaderContainer}>
      <Header
        minimal={false}
        initialSearchValue={initialPackageName}
        onSearchSubmit={handleSearchSubmit}
      />
    </div>
  );
};

document.addEventListener("DOMContentLoaded", (event) => {
  const rootElement = document.getElementById("docs-header");
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HeaderIframe />
    </React.StrictMode>,
  );
});
