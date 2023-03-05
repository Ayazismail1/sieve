let textboxEl = document.getElementsByClassName("seivecount").item(0)
let inputsdivEl = document.getElementById("inputs-ul")
let optionsEl = document.getElementById("options")
let optionbuttonEl = document.getElementById("optionbuttons")
const main = document.getElementsByClassName("maincontainer").item(0)
let after = document.querySelector(".after")
const fraksions = document.querySelector(".fraksions")
const fractionamount = document.querySelector(".fraction-amount")
const firstRowEl = document.querySelector(".firstRow")
const weightpercentdiv = document.querySelector(".weight-percent")
const sumdiv = document.querySelector(".sum")
const tableEl = document.querySelector(".middlepart")
const submitbutEl = document.getElementById("bottomPart")

function removeCurrent(element){
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}



function cleaning(){
    for (let i=0; i < inputsdivEl.getElementsByTagName('*').length; i++){
            
        inputsdivEl.children[i].value = ""
    }
}



function submit() {


    let allChildren = parseInt(inputsdivEl.getElementsByTagName('*').length);
    // clear divs
    removeCurrent(inputsdivEl)
    removeCurrent(optionsEl)
    removeCurrent(optionbuttonEl)


      for (let i = 0; i < textboxEl.value; i++){
        // createing elements
        inputs = document.createElement("input");
        inputs.type = "text";

        //style 
        inputs.placeholder = "Seive Opening..";
        // append to div
        inputsdivEl.appendChild(inputs);

}

    // set astm
    
    astm = document.createElement("input");
    astm.type = "checkbox";
    astm.id = "astm-check"
    astm.setAttribute("value","1.4142")
    astmLabel = document.createElement("h3");
    astmLabel.innerHTML = "ASTM Seive Series"
    astm.checked = true;
    
    // set tyler


    tyler = document.createElement("input");
    tyler.type = "checkbox";
    tyler.id = "tyler-check"
    tyler.setAttribute("value","1.189")
    tylerLabel = document.createElement("h3");
    tylerLabel.innerHTML = "TYLER Seive Series"
    

    // set buttons
    autofillbut = document.createElement("button")
    autofillbut.innerHTML = "Auto fill"
    autofillbut.setAttribute('onclick','checking()')

    clearbut = document.createElement("button")
    clearbut.innerHTML = "Clear"
    clearbut.setAttribute('onclick','cleaning()')

    saveButton = document.createElement("button")
    saveButton.innerHTML = "Save Data"
    saveButton.setAttribute('onclick','saveData()')

    // append to html

    optionsEl.appendChild(astm)
    optionsEl.appendChild(astmLabel)
    optionsEl.appendChild(tyler)
    optionsEl.appendChild(tylerLabel)
    optionbuttonEl.appendChild(autofillbut)


    optionbuttonEl.appendChild(saveButton)
    optionbuttonEl.appendChild(clearbut)

    // event listeners
    document.getElementById("astm-check").addEventListener("click", unchecktyler);
    document.getElementById("tyler-check").addEventListener("click", uncheckastm);
}



function autofill(method){
    firstamountEl = inputsdivEl.firstChild.value
    if (firstamountEl.length=== 0){
        alert("PLEASE ENTER THE (BİGGEST/FİRST) SEİVE OPENİNG..".toLowerCase())
    }
    result = firstamountEl
    for (let i=1; i < inputsdivEl.getElementsByTagName('*').length; i++){
        
        result = result/method.value
        inputsdivEl.children[i].value = result.toFixed(3)
    }
}


function checking(){
    astmchecking = document.getElementById("astm-check")
    tylerchecking = document.getElementById("tyler-check")

    
    if (astmchecking.checked== true){
        autofill(astmchecking)
        

        

    } else if (tylerchecking.checked== true) {
        autofill(tylerchecking)
    }

}




function unchecktyler() {
    document.getElementById("tyler-check").checked = false;
  }
function uncheckastm() {
    document.getElementById("astm-check").checked = false;
  }
