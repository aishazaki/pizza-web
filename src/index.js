import './css/style.css'
import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';

import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';

import '@fortawesome/fontawesome-free/js/all.min.js';

$(window).scroll(function () {
    if ($(this).scrollTop() <= 250) {
        $(".index-navbar").addClass("index-transparent");
        $(".index-navbar").removeClass("nav-background")
    }
    else {
        $(".index-navbar").removeClass("index-transparent");
        $(".index-navbar").addClass("nav-background")
    }
});

$(document).ready(function () {
     /* لتعديل سنه الحفظ حتى لايكون ثابت ويبدو قديما مع الزمن */
    $("#copyright-year").text(new Date().getFullYear());
    /* لاظهار واخفاء المزيد  من  المنتجات */
    $(".myBtn").on("click", function () {
        $("#second-row").slideToggle("slow");
        $(".myBtn").toggleClass('seeMore');
        if ($(".myBtn").hasClass('seeMore')) {
            $(".myBtn").text('عرض الكل');
        }
        else{
            $(".myBtn").text('عرض عناصر اقل')
        }
       
    });
    /* لاعطاء  تنبية باضة المنتج للعربة */
    $(".add-to-cart-btn").click(function(){
        alert('تم اضافة المنتج الى عربة الشراء')
    });
    
    
});