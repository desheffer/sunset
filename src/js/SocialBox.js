/* global Firebase: false */
(function(Firebase) {
    'use strict';

    window.Sunset = window.Sunset || {};

    window.Sunset.SocialBox = function(box) {
        // var self = this;

        var firebase = new Firebase(window.Sunset.firebaseURL);
        var room = 'x';
        var user;
        var presence;

        var hide = true;

        firebase.child('presence').child(room)
            .on('value', function(snapshot) {
                var room = snapshot.val();

                var tbody = box.find('table tbody').html('');
                var tr;

                if (!room || room.length === 0) {
                    hide = true;

                    tr = $('<tr>');
                    $('<td colspan="2" class="text-center">').text('Nothing to show yet').appendTo(tr);
                    tr.appendTo(tbody);

                    return false;
                }

                for (var i in room) {
                    var player = room[i];

                    tr = $('<tr>');
                    $('<td>').text(player.user.displayName).appendTo(tr);
                    $('<td class="text-right">').text(hide ? 'Hidden' : player.vote).appendTo(tr);
                    tr.appendTo(tbody);
                }
            });

        this.userChanged = function(newUser) {
            // Remove presence for old session.
            if (presence) {
                presence.remove();
                presence = undefined;
            }

            user = newUser;
            presence = firebase.child('presence').child(room).child(user.uid);
            presence.onDisconnect().remove();
        };

        this.voteChanged = function(e) {
            if (!presence || !user) {
                return;
            }

            hide = false;

            presence.set({
                user: {
                    displayName: user.displayName,
                },
                vote: e.vote,
                timestamp: e.timeStamp,
            });
        };

        $(box).find('button.clear').on('click', function() {
            firebase.child('presence').child(room).remove();
        });
    };
})(Firebase);
