/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { type ReactElement } from "react";
import { FrameSVGKranox } from "@arwes/react-frames";
import LinesFrame from "./layouts/LinesFrame";
import KranoxFrame from "./layouts/KranoxFrame";
import OctagonFrame from "./layouts/OctagonFrame";

const Test = (): ReactElement => {
  const styles = css`
    [data-name="bg"] {
      color: hsl(180, 75%, 10%);
    }
    [data-name="line"] {
      color: hsl(180, 75%, 50%);
    }
  `;
  return (
    <div className="flex justify-evenly items-center w-[100vw] h-[100vh]">
      <div
        style={{
          position: "relative",
          width: 300,
          height: 300,
          zIndex: 0,
        }}
      >
        <FrameSVGKranox css={styles} />
      </div>
      <LinesFrame wid="300px" hei="150px" />
      <KranoxFrame wid="300px" hei="150px" />
      <OctagonFrame wid="300px" hei="150px" />
      <div className="absolute top-0 h-[100vh] w-[100vw] bg-black -z-50" />
    </div>
  );
};

export default Test;
