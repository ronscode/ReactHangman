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
    return (
      <span className="letter">{this.props.found ? this.props.value : ""}</span>
    );
  }
}
class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    const targetWord = props.targetWord;
    const targetLetters = targetWord.split("");
    const targetLetterMap = {};

    targetLetters.forEach((letter, index) => {
      targetLetterMap[index] = { letter: letter, show: false };
    });

    this.state = {
      targetWord: targetWord,
      targetLetters: targetLetterMap,
      remainingMisses: parseInt(props.misses),
      status: "Playing"
    };

    this.checkLetterHandler = this.checkLetter.bind(this);
  }

  // Check letter function

  checkLetter(letter) {
    console.log("GameBoard Check Letter: " + letter);

    if (
      this.state.targetWord.toLowerCase().indexOf(letter.toLowerCase()) === -1
    ) {
      const remainingMisses = this.state.remainingMisses - 1;
      const status = remainingMisses === 0 ? "Game Over" : "Playing";

      this.setState({
        remainingMisses: remainingMisses,
        status: status
      });
      return;
    }

    let letterMap = this.state.targetLetters;
    for (let i = 0; i < this.state.targetWord.length; i++) {
      const letterInWord = this.state.targetWord[i];
      if (letterInWord.toLowerCase() === letter.toLowerCase()) {
        letterMap[i].show = true;
      }
    }

    const allValues = Object.values(this.state.targetLetters).map(
      val => val.show
    );
    const status = allValues.every(val => val === true);

    this.setState({
      targetLetters: letterMap,
      status: status ? "You Win!" : "Playing"
    });
  }

  render() {
    const remaining = "Remaining Misses: " + this.state.remainingMisses;
    const status = "Game Status: " + this.state.status;

    let letters = [];
    this.props.targetWord.split("").forEach((letter, index) => {
      const letterMap = this.state.targetLetters[index];
      const show = letterMap.show;
      letters.push(<Letter value={letter} key={index} found={show} />);
    });

    return (
      <div>
        <p>{remaining}</p>
        <p>{status}</p>
        {letters}
        <br />
        <br />
        <div>
          {this.state.status === "Playing" && (
            <ButtonPad
              targetWord={this.props.targetWord}
              letterClick={this.checkLetterHandler}
            />
          )}
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
          <GameBoard targetWord="Zaphod" misses="10" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Hangman />, document.getElementById("root"));
