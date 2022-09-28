prediction= "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera= document.getElementById("cam");
Webcam.attach('#cam');
function snap() {
    Webcam.snap(function(data_uri) {
        document.getElementById("foto").innerHTML= '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version: ", ml5.version);
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Y4I0mYUla/model.json", modelLoaded);
function modelLoaded() {
    console.log("model loaded");
}
function speak() {
    var synth= window.speechSynthesis;
    speak_data= "Eu acho q o emoji é " + prediction;
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check() {
    var image= document.getElementById("captured_image");
    classifier.classify(image, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("nome_emoji").innerHTML= results[0].label;
        prediction= results[0].label;
        speak();
        if (results[0].label == "Hummm SUS") {
            document.getElementById("emoji").innerHTML= "🤔";
        }
        if (results[0].label == "To d boa") {
            document.getElementById("emoji").innerHTML= "😎";
        }
        if (results[0].label == "Festa") {
            document.getElementById("emoji").innerHTML= "🥳";
        }
        if (results[0].label == "AMEI") {
            document.getElementById("emoji").innerHTML= "😍";
        }
    }
}