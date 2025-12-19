type Props = {
  organs: {
    heart: string;
    lungs: string;
    liver: string;
    kidneys: string;
  };
};

export default function FullBody({ organs }: Props) {
  return (
    <svg width="220" height="500" viewBox="0 0 220 500">
      {/* Body */}
      <path
        d="
            M110 20
            C85 20 70 60 70 100
            V170
            L55 320
            L75 480
            H95
            L110 350
            L125 480
            H145
            L165 320
            L150 170
            V100
            C150 60 135 20 110 20
          "
        fill="#f2f2f2"
        stroke="#bbb"
      />

      {/* Organs */}
      <circle cx="105" cy="145" r="10" fill={organs.heart} />
      <ellipse cx="90" cy="135" rx="10" ry="18" fill={organs.lungs} />
      <ellipse cx="120" cy="135" rx="10" ry="18" fill={organs.lungs} />
      <rect x="100" y="175" width="35" height="15" fill={organs.liver} />
      <ellipse cx="90" cy="210" rx="7" ry="12" fill={organs.kidneys} />
      <ellipse cx="125" cy="210" rx="7" ry="12" fill={organs.kidneys} />
    </svg>
  );
}