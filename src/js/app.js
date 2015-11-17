$(function() {
    'use strict';

    var fibMap = [0.5, 1, 2, 3, 5, 5, 8, 8, 8];

    $('input').change(function() {
        var tot = 0;

        $('input:checked').each(function() {
            tot += parseInt($(this).val());
        });

        tot = fibMap[tot];

        $('#total').text(tot);
        $('#total-plural').toggle(tot !== 1);
    });
})();
