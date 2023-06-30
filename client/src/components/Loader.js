import React from "react";
import { FallingLines } from "react-loader-spinner";
function Loader() {
  return (
    <div className="loader">
      <FallingLines
        color="black"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
}

export default Loader;
