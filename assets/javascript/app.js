var topics = ["tomatoes", "onions", "potatoes", "broccoli", "turnips", "peas", "carrots"];

function displayGif() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        // Creating a variable to hold response.data
        var results = response.data;
        console.log(results);
        
        // Looping through the results
        for (var i = 0; i < results.length; i++) {
            // Creating a div to hold the gifs
            var gifDiv = $("<div>");
            // Creating an element to hold the rating
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            // Creating an element to hold the gif image **(still)**
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            // Prepending the results to the gif-view div
            gifDiv.prepend(p);
            gifDiv.prepend(topicImage);
            $("#gif-view").prepend(gifDiv);
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
        // Adding the button to the render-buttons div
        $("#rendered-buttons").append(a);
    }
}

// Calling the renderButtons function to display the initial buttons
renderButtons();

// Function to handles events when a topics button is clicked
$("#add-topic").click(function(event) {
    event.preventDefault();
    // Grabbing the input from the textbox
    var topic = $("#topic-input").val();
    // Adding the topic form the textbox to the topics array
    topics.push(topic);
    // Calling renderButtons to display the newly created button
    renderButtons();
});

// Adding a click event listener to all elements with a class of "gif-btn" and calling displayGif function
$(document).click(".gif-btn", displayGif);