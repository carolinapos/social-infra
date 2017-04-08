$(document).ready(function(){

    $(document).on("mousemove", function(event) {
        $('#tooltip').css('top', event.pageY + 20);
        $('#tooltip').css('left', event.pageX + 20);
    });

    $('svg g').each(function(event) {
        var title = $(this).data('title');
        var healthUnits = $(this).data('health-units');
        var educationUnits = $(this).data('education-units');
        var culturalUnits = $(this).data('cultural-units');
        var sportsUnits = $(this).data('sports-units');
        $(this).hover(
            function(event) {
                $('.' + this.className.baseVal)
                    .find('path')
                        .css('stroke', '#000')
                        .css('stroke-width', '2');
                $(this)
                    .css('z-index', 1);
                $('#tooltip h1').html(title);
                $('#tooltip .health-units').html(healthUnits);
                $('#tooltip .education-units').html(educationUnits);
                $('#tooltip .cultural-units').html(culturalUnits);
                $('#tooltip .sports-units').html(sportsUnits);
                $('#tooltip').show();
            },
            function(event) {
                $('.' + this.className.baseVal)
                    .find('path')
                        .css('stroke', '#FFF')
                        .css('stroke-width', '0.737');
            }
        );
    });
    $('svg').mouseout(function(event) {
        $('#tooltip').hide();
    });

});
