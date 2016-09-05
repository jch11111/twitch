var wikki = (function () {
    var resultsDiv;

    var init = function () {
        $(function () {
            resultsDiv = $('#results');
            addEventHandlers();
        })
    };

    function addEventHandlers() {
        $('button').click(function () {
            searchButton_click();
        });
        $('#searchText').keydown(function (e) {
            searchText_onKeyDown(e.keyCode);
        });
    }

    function searchButton_click() {
        $.when(getSearchResults())
        .then(displaySearchResults)
        .then($('#searchText').val(''));
    }

    function searchText_onKeyDown(keyCode) {
        if (13 === keyCode) {
            $('button').click();
        }
    }

    function getSearchResults() {
        var searchText = encodeURIComponent($('#searchText').val());
        var searchUrl = "https://api.twitch.tv/kraken/streams/ESL_SC2?callback=?";
        //var searchUrl = "https://api.twitch.tv/kraken/streams/cretetion?callback=?";
        //https://api.twitch.tv/kraken/streams?game=StarCraft+II%3A+Heart+of+the+Swarm&channel=test_channel,test_channel2

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
