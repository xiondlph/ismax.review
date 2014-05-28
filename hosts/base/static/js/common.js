function _error(title, message){
	isMax('<div title="'+title+'"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>'+message+'</p></div>').dialog({
    modal: true,
    autoOpen: true,
    buttons: {
      Ok: function() {
        isMax(this).dialog( "destroy" );
      }
    }
  });
}

isMax(document).ajaxError(function(data){
	_error('Ошибка', 'Сервис временно недоступен, пожалуйста попробуйте позже!');
});