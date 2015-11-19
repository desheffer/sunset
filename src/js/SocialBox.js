/* global Firebase: false */
(function(Firebase) {
    'use strict';

    window.Sunset = window.Sunset || {};

    window.Sunset.SocialBox = function(box) {
        // var self = this;

        var firebase = new Firebase(window.Sunset.firebaseURL);
        var roomRef = firebase.child('player').child('my-room');
        var playerRef;

        var tbody = box.find('table tbody');
        var hide = true;

        roomRef
            .on('value', function(roomSnapshot) {
                tbody.html('');

                roomSnapshot.forEach(function(playerSnapshot) {
                    var player = playerSnapshot.val();

                    var vote;
                    if (player.vote === undefined) {
                        vote = '---';
                    } else if (hide) {
                        vote = 'Hidden';
                    } else {
                        vote = player.vote.value;
                    }

                    var tr = $('<tr>');
                    $('<td>').text(player.user.displayName).appendTo(tr);
                    $('<td class="text-right">').text(vote).appendTo(tr);
                    tr.appendTo(tbody);
                });
            });

        this.userChanged = function(user) {
            // Remove player for old session.
            if (playerRef) {
                playerRef.remove();
                playerRef = undefined;
            }

            if (!user) {
                return;
            }

            playerRef = roomRef.push();
            playerRef.onDisconnect().remove();

            // Set the current player's identity.
            playerRef.set({
                user: {
                    uid: user.uid,
                    displayName: user.displayName,
                },
            });
        };

        this.voteChanged = function(e) {
            if (!playerRef) {
                return;
            }

            hide = false;

            // Update the current player's vote.
            playerRef.update({
                vote: {
                    value: e.vote,
                    timestamp: e.timeStamp,
                },
            });
        };

        $(box).find('button.clear').on('click', function() {
            // Clear each player's vote.
            roomRef.once('value', function(roomSnapshot) {
                roomSnapshot.forEach(function(playerSnapshot) {
                    playerSnapshot.ref().child('vote').remove();
                });
            });
        });
    };
})(Firebase);
