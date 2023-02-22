import {useState} from "react";
import IndicatorValue from "./IndicatorValue.jsx";

export default function CountedInteractiveBar({ value, dim_value, length, onClick }) {
  let [counterOverride, setCounterOverride] = useState(null);


  function onClickWrapped(event) {
    const value = event.target.closest(".indicator_value");
    if (!value) return;
    onClick(event, Number(value.getAttribute("data-amount")));
  }

  function onMouseOverIndicator(event) {
    const value = event.target.closest(".indicator_value");
    if (!value) return;
    setCounterOverride(Number(value.getAttribute("data-amount")));
  }

  function onMouseOutIndicator() {
    setCounterOverride(null);
  }


  const indicator_value = [
    ...Array.from({length: value}, (_, i) =>
      <IndicatorValue key={i} amount={i + 1} kind="normal" />
    ),
    ...Array.from({length: dim_value - value}, (_, i) =>
      <IndicatorValue key={value + i} amount={value + i + 1} kind="dim" />
    ),
    ...Array.from({length: length - dim_value}, (_, i) =>
      <IndicatorValue key={dim_value + i} amount={dim_value + i + 1} kind="empty" />
    ),
  ];

  return (
      <>
        <td onClick={onClickWrapped} onMouseOver={onMouseOverIndicator} onMouseOut={onMouseOutIndicator}>
          [
          {indicator_value}
          ]
        </td>
        <td> ({counterOverride ?? value}/{length})</td>
      </>
  )
}