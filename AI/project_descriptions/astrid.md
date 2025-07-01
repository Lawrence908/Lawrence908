## Project Overview

**AstrID** (Astronomical IDentification) is a machine learning project focused on identifying and classifying astronomical objects, primarily stars, in images taken by terrestrial and satellite radio-telescopes. The system uses deep learning techniques to automatically detect and locate stars in astronomical images.

## Main Goal and Features

### Primary Objectives
- **Star Identification**: Automatically identify and locate stars in astronomical images
- **Data Processing**: Process high-resolution images from space catalogs
- **Machine Learning Classification**: Use U-Net models for image segmentation and star detection
- **Stretch Goal**: Identify potential black hole candidates

### Key Features
- **Automated Data Retrieval**: Fetch images from SkyView and star catalogs from Vizier
- **Image Processing**: Process astronomical images with WCS (World Coordinate System) overlays
- **Model Training Pipeline**: End-to-end training system with hyperparameter optimization
- **Prediction System**: Real-time predictions on new astronomical data
- **Visualization Tools**: Comprehensive plotting and overlay capabilities

## Technology Stack

### Programming Languages
- **Python 3.10+**: Primary language for all development
- **Jupyter Notebooks**: For interactive development and experimentation

### Core Frameworks and Libraries

#### Machine Learning & Deep Learning
- **TensorFlow/Keras**: Primary deep learning framework
- **U-Net Architecture**: Convolutional Neural Network for image segmentation
- **NumPy**: Numerical computing and array operations
- **scikit-learn**: Additional machine learning utilities

#### Astronomical Data Processing
- **AstroPy**: Core astronomical data processing library
- **AstroQuery**: Query astronomical databases (SkyView, Vizier)
- **FITS (Flexible Image Transport System)**: Standard astronomical data format

#### Data Visualization
- **Matplotlib**: Primary plotting library with WCS support
- **Plotly**: Interactive visualizations
- **OpenCV**: Image processing and manipulation

#### Data Management
- **Pandas**: Data manipulation and analysis
- **Astropy Tables**: Astronomical data table handling

## Data Architecture

### Dataset Structure
The project creates custom FITS files with three main components:

1. **Primary HDU**: Main image data (2D array of pixel values)
2. **Star Catalog HDU**: Binary table containing star information (coordinates, magnitudes)
3. **Pixel Mask HDU**: Ground truth mask indicating star positions

### Data Sources
- **SkyView**: High-resolution astronomical images (DSS survey)
- **Vizier**: Star catalog data (2MASS catalog - II/246)
- **Hipparcos Catalog**: High-precision astrometric data (I/239/hip_main)

### Data Processing Pipeline
```python
# Data gathering workflow
createStarDataset() → FITS files → importDataset() → Training data
```

## Model Architecture

### U-Net Implementation
- **Input**: 1024x1024 pixel astronomical images
- **Output**: Binary mask of star locations
- **Architecture**: U-Net with skip connections
- **Training**: 30+ epochs with early stopping
- **Optimization**: Adam optimizer with binary cross-entropy loss

### Hyperparameters
- Learning rate: 0.001
- Batch size: 4
- Filters: [64, 128, 256, 512, 1024]
- Kernel size: (3, 3)
- Activation: ReLU

## External Integrations

### Astronomical APIs
- **SkyView API**: Fetch astronomical images
- **Vizier API**: Query star catalogs
- **MAST (Mikulski Archive for Space Telescopes)**: Additional astronomical data

### Data Format Standards
- **FITS**: Standard astronomical data format
- **WCS (World Coordinate System)**: Astronomical coordinate transformations

## Deployment and Infrastructure

### Environment Setup
- **Virtual Environment**: Python venv for dependency isolation
- **CUDA Support**: GPU acceleration for training (CUDA 11.8, cuDNN 8.6)
- **System Dependencies**: OpenGL libraries for visualization

### File Management
- **Git LFS**: Large file storage for model weights (>100MB .h5 files)
- **Directory Structure**: Organized data, models, logs, and results folders

## Security and Identity Management

The project doesn't implement traditional security features as it's primarily a research/analysis tool. However, it includes:
- **User identification**: Timestamped outputs with user information
- **Data validation**: Input validation for astronomical coordinates
- **Error handling**: Robust error handling for API failures

## Unique Technical Challenges and Solutions

### 1. Custom Dataset Creation
**Challenge**: No pre-compiled dataset met the project requirements
**Solution**: Built comprehensive dataset from scratch using AstroPy to query multiple astronomical databases

### 2. Astronomical Coordinate Systems
**Challenge**: Complex coordinate transformations between world coordinates and pixel coordinates
**Solution**: Implemented WCS (World Coordinate System) handling with AstroPy

### 3. Star Intensity Modeling
**Challenge**: Single-pixel star representation caused model issues with larger stars
**Solution**: Implemented circular masks with radius based on star magnitude (Jmag values)

### 4. Training Optimization
**Challenge**: Long training times on CPU
**Solution**: GPU acceleration with early stopping and comprehensive logging

### 5. Data Quality Issues
**Challenge**: Handling photographic anomalies and lens flares
**Solution**: Robust error handling and coordinate validation

## Performance Optimizations

- **GPU Acceleration**: CUDA support for faster training
- **Early Stopping**: Prevents overfitting after 10 epochs without improvement
- **Batch Processing**: Efficient data loading and processing
- **Memory Management**: Optimized image stacking and array operations

## Monitoring and Logging

- **Training Logs**: Comprehensive logging of all training runs
- **Hyperparameter Tracking**: Systematic recording of model configurations
- **Performance Metrics**: Loss and accuracy tracking across epochs
- **Visualization**: Automated generation of comparison plots and overlays

This technical architecture demonstrates a sophisticated integration of astronomical data processing, machine learning, and computer vision techniques to solve real-world astronomical challenges.