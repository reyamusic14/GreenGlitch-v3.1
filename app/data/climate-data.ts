export interface ClimateIssueData {
  causes: string[];
  effects: string[];
  solutions: string[];
}

export interface CityClimateData {
  [issue: string]: ClimateIssueData;
}

export interface ClimateData {
  [city: string]: CityClimateData;
}

export const climateData: ClimateData = {
  "New York": {
    "Sea Level Rise": {
      causes: [
        "Global warming causing polar ice melt",
        "Thermal expansion of ocean water",
        "Subsidence of coastal land",
        "Greenhouse gas emissions from transportation and industry"
      ],
      effects: [
        "Flooding of low-lying areas like Lower Manhattan",
        "Damage to critical infrastructure including subway systems",
        "Erosion of beaches and coastal properties",
        "Saltwater intrusion into freshwater systems"
      ],
      solutions: [
        "Building sea walls and storm surge barriers",
        "Elevating critical infrastructure",
        "Creating wetlands as natural buffers",
        "Reducing carbon emissions through public transportation"
      ]
    },
    "Urban Heat Island": {
      causes: [
        "Concrete and asphalt absorbing heat",
        "Lack of green spaces and tree cover",
        "Waste heat from air conditioning and vehicles",
        "Dense building configurations trapping heat"
      ],
      effects: [
        "Higher summer temperatures than surrounding areas",
        "Increased energy consumption for cooling",
        "Heat-related illnesses and mortality",
        "Worsened air quality and smog formation"
      ],
      solutions: [
        "Green roof installations",
        "Increasing urban tree canopy",
        "Using reflective or permeable pavements",
        "Creating more parks and green spaces"
      ]
    },
    "Air Pollution": {
      causes: [
        "Vehicle emissions from heavy traffic",
        "Industrial facilities and power plants",
        "Construction dust and emissions",
        "Waste incineration"
      ],
      effects: [
        "Respiratory diseases like asthma",
        "Cardiovascular problems",
        "Reduced visibility and smog",
        "Acid rain affecting buildings and ecosystems"
      ],
      solutions: [
        "Transitioning to electric vehicles",
        "Improving public transportation",
        "Implementing stricter emission standards",
        "Expanding bike lanes and pedestrian zones"
      ]
    }
  },
  "London": {
    "Flooding": {
      causes: [
        "Increased rainfall intensity due to climate change",
        "Thames River tidal surges",
        "Urban development reducing permeable surfaces",
        "Aging drainage infrastructure"
      ],
      effects: [
        "Property damage in low-lying areas",
        "Disruption to transportation networks",
        "Economic losses to businesses",
        "Contamination of water supplies"
      ],
      solutions: [
        "Thames Barrier upgrades",
        "Sustainable urban drainage systems",
        "Restoring floodplains and wetlands",
        "Flood-resistant building designs"
      ]
    },
    "Air Quality": {
      causes: [
        "Diesel vehicle emissions",
        "Domestic wood burning",
        "Construction activities",
        "Industrial processes"
      ],
      effects: [
        "Respiratory and cardiovascular diseases",
        "Reduced life expectancy",
        "Economic costs to healthcare system",
        "Damage to historic buildings and monuments"
      ],
      solutions: [
        "Ultra Low Emission Zone expansion",
        "Promoting electric vehicles and public transport",
        "Regulating construction dust",
        "Clean air walking routes"
      ]
    },
    "Heat Waves": {
      causes: [
        "Global climate change",
        "Urban heat island effect",
        "Reduced green spaces",
        "Building designs trapping heat"
      ],
      effects: [
        "Heat-related mortality, especially among elderly",
        "Strain on healthcare services",
        "Reduced productivity",
        "Infrastructure damage (e.g., rail buckling)"
      ],
      solutions: [
        "Cool roofs and green infrastructure",
        "Heat-health warning systems",
        "Cooling centers for vulnerable populations",
        "Urban planning for better air circulation"
      ]
    }
  },
  "Tokyo": {
    "Typhoons": {
      causes: [
        "Warming ocean temperatures",
        "Climate change intensifying storm systems",
        "Sea level rise increasing storm surge impacts",
        "Urban development in vulnerable coastal areas"
      ],
      effects: [
        "Flooding of subway systems and underground infrastructure",
        "Wind damage to buildings",
        "Disruption to transportation and commerce",
        "Power outages affecting millions"
      ],
      solutions: [
        "Advanced typhoon warning systems",
        "Flood-resistant infrastructure design",
        "Underground water storage facilities",
        "Evacuation planning and disaster preparedness"
      ]
    },
    "Urban Flooding": {
      causes: [
        "Intense rainfall events",
        "High percentage of impermeable surfaces",
        "Aging drainage systems",
        "River overflow during heavy rains"
      ],
      effects: [
        "Property damage in dense urban areas",
        "Transportation disruption",
        "Economic losses to businesses",
        "Contamination from sewage overflow"
      ],
      solutions: [
        "Underground cisterns like the Metropolitan Area Outer Underground Discharge Channel",
        "Permeable pavement installation",
        "River embankment improvements",
        "Water-sensitive urban design"
      ]
    },
    "Heat Stress": {
      causes: [
        "Urban heat island effect",
        "High population density",
        "Concrete and asphalt absorbing heat",
        "Climate change increasing average temperatures"
      ],
      effects: [
        "Heat-related illnesses and fatalities",
        "Reduced worker productivity",
        "Increased energy demand for cooling",
        "Worsened air quality"
      ],
      solutions: [
        "Cool pavements and rooftops",
        "Green infrastructure and urban forests",
        "Misting systems in public spaces",
        "Adjusted working hours during extreme heat"
      ]
    }
  },
  "Mumbai": {
    "Monsoon Flooding": {
      causes: [
        "Intense seasonal rainfall",
        "Encroachment on natural drainage systems",
        "Inadequate stormwater infrastructure",
        "Deforestation of mangroves and watersheds"
      ],
      effects: [
        "Widespread urban flooding",
        "Disruption to transportation and daily life",
        "Disease outbreaks from contaminated water",
        "Economic losses to businesses and property"
      ],
      solutions: [
        "Restoring mangrove forests",
        "Upgrading drainage systems",
        "Implementing early warning systems",
        "Restricting development in flood-prone areas"
      ]
    },
    "Coastal Erosion": {
      causes: [
        "Sea level rise",
        "Removal of natural coastal barriers",
        "Sand mining",
        "Construction of coastal structures altering sediment flow"
      ],
      effects: [
        "Loss of beaches and coastal land",
        "Damage to coastal properties and infrastructure",
        "Increased vulnerability to storm surges",
        "Saltwater intrusion into groundwater"
      ],
      solutions: [
        "Beach nourishment programs",
        "Construction of sea walls and breakwaters",
        "Restoring mangroves and coastal vegetation",
        "Managed retreat from highly vulnerable areas"
      ]
    },
    "Air Pollution": {
      causes: [
        "Vehicle emissions",
        "Industrial activities",
        "Construction dust",
        "Waste burning"
      ],
      effects: [
        "Respiratory diseases",
        "Reduced visibility",
        "Acid rain damaging historical buildings",
        "Negative impacts on tourism"
      ],
      solutions: [
        "Transitioning to cleaner fuels",
        "Improving public transportation",
        "Enforcing emission standards",
        "Increasing green spaces"
      ]
    }
  }
};

export const climateIssues = Object.fromEntries(
  Object.entries(climateData).map(([city, issues]) => [
    city,
    Object.keys(issues)
  ])
);
