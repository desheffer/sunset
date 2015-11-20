(function() {
    'use strict';

    window.Sunset = window.Sunset || {};

    window.Sunset.PointBox = function(box) {
        var self = this;

        var points = 0.5;
        var parts = [0, 0, 0, 0];

        var fibMap = [0.5, 1, 2, 3, 5, 5, 8, 8, 8];

        function calculate() {
            points = 0;
            parts = [];

            $(box).find('input:radio:checked').each(function() {
                points += parseInt($(this).val());
                parts.push($(this).val());
            });

            points = fibMap[points];

            $(box).find('.total .value').text(points);
            $(box).find('.total .plural').toggle(points !== 1);
        }

        calculate();

        $(box).find('input:radio').on('change', calculate);

        $(box).find('button.vote').on('click', function() {
            $(self).trigger({
                type: 'change.sunset',
                vote: points,
                parts: parts,
            });

            return false;
        });

        $(box).find('button.vote-alt').on('click', function() {
            $(self).trigger({
                type: 'change.sunset',
                vote: $(this).text(),
            });

            return false;
        });
    };
})();
