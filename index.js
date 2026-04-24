const inputBox = document.querySelector("#input-box");
const inputBoxTitle = inputBox.firstElementChild.firstElementChild; 

inputBox.addEventListener("keydown", (() => {
    const invalidInputCounts = [
        {name: "noneNumberInputCount", value: 0},        
        {name: "noneIntegerInputCount", value: 0},        
        {name: "nonePositiveInputCount", value: 0},        
        {name: "outScopeInputCount", value: 0}        
    ];
    return e => {
        if (e.key === "Enter")
        {
            handleInvalidInput(e.target.value, invalidInputCounts);
        }
        // inputBox.lastElementChild = "";
    };
})());

//#region -- Input validation
function isNumber(input)
{
    if (input.trim() === "") return false;
    if (isFinite(input)) return true;
    else return false;
}

function handleInvalidInput(input, invalidInputCounts)
{
    if (!isNumber(input)) handleNoneNumberInput(invalidInputCounts[0].value, invalidInputCounts);
    else if (!Number.isInteger(+input)) handleNoneIntegerInput(invalidInputCounts[1].value, invalidInputCounts);
    else 
        {
            if (input <= 0) handleNonePositiveInput(invalidInputCounts[2].value, invalidInputCounts);
            else if (input > 100) handleOutScopeInput(invalidInputCounts[3].value, invalidInputCounts);
            else return;
        }   
}

function handleNoneNumberInput(noneNumberInputCount, invalidInputCounts)
{
    if (noneNumberInputCount === 0)
    {
        unpdateInputBoxTitle("Please enter a number");
        invalidInputCounts[0].value = ++noneNumberInputCount;
    }
    else if (noneNumberInputCount === 1) 
    {
        unpdateInputBoxTitle("NUMBER!");
        invalidInputCounts[0].value = ++noneNumberInputCount;
    }
    else if (noneNumberInputCount === 2) 
    {
        unpdateInputBoxTitle("If you do that 1 more time");
        invalidInputCounts[0].value = ++noneNumberInputCount;
    }
    else 
    {
        unpdateInputBoxTitle("( ,,⩌'︿'⩌ꐦ,,)");
        inputBox.removeChild(inputBox.lastElementChild);
    }
}

function handleNoneIntegerInput(noneIntegerInputCount, invalidInputCounts)
{
    if (noneIntegerInputCount === 0)
    {
        unpdateInputBoxTitle("If you confused, an integer is number without decimal");
        invalidInputCounts[1].value = ++noneIntegerInputCount;
    }
    else if (noneIntegerInputCount === 1) 
    {
        unpdateInputBoxTitle("May be your problem is not knowledge");
        invalidInputCounts[1].value = ++noneIntegerInputCount;
    }
    else if (noneIntegerInputCount === 2) 
    {
        unpdateInputBoxTitle("(ꐦ • ᴗ •)");
        invalidInputCounts[1].value = ++noneIntegerInputCount;
    }
    else 
    {
        unpdateInputBoxTitle("( ,,⩌'︿'⩌ꐦ,,)");
        inputBox.removeChild(inputBox.lastElementChild);
    }
}

function handleNonePositiveInput(nonePositiveInputCount, invalidInputCounts)
{
    if (nonePositiveInputCount === 0)
    {
        unpdateInputBoxTitle("Positive number, please!");
        invalidInputCounts[2].value = ++nonePositiveInputCount;
    }
    else if (nonePositiveInputCount === 1) 
    {
        unpdateInputBoxTitle("P - O - S - I - T - I - V - E");
        invalidInputCounts[2].value = ++nonePositiveInputCount;
    }
    else if (nonePositiveInputCount === 2) 
    {
        unpdateInputBoxTitle("ヽ(#`Д´)ﾉ");
        invalidInputCounts[2].value = ++nonePositiveInputCount;
    }
    else 
    {
        unpdateInputBoxTitle("( ,,⩌'︿'⩌ꐦ,,)");
        inputBox.removeChild(inputBox.lastElementChild);
    }
}

function handleOutScopeInput(outScopeInputCount, invalidInputCounts)
{
    if (outScopeInputCount === 0)
    {
        unpdateInputBoxTitle("A number LESS than 100 please!");
        invalidInputCounts[3].value = ++outScopeInputCount;
    }
    else if (outScopeInputCount === 1) 
    {
        unpdateInputBoxTitle("Σ(•᷅‎ࡇ•᷄‎ ᵕ)ꐦ ?");
        invalidInputCounts[3].value = ++outScopeInputCount;
    }
    else if (outScopeInputCount === 2) 
    {
        unpdateInputBoxTitle("To be honest, a reading course is perfect for you");
        invalidInputCounts[3].value = ++outScopeInputCount;
    }
    else 
    {
        unpdateInputBoxTitle("( ,,⩌'︿'⩌ꐦ,,)");
        inputBox.removeChild(inputBox.lastElementChild);
    }
}
//#endregion 

function unpdateInputBoxTitle(text)
{
    inputBoxTitle.innerText = text; 
}
