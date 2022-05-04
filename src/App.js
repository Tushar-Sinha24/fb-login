import React, { Component } from 'react'
// import FacebookLogin from 'react-facebook-login';
import { FacebookProvider, LoginButton } from 'react-facebook';
import {  Feed } from 'react-facebook';


export class App extends Component {
  

  state ={
    isLoggeIn:false,
    userID:'',
    name:'',
    email:'',
    picture:''
}

handleResponse = (data) => {
  this.setState({
        isLoggeIn:true,
        userID:data.profile.id,
        name:data.profile.name,
        email:data.profile.email,
        picture:data.profile.picture.data.url
    })
  console.log(data.profile.name);
}

handleError = (error) => {
  this.setState({ error });
}

   

  render() {
   const Logout=()=>{
      this.setState({
        isLoggeIn:false,
      userID:'',
      name:'',
      email:'',
      picture:''
      })
    };
    let fbContent;

    if(this.state.isLoggeIn){
        fbContent= (
          <div style={
            {
              width:'400px',
              margin:'auto',
              background:'#f4f4f4',
              padding:'20px'
            }
          }>
            <div>
              <button onClick={Logout} style={{padding:'10px',background:'#0450b4',color:'white'}}>Log Out</button>
            </div>
            <br />
            <img src={this.state.picture} alt="sadsd" />
            <h2>Welcome {this.state.name}</h2>
            <p>Email : {this.state.email}</p>
          <br />
          <div>
          <FacebookProvider appId="362264855960268">
        <Feed link="https://www.facebook.com">
          {({ handleClick }) => (
            <button type="button" style={{padding:'10px',background:'#0450b4',color:'white'}} onClick={handleClick}>Post Directly to Facebook</button>
          )}
        </Feed>
      </FacebookProvider> 
          </div>
          </div>
          

        )
    }
    else{
        fbContent=(<FacebookProvider appId="362264855960268">
        <LoginButton
          scope="email"
          onCompleted={this.handleResponse}
          onError={this.handleError}
        >
          <span>Login via Facebook</span>
        </LoginButton>
      </FacebookProvider>);
    }

    return (
      <div className='App'>
        {fbContent }
      </div>
    )
  }
}

export default App

