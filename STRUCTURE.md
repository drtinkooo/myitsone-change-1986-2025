# Repository Structure

This document explains the organization of the Myitsone Landsat Change Detection repository.

## Directory Structure

```
myitsone-landsat-change/
├── README.md                                            # Main project overview and quick start
├── LICENSE                                              # MIT License
├── CHANGELOG.md                                         # Version history and release notes
├── CONTRIBUTING.md                                      # Contribution guidelines
├── USAGE.md                                            # Detailed usage instructions
├── METHODOLOGY.md                                      # Scientific methodology and background
├── FAQ.md                                              # Frequently asked questions
├── EXAMPLES.md                                         # Practical code examples
├── STRUCTURE.md                                        # This file
│
├── myitsone-ndvi-ndwi-nbr-change-analysis-1986-2025.js  # Main Earth Engine script
│
├── docs/                              # Additional documentation
│   ├── images/                        # Screenshots and diagrams
│   │   ├── workflow_diagram.png
│   │   ├── example_output.png
│   │   └── change_map_legend.png
│   │
│   ├── tutorials/                     # Step-by-step tutorials
│   │   ├── getting_started.md
│   │   ├── customizing_aoi.md
│   │   └── interpreting_results.md
│   │
│   └── references/                    # Scientific references and citations
│       ├── bibliography.bib
│       └── related_papers.md
│
├── examples/                          # Example scripts
│   ├── basic_usage.js
│   ├── custom_aoi.js
│   ├── seasonal_analysis.js
│   ├── elevation_stratification.js
│   ├── multi_index_analysis.js
│   └── python_version.py
│
├── outputs/                           # Example outputs (not tracked)
│   ├── .gitkeep
│   └── README.md                      # Description of expected outputs
│
├── validation/                        # Validation data and scripts
│   ├── ground_truth_points.geojson
│   ├── validation_analysis.js
│   └── accuracy_assessment.md
│
└── utils/                             # Utility scripts
    ├── batch_export.js
    ├── area_calculation.js
    └── statistics_summary.js
```

## File Descriptions

### Root Level Files

#### README.md
- **Purpose**: Main entry point for the repository
- **Audience**: All users (beginners to advanced)
- **Content**:
  - Project overview and features
  - Quick start guide
  - Data sources and methodology summary
  - Installation and requirements
  - Citation information
  - Links to detailed documentation

#### LICENSE
- **Purpose**: Legal terms for using and distributing the code
- **Type**: MIT License
- **Content**:
  - Copyright information
  - Permission notice
  - Warranty disclaimer
  - Acknowledgments for data sources

#### CHANGELOG.md
- **Purpose**: Track all notable changes to the project
- **Format**: Keep a Changelog format
- **Content**:
  - Version numbers (semantic versioning)
  - Release dates
  - Added, changed, deprecated, removed, fixed, security updates
  - Planned features

#### CONTRIBUTING.md
- **Purpose**: Guide for contributors
- **Audience**: Potential contributors
- **Content**:
  - Code of conduct
  - How to report bugs
  - How to suggest enhancements
  - Development setup
  - Coding standards
  - Pull request process

#### USAGE.md
- **Purpose**: Comprehensive usage guide
- **Audience**: Active users
- **Content**:
  - Detailed parameter explanations
  - Step-by-step workflow
  - Customization options
  - Troubleshooting guide
  - Advanced usage patterns

#### METHODOLOGY.md
- **Purpose**: Scientific background and methods
- **Audience**: Researchers and scientists
- **Content**:
  - Theoretical background
  - Data processing pipeline
  - Spectral indices detailed explanation
  - Statistical approaches
  - Quality assurance methods
  - Limitations and considerations

#### FAQ.md
- **Purpose**: Answer common questions
- **Audience**: New and intermediate users
- **Content**:
  - Setup and access questions
  - Data and coverage questions
  - Technical questions
  - Usage and customization
  - Results interpretation
  - Troubleshooting

