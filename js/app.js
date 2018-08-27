/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var $ = jQuery;

var currentWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

if (currentWidth < 630) {
    $(".slickslider.client-review").slick({
        infinite: true,
        centerMode: true,
        slidesToShow: 1
    });
} else {
    $(".slickslider.client-review").slick({
        infinite: true,
        centerMode: true,
        slidesToShow: 2
    });
}


$(".slickslider.mission").slick({
    dots: true,
    infinite: false,
    slidesToShow: 1
});

// f.1 SmartMenus begin
$(function () {
    $('#main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8
    });
});

// f.2 cố định height trong danh sách
function fixHeight(selector) {
    var maxHeight = 0;
    $(selector).find('>*').each(function () {
        if (maxHeight < $(this).height()) {
            maxHeight = $(this).height();
        }
    });

    $(selector).find('>*').each(function () {
        $(this).height(maxHeight);
    });
}

fixHeight('.fix-height-3');
fixHeight('.fix-height-4');


// f.3 Khi click vào nút menu ở giao diện mobile thì sổ ra
$(function () {
    var $mainMenuState = $('#main-menu-state');
    if ($mainMenuState.length) {
        // animate mobile menu
        $mainMenuState.change(function (e) {
            var $menu = $('#main-menu');
            if (this.checked) {
                $menu.hide().slideDown(250, function () {
                    $menu.css('display', 'block');
                });
            } else {
                $menu.show().slideUp(250, function () {
                    $menu.css('display', 'none');
                });
            }
        });
        // hide mobile menu beforeunload
        $(window).bind('beforeunload unload', function () {
            if ($mainMenuState[0].checked) {
                $mainMenuState[0].click();
            }
        });
    }
});

// f.4 Nút di chuyển của slickslider trong phần khách hàng nói gì về bluecare của trang home

$('.slidermoves>div>i:first-child').click(function () {
    $('button.slick-prev').click();
});

$('.slidermoves>div>i:last-child').click(function () {
    $('button.slick-next').click();
});

$('.navigation-left i').click(function () {
    $('.fotorama__arr.fotorama__arr--prev').click();
});

$('.navigation-right i').click(function () {
    $('.fotorama__arr.fotorama__arr--next').click();
});

// f.5 thay đổi form khi chọn radio trong trang dịch vụ

$('.book-service-form input[name="mode"]').change(function () {
    if ($(this).prop('checked')) {
        $('.medical-examination-modal').removeClass('active');
        $($(this).attr('data-model')).addClass('active');
    }
});

// f.6 fix input datetime trong trang dịch vụ

$(document).ready(function () {
    $('input[name=examinationDatesCount]').attr('type', 'number');
});

// f.7 sử dụng datepicker trong trang dịch vụ

