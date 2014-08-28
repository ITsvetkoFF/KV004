var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (xhr.readyState == 4) {
        probs = JSON.parse(xhr.responseText);
    };
};
xhr.open('GET', 'http://ecomap.org/api/problems', false);
xhr.send(null);
