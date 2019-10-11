$(() => {
  $('#todoBox').val('');
  list();
  $('#form').submit(function(e) {
    var todo = {
      body: ''
    };
    todo.body = $('#todoBox').val();
    $.post('http://localhost:3001/todo', todo).done(response => {
      document.getElementById('todos').innerHTML +=
        '<li>' + response.body + '</li>';
    });
    e.preventDefault();
  });
});

function list() {
  $.get('http://localhost:3001/todo').done(todos => {
    todos = JSON.parse(todos);
    for (let i = 0; i < todos.length; i++) {
      document.getElementById('todos').innerHTML +=
        '<li>' + todos[i].body + '</li>';
    }
  });
}
