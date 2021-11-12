import React from 'react'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:''
        }
    }

    onNameChange = (event) => {
        this.setState({name:event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email:event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password:event.target.value});
    }


    onSubmitRegister = (event) => {
        event.preventDefault() 
        fetch('https://intense-island-15593.herokuapp.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
      })
    })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
        
        
    }


    render() {
    return(
        <div>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" >
                <main className="tc pa4 black-80">
                    <form className="measure">
                        <fieldset id="register" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input
                            onChange={this.onNameChange} 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="uer-name"  
                            id="user-name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                            onChange={this.onEmailChange}  
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                            onChange={this.onPasswordChange}   
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" />
                        </div>
                        
                        
                        </fieldset>
                        <div className="">
                        <input
                        onClick={this.onSubmitRegister} 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register" />
                        </div>
                    </form>
                    </main>
                </article>
        </div>
    )}

}

export default Register;