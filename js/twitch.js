var wikki = (function () {
    var resultsDiv;

    var init = function () {
        $(function () {
            resultsDiv = $('#results');
            addEventHandlers();
            RESPONSIVEUI.responsiveTabs();
        })
    };

    function addEventHandlers() {
        $('button').click(function () {
            searchButton_click();
        });

    }

    function searchButton_click() {
        $.when(getSearchResults())
        .then(displaySearchResults);
    }

    function getSearchResults() {
        var channelsOfINterest = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
        var searchUrl = "https://api.twitch.tv/kraken/streams?channel=" +
            channelsOfINterest.join(",") +
            "&callback=?";

        return $.ajax({
            url: searchUrl,
            dataType: 'json',
            type: 'POST'
        });
    }

    function displaySearchResults(searchResults) {
        resultsDiv.empty();

        displayHtml(searchResults._links.channel);
        displayHtml(searchResults._links.self);

    }

    function displayHtml(htmlContent) {
        var newDiv = $('<div class="searchResult"></div>');

        newDiv.html(htmlContent);
        resultsDiv.append(newDiv);
    }

    return {
        init: init
    };


}());

wikki.init();
