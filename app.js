const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function draw() {
    const tubeDiameter = parseFloat(document.getElementById('tubeDiameter').value);
    const rodDiameter = parseFloat(document.getElementById('rodDiameter').value);
    const extraSpace = parseFloat(document.getElementById('extraSpace').value);
    const numRods = parseInt(document.getElementById('numRods').value);

    const outerRadiusTube = tubeDiameter / 2;
    const rodRadius = rodDiameter / 2;

    // Calculate the number of rods that fit around the tube
    const totalRadius = outerRadiusTube + rodRadius;
    const circumference = 2 * Math.PI * totalRadius;
    const optimalRods = Math.floor(circumference / rodDiameter);

    // Calculate angles between each rod
    const angles = Array.from({ length: numRods }, (_, i) => 2 * Math.PI * i / numRods);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the scale factor to fit the drawing within the canvas
    const scaleFactor = (canvas.width / 2) / (totalRadius + rodRadius + extraSpace);

    // Draw the tube
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, outerRadiusTube * scaleFactor, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();

    // Draw the rods
    angles.forEach(angle => {
        const x = canvas.width / 2 + totalRadius * scaleFactor * Math.cos(angle);
        const y = canvas.height / 2 + totalRadius * scaleFactor * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, rodRadius * scaleFactor, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';  // Default color for rods
        ctx.fill();
        ctx.stroke();
    });

    // Calculate and display overall diameter of the assembly
    const overallDiameter = (totalRadius + rodRadius + extraSpace) * 2;
    document.getElementById('overallDiameter').innerText = overallDiameter.toFixed(2);

    // Calculate and display gap/overlap
    const exactCircumference = rodDiameter * numRods;
    const gapOverlap = circumference - exactCircumference;
    document.getElementById('gapOverlap').innerText = gapOverlap.toFixed(2);

    // Draw the outer circle with extra space
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (totalRadius + rodRadius + extraSpace) * scaleFactor, 0, 2 * Math.PI);
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.setLineDash([]);

    // Display a warning if there is an overlap
    if (gapOverlap < 0) {
        alert('Warning: The rods are overlapping!');
    }
}

draw();
