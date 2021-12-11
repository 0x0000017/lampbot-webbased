function pushVal(){
	var aQuery = document.getElementById("addQuery").value;
	var aResp = document.getElementById("addResponse").value;
	var aTag = document.getElementById("addTag").value;

	var addNewRes = {
		"tag" : aTag,
		"patterns": aQuery,
		"responses": aResp
	}
	$.ajax({
		url: '127.0.0.1:5000/uploadq/',
		type: 'POST',
		contentType : 'application/json',
		data: JSON.stringify(addNewRes),
	}).done(function(result) {
		console.log(result);
	})
}