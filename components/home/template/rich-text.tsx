import { Fragment, type ReactNode } from "react";

const TOKEN_PATTERN = /\[([^\]]*)\]|\{image\}/g;

function renderLine(line: string, image?: ReactNode): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(line.slice(cursor, index));
    if (match[0] === "{image}") {
      if (image) nodes.push(<Fragment key={key++}>{image}</Fragment>);
    } else {
      nodes.push(<span key={key++}>{match[1]}</span>);
    }
    cursor = index + match[0].length;
  }

  if (cursor < line.length) nodes.push(line.slice(cursor));
  return nodes;
}

export function RichTitle({
  text,
  image,
}: {
  text: string;
  image?: ReactNode;
}) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {renderLine(line, image)}
        </Fragment>
      ))}
    </>
  );
}

export function MultiLine({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
