/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { type ReactElement, useRef } from 'react';
import { Animator } from '@arwes/react-animator';
import { FrameSVGKranox, useFrameSVGAssemblingAnimation } from '@arwes/react-frames';

interface FrameProps {
  wid: string;
  hei: string;
}

const KranoxButton = ({wid = "300px", hei = "150px"}: FrameProps): ReactElement => {
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
      color: hsl(0, 0%, 100%);
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
          strokeWidth={1}
          squareSize={6}
          smallLineLength={12}
          largeLineLength={24}
        />
      </div>
    </Animator>
  );
};

export default KranoxButton;