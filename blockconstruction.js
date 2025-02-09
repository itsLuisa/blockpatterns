// measurements and ease
// let bustmeasurement = 900;
// let busttolerance = 60;
// let backbodylength = 430;
// let frontcrossshoulder = 370;
// let backcrossshoulder = 380;
// let shoulderwidth = 100;


// execute this when site starts up
document.addEventListener('DOMContentLoaded', function() {
    alert('Page has loaded!');
    constructStandardMeasurements();
});

function constructStandardMeasurements() {
    var bustmeasurement = 900;
    var busttolerance = 60;
    var backbodylength = 430;
    var frontcrossshoulder = 370;
    var backcrossshoulder = 380;
    var shoulderwidth = 100;
    constructBodice(bustmeasurement, busttolerance, backbodylength, frontcrossshoulder, backcrossshoulder, shoulderwidth);
}

function constructCustomMeasurements() {
    var bustmeasurement = parseFloat(document.getElementById("bustmeasurement").value);
    var busttolerance = 60;
    var backbodylength = parseFloat(document.getElementById("backbodylength").value);
    var frontcrossshoulder = 370;
    var backcrossshoulder = 380;
    var shoulderwidth = 115;
    constructBodice(bustmeasurement, busttolerance, backbodylength, frontcrossshoulder, backcrossshoulder, shoulderwidth);
}
// main method
function constructBodice(bustmeasurement, busttolerance, backbodylength, frontcrossshoulder, backcrossshoulder, shoulderwidth) {
    // reference points for constructing the bodice
    var startingpointx = 50;
    var startingpointy = 50;
    // caluclations
    var framewidth = bustmeasurement / 2 + busttolerance / 2;
    var framelength = backbodylength;
    var upperrightframecornerx = startingpointx + framewidth;
    var upperrightframecornery = startingpointy;
    var lowerleftframecornerx = startingpointx;
    var lowerleftframecornery = startingpointy + framelength;
    var lowerrightframecornerx = startingpointx + framewidth;
    var lowerrightframecornery = startingpointy + framelength;
    var verticaldividetopx = framewidth / 2 + startingpointx;
    var verticaldividetopy = startingpointy;
    var verticaldividebottomx = verticaldividetopx;
    var verticaldividebottomy = startingpointy + framelength;
    adjustframe(startingpointx, startingpointy, framewidth, framelength, verticaldividetopx, verticaldividetopy, verticaldividebottomx, verticaldividebottomy);
    var armholedepthy = startingpointy + framewidth / 2 + 10;
    var armholedepthxleft = startingpointx;
    var armholedepthxright = startingpointx + framewidth;
    adjustarmholedepth(armholedepthy, armholedepthxleft, armholedepthxright);
    var snpfrontx = upperrightframecornerx - 77;
    var snpbackx = startingpointx + 79;
    var frontneckpointy = upperrightframecornery + 82;
    var backneckpointy = startingpointy + 25;
    adjustneckopening(startingpointx, startingpointy, upperrightframecornerx, snpfrontx, snpbackx, frontneckpointy, backneckpointy);
    var bustpointx = upperrightframecornerx - 105;
    var bustpointy = startingpointy + 270;
    adjustbustpoint(bustpointx, bustpointy);
    var spfrontx = upperrightframecornerx - (frontcrossshoulder / 2);
    var spfronty = startingpointy + 35;
    var spbackx = startingpointx + (backcrossshoulder / 2);
    var spbacky = startingpointy + 30;
    adjustshoulderpoint(snpfrontx, snpbackx, startingpointx, spfrontx, spfronty, spbackx, spbacky);
    var lengthofbackshoulderslant = Math.sqrt(Math.pow((spbackx - snpbackx), 2) + Math.pow((spbacky - startingpointy), 2));
    console.log(lengthofbackshoulderslant);
    var backshoulderslantunitvectorx = 1 / lengthofbackshoulderslant * (spbackx - snpbackx);
    var backshoulderslantunitvectory = 1 / lengthofbackshoulderslant * (spbacky - startingpointy);
    var backshoulderleftdartpointx = snpbackx + (shoulderwidth / 2) * backshoulderslantunitvectorx;
    var backshoulderleftdartpointy = startingpointy + (shoulderwidth / 2) * backshoulderslantunitvectory;
    var backshouldermiddledartpointx = backshoulderleftdartpointx + 6 * backshoulderslantunitvectorx;
    var backshouldermiddledartpointy = backshoulderleftdartpointy + 6 * backshoulderslantunitvectory;
    var backshoulderrightdartpointx = backshoulderleftdartpointx + 12 * backshoulderslantunitvectorx;
    var backshoulderrightdartpointy = backshoulderleftdartpointy + 12 * backshoulderslantunitvectory;
    var perpendicularbackshoulderslantunitvectorx = - backshoulderslantunitvectory; //(maybe reverse the direction)
    var perpendicularbackshoulderslantunitvectory = backshoulderslantunitvectorx;
    var backshoulderdartpointx = backshouldermiddledartpointx + 90 * perpendicularbackshoulderslantunitvectorx;
    var backshoulderdartpointy = backshouldermiddledartpointy + 90 * perpendicularbackshoulderslantunitvectory;
    // The rest of the shoulder seam needs to be perpendicular to the right dart leg
    var backshoulderrightdartlegx = backshoulderdartpointx - backshoulderrightdartpointx;
    var backshoulderrightdartlegy = backshoulderdartpointy - backshoulderrightdartpointy;
    var backshoulderseamx = backshoulderrightdartlegy;
    var backshoulderseamy = - backshoulderrightdartlegx;
    var lengthbackshoulderseam = Math.sqrt(Math.pow(backshoulderseamx, 2) + Math.pow(backshoulderseamy, 2));
    var backshoulderseamunitvectorx = 1 / lengthbackshoulderseam * backshoulderseamx;
    var backshoulderseamunitvectory = 1/ lengthbackshoulderseam * backshoulderseamy;
    var lengthremainingbackshoulderseam = shoulderwidth / 2;
    var spbacknewx = backshoulderrightdartpointx + lengthremainingbackshoulderseam * backshoulderseamunitvectorx;
    var spbacknewy = backshoulderrightdartpointy + lengthremainingbackshoulderseam * backshoulderseamunitvectory;
    // The length of the entire shoulder seam is: 11.5cm (as calculated above), remaining shoulder seam length = full shoulder seam - existing part of shoulder seam
    // Richtungsvektor für shoulder seam: right dart leg: dartend - rightdartpoint = (159.1,151.466) - (188.38,66.182) perpendicular: ()
    adjustbackshoulderdart(snpbackx, startingpointy, backshoulderleftdartpointx, backshoulderleftdartpointy, backshouldermiddledartpointx, backshouldermiddledartpointy, backshoulderrightdartpointx, backshoulderrightdartpointy, backshoulderdartpointx, backshoulderdartpointy, spbacknewx, spbacknewy);
    var lengthoffrontshoulderslant = Math.sqrt(Math.pow((spfrontx - snpfrontx), 2) + Math.pow((spfronty - startingpointy), 2));
    console.log(lengthoffrontshoulderslant);
    // var frontshouderrightdartpointx = 
    // var frontshouderrightdartpointy =
};

