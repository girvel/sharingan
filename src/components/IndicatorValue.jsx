import './IndicatorValue.css';

export default function IndicatorValue({amount, kind}) {
  let [pieceClass, content] = {
    normal: ["normal_piece", "|"],
    dim: ["dim_piece", "|"],
    empty: ["", " "],
  }[kind];

  // Additional two spans inside needed for CSS tricks with replacing content with "|"
  return (
    <span data-amount={amount} className={"tui indicator_value " + pieceClass}>
      <span><span>{content}</span></span>
    </span>
  );
}