$('.datepicker[data-date-picker=date]').datetimepicker({
    yearOffset: 0,
    timepicker: false,
    format: 'd/m/Y',
    formatDate: 'd/m/Y',
    minDate: 'now'
});
$('#endDay').click(function () {
    $('#endDay[data-date-picker=date]').datetimepicker({
        minDate: new Date(getMinDate()).getTime()
    });
});
$('#beginDay').click(function () {
    $('#beginDay[data-date-picker=date]').datetimepicker({
        minDate: 'now'
    });
});
function getMinDate() {
    if ($('#beginDay').val() != "") {
        var day = new Date($('#beginDay').val().replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
        return day;
    }
}
$('.datepicker[data-date-picker=time]').datetimepicker({
    datepicker: false,
    format: 'H:i',
    step: 30
});
// f.8 fix height chỗ quy trình thực hiện
fixHeight('ul.implement-process');
// f.9 fix height chỗ danh sách thiết bị trong trang cho thuê thiết bị y tế
var pHeight = 0;
$('ul.devices>li p:not(.content)').each(function () {
    if ($(this).height() > pHeight) {
        pHeight = $(this).height();
    }
});
$('ul.devices>li p:not(.content)').each(function () {
    var padding = (pHeight - $(this).height()) / 2;
    $(this).css('padding-top', padding + 10);
    $(this).css('padding-bottom', padding + 10);
//    $(this).height(pHeight);
});
// f.10 nội dung thiết bị sẽ đưa lên popup trong trang cho thuê thiết bị y tế
$('.devices li .inner a, .devices .acupuncture-item button').click(function (e) {
    e.preventDefault();
    var liElement = $($(this).closest('li'));
    $('#popup-section .image img').attr('src', liElement.find('.image>img').attr('src'));
    $('#popup-section .image img').attr('src', liElement.find('.image>img').attr('src'));
    $('#popup-section h4').text(liElement.find('p:not(.content)').text());
    $('#popup-section p').text(liElement.find('p.content').text());
    // $('#popup-section').removeClass('inactive');
});
$('#popup-section .close').click(function () {
    $('#popup-section').addClass('inactive');
    $('body').css('overflow', 'auto');
});
// f.11 hiển thị popup trong trang dịch vụ
$(document).click(function (event) {
    if ($(event.target).closest('.devices li .inner a, .devices .acupuncture-item button').length) {
        if ($('#popup-section').hasClass('inactive')) {
            $('#popup-section').removeClass('inactive');
            $('body').css('overflow', 'hidden');
            return;
        }
    }
    if (!$(event.target).closest('#popup-section .inner').length) {
        if (!$('#popup-section').hasClass('inactive')) {
            $('#popup-section').addClass('inactive');
            $('body').css('overflow', 'auto');
        }
    }
});
// f.12 slider trong trang home
var firstparallaxslider = new parallaxSlider({
    wrapperid: 'myparallaxslider', //ID of DI
    //
    displaymode: {type: 'auto', pause: 2000, cycles: 2, stoponclick: false, pauseonmouseover: false},
    delaybtwdesc: 500, // delay in milliseconds between the revealing of each description layer inside a slide
    navbuttons: ['../parallax_slider/images/left.png', '../parallax_slider/images/right.png', '../parallax_slider/images/up.png',
        '../parallax_slider/images/down.png'], // path to nav images
    activeslideclass: 'selectedslide', // CSS class that gets added to currently shown DIV slide
    orientation: 'h', //Valid values: "h" or "v"
    persist: false, //remember last viewed slide and recall within same session?
    slideduration: 1000 //transition duration (milliseconds)
});
// f.13 slider trong trang trở thành bluecarer (phía dưới)
var secondparallaxSlider = new parallaxSlider({
    wrapperid: 'process-used-slide', //ID of DI
    //
    displaymode: {type: 'auto', pause: 2000, cycles: 2, stoponclick: false, pauseonmouseover: false},
    delaybtwdesc: 500, // delay in milliseconds between the revealing of each description layer inside a slide
    navbuttons: ['../parallax_slider/images/left.png', '../parallax_slider/images/right.png', '../parallax_slider/images/up.png',
        '../parallax_slider/images/down.png'], // path to nav images
    activeslideclass: 'selectedslide', // CSS class that gets added to currently shown DIV slide
    orientation: 'h', //Valid values: "h" or "v"
    persist: false, //remember last viewed slide and recall within same session?
    slideduration: 1000 //transition duration (milliseconds)
});
// f.14 slider trong trang trở thành bluecarer (phía trên)
var thirdparallaxSlider = new parallaxSlider({
    wrapperid: 'be-happy-with-bluecare-slide', //ID of DI
    //
    displaymode: {type: 'auto', pause: 2000, cycles: 2, stoponclick: false, pauseonmouseover: false},
    delaybtwdesc: 500, // delay in milliseconds between the revealing of each description layer inside a slide
    navbuttons: ['../parallax_slider/images/left.png', '../parallax_slider/images/right.png', '../parallax_slider/images/up.png',
        '../parallax_slider/images/down.png'], // path to nav images
    activeslideclass: 'selectedslide', // CSS class that gets added to currently shown DIV slide
    orientation: 'h', //Valid values: "h" or "v"
    persist: false, //remember last viewed slide and recall within same session?
    slideduration: 1000 //transition duration (milliseconds)
});
// f.15 expandsible

var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = $(this).parent().find('.collapse-content')[0];
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}
// f.16 phần click vào service trong danh sách service cuộn xuống service tương ứng
$('a.link-to-id').click(function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    if (currentWidth > 870) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(href).offset().top - $('header').height() - 5
        }, 1000);
    } else {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(href).offset().top - 35
        }, 1000);
    }

});
// f.17 phần cùng bạn chăm sóc gia đình luôn cùng height
if (currentWidth > 700) {
    var mh = 0;
    $('#header-2-column .column-half').each(function () {
        if ($(this).height() > mh) {
            mh = $(this).height();
        }
    });
    $('#header-2-column .column-half').each(function () {
        $(this).height(mh);
    });
}

