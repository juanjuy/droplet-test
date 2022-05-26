document.addEventListener("DOMContentLoaded", function() {
  let form = document.querySelector('form');

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (confirm("Are you sure you want to submit this note?")) {
      event.target.submit();
    }
  })
})