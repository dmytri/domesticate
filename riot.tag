<my-tag>
  <form id="test-form-riot" onsubmit={ submit }>
    <input type="submit"></input>
  </form>
  <script>
    submit(e) {
      this.trigger('submit')
    }
  </script>
</my-tag>