function getCurrentDeviceWidth() {
    var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    return windowWidth;
}


// f.18 menu trên mobile cố định khi cuộn xuống
var onWindowsScroll = function () {
    var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var aTop = $('.header-top').offset().top + $('.header-top').height();
    if ($(this).scrollTop() >= aTop && windowWidth < 870) {
        $('nav#main-nav').css('position', 'fixed');
        $('nav#main-nav').css('top', '0');
        $('nav#main-nav').css('width', '100%');
        $('nav#main-nav').css('z-index', '9999');
        $('nav#main-nav').css('background', 'rgb(26, 117, 187)');
    } else {
        $('nav#main-nav').css('position', 'initial');
        $('nav#main-nav').css('top', '');
        $('nav#main-nav').css('width', '1010px');
        $('nav#main-nav').css('z-index', '9999');
        $('nav#main-nav').css('background', 'rgb(26, 117, 187)');
    }
}

$(window).scroll(function () {
    onWindowsScroll();
});
$(window).resize(function () {
    var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (windowWidth > 870) {
        $('nav#main-nav').css('position', 'initial');
        $('nav#main-nav').css('top', '');
        $('nav#main-nav').css('width', '1010px');
        $('nav#main-nav').css('z-index', '9999');
        $('nav#main-nav').css('background', 'rgb(26, 117, 187)');
    }
});
//jQuery(window).load(function(){
//   // PAGE IS FULLY LOADED  
//   // FADE OUT YOUR OVERLAYING DIV
//   $('#overlay').fadeOut();
//});

//f.19 khi nhấn nút tải app trong layout header

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

$('.header-button .download-app').click(function () {
    alert(getMobileOperatingSystem());
});

//f.20 Kiểm tra định dạng Email, Phone, Họ Tên, Địa chỉ (Validate)
var checkPhone = function () {
    var selector = '.book-service-form input[name=phone]';
    var phone = $(selector).val().trim(); // ID của trường Số điện thoại
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    var result = true;
    if (phone != '') {
        var firstNumber = phone.substring(0, 2);
        if ((firstNumber == '09' || firstNumber == '08') && phone.length == 10) {
            if (phone.match(/^\d{10}/)) {
                result = result && true;
            } else {
                $(selector).parent().css('position', 'relative');
                $(selector).parent().append("<div class='error-message'>Số điện thoại không hợp lệ</div>").find('.error-message').hide().show('fast');
                result = result && false;
            }
        } else if (firstNumber == '01' && phone.length == 11) {
            if (phone.match(/^\d{11}/)) {
                result = result && true;
            } else {
                $(selector).parent().css('position', 'relative');
                $(selector).parent().append("<div class='error-message'>Số điện thoại không hợp lệ</div>").find('.error-message').hide().show('fast');
                result = result && false;
            }
        } else {
            $(selector).parent().css('position', 'relative');
            $(selector).parent().append("<div class='error-message'>Số điện thoại không hợp lệ</div>").find('.error-message').hide().show('fast');
            result = result && false;
        }
    } else {
        $(selector).parent().css('position', 'relative');
        $(selector).parent().append("<div class='error-message'>Mời nhập số điện thoại</div>").find('.error-message').hide().show('fast');
        result = result && false;
    }
    removeError();
    return result;
};

var checkMail = function () {
    var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var selector = '.book-service-form input[name=email]';
    var email = $(selector).val().trim();
    var result = true;
    if (email != '') {
        if (!emailReg.test(email)) {
            $(selector).parent().css('position', 'relative');
            $(selector).parent().append("<div class='error-message'>Email không hợp lệ</div>").find('.error-message').hide().show('fast');
            result = result && false;
        }
    } else {
        $(selector).parent().css('position', 'relative');
        $(selector).parent().append("<div class='error-message'>Mời nhập Email</div>").find('.error-message').hide().show('fast');
        result = result && false;
    }
    removeError();
    return result;
}

