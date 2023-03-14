import { CSSProperties } from "react";

interface TextProps {
  title: string;
  data: string;
  styles?: CSSProperties;
  className?: string;
}

export const Text = ({ title, data, styles, className }: TextProps) => {
  return (
    <span className={className} style={{ ...styles }}>
      <b>{title} </b> {data}
    </span>
  );
};
