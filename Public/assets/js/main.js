(function($){
	"use strict";

    // Header Sticky
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 120){  
            $(".navbar-area").addClass("is-sticky");
        }
        else{
            $(".navbar-area").removeClass("is-sticky");
        }
    });

    // Navbar Menu JS
    $('.navbar .navbar-nav li a').on("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 65
        }, 1500);
        e.preventDefault();
    });

    // Header Sticky Two
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 120){  
            $(".navbar-area-two").addClass("is-sticky");
        }
        else{
            $(".navbar-area-two").removeClass("is-sticky");
        }
    });
    
    // Search Popup JS
    $(".close-btn").on("click", function() {
        $('.search-overlay').fadeOut();
        $('.search-btn').show();
        $('.close-btn').removeClass('active');
    });
    $(".search-btn").on("click", function() {
        $(this).hide();
        $('.search-overlay').fadeIn();
        $('.close-btn').addClass('active');
    });
    
    // Mean Menu
    jQuery(".mean-menu").meanmenu({
        meanScreenWidth: "991"
    });

    // Odometer JS
    $(".odometer").appear(function(e) {
        var odo = $(".odometer");
        odo.each(function() {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });

    // Nice Select JS
    $("select").niceSelect();

    // Popup Video
    $(".popup-youtube").magnificPopup({
        disableOn: 320,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Tabs
    $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
    $('.tab ul.tabs li a').on('click', function (g) {
        var tab = $(this).closest('.tab'), 
        index = $(this).closest('li').index();
        tab.find('ul.tabs > li').removeClass('current');
        $(this).closest('li').addClass('current');
        tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
        tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
        g.preventDefault();
    });

    // Partner-slider
    $('.partner-slider').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        smartSpeed: 2000,
        margin: 30,
        autoplayHoverPause: true,
        autoplay: true,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });

    // Progress Bar JS
    $('.circlechart').circlechart();

    // Testimonial-slides
    $('.saying-slides').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        smartSpeed: 2000,
        margin: 30,
        center: true,
        active: true,
        autoplayHoverPause: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    // Freelancer Project Slider
    $('.freelancer-project-slider').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        smartSpeed: 2000,
        margin: 30,
        center: true,
        active: true,
        autoplayHoverPause: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });

    // Client Wrap Slider
    $('.client-wrap').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: false,
        smartSpeed: 2000,
        margin: 30,
        center: true,
        active: true,
        autoplayHoverPause: true,
        autoplay: true,
        navText: [
            "<i class='fa fa-arrow-right'></i>"
        ],
    });

    // Freelancer Client Slider
    $('.freelancer-client-slider').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        autoplayHoverPause: true,
        autoplay: true,
    });
    
    // FAQ Accordion
    $('.accordion').find('.accordion-title').on('click', function() {
        // Adds Active Class
        $(this).toggleClass('active');
        // Expand or Collapse This Panel
        $(this).next().slideToggle('fast');
        // Hide The Other Panels
        $('.accordion-content').not($(this).next()).slideUp('fast');
        // Removes Active Class From Other Titles
        $('.accordion-title').not($(this)).removeClass('active');
    });

    // Input Plus & Minus Number JS
    $('.input-counter').each(function() {
        var spinner = jQuery(this),
        input = spinner.find('input[type="text"]'),
        btnUp = spinner.find('.plus-btn'),
        btnDown = spinner.find('.minus-btn'),
        min = input.attr('min'),
        max = input.attr('max');
        
        btnUp.on('click', function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
        btnDown.on('click', function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
    });
    
    //made by vipul mirajkar thevipulm.appspot.com
    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };
    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
        var that = this;
        var delta = 200 - Math.random() * 100;
        if (this.isDeleting) { delta /= 2; }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        setTimeout(function() {
            that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };
    
    // Subscribe form
    $(".newsletter-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
        // handle the invalid form...
            formErrorSub();
            submitMSGSub(false, "Please enter your email correctly.");
        } else {
            // everything looks good!
            event.preventDefault();
        }
    });
    function callbackFunction (resp) {
        if (resp.result === "success") {
            formSuccessSub();
        }
        else {
            formErrorSub();
        }
    }
    function formSuccessSub(){
        $(".newsletter-form")[0].reset();
        submitMSGSub(true, "Thank you for subscribing!");
        setTimeout(function() {
            $("#validator-newsletter").addClass('hide');
        }, 4000)
    }
    function formErrorSub(){
        $(".newsletter-form").addClass("animated shake");
        setTimeout(function() {
            $(".newsletter-form").removeClass("animated shake");
        }, 1000)
    }
    function submitMSGSub(valid, msg){
        if(valid){
            var msgClasses = "validation-success";
        } else {
            var msgClasses = "validation-danger";
        }
        $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }
    // AJAX MailChimp
    $(".newsletter-form").ajaxChimp({
        url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
        callback: callbackFunction
    });

    // Count Time 
    function makeTimer() {
        var endTime = new Date("September 30, 2022 17:00:00 PDT");			
        var endTime = (Date.parse(endTime)) / 1000;
        var now = new Date();
        var now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        var days = Math.floor(timeLeft / 86400); 
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        $("#days").html(days + "<span>Days</span>");
        $("#hours").html(hours + "<span>Hours</span>");
        $("#minutes").html(minutes + "<span>Minutes</span>");
        $("#seconds").html(seconds + "<span>Seconds</span>");
    }
    setInterval(function() { makeTimer(); }, 1000);

    // Go to Top
    // Scroll Event
    $(window).on('scroll', function(){
        var scrolled = $(window).scrollTop();
        if (scrolled > 600) $('.go-top').addClass('active');
        if (scrolled < 600) $('.go-top').removeClass('active');
    });  
    // Click Event
    $('.go-top').on("click", function() {
        $("html, body").animate({ scrollTop: "0" },  500);
    });

    // WOW JS
    new WOW().init();
	 
    // Preloader
    jQuery(window).on("load", function() {
        $('.preloader-area').fadeOut();
    });

    // Switch Btn
	$('body').append("<div class='switch-box'><label id='switch' class='switch'><input type='checkbox' onchange='toggleTheme()' id='slider'><span class='slider round'></span></label></div>");

}(jQuery));

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('exto_theme', themeName);
    document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('exto_theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

let isFrench = false;

        window.onload = function () {
            if (!sessionStorage.getItem("quizTaken")) {
                document.getElementById("quizModal").style.display = "flex";
            }
        };

        function closeModal() {
            document.getElementById("quizModal").style.display = "none";
            sessionStorage.setItem("quizTaken", "true");
        }

        function checkAnswers() {
            const email = document.getElementById("email-q").value;
            if (!email) {
                alert(isFrench ? "Veuillez entrer votre email." : "Please enter your email.");
                return;
            }

            const answers = { q1: "b", q2: "a", q3: "a", q4: "b", q5: "b" };
            let score = 0;
            for (let key in answers) {
                const selected = document.querySelector(`input[name="${key}"]:checked`);
                if (selected && selected.value === answers[key]) {
                    score++;
                }
            }

            document.getElementById("quizQuestions").classList.add("quiz-hidden");
            document.getElementById("email-q").classList.add("quiz-hidden");
            document.getElementById("emailLabel").classList.add("quiz-hidden");

            const resultText = document.getElementById("result");
            const retryButton = document.getElementById("retryButton");

            if (score >= 4) {
                resultText.innerHTML = isFrench 
                    ? "🎉 Félicitations ! Vous avez obtenu " + score + "/5. Vous avez droit à une réduction de 25% !" 
                    : "🎉 Congratulations! You scored " + score + "/5. You are entitled to a 25% discount!";
                resultText.style.color = "green";
                sendEmail(email);
                retryButton.classList.add("quiz-hidden"); 
            } else {
                resultText.innerHTML = isFrench 
                    ? "❌ Vous avez obtenu " + score + "/5. Réessayez !" 
                    : "❌ You scored " + score + "/5. Try again!";
                resultText.style.color = "red";
                retryButton.classList.remove("quiz-hidden"); 
            }
            resultText.classList.remove("quiz-hidden");
        }

        function sendEmail(email) {
            fetch('/quiz-completed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: 'WOOW', email: email }),
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
            
        }

        function retryQuiz() {
            document.getElementById("quizQuestions").classList.remove("quiz-hidden");
            document.getElementById("email-q").classList.remove("quiz-hidden");
            document.getElementById("emailLabel").classList.remove("quiz-hidden");
            document.getElementById("result").classList.add("quiz-hidden");
            document.getElementById("retryButton").classList.add("quiz-hidden");
        }

        function translateForm() {
            isFrench = !isFrench;
            document.getElementById("quizTitle").innerText = isFrench ? "Quiz du Mois de l'Histoire des Noirs" : "Black History Month Quiz";
            document.querySelector(".quiz-button").innerText = isFrench ? "English Version" : "Version Française";
        }

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('exto_theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
      document.getElementById('slider').checked = true;
    }
})();












