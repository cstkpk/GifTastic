// When the page loads, hide the favorites h1 element
$(document).ready(function() {
    $("#favorites-h1").hide();
    // $(".text-overlay").hide();

// Array of initial topics
var topics = ["tomato", "onion", "potato", "broccoli", "turnip", "peas", "carrot", "lettuce", "cabbage", "pepper"];

// Function to display the gifs 
function displayGif() {
    var topic = $(this).attr("data-name");
    console.log(this);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=Bm2k4uF8suzONejSbumyYMcY72fyrkOP&limit=10&rating=G";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        // Creating a variable to hold response.data
        var results = response.data;
        console.log(results);
        
        // Looping through the results
        for (var i = 0; i < results.length; i++) {
            // Creating a div to hold the gifs
            var gifDiv = $("<div>");
            gifDiv.addClass("gif-container");
            // Creating an element to hold the rating
            var rating = results[i].rating;
            var p1 = $("<p>").text("Rating: " + rating);
            // Creating an element to hold the gif image **(still)**
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.addClass("gif card-img");
            topicImage.attr("data-state", "still");

            // Prepending the results to the gif-view div
            gifDiv.prepend(p1);
            gifDiv.prepend(topicImage);
            $("#gif-view").prepend(gifDiv);
            // console.log("Gif div: " + gifDiv);
        }
    })
}

// Function to display buttons in the topics array
function renderButtons() {
    // Deletes the topics prior to adding new ones so there are no repeat buttons
    $("#rendered-buttons").empty();
    // Looping through the array of topics and dynamically generating buttons for each topic in the array
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        // Adding a class of gif-btn to the button
        a.addClass("gif-btn");
        // Adding a data-name attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Styling the buttons
        a.addClass("btn btn-outline-secondary mr-1 mb-1");
        // Adding the button to the render-buttons div
        $("#rendered-buttons").append(a);
    }
}

// Calling the renderButtons function to display the initial buttons
renderButtons();

// Function to handles events when a topics button is clicked
$("#add-topic").on("click", function(event) { // I changed this from the shorthand because of the issue described below
    event.preventDefault();
    // Grabbing the input from the textbox
    var topic = $("#topic-input").val();
    // Adding the topic form the textbox to the topics array
    topics.push(topic);
    // Calling renderButtons to display the newly created button
    renderButtons();
});

// Adding a click event listener to all elements with a class of "gif-btn" and calling displayGif function
$(document).on("click", ".gif-btn", displayGif);

// Double click function to save a gif to favorites
$(document).on("dblclick", ".gif-container", function() {
    $("#favorites-h1").show();
    $("#favorites").append(this); 
    // console.log("This: " + this);
    // console.log("gifDiv: " + gifDiv);
})

// Function to pause or animate the gif on click
$(document).on("click", ".gif", function(){

    var state = $(this).attr("data-state");

    if (state === "animate") {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
    else if (state === "still") {
        $(this).attr("data-state", "animate");
        console.log(this);
        $(this).attr("src", $(this).attr("data-animate"));
    }
})

// Function to add text overlay to gif on hover
// $(document).on(function(){
//     $(".text-overlay").show().offset($(this).offset());
//     }, function() {
//         $(".text-overlay").hide();
// })

// Function to add text overlay to gif on hover
$(document).on({
    mouseenter: function () {
        $(".text-overlay").show().offset($(this).offset());
    },
    mouseleave: function () {
        $(".text-overlay").hide();
    }
 }, ".gif");

});