//const fs = require('fs');

var rowNum = 1;
var types = ["number", "text", "number", "number"];
var ids = ["id", "name", "price", "stock"];
var len = types.length;
var vals = new Array();
var json = "";
var name = "", age = "", id = "", stock = "", price = "";
var curr = "kodi";
var currRow;

class rowData {
    constructor(id, name, price, stock){
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    get (name) {
        if (name == "id") return this.id;
        else if (name == "name") return this.name;
        else if (name == "price") return this.price;
        else if (name == "stock") return this.stock;
        else return "N/A";
    }
}

function owo() {
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
}

function pekpek() {
    // load files
    console.log("im in");
    getJSON();
    console.log("im out");
}

function editRow() {
    let line = 0;
    currRow = document.getElementById("rowNum").value;
    console.log("Edit row " + currRow);
    document.getElementById(ids[0].concat(line)).value = vals[currRow-1].id;
    document.getElementById(ids[1].concat(line)).value = vals[currRow-1].name;
    document.getElementById(ids[2].concat(line)).value = vals[currRow-1].price;
    document.getElementById(ids[3].concat(line)).value = vals[currRow-1].stock;
    vals.splice(currRow-1, 1);
    rowNum--;
    console.log(vals);
    updateDisplay()
}

function updateDisplay() {
    document.getElementById("display").innerHTML = "<tr><th>ID</th><th>NAME</th><th>PRICE</th><th>STOCK</th></tr>";
    for (let ind = 0; ind < vals.length; ind++) {
        console.log(ind);
        let data = vals[ind];
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
        document.getElementById("display").appendChild(tr);
    }
}

function isValid() {
    let cond = false;
    let cond2 = false;
    if (document.getElementById(ids[3].concat(0)).value == "") cond = true;
    if (document.getElementById(ids[3].concat(0)).value == "") cond = true;
    if (document.getElementById(ids[3].concat(0)).value == "") cond = true;
    if (document.getElementById(ids[3].concat(0)).value == "") cond = true;

    for (let i = 0; i < vals.length; i++) {
        let curr = document.getElementById(ids[0].concat(0)).value;
        if (curr == vals[i].id) {
            cond2 = true;
        }
    }
    console.log(cond, cond2);
    if (cond) {
        document.getElementById("error").innerHTML = "Missing Input!";
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
    id = document.getElementById(ids[0].concat(line)).value;
    name = document.getElementById(ids[1].concat(line)).value;
    price = document.getElementById(ids[2].concat(line)).value;
    stock = document.getElementById(ids[3].concat(line)).value;
    let localVals = new rowData(id, name, price, stock);
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
    xhttp.open("GET", "./write.php?json=" + json + "&user=" + curr, true);
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
            console.log("done")
            document.getElementById("rowNum").max = rowNum
            updateDisplay();
        }
    }
    xhttp.open("GET", "./read.php?user=" + curr, true);
    xhttp.send();
}
