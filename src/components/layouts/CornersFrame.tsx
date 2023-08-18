/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { type ReactElement, useRef } from "react";
import { Animator } from "@arwes/react-animator";
import { FrameSVGCorners, useFrameSVGAssemblingAnimation } from "@arwes/react-frames";

interface FrameProps {
  wid: string;
  hei: string;
}

const CornersFrame = ({wid = "300px", hei = "150px"}: FrameProps): ReactElement => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  const styles = css`
    position: relative;
    width: ${wid};
    height: ${hei};
    z-index: -1;
    [data-name="bg"] {
      color: hsl(180, 75%, 10%);
      filter: drop-shadow(0 0 4px hsl(180, 75%, 10%));
    }
    [data-name="line"] {
      color: hsl(180, 75%, 50%);
      filter: drop-shadow(0 0 4px hsl(180, 75%, 50%));
    }
  `;

  return (
    <Animator active={true}>
      <div css={styles}>
        <FrameSVGCorners elementRef={svgRef} onRender={onRender} cornerLength={30} strokeWidth={2} />
      </div>
    </Animator>
  );
};

export default CornersFrame;