#### EXAMPLES.md
- **Purpose**: Practical code examples
- **Audience**: Users wanting to customize
- **Content**:
  - Basic usage examples
  - Study area customization
  - Temporal analysis variations
  - Advanced analysis techniques
  - Visualization examples
  - Export variations

#### STRUCTURE.md
- **Purpose**: Explain repository organization
- **Audience**: Contributors and maintainers
- **Content**:
  - Directory structure
  - File descriptions
  - File naming conventions
  - Organization rationale

### Main Script

#### myitsone-ndvi-ndwi-nbr-change-analysis-1986-2025.js
- **Purpose**: Core Earth Engine analysis script
- **Type**: JavaScript (Earth Engine API)
- **Functionality**:
  - Load Landsat composite collections
  - Define study area (Myitsone)
  - Calculate spectral indices
  - Perform change detection
  - Generate visualizations
  - Export results

### Documentation Directory (docs/)

#### images/
**Purpose**: Visual assets for documentation

Files:
- `workflow_diagram.png`: Flowchart showing analysis pipeline
- `example_output.png`: Sample change detection map
- `change_map_legend.png`: Color scale interpretation
- `ndvi_timeseries.png`: Example time series chart
- `study_area_map.png`: Location map

**Format**: PNG (preferred) or JPG
**Guidelines**:
- Use descriptive file names
- Keep file sizes reasonable (<500 KB)
- Include attribution if using external images

#### tutorials/
**Purpose**: Step-by-step learning materials

Files:
- `getting_started.md`: First-time user tutorial
- `customizing_aoi.md`: How to change study area
- `interpreting_results.md`: Understanding outputs
- `seasonal_analysis.md`: Working with seasons
- `validation_workflow.md`: Validating results

**Format**: Markdown with code blocks and screenshots
**Guidelines**:
- Assume no prior knowledge
- Include screenshots at each step
- Provide complete code examples

#### references/
**Purpose**: Scientific citations and related work

Files:
- `bibliography.bib`: BibTeX citation file
- `related_papers.md`: Annotated bibliography
- `datasets.md`: Related datasets and sources
- `tools.md`: Related software and tools

### Examples Directory (examples/)

**Purpose**: Ready-to-run example scripts

Files:
- `basic_usage.js`: Simplest possible usage
- `custom_aoi.js`: Different study areas
- `seasonal_analysis.js`: Within-year analysis
- `elevation_stratification.js`: Topographic analysis
- `multi_index_analysis.js`: Combining indices
- `python_version.py`: Python API equivalent

**Guidelines**:
- Each file should run independently
- Include comments explaining each step
- Use consistent naming conventions
- Keep examples focused (one concept per file)

### Outputs Directory (outputs/)

**Purpose**: Store exported results (not tracked by git)

Structure:
```
outputs/
├── .gitkeep                 # Keep directory in git
├── README.md               # Describe expected outputs
├── geotiff/                # GeoTIFF exports
├── timeseries/             # CSV time series data
├── figures/                # Generated plots
└── reports/                # Analysis reports
```

**Note**: This directory is in .gitignore. Only .gitkeep and README.md are tracked.

### Validation Directory (validation/)

**Purpose**: Ground truth data and validation scripts

Files:
- `ground_truth_points.geojson`: Validation locations
- `validation_analysis.js`: Accuracy assessment script
- `accuracy_assessment.md`: Validation results
- `confusion_matrix.csv`: Classification accuracy
- `field_photos/`: Reference imagery

**Guidelines**:
- Document data collection methods
- Include metadata for validation points
- Provide accuracy metrics
- Note limitations

### Utils Directory (utils/)

**Purpose**: Helper scripts for common tasks

Files:
- `batch_export.js`: Export multiple regions
- `area_calculation.js`: Calculate change areas
- `statistics_summary.js`: Compute summary stats
- `cloud_filtering.js`: Custom cloud masks
- `coordinate_converter.js`: Coordinate transformations

**Guidelines**:
- Each utility should be modular
- Include usage examples in comments
- Test thoroughly before committing

## File Naming Conventions

