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

        try {
            fetch("/check-visitors", { method: "GET" });
            console.log("✅ Visitor tracking triggered.");
        } catch (error) {
            console.error("❌ Error tracking visitor:", error);
        };
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
document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const steps = document.querySelectorAll(".step");
    const progressBar = document.getElementById("progressBar");
    let isFrench = false;

    // Automatically open the modal when the page loads
    const modal = document.getElementById("formModal");
    const closeModalBtn = document.querySelector(".close"); // Select close button
    document.getElementById("formModal").style.display = "block";
    let fullName_q = document.getElementById("fullName").value.trim();
    let email_q = document.getElementById("email-q").value.trim();
    let language_q = isFrench ? "french": "english";

    if (window.location.href.includes("#contact")) {
        modal.style.display = "none";
    }
    // Function to show only the current step
    function showStep(step) {
        steps.forEach((s, index) => {
            s.style.display = index === step ? "block" : "none";
        });

        progressBar.style.width = `${((step + 1) / steps.length) * 100}%`;

        document.getElementById("prevBtn").style.display = step > 0 ? "inline-block" : "none";
        document.getElementById("nextBtn").textContent =
            step === steps.length - 1 ? (isFrench ? "Soumettre" : "Submit") : (isFrench ? "Suivant" : "Next");
    }

        // Close modal when clicking "×"
        closeModalBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

            // Close modal when clicking outside of it
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // "Next" button event listener
    document.getElementById("nextBtn").addEventListener("click", function () {
        if (currentStep === 0) {
            fullName_q = document.getElementById("fullName").value.trim();
            email_q = document.getElementById("email-q").value.trim();
            language_q = isFrench ? "french": "english";
            if (fullName_q === "" || email_q === "") {
                alert(isFrench ? "Veuillez entrer votre nom et votre adresse e-mail." : "Please enter your Name and Email.");
                return;
            }
            document.querySelectorAll("[data-en]").forEach(element => {
                element.textContent = isFrench ? element.getAttribute("data-fr") : element.getAttribute("data-en");
            });

            // Send the start quiz email
            try {
                fetch("/start-quiz", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: fullName_q, email: email_q, language: language_q })
                });
            } catch (error) {
                console.error("Error sending start quiz email:", error);
            }
        }

        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            generateRecommendation();
        }
    });

    // "Back" button event listener
    document.getElementById("prevBtn").addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Function to generate website recommendation
// Function to generate website recommendation with loading screen
async function generateRecommendation() {
    let formData = {};
    
    // Collect all selected radio inputs
    document.querySelectorAll("input[type='radio']:checked").forEach(input => {
        formData[input.name] = input.value;
    });

    // Collect all text inputs
    document.querySelectorAll("input[type='text'], textarea").forEach(input => {
        formData[input.name] = input.value.trim();
    });

    // Add language attribute to formData based on user selection
    formData.language = isFrench ? "french" : "english";

    // Show loading screen before sending the request
    showLoading();

    try {
        const response = await fetch("/generate-recommendation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        hideLoading();

        if (data.recommendation) {
            displayResults(data.recommendation);
        }
    } catch (error) {
        hideLoading();
        console.log(error);
        displayResults(isFrench ? "Une erreur s'est produite. Veuillez réessayer." 
            : "An error occurred. Please try again.");
    }
    sendCompletedEmail();
    
}

function sendCompletedEmail() {
            try {
                fetch("/quiz-completed", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: fullName_q, email: email_q, language: language_q })
                });
            } catch (error) {
                console.error("Error sending start quiz email:", error);
            }
}
// Function to show loading screen
function showLoading() {
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
        <div id="loadingScreen">
            <h2>${isFrench ? "Génération en cours..." : "Generating recommendation..."}</h2>
            <p>${isFrench ? "Veuillez patienter un instant." : "Please wait a moment."}</p>
            <div class="spinner"></div>
        </div>
    `;
}

// Function to hide loading screen
function hideLoading() {
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
        loadingScreen.remove();
    }
}
    
    
    // Function to show the results page
    function displayResults(recommendation) {
        document.querySelector(".modal-content").innerHTML = `
            <h2>${isFrench ? "Nous vous recommandons" : "We Recommend"}</h2>
            <p>${recommendation}</p>
            <button id="contactExpert">${isFrench ? "Parler à un expert" : "Talk to an Expert"}</button>
        `;
    
        document.getElementById("contactExpert").addEventListener("click", function () {
            window.location.href = "index.html#contact"; // Change this to actual contact page
            modal.style.display = "none";
        });
    }
    

    // Function to determine website type based on answers
    function determineWebsiteType(formData) {
        if (formData.purpose === "Sell products") {
            return isFrench ? "Un site de commerce électronique." : "An E-commerce Website.";
        } else if (formData.purpose === "Showcase my work") {
            return isFrench ? "Un site de portfolio." : "A Portfolio Website.";
        } else if (formData.purpose === "Promote my business") {
            return isFrench ? "Un site d'entreprise professionnel." : "A Professional Business Website.";
        } else if (formData.purpose === "Share information") {
            return isFrench ? "Un site de blog ou d'actualités." : "A Blog or News Website.";
        } else {
            return isFrench ? "Un site web personnalisé selon vos besoins." : "A Custom Website tailored to your needs.";
        }
    }

    // Language toggle functionality
    document.getElementById("languageToggle").addEventListener("click", function () {
        isFrench = !isFrench;
        document.querySelectorAll("[data-en]").forEach(element => {
            element.textContent = isFrench ? element.getAttribute("data-fr") : element.getAttribute("data-en");
        });

        showStep(currentStep);
    });

    // Show first step initially
    showStep(currentStep);
});

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












