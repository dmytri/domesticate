/* globals window, React, ReactRouter */

;(function (window) {
  window.MDASignin = React.createClass({
    mixins: [ ReactRouter.Navigation ],
    handleSignin: function (event) {
      event.preventDefault()
      this.setState({signedin: true})
      this.transitionTo('home')
    },
    render: function () {
      return (
        <div className='wrapper'>
          <form className='signin-form md-p++' onSubmit={this.handleSignin}>
            <h3>Anmelden</h3>
            <p>Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s</p>
            <p><input type='email' className='form-input' placeholder='Email'></input></p>
            <p><input type='password' className='form-input' placeholder='Passwort'></input></p>
            <p><input type='submit' className='btn btn-primary fr' value='Anmelden'></input></p>
          </form>
        </div>
      )
    }
  })
}(window))
