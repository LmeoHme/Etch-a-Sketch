const inputBox = document.querySelector("#input-box");
const inputBoxTitle = inputBox.firstElementChild.firstElementChild; 
const inputArea = inputBox.lastElementChild;

const grid = document.querySelector("#grid");
const gridTitle = grid.firstElementChild;
const gridContainer = grid.lastElementChild;

toggleGridOff()

// (() => {inputBox.classList.toggle("hidden");document.body.setAttribute("style", "height: auto");})();

inputBox.addEventListener("keydown", (() => {
    const invalidInputCounts = [
        {name: "noneNumberInputCount", value: 0},
        {name: "noneIntegerInputCount", value: 0},
        {name: "nonePositiveInputCount", value: 0},
        {name: "outScopeInputCount", value: 0}
    ];
    let validInput;
    return e => {
        if (e.key === "Enter")
        {
            validInput = handleInput(e.target.value, invalidInputCounts);
            inputArea.value = "";
            if (validInput !== undefined) handleGrid(validInput);
        }
    };
})());



// Functions
function toggleGridOff()
{
    grid.classList.toggle("hidden");
    document.body.setAttribute("style", "height: 100vh");
}

function toggleGridOn()
{
    grid.classList.toggle("hidden");
    document.body.setAttribute("style", "height: auto");
}

//#region -- Input validation
function isNumber(input)
{
    if (input.trim() === "") return false;
    if (isFinite(input)) return true;
    else return false;
}

function handleInput(input, invalidInputCounts)
{
    if (!isNumber(input)) handleNoneNumberInput(invalidInputCounts[0].value, invalidInputCounts);
    else if (!Number.isInteger(+input)) handleNoneIntegerInput(invalidInputCounts[1].value, invalidInputCounts);
    else 
        {
            if (input <= 0) handleNonePositiveInput(invalidInputCounts[2].value, invalidInputCounts);
            else if (input > 100) handleOutScopeInput(invalidInputCounts[3].value, invalidInputCounts);
            else return input;
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

    // Update Titles
function unpdateInputBoxTitle(text)
{
    inputBoxTitle.innerText = text; 
}

function unpdateGridTitle(text)
{
    gridTitle.innerText = text;
}

//#region -- Grid Logics
function handleGrid(quantity)
{
    inputBox.remove();
    toggleGridOn();
    drawGrid(quantity);
    unpdateGridTitle(`A ${quantity} x ${quantity} grid`);
}

    // -- Grid Drawing
function calculateSquareSide(quantity)
{
    let width = 0;
    let height = 0;

    let gap = parseInt(getComputedStyle(gridContainer).getPropertyValue("gap"));
    let containerWidth = parseInt(getComputedStyle(gridContainer).width);
    let containerHeight = parseInt(getComputedStyle(gridContainer).height);
    
// The width of the container (excluding padding) equal to the width of all squares 
// in 1 single line + the gaps between them:
// Container sides = quantity * single square sides + (quantity - 1) * gaps
// ==>

    width = ((containerWidth + gap) / quantity) - gap;
    height = ((containerHeight + gap) / quantity) - gap;

    return [width, height];
}

function drawSquare(width, height)
{
    const square = document.createElement("div");
    square.setAttribute(
        "style", 
        `width: ${width}px;
        height: ${height}px`
    );
    gridContainer.appendChild(square);
}

function drawGrid(quantity)
{
    const squareSide = calculateSquareSide(quantity);
    for (let i = 0; i < quantity; i++)
    {
        for (let j = 0; j < quantity; j++)
        {
            drawSquare(...squareSide);
        }
    }
}

// -- Change Squares Color
gridContainer.addEventListener("mouseover", e =>{
    if (e.target && e.target.nodeName === "DIV")
    {
        e.stopPropagation();
        changeSquaresColor(e);
    }
});

function getRandomRGB()
{
    return Math.floor(Math.random() * 255 + 1);
}

function changeSquaresColor(e)
{
    if (e.target.style.opacity === "0") return;
    e.target.style.backgroundColor = `rgb(${getRandomRGB()}, ${getRandomRGB()}, ${getRandomRGB()})`;
    changeSquareOpacity(e);
}

function changeSquareOpacity(e)
{
    if (!e.target.dataset.listenerAttached)
    {
        e.target.addEventListener("mouseenter", (() =>{
            let interactTime = 0;
            return e => {
                if (interactTime > 10) return;
                interactTime = decreaseOpacity(e, interactTime);
            };
        })());
        e.target.dataset.listenerAttached = true;
    }
}

function decreaseOpacity(e, interactTime)
{
    e.target.style.opacity = (100 - interactTime * 10) / 100;
    return ++interactTime;
}
//#endregion
