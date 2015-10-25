<my-tag>
  <form id="test-form-riot">
    <input id="test-form-riot-submit" type="submit" onclick={ submit }></input>
  </form>
  <script>
    submit(e) {
      this.trigger('submit')
    }
  </script>
</my-tag>
