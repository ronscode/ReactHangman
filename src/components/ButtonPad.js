import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

export default class ButtonPad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      letters: [
        ["A", "B", "C", "D", "E", "F"],
        ["G", "H", "I", "J", "K", "L", "M"],
        ["N", "O", "P", "Q", "R", "S", "T"],
        ["U", "V", "W", "X", "Y", "Z"]
      ],
      targetWord: props.targetWord,
      letterMap: {},
      letterClickHandler: props.letterClick
    };

    this.state["letterMap"] = this.mapLetters();
  }

  mapLetters() {
    let map = {};

    this.state.letters.forEach(letterRow => {
      letterRow.forEach(letter => {
        const letterInTarget =
          this.state.targetWord.toLowerCase().indexOf(letter.toLowerCase()) >
          -1;
        map[letter] = {
          clicked: false,
          cls: letterInTarget ? "found" : "missed"
        };
      });
    });

    return map;
  }

  renderButton(letter) {
    let cls = "letter-button";
    if (this.state.letterMap[letter].clicked) {
      cls = cls + " " + this.state.letterMap[letter].cls;
    }

    return (
      <button
        className={cls}
        key={letter}
        onClick={() => this.handleButtonClick(letter)}
      >
        {letter}
      </button>
    );
  }

  handleButtonClick(letter) {
    let map = this.state.letterMap;
    map[letter].clicked = true;

    this.setState({
      letterMap: map
    });

    this.state.letterClickHandler(letter);
  }

  render() {
    const letterGrid = this.state.letters.map((row, index) => (
      <div key={index} className="text-center">
        <Row className="text-center ">
          <Col> {row.map(letter => this.renderButton(letter))}</Col>
        </Row>

        <br />
      </div>
    ));
    return <div className="text-center mx-auto">{letterGrid}</div>;
  }
}