### Scripts (.js, .py)
- Use lowercase with underscores: `batch_export.js`
- Be descriptive: `elevation_stratification.js` not `elev.js`
- Include file type in complex names: `validation_analysis.js`

### Documentation (.md)
- Use UPPERCASE for root level docs: `README.md`, `CONTRIBUTING.md`
- Use lowercase for subdirectory docs: `getting_started.md`
- Be descriptive but concise

### Data Files
- GeoJSON: `study_area.geojson`, `validation_points.geojson`
- CSV: `time_series_ndvi.csv`, `change_statistics.csv`
- GeoTIFF: `dNDVI_1986_1990_vs_2020_2025.tif`
- Include date ranges when relevant

### Images
- PNG preferred for screenshots and diagrams
- Use descriptive names: `workflow_diagram.png` not `fig1.png`
- Include version if updated: `map_v2.png`

## Git and Version Control

### What to Track

**Include in git**:
- All code files (.js, .py)
- Documentation (.md)
- Configuration files
- Example data (small files only)
- .gitignore and .gitkeep files

**Exclude from git** (.gitignore):
- Large data files (>10 MB)
- Personal credentials
- Temporary files
- Output files (except examples)
- IDE-specific files

### Branch Strategy

- `main`: Stable, tested code
- `develop`: Development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `docs/*`: Documentation updates

### Commit Messages

Format:
```
<type>: <short description>

<detailed description if needed>

<reference to issues if applicable>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Example:
```
feat: Add elevation stratification analysis

Implements topographic analysis using SRTM data to stratify
change detection by elevation zones. Useful for understanding
altitude-dependent changes.

Closes #15
```

## Documentation Maintenance

### Update Frequency

- **README.md**: Update with major changes
- **CHANGELOG.md**: Update with each version
- **USAGE.md**: Update when functionality changes
- **FAQ.md**: Add questions as they arise
- **EXAMPLES.md**: Add new examples periodically

### Review Schedule

- **Monthly**: Review open issues and documentation gaps
- **Quarterly**: Update examples and tutorials
- **Yearly**: Comprehensive documentation review
- **Release**: Update all version-dependent information

### Quality Checks

Before committing documentation:
- [ ] Spell check
- [ ] Grammar check
- [ ] Links work
- [ ] Code examples run
- [ ] Images display correctly
- [ ] Consistent formatting
- [ ] Up-to-date information

## Relationship Between Documents

```
README.md (Overview)
    ├─→ USAGE.md (How to use)
    ├─→ METHODOLOGY.md (Why it works)
    ├─→ EXAMPLES.md (Practical applications)
    ├─→ FAQ.md (Common questions)
    └─→ CONTRIBUTING.md (How to help)

USAGE.md
    ├─→ EXAMPLES.md (Code examples)
    └─→ FAQ.md (Troubleshooting)

METHODOLOGY.md
    └─→ docs/references/ (Citations)

EXAMPLES.md
    └─→ examples/ (Full scripts)

CONTRIBUTING.md
    ├─→ STRUCTURE.md (Organization)
    └─→ CODE_OF_CONDUCT.md (Behavior)
```

## Growing the Repository

### Adding New Features

1. Create feature branch
2. Implement feature with tests
3. Add documentation:
   - Update USAGE.md
   - Add to EXAMPLES.md
   - Create tutorial if complex
   - Update CHANGELOG.md
4. Submit pull request
5. Update README.md after merge

### Adding New Examples

1. Create example script in `examples/`
2. Test thoroughly
3. Add to EXAMPLES.md with description
4. Include in README.md example list
5. Create tutorial if needed

### Adding New Documentation

1. Identify documentation need
2. Create appropriate document
3. Link from relevant existing docs
4. Update STRUCTURE.md
5. Announce in CHANGELOG.md

## Questions?

If repository structure is unclear:
- Check this file (STRUCTURE.md)
- Review CONTRIBUTING.md
- Open a GitHub Discussion
- Contact maintainers

---

**Last Updated**: December 2025  
**Maintainer**: Tin Ko Oo, Mahidol University
