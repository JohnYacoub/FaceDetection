import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRegniotion from './components/FaceRegniotion/FaceRegniotion';


import './App.css';

const app = new Clarifai.App({
 apiKey: 'beee9d9cfe0a4220adec475bb45cb166'
});

const particlesOptions = {
      "particles": {
          "number": {
              "value": 8,
              "density": {
                  "enable": true,
                  "value_area": 800
              }
          },
          "line_linked": {
              "enable": false
          },
          "move": {
              "speed": 1,
              "out_mode": "out"
          },
          "shape": {
              "type": [
                  "images"
              ],
              "images": [
                  {
                      "src": "https://img.icons8.com/ios/50/000000/bart-simpson.png",
                      "height": 20,
                      "width": 23
                  },
                  {
                      "src": "https://img.icons8.com/ios/50/000000/marge-simpson.png",
                      "height": 20,
                      "width": 20
                  },
                  {
                      "src": "https://img.icons8.com/ios/50/000000/lisa-simpson.png",
                      "height": 20,
                      "width": 20
                  },
                     {
                      "src": "https://img.icons8.com/ios/50/000000/homer-simpson.png",
                      "height": 20,
                      "width": 20
                  }
                  
              ]
          },

          "size": {
              "value": 30,
              "random": false,
              "anim": {
                  "enable": true,
                  "speed": 4,
                  "size_min": 30,
                  "sync": false
              }
          }
      },
      "retina_detect": false
  }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl:'',
      box: {},
    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image')
    const width = Number(image.width);
    const height = image.height;
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }

  }

displayFacebox = (box) => {
  console.log(box);
  this.setState({box: box});
}  
    onInputChange = (event) => {
      this.setState({input:event.target.value});
    }

onButtonSubmit = () => {
  this.setState({imgUrl:this.state.input});
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response => this.displayFacebox(this.calculateFaceLocation(response)))
  .catch(err => console.log(err));
}

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit= {this.onButtonSubmit}/>
        <FaceRegniotion box={this.state.box} imgUrl={this.state.imgUrl}  />
      </div>
    );
  }
}

export default App;
