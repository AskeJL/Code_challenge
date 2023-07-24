using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System;
using System.Collections.Generic;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Code_challenge_backend.Controllers {
    
    [ApiController]
    public class ForecastController : ControllerBase {

        [Route("[controller]/GetMetar")]
        [HttpGet] public async Task< IActionResult> GetMetar(string airportString) {

            try {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri("https://api.foreflight.com/weather/report/");
                Console.WriteLine(airportString);
                var request = new HttpRequestMessage(HttpMethod.Get, GetAirportString(airportString));
                request.Headers.Add("x-foreflight-odense", "true");
                Console.WriteLine(request.ToString());
                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();

                // Here you can process the response body as needed
                // For example, you can deserialize the JSON response if it's JSON data.
                // You might need to create models to represent the data structure.
                var weatherData = JsonConvert.DeserializeObject<WeatherData>(responseBody);
                Console.WriteLine(weatherData.Report.Conditions);
                return Ok(weatherData.Report.Conditions);
                
            } catch (HttpRequestException ex) {
                // Handle any exceptions that might occur during the HTTP request
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [Route("[controller]/GetTaf")]
        [HttpGet]
        public async Task<IActionResult> GetTaf(string airportString) {

            try {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri("https://api.foreflight.com/weather/report/");
                Console.WriteLine(airportString);
                var request = new HttpRequestMessage(HttpMethod.Get, GetAirportString(airportString));
                request.Headers.Add("x-foreflight-odense", "true");
                Console.WriteLine(request.ToString());
                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();

                // Here you can process the response body as needed
                // For example, you can deserialize the JSON response if it's JSON data.
                // You might need to create models to represent the data structure.
                var weatherData = JsonConvert.DeserializeObject<WeatherData>(responseBody);
                Console.WriteLine(weatherData.Report.Forecast);
                return Ok(weatherData.Report.Forecast);

            } catch (HttpRequestException ex) {
                // Handle any exceptions that might occur during the HTTP request
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [Route("[controller]/GetFull")]
        [HttpGet]
        public async Task<IActionResult> GetFull(string airportString) {

            try {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri("https://api.foreflight.com/weather/report/");
                Console.WriteLine(airportString);
                var request = new HttpRequestMessage(HttpMethod.Get, GetAirportString(airportString));
                request.Headers.Add("x-foreflight-odense", "true");
                Console.WriteLine(request.ToString());
                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();

                // Here you can process the response body as needed
                // For example, you can deserialize the JSON response if it's JSON data.
                // You might need to create models to represent the data structure.
                var weatherData = JsonConvert.DeserializeObject<WeatherData>(responseBody);
                Console.WriteLine(weatherData.Report.Forecast);
                return Ok(weatherData.Report);

            } catch (HttpRequestException ex) {
                // Handle any exceptions that might occur during the HTTP request
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        private string GetAirportString(string s) {
            if (s == "EKHG") {
                return "EKKA";
            } else if (s == "EKST") {
                return "EKOD";
            } else if (s == "EKVH") {
                return "EKYT";
            } else {
                return s;
            }
        }
    }
}
