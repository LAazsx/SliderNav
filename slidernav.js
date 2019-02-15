/*
 *
 *  Modified by LiaoAndrew
 * 
 *  SliderNav - A Simple Content Slider with a Navigation Bar
 *  Copyright 2015 Monji Dolon, http://mdolon.com/
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://devgrow.com/slidernav
 */
$.fn.sliderNav = function (options) {

    var defaults = { items: ["�"], debug: false, height: '400', arrows: true, event: 'mouseover', search:true };
    var opts = $.extend(defaults, options);
    
    // no idea
    var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
    

    // adds slider class to the slider object
    var slider = $(this); $(slider).addClass('slider');

    
    // build search
    if(o.search)
    {
        $(slider).prepend('<div class="slider-serach"><input class="form-control" /></div>');
    }

    // create the divs
    $(slider).append('<div class="slider-content"></div>');
    $('.slider-content', slider).append('<div class="slider-nav"><ul></ul></div>');
    $('.slider-content',slider).append('<div class="slider-results"></div>');


    var phoneBookList = $("#address-book .slider-results");
    if (phoneBookList === undefined) {
        console.error('Unable to find #address-book');
        return;
    }
    var keys = [];
    var dataList = "<ul>";
    for (var i = 0; i < o.items.length; i++) {
        var group = o.items[i];

        keys.push(group.Key);

        var groupLi = `<li id="${group.Key}">`;

        groupLi += `<a name="${group.Key}" class="title">${group.Key}</a>`;
        groupLi += '<ul>';
        for (var ctr = 0; ctr < group.Items.length; ctr++) {
            var item = group.Items[ctr];
            groupLi += '<li><a href="/"><div class="contact-item">';

            groupLi += `<h3 class="contact-name">${item.FirstName} ${item.LastName} </h3>`;

            if (item.Email !== null) {
                groupLi += `<div><i class="fa fa-at"></i><span class="email">${item.Email}</span></div>`;
            }
            if (item.MobileNumber !== null) {
                groupLi += `<div><i class="fa fa-mobile"></i><span class="mobile-number">${item.MobileNumber}</span></div>`;
            }
            if (item.Landline !== null) {
                groupLi += `<div><i class="fa fa-phone"></i><span class="landline-number">${item.Landline}</span>`;

                if (item.LocalNumber !== null) {
                    groupLi += `<span class="local-number">${item.LocalNumber}</span>`;
                }
                groupLi+='</div>'
            }

            groupLi += '</div></a></li>';
        }
        groupLi += "</ul>";
        groupLi += '</li>';
        dataList += groupLi;
    }
    dataList += "</ul>";
    phoneBookList.append(dataList);


    // selects the first item by default
    $('.slider-results li:first', slider).addClass('selected');

    
    // start building the nav
    for (var i = 0; i < keys.length; ++i)
        $('.slider-nav ul', slider).append("<li><a alt='#" + keys[i] + "'>" + keys[i] + "</a></li>");
    
    
    var height = $('.slider-nav', slider).height();
    // used height passed in the consutrctor if defined
    // else default to height of nav
    if (o.height)
        height = o.height;
        // set height of slider and content
    $('.slider-results, .slider-nav', slider).css('height', height) ;

    // debug logging
    if (o.debug) $(slider).append('<div id="debug">Scroll Offset: <span>0</span></div>');

    $('.slider-nav a', slider).on(opts.event, function (event) {
        var target = $(this).attr('alt');
        var cOffset = $('.slider-results', slider).offset().top;
        var tOffset = $('.slider-results ' + target, slider).offset().top;
        var height = $('.slider-nav', slider).height(); if (o.height) height = o.height;
        var pScroll = (tOffset - cOffset) - height / 8;
        $('.slider-results li', slider).removeClass('selected');
        $(target).addClass('selected');
        $('.slider-results', slider).stop().animate({ scrollTop: '+=' + pScroll + 'px' });
        if (o.debug) $('#debug span', slider).html(tOffset);
    });

    $('input',slider).on('keyup',function(e){
        searchResults($(this).val().toLowerCase());
    });

    if (o.arrows) {
        $('.slider-nav', slider).css('top', '20px');
        $(slider).prepend('<div class="slide-up end"><span class="arrow up"></span></div>');
        $(slider).append('<div class="slide-down"><span class="arrow down"></span></div>');
        $('.slide-down', slider).click(function () {
            $('.slider-results', slider).animate({ scrollTop: "+=" + height + "px" }, 500);
        });
        $('.slide-up', slider).click(function () {
            $('.slider-results', slider).animate({ scrollTop: "-=" + height + "px" }, 500);
        });
    }


    var searchResults =function(query){
        // get id's of related results
        $.each(o.items,function(index,item){
            $.each(item.Items,function(index, contact)
            {
                if(!contact.FirstName.includes(query))   
                {
                    
                }    
            })
        });
    };
};
