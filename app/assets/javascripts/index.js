$(document).on('turbolinks:load',function(){
  $(function(){
    function appendUser(user){
      var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                  </div>`
      return html;
    }
    function buildHTML(id,name){
      var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value=${id}>
                    <p class='chat-group-user__name'>${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`
      return html;
    }

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

    $('#user-search-result').on('click','.user-search-add',function(e){
      e.preventDefault();
      var id = $(this).attr('data-user-id');
      var name = $(this).attr('data-user-name');
      var html = buildHTML(id,name);
      $('#chat-group-users').append(html);
      $(this).parent().remove();
    });

    $('#chat-group-users').on('click','.user-search-remove',function(){
      $('#chat-group-users').remove();
    });
  });
});
