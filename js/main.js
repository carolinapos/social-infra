$(function(){

    function getPersonSVG() {
        getPersonSVG.svg = getPersonSVG.svg || $($('#template-person')[0].outerHTML).show().removeAttr('id');
        return getPersonSVG.svg.clone();
    }

    function arrayWithSize(size) {
        if (size < 1) {
            return [];
        }
        return Array.apply(null, Array(Math.ceil(size)));
    }

    function personMapper(className) {
        return function(_, i) {
            return '.header .' + className + ' .person-' + (i + 1);
        };
    }

    function fillPeople(percentage, className) {
        var quantity = percentage*3/4;
        if (percentage < 0) {
            var toLine = arrayWithSize(75 - quantity).map(personMapper(className));
            $(toLine.join(','))
                .removeClass('common red')
                .addClass('line');

            var toRed = arrayWithSize(Math.abs(quantity) - 1).map(personMapper(className));
            $(toRed.join(','))
                .removeClass('common line')
                .addClass('red');
        }
        else {
            var toLine = arrayWithSize(75 - quantity).map(personMapper(className));
            $(toLine.join(','))
                .removeClass('common red')
                .addClass('line');

            var toCommon = arrayWithSize(Math.floor(quantity)).map(personMapper(className));
            $(toCommon.join(','))
                .removeClass('red line')
                .addClass('common');
        }
    }


    $('.person-container').each(function(event) {
        var $this = $(this);
        for (var i = 5; i > 0; i--) {
            for (var j = (i-1) * 15 + 1; j <= i*15; j++) {
                var className = 'person-' + j;
                $this.append(getPersonSVG().addClass(className + ' person line'));
            }
            $this.append('<br>');
        }
    });

    $(document).on("mousemove", function(event) {
        $('#tooltip')
            .css('top', event.pageY - 135)
            .css('left', event.pageX - 53);
    });

    $('svg g').each(function(event) {
        var $this = $(this);
        var title = $this.data('title');
        var healthUnits = $this.data('health-units');
        var educationalUnits = $this.data('educational-units');
        var culturalUnits = $this.data('cultural-units');
        var sportsUnits = $this.data('sports-units');
        var pop = $this.data('pop');
        var hdi = $this.data('hdi');
        var growth = $this.data('growth');

        $this.hover(
            function(event) {
                $('.' + this.className.baseVal).each(function(event){
                    var $this = $(this);
                    $this.appendTo($this.parent());
                });

                $('.header .bottom .title, .header .bottom > div *, .header .person-container').css('opacity', 1);
                $('.' + this.className.baseVal)
                    .find('path')
                        .css('stroke', '#000')
                        .css('stroke-width', '2');
                $(this)
                    .css('z-index', 1);

                $('#tooltip')
                    .find('h1')
                        .html(title)
                        .end()
                    .find('.health-units')
                        .html(healthUnits)
                        .end()
                    .find('.educational-units')
                        .html(educationalUnits)
                        .end()
                    .find('.cultural-units')
                        .html(culturalUnits)
                        .end()
                    .find('.sports-units')
                        .html(sportsUnits)
                        .end();

                var popMessage;
                var hdiMessage;
                var growthMessage;
                var growthImage;

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
                    case -20:
                        growthMessage = 'less than 0% population growth';
                        growthImage = 'svg/person_red.svg';
                        break;
                    case -10:
                        growthMessage = 'less than 0% population growth';
                        growthImage = 'svg/person_red.svg';
                        break;
                    case 0:
                        growthMessage = '0% population growth';
                        growthImage = 'svg/person.svg';
                        break;
                    case 20:
                        growthMessage = '0 to 2% population growth';
                        growthImage = 'svg/person.svg';
                        break;
                    case 40:
                        growthMessage = '2 to 4% population growth';
                        growthImage = 'svg/person.svg';
                        break;
                    case 60:
                        growthMessage = 'more than 4% population growth';
                        growthImage = 'svg/person.svg';
                        break;
                }

                $('.header .bottom .s_growth > img').attr('src', growthImage);

                fillPeople(pop, 'pop');
                fillPeople(hdi, 'hdi');
                fillPeople(growth, 'growth');
                $('.header .bottom')
                    .find('.s_pop span')
                        .html(popMessage)
                        .end()
                    .find('.s_hdi span')
                        .html(hdiMessage)
                        .end()
                    .find('.s_growth span')
                        .html(growthMessage);
                $('#tooltip').show();
            },
            function(event) {
                $('.' + this.className.baseVal)
                    .find('path')
                        .css('stroke', '#FFF')
                        .css('stroke-width', '0.737')
                        .end()
                    .find('path.st6')
                        .css('stroke', '#CECECE')
                        .css('stroke-width', '0.737');
            }
        );
    });
    $('svg').mouseout(function(event) {
        $('#tooltip').hide();
        $('.header')
            .find('.bottom .title, .bottom > div :not(h3)')
                .css('opacity', 0)
                .end()
            .find('.bottom > div h3')
                .css('opacity', 0.25);
        // $('.header .person-container').css('opacity', 0.25;
        fillPeople(0, 'pop');
        fillPeople(0, 'hdi');
        fillPeople(0, 'growth');
    });

});
