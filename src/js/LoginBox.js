/* global Firebase: false */
(function(Firebase) {
    'use strict';

    window.Sunset = window.Sunset || {};

    window.Sunset.LoginBox = function(box) {
        var self = this;

        var firebase = new Firebase(window.Sunset.firebaseURL);
        var user;

        function update() {
            if (user) {
                $('body').removeClass('not-logged-in');
                box.find('.name').text(user.displayName);
            } else {
                $('body').addClass('not-logged-in');
                box.find('.name').text('---------');
            }

            box.find('.links').html('');

            if (!user) {
                $('<a href="#">Log in</a>')
                    .on('click', function () {
                        firebase.authWithOAuthPopup('google', function() {});
                        return false;
                    })
                    .appendTo(box.find('.links'));
            } else {
                $('<a href="#">Log out</a>')
                    .on('click', function () {
                        firebase.unauth(function() {});
                        return false;
                    })
                    .appendTo(box.find('.links'));
            }
        }

        this.init = function() {
            // Delay binding until something is listening.
            firebase.onAuth(function(authData) {
                user = authData;

                if (user) {
                    user.displayName = user.google.displayName;
                }

                update();

                $(self).trigger({
                    type: 'userchange.sunset',
                    user: user,
                });
            });
        };
    };
})(Firebase);
