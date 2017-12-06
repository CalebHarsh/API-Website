$(document).ready(function() {
    //global variables 
    var choices = ["The Office", "Parks & Recreation", "How I Met Your Mother", "Stranger Things", "Supernatural", "Frasier", "Magnum PI", "Micheal Scott",
                    "Ron Swanson", "Marvel", "Justice League", "Star Wars", "Han Solo", "Batman"];
    var more = 0;
    var lookUp = "";
    var setUpBtns = function () {
        $(".button-list").empty();
        choices.forEach(element => {
            var newBtn = $("<button>");
            newBtn.text(element);
            newBtn.addClass("element btn btn-primary");
            newBtn.attr("data-name", element);
            newBtn.appendTo(".button-list");
        });
    }
    var getPictures = function () {
        var ratings = $("#rating-limit").val();
        console.log(ratings);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="  + lookUp + "&api_key=dc6zaTOxFJmzC&limit=10&rating=" + ratings + "&offset=" + more;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.data);
            displayImages(response.data);
        });
    }
    var displayImages = function (one) {
        $(".show-button").empty();
        one.forEach(element => {
            var imageCard = $("<div>");
            imageCard.addClass("card");
            var image = $("<img>");
            image.addClass("card-img-top gifs");
            image.data(element.images);
            image.attr("src", element.images.fixed_width_still.url);
            image.attr("value", "still");
            image.appendTo(imageCard);
            var newCardBody = $("<div>");
            newCardBody.addClass("card-body");
            newCardBody.appendTo(imageCard);
            var rates = $("<h4>");
            rates.text("Rating: " + element.rating);
            rates.appendTo(newCardBody);
            imageCard.appendTo($(".card-columns"));
        });
        var showMoreBtn = $("<button>");
        showMoreBtn.attr("id", "show-more");
        showMoreBtn.addClass("btn btn-secondary");
        showMoreBtn.text("Show More");
        showMoreBtn.appendTo(".show-button");
    }
    $("#go").on("click", function () {
        var newElem = $("#search").val().trim();
        choices.push(newElem);
        getPictures(newElem);
        setUpBtns();
    });
    $(".button-list").on("click", ".element", function () {
        $(".card-columns").empty();
        console.log($(this).attr("data-name"));
        lookUp = $(this).attr("data-name");
        getPictures();
        more = 0;
    });
    $(".card-columns").on("click", ".gifs", function () {
        var gifURL = $(this).data();
        console.log($(this).attr("value"));
        if ($(this).attr("value") === "still") {
            $(this).attr("src", gifURL.fixed_width.url);
            $(this).attr("value", "gif");
        }else {
            $(this).attr("value", "still");
            $(this).attr("src", gifURL.fixed_width_still.url);
        }
        
    });
    $(".show-button").on("click", "#show-more", function () {
        more = more + 10;
        getPictures();
    });
    setUpBtns();
 });