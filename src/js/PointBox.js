(function() {
    'use strict';

    window.Sunset = window.Sunset || {};

    window.Sunset.PointBox = function(box) {
        var self = this;

        var points = 0.5;

        var fibMap = [0.5, 1, 2, 3, 5, 5, 8, 8, 8];

        $(box).find('input:radio').on('change', function() {
            points = 0;

            $(box).find('input:radio:checked').each(function() {
                points += parseInt($(this).val());
            });

            points = fibMap[points];

            $(box).find('.total .value').text(points);
            $(box).find('.total .plural').toggle(points !== 1);
        });

        $(box).find('button.send').on('click', function() {
            $(self).trigger({
                type: 'change.sunset',
                points: points,
            });

            return false;
        });

        $(box).find('button.send-alt').on('click', function() {
            $(self).trigger({
                type: 'change.sunset',
                points: $(this).text(),
            });

            return false;
        });
    };
})();