// data lists
openingsList = []
amountList = []
rowsList = []
cas = []
cus = []
amountper = []
function saveData(){
    
    for (let i=0; i < inputsdivEl.getElementsByTagName('*').length; i++){
        openingsList.push(inputsdivEl.children[i].value)
    }
    main.style.display = "none"

    newContainer()

}
function newContainer(){
    after.className = "after active"
    headersArray = ["Fractions","Weight", "Weight Percentage (%)", "CUS","CAS","CUS %", "CAS %"]
    for (n in headersArray){
        headers = document.createElement("th")
        headers.textContent = headersArray[n]
        tableEl.appendChild(headers)
        
    }
    // retrive the data from local storage
    let storage = JSON.parse(localStorage.getItem("amountList"))


    for (let n =  0;  n < openingsList.length + 1; n++){
        createtablerow = document.createElement("tr")
        createtablerow.className = "row" + n
        rowsList.push(createtablerow.className)
        createdfraksion = document.createElement("td")
        createdamoutinput = document.createElement("input")
        
        if (n === 0){
            createdfraksion.innerHTML = " + " + openingsList[n]

        } else{
            if(n === openingsList.length){
                createdfraksion.innerHTML = " - " + openingsList[n - 1]
            } else {
                createdfraksion.textContent = " - " + openingsList[n - 1] + " + " + openingsList[n]

            }
            
        }
            

        selector = String("." + createtablerow.className)


        tableEl.appendChild(createtablerow)
        document.querySelector(selector).appendChild(createdfraksion)
        document.querySelector(selector).appendChild(createdamoutinput)
        
    }
    for (let n =  0;  n < storage.length; n++){
        document.querySelector(".row" + n).children[1].value = storage[n]
    }
}




function calculate() {
    // save data to local storage
    
    for (let n =  0;  n < openingsList.length + 1; n++){
        amountList.push(document.querySelector("."+rowsList[n]).children[1].value)
    }

    localStorage.setItem("amountList", JSON.stringify(amountList))

    let amountsum = amountList.reduce(function(a, b){
        return parseFloat(a) + parseFloat(b);
    });
    sum = document.createElement("p")

    
    sum.innerHTML = " Sum: "+amountsum
    sumdiv.appendChild(sum)
    result = parseFloat(amountList[0])
    resultcus = parseFloat(amountsum)

    for (let n =  0;  n < openingsList.length + 1; n++){
        precentWeightEl = document.createElement("td")

        precentWeightEl.innerHTML = (parseInt(amountList[n])*100/amountsum).toFixed(3)
        amountper.push(precentWeightEl.innerHTML)

        cusEl = document.createElement("td")
        casEl = document.createElement("td")
        cusperEl = document.createElement("td")
        casperEl = document.createElement("td")

        cusEl.textContent = resultcus.toFixed(3)
        

        casEl.textContent = result.toFixed(3)
        


        cusperEl.textContent = (resultcus*100/amountsum).toFixed(3)
        casperEl.textContent = (result*100/amountsum).toFixed(3)
        cas.push(casperEl.textContent)
        cus.push(cusperEl.textContent)
        resultcus -= parseFloat(amountList[n])

        result += parseFloat(amountList[n+1])



        document.querySelector("."+rowsList[n]).appendChild(precentWeightEl)
        document.querySelector("."+rowsList[n]).appendChild(cusEl)
        document.querySelector("."+rowsList[n]).appendChild(casEl)
        document.querySelector("."+rowsList[n]).appendChild(cusperEl)
        document.querySelector("."+rowsList[n]).appendChild(casperEl)
        
        
    }


    submitbutEl.disabled = true;
}

function draw(){
    console.log(cus)
    cusPoped = cus.slice(1,cus.length)
    console.log(cusPoped)
    console.log("iam working");
    let data = {
        x: openingsList,
        y:cusPoped,
        mode: "lines",
        type: "scatter",
        name: "CUS",
        label: "CUS"

    }
    let data2 = {
        x: openingsList,
        y:cas,
        mode: "lines",
        type: "scatter",
        name: "CAS",
        label: "CAS"
    }
    var layout = {
        xaxis: {title: "Sieve Size"},
        yaxis: {title: "Percentage"},

        title: "Cumlative Passing and Retained Graph"
      };
    completeData = [data,data2]

    Plotly.newPlot("myplot", completeData, layout)
    console.log("for real");
}


