import { select, templates, settings } from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';


class Booking {
    constructor(element){
        const thisBooking = this;
    
        thisBooking.render(element);
        thisBooking.initWidgets();
        thisBooking.getData();
    }

    getData(){
        const thisBooking = this;

        const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
        const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

        const params = {
            booking: [
                startDateParam,
                endDateParam,
            ],
            eventsCurrent: [
                settings.db.notRepeatParam,
                startDateParam,
                endDateParam,

            ],
            eventsRepeat: [
                settings.db.repeatParam,
                endDateParam,

            ],
        };

        //console.log('getData params', params);

        const urls = {
            booking:       settings.db.url + '/' + settings.db.booking 
                                           + '?' + params.booking.join('&'),
            eventsCurrent: settings.db.url + '/' + settings.db.event 
                                           + '?' + params.eventsCurrent.join('&'),
            eventsRepeat:  settings.db.url + '/' + settings.db.event 
                                           + '?' + params.eventsRepeat.join('&'),
        };

        fetch(urls.booking)
            .then(function(bookingsResponse){
                return bookingsResponse.json();
            })
            .then(function(bookings){
                console.log(bookings);
            });

    }
    
    render(element){
        const thisBooking = this;
    
        const generatedHTML = templates.bookingWidget();
    
        thisBooking.dom = {};
        thisBooking.dom.wrapper = element;
        thisBooking.dom.wrapper.innerHTML = generatedHTML;
        thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
        thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
        thisBooking.dom.datePickerInput = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
        thisBooking.dom.hourPickerInput = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    }
    
    initWidgets(){
        const thisBooking = this;
    
        thisBooking.peopleAmounElem = new AmountWidget(thisBooking.dom.peopleAmount);
        
        thisBooking.dom.peopleAmount.addEventListener('updated', function(){
    
        }); 
        thisBooking.hoursAmountElem = new AmountWidget(thisBooking.dom.hoursAmount);

        thisBooking.dom.hoursAmount.addEventListener('updated', function(){
    
        });
        thisBooking.datePicker = new DatePicker(thisBooking.dom.datePickerInput);
        thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPickerInput);
        
       
    }
}     

export default Booking;