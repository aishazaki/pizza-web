import './sass/style.scss';
import './css/style.css';
import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';

import 'jquery/dist/jquery.min';
import 'jquery/dist/jquery'
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';

import  'jquery-validation/dist/jquery.validate';
import 'jquery-validation/dist/localization/messages_ar'

import '@fortawesome/fontawesome-free/js/all.min.js';
import 'animate.css';
import  {WOW} from 'wowjs';

new WOW({live: false,  mobile:false}).init();


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
    /* لاعطاء  تنبية باضافة المنتج للعربة */
    $(".add-to-cart-btn").click(function(){
        alert('تم اضافة المنتج الى عربة الشراء')
    });

    /*=========================
    product page 
    =========================*/

    //لتحديد سعر  المنتج بناء على حجمه
    $('.product-option input[type="radio"] ').change(function(){
        $(this).parents('.product-option').siblings().removeClass('active')
        /*عند حدث التغير يجلب الاب ذو الصنف الذي بداخل القوسين ثم يجلب جميع اخوته المباشرين */
        $(this).parents('.product-option').addClass('active');
        var productSize = $(this).val();
        if (productSize === "sm") {
            $("#product-price").attr('data-product-price', 3)
        } else if (productSize === "m") {
            $("#product-price").attr('data-product-price', 3.5)
        } else {
            $("#product-price").attr('data-product-price', 5)
        } 
        var pricePerUnit = $("#product-price").attr('data-product-price');
        $(".product-info").find(".product-price").text(pricePerUnit )
        $("#form-product-selection").find('.total-price-for-product').text( pricePerUnit + 'J.D')
    });

    //لحساب السعر الاجمالي للمنتج
    $('[data-product-quantity]').change(function(){
        //جلب كمية المنتج الجديدة بواسطة التابع val الذي يجلب قيمة العنصر المحدد
        var newQuantity = $(this).val();
        //من  معلومات  المنتج بالسطر نجلب سعر المنتج الواحد عبر التابع attr
        var pricePerUnit = $("#product-price").attr('data-product-price');
        //السعر الاجمالي للمنتج
        var totalPriceForProduct= newQuantity * pricePerUnit;
        //تعيين السعر الاجمالي ضمن خلية السعر الاجمالي بالسطر
        $("#form-product-selection").find('.total-price-for-product').text( totalPriceForProduct + 'J.D')
    
    });

    /* لاظهار واخفاء تفاصيل اضافة المنتج لعربةالشراء */
    $(".order-now").on("click", function () {
        $(".add-product-to-cart").slideToggle("slow");
    });
    
    /* لاظهار واخفاء خيارات التوصيل */
    $(".continue").on("click", function () {
        $("#continue").slideToggle("slow");
    });
    
    /* خيارات التوصيل */
    //عند تغيير طريقةالتوصيل
    $('input[name="deliver_method"]').on('change', function(){
        //نحضر قيمة طريقة التوصيل المختارة 
        var deliverMethod= $(this).val();

        
        if (deliverMethod === 'on_delivary') {
            //اذا كانت  عند توصيل للمنزل عطل حقول الاستلام
            $("#takeaway-info").slideUp("slow");
            //وفعل حقول معلومات التوصيل
            $("#delivery-info").slideDown("slow");
        } else if (deliverMethod === 'take_away') {
            $("#takeaway-info").slideDown("slow");
            $("#delivery-info").slideUp("slow");
        }
    })
    /* التحقق من  حقول تفاصيل التوصيل */
    $('form[id="confirm-modal"]').validate({
        rules: {
            customer_name: "required",
            customer_phone: "required",
            customer_address: "required",
        },
        messages:{
            customer_name: " ادخل اسمك الثلاثي لطفا",
            customer_phone: "ادخل رقم هاتفك لطفا",
            customer_address: "ارجو كتابة عنوان منزلك",
        },
        submitHandler: function(form){
            form.submit();
        }
    });
    //تنبية  بانتهاءعملية الشراء
    $('button[type="submit"].btn-outline-danger').on('click', function () {
        alert('تم اضافة المنتج الى عربة الشراء')
    })
    $('button[type="submit"].btn-outline-success').on('click', function () {
        alert('تمت عملية طلبك بنجاح')
    })
    /* اضافة   تعليق */
    $(".add-comment").on("click", function () {
        $("#add-comment").slideDown("slow");
    });
    $(".cancel").on('click', function () {
        $("#add-comment").slideUp("slow");
    })
    $("body").tooltip({
        selector: '[data-toggle="tooltip"]'
    });
    /* التعليقات */
    $(".reply").click(function () {
        $(this).parents("div.row.comment").next("div.card").toggle();
    });
    /* contact page  */
    $("#contact-form").validate();

});
var now = new Date();
var weekday = new Array(7);
weekday[0] = "الاحد";
weekday[1] = "الاثنين";
weekday[2] = "الثلاثاء";
weekday[3] = "الاربعاء";
weekday[4] = "الخميس";
weekday[5] = "الجمعه";
weekday[6] = "السبت";

console.log(now.getDay());

var checkTime = function() {
  var today = weekday[now.getDay()];
  var timeDiv = document.getElementById('timeDiv');
  var dayOfWeek = now.getDay();
  var hour = now.getHours();
  var minutes = now.getMinutes();

  //add AM or PM
  var suffix = hour >= 12 ? "مساء" : "صباحا";

  // add 0 to one digit minutes
  if (minutes < 10) {
    minutes = "0" + minutes
  };


  if ((dayOfWeek == 6) && hour >= 10 && hour < 23) {
    //يوم السبت
    if (hour >= 13 && hour <= 23) {
        hour = ((hour + 11) % 12 + 1); //i.e. show 1:15 instead of 13:15
    }
    timeDiv.innerHTML = 'الان ' + today + ' ' + hour + ':' + minutes + suffix + ' - !المطعم مفتوح';
    timeDiv.className = 'open';
  } 
  //باقي الايام عدا الجمعة
  else if ((dayOfWeek == 0 || dayOfWeek == 1 || dayOfWeek == 2 || dayOfWeek == 3 || dayOfWeek == 4) && hour >= 9 && hour < 23) {
    if (hour >= 13 && hour <= 23) {
        hour = ((hour + 11) % 12 + 1); //i.e. show 1:15 instead of 13:15
    }
    timeDiv.innerHTML = 'الان ' + today + ' ' + hour + ':' + minutes + suffix + ' - المطعم مفتوح!';
    timeDiv.className = 'open';
  } 
  
  else {
    if (hour == 0 || hour > 12) {
      hour = ((hour + 11) % 12 + 1); //i.e. show 1:15 instead of 13:15
    }
    timeDiv.innerHTML = 'الان ' + today + ' ' + hour + ':' + minutes + suffix + ' - المطعم مغلق!';
    timeDiv.className = 'closed';
  }
};

var currentDay = now.getDay();
var currentDayID = "#day-" + currentDay; //gets todays weekday and turns it into id
$(currentDayID).toggleClass("today"); //hightlights today in the view hours modal popup

setInterval(checkTime, 1000);
checkTime();


