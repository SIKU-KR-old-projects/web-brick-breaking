$(function() {
    var stories = $('.story');
    var currentIndex = 0;
    var fadetime = 1000; // Time in milliseconds (1 second)
    var displayTime = 2000; // Time in milliseconds (2 seconds)

    function showNextStory() {
        // Fade out the current story
        stories.eq(currentIndex).fadeOut(fadetime, function() {
            // Move to the next story index
            currentIndex = (currentIndex + 1) % stories.length;

            // Check if we have completed a full cycle
            if (currentIndex === 0) {
                // Redirect to start.html
                window.location.href = 'start.html';
                return; // Exit the function to prevent further execution
            }

            // Fade in the next story
            stories.eq(currentIndex).fadeIn(fadetime, function() {
                // Set a timeout to show the next story after displayTime
                setTimeout(showNextStory, displayTime);
            });
        });
    }

    // Initially hide all stories
    stories.hide();

    // Start the cycle by showing the first story
    stories.eq(currentIndex).fadeIn(fadetime, function() {
        setTimeout(showNextStory, displayTime);
    });
});
