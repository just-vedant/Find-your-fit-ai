scriptc.js
function getStyleSuggestion() {
    const color = document.getElementById("colorSelect").value;
    const suggestionBox = document.getElementById("suggestion");
    const imageContainer = document.getElementById("imageContainer");
    const colorPalette = document.getElementById("colorPalette");

    // Clothing Suggestions Based on Color
    const suggestions = {
        white: "Classic white shirts, flowy dresses, and minimalistic outfits.",
        yellow: "Bright summer dresses, yellow blazers, and casual t-shirts.",
        pink: "Soft pastel tops, cute skirts, and elegant evening gowns.",
        orange: "Bold sweaters, stylish jackets, and sporty wear.",
        green: "Earthy tones, formal suits, and casual hoodies.",
        blue: "Denim jackets, blue dresses, and formal suits.",
        purple: "Royal evening gowns, chic tops, and accessories.",
        red: "Bold red dresses, statement blazers, and casual t-shirts.",
        brown: "Rustic coats, leather jackets, and comfy sweaters.",
        black: "Timeless black suits, little black dresses, and streetwear."
    };

    // Matching Color Palettes
    const colorPalettes = {
        white: ["#FFFFFF", "#E0E0E0", "#C0C0C0", "#A0A0A0"],
        yellow: ["#FFD700", "#FFECB3", "#FFA000", "#FFF8E1"],
        pink: ["#FFC0CB", "#FF69B4", "#E91E63", "#F48FB1"],
        orange: ["#FFA500", "#FF7043", "#FFAB91", "#FFD180"],
        green: ["#008000", "#4CAF50", "#81C784", "#C8E6C9"],
        blue: ["#0000FF", "#1E88E5", "#64B5F6", "#BBDEFB"],
        purple: ["#800080", "#9C27B0", "#BA68C8", "#CE93D8"],
        red: ["#FF0000", "#E53935", "#D32F2F", "#FFCDD2"],
        brown: ["#8B4513", "#A1887F", "#795548", "#D7CCC8"],
        black: ["#000000", "#424242", "#616161", "#9E9E9E"]
    };

    if (color) {
        // Display suggestion
        suggestionBox.innerHTML = `<p><strong>Suggested Clothing:</strong> ${suggestions[color]}</p>`;

        // Display color palette
        colorPalette.innerHTML = `<p><strong>Matching Color Palette:</strong></p>`;
        colorPalettes[color].forEach(hex => {
            let colorBox = document.createElement("div");
            colorBox.style.backgroundColor = hex;
            colorBox.style.width = "50px";
            colorBox.style.height = "50px";
            colorBox.style.display = "inline-block";
            colorBox.style.margin = "5px";
            colorPalette.appendChild(colorBox);
        });

       
    } else {
        suggestionBox.innerHTML = "<p>Please select a color.</p>";
        colorPalette.innerHTML = "";
        imageContainer.innerHTML = "";
    }
}

// Function to get clothing suggestions based on gender and body type
function getBodyTypeSuggestion() {
    const genderSelect = document.getElementById("genderSelect");
    const bodyTypeSelect = document.getElementById("bodyTypeSelect");
    const selectedGender = genderSelect.value;
    const selectedBodyType = bodyTypeSelect.value;
    const bodySuggestionDiv = document.getElementById("bodySuggestion");

    if (!selectedGender || !selectedBodyType) {
        bodySuggestionDiv.innerHTML = "Please select both gender and body type!";
        return;
    }

    const bodyTypeSuggestions = {
        male: {
            ectomorph: `
                ✅ Best Clothes: Layered outfits, structured jackets, wide-leg pants, textured fabrics.<br>
                🚫 Avoid: Overly baggy clothes, vertical stripes, skinny jeans.
            `,
            endomorph: `
                ✅ Best Clothes: Darker colors, structured blazers, high-rise trousers.<br>
                🚫 Avoid: Tight T-shirts, baggy pants, bulky layers.
            `,
            hourglass: `
                ✅ Best Clothes: Tailored suits, fitted shirts, balanced silhouettes.<br>
                🚫 Avoid: Loose, oversized clothing.
            `,
            inverted_triangle: `
                ✅ Best Clothes: Slim-fit trousers, V-neck shirts, unstructured jackets.<br>
                🚫 Avoid: Shoulder pads, tight skinny jeans.
            `,
            mesomorph: `
                ✅ Best Clothes: Slim-fit shirts, athletic wear, structured blazers.<br>
                🚫 Avoid: Overly loose or boxy outfits.
            `,
            oval: `
                ✅ Best Clothes: Vertical stripes, dark colors, V-neck sweaters.<br>
                🚫 Avoid: Tight belts, large prints, horizontal stripes.
            `,
            rectangle: `
                ✅ Best Clothes: Layered outfits, belted coats, contrasting tops and bottoms.<br>
                🚫 Avoid: Straight, shapeless outfits.
            `,
            trapezoid: `
                ✅ Best Clothes: Fitted shirts, tapered trousers, casual blazers.<br>
                🚫 Avoid: Oversized, baggy clothes.
            `,
            triangle: `
                ✅ Best Clothes: Darker pants, structured jackets, fitted tops.<br>
                🚫 Avoid: Skinny jeans, tight-fitting tops.
            `
        },
        female: {
            ectomorph: `
                ✅ Best Clothes: Peplum tops, A-line dresses, high-waisted skirts.<br>
                🚫 Avoid: Oversized clothing, vertical stripes.
            `,
            endomorph: `
                ✅ Best Clothes: Wrap dresses, empire waist tops, bootcut jeans.<br>
                🚫 Avoid: Tight-fitting clothes, stiff fabrics.
            `,
            hourglass: `
                ✅ Best Clothes: Wrap dresses, pencil skirts, fitted tops.<br>
                🚫 Avoid: Boxy, shapeless clothes.
            `,
            inverted_triangle: `
                ✅ Best Clothes: Flared skirts, peplum tops, V-neck blouses.<br>
                🚫 Avoid: Shoulder pads, off-shoulder tops.
            `,
            mesomorph: `
                ✅ Best Clothes: Fitted tops, high-waisted pants, belted dresses.<br>
                🚫 Avoid: Baggy or shapeless clothes.
            `,
            oval: `
                ✅ Best Clothes: Empire waist dresses, A-line skirts, flowy tops.<br>
                🚫 Avoid: Clingy fabrics, baggy clothes.
            `,
            rectangle: `
                ✅ Best Clothes: Wrap tops, belted dresses, flared jeans.<br>
                🚫 Avoid: Straight, shapeless outfits.
            `,
            trapezoid: `
                ✅ Best Clothes: Fitted jackets, high-waisted skirts, structured blouses.<br>
                🚫 Avoid: Loose, oversized styles.
            `,
            triangle: `
                ✅ Best Clothes: A-line skirts, boat-neck tops, structured blazers.<br>
                🚫 Avoid: Skinny jeans, tight-fitting tops.
            `
        }
    };

    bodySuggestionDiv.innerHTML = bodyTypeSuggestions[selectedGender][selectedBodyType];
}