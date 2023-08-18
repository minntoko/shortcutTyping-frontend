/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { type ReactElement, useRef } from 'react';
import { Animator } from '@arwes/react-animator';
import { FrameSVGKranox, useFrameSVGAssemblingAnimation } from '@arwes/react-frames';

interface FrameProps {
  wid: string;
  hei: string;
}

const KranoxFrame = ({wid = "300px", hei = "150px"}: FrameProps): ReactElement => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  const styles = css`
    position: relative;
    width: ${wid};
    height: ${hei};
    z-index: -1;
    [data-name=bg] {
      color: hsl(180, 75%, 10%);
      filter: drop-shadow(0 0 4px hsl(180, 75%, 10%));
    }
    [data-name=line] {
      color: hsl(180, 75%, 50%);
      filter: drop-shadow(0 0 4px hsl(180, 75%, 50%));
    }
  `;

  return (
    <Animator active={true}>
      <div css={styles}>
        <FrameSVGKranox
          elementRef={svgRef}
          onRender={onRender}
          padding={4}
          strokeWidth={2}
          squareSize={12}
          smallLineLength={12}
          largeLineLength={48}
        />
      </div>
    </Animator>
  );
};

export default KranoxFrame;