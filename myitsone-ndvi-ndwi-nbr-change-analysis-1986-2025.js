// Google Earth Engine (Code Editor) script
// Myitsone (Kachin, Myanmar) — Landsat change detection (1986–2025)
//
// Uses Earth Engine's on-the-fly Landsat composites (median composites with strict QA filtering):
// - SR:   LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL
// - NDVI: LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL_NDVI
// - NBR:  LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL_NBR
// - NDWI: LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL_NDWI
//
// Outputs:
// - Period-to-period change maps (dNDVI, dNBR, dNDWI)
// - Long-term NDVI trend (slope)
// - Annual mean NDVI/NBR/NDWI time series over AOI

// ----------------------------
// AOI (Myitsone area)
// ----------------------------
var aoi = ee.Geometry.Polygon(
  [[[97.317581, 25.495967],
    [97.317581, 25.88579],
    [97.733002, 25.88579],
    [97.733002, 25.495967],
    [97.317581, 25.495967]]],
  null,
  false
);

Map.centerObject(aoi, 10);
Map.addLayer(aoi, {color: 'FF2D55'}, 'AOI', true);

// ----------------------------
// Parameters
// ----------------------------
var startYear = 1986;
var endYear = 2025; // if you want “to present”, set to new Date().getFullYear()

// Change detection via period averages (recommended for robustness).
// Inclusive years.
var baselineStartYear = 1986;
var baselineEndYear = 1990;

var compareStartYear = 2020;
var compareEndYear = 2025;

// Single-year comparison (optional quick check)
var fromYear = 2000;
var toYear = 2025;

function ymd(year, month, day) {
  return ee.Date.fromYMD(year, month, day);
}

function yearWindowStart(year) {
  return ymd(year, 1, 1);
}

function yearWindowEndExclusive(year) {
  return ymd(year + 1, 1, 1);
}

function periodStart(yearStartInclusive) {
  return yearWindowStart(yearStartInclusive);
}

function periodEndExclusive(yearEndInclusive) {
  return yearWindowEndExclusive(yearEndInclusive);
}

// ----------------------------
// Collections
// ----------------------------
var annualSr = ee.ImageCollection('LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL')
  .filterBounds(aoi)
  .filterDate(periodStart(startYear), periodEndExclusive(endYear));

var annualNdvi = ee.ImageCollection('LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL_NDVI')
  .filterBounds(aoi)
  .filterDate(periodStart(startYear), periodEndExclusive(endYear));

var annualNbr = ee.ImageCollection('LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL_NBR')
  .filterBounds(aoi)
  .filterDate(periodStart(startYear), periodEndExclusive(endYear));

var annualNdwi = ee.ImageCollection('LANDSAT/COMPOSITES/C02/T1_L2_ANNUAL_NDWI')
  .filterBounds(aoi)
  .filterDate(periodStart(startYear), periodEndExclusive(endYear));

print('Annual SR composites', annualSr);
print('Annual NDVI composites', annualNdvi);
print('Annual NBR composites', annualNbr);
print('Annual NDWI composites', annualNdwi);

function annualFirstByYearOrZero(ic, year, bandName) {
  var filtered = ic.filterDate(yearWindowStart(year), yearWindowEndExclusive(year));

  var empty = ee.Image.constant(0)
    .rename([bandName])
    .set('system:time_start', yearWindowStart(year).millis());

  return ee.Image(ee.Algorithms.If(filtered.size().gt(0), filtered.first(), empty));
}

function annualMeanByPeriodOrZero(ic, yearStartInclusive, yearEndInclusive, bandName) {
  var filtered = ic.filterDate(periodStart(yearStartInclusive), periodEndExclusive(yearEndInclusive));

  var empty = ee.Image.constant(0)
    .rename([bandName])
    .set('system:time_start', periodStart(yearStartInclusive).millis());

  var mean = filtered.mean();

  return ee.Image(
    ee.Algorithms.If(filtered.size().gt(0), mean.select([bandName]), empty)
  );
}

// ----------------------------
// Visualizations
// ----------------------------
var visFalseColor = {
  bands: ['swir1', 'nir', 'green'],
  min: 0.0,
  max: 0.4
};

var visNdvi = {min: 0.0, max: 1.0, palette: ['#8B0000', '#FEE08B', '#1A9850']};
var visNbr = {min: -1.0, max: 1.0, palette: ['#8B0000', '#FEE08B', '#1A9850']};
var visNdwi = {min: -1.0, max: 1.0, palette: ['#8B0000', '#FEE08B', '#2B83BA']};

var visDiff = {
  min: -0.3,
  max: 0.3,
  palette: ['#762A83', '#F7F7F7', '#1B7837']
};

// ----------------------------
// Period-to-period change detection
// ----------------------------
var baselineSr = ee.Image(
  annualSr.filterDate(periodStart(baselineStartYear), periodEndExclusive(baselineEndYear)).mean()
).clip(aoi);

var compareSr = ee.Image(
  annualSr.filterDate(periodStart(compareStartYear), periodEndExclusive(compareEndYear)).mean()
).clip(aoi);

var baselineNdvi = annualMeanByPeriodOrZero(annualNdvi, baselineStartYear, baselineEndYear, 'NDVI').clip(aoi);
var compareNdvi = annualMeanByPeriodOrZero(annualNdvi, compareStartYear, compareEndYear, 'NDVI').clip(aoi);
var dNdvi = compareNdvi.subtract(baselineNdvi).rename('dNDVI');

