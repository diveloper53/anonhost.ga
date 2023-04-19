document.querySelector(".firstBlockMainButton").onclick = function() {
    document.querySelector("#popupWindowWarn").classList.add("popupWindowWarn-animShow");
    document.querySelector(".popupWindowBackground").classList.add("popupWindowBackground-animShow");
    document.querySelector("body").classList.add("bodyNoMove");

    document.querySelector("#popupWindowWarn").classList.remove("popupWindowWarn-animClose");
    document.querySelector(".popupWindowBackground").classList.remove("popupWindowBackground-animClose");
}

document.querySelector("#popupWindowWarnSubmit").onclick = function() {
    document.querySelector("#popupWindowOne").classList.add("popupWindowOne-animShow");

    document.querySelector("#popupWindowOne").classList.remove("popupWindowOne-animClose");
}

document.querySelector(".popupWindowOneOther").onclick = function() {
    document.querySelector("#popupWindowTwo").classList.add("popupWindowTwo-animShow");

    document.querySelector("#popupWindowTwo").classList.remove("popupWindowTwo-animClose");
}

document.querySelector("#popupWindowWarnCloseButton").onclick = function() {
    document.querySelector("#popupWindowWarn").classList.add("popupWindowWarn-animClose");
    document.querySelector(".popupWindowBackground").classList.add("popupWindowBackground-animClose");

    document.querySelector("#popupWindowWarn").classList.remove("popupWindowWarn-animShow");
    document.querySelector(".popupWindowBackground").classList.remove("popupWindowBackground-animShow");
    document.querySelector("body").classList.remove("bodyNoMove");
}

document.querySelector("#popupWindowOneCloseButton").onclick = function() {
    document.querySelector("#popupWindowOne").classList.add("popupWindowOne-animClose");
    document.querySelector(".popupWindowBackground").classList.add("popupWindowBackground-animClose");

    document.querySelector("#popupWindowOne").classList.remove("popupWindowOne-animShow");
    document.querySelector(".popupWindowBackground").classList.remove("popupWindowBackground-animShow");
    document.querySelector("body").classList.remove("bodyNoMove");
}

document.querySelector("#popupWindowTwoCloseButton").onclick = function() {
    document.querySelector("#popupWindowTwo").classList.add("popupWindowTwo-animClose");
    document.querySelector(".popupWindowBackground").classList.add("popupWindowBackground-animClose");

    document.querySelector("#popupWindowTwo").classList.remove("popupWindowTwo-animShow");
    document.querySelector(".popupWindowBackground").classList.remove("popupWindowBackground-animShow");
    document.querySelector("body").classList.remove("bodyNoMove");
}

document.querySelector(".firstBlockLoginButton").onclick = function() {
    document.querySelector("#popupWindowLogin").classList.add("popupWindowOne-animShow");
    document.querySelector(".popupWindowBackground").classList.add("popupWindowBackground-animShow");
    document.querySelector("body").classList.add("bodyNoMove");

    document.querySelector("#popupWindowLogin").classList.remove("popupWindowOne-animClose");
    document.querySelector(".popupWindowBackground").classList.remove("popupWindowBackground-animClose");
}

document.querySelector("#popupWindowLoginCloseButton").onclick = function() {
    document.querySelector("#popupWindowLogin").classList.add("popupWindowOne-animClose");
    document.querySelector(".popupWindowBackground").classList.add("popupWindowBackground-animClose");

    document.querySelector("#popupWindowLogin").classList.remove("popupWindowOne-animShow");
    document.querySelector(".popupWindowBackground").classList.remove("popupWindowBackground-animShow");
    document.querySelector("body").classList.remove("bodyNoMove");
}

document.querySelector(".popupWindowTwoRange").oninput = function() {
    let val = document.querySelector(".popupWindowTwoRange").value;

    let months = parseInt(val / 30);
    let days = val - (months * 30);
    
    let months_last_num;
    let days_last_num;

    months >= 20 ? months_last_num = months - 20 :
    months >= 10 ? months_last_num = months - 10 :
    months_last_num = months;

    days >= 20 ? days_last_num = days - 20 :
    days >= 10 ? days_last_num = days - 10 :
    days_last_num = days;

    let months_str;
    let days_str;

    if(months > 0) {
        months_str =
        months_last_num >= 5 || months_last_num == 0 || (months > 10 && months < 21) ? `${months} месяцев` :
        months_last_num >= 2 ? `${months} месяца` :
        months_last_num >= 1 ? `${months} месяц` :
        false;
    } else {
        months_str = false;
    }

    if(days > 0) {
        days_str =
        days_last_num >= 5 || days_last_num == 0 || (days > 10 && days < 21) ? `${days} дней` :
        days_last_num >= 2 ? `${days} дня` :
        days_last_num >= 1 ? `${days} день` :
        false;
    } else {
        days_str = false;
    }

    let str;
    
    months_str != 0  && days_str != 0 ? str = `${months_str}, ${days_str}` :
    months_str != 0 ? str = months_str :
    days_str != 0 ? str = days_str :
    str = "Упс! Что-то сломалось... Прямо как твои планы на жизнь.";

    document.querySelector(".popupWindowTwoRangeText").textContent = str;
}

document.querySelector("#popupWindowOneButtonOne").onclick = function() {
    registerHost(1);
}

document.querySelector("#popupWindowOneButtonTwo").onclick = function() {
    registerHost(7);
}

document.querySelector("#popupWindowOneButtonThree").onclick = function() {
    registerHost(30);
}

document.querySelector("#popupWindowOneButtonFour").onclick = function() {
    registerHost(180);
}

document.querySelector("#popupWindowTwoSubmit").onclick = function() {
    registerHost(document.querySelector(".popupWindowTwoRange").value);
}

function registerHost(time) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.anonhost.ga/register-host.php?time=" + time);
    request.responseType = "json";

    request.onload = function() {
        console.log("Register Host:", request.response);
        let info = request.response;

        if(info.status == 0) {
            sessionStorage.setItem("login", info.login);
            sessionStorage.setItem("password", info.password);
            sessionStorage.setItem("time", info.time);
            sessionStorage.setItem("currectTime", info.currectTime);

            window.location = "./panel";
        } else {
            alert(`Error on registering host [${info.status}]: ${info.message}`);
        }
    }

    request.onerror = function(message) {
        alert(`Error on registering host [unknown error]: ${message}`);
    }

    request.send();
}

document.querySelector("#popupWindowLoginSubmit").onclick = function() {
    var request = new XMLHttpRequest();
    let login = document.querySelector("#popupWindowLoginLogin").value;
    let password = document.querySelector("#popupWindowLoginPassword").value;
    request.open("GET", `https://api.anonhost.ga/check-host.php?login=${login}&password=${password}`);
    request.responseType = "json";

    request.onload = function() {
        console.log("Check Host:", request.response);
        let info = request.response;

        if(info.status == 0 || info.status == 6) {
            sessionStorage.setItem("login", login);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("time", info.time);

            window.location = "/panel";
        } else {
            alert(info.message);
        }
    }

    request.onerror = function(message) {
        alert(`Error on checking host [request error]: ${message}`);
    }

    request.send();
}