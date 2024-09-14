window.onload = function() {

    let startTime = Date.now();
    let min = 0;
    

    setInterval(function() {

        let stopWatch = Date.now() - startTime;

        let seconds = Math.floor(stopWatch / 1000);

        let label = document.getElementsByClassName("time_label")[0];

        

        if (seconds === 60){
            seconds = 0;
            startTime = Date.now();
            min = min + 1;

        } 

        label.innerText = String(min) + ":" + String(seconds) ;
        
    
    }, 1000);

};
