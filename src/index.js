import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class ButtonPad extends React.Component {
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
      <p key={index}>{row.map(letter => this.renderButton(letter))}</p>
    ));
    return <div>{letterGrid}</div>;
  }
}
class Letter extends React.Component {
  render() {
    return <span className="letter">{this.props.value}</span>;
  }
}
class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.checkLetterHandler = this.checkLetter.bind(this);
  }

  checkLetter(letter) {
    alert("GameBoard Check Letter: " + letter);
  }

  render() {
    let letters = [];
    this.props.targetWord.split("").forEach((letter, index) => {
      letters.push(<Letter value={letter} key={index} />);
    });

    return (
      <div>
        {letters}
        <br />
        <br />
        <div>
          <ButtonPad
            targetWord={this.props.targetWord}
            letterClick={this.checkLetterHandler}
          />
        </div>
      </div>
    );
  }
}
class Hangman extends React.Component {
  render() {
    return (
      <div>
        <h1>React Hangman!</h1>
        <p>Welcome to my game!</p>
        <div>
          <GameBoard targetWord="Zaphod" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Hangman />, document.getElementById("root"));
