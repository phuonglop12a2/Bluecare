/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    function createTimeArea() {
        var indexContent = 0;
        var contents = [];
        contents[indexContent++] = '<div id="time-area"><ul>';
        for (var i = 0; i < 24; i++) {
            contents[indexContent++] = '<li value="' + i + '">' + i + ' : 00</li>';
            contents[indexContent++] = '<li value="' + (i + 0.5) + '">' + i + ' : 30</li>';
        }
        contents[indexContent++] = '</ul>';
        $('body').append(contents.join(''));
        $("#time-area").customScrollbar();
    }

    createTimeArea();
    function createNumberArea() {
        var indexContent = 0;
        var contents = [];
        contents[indexContent++] = '<div id="number-area"><ul>';
        for (var i = 1; i <= 90; i++) {
            contents[indexContent++] = '<li value="' + i + '">' + i + '</li>';
        }
        contents[indexContent++] = '</ul>';
        $('body').append(contents.join(''));
        $("#number-area").customScrollbar();
    }
    createNumberArea();
});

$('.selectable[data-select-type="time"]').focus(function () {
    if ($("#time-area").css('display') === 'none') {
        $("#time-area").css('display', 'block');
        $("#time-area").css('top', $(this).offset().top + $(this).outerHeight());
        $("#time-area").css('left', $(this).offset().left);
        $("#time-area").outerWidth($(this).outerWidth() - 2);
        $("#time-area").customScrollbar();
        $("#time-area").attr('data-input-name', $(this).attr('name'));
    }
});

$('.selectable[data-select-type="time"]').focusout(function () {
    var self = $(this);
    if ($("#time-area").css('display') !== 'none') {
        $("#time-area").find('ul>li').each(function () {
            if ($(this).is(":hover")) {
                self.val($(this).text());
            }
        });
        $("#time-area").css('display', 'none');
    }
});

var currentInputText = '';
var currentInput = null;

$.fn.selectRange = function(start, end) {
    var e = document.getElementById($(this).attr('id')); // I don't know why... but $(this) don't want to work today :-/
    if (!e) return;
    else if (e.setSelectionRange) { e.focus(); e.setSelectionRange(start, end); } /* WebKit */ 
    else if (e.createTextRange) { var range = e.createTextRange(); range.collapse(true); range.moveEnd('character', end); range.moveStart('character', start); range.select(); } /* IE */
    else if (e.selectionStart) { e.selectionStart = start; e.selectionEnd = end; }
};

$('.selectable[data-select-type="time"]').on('input', function () {
    //trim to normal text
    var self = $(this);
    if (currentInput != this) {
        currentInputText = $(this).val();
    }
    var texts = [];
    $("#time-area").find('ul>li').each(function () {
        texts[$(this).text().trim()] = $(this).text();
    });

    for (var k in texts) {
        if (texts.hasOwnProperty(k)) {
            var key = k;
            var val = texts[k];

            if (key.indexOf(currentInputText) == 0) {
                $(self).val(val);
                console.log(currentInputText);
                $(self).selectRange(currentInputText.length, val.length);
                return;
            }
        }
    }
});

$("#time-area").find('ul>li').click(function () {
    $('input[name="' + $("#time-area").attr('data-input-name') + '"]').val($(this.text()));
});

$('.selectable[data-select-type="number"]').focus(function () {
    if ($("#number-area").css('display') === 'none') {
        $("#number-area").css('display', 'block');
        $("#number-area").css('top', $(this).offset().top + $(this).outerHeight());
        $("#number-area").css('left', $(this).offset().left);
        $("#number-area").outerWidth($(this).outerWidth() - 2);
        $("#number-area").customScrollbar();
        $("#number-area").attr('data-input-name', $(this).attr('name'));
    }
});


$('.selectable[data-select-type="number"]').focusout(function () {
    var self = $(this);
    if ($("#number-area").css('display') !== 'none') {
        $("#number-area").find('ul>li').each(function () {
            if ($(this).is(":hover")) {
                self.val($(this).text());
            }
        });
        $("#number-area").css('display', 'none');
    }
});