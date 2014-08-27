home-screen
===========

The idea is to have a home web page that you can customize to have different things.

I use:
======

http://anthonyterrien.com/knob/ for the timer.
https://developer.yahoo.com/yql/console/ for the RSS Reader.
http://openweathermap.org/api for the weather.

If you want to add a new tile app:
==================================

All apps are in the Apps.js file.
They are called via Apps.<app_name> like Apps.task or Apps.weather.

If you look in the html file you will see the #sidebar div that's the only thing you need to change to add an app.
Add an <li></li> element with the app name and an ID with that app name.
And add the app in the apps file. There is an app template if you want to see the barebones of an app.