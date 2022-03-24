var canvas = document.getElementById("beerCanvas");
var ctx = canvas.getContext("2d");
var particles = [];
var particleCount = 280;

for (var i = 0; i < particleCount; i++) {
    particles.push(new particle());
}

function particle() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 300;
    this.speed = 1 + Math.random() / 2;
    this.radius = Math.random() * 3;
    this.opacity = (Math.random() * 100) / 1000;
}

function loop() {
    requestAnimationFrame(loop);
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255," + p.opacity + ")";
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fill();
        p.y -= p.speed;
        if (p.y <= -10) particles[i] = new particle();
    }
}

loop();

(function ($) {
    $.fn.countdown = function (options, callback) {
        thisEl = $(this);

        var settings = {
            date: null,
            format: null,
        };

        if (options) {
            $.extend(settings, options);
        }

        function countdown_proc() {
            var eventDate = Date.parse(settings.date) / 1000;
            var currentDate = Math.floor($.now() / 1000);

            if (eventDate <= currentDate) {
                if (callback) callback.call(this);
                // if (interval) clearInterval(interval);
            }

            var seconds = eventDate - currentDate;

            var days = Math.floor(seconds / (60 * 60 * 24));

            seconds -= days * 60 * 60 * 24;

            var hours = Math.floor(seconds / (60 * 60));
            seconds -= hours * 60 * 60;

            var minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;

            if (days == 1) {
                thisEl.find(".timeRefDays").text("day");
            } else {
                thisEl.find(".timeRefDays").text("days");
            }
            if (hours == 1) {
                thisEl.find(".timeRefHours").text("hour");
            } else {
                thisEl.find(".timeRefHours").text("hours");
            }
            if (minutes == 1) {
                thisEl.find(".timeRefMinutes").text("minute");
            } else {
                thisEl.find(".timeRefMinutes").text("minutes");
            }
            if (seconds == 1) {
                thisEl.find(".timeRefSeconds").text("second");
            } else {
                thisEl.find(".timeRefSeconds").text("seconds");
            }

            if (settings.format == "on") {
                days = String(days).length >= 2 ? days : "0" + days;
                hours = String(hours).length >= 2 ? hours : "0" + hours;
                minutes = String(minutes).length >= 2 ? minutes : "0" + minutes;
                seconds = String(seconds).length >= 2 ? seconds : "0" + seconds;
            }

            thisEl.find(".days").text(days);
            thisEl.find(".hours").text(hours);
            thisEl.find(".minutes").text(minutes);
            thisEl.find(".seconds").text(seconds);
        }

        countdown_proc();

        interval = setInterval(countdown_proc, 1000);
    };
})(jQuery);

$("#countdown").countdown({
    date: "2 April 2022 12:00:00",
    format: "on",
});

function setHeights() {
    var windowHeight = $(window).height();
    $(".slide").height(windowHeight);
}

setHeights();

$(window).resize(function () {
    setHeights();
});

function addSticky() {
    $(".slide").each(function () {
        var scrollerAnchor = $(this).offset().top;
        if (window.scrollY >= scrollerAnchor) {
            $(this).addClass("fix-it");
        } else {
            $(this).removeClass("fix-it");
        }
    });
}

$(window).scroll(function () {
    addSticky();
});
