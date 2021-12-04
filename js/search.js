(function($){
   $.ajaxblock    = function(){
      $("body").prepend("<div id='ajax-overlay'><div id='ajax-overlay-body' class='center'><i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i><span class='sr-only'>Loading...</span></div></div>");
      $("#ajax-overlay").css({
         position: 'absolute',
         color: '#FFFFFF',
         top: '0',
         left: '0',
         width: '100%',
         height: '100%',
         position: 'fixed',
         background: 'rgba(39, 38, 46, 0.67)',
         'text-align': 'center',
         'z-index': '9999'
      });
      $("#ajax-overlay-body").css({
         position: 'absolute',
         top: '40%',
         left: '50%',
         width: '120px',
         height: '48px',
         'margin-top': '-12px',
         'margin-left': '-60px',
         //background: 'rgba(39, 38, 46, 0.1)',
         '-webkit-border-radius':   '10px',
         '-moz-border-radius':      '10px',
         'border-radius':        '10px'
      });
      $("#ajax-overlay").fadeIn(50);
   };
   $.ajaxunblock  = function(){
      $("#ajax-overlay").fadeOut(100, function()
      {
         $("#ajax-overlay").remove();
      });
   };
})(jQuery);
function search_dni(i){
  $.ajaxblock();
  var numero = $('#numero').val(), url_s = "consulta.php",parametros = {'dni':numero};

  url_s = "https://incared.com/api/apirest";
  parametros = {'action':'getnumero','numero':numero}
  
  if (numero == '') {
    alert("El campo documento esta vacio ");
    $.ajaxunblock();
  }else{
    $.ajax({
        type: 'POST',
        url: url_s,
        dataType:'json',
        data:parametros,
        beforeSend: function(){
        },  
        complete:function(data){
        
        },
        success: function(data){
          $('.before-send').fadeOut(500);
          if(!jQuery.isEmptyObject(data.error)){
            alert(data.error);
          }else{
              $('#nombre_complet').val(data.rs);
              $('#direccion').val(data.tvia+' '+data.nvia+data.numero);
              if(!jQuery.isEmptyObject(data.distrito) && !jQuery.isEmptyObject(data.departamento)){
                $('#departamento').val(data.departamento.nombre);
                $('#distrito').val(data.distrito.nombre);
                $('#provincia').val(data.provincia.nombre);
              }

          }
          $.ajaxunblock();
        },
        error: function(data){
            alert("Problemas al tratar de enviar el formulario");
            $.ajaxunblock();
        }
    }); 
  }
}
search_tipe();
function search_tipe(){
  if( $('#tipe_search').val() == 'ruc' ) {
      $('#search_button').attr('data-ruc','active');
      $('#numero').attr('placeholder','Buscar ruc');
  } else {
      $('#search_button').removeAttr('data-ruc');
      $('#numero').attr('placeholder','Buscar dni');
  }
}