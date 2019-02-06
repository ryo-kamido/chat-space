$(document).on('turbolinks:load',function(){
  function buildHTML(message){
  var imagefile = message.image.url? `<img src="${message.image.url}", class = 'lower-message__image'>` : "";
  var html = `<div class = "message">
                <div class="high-data">
                  <div class="high-data__user-name">${message.user_name}</div>
                  <div class="chat__date">${message.created_at}</div>
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
      var html = buildHTML(data);
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
  })
});