var checkName = function () {
    var selector = '.book-service-form input[name=name]';
    var name = $(selector).val().trim();
    var result = true;
    if (name == '') {
        $(selector).parent().css('position', 'relative');
        $(selector).parent().append("<div class='error-message'>Mời nhập Họ tên</div>").find('.error-message').hide().show('fast');
        result = result && false;
    }
    removeError();
    return result;
}

var checkAddress = function () {
    var selector = '.book-service-form input[name=address]';
    var name = $(selector).val().trim();
    var result = true;
    if (name == '') {
        $(selector).parent().css('position', 'relative');
        $(selector).parent().append("<div class='error-message'>Mời nhập Địa chỉ</div>").find('.error-message').hide().show('fast');
        result = result && false;
    }
    removeError();
    return result;
}
//Validate ngày giờ
var checkHourConstantly = function () {
    var begin = '.book-service-form input[name=constantlyTimeBegin]';
    var end = '.book-service-form input[name=constantlyTimeEnd]';
    var hourReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/;
    var result = true;
    var bh = $(begin).val();
    var eh = $(end).val();
    if (bh == "") {
        $(begin).parent().css('position', 'relative');
        $(begin).parent().append("<div class='error-message hour'>Mời chọn giờ</div>").find('.error-message').hide().show('fast');
        setTimeout(function () {
            $(begin).parent().find('.error-message').remove();
        }, 2000);
        result = result && false;
    } else {
        if (!hourReg.test(bh)) {
            $(begin).parent().css('position', 'relative');
            $(begin).parent().append("<div class='error-message hour'>Không hợp lệ</div>").find('.error-message').hide().show('fast');
            result = result && false;
        }
    }
    if (eh == "") {
        $(end).parent().css('position', 'relative');
        $(end).parent().append("<div class='error-message hour below'>Mời chọn giờ</div>").find('.error-message').hide().show('fast');
        result = result && false;
    } else {
        if (!hourReg.test(eh)) {
            $(end).parent().css('position', 'relative');
            $(end).parent().append("<div class='error-message hour below'>Không hợp lệ</div>").find('.error-message').hide().show('fast');
            result = result && false;
        }
    }
    removeError();
    return result;

}
var checkDateConstantly = function () {
    var begin = '.book-service-form input[name=constantlyDateBegin]';
    var end = '.book-service-form input[name=constantlyDateEnd]';
    var parent = $(begin).parent();
    var bd = new Date($(begin).val().replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    var ed = new Date($(end).val().replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    var result = true;
    if (bd == "Invalid Date") {
        $(begin).parent().css('position', 'relative');
        $(begin).parent().append("<div class='error-message short'>Mời chọn ngày tháng</div>").find('.error-message.short').hide().show('fast');
        result = result && false;
    }
    if (ed == "Invalid Date") {
        $(end).parent().css('position', 'relative');
        $(end).parent().append("<div class='error-message short below'>Mời chọn ngày tháng</div>").find('.error-message.short.below').hide().show('fast');
        result = result && false;
    }
    removeError();
    return result;
}

//Định kỳ
var checkExamination = function () {
    var beginHour = '.book-service-form input[name=examinationTimeBegin]';
    var endHour = '.book-service-form input[name=examinationTimeEnd]';
    var beginDate = '.book-service-form input[name=examinationDateBegin]';
    var numDate = '.book-service-form input[name=examinationDatesCount]';
    var hourReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/;
    var result = true;
    var bh = $(beginHour).val().trim();
    var eh = $(endHour).val().trim();
    if (bh == "") {
        $(beginHour).parent().css('position', 'relative');
        $(beginHour).parent().append("<div class='error-message hour'>Mời chọn giờ</div>").find('.error-message').hide().show('fast');
        result = result && false;
    } else {
        if (!hourReg.test(bh)) {
            $(beginHour).parent().css('position', 'relative');
            $(beginHour).parent().append("<div class='error-message hour'>Không hợp lệ</div>").find('.error-message').hide().show('fast');
            result = result && false;
        }
    }
    if (eh == "") {
        $(endHour).parent().css('position', 'relative');
        $(endHour).parent().append("<div class='error-message hour'>Mời chọn giờ</div>").find('.error-message').hide().show('fast');
        result = result && false;
    } else {
        if (!hourReg.test(eh)) {
            $(endHour).parent().css('position', 'relative');
            $(endHour).parent().append("<div class='error-message hour'>Không hợp lệ</div>").find('.error-message').hide().show('fast');
            result = result && false;
        }
    }
    var bd = new Date($(beginDate).val().replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    if (bd == "Invalid Date") {
        $(beginDate).parent().css('position', 'relative');
        $(beginDate).parent().append("<div class='error-message short below'>Mời chọn ngày tháng</div>").find('.error-message.short').hide().show('fast');
        result = result && false;
    }
    var num = $(numDate).val();
    if (!(/^[0-9]/.test(num))) {
        $(numDate).parent().css('position', 'relative');
        $(numDate).parent().append("<div class='error-message hour below'>Số không hợp lệ</div>").find('.error-message.hour.below').hide().show('fast');
        result = result && false;
    } else {
        if (num <= 0) {
            $(numDate).parent().css('position', 'relative');
            $(numDate).parent().append("<div class='error-message hour below'>Tối thiểu 1 ngày</div>").find('.error-message.hour.below').hide().show('fast');
            result = result && false;
        } else {
            if (num > 90) {
                $(numDate).parent().css('position', 'relative');
                $(numDate).parent().append("<div class='error-message hour below'>Tối đa 90 ngày</div>").find('.error-message.hour.below').hide().show('fast');
                result = result && false;
            }
        }

    }
    removeError();
    return result;
}

//Điều dưỡng thủ thuật
var checkPeriodic = function () {
    var beginHour = '.book-service-form div.active input[name=periodicTimeBegin]';
    var beginDate = '.book-service-form div.active input[name=periodicDateBegin]';
    var numDate = '.book-service-form div.active input[name=periodicDatesCount]';
    var hourReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/;
    var result = true;
    var bh = $(beginHour).val().trim();
    if (bh == "") {
        $(beginHour).parent().css('position', 'relative');
        $(beginHour).parent().append("<div class='error-message hour'>Mời chọn giờ</div>").find('.error-message').hide().show('fast');
        result = result && false;
    } else {
        if (!hourReg.test(bh)) {
            $(beginHour).parent().css('position', 'relative');
            $(beginHour).parent().append("<div class='error-message hour'>Không hợp lệ</div>").find('.error-message').hide().show('fast');
            result = result && false;
        }
    }
    var bd = new Date($(beginDate).val().replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    if (bd == "Invalid Date") {
        $(beginDate).parent().css('position', 'relative');
        $(beginDate).parent().append("<div class='error-message short' style='width:90%'>Mời chọn ngày tháng</div>").find('.error-message.short').hide().show('fast');
        result = result && false;
    }
    var num = $(numDate).val();
    if (!(/^[0-9]/.test(num))) {
        $(numDate).parent().css('position', 'relative');
        $(numDate).parent().append("<div class='error-message hour below'>Số không hợp lệ</div>").find('.error-message.hour.below').hide().show('fast');
        result = result && false;
    } else {
        if (num <= 0) {
            $(numDate).parent().css('position', 'relative');
            $(numDate).parent().append("<div class='error-message hour below'>Tối thiểu 1 ngày</div>").find('.error-message.hour.below').hide().show('fast');
            result = result && false;
        } else {
            if (num > 90) {
                $(numDate).parent().css('position', 'relative');
                $(numDate).parent().append("<div class='error-message hour below'>Tối đa 90 ngày</div>").find('.error-message.hour.below').hide().show('fast');
                result = result && false;
            }
        }
    }
    removeError();
    return result;
}

//Chọn theo buổi
var checkPackage = function () {
    result = true;
    var radio = '#choose-by-package .form_fieldset input[type=radio]:checked';
    if ($(radio).length == 0) {
        $('#choose-by-package > div > div').css('position', 'relative');
        $('#choose-by-package > div > div').append("<div class='error-message hour below'>Mời chọn gói</div>").find('.error-message.hour.below').hide().show('fast');
        result = result && false;
    }
    removeError();
    return result;
}

//Thiền, Yoga
var checkContinuity = function () {
    var beginDate = '.book-service-form #lien-tuc input[name=continuityDateBegin]';
    var numDate = '.book-service-form #lien-tuc input[name=continuityDatesCount]';
    var result = true;
    var num = $(numDate).val();
    if (!(/^[0-9]/.test(num))) {
        $(numDate).parent().css('position', 'relative');
        $(numDate).parent().append("<div class='error-message hour below'>Số không hợp lệ</div>").find('.error-message.hour.below').hide().show('fast');
        result = result && false;
    } else {
        if (num <= 0) {
            $(numDate).parent().css('position', 'relative');
            $(numDate).parent().append("<div class='error-message hour below'>Tối thiểu 1 ngày</div>").find('.error-message.hour.below').hide().show('fast');
            result = result && false;
        } else {
            if (num > 90) {
                $(numDate).parent().css('position', 'relative');
                $(numDate).parent().append("<div class='error-message hour below'>Tối đa 90 ngày</div>").find('.error-message.hour.below').hide().show('fast');
                result = result && false;
            }
        }
    }
    var bd = new Date($(beginDate).val().replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    if (bd == "Invalid Date") {
        $(beginDate).parent().css('position', 'relative');
        $(beginDate).parent().append("<div class='error-message hour'>Mời chọn ngày tháng</div>").find('.error-message.hour').hide().show('fast');
        result = result && false;
    }
    removeError();
    return result;
}
var checkYogaPeriodic = function () {
    var beginDate = '.book-service-form div.active input[name=calendar]';
    var result = true;
    var bd = new Date($(beginDate).val().replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    if (bd == "Invalid Date") {
        $(beginDate).parent().css('position', 'relative');
        $(beginDate).parent().append("<div class='error-message hour below' style='width:60%;'>Mời chọn ngày tháng</div>").find('.error-message.hour.below').hide().show('fast');
        result = result && false;
    }
    removeError();
    return result;
}
var checkFlexible = function () {
    var beginHour = '.book-service-form div#linh-hoat input[name=flexibleTimeBegin]';
    var beginDate = '.book-service-form div#linh-hoat input[name=flexibleDateBegin]';
    var hourReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/;
    var result = true;
    var bd = new Date($(beginDate).val().replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    if (bd == "Invalid Date") {
        $(beginDate).parent().css('position', 'relative');
        $(beginDate).parent().append("<div class='error-message hour below' style='width:95%'>Mời chọn ngày tháng</div>").find('.error-message.hour.below').hide().show('fast');
        result = result && false;
    }
    var bh = $(beginHour).val().trim();
    if (bh == "") {
        $(beginHour).parent().css('position', 'relative');
        $(beginHour).parent().append("<div class='error-message hour below'>Mời chọn giờ</div>").find('.error-message.hour.below').hide().show('fast');
        result = result && false;
    } else {
        if (!hourReg.test(bh)) {
            $(beginHour).parent().css('position', 'relative');
            $(beginHour).parent().append("<div class='error-message hour below'>Không hợp lệ</div>").find('.error-message.hour.below').hide().show('fast');
            result = result && false;
        }
    }
    removeError();
    return result;
}
//Dinh dưỡng thực phẩm
var checkProduct = function () {
    var product = '.book-service-form #product input[name=examinationProducts]';
    var numProduct = '.book-service-form #product input[name=examinationDatesCount]';
    var result = true;
    var num = $(numProduct).val();
    var pro = $(product).val();
    if (pro == "") {
        $(product).parent().css('position', 'relative');
        $(product).parent().append("<div class='error-message hour below'>Mời chọn sản phẩm</div>").find('.error-message.hour.below').hide().show('fast');
        result = result && false;
    }
    if (!(/^[0-9]/.test(num))) {
        $(numProduct).parent().css('position', 'relative');
        $(numProduct).parent().append("<div class='error-message hour below'>Số không hợp lệ</div>").find('.error-message.hour.below').hide().show('fast');
        result = result && false;
    } else {
        if (num <= 0) {
            $(numProduct).parent().css('position', 'relative');
            $(numProduct).parent().append("<div class='error-message hour below'>Tối thiểu 1 ngày</div>").find('.error-message.hour.below').hide().show('fast');
            result = result && false;
        } else {
            if (num > 90) {
                $(numProduct).parent().css('position', 'relative');
                $(numProduct).parent().append("<div class='error-message hour below'>Tối đa 90 ngày</div>").find('.error-message.hour.below').hide().show('fast');
                result = result && false;
            }
        }
    }
    removeError();
    return result;
}
function removeError() {
    if ($(window).width() > 750) {
        setTimeout(function () {
            $('.error-message').hide('fast', function () {
                $(this).remove();
            });
        }, 2000);
    }
}
$('.book-service-form').submit(function () {
    var cn = checkName();
    var cp = checkPhone();
    var cm = checkMail();
    var ca = checkAddress();
    if ((cn) && (cp) && (cm) && (ca)) {
        var form = $('.book-service-form').find("div.active").attr('id');
        if (form == "constantly") {
            var chc = checkHourConstantly();
            var cdc = checkDateConstantly();
            if (((chc) && (cdc))) {
                return true;
            } else {
                return false;
            }
        }
        if (form == "periodically") {
            var cex = checkExamination();
            if (cex) {
                return true;
            } else {
                return false;
            }
        }
        if (form == "periodic") {
            var cp = checkPeriodic();
            if (cp) {
                return true;
            } else {
                return false;
            }
        }
        if (form == "choose-by-day") {
            var cp = checkPeriodic();
            if (cp) {
                return true;
            } else {
                return false;
            }
        }
        if (form == "choose-by-package") {
            var cp = checkPackage();
            if (cp) {
                return true;
            } else {
                return false;
            }
        }
        if (form == "lien-tuc") {
            var cc = checkContinuity();
            if (cc) {
                return true;
            } else {
                return false;
            }
        }
        if (form == "dinh-ky") {
            var cdk = checkYogaPeriodic();
            if (cdk) {
                return true;
            } else {
                return false;
            }
        }
        if (form == "linh-hoat") {
            var clh = checkFlexible();
            if (clh) {
                return true;
            } else {
                return false;
            }
        }
        if (form == "product") {
            var cpro = checkProduct();
            if (cpro) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
});
//Ghép API với Client bằng AJAX
var submit = function () {
    var formData = new Object();
    json.service = 1;
    json.job_day = $('.book-service-form div.active input[name=examinationDateBegin]').val().replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$3/$2/$1");
    json.time_start = $('.book-service-form div.active input[name=examinationTimeBegin').val();
    json.time_end = $('.book-service-form div.active input[name=examinationTimeEnd').val();
    json.price = 90000;
//    var formdata =JSON.stringify(json);
    $.ajax({
        url: 'http://210.211.121.1/bluecare/public/api/request-service', // url where to submit the request
        type: "POST", // type of action POST || GET
        dataType: 'json', // data type
        data: formData, // post data || get data
        success: function (result) {
            // you can see the result from the console
            // tab of the developer tools
            console.log(result);
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    })
}
//f.21 hiển thị popup cho đánh giá , tư vấn miễn phí
$(document).click(function (event) {
    if ($(event.target).closest('header > .header-top > .logo-bar > .sta-list > ul > li > a').length) {
        var data = $(event.target).attr('data-popup');
        if ($('.popup-window' + data).hasClass('inactive')) {
            $('.popup-window' + data).removeClass('inactive');
            $('body').css('overflow', 'hidden');
            return;
        }
    }
    if (!$(event.target).closest('.popup-window .inner').length) {
        if ($('#popup-section').length == 0) {
            $('.popup-window').addClass('inactive');
            $('body').css('overflow', 'auto');
        } else {
            if (!($('#popup-section').hasClass('inactive'))) {
                return;
            }
            $('.popup-window').addClass('inactive');
            $('body').css('overflow', 'auto');
        }
    }
});
//f.22 tắt hiển thị popup
$('.popup-window .close-btn').click(function () {
    $(this).parent().parent().addClass('inactive');
    $('body').css('overflow', 'auto');
});

 //f.23 Điều chỉnh vị trí của menu
$('#main-menu > li > ul >li').on("mouseover", function () {
    var height = -($(this).position().top);
    var mem = $(this).find("ul");
    $(mem).css('top', height + 7);
});

//f.24 Ẩn thanh đăng ký qua app để nhận mã giảm giá 10%
$('.register-via-app > span.close-btn').click(function(){
    $('.register-via-app').animate({height: '0px'}, 100, function(){$('.register-via-app').remove();});
});