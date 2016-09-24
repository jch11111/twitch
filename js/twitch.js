var wikki = (function () {
    var resultsDiv;

    var init = function () {
        $(function () {
            resultsDiv = $('#results');
            addEventHandlers();
            RESPONSIVEUI.responsiveTabs();
            $.when(getSearchResults())
            .then(displaySearchResults, displayError);
        })
    };

    function addEventHandlers() {
        $('button').click(function () {
            searchButton_click();
        });

    }

    //function searchButton_click() {
    //    $.when(getSearchResults())
    //    .then(displaySearchResults);
    //}

    function getSearchResults() {
        var channelsOfINterest = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "thejwittz", "mineconstage", "rocketleague"]
        //var channelsOfINterest = ["freecodecamp"];
        //var searchUrl = "https://api.twitch.tv/kraken/streams?channel=" +
            //channelsOfINterest.join(",") +
            //"&callback=?";
            var searchUrl = "https://api.twitch.tv/kraken/streams?channel=" +
                channelsOfINterest.join(",")

        return $.ajax({
            type: 'GET',
            url: searchUrl,
            headers: {
                'Client-ID': '52vs4v2ix1m4sdsg9l0bqpk3y84lvxx'
            }
            //success: function (data) {
            //    console.log(data);
            //},
            //error: function (data) {
            //    console.log(data);
            //}
        });

        //return $.ajax({
        //    url: searchUrl,
        //    headers: {
        //        'Client-ID': '52vs4v2ix1m4sdsg9l0bqpk3y84lvxx'
        //    },
        //    dataType: 'json',
        //    type: 'GET'
        //});
    }

    function displaySearchResults(searchResults) {
        if (searchResults.streams) {
            searchResults.streams.forEach(function (stream) {
                var channel = stream.channel;
                console.log(channel.url);
                console.log(channel.status);
            });
        }
        console.log(searchResults.streams.length);
        resultsDiv.empty();

        if (searchResults._links && searchResults._links.channel) {
            displayHtml(searchResults._links.channel);
        }

        if (searchResults._links && searchResults._links.self) {
            displayHtml(searchResults._links.self);
        }
    }

    function displayError(err) {
        displayHtml(err);
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
