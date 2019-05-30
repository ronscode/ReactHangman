import React, { Component } from "react";
import ButtonPad from "./components/ButtonPad";

class Letter extends React.Component {
  render() {
    return (
      <span className="letter">{this.props.found ? this.props.value : ""}</span>
    );
  }
}

export default class GameBoard extends React.Component {
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

  // Restart game component

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

    // class Toggle extends React.Component {
    //   constructor(props) {
    //     super(props);
    //     this.state = { isToggleOn: true };

    //     // This binding is necessary to make `this` work in the callback
    //     this.handleClick = this.handleClick.bind(this);
    //   }

    //   handleClick() {
    //     this.setState(prevState => ({
    //       isToggleOn: !prevState.isToggleOn
    //     }));
    //   }

    //   render() {
    //     return (
    //       <button onClick={this.handleClick}>
    //         {this.state.isToggleOn ? "ON" : "OFF"}
    //       </button>
    //     );
    //   }
    // }

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
        <div className="text-center">
          {this.state.status === "Playing" && (
            <ButtonPad
              targetWord={this.props.targetWord}
              letterClick={this.checkLetterHandler}
            />
          )}
        </div>
        <div>
          {this.state.status !== "Playing" && (
            // and in your components render or any other place add the reset button

            <button type="button" onClick={console.log("Hello Universe")}>
              <span>Reload</span>
            </button>
          )}
        </div>
        <p>{remaining}</p>

        <div />
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
        <div>
          {this.state.status !== "Playing" && (
            // and in your components render or any other place add the reset button

            <button type="button" onClick={console.log("Hello Universe")}>
              <span>Reload</span>
            </button>
          )}
        </div>
      </div>
    );
  }
}
