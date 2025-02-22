const classifyBtn = document.getElementById("classifyBtn");
const resultText = document.getElementById("resultText");
const imageInput = document.getElementById("imageInput");
const previewImg = document.getElementById("previewImg");

// Image Preview Functionality
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            previewImg.src = reader.result;
            previewImg.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        previewImg.style.display = "none";
    }
});

// Classification Request
classifyBtn.addEventListener("click", async () => {
    if (!imageInput.files[0]) {
        alert("Please upload an image.");
        return;
    }

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];

        // Show loading indicator
        resultText.textContent = "Classifying...";

        try {
            const response = await axios.post(
                "https://classify.roboflow.com/bodymeasure-sotdp/5",
                base64Image,
                {
                    params: {
                        api_key: "FOVqU1kUZceEXXU1IIfS"
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            // Extract predictions from the response
            const predictions = response.data.predictions;
            let sortedPredictions = [];

            // Store predictions in an array and sort by confidence
            for (const [key, value] of Object.entries(predictions)) {
                sortedPredictions.push({
                    className: key,
                    confidence: value.confidence
                });
            }

            sortedPredictions.sort((a, b) => b.confidence - a.confidence);

            // Get the top two predictions
            const topPrediction = sortedPredictions[0];
            const secondBest = sortedPredictions[1];

            // If top prediction is 'woman' or 'man', use the second best
            if (topPrediction.className === "woman" || topPrediction.className === "man") {
                resultText.textContent = `Prediction: ${secondBest.className} (${(secondBest.confidence * 100).toFixed(2)}% confidence)`;
            } else {
                resultText.textContent = `Prediction: ${topPrediction.className} (${(topPrediction.confidence * 100).toFixed(2)}% confidence)`;
            }
            localStorage.setItem("bodyType", resultText.textContent);

        } catch (error) {
            resultText.textContent = `Error: ${error.message}`;
        }
    };

    reader.readAsDataURL(file);
});

document.addEventListener("DOMContentLoaded", () => {
    const savedBodyType = localStorage.getItem("bodyType");
    if (savedBodyType) {
        resultText.textContent = `Previous Prediction: ${savedBodyType}`;
    }
});

