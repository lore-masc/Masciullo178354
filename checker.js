
const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }

    var par = "?";
    Object.keys(invocationParameters).forEach(function (key) {
        par = par + key + "=" + invocationParameters[key] + "&";
    });
    par = par.substr(0,par.length-1);

    //console.log(url+par);

    return fetch(url+par).then(function(res) {
        return res.json();
    }).then(function(data){  

        checkResult.urlChecked = url+par;
        checkResult.resultData = data;
        checkResult.resultStatus = res.status;
        checkResult.statusTestPassed = (res.status == expectedResultStatus);
        checkResult.resultDataAsExpected = compareResults(expectedResultData, data);
        console.log(checkResult);
        return checkResult;
    });

}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (var e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check