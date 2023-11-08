// https://teachablemachine.withgoogle.com/models/ZvtBvzeBY/
prediction1 = ""
prediction2 = ""

Webcam.set({
    width:400,
    height:350,
    image_format:"png",
    png_quality:90
}) ;

Webcam.attach("#camera")

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>' ;

    })
}

console.log("ml5 version- ",ml5.version) ;

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZvtBvzeBY/model.json",modelReady) ;

function modelReady() {
    console.log("model loaded!")
}


function speak() {
    var synth = window.speechSynthesis ;
    speak_data1 = "The first prediction is " + prediction1 ;
    speak_data2 = "and the second prediction is "+prediction2 ;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utterThis) 
}


function check() {
    img=document.getElementById("captured_image") ;
    classifier.classify(img,getResults) ;

}

function getResults(error,results) {
    if(error){
        console.log(error)
    } 
    else {
        console.log(results)
        prediction1 = results[0].label ;
        prediction2 = results[1].label ;

        document.getElementById("result_emotion_name").innerHTML = prediction1 ;
        document.getElementById("result_emotion_name2").innerHTML = prediction2;

        speak()

        if(prediction1=="Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;" ;
        }

        if(prediction1=="Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;" ;
        }

        if(prediction1=="Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;" ;
        }



        if(prediction2=="Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;" ;
        }

        if(prediction2=="Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;" ;
        }

        if(prediction2=="Angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;" ;
        }
    }


}

