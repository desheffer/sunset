/* global Sunset */
(function() {
    'use strict';

    var pointBox = new Sunset.PointBox($('#point-box'));

    var socialBox = new Sunset.SocialBox($('#social-box'));
    $(pointBox).on('change.sunset', socialBox.voteChanged);

    var loginBox = new Sunset.LoginBox($('#login-box'));
    $(loginBox).on('userchange.sunset', function(e) {
        socialBox.userChanged(e.user);
    });
    loginBox.init();
})();
