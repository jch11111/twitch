var wikki = (function () {
    var channelsOfINterest = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "thejwittz", "mineconstage", "rocketleague", "brucegrannec"]


    var init = function () {
        $(function () {
            RESPONSIVEUI.responsiveTabs();
            $.when(getChannelInfo())
            .then(displayChannels);
        })
    };

    function getChannelInfo() {
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

            onlineChannels[channel.name.toLowerCase()] = {
                name: channel.name,
                url: channel.url || '#',
                status: channel.status || 'status unavailable'
            };
            console.log(channel.name);
            console.log(channel.url);
            console.log(channel.status);
        });

        console.log(searchResults.streams.length);
        displayOnlineChannels($('#onlineChannels').empty());
        displayOfflineChannels($('#offlineChannels').empty());
        displayAllChannels();

        function displayOnlineChannels(whereToDisplay) {
            var channel,
                listItem,
                channelLink;

            for (channelName in onlineChannels) {
                listItem = $('<li>');
                channelLink = getChannelLink(onlineChannels[channelName]);
                listItem.append(channelLink);
                whereToDisplay.append(listItem);
            }
        }

        function displayOfflineChannels(whereToDisplay) {

            channelsOfINterest.forEach(function (channelName) {
                channelName = channelName.toLocaleLowerCase();
                if (!onlineChannels[channelName]) {
                    listItem = $('<li>');
                    listItem.text(channelName);
                    whereToDisplay.append(listItem);
                }
            });
        }

        function displayAllChannels() {
            displayOnlineChannels($('#allChannels').empty());
            displayOfflineChannels($('#allChannels'));
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

    return {
        init: init
    };
}());

wikki.init();
