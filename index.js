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
        {name: "nonNumberInputCount", value: 0},
        {name: "nonIntegerInputCount", value: 0},
        {name: "nonPositiveInputCount", value: 0},
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
    if (!isNumber(input)) handleNonNumberInput(invalidInputCounts[0].value, invalidInputCounts);
    else if (!Number.isInteger(+input)) handleNonIntegerInput(invalidInputCounts[1].value, invalidInputCounts);
    else 
        {
            let forcedInput;
            if (input <= 0) 
            {
                forcedInput = handlenonPositiveInput(invalidInputCounts[2].value, invalidInputCounts);
                if (forcedInput === "forced") handleGrid(input);
            }
            else if (input > 100) 
            {
                forcedInput = handleOutScopeInput(invalidInputCounts[3].value, invalidInputCounts);
                if (forcedInput === "forced") handleGrid(input);
            }
            else return input;
        }   
}

function handleNonNumberInput(nonNumberInputCount, invalidInputCounts)
{
    if (nonNumberInputCount === 0)
    {
        unpdateInputBoxTitle("Please enter a number");
        invalidInputCounts[0].value = ++nonNumberInputCount;
    }
    else if (nonNumberInputCount === 1) 
    {
        unpdateInputBoxTitle("NUMBER!");
        invalidInputCounts[0].value = ++nonNumberInputCount;
    }
    else if (nonNumberInputCount === 2) 
    {
        unpdateInputBoxTitle("If you do that 1 more time");
        invalidInputCounts[0].value = ++nonNumberInputCount;
    }
    else 
    {
        unpdateInputBoxTitle("( ,,⩌'︿'⩌ꐦ,,)");
        inputBox.removeChild(inputBox.lastElementChild);
    }
}

function handleNonIntegerInput(nonIntegerInputCount, invalidInputCounts)
{
    if (nonIntegerInputCount === 0)
    {
        unpdateInputBoxTitle("If you confused, an integer is number without decimal");
        invalidInputCounts[1].value = ++nonIntegerInputCount;
    }
    else if (nonIntegerInputCount === 1) 
    {
        unpdateInputBoxTitle("May be your problem is not knowledge");
        invalidInputCounts[1].value = ++nonIntegerInputCount;
    }
    else if (nonIntegerInputCount === 2) 
    {
        unpdateInputBoxTitle("To be honest, a reading course is perfect for you");
        inputBox.removeChild(inputBox.lastElementChild);
    }
}

// Need update from here !!

function handlenonPositiveInput(nonPositiveInputCount, invalidInputCounts)
{
    if (nonPositiveInputCount === 0)
    {
        unpdateInputBoxTitle("Positive number, please!");
        invalidInputCounts[2].value = ++nonPositiveInputCount;
    }
    else if (nonPositiveInputCount === 1) 
    {
        unpdateInputBoxTitle("P - O - S - I - T - I - V - E");
        invalidInputCounts[2].value = ++nonPositiveInputCount;
    }
    else if (nonPositiveInputCount === 2) 
    {
        unpdateInputBoxTitle("ヽ(#`Д´)ﾉ");
        invalidInputCounts[2].value = ++nonPositiveInputCount;
    }
    else 
    {
        return "forced";
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
        unpdateInputBoxTitle("Well! At least I try");
        invalidInputCounts[3].value = ++outScopeInputCount;
    }
    else 
    {
        return "forced";
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
    if (quantity <= 0) unpdateGridTitle(`A ${parseInt(quantity)} x ${parseInt(quantity)} grid as you wish!`);
    else if (quantity > 100) unpdateGridTitle("𓁹‿𓁹");
    else unpdateGridTitle(`A ${parseInt(quantity)} x ${parseInt(quantity)} grid`);
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

    // -- Change Squares Opacity
function changeSquareOpacity(e)
{
    if (!e.target.dataset.listenerAttached)
    {

// Add Event Listener to every specific div instead of delegation because i want every child have
// their own counter varibale, which means you need 10 iteractions for each child div to make it 
// completely fade

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
