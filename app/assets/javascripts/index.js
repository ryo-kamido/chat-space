$(function(){
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name=${user.name}>追加</a>
                </div>`
    return html;
  };
  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    var result = $('#user-search-result')
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      result.empty();
      if (users.length !== 0){
        users.forEach(function(user){
          var html = appendUser(user);
          result.append(html)
        });
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });
});
