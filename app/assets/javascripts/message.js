$(document).on('turbolinks:load',function(){
  function buildMessageHTML(message){
  var imagefile = message.image.url? `<img src="${message.image.url}", class = 'lower-message__image'>` : "";
  var html = `<div class = "message" data-id=${message.id}>
                <div class="high-data">
                  <div class="high-data__user-name">${message.user_name}</div>
                  <div class="high-data__date">${message.created_at}</div>
                </div>
                <div class="low-data">
                  <p class="low-data__content">${message.content}</p>
                  ${imagefile}
                </div>
              </div>`
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildMessageHTML(data);
      $('.message_area').append(html)
      $('.post-box').val('')
      $('.message_area').animate({scrollTop: $('.message_area')[0].scrollHeight},'fast');
    })
    .fail(function(){
      alert('error');
    })
    .always(() => {
      $(".send").removeAttr("disabled");
    });
  });

  $(function(){
    if ($('.message')[0]){
    setInterval(update,5000);
  }
  });

  function update(){
    var message_id = $('.message').last().data('id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        message: {id: message_id }
      },
      dataType: 'json',
    })
    .done(function(messages) {
       if (messages.length){
         insertHTML = "";
         $.each(messages, function(i, message){
            insertHTML = buildMessageHTML(message);
           $('.message_area').append(insertHTML)
         })
       }
     })
     .fail(function() {
       alert('自動更新に失敗しました');
     });
  }
});
