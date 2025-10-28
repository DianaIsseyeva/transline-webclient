import { SvgRect } from './svg-rect';
import { SvgPath } from './svg-path';
import { SvgCircle } from './svg-circle';

export type Svg = {
  rects?: ReadonlyArray<SvgRect>;
  paths?: ReadonlyArray<SvgPath>;
  circles?: ReadonlyArray<SvgCircle>;
  width?: number;
  height?: number;
  fill?: string;
  opacity?: number;
  viewBox?: string;
};
