# **Advanced Size Finder**  
An interactive and dynamic size recommendation system that helps users find the perfect clothing size across different brands. This tool collects user details through a multi-step form, dynamically adjusts brand-specific size recommendations, and provides a real-time size prediction using a Django backend API.

---

## **Features**  
1. **Multi-Step Form**: Collects user details like Height, Weight, Gender, and Body Type step by step.  
2. **Dynamic Brand Selection**: Users can select from multiple brands, and the size chart adjusts accordingly.  
3. **Real-Time Size Prediction**: Utilizes Django backend API for accurate size prediction.  
4. **Comparison Chart**: (Planned) Display size comparison across brands for better decision-making.  
5. **Responsive Design**: Fully optimized for mobile and desktop devices.  
6. **Dark Theme**: Stylish black background with gold and white accents.  

---

## **Technologies Used**  
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Django (for size prediction API)  
- **Deployment**: Works locally and can be integrated with your existing Django project.  

---

## **Directory Structure**  
```
your-project-root/
└── advanced-size-recommendation/
    ├── index.html        # Main HTML file for the form
    ├── styles.css        # Styling with dark theme and golden accents
    └── script.js         # JavaScript for multi-step form and API interaction
```

---

## **Setup and Installation**  

1. **Clone or Download the Repository**  
Place the `advanced-size-recommendation` folder in your project root directory.  

2. **Ensure Django Backend is Running**  
Make sure your Django server is up and running. If you haven't already, start the Django server:  
```bash
python manage.py runserver
```

3. **API Endpoint**  
Ensure that your Django backend has an endpoint set up to handle POST requests for size prediction.  
For example:
```
http://127.0.0.1:8000/api/predict-size/
```

4. **Open the Application**  
Open `index.html` in your browser or integrate the feature into your existing website.

---

## **How to Use**  
1. Navigate to the `Advanced Size Finder` page.  
2. **Step 1: Basic Details**  
   - Enter your **Height (cm)** and **Weight (kg)**.  
   - Click `Next` to proceed.  
3. **Step 2: Preferences**  
   - Select **Gender** and **Body Type**.  
   - Click `Next` to proceed.  
4. **Step 3: Brand Selection**  
   - Choose your preferred clothing brand.  
   - Click `Get Size` to receive your size recommendation.  
5. **View Recommended Size**  
   - The recommended size and fit type will be displayed below the form.  

---

## **Customizing and Extending**  
- **Adding More Brands**: Update the `<select>` element in `index.html` with more brand options.  
- **Adjusting Size Prediction Logic**: Modify the Django backend logic to support additional body measurements or custom algorithms.  
- **Improving UI/UX**: Add animations, transitions, or even brand logos for a richer experience.  

---

## **Example API Request**  
The frontend sends a POST request to the Django backend with the following JSON payload:  
```json
{
  "height": 175,
  "weight": 70,
  "gender": "male",
  "body_type": "mesomorph",
  "brand": "nike"
}
```

### **Expected Response**  
```json
{
  "size": "M",
  "fit_type": "Regular Fit"
}
```

---

## **Planned Features and Enhancements**  
- **Comparison Chart**: Display a comparison chart across selected brands using Chart.js.  
- **Personalized Suggestions**: Recommend clothing styles based on the user’s body type.  
- **Enhanced Error Handling**: Display user-friendly error messages for better UX.  

---

## **Contributing**  
Contributions are welcome! If you have ideas for enhancements or find any bugs, feel free to create an issue or submit a pull request.  

---

## **License**  
This project is licensed under the MIT License. Feel free to use and modify it for personal or commercial purposes.  

---

## **Contact and Support**  
For any queries, feel free to reach out or open an issue on the repository.  

Happy Coding! 🎉
