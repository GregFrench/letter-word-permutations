import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import permutations from 'permutation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dictionary: {},
      words: [],
      letters: ["", "", "", "", "", "", ""]
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, index) {
    let letters = [...this.state.letters];
    letters[index] = event.target.value;
    this.setState({letters});
  }

  handleSubmit(event) {
    event.preventDefault();

    let word = ""
    let words = []
    let letterPermutations = []
    let res = ''

    for (let i = 0; i < this.state.letters.length; i++) {
      word += this.state.letters[i]
    }

    let perms = permutations(word)
    let len = perms.length

    // get all permutations of the word in terms of 3, 4, 5, 6, and 7 letters
    for (let i = 0; i < len; i++) {
      res = perms[i].substring(0, 3);

      if (!letterPermutations.includes(res)) {
        letterPermutations.push(res)
      }
    }

    for (let i = 0; i < len; i++) {
      res = perms[i].substring(0, 4);

      if (!letterPermutations.includes(res)) {
        letterPermutations.push(res)
      }
    }

    for (let i = 0; i < len; i++) {
      res = perms[i].substring(0, 5);

      if (!letterPermutations.includes(res)) {
        letterPermutations.push(res)
      }
    }

    for (let i = 0; i < len; i++) {
      res = perms[i].substring(0, 6);

      if (!letterPermutations.includes(res)) {
        letterPermutations.push(res)
      }
    }

    for (let i = 0; i < len; i++) {
      res = perms[i].substring(0, 7);

      if (!letterPermutations.includes(res)) {
        letterPermutations.push(res)
      }
    }

    console.log(letterPermutations)

    for (let i = 0; i < letterPermutations.length; i++) {
      if (this.state.dictionary.hasOwnProperty(letterPermutations[i])) {
        if (!words.includes(letterPermutations[i])) {
          words.push(letterPermutations[i])
        }
      }
    }

    this.setState({words});
  }

  async componentDidMount() {
    await this.loadDictionary()
  }

  async loadDictionary() {
    await axios.get(`./data/words_dictionary.json`)
      .then(res => {
        this.setState({dictionary: res.data})
      })
  }

  createForm = () => {
    let form = []

    for (let i = 0; i < 7; i++) {
      form.push(<Form.Group key={i}>
        <Form.Control className="input" type="text" name="letter[]" size="lg" size="1" maxLength="1" value={this.state.letters[i]} onChange={(event) => this.handleChange(event, i)} />
      </Form.Group>)
    }

    return form
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Letter Permutations to Words</h1>
          <Row>
            <Col>
              <Form className="text-center" inline onSubmit={this.handleSubmit}>
                {this.createForm()}
                <Form.Group>
                  <Button variant="success" onClick={this.handleSubmit}>Submit</Button>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              {this.state.words.map((item,i) => <li key={i}>{item}</li>)}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
