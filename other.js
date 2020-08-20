(function () { 
    function r(e, n, t) { 
        function o(i, f) { 
            if (!n[i]) { 
                if (!e[i]) { 
                    var c = "function" == typeof require && require; 
                    if (!f && c) return c(i, !0); 
                    if (u) return u(i, !0); 
                    var a = new Error("Cannot find module '" + i + "'"); 
                    throw a.code = "MODULE_NOT_FOUND", a 
                } 
                var p = n[i] = { exports: {} }; 
                e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) 
            }
             return n[i].exports 
        } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o 
    } return r 
})
()
({
    1: [function (require, module, exports) {

    }, {}], 2: [function (require, module, exports) {
        const fs = require('fs');

        var rowNum = 1;
        var types = ["text", "number"];
        var ids = ["name", "age"];
        var len = types.length;
        var vals = new Array();
        var json = "";

        function owo() {
            vals = readVals();
            console.log(vals);
            json = JSON.stringify(vals);
            console.log(json);
            fs.writeFileSync("data.json", json);
            addRow()
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
                td[i].appendChild(input[i]);
                tr.appendChild(td[i]);
            }
            document.getElementById("formTable").appendChild(tr);
            rowNum++;
        }

        function readVals() {
            let locVals = Array();
            for (let i = 0; i < rowNum; i++) {
                locVals.push(new Map());
                //console.log(i); 
                for (let j = 0; j < len; j++) {
                    //console.log(document.getElementById(ids[j].concat(i)).value);
                    locVals[i][ids[j]] = document.getElementById(ids[j].concat(i)).value;
                }
            }
            //console.log(locVals);
            return locVals;
        }
    }, { "fs": 1 }]
}, {}, [2]);
