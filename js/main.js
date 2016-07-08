/*function getEvents(year, month, day) {
    $.ajaxSetup({async: false});
    $.post(url, {action: 'getEvents', month: month, year: year, day:day},
        function(data) {
            dates = jQuery.parseJSON(data);
            response = dates;
        }
    );
    return response;
}
*/

function declOfNum(number, titles) {
    number = Number(number);
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

jQuery(function($) {
    (function($){

        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: '&#x3c;Пред',
            nextText: 'След&#x3e;',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Нед',
            firstDay: 1
        };
        $.datepicker.regional['ua'] = {
            closeText: "Закрити",
            prevText: "&#x3C;",
            nextText: "&#x3E;",
            currentText: "Сьогодні",
            monthNames: [ "Січень","Лютий","Березень","Квітень","Травень","Червень",
                "Липень","Серпень","Вересень","Жовтень","Листопад","Грудень" ],
            monthNamesShort: [ "Січ","Лют","Бер","Кві","Тра","Чер",
                "Лип","Сер","Вер","Жов","Лис","Гру" ],
            dayNames: [ "неділя","понеділок","вівторок","середа","четвер","п’ятниця","субота" ],
            dayNamesShort: [ "нед","пнд","вів","срд","чтв","птн","сбт" ],
            dayNamesMin: [ "Нд","Пн","Вт","Ср","Чт","Пт","Сб" ],
            weekHeader: "Тиж",
            firstDay: 1
        };
        $.datepicker.setDefaults($.datepicker.regional[clang]);

        $("#datepicker").datepicker($.extend({
            hideIfNoPrevNext: true,
            altFormat: "yy-mm-dd",
            dateFormat: "yy-mm-dd",
            beforeShowDay: function(date) {
                var mon = (date.getMonth()<9)? "0"+(date.getMonth()+1): date.getMonth()+1;
                var day = (date.getDate()<10)? "0"+date.getDate(): date.getDate();
                var artour = (clang== "ru")? ["тур","тура","туров"] : ["тур","туру","турів"];
                var nontour = (clang== "ru")? "Нет туров": "Немає турів";

                dmy = date.getFullYear() + "-" + mon + "-" + day;

                var tourainday = $('li[itemdate=' + dmy + ']').length;

                    if ($.inArray(dmy, availableDates) != -1) {
                        return [true, "", (tourainday) + " " + declOfNum(tourainday,artour)];
                    } else {
                        return [false,"",nontour];
                    }
                },
            onSelect: function(dateText, inst) {
                //если выбрана дата выводит все туры на эту дату
                $('.slider > li').hide();
                $('.slider > li').removeClass('sli');
                $('li[itemdate='+dateText+']').show();
                $('li[itemdate='+dateText+']').addClass('sli');

                //$('.slidewrap').carousel({
                //    slider: '.slider',
                //    slide: 'li.sli',
                //    nextSlide: '.next',
                //    prevSlide: '.prev',
                //    speed: 300 // ms.
                //});
                var slidenum = $('.slider > li.sli').length;

                $('.slider').css({
                    marginLeft: "0px",
                    width: 100 * slidenum + "%"
                });
                $('.sli').css({
                    float: "left",
                    width: (100 / slidenum) + "%"
                });

                if(slidenum>1) {
                    $('.slidnav .arrow').show();
                    $('.next').removeClass('disabled');
                    $('.prev').addClass('disabled');
                }
                else
                    $('.slidnav .arrow').hide();

                //console.log(dateText);
                //console.log(inst);
                //getEvents(2016,3,17);
            }
        },
            $.datepicker.regional[clang]
        ));

        $('.slider > li').hide();
        var today = new Date();
        //выводит туры по умолчанию
        //var tformat = today.format("YYYY-MM-DD");
        var tmon = (today.getMonth()<9)? "0"+(today.getMonth()+1): today.getMonth()+1;
        var tday = (today.getDate()<10)? "0"+today.getDate(): today.getDate();
        var tformat = today.getFullYear() + "-" + tmon + "-" + tday;
        $('li[itemdate='+tformat+']').addClass('sli');
        $('li[itemdate='+tformat+']').show();
        // цикл выводит туры на ближайшие будуюшие даты текушего месяца
        while ((!$('li[itemdate=' + tformat + ']').show().length) && (tday<31)) {
            tday++;
            tformat = today.getFullYear() + "-" + tmon + "-" + tday;
            $('li[itemdate='+tformat+']').addClass('sli');
            $('li[itemdate='+tformat+']').show();
        }
        // выводит последний тур если нету ближайших туров
        //console.log($('li.sli').length);
        if(!($('li.sli').length)){
            $('li[itemdate]:last').addClass('sli');
            $('li[itemdate]:last').show();
        }

        $('.slidewrap').carousel({
            slider: '.slider',
            slide: 'li.sli',
            nextSlide: '.next',
            prevSlide: '.prev',
            speed: 300 // ms.
        });
        $('.next').removeClass('disabled');
        $('.prev').addClass('disabled');

    })(jQuery);
});