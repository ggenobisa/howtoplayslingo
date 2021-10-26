$( document ).ready(function() {
    
    var curvid = 0;
    var videoElements = $('.video-container > *');

    const updateVideoVisibility = (vIndex) => { 
        curvid = vIndex;
        console.log(vIndex);
        $(videoElements).each((i, el) => {
            // $(el).get(0).pause();
            $(el).get(0).currentTime = 0;

            if(i == curvid) {
                $(el).show();
                el.play();
                $(videoElements[curvid]).on('ended', () => {
                    $("#play-btn").attr("src","img/replay.png");
                    console.log("replay");
                })
            }
            else {
                $(el).hide();
            }
            
        });
    }

    updateVideoVisibility(0);

    var curturtitle = 0;
    var titletutorialElements = $('.tutorial-title-container ul > *');

    const updateTitleTutorialVisibility = (ttIndex) => {
        curturtitle = ttIndex;
        console.log(ttIndex);
        $(titletutorialElements).each((t, gm) => {
            if(t == curturtitle) {
                $(gm).show();
            }
            else {
                $(gm).hide();
            }
        });
    }

    updateTitleTutorialVisibility(0);

    var curtur = 0;
    var tutorialElements = $('.tutorial-container ul > *');

    const updateTutorialVisibility = (tIndex) => {
        curtur = tIndex;
        console.log(tIndex);
        $(tutorialElements).each((j, fm) => {
            if(j == curtur) {
                $(fm).fadeIn(1000);
                // $(fm).show();
            }
            else {
                $(fm).hide();
            }
        });
    }

    updateTutorialVisibility(0);


    /****** BACK **********/
    $("#back-btn").on('click', () => {
        $(videoElements[curvid]).off('ended');
        $('#play-btn').attr("src","img/pause.png");

        updateVideoVisibility(curvid - 1);
        updateTutorialVisibility(curtur - 1);
        updateTitleTutorialVisibility(curturtitle - 1);

        if (curvid==0) {
            $('#back-btn').prop('disabled', true);
            $('#back-btn').css({pointerEvents: "none"});
            $('#back-btn').attr("src","img/previous-line-disabled.png");
        }
        $("#next-btn").prop('disabled', false);
        $('#next-btn').css({pointerEvents: "auto"});
        $('#next-btn').attr("src","img/next-text.png");
    });


    /****** PLAY **********/
    $("#play-btn").on('click', () => {
        if($('#play-btn').attr('src') === 'img/pause.png') {
            $('#play-btn').attr("src","img/play.png");
            $(videoElements[curvid]).trigger('pause');
        } else {
            $("#play-btn").attr("src","img/pause.png");
            $(videoElements[curvid]).trigger('play');
            $(videoElements[curvid]).on('ended', () => {
                $("#play-btn").attr("src","img/replay.png");
                
            })
        }
        
        
    })

    /****** NEXT **********/
    $("#next-btn").on('click', () => {
        $(videoElements[curvid]).off('ended');
        $('#play-btn').attr("src","img/pause.png");
        
        updateVideoVisibility(curvid + 1);
        updateTutorialVisibility(curtur + 1);
        updateTitleTutorialVisibility(curturtitle + 1);

        if(videoElements.length == curvid) {
            updateVideoVisibility(0);
            updateTutorialVisibility(0);
            updateTitleTutorialVisibility(0);
            $('#next-btn').attr("src","img/next-text.png");
            $("#back-btn").prop('disabled', true);
            $('#back-btn').css({pointerEvents: "none"});
            $('#back-btn').attr("src","img/previous-line-disabled.png");
            return;
        }
        
        if(videoElements.length - 1 == curvid) {
            $('#next-btn').attr("src","img/restart.png");
        } else {
            $('#next-btn').prop('disabled', false);
            $('#next-btn').css({pointerEvents: "auto"});
            $('#next-btn').attr("src","img/next-text.png");
        }

        $("#back-btn").prop('disabled', false);
        $('#back-btn').css({pointerEvents: "auto"});
        $('#back-btn').attr("src","img/previous-line.png");
    });
});