var baselineNbr = annualMeanByPeriodOrZero(annualNbr, baselineStartYear, baselineEndYear, 'NBR').clip(aoi);
var compareNbr = annualMeanByPeriodOrZero(annualNbr, compareStartYear, compareEndYear, 'NBR').clip(aoi);
var dNbr = compareNbr.subtract(baselineNbr).rename('dNBR');

var baselineNdwi = annualMeanByPeriodOrZero(annualNdwi, baselineStartYear, baselineEndYear, 'NDWI').clip(aoi);
var compareNdwi = annualMeanByPeriodOrZero(annualNdwi, compareStartYear, compareEndYear, 'NDWI').clip(aoi);
var dNdwi = compareNdwi.subtract(baselineNdwi).rename('dNDWI');

Map.addLayer(baselineSr, visFalseColor, 'Baseline SR (false color) ' + baselineStartYear + '–' + baselineEndYear, false);
Map.addLayer(compareSr, visFalseColor, 'Compare SR (false color) ' + compareStartYear + '–' + compareEndYear, false);

Map.addLayer(dNdvi, visDiff, 'dNDVI (compare - baseline)', true);
Map.addLayer(dNbr, visDiff, 'dNBR (compare - baseline)', false);
Map.addLayer(dNdwi, visDiff, 'dNDWI (compare - baseline)', false);

// ----------------------------
// Single-year change (quick compare)
// ----------------------------
var ndviFrom = annualFirstByYearOrZero(annualNdvi, fromYear, 'NDVI').clip(aoi);
var ndviTo = annualFirstByYearOrZero(annualNdvi, toYear, 'NDVI').clip(aoi);
var dNdviYears = ndviTo.subtract(ndviFrom).rename('dNDVI_' + fromYear + '_' + toYear);
Map.addLayer(dNdviYears, visDiff, 'dNDVI ' + fromYear + ' → ' + toYear, false);

// ----------------------------
// Long-term trend (NDVI slope)
// ----------------------------
var ndviWithTime = annualNdvi.map(function (img) {
  var year = ee.Date(img.get('system:time_start')).get('year');
  var t = ee.Image.constant(ee.Number(year).subtract(startYear)).rename('t').toFloat();
  return img.select('NDVI').toFloat().addBands(t)
    .copyProperties(img, ['system:time_start']);
});

var fit = ndviWithTime.select(['t', 'NDVI']).reduce(ee.Reducer.linearFit());
var slope = fit.select('scale').rename('NDVI_slope_per_year').clip(aoi);

var visSlope = {
  min: -0.01,
  max: 0.01,
  palette: ['#762A83', '#F7F7F7', '#1B7837']
};

Map.addLayer(slope, visSlope, 'NDVI trend slope (per year)', false);

// ----------------------------
// Time series (AOI mean)
// ----------------------------
print(ui.Chart.image.series({
  imageCollection: annualNdvi.select('NDVI'),
  region: aoi,
  reducer: ee.Reducer.mean(),
  scale: 90,
  xProperty: 'system:time_start'
}).setOptions({
  title: 'Annual mean NDVI (AOI) — Landsat composites',
  vAxis: {title: 'NDVI'},
  hAxis: {title: 'Year'},
  lineWidth: 2,
  pointSize: 3
}));

print(ui.Chart.image.series({
  imageCollection: annualNbr.select('NBR'),
  region: aoi,
  reducer: ee.Reducer.mean(),
  scale: 90,
  xProperty: 'system:time_start'
}).setOptions({
  title: 'Annual mean NBR (AOI) — Landsat composites',
  vAxis: {title: 'NBR'},
  hAxis: {title: 'Year'},
  lineWidth: 2,
  pointSize: 3
}));

print(ui.Chart.image.series({
  imageCollection: annualNdwi.select('NDWI'),
  region: aoi,
  reducer: ee.Reducer.mean(),
  scale: 90,
  xProperty: 'system:time_start'
}).setOptions({
  title: 'Annual mean NDWI (AOI) — Landsat composites',
  vAxis: {title: 'NDWI'},
  hAxis: {title: 'Year'},
  lineWidth: 2,
  pointSize: 3
}));

// ----------------------------
// Exports
// ----------------------------
Export.image.toDrive({
  image: dNdvi.unmask(0),
  description: 'Myitsone_dNDVI_' + baselineStartYear + '_' + baselineEndYear + '_vs_' + compareStartYear + '_' + compareEndYear,
  region: aoi,
  scale: 30,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

Export.image.toDrive({
  image: dNbr.unmask(0),
  description: 'Myitsone_dNBR_' + baselineStartYear + '_' + baselineEndYear + '_vs_' + compareStartYear + '_' + compareEndYear,
  region: aoi,
  scale: 30,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

Export.image.toDrive({
  image: dNdwi.unmask(0),
  description: 'Myitsone_dNDWI_' + baselineStartYear + '_' + baselineEndYear + '_vs_' + compareStartYear + '_' + compareEndYear,
  region: aoi,
  scale: 30,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

Export.image.toDrive({
  image: slope.unmask(0),
  description: 'Myitsone_NDVI_slope_' + startYear + '_' + endYear,
  region: aoi,
  scale: 30,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

