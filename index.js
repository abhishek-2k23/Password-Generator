const psdLength = document.querySelector("[psdLength]");
const slider =  document.querySelector(".slider");
let password = "";

// slider handling
let psdLengthV = 10;
handleSlider();
function handleSlider()
{
    slider.value = psdLengthV;
    psdLength.innerText = psdLengthV;

    // slider size
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ((psdLengthV-min)*100/(max-min)) + "% 100%";
}
// adding eventlistner on handleSlider
slider.addEventListener('input',(e)=>{
    psdLengthV = e.target.value;
    handleSlider();
})

//Strength circle color Indicator

const indicator = document.querySelector("[StrengthIndicator]");
function setIndicatorColor(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "0 0 15px"+color;
}

// default color
setIndicatorColor("#fff")
// Get Random integer function
function getRndInteger(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}
// generate random 1 digit number
function generateRndNumber(){
    return getRndInteger(0,9);
}
// generate lowercase
function generateLowecase()
{
    return String.fromCharCode(getRndInteger(97,123));
}
//Generate Uppercase
function generateUppercase()
{
    return String.fromCharCode(getRndInteger(65,90));
}

//Get random symbol
let symbols = "~`!@#$%^&*()_+[]{};:,<>?/\\\"";
function generateSymbol()
{
    const rndNumber = getRndInteger(0,symbols.length);
    return symbols.slice(rndNumber,rndNumber+1);
}


//  copy btn
const GeneratedPsd = document.querySelector(".G-Password-box");
const copiedText = document.querySelector(".cpy-box");
async function copiedTextbox(){
    try{
    await navigator.clipboard.writeText(GeneratedPsd.innerText);
    copiedText.innerText = "copied";
    }
    catch(e)
    {
        copiedText.innerText = "failed";
    }
    copiedText.style.display = 'block';
    setTimeout(() =>{
    copiedText.style.display = 'none';
    },2000)
}

//copy button functionality
const cpyBtn = document.querySelector(".cpy-btn");
cpyBtn.addEventListener('click',()=>{
    if(GeneratedPsd.innerText != "Password")
    {
        copiedTextbox();
    }
})


let checkCount = 1;
const upperCheck = document.querySelector("#upperCase");
const lowerCheck = document.querySelector("#lowerCase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

//checkbox count function
function handleCheckBoxChange()
{
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked) checkCount++;
        
        //special condition
        if(psdLengthV < checkCount){
            psdLengthV = checkCount;
            handleSlider();
        }
    }); 
    
}
//Checking Checkbox on every change.
allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
});


// Password Strength Calculation
function calcStrength()
{
    if(checkCount>=3 && psdLengthV>=8) setIndicatorColor("#0f0");
    else if(checkCount>=2 && psdLengthV>=5) setIndicatorColor("#ff0");
    else setIndicatorColor("#f00")

}

//Generate Button
const GenerateBtn = document.querySelector(".GenerateBtn");
GenerateBtn.addEventListener('click',()=>{
    //if non of the checkbox is selected 
    if(checkCount<=0) return;

    //if password length is less than checkcount
    if(psdLengthV < checkCount){
        psdLengthV = checkCount;
        handleSlider();
    }

    //password generation
    password =  "";

    let functionArray = [];
    
    if(upperCheck.checked) functionArray.push(generateUppercase);
    if(lowerCheck.checked) functionArray.push(generateLowecase);
    if(numberCheck.checked) functionArray.push(generateRndNumber);
    if(symbolCheck.checked) functionArray.push(generateSymbol);

    //compulsory Addition
    for(let i=0; i<functionArray.length; i++) password+=functionArray[i]();

    //Remaining Password
    for(let i=0; i<psdLengthV-functionArray.length; i++)
    {
        let num = getRndInteger(0,functionArray.length);
        password+=functionArray[num]();
    }

    // shuffle the password
    password = shufflepassword(Array.from(password));

    // show password in Ui
    GeneratedPsd.innerText = password;
    calcStrength();
})

function shufflepassword(array)
{
    for(let i=array.length-1; i>0; i--)
    {
        let num = Math.floor(Math.random()*(i+1));
        const temp  = array[i];
        array[i] = array[num];
        array[num] = temp;
    }
    let str = "";
    array.forEach((value)=>str+=value)
    return str;
}