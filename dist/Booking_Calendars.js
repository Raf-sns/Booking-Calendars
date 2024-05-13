/**
 * function Booking_calendars( Element, Options );
 * @Copyright Raphaël Castello - 24/12/2023
 * @License: AGPL-3.0
 * @Organisation SNS - Web et informatique
 * @Web www.sns.pm
 * Vanilla javaScript for display reserved dates in calendars
 * Version: 3.0.0 (13/05/2024) [dd/mm/yyyy]
 */


/**
 * Booking_calendars( Element, Options );
 * @param {string} Element HTML element to display calendars
 * @param {object} Options Object of options
 */
const Booking_calendars = (Element, Options) => {


	// Year is defined ?
	Options.year =
		(!Options.year) ? (new Date()).getFullYear() : Options.year;

	/**
	 * function Date_from_DB( date );
	 * transform a date in DB format into a Date object
	 * @param {string} date
	 */
	const Date_from_DB = (date) => {

		let Splitted = date.split('-');

		let Db_date =
			new Date(parseInt(Splitted[0]),
				parseInt(Splitted[1]) - 1,
				parseInt(Splitted[2]));

		Db_date.setHours(0, 0, 0, 0);

		return Db_date;
	};
	/**
	 * end function Date_from_DB( date );
	 */

	// index of array Optionsions.booked_dates
	let Datas_index = 0;

	/**
	 * function Watch_Booked( DateObj );
	 * function which checks if a day is booked
	 * @param {object} DateObj JS Date Object
	 */
	const Watch_Booked = (DateObj) => {

		// array of CSS classes to return
		let ClassList = [];

		// loop through booked datas
		for (; Datas_index < Options.booked_dates.length; Datas_index++) {


			// return Date object from booked_dates
			let Date_DB_start =
				Date_from_DB(Options.booked_dates[Datas_index].date_start);
			let Date_DB_end =
				Date_from_DB(Options.booked_dates[Datas_index].date_end);


			if (DateObj.getTime() == Date_DB_start.getTime()) {

				ClassList.push('BC-booked', 'BC-start');
			}

			if (DateObj.getTime() == Date_DB_end.getTime()) {

				ClassList.push('BC-booked', 'BC-end');
			}

			if (DateObj.getTime() > Date_DB_start.getTime() &&
				DateObj.getTime() < Date_DB_end.getTime()) {

				ClassList.push('BC-booked');
			}

			// do not iterate over other dates - saving exponential processes
			if (Date_DB_end.getTime() > DateObj.getTime()) {

				break;
			}

		}
		// end loop through datas

		// don't push classes  "start" and "end" at the same time
		if (ClassList.indexOf('BC-start') != -1 &&
			ClassList.indexOf('BC-end') != -1) {

			// empty array
			ClassList.length = 0;
			// push only .booked
			ClassList.push('BC-booked');
		}

		return ClassList;
	};
	/**
	 * end function Watch_Booked( DateObj );
	 */


	// define a range of months with a range if necessary
	// !note: slice() exclude the 2nd parameter
	let Array_months = (!Options.months_range) ?
		Options.names_months :
		Options.names_months.slice(Options.months_range[0], Options.months_range[1] + 1);

	let Current_month = Options.names_months.indexOf(Array_months[0]);
	let Calendar,
		Day_week,
		Day_week_base,
		Month,
		Month_name_tr,
		Month_name_th,
		Day,
		Day_process,
		Days_names_tr,
		Day_name_td,
		Day_tr,
		Day_td,
		Previous_days,
		Days_left,
		Prev_date,
		Next_date,
		Booked;

	// loop all months
	for (var i = 0; i < Array_months.length; i++) {

		// create one Calendar
		Calendar = document.createElement('table');
		Calendar.classList.add('BC-style_calendar');

		// create name month row
		Month_name_tr = document.createElement('tr');

		// create th name month colspan="7"
		Month_name_th = document.createElement('th');
		Month_name_th.setAttribute('colspan', '7');
		Month_name_th.classList.add('BC-month_name');
		Month_name_th.innerText = Array_months[i] + ` ` + Options.year;

		// append month th to row name month
		Month_name_tr.appendChild(Month_name_th);
		// append month name row to Calendar
		Calendar.appendChild(Month_name_tr);

		// create Days_names_tr row
		Days_names_tr = document.createElement('tr');
		// append Days_names_tr to Calendar
		Calendar.appendChild(Days_names_tr);

		// create the names of the days of the week
		for (var d = 0; d < Options.names_days.length; d++) {

			// create day name
			Day_name_td = document.createElement('td');
			Day_name_td.classList.add('BC-days_names');
			Day_name_td.innerText = Options.names_days[d];

			// append day name to Days_names_tr row
			Days_names_tr.appendChild(Day_name_td);
		}
		// end create the names of the days of the week

		// create frist day of month
		Day = 1;
		Day_process = new Date(Options.year, Current_month, Day);
		Day_process.setHours(0, 0, 0, 0);
		Month = Day_process.getMonth();
		Day_week = Day_process.getDay();
		Day_week_base = Day_process.getDay();

		// days row
		Day_tr = document.createElement('tr');

		// calcul previous days
		Previous_days = (Day_week_base == 0) ? 6 : Day_week_base - 1;

		// add days of previous month
		for (var pd = Previous_days; pd > 0; pd--) {

			// set prev. date
			Prev_date = new Date(Options.year, Current_month, (Day - pd));
			Prev_date.setHours(0, 0, 0, 0);

			Day_td = document.createElement('td');
			Day_td.classList.add('BC-day', 'BC-day_left');
			Day_td.innerText = Prev_date.getDate();
			Day_tr.appendChild(Day_td);
		}
		// end add days of previous month

		// test current month
		while (Current_month == Month) {

			// create new day td
			Day_td = document.createElement('td');
			Day_td.classList.add('BC-day');
			Day_td.innerText = Day_process.getDate();

			// watch if this day is booked
			Booked = Watch_Booked(Day_process);

			// if booked
			if (Booked.length != 0) {

				// add classes if booked '.BC-start', 'BC-end', 'BC-booked'
				Booked.forEach((item, i) => {

					Day_td.classList.add(item);
				});
			}
			// end if booked

			// append one day in current row
			Day_tr.appendChild(Day_td);

			// append new days row
			Calendar.appendChild(Day_tr);

			// increment day && set new Date
			Day++;
			Day_process.setDate(Day);
			Day_process.setHours(0, 0, 0, 0);

			// test new month for empty last days left
			if (Month != Day_process.getMonth()) {

				// empty last days new month
				if (Day_week != 0) {

					// calcul nb days left
					Days_left = 7 - Day_week;

					// append days left to last current row
					for (var dl = 0; dl < Days_left; dl++) {

						// set next date
						Next_date = new Date(Options.year, Month, (Day + dl));
						Next_date.setHours(0, 0, 0, 0);

						// insert days of new month
						Day_td = document.createElement('td');
						Day_td.classList.add('BC-day', 'BC-day_left');
						Day_td.innerText = Next_date.getDate();
						Day_tr.appendChild(Day_td);
					}
					// end for append days left
				}
				// empty last days new month
			}
			// end test new month for empty last days left

			// set month
			Month = Day_process.getMonth();

			// set day of the week
			Day_week = Day_process.getDay();

			// if day week = 1 -> Monday -> set new days row
			if (Day_week == 1) {

				// create new row days
				Day_tr = document.createElement('tr');
			}

		}
		// end while : Current_month == Month


		// add new month
		Current_month++;


		// append one calendar to element container
		Element.appendChild(Calendar);

	}
	// end loop all months

}
/**
 * end Booking_calendars( Element, Options );
 */
