import React, { useState } from "react";
import { useSpring, animated, config, useTransition } from "react-spring";
import styles from "./preloader.module.scss";

interface GradientStop {
  stop: number;
  color: string;
}

interface ProgressProps {
  progress?: number;
  strokeWidth?: number;
  ballStrokeWidth?: number;
  reduction?: number;
  transitionDuration?: number;
  transitionTimingFunction?: string;
  background?: string;
  hideBall?: boolean;
  hideValue?: boolean;
  gradient?: GradientStop[];
  subtitle?: string;
  style?: React.CSSProperties;
  className?: string;
  suffix?: string;
}

export const Preloader: React.FC<ProgressProps> = ({
  progress = 0,
  strokeWidth = 4,
  ballStrokeWidth = 16,
  reduction = 0,
  background = "#0000004C",
  hideBall = false,
  hideValue = false,
  gradient = [
    { stop: 0.0, color: "#23a247" },
    { stop: 1, color: "#23a249" },
  ],
  subtitle = "",
  style,
  className,
  suffix = "%",
}) => {
  const width = 200;
  const center = width / 2;
  const height = 200 || center + center * Math.cos(reduction * Math.PI);
  const [unique] = useState(() => Math.random().toString());
  const rotate = 90 + 180 * reduction;
  const r = center - strokeWidth / 2 - ballStrokeWidth / 2;
  const circumference = Math.PI * r * 2;
  const offset = (circumference * (100 - progress * (1 - reduction))) / 100;
  const rInner = r - 10;
  // Анимация для изменения strokeDashoffset
  const offsetAnimation = useSpring({
    strokeDashoffset: offset,
    config: config.slow,
  });

  // Анимация для появления и изменения opacity
  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.default,
  });

  // Анимация для изменения opacity linearGradient
  const linearGradientAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.default,
  });

  // Анимация для изменения opacity и strokeWidth серого круга
  const greyCircleAnimation = useSpring({
    from: { opacity: 0, strokeWidth: 0 },
    to: { opacity: 1, strokeWidth: strokeWidth - 15 },
    config: config.default,
  });

  // Анимация для изменения opacity и strokeWidth шара
  const ballAnimation = useSpring({
    from: { opacity: 0, strokeWidth: 0 },
    to: { opacity: 1, strokeWidth: ballStrokeWidth },
    config: config.default,
  });

  // useTransition для управления появлением и исчезновением linearGradient
  const transitions = useTransition(!hideValue, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div className={`${className} ${styles.progress}`} style={style}>
      <animated.svg
        viewBox={`0 0 ${width} ${height}`}
        className={styles.svg}
        style={fadeInAnimation}
      >
        {/* Серый круг */}
        <animated.circle
          transform={`rotate(${rotate} ${center} ${center})`}
          id={`path`}
          cx={center}
          cy={center}
          r={r}
          style={greyCircleAnimation}
          fill="none"
          stroke={background}
          strokeLinecap="round"
        />

        {/* Линейный градиент */}
        <animated.linearGradient
          id={`gradient${unique}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          style={{ ...linearGradientAnimation }}
        >
          {gradient.map(({ stop, color }) => (
            <animated.stop
              key={stop}
              offset={`${stop * 100}${suffix || ""}`}
              stopColor={color}
            />
          ))}
        </animated.linearGradient>

        {/* Текст */}
        {!hideValue && (
          <animated.text
            x={center}
            className={styles.text}
            y={center + 40 / 4}
            textAnchor="middle"
            fontSize="40"
            fill="#23a247"
            style={fadeInAnimation}
          >
            {progress} {suffix}
          </animated.text>
        )}

        {/* Шар */}
        {!hideBall && (
          <animated.circle
            style={{
              strokeDasharray: `1 ${circumference}`,
              ...offsetAnimation,
              ...ballAnimation,
            }}
            transform={`rotate(${rotate} ${center} ${center})`}
            id={`path`}
            cx={center}
            cy={center}
            r={r}
            strokeWidth={ballStrokeWidth}
            fill="none"
            stroke={`url(#gradient${unique})`}
            strokeLinecap="round"
          />
        )}

        {/* Основной круг */}
        <animated.circle
          style={{
            strokeDasharray: `${circumference}`,
            ...offsetAnimation,
            ...linearGradientAnimation,
          }}
          transform={`rotate(${rotate} ${center} ${center})`}
          id={`path`}
          cx={center}
          cy={center}
          r={r}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={`url(#gradient${unique})`}
          strokeLinecap="round"
        />
      </animated.svg>
    </div>
  );
};
