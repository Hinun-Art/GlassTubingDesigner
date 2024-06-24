const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function draw() {
    const tubeDiameter = parseFloat(document.getElementById('tubeDiameter').value);
    const rodDiameter = parseFloat(document.getElementById('rodDiameter').value);
    const extraSpace = parseFloat(document.getElementById('extraSpace').value);

    const outerRadiusTube = tubeDiameter / 2;
    const rodRadius = rodDiameter / 2;

    // Calculate the number of rods that fit around the tube
    const totalRadius = outerRadiusTube + rodRadius;
    const circumference = 2 * Math.PI * totalRadius;
    const nRods = Math.floor(circumference / rodDiameter);

    // Calculate angles between each rod
    const angles = Array.from({length: nRods}, (_, i) => 2 * Math.PI * i / nRods);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the tube
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, outerRadiusTube, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();

    // Draw the rods
    angles.forEach(angle => {
        const x = canvas.width / 2 + totalRadius * Math.cos(angle);
        const y = canvas.height / 2 + totalRadius * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, rodRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';  // Default color for rods
        ctx.fill();
        ctx.stroke();
    });

    // Draw the outer circle with extra space
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, totalRadius + rodRadius + extraSpace, 0, 2 * Math.PI);
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.setLineDash([]);
}

draw();