// Step 1: The Frame
function adjustframe(startingpointx, startingpointy, framewidth, framelength, verticaldividetopx, verticaldividetopy, verticaldividebottomx, verticaldividebottomy) {
    var frame = document.getElementById("frame");
    frame.setAttribute("x", startingpointx);
    frame.setAttribute("y", startingpointy);
    frame.setAttribute("width", framewidth);
    frame.setAttribute("height", framelength);
    var verticaldivide = document.getElementById("verticaldivideintofrontandback");
    verticaldivide.setAttribute("x1", verticaldividetopx);
    verticaldivide.setAttribute("x2", verticaldividebottomx);
    verticaldivide.setAttribute("y1", verticaldividetopy);
    verticaldivide.setAttribute("y2", verticaldividebottomy);
};

// Step 2: Depth of armhole
function adjustarmholedepth(armholedepthy, armholedepthxleft, armholedepthxright) {
    var armholedepth = document.getElementById("depthofarmholes");
    armholedepth.setAttribute("x1", armholedepthxleft);
    armholedepth.setAttribute("x2", armholedepthxright);
    armholedepth.setAttribute("y1", armholedepthy);
    armholedepth.setAttribute("y2", armholedepthy);
};

// Step 3: Neck Opening
function adjustneckopening(startingpointx, startingpointy, upperrightframecornerx, snpfrontx, snpbackx, frontneckpointy, backneckpointy) {
    var controlpointfrontx = snpfrontx;
    var controlpointfronty = frontneckpointy;
    var controlpointbackx = snpbackx;
    var controlpointbacky = backneckpointy;
    var snpfront = document.getElementById("SNPfront");
    var snpback = document.getElementById("SNPback");
    snpfront.setAttribute("cx", snpfrontx);
    snpfront.setAttribute("cy", startingpointy);
    snpback.setAttribute("cx", snpbackx);
    snpback.setAttribute("cy", startingpointy);
    var necklinefront = document.getElementById("frontneckline");
    var necklineback = document.getElementById("backneckline");
    necklinefront.setAttribute("d", "M " + upperrightframecornerx + " " + frontneckpointy + " Q " + controlpointfrontx + " " + controlpointfronty + " " + snpfrontx + " " + startingpointy);
    necklineback.setAttribute("d", "M " + startingpointx + " " + backneckpointy + " Q " + controlpointbackx + " " + controlpointbacky + " " + snpbackx + " " + startingpointy);
};

