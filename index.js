//const fs = require('fs');

var rowNum = 1;
var types = ["number", "text", "number", "number", "number", "number"];
var ids = ["id", "name", "price", "stock","max", "min"];
var len = types.length;
var vals = new Array();
var json = "";
var name = "", age = "", id = "", stock = "", price = "", min ="", max="";
var curr = "";
var currType = "buyer";
var currRow;
var jsonUsers = "";
var users;

console.log("loading assets");
loadUsers();
getJSON();
console.log("done loading");

function owo() {
    if (currType == "seller") {
        //curr = document.getElementById("user").value;
        if (isValid()){
            readVals(0);
            json = JSON.stringify(vals);
            console.log(json);
            //addRow();
            console.log(vals);
            makeJSON();
            //ajaxTest();
            addMax();
            clearRow();
        }
        currRow = rowNum;
        console.log(currRow);
        updateDisplay();
    } else if (currType == "buyer") {
        document.getElementById("error").value = "Buyers cannot log or edit data!"
    }
}

function pekpek() {
    // load files
    console.log("im in");
    getJSON();
    updateDisplay();
    console.log("im out");
}

function auth(){
    let element;
    let usr = document.getElementById("user").value;
    let pass = document.getElementById("psw").value;
    for (let i = 0; i < users.length; i++) {
        element = users[i];
        if ((usr == element.user) && (pass == element.pass)) {
            curr = usr;
            currType = element.type;
            document.getElementById("user").value = "";
            document.getElementById("psw").value = "";
            updateDisplay();
            break;
        }
    }
    console.log(curr, currType);
}

function remove(){
    if (currType == "seller") {
        let idL = document.getElementById("rowNum").value;
        let val, ind;
        for (let i = 0; i < vals.length; i++) {
            val = vals[i];
            ind = i;
            if (val.id == currRow) break;
        }
        vals.splice(ind, 1);
        json = JSON.stringify(vals);
        makeJSON();
        updateDisplay();
    }
}

function editRow() {
    if (currType == "seller") {
        let line = 0;

        // not actually row number, just lazy to change
        currRow = document.getElementById("rowNum").value;

        let val, ind;
        for (let i = 0; i < vals.length; i++) {
            val = vals[i];
            ind = i;
            if (val.id == currRow) break;
        }

        console.log("Edit row " + currRow);
        document.getElementById(ids[0].concat(line)).value = val.id;
        document.getElementById(ids[1].concat(line)).value = val.name;
        document.getElementById(ids[2].concat(line)).value = val.price;
        document.getElementById(ids[3].concat(line)).value = val.stock;
        document.getElementById(ids[4].concat(line)).value = val.max;
        document.getElementById(ids[5].concat(line)).value = val.min;
        vals.splice(ind, 1);
        rowNum--;
        console.log(vals);
        updateDisplay()
    } else if (currType == "buyer") {
        document.getElementById("error").value = "Buyers cannot log or edit data!"
    }
}

function updateDisplay() {
    document.getElementById("display").innerHTML = "<tr><th>ID</th><th>NAME</th><th>PRICE</th><th>STOCK</th><th>Max MSRP</th><th>Min MSRP</th>";
    if (currType == "seller"){
        for (let ind = 0; ind < vals.length; ind++) {
            console.log(ind);
            let data = vals[ind];
            if (data.user == curr) {
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                td1.innerHTML = vals[ind].id;
                tr.appendChild(td1);
                let td2 = document.createElement("td");
                td2.innerHTML = vals[ind].name;
                tr.appendChild(td2);
                let td3 = document.createElement("td");
                td3.innerHTML = vals[ind].price;
                tr.appendChild(td3);
                let td4 = document.createElement("td");
                td4.innerHTML = vals[ind].stock;
                tr.appendChild(td4);
                let td5 = document.createElement("td");
                td5.innerHTML = vals[ind].max;
                tr.appendChild(td5);
                let td6 = document.createElement("td");
                td6.innerHTML = vals[ind].min;
                tr.appendChild(td6);
                document.getElementById("display").appendChild(tr);
            }
        }
    } else if (currType == "buyer") {
        let idL, nameL, minL, maxL;
        try {
            idL = document.getElementById("id0").value;
        } catch (error) {
            idL = "";
            console.log(error);
        }
        try {
            nameL = document.getElementById("name0").value;
        } catch (error) {
            nameL = "";
            console.log(error);
        }
        try {
            maxL = document.getElementById("max0").value;
        } catch (error) {
            maxL = "";
            console.log(error);
        }
        try {
            minL = document.getElementById("min0").value;
        } catch (error) {
            minL = "";
            console.log(error);
        }
        for (let i = 0; i < vals.length; i++) {
            let data = vals[i];
            let cond = (idL == data.id) || (nameL == data.name) || ((data.price < maxL) && (data.price > minL));
            console.log("cond = ".concat(cond));
            if (cond) {
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                td1.innerHTML = vals[i].id;
                tr.appendChild(td1);
                let td2 = document.createElement("td");
                td2.innerHTML = vals[i].name;
                tr.appendChild(td2);
                let td3 = document.createElement("td");
                td3.innerHTML = vals[i].price;
                tr.appendChild(td3);
                let td4 = document.createElement("td");
                td4.innerHTML = vals[i].stock;
                tr.appendChild(td4);
                let td5 = document.createElement("td");
                td5.innerHTML = vals[i].max;
                tr.appendChild(td5);
                let td6 = document.createElement("td");
                td6.innerHTML = vals[i].min;
                tr.appendChild(td6);
                document.getElementById("display").appendChild(tr);
            }
        }
    }
}

