$(document).ready(function(){

    function fillPeople(percentage, className) {
        var quantity = percentage*3/4;
        console.log(className, percentage, quantity);
        if (percentage < 0) {
            for (var i = 1; i <= 75; i++) {
                var selector = '.header .' + className + ' .person-' + i;
                $(selector)
                    .attr('src', 'svg/person_red.svg');
            }
        }
        else {
            for (var i = 1; i <= quantity; i++) {
                var selector = '.header .' + className + ' .person-' + i;
                $(selector).attr('src', 'svg/person.svg');
            }
            for (var i = quantity+1; i <= 75; i++) {
                var selector = '.header .' + className + ' .person-' + i;
                $(selector).attr('src', 'svg/person_line.svg');
            }
        }
    }


    $('.person-container').each(function(event) {
        for (var i = 5; i > 0; i--) {
            for (var j = (i-1) * 15 + 1; j <= i*15; j++) {
                var className = 'person-' + j;
                $(this).append('<img class="' + className + ' person" src="svg/person_line.svg">');
            }
            $(this).append('<br>');
        }
    });

    $(document).on("mousemove", function(event) {
        $('#tooltip').css('top', event.pageY - 135);
        $('#tooltip').css('left', event.pageX - 53);
    });

    $('svg g').each(function(event) {
        var title = $(this).data('title');
        var healthUnits = $(this).data('health-units');
        var educationUnits = $(this).data('education-units');
        var culturalUnits = $(this).data('cultural-units');
        var sportsUnits = $(this).data('sports-units');
        var pop = $(this).data('pop');
        var hdi = $(this).data('hdi');
        var growth = $(this).data('growth');

        $(this).hover(
            function(event) {
                $('.header .bottom .title').css('opacity', 1);
                $('.header .bottom > div *').css('opacity', 1);
                $('.header .person-container').css('opacity', 1);
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
                $('.header .bottom .title span').html(title);

                var popMessage;
                var hdiMessage;
                var growthMessage;

                switch (pop) {
                    case 16.67:
                        popMessage = 'less than 50 people per hectare';
                        break;
                    case 33.34:
                        popMessage = '50 to 100 people per hectare';
                        break;
                    case 50:
                        popMessage = '100 to 150 people per hectare';
                        break;
                    case 66.67:
                        popMessage = '150 to 200 people per hectare';
                        break;
                    case 83.34:
                        popMessage = '200 to 250 people per hectare';
                        break;
                    case 100:
                        popMessage = 'more than 250 people per hectare';
                        break;
                }

                switch (hdi) {
                    case 20:
                        hdiMessage = 'very low indicator of liveability';
                        break;
                    case 40:
                        hdiMessage = 'low indicator of liveability';
                        break;
                    case 60:
                        hdiMessage = 'medium indicator of liveability';
                        break;
                    case 80:
                        hdiMessage = 'high indicator of liveability';
                        break;
                    case 100:
                        hdiMessage = 'very high indicator of liveability';
                        break;
                }

                switch (growth) {
                    case -1:
                        growthMessage = 'less than 0% population growth';
                        $('.header .bottom .s_growth > img').attr('src', 'svg/person_red.svg');
                        break;
                    case 0:
                        growthMessage = '0% population growth';
                        $('.header .bottom .s_growth > img').attr('src', 'svg/person.svg');
                        break;
                    case 20:
                        growthMessage = '0 to 2% population growth';
                        $('.header .bottom .s_growth > img').attr('src', 'svg/person.svg');
                        break;
                    case 40:
                        growthMessage = '2 to 4% population growth';
                        $('.header .bottom .s_growth > img').attr('src', 'svg/person.svg');
                        break;
                    case 60:
                        growthMessage = 'more than 4% population growth';
                        $('.header .bottom .s_growth > img').attr('src', 'svg/person.svg');
                        break;
                }

                fillPeople(pop, 'pop');
                fillPeople(hdi, 'hdi');
                fillPeople(growth, 'growth');
                $('.header .bottom .s_pop span').html(popMessage);
                $('.header .bottom .s_hdi span').html(hdiMessage);
                $('.header .bottom .s_growth span').html(growthMessage);
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
        $('.header .bottom .title').css('opacity', 0);
        $('.header .bottom > div :not(h3)').css('opacity', 0);
        $('.header .bottom > div h3').css('opacity', 0.25);
        $('.header .person-container').css('opacity', 0.25);
        fillPeople(0, 'pop');
        fillPeople(0, 'hdi');
        fillPeople(0, 'growth');
    });

});
