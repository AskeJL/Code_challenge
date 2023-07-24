using Newtonsoft.Json;

namespace Code_challenge_backend {
    public  class WeatherData {
        [JsonProperty("report")]
        public Report Report { get; set; }
    }
    public  class Report {
        [JsonProperty("conditions")]
        public Conditions Conditions { get; set; }

        [JsonProperty("forecast")]
        public Forecast Forecast { get; set; }

        [JsonProperty("windsAloft")]
        public ReportWindsAloft WindsAloft { get; set; }
    }

    public  class Conditions {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("ident")]
        public string Ident { get; set; }

        [JsonProperty("dateIssued")]
        public string DateIssued { get; set; }

        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lon")]
        public double Lon { get; set; }

        [JsonProperty("elevationFt")]
        public long ElevationFt { get; set; }

        [JsonProperty("tempC")]
        public long TempC { get; set; }

        [JsonProperty("dewpointC")]
        public long DewpointC { get; set; }

        [JsonProperty("pressureHg")]
        public double PressureHg { get; set; }

        [JsonProperty("pressureHpa")]
        public long PressureHpa { get; set; }

        [JsonProperty("reportedAsHpa")]
        public bool ReportedAsHpa { get; set; }

        [JsonProperty("densityAltitudeFt")]
        public long DensityAltitudeFt { get; set; }

        [JsonProperty("relativeHumidity")]
        public long RelativeHumidity { get; set; }

        [JsonProperty("flightRules")]
        public string FlightRules { get; set; }

        [JsonProperty("cloudLayers")]
        public object[] CloudLayers { get; set; }

        [JsonProperty("cloudLayersV2")]
        public CloudLayer[] CloudLayersV2 { get; set; }

        [JsonProperty("weather")]
        public string[] Weather { get; set; }

        [JsonProperty("visibility")]
        public Visibility Visibility { get; set; }

        [JsonProperty("wind")]
        public ConditionsWind Wind { get; set; }
    }

    public  class CloudLayer {
        [JsonProperty("coverage")]
        public string Coverage { get; set; }

        [JsonProperty("altitudeFt")]
        public long AltitudeFt { get; set; }

        [JsonProperty("ceiling")]
        public bool Ceiling { get; set; }

        [JsonProperty("type", NullValueHandling = NullValueHandling.Ignore)]
        public string Type { get; set; }
    }

    public  class Visibility {
        [JsonProperty("distanceSm")]
        public double DistanceSm { get; set; }

        [JsonProperty("distanceQualifier")]
        public long DistanceQualifier { get; set; }

        [JsonProperty("prevailingVisSm")]
        public double PrevailingVisSm { get; set; }

        [JsonProperty("prevailingVisDistanceQualifier")]
        public long PrevailingVisDistanceQualifier { get; set; }
    }

    public  class ConditionsWind {
        [JsonProperty("speedKts")]
        public double SpeedKts { get; set; }

        [JsonProperty("variable")]
        public bool Variable { get; set; }
    }

    public  class Forecast {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("ident")]
        public string Ident { get; set; }

        [JsonProperty("dateIssued")]
        public string DateIssued { get; set; }

        [JsonProperty("period")]
        public Period Period { get; set; }

        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lon")]
        public double Lon { get; set; }

        [JsonProperty("elevationFt")]
        public long ElevationFt { get; set; }

        [JsonProperty("conditions")]
        public Condition[] Conditions { get; set; }
    }

    public  class Condition {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("dateIssued")]
        public string DateIssued { get; set; }

        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lon")]
        public double Lon { get; set; }

        [JsonProperty("elevationFt")]
        public long ElevationFt { get; set; }

        [JsonProperty("relativeHumidity")]
        public long RelativeHumidity { get; set; }

        [JsonProperty("flightRules")]
        public string FlightRules { get; set; }

        [JsonProperty("cloudLayers")]
        public CloudLayer[] CloudLayers { get; set; }

        [JsonProperty("cloudLayersV2")]
        public CloudLayer[] CloudLayersV2 { get; set; }

        [JsonProperty("weather")]
        public string[] Weather { get; set; }

        [JsonProperty("visibility")]
        public Visibility Visibility { get; set; }

        [JsonProperty("wind")]
        public ConditionWind Wind { get; set; }

        [JsonProperty("period")]
        public Period Period { get; set; }

        [JsonProperty("change", NullValueHandling = NullValueHandling.Ignore)]
        public string Change { get; set; }
    }

    public  class Period {
        [JsonProperty("dateStart")]
        public string DateStart { get; set; }

        [JsonProperty("dateEnd")]
        public string DateEnd { get; set; }
    }

    public  class ConditionWind {
        [JsonProperty("speedKts")]
        public long SpeedKts { get; set; }

        [JsonProperty("direction")]
        public long Direction { get; set; }

        [JsonProperty("from")]
        public long From { get; set; }

        [JsonProperty("variable")]
        public bool Variable { get; set; }
    }

    public  class ReportWindsAloft {
        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lon")]
        public double Lon { get; set; }

        [JsonProperty("dateIssued")]
        public string DateIssued { get; set; }

        [JsonProperty("windsAloft")]
        public WindsAloftElement[] WindsAloft { get; set; }

        [JsonProperty("source")]
        public string Source { get; set; }
    }

    public  class WindsAloftElement {
        [JsonProperty("validTime")]
        public string ValidTime { get; set; }

        [JsonProperty("period")]
        public Period Period { get; set; }

        [JsonProperty("windTemps")]
        public Dictionary<string, WindTemp> WindTemps { get; set; }
    }

    public  class WindTemp {
        [JsonProperty("directionFromTrue")]
        public long DirectionFromTrue { get; set; }

        [JsonProperty("knots")]
        public long Knots { get; set; }

        [JsonProperty("celsius")]
        public long Celsius { get; set; }

        [JsonProperty("altitude")]
        public long Altitude { get; set; }

        [JsonProperty("isLightAndVariable")]
        public bool IsLightAndVariable { get; set; }

        [JsonProperty("isGreaterThan199Knots")]
        public bool IsGreaterThan199Knots { get; set; }

        [JsonProperty("turbulence")]
        public bool Turbulence { get; set; }

        [JsonProperty("icing")]
        public bool Icing { get; set; }
    }
}
