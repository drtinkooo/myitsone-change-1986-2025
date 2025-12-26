# Examples

This document provides practical examples for common use cases and modifications to the Myitsone Landsat change detection script.

## Table of Contents

- [Basic Usage Examples](#basic-usage-examples)
- [Customizing Study Areas](#customizing-study-areas)
- [Temporal Analysis Examples](#temporal-analysis-examples)
- [Advanced Analysis](#advanced-analysis)
- [Visualization Examples](#visualization-examples)
- [Export Variations](#export-variations)

## Basic Usage Examples

### Example 1: Run with Default Settings

```javascript
// Copy the entire script from myitsone-ndvi-ndwi-nbr-change-analysis-1986-2025.js
// Click Run
// View results in Map and Console
// Go to Tasks tab to export results
```

**Expected Outputs**:
- Map layers showing change detection
- Time series charts in Console
- 4 export tasks ready to run

### Example 2: Quick Test with Small Area

```javascript
// Test with a small 10km x 10km area for faster processing
var testAoi = ee.Geometry.Rectangle([97.5, 25.7, 97.6, 25.8]);
Map.centerObject(testAoi, 12);
Map.addLayer(testAoi, {color: 'yellow'}, 'Test AOI');

// Use the test AOI instead of the main AOI
// Rest of the script remains the same
```

**Use Case**: Testing before running full analysis, troubleshooting, or learning.

### Example 3: Recent Change Only (Last 5 Years)

```javascript
// Focus on recent changes
var startYear = 2020;
var endYear = 2025;

var baselineStartYear = 2020;
var baselineEndYear = 2021;

var compareStartYear = 2023;
var compareEndYear = 2025;
```

**Use Case**: Monitoring recent developments, rapid change detection.

## Customizing Study Areas

### Example 4: Different Region - Irrawaddy Delta

```javascript
// Irrawaddy Delta region
var aoi = ee.Geometry.Rectangle([
  94.5, 15.5,  // Lower left: [longitude, latitude]
  96.5, 17.0   // Upper right: [longitude, latitude]
]);

Map.centerObject(aoi, 9);
```

**Use Case**: Coastal change, aquaculture expansion, mangrove monitoring.

### Example 5: Multiple Points of Interest

```javascript
// Define multiple sites
var site1 = ee.Geometry.Point([97.5, 25.7]).buffer(5000);  // 5km buffer
var site2 = ee.Geometry.Point([97.6, 25.8]).buffer(5000);
var site3 = ee.Geometry.Point([97.4, 25.6]).buffer(5000);

// Combine into one AOI
var aoi = ee.Geometry.MultiPoint([
  [97.5, 25.7],
  [97.6, 25.8],
  [97.4, 25.6]
]).buffer(5000);

Map.addLayer(site1, {color: 'red'}, 'Site 1');
Map.addLayer(site2, {color: 'blue'}, 'Site 2');
Map.addLayer(site3, {color: 'green'}, 'Site 3');
```

**Use Case**: Monitoring multiple field sites, comparative analysis.

### Example 6: Import Shapefile as AOI

```javascript
// First upload shapefile as Asset in Earth Engine
// Then load it:
var aoi = ee.FeatureCollection('users/yourusername/your_shapefile')
  .geometry();

Map.centerObject(aoi, 10);
Map.addLayer(aoi, {color: 'purple'}, 'Custom AOI');
```

**Use Case**: Using existing administrative boundaries, protected areas, watersheds.

### Example 7: Draw AOI Interactively

```javascript
// 1. Use the polygon drawing tool in the map
// 2. Draw your area
// 3. Name the geometry "aoi" in the geometry editor
// 4. The script will automatically use it

// Or convert drawn geometry to Rectangle
var bounds = geometry.bounds();
var coords = ee.List(bounds.coordinates().get(0));
var aoi = ee.Geometry.Rectangle(coords);
```

**Use Case**: Exploring areas without knowing exact coordinates.

## Temporal Analysis Examples

### Example 8: Decadal Comparison

```javascript
// Compare 1990s vs 2020s
var baselineStartYear = 1990;
var baselineEndYear = 1999;

var compareStartYear = 2020;
var compareEndYear = 2024;
```

**Use Case**: Long-term climate change impacts, multi-decadal land use transitions.

### Example 9: Year-by-Year Change

```javascript
// Calculate change for each consecutive year pair
var years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

years.slice(0, -1).forEach(function(year, index) {
  var ndvi1 = annualFirstByYearOrZero(annualNdvi, year, 'NDVI');
  var ndvi2 = annualFirstByYearOrZero(annualNdvi, years[index + 1], 'NDVI');
  var change = ndvi2.subtract(ndvi1).clip(aoi);
  
  Map.addLayer(
    change, 
    visDiff, 
    'dNDVI ' + year + '-' + years[index + 1],
    false
  );
});
```

**Use Case**: Tracking progressive changes, event detection, rapid assessment.

### Example 10: Seasonal Analysis

```javascript
// Compare dry season vs wet season
var drySeasonNdvi = ee.ImageCollection('LANDSAT/COMPOSITES/C02/T1_L2_32DAY_NDVI')
  .filterBounds(aoi)
  .filter(ee.Filter.calendarRange(11, 4, 'month'))  // Nov-Apr
  .filterDate('2020-01-01', '2025-01-01')
  .mean()
  .clip(aoi);

var wetSeasonNdvi = ee.ImageCollection('LANDSAT/COMPOSITES/C02/T1_L2_32DAY_NDVI')
  .filterBounds(aoi)
  .filter(ee.Filter.calendarRange(5, 10, 'month'))  // May-Oct
  .filterDate('2020-01-01', '2025-01-01')
  .mean()
  .clip(aoi);

var seasonalDiff = wetSeasonNdvi.subtract(drySeasonNdvi);

Map.addLayer(drySeasonNdvi, visNdvi, 'Dry Season NDVI', false);
Map.addLayer(wetSeasonNdvi, visNdvi, 'Wet Season NDVI', false);
Map.addLayer(seasonalDiff, visDiff, 'Seasonal Difference', true);
```

**Use Case**: Phenology studies, agricultural monitoring, water availability.

### Example 11: Pre/Post Event Analysis

```javascript
// Example: Before and after a major flood or landslide
var eventDate = '2020-07-15';  // Date of event

var preEvent = ee.ImageCollection('LANDSAT/COMPOSITES/C02/T1_L2_8DAY_NDVI')
  .filterBounds(aoi)
  .filterDate('2020-06-01', eventDate)
  .mean()
  .clip(aoi);

var postEvent = ee.ImageCollection('LANDSAT/COMPOSITES/C02/T1_L2_8DAY_NDVI')
  .filterBounds(aoi)
  .filterDate(eventDate, '2020-09-01')
  .mean()
  .clip(aoi);

var eventChange = postEvent.subtract(preEvent);

Map.addLayer(preEvent, visNdvi, 'Pre-Event', false);
Map.addLayer(postEvent, visNdvi, 'Post-Event', false);
Map.addLayer(eventChange, visDiff, 'Event Impact', true);
```

**Use Case**: Disaster assessment, disturbance monitoring, recovery tracking.

## Advanced Analysis

### Example 12: Add Elevation Stratification

```javascript
// Load elevation data
var srtm = ee.Image('USGS/SRTMGL1_003').clip(aoi);

// Create elevation zones
var lowland = srtm.lt(500);   // Below 500m
var midland = srtm.gte(500).and(srtm.lt(1500));  // 500-1500m
var highland = srtm.gte(1500);  // Above 1500m

// Mask change by elevation
var dNdviLowland = dNdvi.updateMask(lowland);
var dNdviMidland = dNdvi.updateMask(midland);
var dNdviHighland = dNdvi.updateMask(highland);

// Visualize
Map.addLayer(srtm, {min: 0, max: 3000, palette: ['green', 'yellow', 'brown']}, 'Elevation', false);
Map.addLayer(dNdviLowland, visDiff, 'Lowland Change', false);
Map.addLayer(dNdviMidland, visDiff, 'Midland Change', false);
Map.addLayer(dNdviHighland, visDiff, 'Highland Change', false);

// Calculate statistics by zone
var lowlandStats = dNdvi.updateMask(lowland).reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: aoi,
  scale: 90
});

print('Lowland mean change:', lowlandStats.get('dNDVI'));
```

**Use Case**: Topographic influence on change, altitude-dependent analysis.

### Example 13: Protected Area vs Outside Comparison

```javascript
// Load protected areas database
var protectedAreas = ee.FeatureCollection('WCMC/WDPA/current/polygons')
  .filterBounds(aoi);

// Create masks
var insidePA = ee.Image.constant(1).clip(protectedAreas.geometry());
var outsidePA = insidePA.not();

// Mask changes
var changeInside = dNdvi.updateMask(insidePA);
var changeOutside = dNdvi.updateMask(outsidePA);

// Visualize
Map.addLayer(protectedAreas, {color: 'green'}, 'Protected Areas', false);
Map.addLayer(changeInside, visDiff, 'Change Inside PA', false);
Map.addLayer(changeOutside, visDiff, 'Change Outside PA', false);

// Compare statistics
var statsInside = dNdvi.updateMask(insidePA).reduceRegion({
  reducer: ee.Reducer.mean().combine(ee.Reducer.stdDev(), '', true),
  geometry: aoi,
  scale: 90
});

var statsOutside = dNdvi.updateMask(outsidePA).reduceRegion({
  reducer: ee.Reducer.mean().combine(ee.Reducer.stdDev(), '', true),
  geometry: aoi,
  scale: 90
});

print('Inside PA:', statsInside);
print('Outside PA:', statsOutside);
```

**Use Case**: Conservation effectiveness, deforestation pressure analysis.

### Example 14: Classify Change Magnitude

```javascript
// Create change magnitude classes
var changeClasses = ee.Image(0)
  .where(dNdvi.lt(-0.3), 1)    // Severe loss
  .where(dNdvi.gte(-0.3).and(dNdvi.lt(-0.1)), 2)  // Moderate loss
  .where(dNdvi.gte(-0.1).and(dNdvi.lte(0.1)), 3)  // Stable
  .where(dNdvi.gt(0.1).and(dNdvi.lte(0.3)), 4)    // Moderate gain
  .where(dNdvi.gt(0.3), 5);    // Severe gain

// Visualize classes
Map.addLayer(changeClasses.clip(aoi), {
  min: 1,
  max: 5,
  palette: ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641']
}, 'Change Classes', true);

// Calculate area statistics
var pixelArea = ee.Image.pixelArea();
var classAreas = pixelArea.addBands(changeClasses)
  .reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class'
    }),
    geometry: aoi,
    scale: 30,
    maxPixels: 1e13
  });

print('Area by change class (sq meters):', classAreas);
```

**Use Case**: Quantifying change extent, creating change maps for reports.

### Example 15: Multi-Index Consistency Check

```javascript
// Identify areas where all three indices agree on direction
var ndviGain = dNdvi.gt(0.1);
var nbrGain = dNbr.gt(0.1);
var ndwiGain = dNdwi.gt(0.1);

var allIndicesGain = ndviGain.and(nbrGain).and(ndwiGain);

var ndviLoss = dNdvi.lt(-0.1);
var nbrLoss = dNbr.lt(-0.1);
var ndwiLoss = dNdwi.lt(-0.1);

var allIndicesLoss = ndviLoss.and(nbrLoss).and(ndwiLoss);

// Visualize high-confidence changes
Map.addLayer(
  allIndicesGain.selfMask().clip(aoi),
  {palette: 'darkgreen'},
  'High Confidence Gain',
  false
);

Map.addLayer(
  allIndicesLoss.selfMask().clip(aoi),
  {palette: 'darkred'},
  'High Confidence Loss',
  false
);
```

**Use Case**: Reducing false positives, identifying most reliable changes.

## Visualization Examples

### Example 16: Custom Color Palettes

```javascript
// Earth tones palette
var earthTones = {
  min: -0.3,
  max: 0.3,
  palette: ['#8B4513', '#CD853F', '#F5DEB3', '#90EE90', '#228B22', '#006400']
};

// Blue to red palette (reverse)
var blueRed = {
  min: -0.3,
  max: 0.3,
  palette: ['#0000FF', '#87CEEB', '#F5F5F5', '#FFA07A', '#FF0000']
};

// Apply different palettes
Map.addLayer(dNdvi, earthTones, 'Change (Earth Tones)', false);
Map.addLayer(dNdvi, blueRed, 'Change (Blue-Red)', false);
```

**Use Case**: Creating publication-ready figures, matching organizational styles.

### Example 17: Side-by-Side Comparison

```javascript
// Create linked maps for before/after comparison
var leftMap = ui.Map();
var rightMap = ui.Map();

// Link the maps
var linker = ui.Map.Linker([leftMap, rightMap]);

// Add layers
leftMap.addLayer(baselineNdvi, visNdvi, 'Baseline NDVI');
rightMap.addLayer(compareNdvi, visNdvi, 'Comparison NDVI');

leftMap.centerObject(aoi, 10);

// Create split panel
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});

// Replace root with split panel
ui.root.clear();
ui.root.add(splitPanel);
```

**Use Case**: Interactive comparison, presentations, visual assessment.

### Example 18: Animated Time Series

```javascript
// Create animation of annual NDVI
var years = ee.List.sequence(2015, 2024);

var ndviImages = years.map(function(year) {
  var img = annualFirstByYearOrZero(annualNdvi, year, 'NDVI')
    .clip(aoi)
    .visualize(visNdvi);
  
  // Add year label
  var label = ee.Image.constant(0).visualize({
    palette: ['white'],
    opacity: 0
  }).paint({
    featureCollection: ee.FeatureCollection([
      ee.Feature(null, {label: ee.Number(year).format('%d')})
    ]),
    color: 'white'
  });
  
  return img.blend(label).set('system:time_start', ee.Date.fromYMD(year, 1, 1).millis());
});

var collection = ee.ImageCollection(ndviImages);

// Generate animation
print(ui.Thumbnail({
  image: collection,
  params: {
    dimensions: 512,
    region: aoi,
    crs: 'EPSG:4326',
    framesPerSecond: 2
  },
  style: {height: '400px', width: '600px'}
}));
```

**Use Case**: Visualizing temporal patterns, presentations, social media.

## Export Variations

### Example 19: Export to Asset (for Further Processing)

```javascript
// Export as Earth Engine asset instead of Google Drive
Export.image.toAsset({
  image: dNdvi.unmask(0),
  description: 'dNDVI_asset',
  assetId: 'users/yourusername/myitsone_dNDVI',
  region: aoi,
  scale: 30,
  maxPixels: 1e13
});
```

**Use Case**: Multi-step workflows, sharing within Earth Engine, integration with other scripts.

### Example 20: Export with Cloud Optimized GeoTIFF (COG)

```javascript
// Export as COG for better performance
Export.image.toCloudStorage({
  image: dNdvi.unmask(0),
  description: 'dNDVI_COG',
  bucket: 'your-gcs-bucket',
  fileNamePrefix: 'myitsone/dNDVI',
  region: aoi,
  scale: 30,
  maxPixels: 1e13,
  formatOptions: {
    cloudOptimized: true
  }
});
```

**Use Case**: Large datasets, web mapping, cloud-based workflows.

### Example 21: Export Multiple Bands Together

```javascript
// Combine multiple indices into single multi-band image
var multiband = baselineNdvi
  .addBands(compareNdvi.rename('NDVI_compare'))
  .addBands(dNdvi)
  .addBands(dNbr)
  .addBands(dNdwi);

Export.image.toDrive({
  image: multiband.unmask(0),
  description: 'Myitsone_multiband_analysis',
  region: aoi,
  scale: 30,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});
```

**Use Case**: Comprehensive analysis, reducing number of files, band math in GIS.

### Example 22: Export Time Series as Collection

```javascript
// Export each year separately for time series analysis
var exportYears = ee.List.sequence(2015, 2024);

exportYears.getInfo().forEach(function(year) {
  var img = annualFirstByYearOrZero(annualNdvi, year, 'NDVI').clip(aoi);
  
  Export.image.toDrive({
    image: img.unmask(0),
    description: 'NDVI_' + year,
    folder: 'Myitsone_TimeSeries',
    region: aoi,
    scale: 30,
    maxPixels: 1e13
  });
});
```

**Use Case**: Detailed temporal analysis, external time series software, machine learning.

---

## Tips for Using Examples

1. **Start Simple**: Begin with basic examples before attempting advanced ones
2. **Test Small**: Use small AOIs first to verify code works
3. **One Change at a Time**: Modify one parameter at a time to understand effects
4. **Save Versions**: Keep working versions of your scripts
5. **Comment Your Code**: Add notes about what each modification does
6. **Check Console**: Always verify collections and images in Console before exporting

## Common Modifications Checklist

When adapting examples, remember to update:
- [ ] AOI coordinates
- [ ] Date ranges (startYear, endYear)
- [ ] Baseline and comparison periods
- [ ] Scale parameter (if changing resolution)
- [ ] Export descriptions and file names
- [ ] Visualization parameters (min/max values)
- [ ] File paths or asset IDs

---

**Need More Examples?**

- Check the [Earth Engine Examples Gallery](https://developers.google.com/earth-engine/tutorials)
- Browse [Community Scripts](https://code.earthengine.google.com/?accept_repo=users/gena/packages)
- Ask questions in [Earth Engine Forum](https://groups.google.com/g/google-earth-engine-developers)

**Last Updated**: December 2025  
**Maintainer**: Tin Ko Oo, Mahidol University
