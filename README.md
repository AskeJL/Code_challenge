# ForeFlight Code Challenge: Airport Weather app

## Introduction
All major airports in the world have an ICAO code; It's a 4 character string uniquly identifiying an airport that
is used in aviation to plan flights. A few examples:
 - Odense Airport has the ICAO code: "EKOD",
 - Copenhagen Airport has the ICAO code: "EKCH",
 - John F. Kennedy International Airport (New York, US) has the ICAO code: "KJFK",

The _weather_ is an important part of flight planning and airports emit a report of the current and future weather conditions at its location.
This is standardized in the format of a METAR and TAF. A METAR describes the _current_ weather for the next hour (and are thus updated once per hour),
while a TAF describes the _forecast_ (i.e. expected) weather for the next ~24-30 hours and updated 4 times a day.

The weather reports describe in detail a lot of different characteristics of the weather; important ones are:
 - visibility,
 - tempeature,
 - pressure,
 - wind conditions (speed and direction),

The _time_ that the report was emitted and/or updated is also relevant.

In the following problems we want you to create a small app that allows the user
to lookup weather reports for any airport. You are provided with a REST API
that takes the ICAO code of an airport as input and returns the weather data as JSON:

    https://api.foreflight.com/weather/report/{ICAO}

(Note: all requests must inlude in the header: `x-ff-coding-exercise=true`)

Examples:

    https://api.foreflight.com/weather/report/EKOD
    https://api.foreflight.com/weather/report/KJFK

The JSON response looks like:

    {
      "report": {
        "conditions": {
          ...
        },
        "forecast": {
          ...,
          "conditions": [
            ...
          ]
        },
        "windsAloft": {}, // not used
        "mos": {} // not used
      }
    }

The current conditions (METAR) are found under `conditions`.
The future weather conditions (TAF) are found under `forecast`. The forecast contains itself an array of `conditions`,
corresponding to the (expected) weather conditions at smaller time intervals (e.g. 6 hours).

Note that there might be cases where an airport does not emit a weather report,
or where the weather report has some data missing.
We assume that the user knows the ICAO code of the airport(s) that they want to
examine.

More examples of ICAO codes for testing: EKBI EHAM LFPG EGLL KAUS KLAX OMDB YSSY

## Problems

For this code challenge we want you to code a small app. Our own app _Dispatch_ consists of an Angular frontend written in TypeScript
and a C# backend in .NET.
Ideally we would like to see you solve these problems using the same stack, but if you are not familiar with those technologies and limited
on time you are free to create the app in a different stack of your choosing. Our recommended fallback of choice would be something like
[Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor).

We have provided an Angular template for the frontend to get you started. It is setup with a proxy to bypass CORS and set the correct headers
when making requests to the provided API endpoint and includes an example of how to call the API in `weather.component.ts` (at `/weather`), and
a small test to verify that it works as intended.

---

### Problem 1

#### 1.1

Create a page (e.g. at `weather/metar`) to view _current_ weather conditions at an airport (i.e. the METAR).
The page should contain an input field to enter the ICAO code.

#### 1.2

Create a _new_ page (e.g. at `weather/taf`), similar to the previous one, with the ability to view the _future_ weather conditions
at an airport (i.e. the TAF).

#### 1.3

Create yet another page (e.g. at `weather/full`) where you can view both the METAR and TAF for any airport.

### Problem 2

#### 2.1
Call the API from your backend instead of the frontend.

#### 2.2
Let's imagine that the API for fetching the weather report was rather slow and
had to query some IO internally before sending the response back to you.
Simulate a response time of roughly 2 seconds by adding a delay when calling the provided weather API.

It's a good idea to give users an idea that the server is doing some heavy lifting and that they should wait patiently for content.
Add some loading text/icon/animation to your app when waiting for responses.

#### 2.3
Address the issue with slow weather retrieval by adding a _caching mechanism_.

#### 2.4
Add a mechanism to see and access previous lookups performed by the user in the UI. 

#### 2.5
Since some airports do _not_ report METAR or TAFs (or do not always do), we might in some cases want to instead show the weather of a nearby
airport if one exists within some fixed distance.

Use the table below to _simulate_ a function or internal API that _may_ provide an identifier of a nearby airport given any airport identifier:

    airport | nearby airport
    -------------------------
    EKHG    | EKKA
    EKGE    |             
    EKST    | EKOD
    EKVH    | EKYT

Use your nearby airport function to show nearby weather in your app for airports that do not have any.

Make sure your implementation do not return any weather for airports with identifier EKHG, EKGE, EKST, or EKVH
(just to make sure they do not begin publishing weather reports all of a sudden).

---

### Inspiration

Here's a little inspiration for how to show weather conditions.

Current app design: https://www.youtube.com/watch?v=3q5JHpb8wm0&t=302s .

Current web design:

![Weather at EKRK](/weather_ekrk.png)
