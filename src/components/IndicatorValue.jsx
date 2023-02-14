import './IndicatorValue.css';

export default function IndicatorValue({amount, kind}) {
  let [pieceClass, content] = {
    norm: ["norm_piece", "|"],
    maximum: ["maximum_piece", "|"],
    empty: ["", " "],
  }[kind];

  // Additional two spans inside needed for CSS tricks with highlighting
  return (
    <span data-amount={amount} className={"tui indicator_value " + pieceClass}>
      <span><span>{content}</span></span>
    </span>
  );
}