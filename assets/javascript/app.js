var topics = ["tomatoes", "onions", "potatoes", "broccoli", "turnips", "peas", "carrots"];

function displayGIF() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      })
}

// Function to display buttons in the topics array
function renderButtons() {
    // Deletes the topics prior to adding new ones so there are no repeat buttons
    $("#rendered-buttons").empty();
    // Looping through the array of topics and dynamically generating buttons for each topic in the array
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        // Adding a class of gif-button to the button
        a.addClass("gif-button");
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