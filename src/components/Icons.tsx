import { Svg } from '@/types/svg';
import { CSSProperties, FC } from 'react';

type StyleProps = {
  style?: CSSProperties;
  className?: string;
  wrapperClassName?: string;
};

type Props = StyleProps & {
  icon: Svg;
  strokeColor?: string;
  fillColor?: string;
  width?: number;
  height?: number;
  viewBox?: string;
};

export const Icon: FC<Props> = ({
  className,
  icon,
  strokeColor,
  fillColor,
  style,
  width,
  height,
  viewBox,
}: Props) => (
  <svg
    width={width ?? icon.width}
    height={height ?? icon.height}
    viewBox={viewBox ?? icon.viewBox}
    fill='none'
    className={className}
    style={style}
    xmlns='http://www.w3.org/2000/svg'
  >
    <g opacity={icon.opacity}>
      {icon?.circles?.map((circle, i) => (
        <circle
          key={i}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          fill={fillColor ?? circle.fill}
          opacity={circle.opacity}
        />
      ))}

      {icon?.rects?.map((rect, i) => (
        <rect
          key={i}
          width={rect.width}
          height={rect.height}
          x={rect.x}
          y={rect.y}
          rx={rect.rx}
          transform={rect.transform}
          fill={fillColor ?? rect.fill}
          stroke={strokeColor ?? rect.stroke}
          strokeWidth={rect.strokeWidth ?? 1}
        />
      ))}

      {icon?.paths?.map((path, i) => (
        <path
          key={i}
          d={path.d}
          stroke={strokeColor ?? path.stroke ?? 'currentColor'}
          strokeWidth={path.strokeWidth ?? 1}
          fill={fillColor ?? path.fill ?? 'none'}
          fillRule={path.fillRule}
          clipRule={path.clipRule}
          strokeOpacity={path.strokeOpacity}
        />
      ))}
    </g>
  </svg>
);
