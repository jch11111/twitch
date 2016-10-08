var wikki = (function () {
    var resultsDiv;

    var init = function () {
        $(function () {
            resultsDiv = $('#results');
            addEventHandlers();
            RESPONSIVEUI.responsiveTabs();
            $.when(getSearchResults())
            .then(displayChannels, displayError);
        })
    };

    function addEventHandlers() {
        $('button').click(function () {
            searchButton_click();
        });

    }

    function getSearchResults() {
        var channelsOfINterest = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "thejwittz", "mineconstage", "rocketleague"]
            var searchUrl = "https://api.twitch.tv/kraken/streams?channel=" +
                channelsOfINterest.join(",")

        return $.ajax({
            type: 'GET',
            url: searchUrl,
            headers: {
                'Client-ID': '52vs4v2ix1m4sdsg9l0bqpk3y84lvxx'
            }
        });
    }

    function displayChannels(searchResults) {
        var onlineChannels = {},
            channel;

        if (!searchResults.streams) {
            return;
        }

        searchResults.streams.forEach(function (stream) {
            if (!stream.channel) {
                return;
            }

            channel = stream.channel;

            if (!channel.name) {
                return;
            }

            onlineChannels[channel.name] = {
                name: channel.name,
                url: channel.url || '#',
                status: channel.status || 'status unavailable'
            };
            console.log(channel.name);
            console.log(channel.url);
            console.log(channel.status);
        });

        console.log(searchResults.streams.length);
        displayOnlineChannels();
        resultsDiv.empty();
        
        function displayOnlineChannels() {
            var channel,
                listItem,
                onlineChannelsList = $('#onlineChannels'),
                channelLink;

            onlineChannelsList.empty();
            for (channelName in onlineChannels) {
                listItem = $('<li>');
                //listItem.text(channelName + ' - ' + onlineChannels[channelName].status);
                //listItem.append(getChannelLink(onlineChannels[channelName]));
                channelLink = getChannelLink(onlineChannels[channelName]);
                //listItem.text(channelLink);
                listItem.append(channelLink);
                onlineChannelsList.append(listItem);
                //document.body.appendChild(channelLink[0]);
            }
        }

        function getChannelLink(channel) {
            var href,
                channelNameAndStatus = channel.name + ' - ' + channel.status;

            href = '<a href="' +
                encodeURI(channel.url) +
                '" target="_blank">' +
                channelNameAndStatus +
                '</a>';

            return href;
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