function isValid() {
    let cond = false;
    let cond2 = false;
    if (currType == "buyer") cond = true;

    for (let i = 0; i < vals.length; i++) {
        let curr = document.getElementById(ids[0].concat(0)).value;
        if (curr == vals[i].id) {
            cond2 = true;
        }
    }
    console.log(cond, cond2);
    if (cond) {
        document.getElementById("error").innerHTML = "Buyer Accounts cannot edit or log data!";
        return false;
    } else if (cond2) {
        document.getElementById("error").innerHTML = "Id has been used already!";
        return false
    } else {
        document.getElementById("error").innerHTML = "";
        return true;
    }
}

function addRow() {
    let tr = document.createElement("tr");
    tr.id = "row".concat(rowNum);
    let input = [];
    let td = [];
    for (let i = 0; i < len; i++) {
        td.push(document.createElement("td"));
        input.push(document.createElement("input"));
        input[i].id = ids[i].concat(rowNum);
        input[i].type = types[i];
        input[i].name = ids[i].concat(rowNum);
        td[i].appendChild(input[i]);
        tr.appendChild(td[i]);
    }
    document.getElementById("formTable").appendChild(tr);
    rowNum++;
}

function addMax() {
    rowNum++;
    document.getElementById("rowNum").max = rowNum
}

function clearRow() {
    for (let i = 0; i < len; i++) {
        let elem = document.getElementById(ids[i].concat(0));
        elem.value = "";
    }
}

function readVals(line) {
    let idL = document.getElementById(ids[0].concat(line)).value;
    let nameL = document.getElementById(ids[1].concat(line)).value;
    let priceL = document.getElementById(ids[2].concat(line)).value;
    let stockL = document.getElementById(ids[3].concat(line)).value;
    let maxL = document.getElementById(ids[4].concat(line)).value;
    let minL = document.getElementById(ids[5].concat(line)).value;
    let localVals = {
        id: idL,
        name: nameL,
        price: priceL,
        stock: stockL,
        max: maxL,
        min: minL,
        user: curr,
    }
    id = idL;
    name = nameL;
    price = priceL;
    stock = stockL;
    max = maxL;
    min = minL;
    json = JSON.stringify(localVals);
    vals.push(localVals);
}

function download(filename, text) {
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
  
    pom.style.display = 'none';
        document.body.appendChild(pom);
    
    pom.click();
  
    document.body.removeChild(pom);
  }

// TODO make user system
// TODO add an 'info tab'

function makeJSON() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //let str = document.getElementById("error").innerHTML;
            document.getElementById("error").innerHTML = this.responseText;
        }
    }
    xhttp.open("GET", "./write.php?json=" + json, false);
    xhttp.send();
}

function getJSON() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //let str = document.getElementById("error").innerHTML;
            json = this.responseText;
            vals = JSON.parse(json);
            console.log(vals);
            console.log("overwriting")
            name = "";
            age = "";
            id = "";
            stock = "";
            price = "";
            rowNum = vals.length;
            console.log("done");
            document.getElementById("rowNum").max = rowNum;
        }
    }
    xhttp.open("GET", "./read.php?user=" + curr, false);
    xhttp.send();
}

function loadUsers(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jsonUsers = this.responseText;
            users = JSON.parse(jsonUsers);
            console.log(users);
        }
    }
    xhttp.open("GET", "./authPrep.php", false);
    xhttp.send();
}
