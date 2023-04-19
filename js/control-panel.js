// Отображение логина и пароля от хоста

let login = sessionStorage.getItem("login");
let password = sessionStorage.getItem("password");
let homeDir = encodeURI("https://" + ("st.anonhost.ga/" + login + "/").replace("//", "/"));

let loginText = document.querySelector("#anonDataLogin");
let passwordText = document.querySelector("#anonDataPassword");
let homeDirText = document.querySelector("#anonDataHomeDir");

let directory = "/";

loginText.value = login;
passwordText.value = password;
homeDirText.value = homeDir;

// Отображение времени хостинга и уведомление о его истечении

let hostTime = parseInt(sessionStorage.getItem("time"));
let currectTime = Math.round(Date.now() / 1000);
let timeLeftText = document.querySelector("#anonTimeLeft");

let time = hostTime - currectTime;

// while(true)

let interval = setInterval(() => {

    // Время
    if(time > 0) {

        // 60 секунд в минуте * 60 минут в часе  * 24 часа в сутках * ~30 дней в месяце
        let months = Math.trunc(time / 60 / 60 / 24 / 30);
        let days = Math.trunc((time / 60 / 60 / 24) - (months * 30));
        let hours = Math.trunc((time / 60 / 60) - ((months * 24 * 30) + (days * 24)));
        let minutes = Math.trunc((time / 60) - ((months * 60 * 24 * 30) + (days * 60 * 24) + (hours * 60)));
        let seconds = Math.trunc((time) - ((minutes * 60) + (months * 60 * 60 * 24 * 30) + (days * 60 * 60 * 24) + (hours * 60 * 60)));

        let months_last_num;
        let days_last_num;
        let hours_last_num;
        let minutes_last_num;
        let seconds_last_num;
    
        months >= 20 ? months_last_num = months - 20 :
        months >= 10 ? months_last_num = months - 10 :
        months_last_num = months;
    
        days >= 20 ? days_last_num = days - 20 :
        days >= 10 ? days_last_num = days - 10 :
        days_last_num = days;

        hours >= 20 ? hours_last_num = hours - 20 :
        hours >= 10 ? hours_last_num = hours - 10 :
        hours_last_num = hours;

        minutes >= 20 ? minutes_last_num = minutes - 20 :
        minutes >= 10 ? minutes_last_num = minutes - 10 :
        minutes_last_num = minutes;

        seconds >= 20 ? seconds_last_num = seconds - 20 :
        seconds >= 10 ? seconds_last_num = seconds - 10 :
        seconds_last_num = seconds;

        let months_str;
        let days_str;
        let hours_str;
        let minutes_str;
        let seconds_str;

        if(months > 0) {
            months_str =
            months_last_num >= 5 || months_last_num == 0 || (months > 10 && months < 21) ? `${months} месяцев ` :
            months_last_num >= 2 ? `${months} месяца ` :
            months_last_num >= 1 ? `${months} месяц ` :
            "";
        } else {
            months_str = "";
        }

        if(days > 0) {
            days_str =
            days_last_num >= 5 || days_last_num == 0 || (days > 10 && days < 21) ? `${days} дней ` :
            days_last_num >= 2 ? `${days} дня ` :
            days_last_num >= 1 ? `${days} день ` :
            "";
        } else {
            days_str = "";
        }

        if(hours > 0) {
            hours_str =
            hours_last_num >= 5 || hours_last_num == 0 || (hours > 10 && hours < 21) ? `${hours} часов ` :
            hours_last_num >= 2 ? `${hours} часа ` :
            hours_last_num >= 1 ? `${hours} час ` :
            "";
        } else {
            hours_str = "";
        }

        if(minutes > 0) {
            minutes_str =
            minutes_last_num >= 5 || minutes_last_num == 0 || (minutes > 10 && minutes < 21) ? `${minutes} минут ` :
            minutes_last_num >= 2 ? `${minutes} минуты ` :
            minutes_last_num >= 1 ? `${minutes} минута ` :
            "";
        } else {
            minutes_str = "";
        }

        if(seconds > 0) {
            seconds_str =
            seconds_last_num >= 5 || seconds_last_num == 0 || (seconds > 10 && seconds < 21) ? `${seconds} секунд ` :
            seconds_last_num >= 2 ? `${seconds} секунды ` :
            seconds_last_num >= 1 ? `${seconds} секунда ` :
            "";
        } else {
            seconds_str = "";
        }

        let time_str = (months_str + days_str + hours_str + minutes_str + seconds_str).slice(0, length - 1);
        

        timeLeftText.innerText = time_str;

        time--;
    } else {
        timeLeftText.setAttribute("value", "ИСТЕКЛО");
        alert("Срок хостинга истёк! Все данные будут удалены через некоторое время.\nВы можете сохранить какие-либо данные на свой компьютер, если вам нужно, однако вы уже не можете редактировать файлы на вашем хостинге.");
        clearInterval(interval);
    }
}, 1000);

