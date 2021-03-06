import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ButtonPad from "./components/ButtonPad";
import { Col, Row, Container } from "react-bootstrap";

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
class Hangman extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      targetWord: ""
    };
  }

  componentDidMount() {
    var bunchOfNames = ["Zaphod", "Hal", "Tardis"];
    var rand = bunchOfNames[Math.floor(Math.random() * bunchOfNames.length)];

    this.setState({
      targetWord: rand
    });
    // var request = require("request");
    // var options = {
    //   method: "GET",
    //   url: "https://wordsapiv1.p.mashape.com/words/",
    //   qs: { random: "true" },
    //   headers: {
    //     "Postman-Token": "7f4c714d-5283-4083-9de7-10ac63374473",
    //     "cache-control": "no-cache",
    //     "X-Mashape-Key": "7ee2744e37mshd8a5306a0515f48p13e6a7jsn51a27e9f1337"
    //   }
    // };

    // request(options, function(error, response, word) {
    //   if (error)
    //     throw new Error(error)
    //       .then(console.log(word))
    //       .then(response => response.json())
    //       .then(data =>
    //         this.setState({
    //           targetWord: data[0]["word"]
    //         })
    //       );
    //   //   console.log([word]);
    //   //   console.log(response.body[0].word);
    // });

    // fetch("https://wordsapiv1.p.mashape.com/words/?random=true")
    //   .then(response => response.json())
    //   .then(data => data[1]["word"]);
  }

  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="2">
              <p>😇 😐 😶</p>
            </Col>
            <Col md="auto">
              {" "}
              <h1>React Hangman!</h1>
            </Col>
            <Col xs lg="2">
              <p>😶 😐 😇</p>
            </Col>
          </Row>
          <Row>
            <Col />
            <Col>
              <div>
                {this.state.targetWord === "" ? (
                  <p>Loading...</p>
                ) : (
                  <GameBoard targetWord={this.state.targetWord} misses="10" />
                )}
              </div>
            </Col>
            <Col />
          </Row>
        </Container>

        <div />
      </div>
    );
  }
}

ReactDOM.render(<Hangman />, document.getElementById("root"));
