let numberOfSquares = 16;
let canvasColor = 'rgb(114, 159, 207)';  
let squareDiv, sensingPressure, tileNodeList, newGridButton, colorValues, drawingColor;
let colorMode = 'rainbow'; 
let isSolidColor = 'no';

const tableDiv = document.createElement('div');
tableDiv.setAttribute('id', 'table-container');
document.body.append(tableDiv);

const buttonContainer = document.createElement('div');
buttonContainer.setAttribute('id', 'button-container');
tableDiv.append(buttonContainer);


createGrid(numberOfSquares);

createButtonGrid(numberOfSquares);


const canvasColorSelector = document.createElement('input');
canvasColorSelector.setAttribute('type', 'color');
canvasColorSelector.setAttribute('value', '#729fcf');
canvasColorSelector.setAttribute('id', 'canvas-color-picker'); 

const buttonPlusColorPickerContainer = document.createElement('div');
buttonPlusColorPickerContainer.setAttribute('id', 'button-plus-picker-container');

const blackeningButton = document.createElement('img');
blackeningButton.src = 'Assets/Images/fade-to-black.png';
const drawingColorSelector = document.createElement('input');
drawingColorSelector.setAttribute('type', 'color');
drawingColorSelector.setAttribute('id', 'drawing-color-picker'); 

const rainbowButton = document.createElement('img');
rainbowButton.src = 'Assets/Images/rainbow-3.png';







const tableContainer = document.querySelector('#table-container');


rainbowButton.setAttribute('id', 'rainbow-button');
blackeningButton.setAttribute('id', 'blackening-button');

buttonContainer.append(canvasColorSelector);

buttonPlusColorPickerContainer.append(blackeningButton);
buttonPlusColorPickerContainer.append(drawingColorSelector);

buttonContainer.append(buttonPlusColorPickerContainer);

buttonContainer.append(rainbowButton);

const logo = document.createElement('header');
logo.textContent = 'Lock-A-Block';
document.body.append(logo);





canvasColorSelector.addEventListener('input', changeCanvasColor);
drawingColorSelector.addEventListener('input', () =>
{
    drawingColor = document.querySelector('#drawing-color-picker').value;                         
    isSolidColor = 'yes';
});

const buttonBlackening = document.getElementById('blackening-button');
const buttonRainbow = document.getElementById('rainbow-button');

buttonRainbow.style.cssText = 'filter: drop-shadow(5px 5px 20px rgb(114, 159, 207));';

buttonBlackening.addEventListener('click', () => 
{
    colorMode = 'blackening';
    isSolidColor = 'no';
    buttonBlackening.style.cssText = 'filter: drop-shadow(5px 5px 10px snow);';
    buttonRainbow.style.cssText = 'filter: drop-shadow(0));';
});

buttonRainbow.addEventListener('click', () => 
{
    colorMode = 'rainbow';
    isSolidColor = 'no';
    buttonRainbow.style.cssText = 'filter: drop-shadow(10px 10px 10px rgb(114, 159, 207));';
    buttonBlackening.style.cssText = 'box-shadow: 0';
});










function createGrid(numberOfSquares)
{
    const gridDiv = document.createElement('div');
    gridDiv.setAttribute('id', 'grid-container');
    
    tableDiv.append(gridDiv);

    for (let i = 0; i < numberOfSquares; i++)
    {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        rowDiv.setAttribute('id', `row-${i + 1}`);
        
        for (let j = 0; j < numberOfSquares; j++)
        {
            squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            squareDiv.setAttribute('id', `square-${i + 1},${j + 1}`);
            squareDiv.style.backgroundColor = canvasColor;
            rowDiv.append(squareDiv);
        }

        gridDiv.append(rowDiv);
    }

    tileNodeList = document.querySelectorAll('.square');

    tileNodeList.forEach( (tile) => 
    {

        tile.addEventListener('mousedown', (e) => sensingPressure = true);
        
        tile.addEventListener('mousemove', (e) =>                                 //MOUSEMOVE EVENT
        {
            if (sensingPressure)
            {
               
                let colorValues = [123, 123, 123]; // RANDOMLY SELF-CHOSEN INITIAL COLOR
                
                
                if (isSolidColor == 'yes') colorValues = hexToRGB(drawingColor, colorValues);
                
                if (isSolidColor === 'no') 
                {
                    colorValues = tile.style.backgroundColor.match(/\d+/g);

                    if (colorMode === 'rainbow') changeToRandomColor(colorValues);
                    else if (colorMode === 'blackening') tenPercentBlacker(colorValues);
                }

                
                e.target.style.backgroundColor = `rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]}`;
            }
        });

        tile.addEventListener('mouseup', (e) => sensingPressure = false);
    

    });
 
}


function changeCanvasColor()
{
    let fetchedCanvasColor = document.querySelector('input').value;
    tileNodeList.forEach( (tile) =>
    {
        tile.style.backgroundColor = fetchedCanvasColor;
    });

    canvasColor = fetchedCanvasColor;
    
}

function changeToRandomColor(rgbArray)
{
    for (let i = 0; i < 3; i++)
    {
        rgbArray[i] = Math.floor(Math.random() * 256);
    }
}

function tenPercentBlacker(colorValues)
{

    for (let i = 0; i < 3; i++)
    {
        colorValues[i] -= 255 / 10;
    }

    return colorValues;
}

function createButtonGrid(numberOfSquares)
{
    const buttonGridDiv = document.createElement('div');
    buttonGridDiv.setAttribute('id', 'grid-button-div');

    buttonGridDiv.addEventListener('click', () => 
    {
        
        customNumberOfSquares = prompt('How many squares do you want per side?', numberOfSquares);
        
        while ( !(customNumberOfSquares > 0 || customNumberOfSquares <= 100) );
        {
            if (customNumberOfSquares <= 0) customNumberOfSquares = prompt(`Your number is negative. Please enter a number that's positive`);
            else if (customNumberOfSquares > 100) customNumberOfSquares = prompt('Too much! Please enter a number at most 100');
        } 
        

        numberOfSquares = customNumberOfSquares;
        createGrid(numberOfSquares);
        createButtonGrid(numberOfSquares);
        
        const buttonGridNode = document.getElementById('grid-button-div');
        const tableNode = document.getElementById('table-container');
        const gridNode = document.getElementById('grid-container');
        const buttonContainerNode = document.getElementById('button-container');

        tableNode.removeChild(gridNode);
        tableNode.removeChild(buttonGridNode);
        
    
    });
    
    
    for (let i = 0; i < numberOfSquares; i++)
    {
        const buttonRowDiv = document.createElement('div');
        buttonRowDiv.classList.add('button-row');
        buttonRowDiv.setAttribute('id', `button-row-${i + 1}`);
        
        for (let j = 0; j < numberOfSquares; j++)
        {
            buttonSquareDiv = document.createElement('div');
            buttonSquareDiv.classList.add('button-square');
            buttonSquareDiv.setAttribute('id', `square-${i + 1},${j + 1}`);
            buttonSquareDiv.style.backgroundColor = 'gray';
            buttonRowDiv.append(buttonSquareDiv);
        }

        buttonGridDiv.append(buttonRowDiv);
    }

    tableDiv.append(buttonGridDiv);
}

function hexToRGB(hex, rgbArray) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(result){
        rgbArray[0] = parseInt(result[1], 16);
        rgbArray[1] = parseInt(result[2], 16);
        rgbArray[2] = parseInt(result[3], 16);
        
    } 
    return rgbArray;
  }









