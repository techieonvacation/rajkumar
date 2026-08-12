interface CurvedTextProps {
  text: string;
  radius: number;
  className: string;
}

export function CurvedText({ text, radius, className }: CurvedTextProps) {
  const characters = text.split("");
  const step = 360 / characters.length;

  return (
    <div className={className}>
      {characters.map((character, index) => (
        <span
          key={index}
          style={{
            position: "absolute",
            left: "0%",
            top: "0%",
            transformOrigin: `0 ${radius}px`,
            transform: `rotate(${index * step}deg)`,
          }}
        >
          {character}
        </span>
      ))}
    </div>
  );
}
