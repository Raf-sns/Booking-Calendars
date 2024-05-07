## Booking Calendars
A very very lightweight JavaScript library to display calendars of your online reservations.
This library is very fast and was designed to avoid exponential redundancies.

**See on this page :**

[How to use it](#how-to-use-it-)

[App Documentation](#app-documentation-)

[Example of the Options object](#example-of-the-options-object-)

[About Booking Calendars CSS](#about-booking-calendars-css-)

[Example](#example-)

[License](#license-)

[Disclaimer](#disclaimer-)


![Booking Calendars in action](/images/Screenshot_1.png)

### How to use it ?
1. Copy or download **Booking_Calendars.min.js** in `dist/Booking_Calendars.min.js`
2. Add the CSS part of the library located in `dist/Booking_Calendars.min.css` in the `<head>...</head>` of your website.
3. In the code of your HTML page create a tag `<div id="Booking_Calendars_Container"></div>`.
4. Add the library using a `<script>` tag just before closing the `</body>` tag in your HTML code like this: `<script src="JS/Booking_Calendars.min.js">< /script>` if you placed the library in a `JS` folder or modify the file path according to your convenience.
5. Create a JavaScript file that you will place below that of the library to adjust the options that you will pass to the function as well as the HTML element to target which will be the calendar container.
6. Initialize the function with the 2 parameters: The HTML element and the options object and you will obtain your calendars with reserved periods and free periods.
 ex. :
Target the HTML element who will contain the calendars:
 `var Element = document.getElementById('Booking_Calendars_Container');`
 Set options to pass to the function:
`var Options = { ... };`
Run the library:
`Booking_calendars(Element, Options);`

### App Documentation :

Function **Booking_calendars(Element, Options);**
| Parameter | Description |
| :--- | :--- |
| `Element` | Target **one** HTML element which will be the container for the calendars. ex. `var Element = document.getElementById('Booking_Calendars_Container');`  |
| `Options` | An object that sets the options of the library|

Object **Options = { };**
| Property | Value |
| :--- | :--- |
|`names_months`|An array containing the names of the months of the year, according to the desired language. ex.: `['January', 'February', 'March', 'April','May', 'June','July', 'August','September', 'October', 'November', 'December']` |
`names_days` | An Array containing the first letters of the names of the days of the week, depending on the desired language. ex.: `['M', 'T', 'W', 'T', 'F', 'S', 'S']` |
`months_range` | The desired monthly range, in array with 2 digits, if you want to display only a monthly range. ex. `[0,6]` to display only the first six months of the year. Pass here `false` as a parameter if you want to display all months of the year. |
`year` | Year as a 4-character string ex. `'2024'` or `false` to display calendars for the current year. |
`booked_dates` | An array of reserved date objects with 2 parameters: `date_start` and `date_end`, manage to obtain this data from your database, or pass it raw in the table ex.: `[ {date_start: '2024-03-01',date_end: '2024-03-04',},{start_date: '2024-03-04',date_end: '2024-03-08',}, ... ]`. **Note:** Dates formats must respect the `yyyy-mm-dd` format, like a classic date format in a database. |

### Example of the Options object :
```
var Options = {
    // set month names
	names_months: [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	],
	// set day names
	names_days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
	// false or array of numbers: ex. [0,6] -> only first 6 months
	months_range: false, // [3,9] || false
	// year to process: Year in string 'yyyy' OR false for current year
	year: '2024', // 'yyyy' || false
	// objects array of booked dates
	booked_dates : [
    {
      date_start : '2024-03-01',
      date_end : '2024-03-04',
    },
    {
      date_start : '2024-03-04',
      date_end : '2024-03-08',
    },
    {
      date_start : '2024-04-01',
      date_end : '2024-04-04',
    },
    {
      date_start : '2024-04-06',
      date_end : '2024-04-09',
    }
    ]
};
// end Options for Booking_Calendars
```
### About Booking Calendars CSS :

You will find two CSS files for the libray, one minified and the other non-minified in `dist/Booking_Calendars.css` and `dist/Booking_Calendars.min.css`.
With the exception of the `#Booking_Calendars_Container` directive which styles the calendars container, other CSS declarations are all prefixed with the `BC-` prefix to avoid collisions.
Feel free to modify the application's CSS file as you see fit in terms of colors, cell size, and characters.

### Example :

Download the `example` folder and open the index.html file with your favorite browser, you will see an example where the days are reserved every other day.
In the `JS/main.js` script you will have an overview of the `Options` Array object and in the `JS/Booking_calendars.js` file you will be able to see the non-minified library code.

### License :

Under GNU AGPL license - Free - Open Source - Share your changes with the community - Credit the author.

### Disclaimer :

**This code comes without any warranty.**

**Please report any bugs you encounter.**

**Any contribution is welcome !**

###

❤ Developed by @Raf-sns - [Raphaël Castello / SNS - Web et informatique](https://sns.pm)
