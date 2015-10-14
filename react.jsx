/* globals React */

var MyReact = React.createClass({
  work: function (event) {
    window.ReactIsWorking = 'working'
  },
  render: function () {
    return (
      <form id='test-form-react' onSubmit={this.work}>
        <input id='test-form-react-submit' type='submit' onClick={this.work}></input>
      </form>
    )
  }
})

