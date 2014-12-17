$(document).ready(function(){

  google.load("visualization", "1", {packages:["corechart"]});
        google.setOnLoadCallback(drawChart);
        function drawChart() {
   
          var data = google.visualization.arrayToDataTable([
            ['Tiempos', '%'],
            ['Manejo',     52.5],
            ['Ralentí',      47.5]
          ]);

         var data2 = google.visualization.arrayToDataTable([
            ['Combustible', '%'],
            ['Operación',     7.5],
            ['Ralentí',      2.5]
          ]);


          var chart = new google.visualization.PieChart(document.getElementById('piechart'));
          var chart2 = new google.visualization.PieChart(document.getElementById('piechartcomb'));

          chart.draw(data);
          chart2.draw(data2);
        }

  $("#GerencialTactica-menu-reportes li").click(function(){
    var text=$(this).text();
    $("#titulo-menu-reportes").html(text);
  });

  $( "#GerencialTactica-sortable-list" ).sortable();

  $(window).scroll(function(){
    $("#GerencialTactica-right-side").stop().animate({"marginTop": ($(window).scrollTop()) + "px", "marginLeft":($(window).scrollLeft()) + "px"}, "slow" );
  });

  $("#GerencialTactica-navegacion a").click(function(){
    $("#GerencialTactica-navegacion a").removeClass("active");
    $(this).addClass("active");
  });


  $('a[href*=#]:not([href=#])').click(function() {

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });


  var modulo="rendimientomotor";
  $.getJSON( "https://rawgit.com/DanielRiveraHolguin/tactica/master/idioma/es.json", function( data ) {

    $.each( data, function( key, val ) {
        
        if(key==modulo){
           $.each( val, function( key2, val2 ) {
              console.log(key2+"-"+val2);
              $("[for='"+key2+"']").html(val2);
           });
        }
       
    });         
  });

    $("#GerencialTactica-inpvehiculo").change(function(){
      $("[for='lblAutosSeleccionadas']").html($("#inpvehiculo").val());
    });



    var cb = function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
      $('#GerencialTactica-reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      //alert("Callback has fired: [" + start.format('MMMM D, YYYY') + " to " + end.format('MMMM D, YYYY') + ", label = " + label + "]");
    }

    var optionSet1 = {
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      minDate: '01/01/2012',
      maxDate: '12/31/2014',
      dateLimit: { days: 60 },
      showDropdowns: true,
      showWeekNumbers: true,
      timePicker: false,
      timePickerIncrement: 1,
      timePicker12Hour: true,
      ranges: {
         'Today': [moment(), moment()],
         'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
         'Last 7 Days': [moment().subtract(6, 'days'), moment()],
         'Last 30 Days': [moment().subtract(29, 'days'), moment()],
         'This Month': [moment().startOf('month'), moment().endOf('month')],
         'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      opens: 'left',
      buttonClasses: ['btn btn-default'],
      applyClass: 'btn-small btn-primary',
      cancelClass: 'btn-small',
      format: 'MM/DD/YYYY',
      separator: ' to ',
      locale: {
          applyLabel: 'Submit',
          cancelLabel: 'Clear',
          fromLabel: 'From',
          toLabel: 'To',
          customRangeLabel: 'Custom',
          daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
          monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          firstDay: 1
      }
    };

    $('#GerencialTactica-reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

    $('#GerencialTactica-reportrange').daterangepicker(optionSet1, cb);

    $('#GerencialTactica-reportrange').on('show.daterangepicker', function() { console.log("show event fired"); });
    $('#GerencialTactica-reportrange').on('hide.daterangepicker', function() { console.log("hide event fired"); });
    $('#GerencialTactica-reportrange').on('apply.daterangepicker', function(ev, picker) { 
     $("[for='lblFechasSeleccionadas']").html(picker.startDate.format('MMMM D, YYYY')                      + " to " 
        + picker.endDate.format('MMMM D, YYYY'));

      console.log("apply event fired, start/end dates are "
        + picker.startDate.format('MMMM D, YYYY') 
        + " to " 
        + picker.endDate.format('MMMM D, YYYY')
      ); 
    });
    $('#GerencialTactica-reportrange').on('cancel.daterangepicker', function(ev, picker) { console.log("cancel event fired"); });

    $('#GerencialTactica-options1').click(function() {
      $('#GerencialTactica-reportrange').data('daterangepicker').setOptions(optionSet1, cb);
    });
    

});
               