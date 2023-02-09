import './IndicatorValue.css';

export default function IndicatorValue({amount, kind}) {
  let [pieceClass, content] = {
    norm: ["norm_piece", "|"],
    maximum: ["maximum_piece", "|"],
    empty: ["", " "],
  }[kind];

  // Additional inside span needed for highlighting
  return (
    <span data-amount={amount} className={"tui indicator_value " + pieceClass}>
      <span className="indicator_inside">{content}</span>
    </span>
  );
}