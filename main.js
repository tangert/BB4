$(function(){
    $(".data-structures").hide();
    $(".algorithms").hide();
    $("#content-wrapper").hide();
    $(".selection-content").hide();
    
});

$(document).ready(function(){
    
    //some variable initialization 
    var currentLanguage, 
        currentDataStructure,
        currentAlgorithm = ""; 

    var languageIsSelected,
        dataStructureIsSelected,
        algorithmIsSelected,
        descIsSelected = false;
    
    //initial window stuff
    var canvas = document.getElementById("myCanvas");
    
    $('#dl-toggle').change(function() {
        
        var pageStyle = document.getElementById("pageStyle");
        var codeStyle = document.getElementById("codeStyle")
        var title = document.getElementById("site-name");
                
        if ($(this).prop('checked') == true) {
            
            $(title).html("Whiteboard").hide().fadeIn();
            $(pageStyle).attr("href", "css/light-styles.css").hide().fadeIn();
            $(codeStyle).attr("href", "libraries/highlightjs/styles/atelier-estuary-light.css").hide().fadeIn();
        
        } else {
            $(title).html("Blackboard").hide().fadeIn();
            $(pageStyle).attr("href", "css/dark-styles.css").hide().fadeIn(); 
            $(codeStyle).attr("href", "libraries/highlightjs/styles/atelier-estuary-dark.css").hide().fadeIn();

            
        }
    });
    
//    $(window).scroll(function() {
//        var distanceFromTop = $(document).scrollTop();
//        
//        if (distanceFromTop >= $('#top-wrapper').height() * 1.5) {
//            $('#top-wrapper').addClass('fixed');
//        } else {
//            $('#top-wrapper').removeClass('fixed');
//        }
//    });
    
    $("#desc-button").click(function(e){
        
       e.preventDefault();
                
        if (descIsSelected) {
            
            $("#code-desc").fadeIn();
            descIsSelected = false;
            
        } else {
            
            $("#code-desc").fadeOut();
            descIsSelected = true;
            
        } 
        
    });
    
    //functions
    $("#dataStructuresBtn").click(function(e){
        
        e.preventDefault();
    
        if(languageIsSelected) {
            e.preventDefault();
            $(".data-structures").fadeIn();
            $(".algorithms").hide();
        }
        
        if(algorithmIsSelected) {
            e.preventDefault();
            dataStructureIsSelected = true;
            algorithmIsSelected = false;
            
            $("#" + currentDataStructure).trigger("click");
            
        }

    });
    
    $("#algorithmsBtn").click(function(e){
        
        e.preventDefault();
        
        if(languageIsSelected) {
            e.preventDefault();
            $(".algorithms").fadeIn();
            $(".data-structures").hide();
        }
        
        if(dataStructureIsSelected) {
            e.preventDefault();
            algorithmIsSelected = true;
            dataStructureIsSelected = false;
            
            $("#" + currentAlgorithm).trigger("click");
        }

    });
    
    
    $("#languages li a").click(function(e){
  
        e.preventDefault();
        
        languageIsSelected = true; 
        currentLanguage = this.id;

        $(".selection-content").fadeIn(); 
            
        if (dataStructureIsSelected) {
            e.preventDefault();
            $("#" + currentDataStructure).trigger("click");
        }
        
        if (algorithmIsSelected) {
            e.preventDefault();
            $("#" + currentAlgorithm).trigger("click");
        }
    });
    
        
    $(".data-structures li a").click(function(e){        

        e.preventDefault();

        dataStructureIsSelected = true;
        algorithmIsSelected = false;

        if (languageIsSelected && dataStructureIsSelected) {
            e.preventDefault();
            $("#content-wrapper").fadeIn();

        }
        
        var dataStructure = this.id;
        updateCodeContent(dataStructure, currentLanguage, "data-structure");
        
    });
    
    
    $(".algorithms li a").click(function(e){
        
        e.preventDefault();

        algorithmIsSelected = true;
        dataStructureIsSelected = false;

        
        if (languageIsSelected && algorithmIsSelected) {
            e.preventDefault();
            $("#content-wrapper").fadeIn();
        }

        var algorithm = this.id;
        updateCodeContent(algorithm, currentLanguage, "algorithm");
    });
    
    function updateCodeContent(sender, language, category) {

        var codeURL;
        
        if (category == "data-structure") {
            
            codeURL = "data-structures/" + language + "/" + sender + ".txt";
            var descriptionPath = "descriptions/data-structure-descriptions.html " + "#";
            $("#code-desc").load(descriptionPath + sender).hide().fadeIn(); 
            currentDataStructure = sender; 
            
        } else if (category == "algorithm") {
            
            codeURL = "algorithms/" + language + "/" + sender + ".txt";
            var descriptionPath = "descriptions/algorithm-descriptions.html " + "#";
            $("#code-desc").load(descriptionPath + sender).hide().fadeIn(); 
            currentAlgorithm = sender; 
        }

        $.ajax({
            url : codeURL,
            dataType: "text",
            success : function (data) {

                $("#snippet pre code").removeClass().addClass("hljs " + language);
                $("#snippet pre code").hide().html(data).fadeIn();
                highlightBlockInPage();
            }
        });
    }
    
    function highlightBlockInPage() {
        // get the block and highlight it manually:
        var snippet = document.querySelector('#snippet pre code');
        hljs.highlightBlock(snippet);
    }
    
        
});