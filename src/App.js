import "./styles.css";
import React, { useState, useRef } from "react";
import { WORDS } from "./words";

function isAlpha(value) {
  return value >= "آ" && value <= "ی";
}

export default function App() {
  const [known, setKnown] = useState([
    [0, ""],
    [1, ""],
    [2, ""],
    [3, ""],
    [4, ""]
  ]);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const letterInput = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  function showMatches(event) {
    if (known.map((i) => i[1]).filter((i) => i !== "").length < 2) {
      setError("حداقل دوحرف از کلمه رو وارد کن!");
      setMatches([]);
      return;
    } else {
      setError("");
    }

    const regex = new RegExp(known.map((i) => (i[1] ? i[1] : ".")).join(""));
    var foundMatches = [];
    for (var word of WORDS) {
      if (word.match(regex)) {
        foundMatches.push(word);
      }
    }

    if (foundMatches.length == 0) {
      setError("چیزی پیدا نکردم!");
      setMatches([]);
      return;
    }

    setError("");
    setMatches(foundMatches);
  }

  function letterChange(index, event) {
    var value = event.target.value;
    var knownCopy = [...known];

    if (value === " ") value = "";

    if (isAlpha(value) || value === "") {
      knownCopy[index][1] = value;
      setKnown(knownCopy);

      if (index < 4) {
        letterInput[index + 1].current.focus();
      }
    }
  }

  return (
    <div className="App">
      <h1>دنبال یه کلمه‌ی پنج‌حرفی می‌گردی؟</h1>
      <h2>حروفی رو که می‌دونی وارد کن</h2>
      <div class="letters">
        {known.map((box) => (
          <input
            type="text"
            class="letter"
            maxlength="1"
            value={box[1]}
            onFocus={(e) => e.currentTarget.select()}
            ref={letterInput[box[0]]}
            onChange={(event) => letterChange(box[0], event)}
          />
        ))}
      </div>
      <br />
      <br />
      <button type="button" onClick={showMatches}>
        بگرد
      </button>
      <br />
      {error ? <p class="error">{error}</p> : ""}
      <br />
      <div class="matches">
        {matches.map((match) => (
          <span class="word">
            <a
              href={"https://www.vajehyab.com/dehkhoda/" + match}
              target="_blank"
              rel="noreferrer"
            >
              {match}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}
