# Find Your Fit AI

Find Your Fit AI is an AI-powered body measurement extraction system that predicts key measurements (shoulder width, chest, waist, and leg length) from images. The system utilizes OpenPose for body keypoint detection, MiDaS for depth estimation, and ArUco markers for calibration to provide accurate size recommendations.

## 🚀 Features
- **Automatic Body Measurement Extraction**
- **Depth Estimation for Accurate Scaling**
- **ArUco Marker Calibration**
- **Supports Custom Clothing Size Recommendations**
- **Potential for AR Integration**

## 🛠️ Installation

### Prerequisites
Ensure you have the following installed:
- Python 3.8+
- OpenCV
- PyTorch
- OpenPose
- MiDaS (for depth estimation)
- ArUco (for marker-based calibration)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/find_your_fit_ai.git
   cd find_your_fit_ai
   ```

2. Setup OpenPose:
   ```bash
   git clone https://github.com/CMU-Perceptual-Computing-Lab/openpose.git
   cd openpose && mkdir build && cd build
   cmake .. && make -j$(nproc) && sudo make install
   ```

3. Add OpenPose to Python Path:
   ```bash
   echo "export PYTHONPATH=$PYTHONPATH:$(pwd)/python" >> ~/.bashrc
   source ~/.bashrc
   ```

## 🏃‍♂️ Running the Project

To process an image and extract body measurements, run:
```bash
python main.py --image_path path/to/image.jpg
```

## 📌 How It Works
1. **Preprocess Image** – Reads and resizes the image.
2. **OpenPose Keypoint Detection** – Extracts key body landmarks.
3. **Depth Estimation (MiDaS)** – Determines depth for accurate scaling.
4. **ArUco Marker Detection** – Calibrates the measurements.
5. **Final Measurements** – Converts pixel distances to cm.

## 📷 Example Output
```bash
Final Measurements (cm): {'shoulder_width': 45.3, 'waist_width': 32.1, 'leg_length': 98.5}
```

## 🎯 Future Enhancements
- 🔹 **Brand-Specific Clothing Size Recommendations**
- 🔹 **Augmented Reality Visualization**
- 🔹 **Real-time Webcam Support**

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch (`feature-name`)
3. Commit your changes.
4. Push to your branch and create a Pull Request.

## 📄 License
This project is licensed under the MIT License.

---
👨‍💻 Developed by Vedant Sakpal

