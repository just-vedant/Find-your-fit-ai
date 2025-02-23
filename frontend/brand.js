// Size Chart Data
const sizeCharts = {
    brandA: [
        { min: 80, max: 90, size: "S" },
        { min: 91, max: 100, size: "M" },
        { min: 101, max: 110, size: "L" },
        { min: 111, max: 120, size: "XL" }
    ],
    brandB: [
        { min: 75, max: 85, size: "S" },
        { min: 86, max: 95, size: "M" },
        { min: 96, max: 105, size: "L" },
        { min: 106, max: 115, size: "XL" }
    ],
    brandC: [
        { min: 85, max: 95, size: "S" },
        { min: 96, max: 105, size: "M" },
        { min: 106, max: 115, size: "L" },
        { min: 116, max: 125, size: "XL" }
    ]
};

// Function to Get Size
function getSize() {
    const brand = document.getElementById("brand").value;
    const chest = parseInt(document.getElementById("chest").value);
    const result = document.getElementById("result");

    if (!brand || !chest) {
        result.textContent = "Please select a brand and enter chest measurement.";
        return;
    }

    const chart = sizeCharts[brand];
    const matchedSize = chart.find(range => chest >= range.min && chest <= range.max);

    if (matchedSize) {
        result.textContent = `Recommended Size: ${matchedSize.size}`;
    } else {
        result.textContent = "Size not available for this measurement.";
    }
}
