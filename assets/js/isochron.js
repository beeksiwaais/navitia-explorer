$("#toggle_other_params").click(function(){
       $("#other_params").toggle();
});

function onload_isochron() {
  menu.show_menu("menu_div", ws_name, coverage);
  t=extractUrlParams();

  init_date();
  document.getElementById("from").value = (t["from"])?t["from"]:"";
  document.getElementById("from_text").value = (t["from_text"])?t["from_text"]:"";
  document.getElementById("max_duration").value = (t["max_duration"])?t["max_duration"]:"1200";
  document.getElementById("min_duration").value = (t["min_duration"])?t["min_duration"]:"0";
  document.getElementById("metasystem").checked = (t["metasystem"])?t["metasystem"]=="on":false;
  document.getElementById("metasystem_token").value = (t["metasystem_token"])?t["metasystem_token"]:"";

  if (t["date"]) { document.getElementById("date").value=decodeURIComponent(t["date"]);}
  if (t["time"]) { document.getElementById("time").value=decodeURIComponent(t["time"]);}

  map = L.map('map').setView([48.856614, 2.3522219000000177], 13);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.on('click', onMapClick);
    L.control.scale().addTo(map);

    if (document.getElementById("from").value!="") {doIsochron();}
}

function init_date(sdate, sheure){
    r_date=""
    d= new Date()
    if (!sdate || sdate==""){
        if (d.getDate()<10) { r_date+= "0"}
        r_date+= d.getDate()+"/";
        if (d.getMonth()<9) { r_date+= "0"}
        r_date+= (d.getMonth()+1)+"/";
        r_date+= d.getFullYear()
    } else {r_date=sdate;}
    document.getElementById("date").value=r_date;

    r_heure=""
    if (!sheure || sheure==""){
        h=d.getHours();
        m=d.getMinutes();
        r_heure+= (h<10)?"0"+h:h;
        r_heure+= "h";
        r_heure+= (m<10)?"0"+m:m;
        //r_heure+= "00";
    } else {r_heure=sheure;}
    document.getElementById("time").value=r_heure;
}

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("LatLon : " + e.latlng.lat + ", "+e.latlng.lng + "<br/>" +
         "<a href='javascript:void(0)' onClick='javascript:document.getElementById(\"from_text\").value=\""+e.latlng.lng + ";"+e.latlng.lat+"\";document.getElementById(\"from\").value=\""+e.latlng.lng + ";"+e.latlng.lat+"\";document.forms[0].submit();'>Partir d'ici</a><br>"
        )
        .openOn(map);
}

function doIsochron(){
  var url="";
    url+="coverage/"+document.getElementById("coverage").value + "/";
    url+="isochrons"+"?from="
    url+=document.getElementById("from").value
    url+="&datetime="+natural_str_to_iso(document.getElementById("date").value,document.getElementById("time").value);
    url+="&max_duration="+document.getElementById("max_duration").value;
    url+="&min_duration="+document.getElementById("min_duration").value;
    callNavitiaJS(document.getElementById("ws_name").value, url, '', showIsochrons);
  }

  function showIsochrons(response){
    var str="";
    if (response.message) {
      str+=response.message;
    } else if (response.error) {
      str+=response.error.message;
    } else {
      var isochron = response.isochrons[0].geojson;
      var myLayer = L.geoJson().addTo(map);
      myLayer.addData(isochron);
      var newBounds = myLayer.getBounds();
      map.fitBounds(newBounds);
    }
    document.getElementById('isochrons').innerHTML=str;
  }

var map;
var popup = L.popup();

  $(function() {
    $("#date").datepicker({ dateFormat: "dd/mm/yy" }).val()
  });

$(function() {
  var min_s = $('#min_duration');
  var max_s = $('#max_duration');
  console.log(max_s.val());
var slider = $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 3600,
    values: [min_s.val(), max_s.val()],
    slide: function ( event, ui ) {
      $( "#min_duration" ).val(ui.values[0]);
      $( "#max_duration" ).val(ui.values[1]);
    }
  });
  $('#min_duration, #max_duration').on('keyup', function(event) {
      slider.slider("values", [min_s.val(), max_s.val()]);
    });
});

$(document).ready(function(){
/* Départ*/
    $( "#from_text" ).autocomplete({
        source: getAutoComplete,
        minLength: 3,
        select: function(event, ui){
            document.getElementById("from").value = ui.item.id;
        }
   });
   $( "#metasystem" ).click(function() {
        if ($('#metasystem')[0].checked) {
            $("#metasystem_token")[0].enabled = $('#metasystem')[0].checked;
        }
    });
});
