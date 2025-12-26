# Myitsone Landsat Change Detection (1986–2025)

[![Earth Engine](https://img.shields.io/badge/Google-Earth%20Engine-blue)](https://earthengine.google.com/)
[![Landsat](https://img.shields.io/badge/Data-Landsat%20C02-green)](https://www.usgs.gov/landsat-missions/landsat-collection-2)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive Google Earth Engine analysis of land cover and vegetation changes in the Myitsone area (Kachin State, Myanmar) spanning nearly four decades (1986–2025) using Landsat satellite imagery.

![Project Overview](docs/images/workflow_diagram.png)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Study Area](#study-area)
- [Data Sources](#data-sources)
- [Methodology](#methodology)
- [Quick Start](#quick-start)
- [Results Interpretation](#results-interpretation)
- [Outputs](#outputs)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
- [Citation](#citation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## 🌍 Overview

This project provides automated change detection analysis for the Myitsone region using Google Earth Engine's prebuilt Landsat composite collections. The analysis tracks environmental changes through multiple spectral indices (NDVI, NBR, NDWI) and produces both temporal change maps and long-term trend analyses.

### Key Applications

- **Environmental Monitoring**: Track vegetation health and land cover changes
- **Water Resource Management**: Monitor water body extent and seasonal variations
- **Disturbance Detection**: Identify areas of deforestation, development, or natural disturbances
- **Climate Impact Assessment**: Analyze long-term vegetation trends
- **Regional Planning**: Support land use planning and conservation efforts

## ✨ Features

- **Multi-temporal Analysis**: Leverages 40 years of Landsat imagery (1986–2025)
- **Multiple Indices**: NDVI, NBR, and NDWI for comprehensive environmental assessment
- **Robust Change Detection**: Period-to-period averaging reduces noise and seasonal effects
- **Trend Analysis**: Linear regression to identify long-term vegetation trends
- **Time Series Visualization**: Annual mean values plotted for temporal analysis
- **Automated Exports**: GeoTIFF outputs ready for GIS analysis
- **Quality Assurance**: Uses Earth Engine's strictest QA filtering for cloud-free composites

## 📍 Study Area

**Location**: Myitsone, Kachin State, Myanmar

**Coordinates**: 
- Latitude: 25.496°N to 25.886°N
- Longitude: 97.318°E to 97.733°E

**Area of Interest (AOI)**: Approximately 1,600 km²

**Significance**: The Myitsone area is located at the confluence of the Mali and N'mai rivers, forming the source of the Irrawaddy River. This region has been the focus of environmental and social concerns related to proposed hydroelectric dam development and represents an important biodiversity hotspot in northern Myanmar.

## 📊 Data Sources

### Landsat Composite Collections

This project uses Google Earth Engine's on-the-fly Landsat composites created by Justin Braaten. These collections provide analysis-ready data with strict quality assurance filtering.

| Collection | Description | Bands Used |
|------------|-------------|------------|
| `LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL` | Surface Reflectance | SWIR1, NIR, Green |
| `LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL_NDVI` | Normalized Difference Vegetation Index | NDVI |
| `LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL_NBR` | Normalized Burn Ratio | NBR |
| `LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL_NDWI` | Normalized Difference Water Index | NDWI |

**Temporal Coverage**: 1986–2025 (Landsat 5, 7, 8, and 9)
**Spatial Resolution**: 30 meters
**Temporal Resolution**: Annual composites (median values)

### Advantages of These Collections

1. **Harmonized Multi-Mission**: Seamlessly combines Landsat 5 TM, Landsat 7 ETM+, Landsat 8 OLI, and Landsat 9 OLI-2
2. **Cloud-Free**: Strict QA filtering removes clouds, cloud shadows, and other artifacts
3. **Analysis-Ready**: Pre-calculated indices eliminate need for manual band math
4. **Consistent Quality**: Standardized processing across entire time series

## 🔬 Methodology

### Change Detection Approach

The script implements a robust period-to-period change detection methodology:

1. **Baseline Period**: Average of multiple years (default: 1986–1990)
2. **Comparison Period**: Average of recent years (default: 2020–2025)
3. **Change Calculation**: Δ Index = Index(comparison) - Index(baseline)

This approach reduces the impact of:
- Single-year anomalies (drought, flooding, cloud contamination)
- Seasonal phenological variations
- Sensor noise and calibration differences

### Spectral Indices

#### NDVI (Normalized Difference Vegetation Index)
```
NDVI = (NIR - Red) / (NIR + Red)
```
- **Range**: -1 to +1
- **Interpretation**: Higher values indicate healthier, denser vegetation
- **Application**: Vegetation health, biomass estimation, crop monitoring

#### NBR (Normalized Burn Ratio)
```
NBR = (NIR - SWIR2) / (NIR + SWIR2)
```
- **Range**: -1 to +1
- **Interpretation**: Sensitive to vegetation moisture and disturbance
- **Application**: Fire severity, forest degradation, disturbance detection

#### NDWI (Normalized Difference Water Index)
```
NDWI = (Green - NIR) / (Green + NIR)
```
- **Range**: -1 to +1
- **Interpretation**: Higher values indicate water presence
- **Application**: Water body mapping, wetland monitoring, flood extent

### Trend Analysis

Long-term trends are calculated using linear regression:
- **Independent Variable**: Time (years since 1986)
- **Dependent Variable**: NDVI value
- **Output**: Slope (NDVI change per year)
- **Interpretation**: Positive slope = greening trend; Negative slope = browning trend

## 🚀 Quick Start

### Prerequisites

- Google Earth Engine account ([sign up here](https://earthengine.google.com/signup/))
- Access to Earth Engine Code Editor

### Basic Usage

1. **Open the Code Editor**
   ```
   https://code.earthengine.google.com/
   ```

2. **Create a New Script**
   - Click "New" → "File" in the Scripts panel

3. **Copy the Code**
   - Copy the contents of `myitsone-ndvi-ndwi-nbr-change-analysis-1986-2025.js`
   - Paste into the new script

4. **Run the Analysis**
   - Click the **Run** button
   - View results in the Map panel and Console

5. **Export Results**
   - Navigate to the **Tasks** tab
   - Click **Run** on each export task:
     - `Myitsone_dNDVI_*`
     - `Myitsone_dNBR_*`
     - `Myitsone_dNDWI_*`
     - `Myitsone_NDVI_slope_*`
   - Files will be saved to your Google Drive

## 📈 Results Interpretation

### Change Maps (Δ Values)

#### dNDVI (Change in Vegetation)
| Value Range | Color | Interpretation |
|-------------|-------|----------------|
| < -0.2 | Dark Purple | Severe vegetation loss (deforestation, urbanization) |
| -0.2 to -0.1 | Purple | Moderate vegetation decline |
| -0.1 to +0.1 | White/Gray | No significant change |
| +0.1 to +0.2 | Light Green | Vegetation recovery/growth |
| > +0.2 | Dark Green | Significant greening (reforestation, agriculture expansion) |

#### dNDWI (Change in Water)
| Value Range | Color | Interpretation |
|-------------|-------|----------------|
| < -0.2 | Dark Purple | Significant water loss (drying) |
| -0.2 to -0.1 | Purple | Moderate drying |
| -0.1 to +0.1 | White/Gray | No significant change |
| +0.1 to +0.2 | Light Blue | Increased water presence |
| > +0.2 | Dark Blue | Substantial water expansion (flooding, reservoir filling) |

#### dNBR (Disturbance/Recovery)
| Value Range | Interpretation |
|-------------|----------------|
| < -0.25 | High severity disturbance or post-fire regrowth |
| -0.25 to -0.1 | Moderate severity disturbance |
| -0.1 to +0.1 | No significant change |
| +0.1 to +0.25 | Moderate recovery |
| > +0.25 | High recovery or vegetation densification |

### Trend Analysis (NDVI Slope)

| Slope Value | Annual Change | Interpretation |
|-------------|---------------|----------------|
| < -0.005 | -0.5% per year | Significant degradation trend |
| -0.005 to -0.001 | -0.1 to -0.5% per year | Moderate degradation trend |
| -0.001 to +0.001 | ±0.1% per year | Stable (no trend) |
| +0.001 to +0.005 | +0.1 to +0.5% per year | Moderate greening trend |
| > +0.005 | >+0.5% per year | Significant greening trend |

## 📦 Outputs

### Visualizations (In Map Panel)

1. **AOI Boundary**: Red polygon outline
2. **dNDVI Map**: Purple (loss) to green (gain) color scheme
3. **dNBR Map**: Similar diverging color scheme
4. **dNDWI Map**: Purple (drying) to blue (wetting)
5. **NDVI Slope Map**: Long-term trend visualization

### Time Series Charts (In Console)

1. **Annual Mean NDVI**: Line chart showing vegetation trends
2. **Annual Mean NBR**: Line chart showing disturbance patterns
3. **Annual Mean NDWI**: Line chart showing water availability changes

### Exported GeoTIFFs

All exports are saved to your Google Drive with standardized naming:

```
Myitsone_dNDVI_[baseline_years]_vs_[compare_years].tif
Myitsone_dNBR_[baseline_years]_vs_[compare_years].tif
Myitsone_dNDWI_[baseline_years]_vs_[compare_years].tif
Myitsone_NDVI_slope_[start_year]_[end_year].tif
```

**File Specifications**:
- Format: GeoTIFF
- Resolution: 30 meters
- Coordinate System: WGS84 (EPSG:4326)
- Data Type: Float32
- NoData Value: 0 (masked areas)

## 🛠️ Requirements

### Earth Engine Account
- Free account: [sign up](https://earthengine.google.com/signup/)
- Access to Code Editor (browser-based, no installation needed)

### Optional (for Post-Processing)
- GIS Software: QGIS, ArcGIS, or similar
- Python with libraries: `geemap`, `rasterio`, `matplotlib`
- R with libraries: `sf`, `raster`, `ggplot2`

## 💻 Installation

No installation required! The script runs entirely in Google Earth Engine's cloud-based Code Editor.

### For Local Development (Optional)

If you want to use the Earth Engine Python API:

```bash
# Install Earth Engine Python API
pip install earthengine-api

# Authenticate
earthengine authenticate

# Install additional libraries
pip install geemap geopandas matplotlib folium
```

## 📚 Usage Examples

### Example 1: Custom AOI

Replace the AOI coordinates with your study area:

```javascript
var aoi = ee.Geometry.Polygon(
  [[[longitude1, latitude1],
    [longitude1, latitude2],
    [longitude2, latitude2],
    [longitude2, latitude1],
    [longitude1, latitude1]]],
  null,
  false
);
```

### Example 2: Different Time Periods

Adjust the baseline and comparison periods:

```javascript
// Compare 1990s vs 2010s
var baselineStartYear = 1990;
var baselineEndYear = 1999;
var compareStartYear = 2010;
var compareEndYear = 2019;
```

### Example 3: Seasonal Analysis

For within-year changes, switch to 32-day composites:

```javascript
// Use 32-day composites instead of annual
var seasonalNdvi = ee.ImageCollection('LANDSAT/COMPOSITES/C02/T1_L2_32DAY_NDVI')
  .filterBounds(aoi)
  .filterDate('2024-01-01', '2024-12-31');
```

### Example 4: Higher Frequency Monitoring

For rapid change detection:

```javascript
// Use 8-day composites for recent monitoring
var recentNdvi = ee.ImageCollection('LANDSAT/COMPOSITES/C02/T1_L2_8DAY_NDVI')
  .filterBounds(aoi)
  .filterDate('2024-01-01', '2025-01-01');
```

## 📖 Citation

If you use this code or methodology in your research, please cite:

```bibtex
@software{myitsone_landsat_change,
  author = {Tin Ko Oo},
  title = {Myitsone Landsat Change Detection (1986-2025)},
  year = {2025},
  url = {https://github.com/yourusername/myitsone-landsat-change},
  note = {Google Earth Engine implementation}
}
```

### Related Publications

When using Landsat composite collections, please also cite:

```bibtex
@article{braaten2022landsat,
  title={An automated approach for reconstructing recent forest disturbance history using dense Landsat time series stacks},
  author={Braaten, Justin and others},
  journal={Remote Sensing of Environment},
  year={2022}
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution

- Additional spectral indices (EVI, SAVI, MSAVI)
- Statistical significance testing for changes
- Automated classification of change types
- Integration with other datasets (climate, topography)
- Python/R equivalents using `geemap` or `rgee`
- Documentation improvements and translations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Earth Engine Team**: For providing the platform and computational resources
- **Justin Braaten**: For creating and maintaining the Landsat composite collections
- **USGS**: For Landsat data archive and Collection 2 processing
- **NASA**: For Landsat missions and data continuity
- **Myanmar Geoscience Community**: For field knowledge and context

## 📞 Contact

**Tin Ko Oo**
- Institution: Mahidol University, Thailand
- Email: tin.koo@mahidol.ac.th
- GitHub: @drtinkooo

## 🔗 Additional Resources

- [Google Earth Engine Documentation](https://developers.google.com/earth-engine)
- [Landsat Science](https://www.usgs.gov/landsat-missions/landsat-science)
- [Landsat Collection 2 Guide](https://www.usgs.gov/landsat-missions/landsat-collection-2)
- [Change Detection Methods](https://gisgeography.com/change-detection-remote-sensing/)
- [NDVI Interpretation Guide](https://gisgeography.com/ndvi-normalized-difference-vegetation-index/)

---

**Last Updated**: December 2025  
**Version**: 1.0.0
