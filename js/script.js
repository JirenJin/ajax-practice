
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
    var backgroundImage = '<img class="bgimg" src="%data%">';
    var imagePath = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location= " + street + ", " + city;
    $body.append(backgroundImage.replace('%data%', imagePath));

    return false;
};

$('#form-container').submit(loadData);
