//diplays all past articles and summmaries stored in local storage
function pastSearches() {
	window.onload = function() {
  		for (var key in localStorage) {
			$("p").append('<a href= "' + key + '" target="_window">'+ key +'</a>');
			$("p").append("<br/><br/>");
			$("p").append(localStorage.getItem(key));
			$("p").append("<br/><br/><br/>");
			}

		//takes user back to home page
		$("#summarize").click(function() {
            window.location.href = "popup.html";
        });
  	}
}

pastSearches();

