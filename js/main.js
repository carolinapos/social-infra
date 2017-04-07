$(document).ready(function(){

    $(document).on("mousemove", function(event) {
        $('#tooltip').css('top', event.pageY + 20);
        $('#tooltip').css('left', event.pageX + 20);
    });

    $('svg g').each(function(event) {
        var name = $(this).attr('class');
        $(this).hover(
            function(event) {
                $(this)
                    .find('path')
                        .css('stroke', '#000')
                        .css('stroke-width', '2');
                $(this)
                    .css('z-index', 1);
                $('#tooltip').html(name);
                $('#tooltip').show();
            },
            function(event) {
                $(this)
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