// Отображение файлов

let filesDiv = document.querySelector(".files");
let filesLoaded = 0;

function getFiles(path) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.anonhost.ga/get-files.php?login=" + login + "&password=" + password + "&path=" + path);
    request.responseType = "json";

    request.onload = function() {
        console.log("Get Files [" + path + "]:", request.response);
        let info = request.response;

        if(info.status == 0) {
            document.querySelector(".files").innerHTML = "";
            for (let i = 0; i < info.content.length; i++) {
                addToList(info.content[i], info.isdir[i], i);
                filesLoaded++;
            };
        } else {
            alert(`Error on getting files [${info.status}]: ${info.message}`);
        }
    }

    request.onerror = function(message) {
        alert(`Error on getting files [http error]: ${message.message}`);
    }

    request.send();
}

getFiles(directory);

// Загрузка файлов

//selecting all required elements
const dropArea = document.querySelector("html"),
    uploadText = document.querySelector(".fileUploadText"),
    uploadButton = document.querySelector(".fileUploadButton"),
    fileInput = document.querySelector(".fileUploadInput");

uploadButton.onclick = () => {
    fileInput.click(); //if user click on the button then the input also clicked
};

fileInput.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    uploadFile(); //calling function
    console.log("change");
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    uploadText.innerHTML = "&DownArrowBar; Отпустите чтобы загрузить";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    uploadText.innerHTML = "&LeftArrow; Нажмите здесь или перетащите файлы в окно";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    uploadFile(); //calling function
});

function uploadFile() {

    var files = fileInput.files;
    var formData = new FormData();
 
    for(let i = 0; i < files.length; i++) {
        formData.append("file-" + i, files[i]);
    }

    var request = new XMLHttpRequest();

    // Set POST method and ajax file path
    request.open("POST", "https://api.anonhost.ga/upload.php?login=" + login + "&password=" + password + "&path=" + directory + "&count=" + files.length, true);
    request.responseType = "json";

    request.onload = function() {
        console.log("Uploading Files:", request.response);
        let info = request.response;

        if(info.status == 0) {
            info.upload.forEach(file => {
                if(file.status != 0) {
                    alert(file.message);
                }
            });
        } else {
            alert(`Error on uploading files [${info.status}]: ${info.message}`);
        }

        uploadText.innerHTML = "&LeftArrow; Нажмите здесь или перетащите файлы в окно";

        getFiles(directory);
    }

    request.upload.onerror, request.onerror = function(message) {
        alert(`Error on uploading files [http error]: ${message.message}`);
        uploadText.innerHTML = "&LeftArrow; Нажмите здесь или перетащите файлы в окно";
    }

    request.upload.onprogress = function(value) {
        uploadText.innerHTML = "&UpTeeArrow; Загружено " + Math.trunc(value.loaded / value.total * 100) + "%";
    }
 
    // Send request with data
    request.send(formData);
 
}

// Удаление файлов и директорий

function remove(path) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.anonhost.ga/remove.php?login=" + login + "&password=" + password + "&path=" + directory + "/" + path);
    request.responseType = "json";

    request.onload = function() {
        console.log("Remove [" + path + "]:", request.response);
        let info = request.response;

        if(info.status != 0) {
            alert(`Error on removing file/directory [${info.status}]: ${info.message}`);
        }

        getFiles(directory);
    }

    request.onerror = function(message) {
        alert(`Error on removing file/directory [http error]: ${message.message}`);
    }

    request.send();
}

