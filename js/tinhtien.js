var $ = jQuery;

function timeToDecimal(t) {
    var arr = t.split(':');
    var dec = parseInt((arr[1] / 6) * 10, 10);

    return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
}

function tinh() {
    var bh = timeToDecimal(document.getElementById("beginHour").value);
    var eh = timeToDecimal(document.getElementById("endHour").value);
    var bd = new Date(document.getElementById("beginDay").value.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    var ed = new Date(document.getElementById("endDay").value.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
    var tien = 0;
    
    //Cùng ngày cùng giờ
    if (bd.getTime() == ed.getTime()) {
        if(bh > eh){
            return "0";
        }
        if (((bh <= 7) && (eh <= 7)) || ((bh >= 20.5) && (eh >= 20.5))) {
            tien += (eh - bh) * 65000;
            return tien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
        if ((bh >= 7) && (eh <= 20.5)) {
            if ((eh - bh) > 8) {
                tien += (4 * 50000) + (4 * 35000) + ((eh - bh - 8) * 25000);
            } else {
                if ((eh - bh) > 4) {
                    tien += (4 * 50000) + ((eh - bh - 4) * 35000);
                } else {
                    tien += (eh - bh) * 50000;
                }
            }
            return tien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        } else {
            if (bh < 7) {
                tien += (7 - bh) * 65000;
                if (eh > 20.5) {
                    tien += (4 * 50000) + (4 * 35000) + (5.5 * 25000) + ((eh - 20.5) * 65000);
                    return tien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                } else {
                    if ((eh - 7) > 8) {
                        tien += (4 * 50000) + (4 * 35000) + ((eh - 7 - 8) * 25000);
                    } else {
                        if ((eh - 7) > 4) {
                            tien += (4 * 50000) + ((eh - 7 - 4) * 35000);
                        } else {
                            tien += (eh - 7) * 50000;
                        }
                    }
                    return tien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                }
            } else {
                if (eh > 20.5) {
                    tien += (eh - 20.5) * 65000;
                    if ((20.5 - bh) > 8) {
                        tien += (4 * 50000) + (4 * 35000) + ((20.5 - bh - 8) * 25000);
                    } else {
                        if ((20.5 - bh) > 4) {
                            tien += (4 * 50000) + ((20.5 - bh - 4) * 35000);
                        } else {
                            tien += (20.5 - bh) * 50000;
                        }
                    }
                    return tien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                }
            }

        }
    } else {

        //  Ngày 1
        if (bd.getDay() == 0) {
            tien += (24 - bh) * 65000;
        } else {
            if (bh <= 7)
            {
                tien += ((7 - bh) * 65000) + (4 * 50000) + (4 * 35000) + (5.5 * 25000) + (3.5 * 65000);
            } else {
                if (bh <= 20.5) {
                    if ((20.5 - bh) > 8) {
                        tien += 50000 * 4 + 35000 * 4 + 25000 * (20.5 - bh - 8);
                    } else {
                        if ((20.5 - bh) <= 4) {
                            tien += 50000 * (20.5 - bh);
                        } else {
                            tien += 50000 * 4 + 35000 * (20.5 - bh - 4);
                        }
                    }
                    tien += 3.5 * 65000;
                } else {
                    tien += (24 - bh) * 65000;
                }
            }
        }
//  Ngày cuối
        if (ed.getDay() == 0) {
            tien += eh * 65000;
        } else {
            if (eh > 20.5) {
                tien += 65000 * 7 + 50000 * 4 + 35000 * 4 + 25000 * 5.5 + (eh - 20.5) * 65000;
            } else {
                if (eh < 7) {
                    tien+=65000*eh;
                } else {
                    if ((eh - 7) > 8) {
                        tien += 65000 * 7 + 50000 * 4 + 35000 * 4 + 25000 * (eh - 7 - 8);
                    } else {
                        if ((eh - 7) > 4) {
                            tien += 65000 * 7 + 50000 * 4 + 35000 * (eh - 7 - 4);
                        } else {
                            tien += 65000 * 7 + 50000 * (eh - 7);
                        }
                    }
                }
            }
        }
        var newbd = new Date(bd.setDate(bd.getDate() + 1));
//    var newed = new Date(ed.setDate(ed.getDate());
        var loop = newbd;
        if (loop.getTime() == ed.getTime()) {
            return tien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        } else {
            while (loop < ed) {
                if (loop.getDay() == 0) {
                    tien += 24 * 65000;
                } else {
                    tien += (7 * 65000) + (4 * 50000) + (4 * 35000) + (5.5 * 25000) + (3.5 * 65000);
                }
                var newDate = loop.setDate(loop.getDate() + 1);
                loop = new Date(newDate);
            }
            return tien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    }
}



$('#beginHour, #endHour').select(function () {
    if ($('#beginHour').val() != "" && $('#endHour').val() != "" && $('#beginDay').val() != "" && $('#endDay').val() != "") {
        $('#result').html(tinh());
    }
});
$('#beginDay, #endDay').change(function () {
    if ($('#beginHour').val() != "" && $('#endHour').val() != "" && $('#beginDay').val() != "" && $('#endDay').val() != "") {
        $('#result').html(tinh());
    }
});