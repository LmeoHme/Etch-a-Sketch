const inputBox = document.querySelector("#input-box");

inputBox.addEventListener("keydown", (() => {
    let noneNumberInputCount = 0;
    let nonePositiveInputCount = 0;
    let outScopeInputCount = 0;
    return e => {
        if (e.key === "Enter")
        {
            [noneNumberInputCount, nonePositiveInputCount, outScopeInputCount] = handleInvalidInput(e.target.value, noneNumberInputCount, nonePositiveInputCount, outScopeInputCount);
        }
        // inputBox.lastElementChild = "";
    };
})());

// Input validation
function isNumber(input)
{
    if (input.trim() === "") return false;
    if (isFinite(input)) return true;
    else return false;
}

function handleInvalidInput(input, noneNumberInputCount, nonePositiveInputCount, outScopeInputCount)
{
    if (!isNumber(input)) return [handleNoneNumberInput(noneNumberInputCount), nonePositiveInputCount, outScopeInputCount];
    else if (input <= 0) return [noneNumberInputCount, handleNonePositiveInput(nonePositiveInputCount), outScopeInputCount];
    else if (input > 100) return [noneNumberInputCount, nonePositiveInputCount, handleOutScopeInput(outScopeInputCount)];
    else return [noneNumberInputCount, nonePositiveInputCount, outScopeInputCount];
}

function handleNoneNumberInput(noneNumberInputCount)
{
    if (noneNumberInputCount === 0)
    {
        unpdateInputBoxTitle("Please enter a number");
        return ++noneNumberInputCount;
    }
    else if (noneNumberInputCount === 1) 
    {
        unpdateInputBoxTitle("NUMBER!");
        return ++noneNumberInputCount;
    }
    else if (noneNumberInputCount === 2) 
    {
        unpdateInputBoxTitle("If you do that 1 more time");
        return ++noneNumberInputCount;
    }
    else 
    {
        unpdateInputBoxTitle("( ,,⩌'︿'⩌ꐦ,,)");
        inputBox.removeChild(inputBox.lastElementChild);
    }
}

function handleNonePositiveInput(nonePositiveInputCount)
{
    if (nonePositiveInputCount === 0)
    {
        unpdateInputBoxTitle("Positive number, please!");
        return ++nonePositiveInputCount;
    }
    else if (nonePositiveInputCount === 1) 
    {
        unpdateInputBoxTitle("P - O - S - I - T - I - V - E");
        return ++nonePositiveInputCount;
    }
    else if (nonePositiveInputCount === 2) 
    {
        unpdateInputBoxTitle("(ꐦ¬_¬)");
        return ++nonePositiveInputCount;
    }
    else 
    {
        unpdateInputBoxTitle("( ,,⩌'︿'⩌ꐦ,,)");
        inputBox.removeChild(inputBox.lastElementChild);
    }
}

function handleOutScopeInput(outScopeInputCount)
{
    if (outScopeInputCount === 0)
    {
        unpdateInputBoxTitle("A number LESS than 100 please!");
        return ++outScopeInputCount;
    }
    else if (outScopeInputCount === 1) 
    {
        unpdateInputBoxTitle("Σ(•᷅‎ࡇ•᷄‎ ᵕ)ꐦ ?");
        return ++outScopeInputCount;
    }
    else if (outScopeInputCount === 2) 
    {
        unpdateInputBoxTitle("To be honest, a reading course is perfect for you");
        return ++outScopeInputCount;
    }
    else 
    {
        unpdateInputBoxTitle("( ,,⩌'︿'⩌ꐦ,,)");
        inputBox.removeChild(inputBox.lastElementChild);
    }
}

function unpdateInputBoxTitle(text)
{
    inputBox.firstElementChild.innerText = text; 
}
