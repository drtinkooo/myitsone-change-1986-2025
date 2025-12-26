# Quick Start Guide

Get started with Myitsone Landsat change detection in 5 minutes!

## Prerequisites

✅ Google Earth Engine account ([Sign up here](https://earthengine.google.com/signup/))

That's it! Everything else runs in your web browser.

## Step-by-Step Instructions

### 1. Open Earth Engine Code Editor

Visit: **https://code.earthengine.google.com/**

### 2. Create a New Script

1. In the left panel, click **Scripts**
2. Click **NEW** → **File**
3. Name it: `myitsone_change_detection`

### 3. Copy the Code

1. Open `myitsone-ndvi-ndwi-nbr-change-analysis-1986-2025.js` from this repository
2. Copy all the code (Ctrl+A, Ctrl+C)
3. Paste into your new script (Ctrl+V)

### 4. Run the Analysis

1. Click the **Run** button (top of code editor)
2. Wait 10-20 seconds for processing
3. Look at the Map panel below (you should see the AOI outlined in red)

### 5. View Results

**In the Map:**
- Toggle layers on/off in the Layers panel (top-right)
- Default visible: `dNDVI (compare - baseline)`
  - Purple areas = vegetation loss
  - Green areas = vegetation gain
  - Gray/white = no significant change

**In the Console:**
- Scroll down to see three time series charts
- Charts show annual NDVI, NBR, and NDWI from 1986-2025

### 6. Export Results

1. Click the **Tasks** tab (right panel)
2. You'll see 4 export tasks:
   - `Myitsone_dNDVI_*`
   - `Myitsone_dNBR_*`
   - `Myitsone_dNDWI_*`
   - `Myitsone_NDVI_slope_*`
3. Click **RUN** on each task
4. Confirm settings in the dialog (defaults are fine)
5. Click **Run** again

### 7. Download from Google Drive

1. Go to your Google Drive
2. Find the exported files (usually in root folder)
3. Download to your computer
4. Open in QGIS, ArcGIS, or other GIS software

## What You Just Did

You analyzed **40 years of satellite data** covering **1,600 km²** to detect:
- Vegetation changes (NDVI)
- Disturbances (NBR)
- Water body changes (NDWI)

The analysis compared:
- **Baseline period**: 1986-1990 (averaged)
- **Comparison period**: 2020-2025 (averaged)

## Understanding Your Results

### Change Map Colors

| Color | Meaning (for NDVI) |
|-------|-------------------|
| **Dark Purple** | Major vegetation loss (deforestation) |
| **Light Purple** | Moderate vegetation loss |
| **White/Gray** | No significant change |
| **Light Green** | Moderate vegetation gain |
| **Dark Green** | Major vegetation gain (reforestation) |

### Time Series Charts

The charts show annual average values:
- **Upward trend** = increasing over time
- **Downward trend** = decreasing over time
- **Flat line** = stable
- **Spikes** = anomalous years (drought, flood)

## Next Steps

### Customize for Your Area

Change the coordinates in line ~20:
```javascript
var aoi = ee.Geometry.Polygon(
  [[[yourMinLon, yourMinLat],
    [yourMinLon, yourMaxLat],
    [yourMaxLon, yourMaxLat],
    [yourMaxLon, yourMinLat],
    [yourMinLon, yourMinLat]]],
  null,
  false
);
```

### Change Time Periods

Adjust these parameters (lines ~27-38):
```javascript
var baselineStartYear = 1990;  // Your baseline start
var baselineEndYear = 1995;    // Your baseline end

var compareStartYear = 2020;   // Your comparison start
var compareEndYear = 2024;     // Your comparison end
```

### Explore Other Layers

In the Layers panel, turn on:
- `Baseline SR (false color)` - Original satellite image
- `Compare SR (false color)` - Recent satellite image
- `dNBR` - Disturbance detection
- `dNDWI` - Water changes
- `NDVI trend slope` - Long-term trends

## Troubleshooting

### "Collection has 0 elements"
- Check your date ranges (must be 1986-2025)
- Verify your AOI coordinates are valid

### "Computation timed out"
- Your area might be too large
- Try a smaller AOI first

### "Export failed"
- Check your Google Drive has space
- Don't use special characters in file names

### Nothing appears on the map
- Click the "Run" button again
- Zoom out to see if AOI is outside current view
- Check Console for error messages (red text)

## Getting Help

- **Documentation**: Read [USAGE.md](USAGE.md) for detailed instructions
- **Examples**: Check [EXAMPLES.md](EXAMPLES.md) for more use cases
- **Questions**: See [FAQ.md](FAQ.md) for common questions
- **Issues**: Open an issue on GitHub
- **Earth Engine**: Visit the [Earth Engine Forum](https://groups.google.com/g/google-earth-engine-developers)

## Video Tutorial

[Coming soon - Check repository for updates]

## Congratulations! 🎉

You've completed your first satellite-based change detection analysis. Now you can:
- Analyze any region globally
- Compare any time periods
- Export results for further analysis
- Create publication-quality maps

---

**Questions?** Open an issue on GitHub or email: [your.email@mahidol.edu]

**Time to Complete**: ~5 minutes  
**Difficulty**: Beginner  
**Last Updated**: December 2025
