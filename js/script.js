
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;

    $greeting.text('So, you want to live at ' + address + '?');

    var backgroundImage = '<img class="bgimg" src="%data%">';
    var imagePath = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location= ' + street + ', ' + city;
    $body.append(backgroundImage.replace('%data%', imagePath));


    // load nytimes
    var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest';

    $.getJSON(url, function(data){
      console.log(data);
      data.response.docs.forEach(function(doc) {
        var template = '<li class="article"> <a href="%url%">%title%</a> <p> %leadParagraphs%</p> </li>'
        template = template.replace('%url%', doc.web_url);
        template = template.replace('%title%', doc.headline.main);
        template = template.replace('%leadParagraphs%', doc.lead_paragraph);
        $('#nytimes-articles').append(template);
      });
    })
      .fail(function() {
        $('#nytimes-header').text('New York Times Articles Could Not Be Loaded');
      });


    // load wikipedia
    var api_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function(){
      $wikiElem.text("failed to get wikipedia resources");
    }, 4000);

    $.ajax({
      url: api_url,
      dataType: 'jsonp',
      type: 'get',
      success: function(data) {
        console.log(data);
        data[1].forEach(function(title) {
          wiki_url = '<li><a href="https://en.wikipedia.org/wiki/%title%">%title%</a></li>';
          $('#wikipedia-links').append(wiki_url.replace(/%title%/g, title));
        });
        clearTimeout(wikiRequestTimeout);
      }
    });

    return false;
};

$('#form-container').submit(loadData);
