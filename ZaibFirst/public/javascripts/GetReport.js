

$(function(){

});

$("#firstBtn").on("click", function(){

});
function Zaib(){
var username= document.getElementById("username").value;
var password =document.getElementById("password").value;
var tableid =document.getElementById("tableid").value;
$.get('/GetAnalyticReport?username='+username+'&password='+password+'&tableID='+tableid, function(response){
var html="<table><tr><th>PageViews</th><th>Page path</th></tr>";

for (var i=0; i< response.length; i++)
{
html+="<tr>";
html +="<td>"+response[i].metrics[0]["ga:pageviews"]+"</td>";
html +="<td>"+response[i].dimensions[0]["ga:pagePath"]+"</td>";
html+="</tr>";
}
html+="</table>";
document.getElementById("result").innerHTML = html;
});
return true;
}