// Изменение имени файла или директории

function rename(from, to) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.anonhost.ga/rename.php?login=" + login + "&password=" + password + "&from=" + directory + "/" + from + "&to=" + directory + "/" + to);
    request.responseType = "json";

    request.onload = function() {
        console.log("Rename [" + from + ", " + to + "]:", request.response);
        let info = request.response;

        if(info.status != 0) {
            alert(`Error on renaming file/directory [${info.status}]: ${info.message}`);
        }

        getFiles(directory);
    }

    request.onerror = function(message) {
        alert(`Error on renaming file/directory [http error]: ${message.message}`);
    }

    request.send();
}

// Создание директории

document.querySelector(".createDirectoryButton").onclick = function() {
    var request = new XMLHttpRequest();
    var random = Math.trunc(Math.random() * Math.pow(10, 10));
    var name = "Новая папка (" + random + ")";
    request.open("GET", "https://api.anonhost.ga/create-directory.php?login=" + login + "&password=" + password + "&path=" + directory + "/" + name);
    request.responseType = "json";

    request.onload = function() {
        console.log("Create directory [" + name + "]:", request.response);
        let info = request.response;

        if(info.status == 0) {
            addToList(name, true, ++filesLoaded);
            document.querySelector("#filename-" + filesLoaded).click();
        } else {
            alert(`Error on creating directory [${info.status}]: ${info.message}`);
        }
    }

    request.onerror = function(message) {
        alert(`Error on creating directory [http error]: ${message.message}`);
    }

    request.send();
}

// Открытие директории

let directoryPathText = document.querySelector(".directoryPathText");
directoryPathText.value = directory;

function openDirectory(dir) {
    directory = (directory + "/" + dir + "/").replace("//", "/");
    directory = directory == "" ? "/" : directory;
    directoryPathText.value = directory;
    getFiles(directory);
}

// Возвращение назад

document.querySelector(".backDirectoryButton").onclick = function() {
    directory = directory.replace(/(.*)\/.+$/, /$1/).replace("//", "/");
    directory = directory == "" ? "/" : directory;
    directoryPathText.value = directory;
    getFiles(directory);
}

// Копирование ссылки на файл

function copyLink(link) {
    navigator.clipboard.writeText(link)
    .then(() => {
        alert("Link copied to clipboard!\n" + link);
    })
    .catch(message => {
        alert("Error on copying link [" + link + "]:", message);
    });
}

// Добавляет папку/файл к списку файлов

function addToList(name, isdir, i) {
    let link = encodeURI(homeDir + "/" + directory + "/" + name).replace("//", "/");
    let type = isdir ? 'directory' : 'file';
    let filesDivStr = "";

    filesDivStr += '            <div class="file">\n';
    filesDivStr += '                <img src="../icons/' + type + '.svg" class="fileIcon">\n';
    filesDivStr += '                <input type="text" class="filename" id="filename-' + i + '" onchange="rename(\'' + name + '\', document.querySelector(\'#filename-' + i + '\').value)" value="' + name + '">\n';
    filesDivStr += '                <div class="fileActions">\n';
    if(!isdir) {
        filesDivStr += '                    <a class="fileRedirect" href="' + link + '" target="_blank"></a>\n';
        filesDivStr += '                    <button class="fileActionsButton" onclick="copyLink(\'' + link + '\')">\n';
        filesDivStr += '                        <img class="fileActionsButtonIcon" src="../icons/link.svg">\n';
        filesDivStr += '                    </button>\n';
    } else {
        filesDivStr += '                    <div class="fileRedirect" onclick="openDirectory(\'' + name + '\')"></div>\n';
    }
    filesDivStr += '                    <button class="fileActionsButton" onclick="remove(\'/' + name + '\')">\n';
    filesDivStr += '                        <img class="fileActionsButtonIcon" src="../icons/trash.svg">\n';
    filesDivStr += '                    </button>\n';
    filesDivStr += '                </div>\n';
    filesDivStr += '            </div>\n';

    filesDiv.innerHTML += filesDivStr;
}