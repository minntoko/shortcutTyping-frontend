/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { type ReactElement } from 'react';
import { FrameSVGOctagon } from '@arwes/react-frames';

interface FrameProps {
  wid: string;
  hei: string;
  hovered: boolean;
}

const OctagonFrame = ({ wid = "300px", hei = "48px", hovered }: FrameProps): ReactElement => {
  const styles = css`
    position: relative;
    width: ${wid};
    height: ${hei};
    z-index: -1;
    [data-name="bg"] {
      color: ${hovered ? 'hsl(180, 75%, 15%)' : 'hsl(180, 75%, 10%)'};
      filter: drop-shadow(0 0 1px ${hovered ? 'hsl(180, 75%, 80%)' : 'hsl(180, 75%, 10%)'});
      transition: color 0.3s ease-in-out, filter 0.2s ease-out;
    }
    [data-name="line"] {
      color: ${hovered ? 'hsl(180, 85%, 70%)' : 'hsl(180, 85%, 50%)'};
      filter: drop-shadow(0 0 1px ${hovered ? 'hsl(180, 75%, 80%)' : 'hsl(180, 75%, 50%)'});
      transition: color 0.3s ease-in-out, filter 0.2s ease-out;
    }
  `;

  return (
    <div css={styles}>
      <FrameSVGOctagon />
    </div>
  );
};

export default OctagonFrame;