// Step 4: Bust Point
function adjustbustpoint(bustpointx, bustpointy) {
    var bustpoint = document.getElementById("BP");
    bustpoint.setAttribute("cx", bustpointx);
    bustpoint.setAttribute("cy", bustpointy);
};

// Step 5: Shoulder Point
function adjustshoulderpoint(snpfrontx, snpbackx, startingpointy, spfrontx, spfronty, spbackx, spbacky) {
    var spfront = document.getElementById("SPfront");
    var spback = document.getElementById("SPback");
    var shoulderslantfront = document.getElementById("frontshoulderslant");
    var shoulderslantback = document.getElementById("backshoulderslant");
    spfront.setAttribute("cx", spfrontx);
    spfront.setAttribute("cy", spfronty);
    spback.setAttribute("cx", spbackx);
    spback.setAttribute("cy", spbacky);
    shoulderslantfront.setAttribute("x1", snpfrontx);
    shoulderslantfront.setAttribute("y1", startingpointy);
    shoulderslantfront.setAttribute("x2", spfrontx);
    shoulderslantfront.setAttribute("y2", spfronty);
    shoulderslantback.setAttribute("x1", snpbackx);
    shoulderslantback.setAttribute("y1", startingpointy);
    shoulderslantback.setAttribute("x2", spbackx);
    shoulderslantback.setAttribute("y2", spbacky);
};

// Step 6: Back Shoulder Dart
function adjustbackshoulderdart(snpbackx, snpbacky, leftdartpointx, leftdartpointy, middledartpointx, middledartpointy, rightdartpointx, rightdartpointy, dartpointx, dartpointy, spbacknewx, spbacknewy) {
    var leftdartpoint = document.getElementById("backshoulderleftdartpoint");
    var middledartpoint = document.getElementById("backshouldermiddledartpoint");
    var rightdartpoint = document.getElementById("backshoulderrightdartpoint");
    var dartpoint = document.getElementById("backshoulderdartpoint");
    var fullbackshoulderseam = document.getElementById("backshoulderseamwithdart");
    var spback = document.getElementById("SPback");
    leftdartpoint.setAttribute("cx", leftdartpointx);
    leftdartpoint.setAttribute("cy", leftdartpointy);
    middledartpoint.setAttribute("cx", middledartpointx);
    middledartpoint.setAttribute("cy", middledartpointy);
    rightdartpoint.setAttribute("cx", rightdartpointx);
    rightdartpoint.setAttribute("cy", rightdartpointy);
    dartpoint.setAttribute("cx", dartpointx);
    dartpoint.setAttribute("cy", dartpointy);
    spback.setAttribute("cx", spbacknewx);
    spback.setAttribute("cy", spbacknewy);
    fullbackshoulderseam.setAttribute("d", "M " + snpbackx + " " + snpbacky + " L " + leftdartpointx + " " + leftdartpointy + " L " + dartpointx + " " + dartpointy + " L " + rightdartpointx + " " + rightdartpointy + " L " + spbacknewx + " " + spbacknewy);
};

// Step 7: Front Shoulder Dart
function adjustfrontshoulderdart() {
    var xx;
};

// Function to extract and download SVG (written by MS Copilot)
function downloadSVG(svgElementId, filename) {
    // Get the SVG element by its ID
    const svgElement = document.getElementById(svgElementId);
    
    if (!svgElement) {
        console.error('SVG element not found');
        return;
    };

    // Serialize the SVG element to a string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    // Create a Blob from the SVG string
    const blob = new Blob([svgString], { type: 'image/svg+xml' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link
    document.body.removeChild(link);
};

// this function doesn't work:
async function downloadSVGAsPDF(svgElementId, filename) {
    const svgElement = document.getElementById(svgElementId);
    // Get the dimensions of the SVG in millimeters
    const widthMm = svgElement.viewBox.baseVal.width;
    const heightMm = svgElement.viewBox.baseVal.height;

    // Convert millimeters to points (1 mm = 2.83465 points)
    const widthPt = widthMm * 2.83465;
    const heightPt = heightMm * 2.83465;

    // Create a new PDF document
    const { PDFDocument } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([widthPt, heightPt]);

    // Convert SVG to PDF
    svg2pdf(svgElement, page, {
        xOffset: 0,
        yOffset: 0,
        scale: 1
    });

    // Serialize the PDF document to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Create a blob from the PDF bytes
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
};