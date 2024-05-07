
// here is a script to populate the Options.booked_dates array
var year = 2024;
var month = 0;
var day = 1;

var Booking_Dates = [];
var Date_act = new Date( year, month, day )

var rep = false;

var date_start;
var date_end;

for (var i = 1; i <= 366; i++) {

    if( i%1 == 0 ){

        Date_act = new Date( year, month, i );

        let m = Date_act.getMonth();

        m = m+1;
        m = ( m < 10 ) ? '0'+m : ''+m;
        // console.log( m );

        let d = Date_act.getDate();
        d = ( d < 10 ) ? '0'+d : ''+d;
        // console.log( d );


        if( rep == false ){

          date_start = ''+year+'-'+m+'-'+d+'';
          rep = true;
        }
        else{

          date_end = ''+year+'-'+m+'-'+d+'';
          rep = false;

          Booking_Dates.push( {
            date_start : date_start,
            date_end : date_end,
          } );
        }
    }

}
// end example

// show booking dates in the console
console.log(Booking_Dates);


// HTML element to insert calendars into
var Element = document.getElementById('Booking_Calendars_Container');

/**
 * Options for Booking_Calendars
 * Object for build booking calendars
 */
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
	booked_dates: Booking_Dates,
  // booked_dates : [
  //   {
  //     date_start : '2024-03-01',
  //     date_end : '2024-03-04',
  //   },
  //   {
  //     date_start : '2024-03-04',
  //     date_end : '2024-03-08',
  //   },
  //   {
  //     date_start : '2024-04-01',
  //     date_end : '2024-04-04',
  //   },
  //   {
  //     date_start : '2024-04-06',
  //     date_end : '2024-04-09',
  //   },
  //   {
  //     date_start : '2024-04-09',
  //     date_end : '2024-04-14',
  //   },
  //   {
  //     date_start : '2024-05-01',
  //     date_end : '2024-05-08',
  //   }
  // ]
};
/**
 * end Options for Booking_Calendars
 */

// Run the function !
Booking_calendars(Element, Options);
