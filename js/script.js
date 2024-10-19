$(document).ready(function () {
    // слайдер
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    // табы (вкладки)
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link')
    toggleSlide('.catalog-item__back')

    // модальные окна
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    // валидация форм
    function valideForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа!")
                },
                phone: "Пожалуйста, введите свой телефон",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "E-mail введен некорректно"
                }
            }
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    // маска ввода номера телефона
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Отправка писем
    $('form').submit(function(e) {
        e.preventDefault();             // отмена стандартного поведения браузера (перезагрузки)

        if (!$(this).valid()) {         // чтобы не отправлялись пустые данные
            return;
        }

        $.ajax({
            type: "POST",                       // отправка или получ данных
            url: "mailer/smart.php",            // через что пересылать
            data: $(this).serialize()           // данные
        }).done(function() {
            $(this).find("input").val("")
            $('#consultation, #order').fadeOut('slow');
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');         // обнуление полей
        });
        return false;
    });

    // page up show/hide
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn('slow');
        } else {
            $('.pageup').fadeOut('slow');
        }
    });

    // page up smooth scroll
    $("a[href='#up']").click(function () {
        const _href = $(this).attr("href");
        $("html. body").animate({scrollTop: $(_href).offset().top+"px"});
    });

    // animate
    new WOW().init();
});