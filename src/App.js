import React from 'react';
import Rank from './componenets/Rank/Rank';
import './App.css';
import ImageLinkForm from './componenets/ImageLinkForm/ImageLinkForm';
import Logo from './componenets/Logo/Logo';
import Navigation from './componenets/Navigation/Navigation';
import Signin from './componenets/Signin/Signin';
import Register from './componenets/Register/Register';
import FaceRecognition from './componenets/FaceRecognition/FaceRecognition';


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}


class App extends React.Component {
constructor() {
  super();
  this.state = initialState;
}

loadUser =(data)=> {
  this.setState({user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
  }})
}

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  this.setState({box: box});
}


onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  fetch('https://intense-island-15593.herokuapp.com/imageurl', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      input: this.state.input
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://intense-island-15593.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
}


onRouteChange = (route)=> {
  if (route === 'signout') {
    this.setState(initialState)
    console.log(this.state.route)
  } else if (route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}


render() {
  return (
    <div className=" tr App">
      
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          {this.state.isSignedIn === true
          ? <div>
            <Logo />
            <Rank 
            name={this.state.user.name} 
            entries={this.state.user.entries} />
            <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            {/* <FaceRecognition /> */}
          </div>
          : (
            this.state.route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          )
        } 
    </div>
  )
  }
}

export default App;
