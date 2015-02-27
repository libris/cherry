(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * Easing
 * Bezier and easing functions based on Robert Penner's Easing Functions
 * Example usage for function: Easing('easeOutQuart')
 * For bezier curve use Easing.bez('easeOutQuart')
 * To convert a bezier curve to function use toFunction: Easing.toFunction([0.165, 0.84, 0.44, 1])
 */

!function(a,i,n,o){o=i.length&&typeof require=="function"?function(e,t,n){n=[];for(t=0;t<i.length;t++){n.push(require(i[t].toLowerCase()))}return e.apply(null,n)}(n):n.apply(this,i.map(function(j){return this[j]},this));if(typeof module=="object"){module.exports=o}else if(typeof define=="function"){define(i,n)}else{this[a]=o}}.call
(this, 'Easing', [], function() {

  var easings = {
    'linear':         [0.250, 0.250, 0.750, 0.750],
    'ease':           [0.250, 0.100, 0.250, 1.000],
    'easeIn':         [0.420, 0.000, 1.000, 1.000],
    'easeOut':        [0.000, 0.000, 0.580, 1.000],
    "easeInOut":      [0.420, 0.000, 0.580, 1.000],
    "easeInQuad":     [0.550, 0.085, 0.680, 0.530],
    "easeInCubic":    [0.550, 0.055, 0.675, 0.190],
    "easeInQuart":    [0.895, 0.030, 0.685, 0.220],
    "easeInQuint":    [0.755, 0.050, 0.855, 0.060],
    "easeInSine":     [0.470, 0.000, 0.745, 0.715],
    "easeInExpo":     [0.950, 0.050, 0.795, 0.035],
    "easeInCirc":     [0.600, 0.040, 0.980, 0.335],
    "easeInBack":     [0.600, -0.280, 0.735, 0.045],
    "easeOutQuad":    [0.250, 0.460, 0.450, 0.940],
    "easeOutCubic":   [0.215, 0.610, 0.355, 1.000],
    "easeOutQuart":   [0.165, 0.840, 0.440, 1.000],
    "easeOutQuint":   [0.230, 1.000, 0.320, 1.000],
    "easeOutSine":    [0.390, 0.575, 0.565, 1.000],
    "easeOutExpo":    [0.190, 1.000, 0.220, 1.000],
    "easeOutCirc":    [0.075, 0.820, 0.165, 1.000],
    "easeOutBack":    [0.175, 0.885, 0.320, 1.275],
    "easeInOutQuad":  [0.455, 0.030, 0.515, 0.955],
    "easeInOutCubic": [0.645, 0.045, 0.355, 1.000],
    "easeInOutQuart": [0.770, 0.000, 0.175, 1.000],
    "easeInOutQuint": [0.860, 0.000, 0.070, 1.000],
    "easeInOutSine":  [0.445, 0.050, 0.550, 0.950],
    "easeInOutExpo":  [1.000, 0.000, 0.000, 1.000],
    "easeInOutCirc":  [0.785, 0.135, 0.150, 0.860],
    "easeInOutBack":  [0.680, -0.550, 0.265, 1.550]
  }

  var validate = function(type) {
    if (!type)
      return easings.linear // allows Easing()

    if ( !easings.hasOwnProperty(type) )
      throw 'Easing '+type+' not found.'

    return easings[type]
  }

  var toFunction = function(bez) {
    var polyBez = function(p1, p2) {
      var A = [null, null], B = [null, null], C = [null, null]
      var bezCoOrd = function(t, ax) {
        C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax]
        return t * (C[ax] + t * (B[ax] + t * A[ax]))
      }
      var xDeriv = function(t) {
        return C[0] + t * (2 * B[0] + 3 * A[0] * t)
      }
      var xForT = function(t) {
        var x = t, i = 0, z
        while (++i < 14) {
          z = bezCoOrd(x, 0) - t
          if (Math.abs(z) < 1e-3) 
            break
          x -= z / xDeriv(x)
        }
        return x
      }
      return function(t) {
        return bezCoOrd(xForT(t), 1)
      }
    }
    return function(x, t, b, c, d) {
      return c * polyBez([bez[0], bez[1]], [bez[2], bez[3]])(t/d) + b
    }
  }

  var easing = function(type) {
    return toFunction(validate(type))
  }
  easing.bez = function(type) {
    return validate(type)
  }
  
  easing.toFunction = toFunction

  return easing
})
},{}],2:[function(require,module,exports){
/*
 * Lipsum
 * Create random lipsum words, sentences or paragraphs
 * First & second arguments defines a range, f.ex Lipsum.word(2,6) returns minimum 2 and maximum 6 words.
 */

!function(a,i,n,o){o=i.length&&typeof require=="function"?function(e,t,n){n=[];for(t=0;t<i.length;t++){n.push(require(i[t].toLowerCase()))}return e.apply(null,n)}(n):n.apply(this,i.map(function(j){return this[j]},this));if(typeof module=="object"){module.exports=o}else if(typeof define=="function"){define(i,n)}else{this[a]=o}}.call
(this, 'Lipsum', [], function() {

  var words = 'lorem ipsum dolor sit amet consectetur adipiscing elit ut eget turpis dolor id elementum urna sed arcu magna accumsan volutpat tristique eu rhoncus at lectus quisque lacus ante semper in feugiat vitae commodo non mauris quisque vel sem sem maecenas pellentesque ultrices tristique fusce nibh enim porta in convallis id consequat quis purus fusce iaculis enim id mauris mollis id accumsan ipsum sagittis quisque in pharetra magna integer a mattis mauris nulla condimentum molestie massa a malesuada diam rutrum vel suspendisse fermentum lacus id erat volutpat cursus donec at felis ante eget cursus risus nunc in odio nec mi gravida rutrum nec pulvinar turpis quisque id tellus sem nunc sed dui quis mi tristique viverra'.split(' ')
  var endings = "................................??!"

  var rand = function( len ) {
    return Math.floor( Math.random() * len )
  }
  var range = function( min, max ) {
    return rand( max - min + 1 ) + min
  }
  var capitalize = function( word ) {
    return word.substr(0,1).toUpperCase() + word.substr(1)
  }
  var word = function() {
    return words[rand(words.length)]
  }
  var ending = function() {
    var i = rand(endings.length)
    return endings.substring(i, i+1)
  }

  return {

    words: function( min, max, cap ) {
      min = min || 1

      if ( min < 1 )
        return ''

      if ( max === true ) {
        cap = true
        max = undefined
      }
      if ( typeof max == 'number' )
        min = range(min, max)

      var text = cap ? capitalize(word()) : word()

      while( min-- )
        text += word() + ' '

      return text.replace(/^\s+|\s+$/g, '')
    },

    sentences: function( min, max ) {
      min = min || 8

      if ( min < 1 )
        return ''

      if ( typeof max == 'number' )
        min = range(min, max)

      var text = capitalize( word() )
      var comma = rand(2) ? rand( min-1 ) : false

      while( min-- )
        text += word() + (( comma && comma === min ) ? ', ' : ' ')

      return text.replace(/\s+/,' ').substr(0, text.length-2) + '.'
    },

    paragraphs: function( min, max ) {
      min = min || 40
      if ( min < 1 )
        return ''

      if ( min < 8 )
        return this.sentences( min )

      if ( typeof max == 'number' )
        min = range(min, max)

      var sentences = Math.floor(min/8)
      var rest = min - (sentences * 8)
      var text = ''

      while( sentences-- )
        text += this.sentences( 8 ) + ' '

      if ( rest )
        return text + this.sentences(rest)
      else
        return text.substr(0, text.length-2)
    }
  }
})


},{}],3:[function(require,module,exports){
/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function (root, factory)
{
    'use strict';

    var moment;
    if (typeof exports === 'object') {
        // CommonJS module
        // Load moment.js as an optional dependency
        try { moment = require('moment'); } catch (e) {}
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req)
        {
            // Load moment.js as an optional dependency
            var id = 'moment';
            moment = req.defined && req.defined(id) ? req(id) : undefined;
            return factory(moment);
        });
    } else {
        root.Pikaday = factory(root.moment);
    }
}(this, function (moment)
{
    'use strict';

    /**
     * feature detection and helper functions
     */
    var hasMoment = typeof moment === 'function',

    hasEventListeners = !!window.addEventListener,

    document = window.document,

    sto = window.setTimeout,

    addEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.addEventListener(e, callback, !!capture);
        } else {
            el.attachEvent('on' + e, callback);
        }
    },

    removeEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.removeEventListener(e, callback, !!capture);
        } else {
            el.detachEvent('on' + e, callback);
        }
    },

    fireEvent = function(el, eventName, data)
    {
        var ev;

        if (document.createEvent) {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            ev = extend(ev, data);
            el.dispatchEvent(ev);
        } else if (document.createEventObject) {
            ev = document.createEventObject();
            ev = extend(ev, data);
            el.fireEvent('on' + eventName, ev);
        }
    },

    trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    },

    hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    },

    addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    },

    removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    },

    isArray = function(obj)
    {
        return (/Array/).test(Object.prototype.toString.call(obj));
    },

    isDate = function(obj)
    {
        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    },

    isLeapYear = function(year)
    {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },

    getDaysInMonth = function(year, month)
    {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },

    setToStartOfDay = function(date)
    {
        if (isDate(date)) date.setHours(0,0,0,0);
    },

    compareDates = function(a,b)
    {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
    },

    extend = function(to, from, overwrite)
    {
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && typeof from[prop] === 'object' && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                }
                else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                } else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            } else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    },


    /**
     * defaults and localisation
     */
    defaults = {

        // bind the picker to a form field
        field: null,

        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
        bound: undefined,

        // position of the datepicker, relative to the field (default to bottom & left)
        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
        position: 'bottom left',

        // the default output format for `.toString()` and `field` value
        format: 'YYYY-MM-DD',

        // the initial date to view when first opened
        defaultDate: null,

        // make the `defaultDate` the initial selected value
        setDefaultDate: false,

        // first day of week (0: Sunday, 1: Monday etc)
        firstDay: 0,

        // the minimum/earliest date that can be selected
        minDate: null,
        // the maximum/latest date that can be selected
        maxDate: null,

        // number of years either side, or array of upper/lower range
        yearRange: 10,

        // used internally (don't config outside)
        minYear: 0,
        maxYear: 9999,
        minMonth: undefined,
        maxMonth: undefined,

        isRTL: false,

        // Additional text to append to the year in the calendar title
        yearSuffix: '',

        // Render the month after year in the calendar title
        showMonthAfterYear: false,

        // how many months are visible (not implemented yet)
        numberOfMonths: 1,

        // internationalization
        i18n: {
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
            weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        },

        // callback function
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null
    },


    /**
     * templating functions to abstract HTML rendering
     */
    renderDayName = function(opts, day, abbr)
    {
        day += opts.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    },

    renderDay = function(i, isSelected, isToday, isDisabled, isEmpty)
    {
        if (isEmpty) {
            return '<td class="is-empty"></td>';
        }
        var arr = [];
        if (isDisabled) {
            arr.push('is-disabled');
        }
        if (isToday) {
            arr.push('is-today');
        }
        if (isSelected) {
            arr.push('is-selected');
        }
        return '<td data-day="' + i + '" class="' + arr.join(' ') + '"><button class="pika-button" type="button">' + i + '</button>' + '</td>';
    },

    renderRow = function(days, isRTL)
    {
        return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
    },

    renderBody = function(rows)
    {
        return '<tbody>' + rows.join('') + '</tbody>';
    },

    renderHead = function(opts)
    {
        var i, arr = [];
        for (i = 0; i < 7; i++) {
            arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
        }
        return '<thead>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</thead>';
    },

    renderTitle = function(instance)
    {
        var i, j, arr,
            opts = instance._o,
            month = instance._m,
            year  = instance._y,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div class="pika-title">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
            arr.push('<option value="' + i + '"' +
                (i === month ? ' selected': '') +
                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled' : '') + '>' +
                opts.i18n.months[i] + '</option>');
        }
        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month">' + arr.join('') + '</select></div>';

        if (isArray(opts.yearRange)) {
            i = opts.yearRange[0];
            j = opts.yearRange[1] + 1;
        } else {
            i = year - opts.yearRange;
            j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
            if (i >= opts.minYear) {
                arr.push('<option value="' + i + '"' + (i === year ? ' selected': '') + '>' + (i) + '</option>');
            }
        }
        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year">' + arr.join('') + '</select></div>';

        if (opts.showMonthAfterYear) {
            html += yearHtml + monthHtml;
        } else {
            html += monthHtml + yearHtml;
        }

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
            prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
            next = false;
        }

        html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
        html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';

        return html += '</div>';
    },

    renderTable = function(opts, data)
    {
        return '<table cellpadding="0" cellspacing="0" class="pika-table">' + renderHead(opts) + renderBody(data) + '</table>';
    },


    /**
     * Pikaday constructor
     */
    Pikaday = function(options)
    {
        var self = this,
            opts = self.config(options);

        self._onMouseDown = function(e)
        {
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }

            if (!hasClass(target, 'is-disabled')) {
                if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty')) {
                    self.setDate(new Date(self._y, self._m, parseInt(target.innerHTML, 10)));
                    if (opts.bound) {
                        sto(function() {
                            self.hide();
                        }, 100);
                    }
                    return;
                }
                else if (hasClass(target, 'pika-prev')) {
                    self.prevMonth();
                }
                else if (hasClass(target, 'pika-next')) {
                    self.nextMonth();
                }
            }
            if (!hasClass(target, 'pika-select')) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                    return false;
                }
            } else {
                self._c = true;
            }
        };

        self._onChange = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (hasClass(target, 'pika-select-month')) {
                self.gotoMonth(target.value);
            }
            else if (hasClass(target, 'pika-select-year')) {
                self.gotoYear(target.value);
            }
        };

        self._onInputChange = function(e)
        {
            var date;

            if (e.firedBy === self) {
                return;
            }
            if (hasMoment) {
                date = moment(opts.field.value, opts.format);
                date = (date && date.isValid()) ? date.toDate() : null;
            }
            else {
                date = new Date(Date.parse(opts.field.value));
            }
            self.setDate(isDate(date) ? date : null);
            if (!self._v) {
                self.show();
            }
        };

        self._onInputFocus = function()
        {
            self.show();
        };

        self._onInputClick = function()
        {
            self.show();
        };

        self._onInputBlur = function()
        {
            if (!self._c) {
                self._b = sto(function() {
                    self.hide();
                }, 50);
            }
            self._c = false;
        };

        self._onClick = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;
            if (!target) {
                return;
            }
            if (!hasEventListeners && hasClass(target, 'pika-select')) {
                if (!target.onchange) {
                    target.setAttribute('onchange', 'return;');
                    addEvent(target, 'change', self._onChange);
                }
            }
            do {
                if (hasClass(pEl, 'pika-single')) {
                    return;
                }
            }
            while ((pEl = pEl.parentNode));
            if (self._v && target !== opts.trigger) {
                self.hide();
            }
        };

        self.el = document.createElement('div');
        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '');

        addEvent(self.el, 'mousedown', self._onMouseDown, true);
        addEvent(self.el, 'change', self._onChange);

        if (opts.field) {
            if (opts.bound) {
                document.body.appendChild(self.el);
            } else {
                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
            }
            addEvent(opts.field, 'change', self._onInputChange);

            if (!opts.defaultDate) {
                if (hasMoment && opts.field.value) {
                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                } else {
                    opts.defaultDate = new Date(Date.parse(opts.field.value));
                }
                opts.setDefaultDate = true;
            }
        }

        var defDate = opts.defaultDate;

        if (isDate(defDate)) {
            if (opts.setDefaultDate) {
                self.setDate(defDate, true);
            } else {
                self.gotoDate(defDate);
            }
        } else {
            self.gotoDate(new Date());
        }

        if (opts.bound) {
            this.hide();
            self.el.className += ' is-bound';
            addEvent(opts.trigger, 'click', self._onInputClick);
            addEvent(opts.trigger, 'focus', self._onInputFocus);
            addEvent(opts.trigger, 'blur', self._onInputBlur);
        } else {
            this.show();
        }

    };


    /**
     * public Pikaday API
     */
    Pikaday.prototype = {


        /**
         * configure functionality
         */
        config: function(options)
        {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                setToStartOfDay(opts.minDate);
                opts.minYear  = opts.minDate.getFullYear();
                opts.minMonth = opts.minDate.getMonth();
            }
            if (opts.maxDate) {
                setToStartOfDay(opts.maxDate);
                opts.maxYear  = opts.maxDate.getFullYear();
                opts.maxMonth = opts.maxDate.getMonth();
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function(format)
        {
            return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function()
        {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function(date, preventOnSelect)
        {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function()
        {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function(date, preventOnSelect)
        {
            if (!date) {
                this._d = null;
                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
                max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function(date)
        {
            if (!isDate(date)) {
                return;
            }
            this._y = date.getFullYear();
            this._m = date.getMonth();
            this.draw();
        },

        gotoToday: function()
        {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function(month)
        {
            if (!isNaN( (month = parseInt(month, 10)) )) {
                this._m = month < 0 ? 0 : month > 11 ? 11 : month;
                this.draw();
            }
        },

        nextMonth: function()
        {
            if (++this._m > 11) {
                this._m = 0;
                this._y++;
            }
            this.draw();
        },

        prevMonth: function()
        {
            if (--this._m < 0) {
                this._m = 11;
                this._y--;
            }
            this.draw();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function(year)
        {
            if (!isNaN(year)) {
                this._y = parseInt(year, 10);
                this.draw();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function(value)
        {
            this._o.minDate = value;
        },

        /**
         * change the maxDate
         */
        setMaxDate: function(value)
        {
            this._o.maxDate = value;
        },

        /**
         * refresh the HTML
         */
        draw: function(force)
        {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth;

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            this.el.innerHTML = renderTitle(this) + this.render(this._y, this._m);

            if (opts.bound) {
                this.adjustPosition();
                if(opts.field.type !== 'hidden') {
                    sto(function() {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                var self = this;
                sto(function() {
                    self._o.onDraw.call(self);
                }, 0);
            }
        },

        adjustPosition: function()
        {
            var field = this._o.trigger, pEl = field,
            width = this.el.offsetWidth, height = this.el.offsetHeight,
            viewportWidth = window.innerWidth || document.documentElement.clientWidth,
            viewportHeight = window.innerHeight || document.documentElement.clientHeight,
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
            left, top, clientRect;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top  = pEl.offsetTop + pEl.offsetHeight;
                while((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top  += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if (left + width > viewportWidth ||
                (
                    this._o.position.indexOf('right') > -1 &&
                    left - width + field.offsetWidth > 0
                )
            ) {
                left = left - width + field.offsetWidth;
            }
            if (top + height > viewportHeight + scrollTop ||
                (
                    this._o.position.indexOf('top') > -1 &&
                    top - height - field.offsetHeight > 0
                )
            ) {
                top = top - height - field.offsetHeight;
            }
            this.el.style.cssText = [
                'position: absolute',
                'left: ' + left + 'px',
                'top: ' + top + 'px'
            ].join(';');
        },

        /**
         * render HTML for a particular month
         */
        render: function(year, month)
        {
            var opts   = this._o,
                now    = new Date(),
                days   = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data   = [],
                row    = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var cells = days + before,
                after = cells;
            while(after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            for (var i = 0, r = 0; i < cells; i++)
            {
                var day = new Date(year, month, 1 + (i - before)),
                    isDisabled = (opts.minDate && day < opts.minDate) || (opts.maxDate && day > opts.maxDate),
                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                    isToday = compareDates(day, now),
                    isEmpty = i < before || i >= (days + before);

                row.push(renderDay(1 + (i - before), isSelected, isToday, isDisabled, isEmpty));

                if (++r === 7) {
                    data.push(renderRow(row, opts.isRTL));
                    row = [];
                    r = 0;
                }
            }
            return renderTable(opts, data);
        },

        isVisible: function()
        {
            return this._v;
        },

        show: function()
        {
            if (!this._v) {
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                }
                removeClass(this.el, 'is-hidden');
                this._v = true;
                this.draw();
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function()
        {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.cssText = '';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function()
        {
            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (this._o.field) {
                removeEvent(this._o.field, 'change', this._onInputChange);
                if (this._o.bound) {
                    removeEvent(this._o.trigger, 'click', this._onInputClick);
                    removeEvent(this._o.trigger, 'focus', this._onInputFocus);
                    removeEvent(this._o.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;

}));

},{"moment":"iROhDJ"}],4:[function(require,module,exports){
var Backbone = require('backbone')

//
// Works around issue introduced in Backbone 1.1 by https://github.com/jashkenas/backbone/pull/2766
//
// This file is unnecessary under Backbone 1.0 and earlier.
//
// Note that https://github.com/jashkenas/backbone/pull/2890 should hopefully make this irrevelant
//
Backbone.History.prototype.navigate = function(fragment, options) {
  /*jshint curly:false */
  if (!Backbone.History.started) return false;
  if (!options || options === true) options = {trigger: !!options};

  var url = this.root + (fragment = this.getFragment(fragment || ''));

  // Removed from the upstream impl:
  // Strip the fragment of the query and hash for matching.
  // fragment = fragment.replace(pathStripper, '');

  if (this.fragment === fragment) return;
  this.fragment = fragment;

  // Don't include a trailing slash on the root.
  if (fragment === '' && url !== '/') url = url.slice(0, -1);

  // If pushState is available, we use it to set the fragment as a real URL.
  if (this._hasPushState) {
    this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

  // If hash changes haven't been explicitly disabled, update the hash
  // fragment to store history.
  } else if (this._wantsHashChange) {
    this._updateHash(this.location, fragment, options.replace);
    if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
      // Opening and closing the iframe tricks IE7 and earlier to push a
      // history entry on hash-tag change.  When replace is true, we don't
      // want this.
      if(!options.replace) this.iframe.document.open().close();
      this._updateHash(this.iframe.location, fragment, options.replace);
    }

  // If you've told us that you explicitly don't want fallback hashchange-
  // based history, then `navigate` becomes a page refresh.
  } else {
    return this.location.assign(url);
  }
  if (options.trigger) return this.loadUrl(fragment);
};
},{"backbone":"5kFNoY"}],5:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var Router = require('vdd/router')
var Query = require('vdd/query')
var VDD = require('vdd/vdd')
var models = require('vdd/models')
var HomeComponent = require('./home')
var SearchComponent = require('./search')
var SortComponent = require('./sort')
var ResultsComponent = require('./results')
var FiltersComponent = require('./filters')
var DetailComponent = require('./detail')
var ModalComponent = require('./modal')
var ZoomComponent = require('./zoom')
var PaginationComponent = require('./pagination')
var _ = require('underscore')
var $ = require('jquery')
var moment = require('moment')
var Piwik = require('vdd/piwik')

var LoginComponent = require('./login')

module.exports = React.createClass({displayName: 'exports',

  cachedQuery: '',

  getInitialState: function() {
    return { 
      url: 'loading',
      urlParams: [],
      move: true,
      popOut: false
    }
  },

  getBackboneModels: function() {
    return ['results', 'detail', 'responsedata']
  },

  componentDidMount: function() {

    // listen for backbone changes and force update
    for( var inst in models ) {
      models[inst].on('add change remove reset', function() {
        this.forceUpdate()
      }, this )
    }

    // Set event listener on document
    $('body').on('click.popout', this.togglePopOut)
  },

  componentWillUnmount: function() {
    for( var inst in models )
      models[inst].off(null, null, this)

    $('body').off('click.popout')
  },

  loadMore: function() {
    if (!Query.get('q'))
      return
    Query.set({ page: ~~Query.get('page') + 1 })
    Router.navigate(Query.build(), {trigger: true})
  },

  closeModalHandler: function() {
    this.setProps({
      modal:null
    })
  },

  moveFlagHandler: function(bool) {
    this.setState({
      move: bool
    })
  },

  loginHandler: function( e ) {
    //console.log('Open login');
    Piwik.trackClick('Login', 'Open dialog')
    VDD.login()
  },

  togglePopOut: function( e ) {
    var $clickTarget = $( e.target )
    if ( this.state.popOut ) {
        Piwik.trackClick('Popout', 'Hide')
      // Popout is open, check if click happened outside
      if ( !$clickTarget.closest('.popout').length ){
        this.setState( { popOut: false } )
      } 
    } else {
      // Poput is closed, check if click target was user header
      if ( $clickTarget.closest('.userbutton').length ){ 
        this.setState( { popOut: true } )
        Piwik.trackClick('Popout', 'Show')
      }
    }
  },

  goToFavourites: function( e ) {
    Piwik.trackClick('Goto', 'Favourites')
    this.setState( { popOut: false } )
    var targetData = $( e.currentTarget ).data()
    if ( targetData.url ) {
      Router.navigate( targetData.url + '/?q=:favourites', true )
    } else {
      Router.navigate('/?q=:favourites', true)
    }
  },

  goToSearch: function( e ) {
    Piwik.trackClick('Goto', 'Search')
    var targetData = $( e.currentTarget ).data()
    var q=targetData.url.split('&')[0];q=q.substr(4);
    // Concatenating event action Clicked with query string because of a limitation in piwik which prevents us from drilling down from Category->Action->Name. Can only drill down two levels
    Piwik.trackClick('Händelser i pressen', q)
    if ( targetData.url ) {
      this.setState( { popOut: false } )
      Router.navigate( targetData.url, true )
    }
  },

  goToHome: function( e ) {
    Piwik.trackClick('Goto', 'Home')
    this.setState( { popOut: false } )
    Router.navigate( '/', true )
  },

  logout: function(e) {
    Piwik.trackClick('Logout')
    e.preventDefault()
    models.user.logout()
    Router.navigate('/', true)
  },

  toggleFree: function(e) {
    e.target.checked ?
      Query.set({ freeonly: 1 }) :
      Query.remove('freeonly')
    Router.navigate('/' + Query.build(), {trigger: true})
  },
  
  render: function() {

    // rendering logic based on state goes here

    var hits = models.responsedata.get('hits')
    var q = Query.get('q')
    var from = Query.get('from')
    var to = Query.get('to')
    var newspaper = Query.get('newspaper')
    var i = hits && hits > 0 ? hits.toString() : 'inga'
    var newspaperFiltered = ( newspaper )
      ? (
        React.DOM.span({className: "newspaper"},  ' i ' + newspaper + ' ')
      )
      : null
    var timeFiltered = ( from && to )
      ? moment( from ).isSame( to )
        ? (
          React.DOM.span({className: "date"},  ' ' + from + ' ')
        )
        : (
          React.DOM.span({className: "range"}, ' mellan ', React.DOM.span({className: "date"}, from ), ' och ', React.DOM.span({className: "date"}, to ), ' ')
        )
      : null
    var detail = null
    var next
    var prev
    var filters
    var main
    var self = this
    var user = null
    var isFree = Number( Query.get('freeonly') )

    hits = models.responsedata.get('firstRun')
      ? React.DOM.div(null, "Antal tidningssidor: ", i) 
      : React.DOM.div(null, "Din sökning på ", React.DOM.strong(null, q), newspaperFiltered, timeFiltered, " gav ", i, " ", hits == 1 ? 'träff' : 'träffar', ".")

    freeonlybutton = models.responsedata.get('firstRun') ? null : (
      React.DOM.label({id: "freeonly"}, 
        React.DOM.input({type: "checkbox", id: "freeonly", checked: isFree, onChange: this.toggleFree}), 
        React.DOM.span({className: "icon"}, React.DOM.i({className: "fa fa-check"})), 
        React.DOM.span({className: "text"}, "Visa endast fritt material")
      )
    )

    if ( !q )
      hits = React.DOM.div(null)

    var userName = models.user.get('username')
    if ( !userName ) {
      user = (
        React.DOM.div({id: "user", onClick: this.loginHandler}, 
          React.DOM.div({className: "login"}, "Se favoriter ", React.DOM.i({className: "fa fa-star"}))
        )
      )
    } else {
      var favourites = models.user.get('userdata').favourites.map(function( fav, index ) {
        if ( index < 2 ) {
          var isInternal = true
          var fields = fav._source
          var img = (fields && '@id' in fields) ? fields['@id'] + '_mini.' + (window.HOME || fav.copyright_free ? 'jpg' : 'svg') : '#'
          return (
            React.DOM.li({onClick: self.goToFavourites, key: fav.url, 'data-url': fav.url, 'data-query': fav.query}, 
              React.DOM.img({src: img}), 
              React.DOM.div({className: "info"}, 
                React.DOM.h2(null, fields.newspaper.title.toLowerCase()), 
                fields.issue.issued
              )
            )
          )
        }
      }, this)

      var userClass = this.state.popOut ? 'open' : ''

      user = (
        React.DOM.div({id: "user", className: userClass}, 
          React.DOM.div({className: "loggedin-as"}, 
            React.DOM.span(null, "Inloggad som: ", React.DOM.strong(null, userName)), 
            React.DOM.a({className: "logout", href: "#", onClick: this.logout}, "Logga ut ", React.DOM.i({className: "fa fa-sign-out"}))
          ), 
          React.DOM.div({className: "userbutton"}, 
            React.DOM.div({className: "favs"}, favourites.length, React.DOM.i({className: "fa fa-star"}))
          ), 
          React.DOM.div({className: "popout"}, 
            React.DOM.ul(null, favourites), 
            React.DOM.button({onClick: this.goToFavourites}, "Till mina favoriter", React.DOM.i({className: "fa fa-chevron-right"}))
          )
        )
      )
    }

    switch( this.state.url ) {

      case 'home':
        main = HomeComponent({
          goToSearch: this.goToSearch
        })
        break

      case 'detail':
        var results = models.results
        if ( results.length ) {
          var current = VDD.buildPermaLink(this.state.urlParams)
          results.forEach(function(result, i) {
            if( result.getFields()['@id'] == current ) {
              next = results.at(i+1)
              prev = results.at(i-1)
            }
          }, this)
        }
        detail = DetailComponent({
          next: next,
          prev: prev,
          move: this.state.move,
          setMoveFlag: this.moveFlagHandler,
          urlParams: this.state.urlParams
        })
        break
        
      case '404':
        detail = React.DOM.h1(null, "404")
        break
    }

    var head = (
      React.DOM.div({id: "head"}, 
        React.DOM.h1({className: "homelink", onClick: this.goToHome}, "Sök bland svenska dagstidningar"), 
        SearchComponent(null), 
        freeonlybutton, 
        FiltersComponent(null), 
        React.DOM.div({className: "block extras"}, 
          React.DOM.div({className: "stats"}, hits), 
          SortComponent(null)
        )
      )
    )

    if ( Query.get('q') == ':favourites' )
      head = (
        React.DOM.div({className: "favhead"}, 
          React.DOM.button({onClick: this.goToHome}, 
            React.DOM.i({className: "fa fa-chevron-left"}), " Tillbaka till startsidan"
          ), 
          React.DOM.h1(null, "Mina Favoriter")
        )
      )

    main = main || (
      React.DOM.div({id: "primary", className: "search"}, 
        head, 
        detail, 
        ResultsComponent({move: this.state.move, urlParams: this.state.urlParams}), 
        PaginationComponent({responsedata: models.responsedata})
      )
    )

    var modalComponent = null
    var modal = this.props.modal
    if ( modal ) {
      modalComponent = {
        login: LoginComponent
      }[ modal.component ]({
        addfav: modal.addfav,
        onSuccess: modal.onSuccess,
        onFail: modal.onFail,
        className: modal.component,
        closeModal: this.closeModalHandler
      })
    }

    var zoom = this.props.zoom
    zoomComponent = zoom ? ZoomComponent(zoom) : null

    return (
      React.DOM.div({id: "wrap"}, 
        React.DOM.div({id: "topbar"}, 
          React.DOM.div({className: "inner"}, 
            React.DOM.div({className: "betalogo"}, React.DOM.i({className: "fa fa-bookmark-o"}), "betaversion"), 
            React.DOM.div({className: "feedback"}, React.DOM.a({href: "http://feedback.tidningar.kb.se/", target: "_blank"}, "Tyck till!")), 
            user
          )
        ), 
        main, 
        zoomComponent, 
        ModalComponent({closeHandler: this.closeModalHandler, show: !!this.props.modal}, 
          modalComponent
        ), 
        React.DOM.div({id: "loadlayer"}, React.DOM.span({className: "spinner"}))
      )
    )
  }
})

},{"./detail":6,"./filters":7,"./home":13,"./login":14,"./modal":15,"./pagination":16,"./results":18,"./search":19,"./sort":20,"./zoom":22,"jquery":"HlZQrA","moment":"iROhDJ","react":"M6d2gk","underscore":"ZKusGn","vdd/models":26,"vdd/piwik":28,"vdd/query":30,"vdd/router":31,"vdd/vdd":32}],6:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var Router = require('vdd/router')
var Query = require('vdd/query')
var $ = require('jquery')
var VDD = require('vdd/vdd')
var GalleryComponent = require('./gallery')
var TimelineComponent = require('./timeline')
var PubSub = require('vdd/pubsub')
var models = require('vdd/models')
var Piwik = require('vdd/piwik')

module.exports = React.createClass({displayName: 'exports',

  getDefaultProps: function() {
    return {
      next: null,
      prev: null
    }
  },

  getInitialState: function() {
    return {
      top: 0,
      pageNumber: null,
      calcHeight: 0
    }
  },

  nodeToken: null,

  componentDidMount: function() {

    // listen for an active result node
    this.nodeToken = PubSub.on('node', this.open)
  },

  activeNode: null,

  componentWillReceiveProps: function(props) {

    if ( this.state.pageNumber === null ) {
      var pageNumber = this.getPageNumber(VDD.buildPermaLink(this.props.urlParams))
      typeof pageNumber == 'number' && this.setState({ pageNumber: pageNumber })
    }
  },

  getHeight: function() {
    var wh = $(window).height();
  },

  open: function(e) {

    var node = e.node

    // runs when an active node is found
    // positions the detail and animates

    if ( !node || node === this.activeNode )
      return

    this.setState({
      pageNumber: null
    })

    this.activeNode = node

    var $node = $(node)
    var $elem = $(this.getDOMNode()).css('overflow','hidden')
    var $results = $('.results')
    var top = $node.data('pos')
    var height = Math.min(1000, Math.min($(window).height()-160, $(window).width()/2))
    this.setState({ calcHeight: height })
    var $arr = $(this.refs.arr.getDOMNode())

    if ( top && top !== this.state.top ) {
      var willExpand = Math.abs( top - this.state.top ) > 100
      var yPos = $(window).scrollTop()
      this.setState({
        top: top
      })

      var newPos
      $elem.height(0)

      var masonry = VDD.getMasonry()

      if(masonry) {
        masonry.matrix(function(rows) {
          var margins = []
          rows.forEach(function(cols) {

            cols.forEach(function(col, c) {
              if ( col.top+(col.height/2) > top ) {
                newPos = top+height+20
                if ( !margins.hasOwnProperty(c) )
                  margins[c] = newPos - col.top
                $(col.brick).data('extop', margins[c])
              } else {
                $(col.brick).data('extop', 0)
              }
            })
          })
          var padding = Math.max.apply(Math, margins)
          if ( !padding || !isFinite(padding) )
            padding = height
          $results.css('padding-bottom', padding)
          return rows
        })
      }

      setTimeout(function() {
        var to = top + $results.offset().top - 90
        $elem.css('overflow', 'visible')
        if ( willExpand && this.props.move ) {
          $('body,html').animate({ scrollTop: to }, 400, 'vdd')
          $elem.animate({height:height}, 400, 'vdd')
        } else {
          window.scrollTo(0, to)
          $elem.height(height)
        }

        this.props.setMoveFlag(true)
      }.bind(this), 4)
        
    } else {
      $elem.css('overflow', 'visible')
    }
  },

  componentWillUnmount: function() {
    PubSub.off(this.nodeToken)
  },

  getArrPosition: function() {
    if ( !this.activeNode )
      return -100
    return $(this.activeNode).offset().left + 100
  },

  navigate: function(model) {
    Router.navigate(VDD.parsePermaLink(model.getFields()['@id']) + '/' + Query.build(), { trigger: true })
    Piwik.trackClick('Details', 'View in fullscreen')
  },

  prevHandler: function(e) {
    e.preventDefault()
    this.props.setMoveFlag(false)
    this.props.prev && this.navigate(this.props.prev)
    Piwik.trackClick('Details', 'Pagination: Previous')
  },

  nextHandler: function(e) {
    e.preventDefault()
    this.props.setMoveFlag(false)
    this.props.next && this.navigate(this.props.next)
    Piwik.trackClick('Details', 'Pagination: Next')
  },

  quoteClickHandler: function(e) {
    this.setPageNumber(e.currentTarget.getAttribute('data-page'))
    Piwik.trackClick('Quote', e.currentTarget.getAttribute('data-page'))
  },

  setPageNumber: function(n) {
    this.setState({
      pageNumber: parseInt(n, 10)
    })
  },

  close: function() {
    //var masonry = VDD.getMasonry()
    //masonry && masonry.reset()
    $(this.getDOMNode()).animate({
      height: 0
    }, 400, 'vdd', function() {
      Router.navigate('/' + Query.build(), true)
    })
  },

  getPageNumber: function(id) {
    var pages = models.detail.getIssueList()
    if ( pages.length ) {
      for( var i=0; i<pages.length; i++ ) {
        if ( pages[i] && pages[i]._source && pages[i]._source['@id'] === id )
          return i
      }
    }
  },

  render: function() {
    var classNames = ['detail']
    var $results = $('.results')
    var m = $results.length ? $results.offset().top : 0
    var style = {
      display: this.state.top ? 'block' : 'none',
      top: this.state.top+m+10,
      height: 600
    }

    var snippets = null
    var images = []
    var hits = models.detail.getHits()
    var issue = models.detail.getIssue()
    var id = VDD.buildPermaLink(this.props.urlParams)
    var title = ''
    var date = ''
    var issues = models.detail.getIssueList()
    var highlights = {}
    if ( hits ) {
      snippets = models.detail.getHitList().map(function(hit, i) {
        if ( hit.highlight ) {
          var pageNumber = this.getPageNumber(hit._source['@id'])
          var hl = []
          var contents = hit.highlight.content.map(function(content, i) {
            hl.push(content.replace(/.*<em>(.*)<\/em>.*/, '$1'))
            if ( i && i<hit.highlight.content.length-1 )
              content += ' <b>...</b> '
            return React.DOM.span({dangerouslySetInnerHTML: { __html: content}})
          })
          var classNames = ['quote']
          highlights[pageNumber.toString()] = hl.slice(0)
          return (
            React.DOM.div({className: classNames.join(' '), 'data-page': pageNumber, onClick: this.quoteClickHandler}, 
              React.DOM.i({className: "fa fa-quote-right"}), 
              contents
            )
          )
        }
      }, this)
    }
    if ( issue ) {
      var first = models.detail.getIssueList()[0]
      if ( first ) {
        title = VDD.capitalize(first._source.newspaper.title)
        date = date || first._source.issue.issued
      }
    }
    var arrStyle = { left: this.getArrPosition() }

    /* Enable if we have image width/height
    var r = 10

    issues.forEach(function(issue) {
      console.log(issue._source)
      r = Math.min(r, issue._source.image.width/issue._source.image.height)
    })
    */

    // for now we set a temporary ratio that suits most images
    r = 0.7

    return (
      React.DOM.div({className: classNames.join(' '), style: style}, 
        React.DOM.i({className: "fa fa-caret-up arr", ref: "arr", style: arrStyle}), 
        React.DOM.div({className: 'prev' + (this.props.prev ? '' : ' disabled'), onClick: this.prevHandler}, 
          React.DOM.i({className: "fa fa-caret-left"})
        ), 
        React.DOM.div({className: 'next' + (this.props.next ? '' : ' disabled'), onClick: this.nextHandler}, 
          React.DOM.i({className: "fa fa-caret-right"})
        ), 
        React.DOM.div({className: "share"}, 
          React.DOM.i({className: "fa fa-twitter"}), 
          React.DOM.i({className: "fa fa-facebook-square"}), 
          React.DOM.i({className: "fa fa-envelope"})
        ), 
        GalleryComponent({ratio: r, highlights: highlights, setPageNumber: this.setPageNumber, pageNumber: this.state.pageNumber, calcHeight: this.state.calcHeight}), 
        React.DOM.div({className: "title"}, 
          React.DOM.strong(null, title), 
          React.DOM.span({className: "date"}, date)
        ), 
        React.DOM.div({className: "quotes"}, 
          snippets
        ), 
        React.DOM.div({className: "closer", onClick: this.close}, React.DOM.i({className: "fa fa-times"})), 
        TimelineComponent({setPageNumber: this.setPageNumber, pageNumber: this.state.pageNumber})
      )
    )
  }
})

},{"./gallery":12,"./timeline":21,"jquery":"HlZQrA","react":"M6d2gk","vdd/models":26,"vdd/piwik":28,"vdd/pubsub":29,"vdd/query":30,"vdd/router":31,"vdd/vdd":32}],7:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var FilterNewspaperComponent = require('./filters/newspaper/newspaper')
var FilterDateComponent = require('./filters/date/date')
//var FilterMapComponent = require('./filters/map/map')
//var FilterPoliticalComponent = require('./filters/political/political')
//var FilterFeaturesComponent = require('./filters/features/features')
var Query = require('vdd/query')
var Router = require('vdd/router')
var models = require('vdd/models')
var PubSub = require('vdd/pubsub')
var moment = require('moment')

var _ = require('underscore')

module.exports = React.createClass({displayName: 'exports',

  getInitialState: function() {
    return {
      more: false,
      newspaper: '',
      from: '',
      to: ''
    }
  },

  setDates: function( e ) {
    if ( e.from || e.from === '' || e.from === null ) {
      this.setState( { from: e.from } )
    }
    if ( e.to || e.to === '' || e.to === null ) {
      this.setState( { to: e.to } )
    }
  },

  filterOnDates: function( force ) {
    var self = this
    if ( moment( self.state.from ).isValid() ) {
      Query.set( { from: self.state.from } )
    } else if ( !Query.get( 'from' ) || force ) {
      Query.remove( 'from' )
    }
    if ( moment( self.state.to ).isValid() ) {
      Query.set( { to: self.state.to } )
    } else if ( !Query.get( 'to' ) || force ) {
      Query.remove( 'to' )
    }
    Query.remove('page')
    // Fetch data
    Router.navigate('/' + Query.build(), {trigger: true})
    // State is for display only, reset it now that we've got new data
    self.setState({
      from: null,
      to: null
    })
  },

  getRangeFromData: function() {
    var dates = models.responsedata.getDates().data
    var precision = models.responsedata.getDates().precision
    var from = _.min(dates, function(d){return d.term})
    var to =  _.max(dates, function(d){return d.term})
    from = moment( from.term ).startOf( precision ).format( 'YYYY-MM-DD' )
    to = moment( to.term ).endOf( precision ).format( 'YYYY-MM-DD' )
    return {
      from: from,
      to: to
    }
  },

  toggleMore: function() {
    this.setState({more: !this.state.more});
  },

  onRoute: function() {
    this.setDates({
      to: Query.get('to'),
      from: Query.get('from')
    })
  },

  componentWillMount: function() {
    Router.on('route', this.onRoute)
  },

  componentWillUnmount: function() {
    Router.off('route', this.onRoute)
  },

  render: function() {

    if ( !Query.get('q') )
      return React.DOM.div(null)

    var moreClass = this.state.more ? 'more open' : 'more'
    var newspaperDisplayData = models.responsedata.getNewspapers()

    var from = this.state.from || Query.get('from') || this.getRangeFromData().from
    var to = this.state.to || Query.get('to') || this.getRangeFromData().to

    return (
      React.DOM.div({className: "block filters"}, 
        FilterNewspaperComponent({newspaper: this.state.newspaper, displayData: newspaperDisplayData}), 
        FilterDateComponent({from: from, to: to, 
          setDates: this.setDates, filterOnDates: this.filterOnDates})
        /*  
        <div className={moreClass}>
          <div className="header" onClick={ this.toggleMore }>
            <h2>Fler filter</h2>
          </div>
          <FilterMapComponent results={this.props.results} />
          <FilterPoliticalComponent results={this.props.results} />
          <FilterFeaturesComponent results={this.props.results} />
        </div>
        */
      )
    )
  }
})
},{"./filters/date/date":8,"./filters/newspaper/newspaper":11,"moment":"iROhDJ","react":"M6d2gk","underscore":"ZKusGn","vdd/models":26,"vdd/pubsub":29,"vdd/query":30,"vdd/router":31}],8:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var _ = require('underscore')
var d3 = require('d3')
var moment = require('moment')
var pikaday = require('pikaday')
var locale = require('vdd/locale')
var responsedata = require('vdd/models').responsedata
var TimelineComponent = require('./timeline')
var swedish = require('vdd/locale')

var outerwidth = 650
var outerheight = 140

var fromPicker, toPicker
var fields, triggers

module.exports = React.createClass({displayName: 'exports',

  getInitialState: function() {
    return {
      from: this.props.from,
      to: this.props.to
    }
  },

  componentWillReceiveProps: function( props ) {
    this.setState( props )
  },

  componentDidMount: function() {
    
    var setter = this.props.setDates
    var trigger = this.props.filterOnDates
    var self = this
    var pikaDefaults = {
      i18n: swedish.pikaday,
      firstDay: 1,
      setDefaultDate: true,
      yearRange: 15
    }

    fields = {
      from: document.getElementById('fromField'),
      to: document.getElementById('toField')
    }
    triggers = {
      from: document.getElementById('fromTrigger'),
      to: document.getElementById('toTrigger')
    }

    fromPicker = new pikaday( _.extend( pikaDefaults, {
      field: fields[ 'from' ],
      trigger: triggers[ 'from' ],
      minDate: moment( '1800-01-01' ).toDate(),
      onSelect: function( date ) {
        setter( { from: moment( date ).format( 'YYYY-MM-DD' ) } )
        trigger()
      },
      onOpen: function() {
        this.setDate( self.props.from, true )
        this.setMaxDate( moment( self.props.to ).toDate() )
      }
    } ) )

    toPicker = new pikaday( _.extend( pikaDefaults, {
      field: fields[ 'to' ],
      trigger: triggers[ 'to' ],
      onSelect: function( date ) {
        setter( { to: moment( date ).format( 'YYYY-MM-DD' ) } )
        trigger()
      },
      onOpen: function() {
        this.setDate( self.props.to, true )
        this.setMinDate( moment( self.props.from ).toDate() )
      }
    } ) )

  },

  dateChange: function( target, event ) {
    // Make sure we have both from and to values in payload
    var payload = {
      from: this.props.from,
      to: this.props.to
    }
    // Then override the current
    payload[ target ] = event.target.value
    this.setState( payload )
  },

  dateFocus: function( target, event ) {
    // var DOMtarget = fields[ target ]
    // console.log( target, event );
  },

  dateBlur: function( target, event ) {
    // var DOMtarget = fields[ target ]
    // console.log( target, event );
  },

  componentWillUnmount: function() {
    toPicker.destroy()
    fromPicker.destroy()
  },

  resetDateFilter: function() {
    this.props.setDates({
      from: '',
      to: ''
    })
    // Make sure dates are reset. 
    // Fixes bug "Rensa-knappen kräver två klick..."
    var self =  this
    setTimeout( function() {
      self.props.filterOnDates( true )
    }, 4 )
  },

  render: function() {
    return (
      React.DOM.div({className: "filter date"}, 
        TimelineComponent({width: outerwidth, height: outerheight, 
          setDates: this.props.setDates, 
          filterOnDates: this.props.filterOnDates}), 
        React.DOM.div({id: "datetext"}, 
          React.DOM.label({htmlFor: "fromField"}, "Från:"), 
          React.DOM.input({type: "text", id: "fromField", autoComplete: "off", name: "from", 
            value: this.state.from, 
            onChange: this.dateChange.bind(null, 'from'), 
            onFocus: this.dateFocus.bind(null, 'from'), 
            onBlur: this.dateBlur.bind(null, 'from')}), 
          React.DOM.span({className: "icon"}, React.DOM.i({id: "fromTrigger", className: "fa fa-calendar"})), 
          React.DOM.label({htmlFor: "toField"}, "Till:"), 
          React.DOM.input({type: "text", id: "toField", autoComplete: "off", name: "to", 
            value: this.state.to, 
            onChange: this.dateChange.bind(null, 'to'), 
            onFocus: this.dateFocus.bind(null, 'to'), 
            onBlur: this.dateBlur.bind(null, 'to')}), 
          React.DOM.span({className: "icon"}, React.DOM.i({id: "toTrigger", className: "fa fa-calendar"})), 
          React.DOM.button({onClick: this.resetDateFilter}, "Rensa")
        )
      )
    )
  }
})

},{"./timeline":9,"d3":"Ub4Hh8","moment":"iROhDJ","pikaday":3,"react":"M6d2gk","underscore":"ZKusGn","vdd/locale":24,"vdd/models":26}],9:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var d3 = require('d3')
var moment = require('moment')
var range = require('moment-range')
var pikaday = require('pikaday')
var Query = require('vdd/query')
var Router = require('vdd/router')
var swedish = require('vdd/locale')
var models = require('vdd/models')
var PubSub = require('vdd/pubsub')

var margin = {top: 0, right: 10, bottom: 20, left: 0}
var width,height,
    xAxis,xax,x,
    brush,brushrect,
    context,bars,
    data,datalength,
    precision,
    barWidth,
    tooltip

// Set swedish as the default language for ticks and do some formatting
var swedishLocale = d3.locale( swedish.d3 )
var customTimeFormat = swedishLocale.timeFormat.multi([
  [ '', function(d) { return d.getMilliseconds() } ],
  [ '', function(d) { return d.getSeconds() } ],
  [ '', function(d) { return d.getMinutes() } ],
  [ '', function(d) { return d.getHours() } ],
  [ '%e %b', function(d) { return d.getDay() && d.getDate() != 1 } ],
  [ '%b %d', function(d) { return d.getDate() != 1 } ],
  [ '%b', function(d) { return d.getMonth() } ],
  [ '%Y', function(d) { return true } ]
])

var getDateString = function(dte) {
  return moment( dte ).format( 'YYYY-MM-DD' )
}

var type = function( d, i ) {
  d.term = new Date(d.term)
  d.count = +d.count
  return d
}

var brushMove = function() {
  // Get brush from and to points
  var extent = brush.extent()
  var from = extent[0]
  var to = extent[1]
  // Make sure this is not a single click inside the date canvas
  if ( !moment(from).diff(moment(to)) ) return

  // This doesn't work because the data is updated continuously during brushing or smth
  // var brushRange = moment().range( from, to )
  // bars.classed('brushed', function(d) {
  //   selected = moment( d.term ).within( brushRange )
  //   //console.log(selected);
  //   return selected
  // })

  PubSub.trigger( 'datechange', { from: getDateString( from ), to: getDateString( to ) } )
}

var brushEnd = function() {
  // Set new querystring based on selection
  var extent = brush.extent()
  
  // Make sure this is not a single click inside the date canvas
  if ( !moment(extent[0]).diff(moment(extent[1])) ) return

  // Remove selection indicator from canvas
  context.select('.brush').call(brush.clear())

  PubSub.trigger( 'dateset' )
}

var barClick = function(e){
  var start
  var end
  var barPrecision = e.prec

  start = getDateString( moment( e.term ).startOf( barPrecision ) )
  end = getDateString( moment( e.term ).endOf( barPrecision ) )

  PubSub.trigger( 'datechange', { from: start, to: end } )
  PubSub.trigger( 'dateset' )
}

var barOver = function( bar ) {
  var dateFormat
  if ( precision == 'month' ) {
    dateFormat = swedishLocale.timeFormat('%b %Y')
  } else if ( precision == 'day' ) {
    dateFormat = swedishLocale.timeFormat('%a, %d %b %Y')
  } else {
    dateFormat = swedishLocale.timeFormat('%Y')
  }
  var date = dateFormat( bar.term ) + ',<br>'
  var text = ( bar.count == 1) ? ' träff.' : ' träffar.'

  tooltip
    .html( date + bar.count + text )
    .attr( 'class', '' )
}

var barOut = function() {
  tooltip
  .attr( 'class', 'hidden' )
}

var barMove = function() {
  tooltip
    .style( 'top', ( d3.event.pageY - 20 ) + 'px')
    .style( 'left', ( d3.event.pageX + 20 ) + 'px')
}

var createChart = function( props ) {
  width = ( props ) ? props.width - margin.left - margin.right : 0
  height = ( props ) ? props.height - margin.top - margin.bottom : 0

  x = d3.time.scale().range([0, width])
  y = d3.scale.linear().range([height, 0])

  // Set swedish as tick language
  xAxis = d3.svg.axis().scale(x).orient('bottom').tickFormat( customTimeFormat )

  return function( me ) {
    me.append('defs').append('clipPath')
      .attr('id', 'clip')
    .append('rect')
      .attr('width', width)
      .attr('height', height + margin.bottom)

    context = me.append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .attr('clip-path', 'url(#clip)')

    xax = context.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')

    brush = d3.svg.brush()
      .x(x)
      .on('brush', brushMove )
      .on('brushend', brushEnd )

    brushrect = context.append('g')
      .attr('class', 'brush')
      .call(brush)
      .selectAll('rect')
      .attr('height', height)

    tooltip = d3.select('body')
      .append('div')
      .attr('id', 'tooltip')
      .attr('class', 'hidden')

    me.attr('class', 'hidden')
  }
}

var updateChart = function( props ) {
  var from = Query.get('from')
  var to = Query.get('to')
  var responseData = models.responsedata.getDates( from, to )
  var data = responseData.data
  precision = responseData.precision

  // Remove bargroups on each repaint
  d3.selectAll('.bars').remove()

  return ( data && data.length ) ? function(me) {

    var xDomain = d3.extent(data.map(function(d) { return d.term }))

    // Use domain for from and to values if they don't exist in the query string
    // In either case, we use moment to return startOf/endOf based on precision
    if ( from && to) {
      from = moment( from ).startOf( precision ).toDate()
      to = moment( to ).endOf( precision ).toDate()
    } else {
      from = moment( xDomain[0] ).startOf( precision ).toDate()
      to = moment( xDomain[1] ).endOf( precision ).toDate()
    }
  
    // Set barWidth and domain based on what precision we're on
    dateDiff = moment( to ).diff( from, precision )
    datalength = data.length || 30

    if ( precision == 'day' ) {
      // New from 2014-09-10, always use month length. Works?
      datalength = moment( from ).daysInMonth()
      // On day view, always show full month
      barWidth = ( width / datalength ) - 2
    } else {
      // Pad one [precision] unit at end of of scale
      barWidth = dateDiff ? width / ( dateDiff + 4 ) : width / (datalength + 4)
    }
    // No negative numbers
    barWidth = Math.abs( barWidth )
    
    // 2014-09-10: Remove padding, should be solved by ensureDate() in models.js
    //xDomain[1] = moment( xDomain[1] ).add( 1, precision ).toDate()
    
    x.domain( xDomain )
    y.domain( [0, d3.max(data, function(d) { return d.count })] )
    
    // Make sure we have a barWidth if all else fails
    barWidth = barWidth || 10

    // Set contextual class on xXias
    d3.select( '.x.axis' ).attr( 'transform', 'translate(' + barWidth / 2 + ',' + height + ')' )

    bargroup = context.append('g').attr('class', 'bars ' + precision)

    bars = bargroup.selectAll('.bar')
      .data( data, function(d){return d.term} )

    var dateRange = moment().range( from, to )

    bars.enter()
      .append( 'rect' )
      .attr( 'x', function(d){ return x(d.term) } )
      .attr( 'y', function(d) { return y(d.count) } )
      .attr( 'height', function(d) { return height - y(d.count) } )
      .attr( 'width', barWidth )
      .attr( 'data-date', function(d) { return d.term } )
      .attr( 'data-count', function(d) { return d.count } )
      .attr( 'class', function(d) {
        // If we're down on a single day, mark that day
        if ( moment( d.term ).isSame( from ) && moment( d.term ).isSame( to ) ) {
          return 'bar selected ' + d.prec
        } else if ( moment( d.term ).within( dateRange ) && precision == 'day' ) {
          return 'bar in-range ' + d.prec
        } else { 
          return 'bar ' + d.prec 
        }
      } )
      .on( 'click', barClick )
      .on( 'mouseover', barOver )
      .on( 'mouseout', barOut )
      .on( 'mousemove', barMove )

    // This doesn't even seem to happen, but keep it for now
    bars.exit()
      .on( 'click', null )
      .on( 'mouseover', null )
      .on( 'mouseout', null )
      .on( 'mousemove', null )
      .remove()

    me.classed('hidden', false)

    xax.transition().duration(500)
     .call(xAxis)

  } : function( me ){
    me.classed('hidden', true)
  }
}


module.exports = React.createClass({displayName: 'exports',

  dateChangeToken: null,
  dateSetToken: null,

  componentDidMount: function() {
    this.dateChangeToken = PubSub.on( 'datechange', this.props.setDates )
    this.dateSetToken = PubSub.on( 'dateset', this.props.filterOnDates )

    var node = this.getDOMNode()
    d3.select( node )
      .call( createChart( this.props ) )
  },

  componentWillUnmount: function() {
    PubSub.off(this.dateChangeToken)
    PubSub.off(this.dateSetToken)
  },

  shouldComponentUpdate: function( props ) {
    var node = this.getDOMNode()
    d3.select( node )
      .call( updateChart( props ) )
    return false
  },

  render: function() {
    return (
      React.DOM.svg({width: this.props.width, height: this.props.height})
    )
  }
})

},{"d3":"Ub4Hh8","moment":"iROhDJ","moment-range":"800T4p","pikaday":3,"react":"M6d2gk","vdd/locale":24,"vdd/models":26,"vdd/pubsub":29,"vdd/query":30,"vdd/router":31}],10:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var Router = require('vdd/router')
var Query = require('vdd/query')
var Piwik = require('vdd/piwik')

module.exports = React.createClass({displayName: 'exports',

  handleClick: function( e ) {
    e.preventDefault()
    if ( this.props.hits < 1) 
      return

    Piwik.trackClick('Newspaper', 'Filter', this.props.isactive ? 'Remove' : 'Add')
    Piwik.trackEvent('Newspaper filter', this.props.isactive ? 'Remove' : 'Add', this.props.name)

    var query = !this.props.isactive ? this.props.name : ''

    if ( query ) {
      Query.set( { newspaper: query } )        
    } else {
      Query.remove('newspaper')
    }

    Router.navigate('/' + Query.build(), {trigger: true})
  },

  render: function() {

    var classes
    var icons

    if ( this.props.hits > 0) {
      // We have hits from this newspaper, make it filterable
      // First check if it's in use already
      if ( this.props.isactive ) {
          classes = 'active'
          icons = React.DOM.i({className: "fa fa-minus-circle"})
      } else {
          classes = ''
          icons = React.DOM.i({className: "fa fa-plus-circle"})
      }
    } else {
      classes = 'disabled'
      icons = null
    }

    return (
      React.DOM.button({onClick: this.handleClick, className: classes }, 
         this.props.name, " (",  this.props.hits, ") ", icons 
      )
    )

  }
})

},{"react":"M6d2gk","vdd/piwik":28,"vdd/query":30,"vdd/router":31}],11:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var Query = require('vdd/query')
var Router = require('vdd/router')
var ButtonComponent = require('./button')
//var responsedata = require('vdd/models').responsedata

module.exports = React.createClass({displayName: 'exports',

  reset: function () {
    Query.remove('newspaper')
    Router.navigate('/' + Query.build(), {trigger: true})
  },

  render: function() {
    var newspapers = this.props.displayData || []
    var isActive
    var query = decodeURIComponent( Query.get('newspaper') )
    var buttons = newspapers.map(function( newspaper, index ) {
      isActive = newspaper.term === query
      // Make sure we show 10 newspapers tops, deal with full list elsewhere
      return ( index < 10 ) ? ButtonComponent({key: index, name:  newspaper.term, hits:  newspaper.count, isactive: isActive }) : null
    }, this)

    return (
      React.DOM.div({className: "filter newspaper"}, 
        React.DOM.div({className: "buttons"}, 
          React.DOM.button({onClick: this.reset, className:  query ? '' : 'active'}, "Alla tidningar"), 
          buttons 
        )
      )
    )
  }
})
},{"./button":10,"react":"M6d2gk","vdd/query":30,"vdd/router":31}],12:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var Query = require('vdd/query')
var VDD = require('vdd/vdd')
var Pan = require('vdd/pan')
var Router = require('vdd/router')
var $ = require('jquery')
var _ = require('underscore')
var models = require('vdd/models')
var Piwik = require('vdd/piwik')

var timer = 0

var IMAGESIZE = 512 // adjust this for larger thumbnail images
var MOVE = 150 // pixels to move for each key command

module.exports = React.createClass({displayName: 'exports',

  getInitialState: function() {
    return { loading: false }
  },

  getDefaultProps: function() {
    return {
      pages: [],
      setPageNumber: function(){}
    }
  },

  nextHandler: function(e) {
    e && e.preventDefault()
    var pages = models.detail.getIssueList()
    if ( this.props.pageNumber < pages.length-1 ) {
      this.props.setPageNumber( this.props.pageNumber+1 )
      
    }
    Piwik.trackClick('Gallery', 'Pagination: Next')
  },

  prevHandler: function(e) {
    e && e.preventDefault()
    if ( this.props.pageNumber ) {
      this.props.setPageNumber( this.props.pageNumber-1 )
    }
    Piwik.trackClick('Gallery', 'Pagination: Previous')
  },

  imageClickHandler: function(e) {

    var $img = $(e.currentTarget) 
    var pos = $img.offset()

    this.zoom(
      (e.pageX - pos.left) / $img.width(), 
      (e.pageY - pos.top) / $img.height()
    )
    Piwik.trackClick('Gallery', 'Image')
  },

  zoom: function(x, y) {
    VDD.zoom({
      x: x,
      y: y,
      highlights: this.props.highlights,
      pageNumber: this.props.pageNumber
    })
  },

  componentDidMount: function() {
    setTimeout(function() {
      //this.zoom(100,100)
    }.bind(this), 1500)
  },

  render: function() {

    var size = 'mini'
    var pages = models.detail.getIssueList()
    var image = pages[ this.props.pageNumber ]
    var img
    var highlight
    var w = 0
    var h = 0
    var isSvg = false
    
    if ( image ) {
      if ( window.HOME )
        isSvg = false
      else
        isSvg = !image.copyright_free
      var src = VDD.imgHack(image._source['@id']+'_thumb.' + (isSvg ? 'svg' : 'jpg'))
      var im = {
        style: { backgroundImage: 'url('+src+')' },
        key: +new Date(),
        ref: 'image'
      }
      if ( !isSvg )
        im.onClick = this.imageClickHandler
      img = React.DOM.div(im)
    }

    var prevclass = this.props.pageNumber === 0 ? ' disabled' : ''
    var nextclass = this.props.pageNumber === pages.length-1 ? ' disabled' : ''

    var banner
    if ( isSvg ) {
      banner = (
        React.DOM.div({className: "banner"}, 
          React.DOM.div(null, "Upphovsrättsskyddat material, kan endast läsas digitalt på Kungl. biblioteket."), 
          React.DOM.i({className: "fa fa-university"})
        )
      )
    }

    var hl = this.props.highlights[this.props.pageNumber]

    if ( hl && hl.length ) {
      var src = VDD.imgHack(image._source['@id'])
      var im = {
        style: { backgroundImage: 'url('+src+'_hits.svg?h='+encodeURIComponent(hl.join(','))+')' },
        className: 'hl',
        ref: 'highlight'
      }
      if ( !isSvg )
        im.onClick = this.imageClickHandler
      highlight = React.DOM.div(im)
    }

    // adjust image size
    if ( this.props.ratio ) {
      h = this.props.calcHeight - 100
      w = h*this.props.ratio
      var nr = Math.min(IMAGESIZE/w,IMAGESIZE/h)
      if ( nr < 1 ) {
        h *= nr
        w *= nr
      }
    }
    if ( highlight )
      highlight = React.DOM.div({className: "highlight"}, highlight)
    return (
      React.DOM.div({className: 'gimage' + (isSvg ? ' svg': ''), style: {width:w,height:h}}, 
        React.DOM.div({className: "image"}, 
          React.DOM.span({className: "spinner light"}), 
          img
        ), 
        highlight, 
        React.DOM.i({className: "left fa fa-angle-left"+prevclass, onClick: this.prevHandler}), 
        React.DOM.i({className: "right fa fa-angle-right"+nextclass, onClick: this.nextHandler}), 
        banner
      )
    )
  }
})

},{"jquery":"HlZQrA","react":"M6d2gk","underscore":"ZKusGn","vdd/models":26,"vdd/pan":27,"vdd/piwik":28,"vdd/query":30,"vdd/router":31,"vdd/vdd":32}],13:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var SearchComponent = require('./search')

module.exports = React.createClass({displayName: 'exports',

  render: function() {
    var self = this
    var latest = React.DOM.p(null, "Andras sökningar är inte tillgängligt under beta-perioden.")
    var searches = null
    var tempSearches = [
      { text: 'Olof Palme', desc: 'Vad skrev tidningarna om Olof Palme 1986?', url: '/?q=olof~1%20palme~1' }, // &from=1985-12-25&to=1986-12-24
      { text: 'Kungligt bröllop', desc: 'Hur har kungliga bröllop skildrats genom tiderna?', url: '/?q=kungligt~1%20br%C3%B6llop~1' },
      { text: 'Kvinnlig rösträtt', desc: 'Vad har skrivits om kvinnlig rösträtt?', url: '/?q=r%C3%B6str%C3%A4tt~1%20kvinnlig' }, // &from=1899-12-26&to=1930-01-24
      { text: 'Världsutställning', desc: 'Vad har skrivits om olika världsutställningar?', url: '/?q=V%C3%A4rldsutst%C3%A4llning*' },
      { text: 'Tsunami', desc: 'Vad har skrivits om tsunamis?', url: '/?q=tsunami' }, // &from=1969-01-01&to=2004-07-16
      { text: 'The Beatles', desc: ' Vad skrev tidningarna om The Beatles?', url: '/?q=beatles~2%20sverige~2' }, // &from=1962-12-30&to=1963-12-31
      { text: 'Melodifestival', desc: 'Vad skrevs om melodifestivalen?', url: '/?q=Melodifestival*' }, // &from=1983-12-25&to=1985-01-10
      { text: 'Afsegla', desc: 'Afsegla', url: '/?q=afsegla' },
      { text: 'Qvinna', desc: 'Qvinna', url: '/?q=qvinna' },
      { text: 'Y-front', desc: 'Y-front', url: '/?q=%22y-front%22' } ]

    searches  = tempSearches.map(function( search, index ) {
      return React.DOM.button({onClick: self.props.goToSearch, className: "searches", key: search.url, 'data-url': search.url}, search.text/*<i className="fa fa-star" />*/)
    })

    return (
      React.DOM.div({id: "primary"}, 
        React.DOM.div({id: "head"}, 
          React.DOM.div({className: "introduction"}, 
            React.DOM.img({src: "/static/i/reader.svg", width: "40", height: "30"}), 
            React.DOM.h1(null, "Sök bland svenska dagstidningar"), 
            React.DOM.a({href: "http://feedback.tidningar.kb.se/viewtopic.php?id=59", target: "_blank"}, "Viktig information om tjänstens nuvarande innehåll."), 
            React.DOM.p(null, "I betaversionen kan du söka i Svenska Dagbladet och Aftonbladet från start till nutid. Helt fritt material finns fram till 1863.")
          ), 
          SearchComponent(null)
        ), 
        React.DOM.div({id: "suggestions"}, 
          React.DOM.div({className: "inner"}, 
            React.DOM.div({className: "col latest"}, 
            React.DOM.h2(null, "Senaste sökningar"), 
            latest
            ), 
            React.DOM.div({className: "wide col searches"}, 
            React.DOM.h2(null, "Händelser i pressen"), 
            searches
            )
          )
        ), 
        React.DOM.div({id: "colophon"}, 
          React.DOM.div({className: "inner"}, 
            React.DOM.div({className: "col help"}, 
              React.DOM.div({className: "header"}, 
                React.DOM.i({className: "fa fa-star"}), 
                React.DOM.h1(null, "Spara dina sökningar")
              ), 
              React.DOM.p(null, "Du kan logga in och spara dina sökningar så du kan se dem hos oss på Kungl. biblioteket")
            ), 
            React.DOM.div({className: "col copyright"}, 
              React.DOM.div({className: "header"}, 
                React.DOM.i({className: "fa fa-institution"}), 
                React.DOM.h1(null, "Upphovsrätt")
              ), 
              React.DOM.p(null, "Material publicerat senare än 150 år är upphovsrättsskyddat och kan endast läsas i sin helhet på Kungl. biblioteket.")
            ), 
            React.DOM.div({className: "col logo"}, 
              React.DOM.div({className: "header"}, 
                React.DOM.img({src: "/static/i/kb-grey.svg", width: "80", height: "80"})
              ), 
              React.DOM.p(null, "Humlegårdsgatan 26,", React.DOM.br(null), 
              "Humlegården, Stockholm")
            )
          )
        )
      )
    )

  }
})

},{"./search":19,"react":"M6d2gk"}],14:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var models = require('vdd/models')
var $ = require('jquery')
var Piwik = require('vdd/piwik')

module.exports = React.createClass({displayName: 'exports',

  getInitialState: function() {
    return {
      registerError: '',
      loginError: '',
      forgotError: '',
      success: false,
      forgot: false
    }
  },

  login: function() {
    Piwik.trackEvent('Login', 'Attempt')
    models.user.login(
      this.refs.login_user.getDOMNode().value,
      this.refs.login_pass.getDOMNode().value,
      this.refs.remember.getDOMNode().checked,
      function() {
        Piwik.trackEvent('Login', 'Successful')
        var msg = 'Du har loggat in som '+models.user.get('username') + '. '
        if(this.props.addfav)
          msg += 'Din favoritmärkning har sparats.'
        this.setState({
          success: msg
        })
        this.props.onSuccess()
      }.bind(this),
      function(msg) {
        Piwik.trackEvent('Login', 'Failed', msg)
        this.setState({
          loginError: msg,
          registerError: ''
        })
        this.props.onFail(msg)
      }.bind(this)
    )
  },

  componentWillMount: function() {
    this.setState({ success: false })
  },

  componentDidMount: function() {
    setTimeout(function() {
      $(this.getDOMNode()).find('input:first').focus()
    }.bind(this), 4)
  },

  backToLogin: function() {
    Piwik.trackClick('Goto', 'Login')
    this.setState({
      forgot: false,
      success: false,
      registerError: '',
      forgotError: '',
      loginError: ''
    })
    setTimeout(function() {
      $(this.getDOMNode()).find('input:first').focus()
    }.bind(this), 4)
  },

  register: function() {
    Piwik.trackEvent('Register', 'Attempt')
    var pass = this.refs.reg_pass.getDOMNode().value
    var repeat = this.refs.reg_pass_repeat.getDOMNode().value
    if ( pass !== repeat ) {
      this.setState({
        registerError: 'Dina lösenord matchar inte',
        loginError: ''
      })
      this.refs.reg_pass.getDOMNode().focus()
      Piwik.trackEvent('Register', 'Failed', 'Dina lösenord matchar inte')
      return
    }
    Piwik.trackEvent('Register', 'Successful')
    models.user.register(
      this.refs.reg_user.getDOMNode().value,
      pass,
      function() {
        var msg = 'Registreringen är klar och du är nu inloggad. '
        if(this.props.addfav)
          msg += 'Din favoritmärkning har sparats.'
        this.setState({
          success: msg
        })
        this.props.onSuccess()
      }.bind(this),
      function(msg) {
        this.setState({
          registerError: msg,
          loginError: ''
        })
        this.props.onFail(msg)
      }.bind(this)
    )
  },

  forgot: function() {
    Piwik.trackClick('Forgot', 'Account')
    this.setState({
      success: false,
      forgot: true,
      forgotError: ''
    })
    setTimeout(function() {
      this.refs.forgot_user.getDOMNode().focus()
    }.bind(this), 10)
  },

  forgotPass: function() {
    Piwik.trackClick('Forgot', 'Password')
    var node = this.refs.forgot_user.getDOMNode()
    if ( !node.value ) {
      this.setState({
        forgotError: 'Du måste fylla i en e-postadress.'
      })
      setTimeout(function() {
        node.focus()
      },4)
      return
    }
    models.user.forgot(
      node.value,
      function() {
        var msg = 'Vi har skickat instruktioner till '+ node.value + '. '
        this.setState({
          success: msg,
          forgot: false
        })
        this.props.onSuccess()
      }.bind(this),
      function(msg) {
        this.setState({
          forgotError: msg
        })
        setTimeout(function() {
          node.focus()
        },4)
        this.props.onFail(msg)
      }.bind(this)
    )
  },
  
  render: function() {
    var registerError = this.state.registerError ?
      React.DOM.p({className: "error"}, this.state.registerError) :
      null

    var loginError = this.state.loginError ?
      React.DOM.p({className: "error"}, this.state.loginError) :
      null

    if (this.state.success) {
      return (
        React.DOM.div({className: "login"}, 
          React.DOM.div({className: "bar"}), 
          React.DOM.p({className: "success"}, this.state.success), 
          React.DOM.button({className: "close btn", onClick: this.props.closeModal}, "Stäng fönstret")
        )
      )
    }

    if (this.state.forgot) {
      return (
        React.DOM.div({className: "login"}, 
          React.DOM.div({className: "bar"}), 
          React.DOM.p({className: "success"}, "Ange din epost så skickar vi instruktioner om hur du återställer ditt lösenord."), 
          React.DOM.div({className: "forms"}, 
            React.DOM.div({className: "inline"}, 
              React.DOM.label(null, 
                React.DOM.span(null, "E-post (användarnamn)"), 
                React.DOM.input({type: "text", ref: "forgot_user"})
              ), 
              React.DOM.button({className: "close btn", onClick: this.forgotPass}, "Skicka"), 
              React.DOM.a({className: "cancel", href: "#", onClick: this.backToLogin}, "Avbryt")
            )
          ), 
          React.DOM.p({className: "error"}, this.state.forgotError)
        )
      )
    }

    return (
      React.DOM.div({className: "login"}, 
        React.DOM.div({className: "bar"}), 
        React.DOM.p(null, React.DOM.i({className: "fa fa-star"}), " För att kunna favoritmärka måste du logga in hos oss. Om du inte har ett konto kan du skapa ett här."), 
        React.DOM.div({className: "forms"}, 
          React.DOM.div({className: "reg"}, 
            React.DOM.label(null, 
              React.DOM.span(null, "E-post (användarnamn)"), 
              React.DOM.input({type: "text", ref: "reg_user"})
            ), 
            React.DOM.label(null, 
              React.DOM.span(null, "Lösenord"), 
              React.DOM.input({type: "password", ref: "reg_pass"})
            ), 
            React.DOM.label(null, 
              React.DOM.span(null, "Upprepa lösenord"), 
              React.DOM.input({type: "password", ref: "reg_pass_repeat"})
            ), 
            React.DOM.button({onClick: this.register}, "Skapa konto"), 
            registerError
          ), 
          React.DOM.div({className: "log"}, 
            React.DOM.label(null, 
              React.DOM.span(null, "E-post (användarnamn):"), 
              React.DOM.input({type: "text", ref: "login_user"})
            ), 
            React.DOM.label(null, 
              React.DOM.span(null, "Lösenord"), 
              React.DOM.input({type: "password", ref: "login_pass"})
            ), 
            React.DOM.label({className: "checkbox"}, 
              React.DOM.input({type: "checkbox", ref: "remember"}), " ", React.DOM.span(null, "Kom ihåg mig")
            ), 
            React.DOM.a({className: "forgot", href: "#", onClick: this.forgot}, "Glömt lösenord"), 
            React.DOM.button({onClick: this.login}, "Logga in"), 
            loginError
          )
        )
      )
    )
  }
})

},{"jquery":"HlZQrA","react":"M6d2gk","vdd/models":26,"vdd/piwik":28}],15:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Piwik = require('vdd/piwik')

module.exports = React.createClass({displayName: 'exports',

  getDefaultProps: function() {
    return {
      closeHandler: function(){}
    }
  },

  componentDidMount: function(modal) {
    this.componentDidUpdate()
  },

  componentDidUpdate: function() {
    var $modal = $(this.refs.modal.getDOMNode())
    var width = $('#modal-content').outerWidth()
    $modal.css('margin-left', width/-2)
  },

  onClose: function(e) {
    Piwik.trackClick('Modal', 'Close')
    e.preventDefault()
    typeof this.props.closeHandler == 'function' && this.props.closeHandler()
  },

  render: function() {
    return (
      React.DOM.div({id: "modal-wrapper", className: this.props.show ? 'show' : ''}, 
        React.DOM.div({id: "modal", ref: "modal", className: this.props.className}, 
          React.DOM.button({id: "modal-close", onClick: this.onClose}, React.DOM.i({className: "fa fa-times"})), 
          React.DOM.div({id: "modal-content"}, 
            this.props.children
          )
        ), 
        React.DOM.div({id: "backdrop", onClick: this.onClose})
      )
    )
  }
})

},{"jquery":"HlZQrA","react":"M6d2gk","vdd/piwik":28}],16:[function(require,module,exports){
/** @jsx React.DOM */
  
var React = require('react')
var Query = require('vdd/query')
var $ = require('jquery')
var Router = require('vdd/router')
var responsedata = require('vdd/models').responsedata
var Piwik = require('vdd/piwik')

module.exports = React.createClass({displayName: 'exports',

  nextHandler: function(e) {
    e.preventDefault()
    var page = ~~Query.get('page') || 1
    Query.set({ page: page+1 })
    this.navigate()
    Piwik.trackClick('Favourites', 'Pagination: Next')
  },

  navigate: function() {
    var $results = $('.results')
    window.scrollTo(0, $results.offset().top-78)
    $results.css({ paddingBottom: 0 })
    Router.navigate(Query.build(), { trigger: true })
  },

  prevHandler: function(e) {
    e.preventDefault()
    var page = ~~Query.get('page')
    if ( !page )
      return
    if ( page < 2 )
      Query.remove('page')
    else
      Query.set({ page: page-1 })
    this.navigate()
    Piwik.trackClick('Favourites', 'Pagination: Previous')
  },

  render: function() {
    if ( !Query.get('q') )
      return React.DOM.div(null)
    var page = Query.get('page') || 1
    var total = responsedata.get('firstRun') 
      ? 1 
      : Math.ceil(responsedata.get('hits')/50)
    var active = responsedata.get('firstRun')
      ? null 
      : page > 0 
        ? React.DOM.span({className: "active"}, React.DOM.strong(null, page), "/", React.DOM.span(null, total)) 
        : null
    if ( !total || isNaN(total) )
      return React.DOM.div(null)
    var prev = React.DOM.button({className: "prev", onClick: this.prevHandler}, React.DOM.i({className: "fa fa-angle-left"}), " Föregående")
    var next = React.DOM.button({className: "next", onClick: this.nextHandler}, "Nästa ", React.DOM.i({className: "fa fa-angle-right"}))
    if ( page == total )
      next = null
    if ( page < 2 )
      prev = null
    return (
      React.DOM.div({className: "pagination"}, 
        prev, 
        active, 
        next
      )
    )
  }
})

},{"jquery":"HlZQrA","react":"M6d2gk","vdd/models":26,"vdd/piwik":28,"vdd/query":30,"vdd/router":31}],17:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var Query = require('vdd/query')
var Router = require('vdd/router')
var $ = require('jquery')
var VDD = require('vdd/vdd')
var PubSub = require('vdd/pubsub')
var _ = require('underscore')
var user = require('vdd/models').user
var Piwik = require('vdd/piwik')
var moment = require('moment')

module.exports = React.createClass({displayName: 'exports',

  getInitialState: function() {
    return {
      loading: true,
      active: false
    }
  },

  hasNode: false,

  componentDidMount: function(elem) {

    // do the loadimage animation and adjust masonry

    var img = this.refs.image.getDOMNode()

    var loadReady = function() {
      if ( this.isMounted() )
        this.setState({ loading: false })
    }.bind(this)

    var layoutReady = function() {
      var masonry = VDD.getMasonry()
      if ( masonry ) {
        masonry.layout()
        this.setNode() // sets the active node so detail knows it’s position
      }
    }.bind(this)

    var imageReady = function(e) {
      if (e) {
        if ( e.type == 'error' )
          $(e.target).siblings('.spinner').addClass('notfound')
        else
          $(e.target).animate({ opacity:1 }, 400, loadReady).parent().css('height', 'auto')
      } else
        loadReady()
      
      setTimeout(layoutReady, 10)
    }

    if (!img || img.ready)
      imageReady()
    else
      $(img).css('opacity', 0).load(imageReady).error(imageReady)
  },

  componentWillUnmount: function() {
    this.hasNode = false
  },

  setNode: function() {
    if(this.props.isactive) {
      PubSub.trigger('node', { node: this.refs.result.getDOMNode() })
    }
  },

  clickHandler: function(e) {
    e.preventDefault()
    var i = this.props.result.getFields()['@id']
    Router.navigate(VDD.parsePermaLink(i) + '/' + Query.build(), true)
    Piwik.trackClick('Results', i)
  },

  componentDidUpdate: function() {
    this.setNode()
  },

  onFav: function(e) {
    e.stopPropagation()
    e.preventDefault()
    var fields = this.props.result.getFields()
    var url = VDD.parsePermaLink(fields['@id'])

    if ( e.currentTarget.className == 'active' || e.currentTarget.getAttribute('data-remover') ) {
      return VDD.removeFavourite({ url: url})
    }
    var entry = this.props.result.toJSON()
    VDD.addFavourite($.extend(entry, {
      date: +new Date(),
      url: url,
      query: Query.get()
    }))
  },

  render: function() {
    var fields = this.props.result.getFields()
    var img = fields['@id'] + '_thumb.' + (window.HOME || this.props.result.get('copyright_free') ? 'jpg' : 'svg')
    var loader = this.state.loading ? React.DOM.span({className: "spinner"}) : null
    var classNames = ['result']

    this.props.isactive && classNames.push('active')
    var isFavourite = user.get('userdata') && !!_.findWhere(user.get('userdata').favourites, {
      url: VDD.parsePermaLink(fields['@id']) 
    })

    var snippets = null
    var snippetcontainer = null
    var highlights = this.props.result.get('highlight')
    if ( highlights ) {
      snippets = highlights.content.map(function(snip, i) {
        return React.DOM.span({className: "snipp s"+i, dangerouslySetInnerHTML: { __html: snip}})
      })
      snippetcontainer = (
        React.DOM.p({className: "snippet"}, 
          React.DOM.span({className: "quote"}, React.DOM.i({className: "fa fa-quote-right"})), 
          snippets
        )
      )
    }

    var banner
    if ( window.HOME )
      banner = null
    else if( !this.props.result.get('copyright_free') ) {
      banner = (
        React.DOM.div({className: "banner"}, 
          React.DOM.span({className: "arr"}), 
          React.DOM.i({className: "fa fa-university"})
        )
      )
    }

    var highlight
    if ( highlights ) {
      var hl = []
      highlights.content.forEach(function(h) {
        hl.push(h.replace(/.*<em>(.*)<\/em>.*/, '$1'))
      })
      var src = VDD.imgHack(fields['@id'])
      highlight = React.DOM.img({src: src+'_hits.svg?h='+hl.join(','), className: "highlight", ref: "highlight"})
    }

    img = VDD.imgHack(img)

    var fav = React.DOM.button({onClick: this.onFav, className: isFavourite ? 'active':''}, React.DOM.i({className: "fa fa-star"}))

    if ( Query.get('q') == ':favourites' ) {

      var date = ''

      if (user.get('userdata')) {
        var data = _.findWhere(user.get('userdata').favourites, {
          url: VDD.parsePermaLink(fields['@id']) 
        })
        var oneDay = 24*60*60*1000
        var d = new Date(data.date)
        var n = new Date()
        var diff = n.getDay() - d.getDay()
        if ( !diff )
          date = 'Idag'
        else if ( diff === 1 )
          date = 'Igår'
        else if ( diff < 14 )
          date = diff + ' dagar sedan'
        else
          date = moment(d).format('MM-DD-YYYY')
      }

      fav = React.DOM.div({className: "favtime"}, React.DOM.i({className: "fa fa-star"}), " ", date, " ", React.DOM.span({'data-remover': "true", title: "Ta bort favorit", onClick: this.onFav}, React.DOM.i({className: "fa fa-times"})))
    }

    return (
      React.DOM.div({className: classNames.join(' '), onClick: this.clickHandler, ref: "result"}, 
        React.DOM.div({className: "result-inner"}, 
          React.DOM.div({className: "title"}, 
            React.DOM.strong(null, VDD.capitalize(fields.newspaper.title)), 
            React.DOM.span({className: "date"}, fields.issue.issued)
          ), 
          React.DOM.div({className: "image"}, 
            loader, 
            React.DOM.img({ref: "image", src: img}), 
            highlight
          ), 
          React.DOM.div({className: "content"}, 
            snippetcontainer
          ), 
          React.DOM.div({className: "fav"}, 
            fav
          )
        ), 
        banner
      )
    )
  }
})

},{"jquery":"HlZQrA","moment":"iROhDJ","react":"M6d2gk","underscore":"ZKusGn","vdd/models":26,"vdd/piwik":28,"vdd/pubsub":29,"vdd/query":30,"vdd/router":31,"vdd/vdd":32}],18:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var Masonry = require('vdd/masonry')
var ResultComponent = require('./result')
var $ = require('jquery')
var Query = require('vdd/query')
var Router = require('vdd/router')
var VDD = require('vdd/vdd')
var models = require('vdd/models')

module.exports = React.createClass({displayName: 'exports',

  cachedQuery: '',

  getInitialState: function() {
    return {
      activeId: null
    }
  },

  componentDidMount: function() {

    var ul = this.getDOMNode()

    var masonry = new Masonry(ul, {
      onbrick: this.props.onbrick
    })
    masonry.layout()
    $(window).on('resize', this.resizeHandler)

    // save as global
    VDD.setMasonry(masonry)

  },

  componentWillUnmount: function() {
    $(window).off('resize', this.resizeHandler)
    VDD.setMasonry(null)
  },

  resizeHandler: function() {
    var masonry = VDD.getMasonry()
    masonry && masonry.layout()
  },

  componentDidUpdate: function() {
    this.resizeHandler()
  },

  render: function() {
    var isActive
    var classNames = ['results']
    if ( !this.props.move )
      classNames.push('dontmove')
    var results = models.results.map(function(result) {
      isActive = result.getFields()['@id'] == VDD.buildPermaLink(this.props.urlParams)
      return ResultComponent({key: result.cid, result: result, isactive: isActive})
    }, this)
    return (React.DOM.div({className: classNames.join(' ')}, results))
  }
})

},{"./result":17,"jquery":"HlZQrA","react":"M6d2gk","vdd/masonry":25,"vdd/models":26,"vdd/query":30,"vdd/router":31,"vdd/vdd":32}],19:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var Router = require('vdd/router')
var Query = require('vdd/query')
var $ = require('jquery'); window.jQuery = $ // Workaround for stupid bug. Will hopefully be fixed in Typeahead 0.11.
var typeahead = require('typeahead.js')
var _ = require('underscore')

var globalXHR = {
  abort: function() {}
}

module.exports = React.createClass({displayName: 'exports',

  getInitialState: function() {
    return {
      value: ''
    }
  },

  changeHandler: function(e) {
    this.setState({value: e.target.value})
  },

  componentWillReceiveProps: function() {
    Query.get('q') && this.setState({value: Query.get('q') })
  },

  componentDidMount: function(){
    // Create a debounced function for AJAX search suggestions
    var getSuggestions = _.debounce( function( query, cb ) {
      var start = new Date().getTime(), loaded, finish
      
      var $searchform = $( '#searchform' )
      $searchform.addClass( 'loading' )
      
      globalXHR.abort()
      globalXHR = $.getJSON('/api/suggest?q=' + query, function( response ) {
        loaded = new Date().getTime()
        $searchform.removeClass( 'loading' )
        var returnData = _.map( response.suggestions, function( s ) {
          return {
            phrase: s[ 0 ],
            score: s[ 1 ]
          }
        })
        finish = new Date().getTime()
        //console.log('data fetch took', loaded - start, 'milliseconds');
        //console.log('data massage took', finish - loaded, 'milliseconds');
        cb( returnData )
      })
    }, 200 )
    
    var self = this
    self.componentWillReceiveProps()

    $( this.refs.q.getDOMNode() ).typeahead({
      minLength: 3,
      highlight: true,
      hint: false
    },
    {
      name: 'suggs',
      displayKey: 'phrase',
      source: function( query, cb ) {
        getSuggestions( query, cb )
      },
      templates: {
        //empty: '<span class="tt-suggestions"><div class="tt-container"><div class="result empty"><p>Inga träffar</p></div></div></span>',
        suggestion: function( result ) {
          return [
            '<div class="result">',
                '<p>' + result.phrase + '</p>',
            '</div>'
          ].join('\n')
        },
        footer: '<span class="tt-suggestions"><div class="tt-container"><div class="result help"><p>Tips: Få med alternativa stavningar genom att lägga till ~2 </p></div></div></span>'
      }
    }).on('typeahead:selected', function( ev, ob ) {
      self.doSearch( ob.phrase )
    }).on('typeahead:opened', function( ev, ob ) {
      $( '#search' ).addClass( 'opened' )
    }).on('typeahead:closed', function( ev, ob ) {
      $( '#search' ).removeClass( 'opened' )
    })
    this.refs.q.getDOMNode().focus()
  },
  
  componentWillUnmount: function(){
  //  $( '#search' ).typeahead('destroy')
    if ( this.isMounted() )
        $( this.refs.q.getDOMNode() ).typeahead('destroy')

  },
  submitHandler: function( e ) {
    var self = this
    e.preventDefault()

    // Get value from Typeahead if possible.
    // Fall back to state.
    if ( $('.typeahead').typeahead('val') ) {
      var value = this.state.value = $('.typeahead').typeahead('val')
    } else {
      var value = this.state.value
    }
    self.doSearch( value )
  },

  doSearch: function( q ) {
    if ( q ) {
      // Abort any ongoing XHR request
      globalXHR.abort()
      // Restore search button
      $('#searchform').removeClass( 'loading' )
      // Make sure typeahead is always closed
      $('#search').typeahead('close');
      Query.set({q: q})
      Query.remove('i')
      Query.remove('from')
      Query.remove('to')
      Query.remove('issn')
      Query.remove('newspaper')
      Query.remove('page')
      Router.navigate('/' + Query.build(), {trigger: true})
    }
    else
      this.refs.q.getDOMNode().focus()
  },

  render: function() {
    var breadcrumbs = null
    var freeonlybutton = null

    if ( 0 === 1) {
      breadcrumbs = (
        React.DOM.div({className: "breadcrumbs"}, 
          React.DOM.div({className: "text"}
          ), 
          React.DOM.div({className: "fav"}, 
            React.DOM.button(null, React.DOM.i({className: "fa fa-star"}))
          )
        )
      )
    }

    return (
      React.DOM.div({className: "block search"}, 
        React.DOM.form({id: "searchform", action: "#", onSubmit: this.submitHandler}, 
          React.DOM.input({id: "search", ref: "q", className: "input", autoFocus: true, value: this.state.value, 
            onChange: this.changeHandler, autoComplete: "off"}), 
          React.DOM.button({className: "button", id: "submit"}, "Sök", React.DOM.div({className: "spinner light"})), 
          breadcrumbs
        )
      )
    )
  }
})

},{"jquery":"HlZQrA","react":"M6d2gk","typeahead.js":"XZDMTs","underscore":"ZKusGn","vdd/query":30,"vdd/router":31}],20:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var Query = require('vdd/query')
var Router = require('vdd/router')
// var models = require('vdd/models')
// var _ = require('underscore')

module.exports = React.createClass({displayName: 'exports',

  reset: function () {
    Query.remove('sort')
    Router.navigate('/' + Query.build(), {trigger: true})
  },

  toggleDateOrder: function() {
    var sort = Query.get('sort')
    if ( !sort || sort == 'asc' ) {
      Query.set( { sort: 'desc' } )
    } else {
      Query.set( { sort: 'asc' } )
    }
    Router.navigate('/' + Query.build(), {trigger: true})
  },

  render: function() {

    if ( !Query.get('q') )
      return React.DOM.div(null)

    var sort = Query.get('sort')
    var dateOrder = ''

    if ( sort ) {
      if ( sort == 'asc' ) dateOrder = ( React.DOM.i({className: "fa fa-chevron-up"}) )
      if ( sort == 'desc' ) dateOrder = ( React.DOM.i({className: "fa fa-chevron-down"}) )
    }

    return (
      React.DOM.span({className: "sort"}, 
        "Sortera:", 
        React.DOM.span({className: "buttons"}, 
          React.DOM.button({onClick: this.reset, className:  sort ? '' : 'active'}, "Relevans"), 
          React.DOM.button({onClick: this.toggleDateOrder, className:  sort ? 'active' : ''}, "Datum ", dateOrder)
        )
      )
    )
  }
})
},{"react":"M6d2gk","vdd/query":30,"vdd/router":31}],21:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Router = require('vdd/router')
var Query = require('vdd/query')
var models = require('vdd/models')
var VDD = require('vdd/vdd')
var Piwik = require('vdd/piwik')

var WIDTH = 0

module.exports = React.createClass({displayName: 'exports',

  getDefaultProps: function() {
    return {
      active: 0,
      length: 0
    }
  },

  getInitialState: function() {
    return { mouseX: null }
  },

  componentDidMount: function() {
    $(window).on('resize', this.onResize)
    this.onResize()
  },

  componentWillUnmount: function() {
    $(window).off('resize', this.onResize)
  },

  componentDidUpdate: function() {
    this.onResize()
  },

  onResize: function(e) {
    WIDTH = $(this.getDOMNode()).outerWidth()
  },

  getPosition: function(index) {
    if ( typeof index != 'number' )
      return null
    var pages = models.detail.getIssueList()
    return Math.floor( WIDTH * ( index/(pages.length-1) ) )
  },

  getIndex: function(x) {
    var pages = models.detail.getIssueList()
    return Math.floor( (x/WIDTH) * pages.length )
  },

  getX: function(e) {
    return e.pageX - $(this.getDOMNode()).offset().left
  },

  moveHandler: function(e) {
    this.setState({ mouseX: e.pageX })
  },

  outHandler: function() {
    this.setState({ mouseX: null })
  },

  clickHandler: function(e) {
    var index = this.getIndex( this.getX(e) )
    //console.log('INDEX', index)
    this.props.setPageNumber(index)
    Piwik.trackClick('Timeline', index)
  },

  render: function() {

    var pos = this.getPosition( this.props.pageNumber )
    
    var position = typeof pos == 'number' ? 
      React.DOM.span({className: "position", style: {left: pos}}) : null

    var thumbStyle = { left: 0, display: 'none' }
    var thumbnail = null

    var hits = models.detail.getHitList()
    var pages = models.detail.getIssueList()

    var marks = hits.map(function(hit, i) {
      var index = 0
      var id = hit._source['@id']
      pages.forEach(function(page, i) {
        if(page._source['@id'] == id)
          index = i
      })
      var classNames = ['fa', 'fa-bookmark']
      if ( index === this.props.pageNumber )
        classNames.push('active')
      var style = { left: this.getPosition(index) }
      return React.DOM.i({className: classNames.join(' '), style: style})
    }, this)

    if ( this.state.mouseX !== null ) {
      var x = this.getX({ pageX: this.state.mouseX })
      thumbStyle = { 
        display: 'block',
        left: x || 0
      }
      thumbnail = pages[ this.getIndex(x) ]
      if ( thumbnail )
        thumbnail = VDD.imgHack(thumbnail._source['@id']+'_micro.' + (thumbnail.copyright_free ? 'jpg' : 'svg'))

    }

    return (
      React.DOM.div({className: "timeline", onMouseMove: this.moveHandler, onClick: this.clickHandler, onMouseOut: this.outHandler}, 
        React.DOM.div({className: "thumb", style: thumbStyle}, 
          React.DOM.div({className: "img"}, React.DOM.img({src: thumbnail})), 
          React.DOM.span({className: "arrow"})
        ), 
        position, 
        marks
      )
    )
  }
})

},{"jquery":"HlZQrA","react":"M6d2gk","vdd/models":26,"vdd/piwik":28,"vdd/query":30,"vdd/router":31,"vdd/vdd":32}],22:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react')
var Query = require('vdd/query')
var $ = require('jquery')
var VDD = require('vdd/vdd')
var models = require('vdd/models')
var Pan = require('vdd/pan')

var d = document
var $win = $(window)
var support = ( typeof d.documentElement.style.WebkitTransform !== 'undefined' )
var MOVE = 150
var retfalse = function(){ return false }
var translate3d = (function() {
  var el = document.createElement('p')
  var has3d
  var transforms = {
      'webkitTransform':'-webkit-transform',
      'OTransform':'-o-transform',
      'msTransform':'-ms-transform',
      'MozTransform':'-moz-transform',
      'transform':'transform'
  }
  document.documentElement.insertBefore(el, null)
  for (var t in transforms) {
    if ( typeof el.style[t] != 'undefined' ) {
      el.style[t] = 'translate3d(1px,1px,1px)'
      has3d = window.getComputedStyle(el).getPropertyValue(transforms[t])
    }
  }
  document.documentElement.removeChild(el)
  return (has3d !== undefined && has3d.length > 0 && has3d !== "none")
}())
// Doublecheck against this: http://generatedcontent.org/post/70347573294/is-your-fullscreen-api-code-up-to-date-find-out-how-to
var canFullscreen = !!(d.body.requestFullscreen || d.body.msRequestFullscreen || d.body.mozRequestFullscreen || d.body.webkitRequestFullscreen)


module.exports = React.createClass({displayName: 'exports',

  pan: null,

  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      z: 0,
      panX: 0,
      panY: 0,
      panZ: 0,
      out: false,
      page: this.props.pageNumber || 0,
      loading: false,
      direction: null,
      highlight: true
    }
  },

  componentWillUnmount: function() {
    this.pan && this.pan.destroy()
    $win.off('keydown', this.onKey).off('keyup', this.offKey)
    if ( d.exitFullscreen )
      d.exitFullscreen()
    else if ( d.msCancelFullscreen )
      d.msCancelFullscreen()
    else if ( d.mozCancelFullScreen )
      d.mozCancelFullScreen()
    else if ( d.webkitCancelFullScreen )
      d.webkitCancelFullScreen()

    d.removeEventListener('fullscreenchange', this.onFsChange)
    d.removeEventListener('MSFullscreenChange', this.onFsChange)
    d.removeEventListener('mozfullscreenchange', this.onFsChange)
    d.removeEventListener('webkitfullscreenchange', this.onFsChange)
  },

  componentDidMount: function() {

    var node = this.getDOMNode()
    $win.on('keydown', this.onKey).on('keyup', this.offKey)

    if ( node.requestFullscreen )
      node.requestFullscreen()
    else if ( node.msRequestFullscreen )
      node.msRequestFullscreen()
    else if ( node.mozRequestFullScreen )
      node.mozRequestFullScreen()
    else if ( node.webkitRequestFullScreen )
      node.webkitRequestFullScreen()

    d.addEventListener('fullscreenchange', this.onFsChange)
    d.addEventListener('MSFullscreenChange', this.onFsChange)
    d.addEventListener('mozfullscreenchange', this.onFsChange)
    d.addEventListener('webkitfullscreenchange', this.onFsChange)

    this.initialize()

  },

  initialize: function() {
    var image = this.refs.image.getDOMNode()
    this.loadImage(image.src, function() {
      this.setState({
        loadInit: false,
        loading: false
      })

      var m = this.getMeasures()

      var pan = this.pan = Pan(this.refs.pan.getDOMNode(), {
        mousemove: false,
        x: Math.min(0, Math.max( -(this.props.x*m.iw), -(m.iw-m.ww))),
        y: Math.min(0, Math.max( -(this.props.y*m.ih), -(m.ih-m.wh)))
      })
      pan.onPan(function(x,y,z) {
        this.setState({
          panX: x,
          panY: y,
          panZ: z
        })
      }.bind(this))
    })
  },

  loadImage: function(src, callback) {
    var loader = new Image()
    loader.onload = function() {
      callback.call(this, {width: loader.width, height: loader.height})
      loader = null
    }.bind(this)
    loader.src = src
  },

  getMeasures: function() {
    var $img = $(this.refs.image.getDOMNode())
    var o = {
      wh: $win.height(),
      ww: $win.width(),
      iw: $img.width(),
      ih: $img.height()
    }
    o.wh = Math.min(o.ih, o.wh)
    o.ww = Math.min(o.iw, o.ww)
    o.cx = (o.iw/-2)+(o.ww/2)
    o.cy = (o.ih/-2)+(o.wh/2)
    o.ratio = Math.min(o.ww/o.iw, o.wh/o.ih)
    return o
  },

  move: function(direction) {
    if (this.state.out || !this.pan)
      return
    if ( typeof direction == 'object' )
      direction = direction.currentTarget.getAttribute('data-dir')
    if ( !(/^(up|down|left|right)$/.test(direction)) )
      return
    var m = this.getMeasures()
    var x = this.state.panX
    var y = this.state.panY
    if ( direction == 'up' )
      y += MOVE
    if ( direction == 'down' )
      y -= MOVE
    if ( direction == 'left' )
      x += MOVE
    if ( direction == 'right' )
      x -= MOVE

    this.pan.setPosition(
      Math.min(0, Math.max(x, -(m.iw-m.ww))),
      Math.min(0, Math.max(y, -(m.ih-m.wh)))
    )
  },

  onKey: function(e) {
    if ( e.which == 27 ){
      e.preventDefault()
      VDD.closeZoom()
    }
    if ( e.which == 17 ) { // ctrl
      e.preventDefault()
      this.travel('prev')
      this.keyPress('prev')
    }
    if ( e.which == 18 ) { // alt
      e.preventDefault()
      this.travel('next')
      this.keyPress('next')
    }
    if ( e.which == 37 ) { // left
      e.preventDefault()
      this.move('left')
      this.keyPress('left')
    }
    if ( e.which == 39 ) { // right
      e.preventDefault()
      this.move('right')
      this.keyPress('right')
    }
    if ( e.which == 38 ) { // up
      this.move('up')
      this.keyPress('up')
      e.preventDefault()
    }
    if ( e.which == 40 ) { // down
      this.move('down')
      this.keyPress('down')
      e.preventDefault()
    }
    if ( (e.which == 187 || e.which == 171) && this.state.out) { // +
      e.preventDefault()
      this.keyPress('plus')
      this.zoom()
    }
    if ( (e.which == 189 || e.which == 173) && !this.state.out) { // -
      e.preventDefault()
      this.keyPress('minus')
      this.zoom()
    }
    if ( e.which == 32 ) {
      e.preventDefault();
      this.zoom()
    }
    if ( e.which == 13 ) {
      e.preventDefault()
      this.toggleHighlight()
    }
    //console.log(e.which)
  },

  keyPress: function(direction) {
    this.setState({ direction: direction })
  },

  offKey: function(e) {
    this.setState({ direction: false })
  },

  travel: function(where) {
    if ( !this.pan || this.state.loading )
      return
    var pages = models.detail.getIssueList()

    if ( typeof where == 'object' )
      where = where.currentTarget.getAttribute('data-dir')
    if ( !(/^(prev|next)$/.test(where)) )
      return

    var n = this.state.page
    if ( where == 'next' && n < pages.length - 1 )
      n++
    else if ( where == 'prev' && n )
      n--
    else
      return
    var image = pages[ n ]
    if ( !image )
      return
    this.setState({ loading: true })
    this.loadImage(image._source['@id']+'.jpg', function() {
      this.setState({ 
        page: n,
        loading: false
      })
    })
    if ( this.state.out && this.pan ) {
      var m = this.getMeasures()
      this.pan.setPosition(m.cx, m.cy, m.ratio)
    } 
  },

  zoom: function(x, y) {
    if ( !this.pan )
      return
    var m = this.getMeasures()
    if ( this.state.out ) {
      if ( x )
        x = -(m.iw * (x/m.iw))
      if ( y )
        y = -(m.ih * (y/m.ih))
      x = Math.min(0, Math.max(x, m.ww-m.iw))
      y = Math.min(0, Math.max(y, m.wh-m.ih))
      this.pan.setPosition(x, y, 1)
      this.pan.enable()
    } else {
      this.pan.setPosition(
        Math.min(0, Math.max(m.cx, m.ww-m.iw)),
        Math.min(0, Math.max(m.cy, m.wh-m.ih)),
        m.ratio
      )
      this.pan.disable()
    }
    this.setState({
      out: !this.state.out
    })
  },

  zoomClick: function(e) {
    //console.log('zoomclick', e)
    e.preventDefault()
    var dir = e.currentTarget.getAttribute('data-dir')
    if ( (this.state.out && dir == 'minus') || (!this.state.out && dir == 'plus') )
      return
    this.zoom()
  },

  close: function() {
    VDD.closeZoom()
  },

  onFsChange: function(e) {
    //console.log('HERE!');
    e.preventDefault()
    if( !(
        d.webkitFullscreenElement ||
        d.mozFullScreenElement ||
        d.msFullscreenElement ||
        d.fullscreenElement
      ) ) {
      this.close()
    }
  },

  dblClick: function(e) {
    if ( this.state.out ) {
      var x
      var y
      var offset = $(e.target).offset()
      x = e.clientX + d.body.scrollLeft + d.documentElement.scrollLeft - Math.floor(offset.left)
      y = e.clientY + d.body.scrollTop  + d.documentElement.scrollTop  - Math.floor(offset.top) + 1
      this.zoom(x,y)
    }
    else
      this.zoom()
  },

  toggleHighlight: function() {
    this.setState({ highlight: !this.state.highlight })
  },

  render: function() {

    var pages = models.detail.getIssueList()
    var highlights = this.props.highlights
    var page = pages[ this.state.page ]
    var highlights = this.props.highlights[ this.state.page ]
    var scale = 'scale('+this.state.panZ+','+this.state.panZ+')'

    var imgStyle = {
      transform: scale,
      '-webkit-transform': scale,
      '-ms-transform': scale
    }

    if ( this.state.loading )
      imgStyle.opacity = 0.3

    var image = page ?
      React.DOM.img({src:  page._source['@id']+'.jpg', ref: "image", style: imgStyle, onDrag: retfalse}) : null

    var highlight = this.state.highlight && highlights && highlights.length && !this.state.loading ?
      React.DOM.img({className: "highlight", src:  page._source['@id']+'_hits.svg?h='+highlights.join(','), ref: "highlight", style: imgStyle, onDrag: retfalse}) : null

    var panStyle = translate3d ? 
      { 
        WebkitTransform: 'translate3d('+this.state.panX+'px,'+this.state.panY+'px,0)',
        transform: 'translate3d('+this.state.panX+'px,'+this.state.panY+'px,0)'
      } : { top: this.state.panY, left: this.state.panX }


    var dirClass = this.state.out ? 'disabled' : ''
    var keyClass = 'keys '+this.state.direction
    var nextClass = this.state.page == pages.length-1 ? 'disabled' : ''
    var prevClass = !this.state.page ? 'disabled' : ''
    var hlClass = (!highlights || !highlights.length) ? 'disabled' : (this.state.highlight ? 'active' : '')

    var title = ''
    var date = ''
    var issue = models.detail.getIssue()
    if ( issue ) {
      var first = models.detail.getIssueList()[0]
      if ( first ) {
        title = VDD.capitalize(first._source.newspaper.title)
        date = date || first._source.issue.issued
      }
    }

    return (
      React.DOM.div({id: "zoom", onSelect: retfalse}, 
        React.DOM.div({className: "meta"}, 
          React.DOM.span({className: "title"}, title), 
          React.DOM.span({className: "date"}, date)
        ), 
        React.DOM.button({className: "close", onClick: VDD.closeZoom}, React.DOM.i({className: "fa fa-times"})), 
        React.DOM.span({className: "spinner light", ref: "spinner"}), 
        React.DOM.div({ref: "pan", style: panStyle, onDoubleClick: this.dblClick, className: "images"}, 
          image, 
          highlight
        ), 
        React.DOM.div({className: keyClass}, 
          React.DOM.div({className: "directions"}, 
            React.DOM.button({onClick: this.move, className: dirClass, 'data-dir': "up"}, React.DOM.i({className: "fa fa-caret-up"})), 
            React.DOM.button({onClick: this.move, className: dirClass, 'data-dir': "left"}, React.DOM.i({className: "fa fa-caret-left"})), 
            React.DOM.button({onClick: this.move, className: dirClass, 'data-dir': "down"}, React.DOM.i({className: "fa fa-caret-down"})), 
            React.DOM.button({onClick: this.move, className: dirClass, 'data-dir': "right"}, React.DOM.i({className: "fa fa-caret-right"}))
          ), 
          React.DOM.div({className: "zoom"}, 
            React.DOM.button({onClick: this.zoomClick, className: !this.state.out ? 'disabled' : '', 'data-dir': "plus"}, React.DOM.i({className: "fa fa-plus"})), 
            React.DOM.button({onClick: this.zoomClick, className: this.state.out ? 'disabled' : '', 'data-dir': "minus"}, React.DOM.i({className: "fa fa-minus"}))
          ), 
          React.DOM.div({className: "nav"}, 
            React.DOM.button({onClick: this.travel, className: prevClass, 'data-dir': "prev"}, React.DOM.i({className: "fa fa-angle-double-left"})), 
            React.DOM.div({className: "pages"}, "Sida ", React.DOM.strong({className: "page"}, this.state.page+1), " av ", React.DOM.strong(null, pages.length)), 
            React.DOM.button({onClick: this.travel, className: nextClass, 'data-dir': "next"}, React.DOM.i({className: "fa fa-angle-double-right"}))
          ), 
          React.DOM.div({className: "hl"}, 
            React.DOM.button({onClick: this.toggleHighlight, className: hlClass}, "■")
          )
        )
      )
    )
  }
})
},{"jquery":"HlZQrA","react":"M6d2gk","vdd/models":26,"vdd/pan":27,"vdd/query":30,"vdd/vdd":32}],23:[function(require,module,exports){
var AppComponent = require('./components/app')
var Lipsum = require('ainojs/lipsum')
var React = require('react')
var Backbone = require('backbone')
var Router = require('vdd/router')
var Query = require('vdd/query')
var $ = require('jquery')
var _ = require('underscore')
var models = require('vdd/models')
var VDD = require('vdd/vdd')
var Easing = require('ainojs/easing')
var Piwik = require('vdd/piwik')

// shims
require('./backbone.queryparams-1.1-shim')

React.initializeTouchEvents(true)

Backbone.$ = $

$.easing.vdd = Easing('easeInOutQuart')

Piwik.init()

var App

/* DEBUG
window.onerror = function() {
  $('#modal-wrapper').show();
  $('#backdrop').css('opacity', 1)
  $('#loadlayer').hide()
  $('#modal').css({
    width: 500,
    height: 300,
    marginLeft: -250,
    opacity:1
  })
  var err = +Array.prototype.join.call(arguments, '\n')
  $('#modal-content').addClass('error').html("<h3>Hoppsan!</h3><p>Ett fel har uppstått i programmet och du måste ladda om sidan.</p>"+
    "<button onclick='window.location.reload()'>Ladda om</button><textarea>DEBUG: "+err+"</textarea>")
  trackEvent('Application', 'Error', err)
  return false
}
*/

var cache = {}

// query cache
var hasChanged = (function() {
  var changed = function(key) {
    var val = Query.get(key),
        has = cache.hasOwnProperty(key)
    if ( ( has && cache[key] === val ) || ( typeof val == 'undefined' && !has ) )
      return false
    cache[key] = val
    return true
  }
  return function() {
    var keys = $.makeArray(arguments)
    for( var i=0; i<keys.length; i++ ) {
      if ( changed(keys[i]) )
        return true
    }
    return false
  }
}())

// Create a list of querystring to listen to
var watchables = [ 'q', 'from', 'to', 'newspaper', 'page', 'freeonly', 'sort' ]
// Make sure no watchables are thrown out of cache 
watchables.forEach(function(key) {
  cache[key] = undefined
})

window.Run = function() {

  // create the top-level react app
  App = React.renderComponent(AppComponent(), document.getElementById('app'))

  // load user model from template data if logged in
  if ( typeof window.USER == 'object' ) {
    models.user.setUser(USER)
    delete window.USER
  }

  // start router
  Router.on('route', function(url, params) {

    document.body.className = 'app-'+url

    // Do the data API’s based on URLS and inject into Backbone
    // The App will listen to all backbone changes and update the interface accordingly
    
    Query.sync()

    Piwik.enableLinkTracking()
    Piwik.trackPageView()

    if ( url == 'home ') {
      // Get some initial data, like date span and all newspapers
      // Not needed at the moment
      // if( !Query.get('q') ) {
      //   $.get('/static/stats.json', function(things) {
      //     models.results.reset(things.hits.hits)
      //     models.responsedata.set( { 
      //       hits: things.hits.total,
      //       topscore: things.hits.max_score,
      //       facets: things.facets,
      //       firstRun: true
      //     } )
      //   })
      // }
    } else if ( (url == 'search' || url == 'detail') && params && params[0] ) {

      if ( Query.get('q') == ':favourites' ) {
        cache['q'] = ':favourites'
        if ( !models.user.get('username') )
          return Router.navigate('/', true)
        var favs = models.user.get('userdata').favourites
        window.scrollTo(0,0)
        // manually sort in model
        favs = _.sortBy(favs, function(fav) {
          return -fav.date
        })
        models.results.reset( favs )
        models.responsedata.set({
          hits: favs.length
        })
      }

      // Sync query string with existing parameters and listen for changes
      else if ( hasChanged.apply( null, watchables ) ) {
        document.documentElement.className = 'loading'
        $.get('/api/json' + Query.build( watchables ), function(things) {
          _paq.push(['trackSiteSearch', Query.get('q'), false, things.hits.total])
          models.results.reset(things.hits.hits)
          models.responsedata.set( { 
            hits: things.hits.total,
            topscore: things.hits.max_score,
            facets: things.facets,
            firstRun: false
          })
          document.documentElement.className = ''
        })
      }

      if ( url == 'search' ) {
        var masonry = VDD.getMasonry()
        masonry && masonry.reset()
      }

      if ( url == 'detail' ) {
        var pageId = VDD.buildPermaLink(params)
        if ( pageId ) {
          var issueId = pageId.split('/').slice(0, 5).join('/')
          var issue = 'issue.@id:"' + issueId + '"'
          var q = Query.get('q')
          if ( q == ':favourites' ) {
            var fav = _.findWhere(models.user.get('userdata').favourites, { url: VDD.parsePermaLink(pageId) })
            if ( fav ) {
              q = fav.query.q
            } else {
              return Router.navigate('/?q=:favourites', true)
            }
          }
          q = q || '*'
          $.when(
            $.getJSON('/api/json?sort=True&q=' + q + '+' + issue),
            $.getJSON('/api/json?sort=True&n=1000&q=' + issue)
            //$.getJSON('/api/json?q=' + q + '+' + issue),
            //$.getJSON('/api/json?n=1000&q=' + issue)
          ).done(function(hits, issue) {
  
            // temp sorting TODO: NY soffa
            /*
            var reg = /\/part\/([\d]+)\/page\/([\d]+)$/
            var sort = function(a, b) {
              a = a._source['@id'].match(reg)
              b = b._source['@id'].match(reg)
              a[1] = parseInt(a[1])
              a[2] = parseInt(a[2])
              b[1] = parseInt(b[1])
              b[2] = parseInt(b[2])

              if ( a[1] > b[1] || a[2] > b[2] ) return 1
              if ( a[1] < b[1] || a[2] < b[2] ) return -1
              return 0
            }

            issue[0].hits.hits.sort(sort)
            */  
            models.detail.set({
              hits: hits[0],
              issue: issue[0]
            })
          })
        }
      }
    } else if ( url == 'favourites' ) {
      models.favourites.reset(models.user.get('userdata').favourites)
    }

    App.setState({ 
      url: url, 
      urlParams: params || [] 
    })

    // Expose App to VDD
    VDD.setApp(App)

  })

  Backbone.history.start({pushState: true})
  
}

},{"./backbone.queryparams-1.1-shim":4,"./components/app":5,"ainojs/easing":1,"ainojs/lipsum":2,"backbone":"5kFNoY","jquery":"HlZQrA","react":"M6d2gk","underscore":"ZKusGn","vdd/models":26,"vdd/piwik":28,"vdd/query":30,"vdd/router":31,"vdd/vdd":32}],24:[function(require,module,exports){
module.exports = {
  'd3': {
    'decimal': '.',
    'thousands': ',',
    'grouping': [3],
    'currency': ['', 'SEK'],
    'dateTime': '%a %b %e %X %Y',
    'date': '%Y-%m-%d',
    'time': '%H:%M:%S',
    'periods': [],
    'days': ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
    'shortDays': ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
    'months': ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
    'shortMonths': ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
  },
  'pikaday': {
      'previousMonth' : 'Föreg. månad',
      'nextMonth'     : 'Nästa månad',
      'months'        : ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
      'weekdays'      : ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
      'weekdaysShort' : ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör']
  }
}
},{}],25:[function(require,module,exports){
var $ = require('jquery')

module.exports = function(elem, options) {

  options = $.extend({
      width: null,
      gutter: null,
      onbrick: $.noop
  }, options )

  var $elem = $(elem)

  if ( $elem.data('masonry') ) 
    return $elem.data('masonry')

  var calculateMatrix = function() {
    
    var $bricks = $elem.children()
    var width = $elem.width()
    var brickWidth = options.width || $bricks.eq(0).outerWidth()
    var gutter = options.gutter || $bricks.eq(0).outerWidth(true) - brickWidth
    var colCount = Math.floor( width / (brickWidth+gutter) )
    var colHeight = []
    var matrix = []
    var i = 0
    var thisCol = 0
    var thisRow = 0
    var count = 0
    var css = {
      'float': 'none',
      'position': 'absolute',
      'display': /^(?!.*chrome).*safari/i.test(navigator.userAgent) ? 'inline-block' : 'block'
    }
    
    if ( !$bricks.length )
      return
      
    for ( ; i < colCount; i++ )
      colHeight[ i ] = 0

    $elem.css( 'position', 'relative' )

    $bricks.css( css ).each( function( j, brick ) {

      thisRow = Math.floor(count/colCount)
      count++

      var $brick = $( brick )

      var height = $brick.outerHeight( true )

      for ( i = colCount-1; i > -1; i-- ) {
        if ( colHeight[ i ] === Math.min.apply( Math, colHeight ) )
          thisCol = i
      }

      var sz = {
        top: colHeight[ thisCol ],
        left: (brickWidth+gutter) * thisCol
      }

      if ( typeof sz.top !== 'number' || typeof sz.left !== 'number' )
        return

      sz.top = Math.round(sz.top)
      sz.left = Math.round(sz.left)

      colHeight[ thisCol ] += height

      if ( typeof matrix[thisRow] == 'undefined' )
        matrix[thisRow] = []

      matrix[thisRow][thisCol] = $.extend({}, sz, { brick: brick, height: height })
      $brick.data('pos', sz.top+height)
    })

    $elem.height(Math.max.apply(Math, colHeight))
    
    return matrix
  }

  var layout = function() {
    var matrix = calculateMatrix()
    if ( !matrix )
      return
    matrix.forEach(function(row) {
      row.forEach(function(col) {
        var extop = $(col.brick).data('extop')
        $(col.brick).css({
          top: col.top + (extop || 0),
          left: col.left
        })
      })
    })
  }

  var reset = function() {
    var matrix = calculateMatrix()
    if ( !matrix )
      return
    var colHeight = []
    matrix.forEach(function(row) {
      row.forEach(function(col, i) {
        $(col.brick).data('extop',0).css({
          top: col.top,
          left: col.left
        })
        if ( typeof colHeight[i] == 'undefined' )
          colHeight[i] = 0
        colHeight[i] += col.top
      })
    })
    $elem.height(Math.max.apply(Math, colHeight)).css('padding-bottom', 0)
  }

  var refresh = function(elem) {
    if ( elem && !$(elem).data('masonry') ) {
      $elem = $(elem).data('masonry', true)
    }
    layout()
  }

  var matrix = function( parser ) {
    var $bricks = $elem.children()
    $bricks.css('visibility', 'hidden')
    parser(calculateMatrix())
    $bricks.css('visibility', 'visible')
  }

  var api = {
    layout: layout,
    options: options,
    element: elem,
    refresh: refresh,
    matrix: matrix,
    reset: reset
  }

  $elem.data('api', api)
  return api
}

},{"jquery":"HlZQrA"}],26:[function(require,module,exports){
var Backbone = require('backbone')
var $ = require('jquery')
var _ = require('underscore')
var moment = require('moment')
var Query = require('vdd/query')
var Piwik = require('vdd/piwik')

var Detail = Backbone.Model.extend({
  getHits: function() {
    return this.get('hits')
  },
  getIssue: function() {
    return this.get('issue')
  },
  getHitList: function() {
    var response = []
    var hits = this.getHits()
    if ( hits && hits.hits && hits.hits.hits ) {
      response = hits.hits.hits.slice(0)
    }
    return response
  },
  getIssueList: function() {
    var response = []
    var hits = this.getIssue()
    if ( hits && hits.hits && hits.hits.hits ) {
      response = hits.hits.hits.slice(0)
    }
    return response
  }
})

module.exports.detail = new Detail()

var ResponseData = Backbone.Model.extend({
  getDates: function( from, to ) {
    var facets = this.get('facets')
    if ( !facets ) return false
    var response
    var data
    var precision = facets.precision
    var normalize = function( d, p ) {
      var format = p == 'year'
        ? 'YYYY'
        : p == 'month'
          ? 'YYYY-MM'
          : 'YYYY-MM-DD'
      d.term = ( typeof d.term == 'string' ) ? moment( d.term, format ).toDate() : d.term
      d.count = +d.count
      d.prec = p
      return d
    }
    var ensureDate = function( date, data ) {
      var dateObj = _.find( data, function( d ) {
          return moment( d ).isSame( date, precision )
        } ) 
        dateObj || data.push( {
          count: 0,
          prec: precision,
          term: date
        } )
    }

    data = facets[ 'issue_issued_facet' ].terms
    // Normalize data
    data = data.map( function( d ){
      return normalize( d, precision )
    } )

    // Get the amount of months between from and to date
    if ( from && to ) {
      // Only filter out dates outside range if precision is months or years
      var start, end
      if ( precision == 'year' || precision == 'month' ) {
        start = moment( from ).startOf( precision ).toDate()
        end = moment( to ).endOf( precision ).toDate()
      } else {
        start = moment( from ).startOf( 'month' ).toDate()
        end = moment( to ).endOf( 'month' ).toDate()
      }

      // We want to ensure first and last days of date span are always present in data
      ensureDate( start, data, precision )
      ensureDate( end, data, precision )

      data = data.filter( function( d ){
        return d.term >= start && d.term <= end
      })
    }

    return {
      data: data,
      precision: precision
    }

  },

  getNewspapers: function() {
    var facets = this.get('facets')
    if (!facets) return false
    return facets.newspaper_title_facet.terms
  }
})

module.exports.responsedata = new ResponseData()

var Result = Backbone.Model.extend({
  getFields: function() {
    return this.get('_source')
  }
})
var Results = Backbone.Collection.extend({
  model: Result
})

module.exports.results = new Results()

var User = Backbone.Model.extend({
  saveUserData: function() {
    var userdata = this.toJSON().userdata
    $.post('/user', {userdata: JSON.stringify(userdata)}, function(response) {
      //console.log('Userdata saved')
    })
  },
  setUser: function(data) {
    if(typeof data == 'string')
      data = JSON.parse(data)
    this.set(data, {silent: true})
    this.trigger('change')
  },
  fetchUser: function(success) {
    $.when(
      $.get('/user', this.setUser.bind(this))
    ).then(success)
  },
  login: function(u, p, r, success, fail) {
    $.when(
      $.post('/login', {username: u, password: p, remember: r}, this.setUser.bind(this))
    ).then(function(response) {
      response = JSON.parse(response)
      if ( 'err' in response )
        fail(response.msg)
      else
        success()
    })
  },
  forgot: function(u, success, fail) {
    $.when(
      $.post('/request_reset', {username: u})
    ).then(function(response) {
      response = JSON.parse(response)
      if ( 'err' in response )
        fail(response.msg)
      else
        success()
    })
  },
  logout: function() {
    $.get('/logout', function(a) {
      if ( a == 'ok' ){
        this.clear()
        Piwik.trackEvent('Logout', 'Successful')
      }else{
        alert('Någonting gick fel och du kunde inte loggas ut')
        Piwik.trackEvent('Logout', 'Failed')
      }
    }.bind(this))
  },
  register: function(u, p, success, fail) {
    $.when(
      $.post('/register', {username: u, password: p}, this.setUser.bind(this))
    ).then(function(response) {
      response = JSON.parse(response)
      if ( 'err' in response ){
        fail(response.msg)
        Piwik.trackEvent('Register', 'Failed', response.msg)
      }else{
        success()
        Piwik.trackEvent('Register', 'Successful')
      }
    })
  },
  defaults: {
    userdata: {
      searches: [],
      favourites: [],
      related: []
    }
  }
})
var user = new User()
user.on('change:userdata', function() {
  this.saveUserData()
})
module.exports.user = user

window.Models = module.exports

},{"backbone":"5kFNoY","jquery":"HlZQrA","moment":"iROhDJ","underscore":"ZKusGn","vdd/piwik":28,"vdd/query":30}],27:[function(require,module,exports){
var document = window.document,

    requestFrame = (function(){
        var r = 'RequestAnimationFrame'
        return window.requestAnimationFrame || 
          window['webkit'+r] || 
          window['moz'+r] || 
          window['o'+r] || 
          window['ms'+r] || 
          function( callback ) {
            window.setTimeout(callback, 1000 / 60)
          }
    }()),

    coords = function( e ) {

        var html = document.documentElement,
            get = function( e, lr ) {
                var scr = 'scroll' + lr,
                    client = lr == 'Left' ? 'clientX' : 'clientY';
                return e[client] + ( html[ scr ] ? html[ scr ] : document.body[ scr ] );
            },
            scrollY = document.all ? document.body.scrollTop : window.pageYOffset

        return 'touches' in e && e.touches.length ? {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY - scrollY
        } : {
            x: e.pageX || get( e, 'Left'),
            y: ( e.pageY || get( e, 'Top') ) - scrollY
        };
    },

    dec = function( num ) {

        if ( typeof num != 'number' ) {
            num = num * 1;
        }

        var n = num.toFixed( 2 ) * 1;
        return Math.abs(n) > 0.2 ? n : 0;
    },

    M = Math,

    pf = parseFloat,

    pos,

    support = ( typeof document.documentElement.style.WebkitTransform !== 'undefined' ),

    touch = !!( 'ontouchstart' in document ),

    attach = !!( 'attachEvent' in document ),

    addEvent = function( elem, type, fn ) {
        if ( attach ) {
            elem.attachEvent( 'on' + type, fn );
        } else if ('addEventListener' in document) {
            elem.addEventListener( type, fn );
        }
    },

    removeEvent = function( elem, type, fn ) {
        if ( attach ) {
            elem.detachEvent( 'on' + type, fn );
        } else if ('removeEventListener' in document) {
            elem.removeEventListener( type, fn );
        }
    },

    retfalse = function() {
        return false;
    },

    getStyle = function( elem, m ) {
        if ( 'defaultView' in document ) {
            return document.defaultView.getComputedStyle(elem, '').getPropertyValue( m );
        } else if ( 'currentStyle' in elem ) {
            return elem.currentStyle[ m ];
        }
    },

    setStyle = function( elem, styles ) {
        for ( var prop in styles ) {
            elem.style[prop] = styles[ prop ];
        }
    },

    getWH = function( elem, m ) {

        var offset = 'offset' + m.substr(0,1).toUpperCase() + m.substr(1);

        if ( elem[ offset ] ) {
            return pf( elem[ offset ] );
        }
        return pf( getStyle( elem, m ) );
    },

    translate3d = function( elem, arr, scale ) {
        arr = arr || [0,0,0];
        for ( var i in arr ) {
            arr[i] += 'px';
        }
        scale = scale || 1
        elem.style.WebkitTransform = 'translate3d(' + arr.join(',') + ')';
    };

module.exports = function( elem, options ) {

    options = options || {};
    var callbacks = []
    var willStop = false
    var disabled = false
    var released = false
    var defaults = {
            mousemove: false,
            fps: 80,
            smoothness: 3.2,
            x: 0,
            y: 0
        },
        parent = elem.parentNode || window,
        move = false,
        decx = 0, decy = 0,
        winWidth = window.innerWidth,
        winHeight = window.innerHeight,
        images = elem.getElementsByTagName('img'),
        img = images[0],
        x = options.x ||
            -pf( getStyle( elem, 'left' ) ) || 0,
        y = options.y ||
            -pf( getStyle( elem, 'top' ) ) || 0,
        dx = x, cx = x,
        dy = y, cy = y,
        minx = 0, miny = 0,
        mx, my, width, height, xx, yy, zz,
        dz = 1, cz = 1,

        loop = function() {

            if ( touch || !options.mousemove ) {

                decx = dec(( dx - cx ) / options.smoothness);
                decy = dec(( dy - cy ) / options.smoothness);

                if ( !move && released && (decx || decy) ) {
                    dx += decx;
                    dy += decy;
                    x = dx = M.min( 0, M.max( dx, minx ) );
                    y = dy = M.min( 0, M.max( dy, miny ) );
                } else {
                    decx = 0;
                    decy = 0;
                }
            }

            mx = dx - cx;
            my = dy - cy;
            mz = dz - cz;

            var multiplier = (!move && !released) ? 1.5 : 1

            cx += dec( mx / (multiplier*options.smoothness) );
            cy += dec( my / (multiplier*options.smoothness) );
            cz += mz*0.2

            // round up
            if ( M.abs( mx ) < 1 ) {
                cx = Math.round( cx );
            }

            if ( M.abs( my ) < 1 ) {
                cy = Math.round( cy );
            }

            if ( Math.abs(mz.toFixed(4)) == '0.0001' )
                cz = dz = cz.toFixed(4)*1

            if ( xx !== dec(cx) || yy !== dec(cy) || zz !== cz )
                setPosition(dec(cx), dec(cy), cz)
            if ( !willStop ) {
                requestFrame(loop)
            }
        },

        setPosition = function(px, py, pz) {
            /*
            if ( support ) {
                translate3d( elem, [ px, py, 0 ] );
            } else {
                elem.style.left = px + 'px';
                elem.style.top = py + 'px';
            }
            if ( typeof pz != 'undefined' ) {
                for( var i=0; images[i]; i++) {
                    images[i].style.transform = 'scale('+pz+','+pz+')'
                }
                zz = pz
            }
            */
            callbacks.forEach(function(fn) {
                fn(px, py, pz)
            })
            xx = px
            yy = py
        },

        onresize = function() {
            width  = window.innerWidth;//getWH( parent, 'width' );
            height = window.innerHeight;//getWH( parent, 'height' );
            minx = ( getWH( elem, 'width' ) - width ) * -1;
            miny = ( getWH( elem, 'height' ) - height ) * -1;
        },

        tid = null,

        onmove = function(e) {
            if ( !move ) {
                return;
            }

            try {
                e.preventDefault();
            } catch(err) {
                e.returnValue = false;
            }

            if ( e.touches && e.touches.length > 1 ) {
                return;
            }

            pos = coords( e );

            if ( options.mousemove && !touch ) {
                dx = x - M.abs( pos.x/width * minx );
                dy = y - M.abs( pos.y/height * miny );
            } else {
                dx = pos.x - x;
                dy = pos.y - y;

                if ( dx > 0 ) {
                    x = pos.x;
                } else if ( dx < minx ) {
                    x = pos.x - minx;
                }

                if ( dy > 0 ) {
                    y = pos.y;
                } else if ( dy < miny ) {
                    y = pos.y - miny;
                }
            }
            dx = M.min( 0, M.max( dx, minx ) );
            dy = M.min( 0, M.max( dy, miny ) );
        },

        onstart = function(e) {

            if ( 'contains' in document.body && !elem.contains(e.target) )
                return

            if ( disabled )
                return

            released = false

            try {
                e.preventDefault();
            } catch(err) {
                e.returnValue = false;
            }

            pos = coords( e );

            move = true;

            x = pos.x - x;
            y = pos.y - y;
            decx = 0;
            decy = 0;

            addEvent( document, 'mousemove', onmove );
            addEvent( document, 'touchmove', onmove );
        },

        onend = function() {
            released = true
            move = false;
            x = dx;
            y = dy;
            removeEvent( document, 'mousemove', onmove );
            removeEvent( document, 'touchmove', onmove );
        },

        hasPixelEvent = false,
        delta = 0,

        onwheel = function(e) {

            if ( disabled )
                return

            move = false;
            x = dx;
            y = dy;

            e.preventDefault()

            // FF 3.6+
            if ( e.type == 'MozMousePixelScroll' ) {

                hasPixelEvent = true;
                delta = e.detail / -7;

            // other gecko
            } else if ( e.type == 'DOMMouseScroll' ) {
                if ( hasPixelEvent ) {
                    removeEvent( e.currentTarget, e.type, arguments.callee );
                    e.preventDefault();
                    return false;
                } else {
                    delta = e.detail * -3;
                }

            // webkit + IE
            } else {
                delta = e.wheelDelta / 18;
            }

            // webkit horizontal
            if ( 'wheelDeltaX' in e ) {
                dx += e.wheelDeltaX / 18;
            }

            // firefox horizontal
            if ( 'HORIZONTAL_AXIS' in e && e.axis == e.HORIZONTAL_AXIS ) {
                dx += delta;
                return;
            }

            dy += delta;
        };

    for ( var d in defaults ) {
        options[d] = d in options ? options[d] : defaults[d];
    }

    if ( support ) {

        elem.style.left = 0;
        elem.style.top = 0;

        translate3d( elem, [x,y,0] );
    }

    if ( getStyle( parent, 'position' ) == 'static' ) {
        setStyle( parent, { position: 'relative' } );
    }

    setStyle( elem, { position: 'absolute' } );

    if ( options.mousemove && !touch ) {

        move = true;
        options.smoothness *= 5;
        addEvent( document, 'mousemove', onmove );

    } else {

        addEvent( parent, 'mousedown', onstart );
        addEvent( parent, 'mouseup', onend );
        addEvent( parent, 'mouseout', onend );
        addEvent( parent, 'MozMousePixelScroll', onwheel );
        addEvent( parent, 'DOMMouseScroll', onwheel );
        addEvent( parent, 'mousewheel', onwheel );

    }

    addEvent( parent, 'touchstart', onstart );
    addEvent( parent, 'touchend', onend );

    addEvent( window, 'resize', onresize );

    onresize();

    // IE
    if ( attach ) {
        document.attachEvent('ondragstart', retfalse);
    }

    // GO
    loop()

    return {
        onPan: function(cb) {
            callbacks.push(cb)
        },
        setPosition: function(sx, sy, sz) {
            released = false
            if ( sx )
                dx = x = xx = sx
            if ( sy )
                dy = y = yy = sy
            if ( sz )
                dz = sz
        },
        setZoom: function(nz) {
            dz = nz
        },
        disable: function() {
            disabled = true
        },
        enable: function() {
            disabled = false
        },
        destroy: function() {
            willStop = true
            callbacks = []
            removeEvent( parent, 'mousedown', onstart );
            removeEvent( parent, 'touchstart', onstart );
            removeEvent( parent, 'mouseup', onend );
            removeEvent( parent, 'touchend', onend );
            removeEvent( parent, 'mouseout', onend );
            removeEvent( window, 'resize', onresize );
            removeEvent( parent, 'MozMousePixelScroll', onwheel );
            removeEvent( parent, 'DOMMouseScroll', onwheel );
            removeEvent( parent, 'mousewheel', onwheel );
            removeEvent( document, 'mousemove', onmove );

            if ( attach ) {
                document.detachEvent('ondragstart', retfalse);
            }
        }
    };
}

},{}],28:[function(require,module,exports){
var _paq = []
var initialized = false

// Piwik helper(s) to log Custom events
var trackEvent = function(category, action, name){
  if( typeof name != 'undefined' )
    _paq.push(['trackEvent', category, action, name])
  else
    _paq.push(['trackEvent', category, action])
}

module.exports.init = function() {
  if ( initialized )
    return
  initialized = true
  _paq = window._paq = _paq.slice(0)

  _paq.push(['trackPageView'])
  _paq.push(['setSiteId', 1])
  var u=(("https:" == document.location.protocol) ? "https" : "http") + "://193.10.75.68:8080/piwik/"
  _paq.push(['setTrackerUrl', u+'piwik.php'])

  // Load piwik.js asynchronusly
  var d = document
  var g = d.createElement('script')
  var s = d.getElementsByTagName('script')[0]
  g.type = 'text/javascript'
  g.defer = true
  g.async = true
  g.src = u+'piwik.js'
  s.parentNode.insertBefore(g,s)
}

module.exports.trackPageView = function() {
  _paq.push(['trackPageView'])
}

module.exports.trackClick = function(action, name){
  trackEvent('Click', action, name)
}

module.exports.enableLinkTracking = function() {
  _paq.push(['enableLinkTracking'])// Tell Piwik to track links (we need to run this after links have been generated, so keep this line here)
}

module.exports.trackEvent = trackEvent
},{}],29:[function(require,module,exports){

var topics = {}
var subUid = -1

module.exports.on = function(topic, func) {
  if (!topics[topic]) {
    topics[topic] = []
  }
  var token = (++subUid).toString()
  topics[topic].push({
    token: token,
    func: func
  })
  return token
}

module.exports.trigger = function(topic, args) {
  if (!topics[topic])
    return false
  var subscribers = topics[topic]
  var len = subscribers ? subscribers.length : 0
  while (len--)
    subscribers[len].func(args)
  return true
}

module.exports.off = function(token) {
  for (var m in topics) {
    if (topics[m]) {
      for (var i = 0, j = topics[m].length; i < j; i++) {
        if (topics[m][i].token === token) {
          topics[m].splice(i, 1)
          return token
        }
      }
    }
  }
  return false
}
},{}],30:[function(require,module,exports){
var params = {}
var Backbone = require('backbone')

module.exports = {

  sync: function(query) {

    query = query || Backbone.history.getFragment().toString().replace(/^\?/,'')

    var match = /([^\?]+)\?(.*)/.exec(query)
    if ( match && match[2] )
      query = match[2]

    params = {}

    if ( !query )
      return

    query.split('&').forEach(function(part) {
      part = decodeURIComponent(part).split('=')
      params[part[0]] = part[1]
    })
    return this
  },

  build: function(attrs) {
    var arr = []
    for( var i in params ) {
      if ( attrs && attrs.length && attrs.indexOf(i) == -1 )
        continue
      arr.push( encodeURIComponent(i) + '=' + encodeURIComponent(params[i]) )
    }
    return '?'+(arr.join('&'))
  },

  get: function(attr) {
    if ( !attr )
      return params
    if ( params.hasOwnProperty(attr) )
      return params[attr]
  },

  getEncoded: function(attr) {
    if (attr)
      return encodeURIComponent( this.get(attr) )
    return ''
  },

  set: function(p) {
    for( var i in p ) {
      params[i] = p[i]
    }
    return this
  },

  remove: function(i) {
    if( params.hasOwnProperty(i) )
      delete params[i]
    return this
  }
}
},{"backbone":"5kFNoY"}],31:[function(require,module,exports){
var Backbone = require('backbone')
var Router = Backbone.Router.extend({
  routes: {
    "?:query": "search",
    "": "home",
    "favourites": "favourites",
    ":issn/:date/edition/:edition/part/:part/page/:page/": "detail", // /:date/edition/:edition/part/:part/page/:page(/)
    "*notFound": "404"
  }
})

module.exports = new Router()
},{"backbone":"5kFNoY"}],32:[function(require,module,exports){
var $ = require('jquery')
var models = require('./models')
var _ = require('underscore')
var Backbone = require('backbone')
var Piwik = require('vdd/piwik')

var scrolled = 0
var App = null
var masonry = null

var login = function(done) {
  if ( App ) {
    App.setProps({
      modal: {
        addfav: !!done,
        component: 'login',
        onSuccess: function() {
          typeof done == 'function' && done()
        },
        onFail: function(msg) { }
      }
    })
  }
}


module.exports.zoom = function(props) {
  if ( App ) {
    App.setProps({
      zoom: props
    })
  }
}

module.exports.closeZoom = function() {
  App && App.setProps({ zoom: false })
}

module.exports.imgHack = function(src) {
  return src
  return src
    .replace(/1403\-9656/, '1103-9000')
    .replace(/2001\-3868/, '1101-2412')
}

module.exports.setApp = function(instance) {
  App = instance
}

module.exports.setMasonry = function(instance) {
  masonry = instance
}

module.exports.getMasonry = function() {
  return masonry
}

module.exports.retina = function() {
  if (window.matchMedia) {
    var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)")
    if (mq && mq.matches || (window.devicePixelRatio > 1))
      return true
    else
      return false
  } else if ( window.devicePixelRatio > 1 )
    return true
  return false
}

module.exports.capitalize = function(str) {
  var result = [];
  str.toLowerCase().split(/\s+/g).forEach(function(word) {
    result.push(word.charAt(0).toUpperCase() + word.substr(1))
  })
  return result.join(' ')
}

module.exports.addFavourite = function(fav) {
  Piwik.trackClick('Favourites', 'Add', (models.user.get('username') ? 'Logged in' : 'Not logged in'))
  var save = function() {
    // dirty blink
    var $fav = $('#user .favs').fadeTo(200, 0.5)
    setTimeout(function() {
      $fav.fadeTo(200, 1)
    },200)
    var data = models.user.get('userdata')
    var favs = data.favourites || []
    var exists = _.findWhere(favs, {url: fav.url})
    if (exists) {
      return
    } else {
      favs.push(fav)
      data.favourites = favs
      models.user.set('userdata', data)
      models.user.trigger('change:userdata', models.user, data) // saves to server
      Backbone.history.loadUrl()
    }
  }
  if (!models.user.get('username'))
    return login(save)
  else
    save()
}

module.exports.removeFavourite = function(fav) {
  Piwik.trackClick('Favourites', 'Remove', (models.user.get('username') ? 'Logged in' : 'Not logged in'))
  var data = models.user.get('userdata')
  var favs = data.favourites
  var filtered = favs.filter(function(f) {
    return f.url !== fav.url
  })
  if ( !_.isEqual(favs, filtered) ) {
    data.favourites = filtered
    models.user.set('userdata', data)
    models.user.trigger('change:userdata', models.user, data)
    Backbone.history.loadUrl()
  }
}

module.exports.login = login

// Parse out the pathname from URL, fex http://tidningar.bk.se/foo => /foo
module.exports.parsePermaLink = function(url) {
  var fake = document.createElement('a')
  fake.href = url
  if (fake.host === "") // IE9
    fake.href = fake.href
  return fake.pathname
}

// build permaLinks from url params array ":issn/:date/edition/:edition/part/:part/page/:page/"
module.exports.buildPermaLink = function(params) {
  params = params.slice(0,5)
  params.splice(2, 0, 'edition')
  params.splice(4, 0, 'part')
  params.splice(6, 0, 'page')
  return 'http://tidningar.kb.se/'+params.join('/')
}

},{"./models":26,"backbone":"5kFNoY","jquery":"HlZQrA","underscore":"ZKusGn","vdd/piwik":28}]},{},[23])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9hcHBsL1ZERC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2FwcGwvVkREL2Jvd2VyX2NvbXBvbmVudHMvYWlub2pzL2Vhc2luZy5qcyIsIi9hcHBsL1ZERC9ib3dlcl9jb21wb25lbnRzL2Fpbm9qcy9saXBzdW0uanMiLCIvYXBwbC9WREQvYm93ZXJfY29tcG9uZW50cy9waWthZGF5L3Bpa2FkYXkuanMiLCIvYXBwbC9WREQvc3JjL2pzL2JhY2tib25lLnF1ZXJ5cGFyYW1zLTEuMS1zaGltLmpzIiwiL2FwcGwvVkREL3NyYy9qcy9jb21wb25lbnRzL2FwcC5qcyIsIi9hcHBsL1ZERC9zcmMvanMvY29tcG9uZW50cy9kZXRhaWwuanMiLCIvYXBwbC9WREQvc3JjL2pzL2NvbXBvbmVudHMvZmlsdGVycy5qcyIsIi9hcHBsL1ZERC9zcmMvanMvY29tcG9uZW50cy9maWx0ZXJzL2RhdGUvZGF0ZS5qcyIsIi9hcHBsL1ZERC9zcmMvanMvY29tcG9uZW50cy9maWx0ZXJzL2RhdGUvdGltZWxpbmUuanMiLCIvYXBwbC9WREQvc3JjL2pzL2NvbXBvbmVudHMvZmlsdGVycy9uZXdzcGFwZXIvYnV0dG9uLmpzIiwiL2FwcGwvVkREL3NyYy9qcy9jb21wb25lbnRzL2ZpbHRlcnMvbmV3c3BhcGVyL25ld3NwYXBlci5qcyIsIi9hcHBsL1ZERC9zcmMvanMvY29tcG9uZW50cy9nYWxsZXJ5LmpzIiwiL2FwcGwvVkREL3NyYy9qcy9jb21wb25lbnRzL2hvbWUuanMiLCIvYXBwbC9WREQvc3JjL2pzL2NvbXBvbmVudHMvbG9naW4uanMiLCIvYXBwbC9WREQvc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCIvYXBwbC9WREQvc3JjL2pzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi5qcyIsIi9hcHBsL1ZERC9zcmMvanMvY29tcG9uZW50cy9yZXN1bHQuanMiLCIvYXBwbC9WREQvc3JjL2pzL2NvbXBvbmVudHMvcmVzdWx0cy5qcyIsIi9hcHBsL1ZERC9zcmMvanMvY29tcG9uZW50cy9zZWFyY2guanMiLCIvYXBwbC9WREQvc3JjL2pzL2NvbXBvbmVudHMvc29ydC5qcyIsIi9hcHBsL1ZERC9zcmMvanMvY29tcG9uZW50cy90aW1lbGluZS5qcyIsIi9hcHBsL1ZERC9zcmMvanMvY29tcG9uZW50cy96b29tLmpzIiwiL2FwcGwvVkREL3NyYy9qcy9pbmRleC5qcyIsIi9hcHBsL1ZERC9zcmMvanMvdmRkL2xvY2FsZS5qcyIsIi9hcHBsL1ZERC9zcmMvanMvdmRkL21hc29ucnkuanMiLCIvYXBwbC9WREQvc3JjL2pzL3ZkZC9tb2RlbHMuanMiLCIvYXBwbC9WREQvc3JjL2pzL3ZkZC9wYW4uanMiLCIvYXBwbC9WREQvc3JjL2pzL3ZkZC9waXdpay5qcyIsIi9hcHBsL1ZERC9zcmMvanMvdmRkL3B1YnN1Yi5qcyIsIi9hcHBsL1ZERC9zcmMvanMvdmRkL3F1ZXJ5LmpzIiwiL2FwcGwvVkREL3NyYy9qcy92ZGQvcm91dGVyLmpzIiwiL2FwcGwvVkREL3NyYy9qcy92ZGQvdmRkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3g1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBFYXNpbmdcbiAqIEJlemllciBhbmQgZWFzaW5nIGZ1bmN0aW9ucyBiYXNlZCBvbiBSb2JlcnQgUGVubmVyJ3MgRWFzaW5nIEZ1bmN0aW9uc1xuICogRXhhbXBsZSB1c2FnZSBmb3IgZnVuY3Rpb246IEVhc2luZygnZWFzZU91dFF1YXJ0JylcbiAqIEZvciBiZXppZXIgY3VydmUgdXNlIEVhc2luZy5iZXooJ2Vhc2VPdXRRdWFydCcpXG4gKiBUbyBjb252ZXJ0IGEgYmV6aWVyIGN1cnZlIHRvIGZ1bmN0aW9uIHVzZSB0b0Z1bmN0aW9uOiBFYXNpbmcudG9GdW5jdGlvbihbMC4xNjUsIDAuODQsIDAuNDQsIDFdKVxuICovXG5cbiFmdW5jdGlvbihhLGksbixvKXtvPWkubGVuZ3RoJiZ0eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiP2Z1bmN0aW9uKGUsdCxuKXtuPVtdO2Zvcih0PTA7dDxpLmxlbmd0aDt0Kyspe24ucHVzaChyZXF1aXJlKGlbdF0udG9Mb3dlckNhc2UoKSkpfXJldHVybiBlLmFwcGx5KG51bGwsbil9KG4pOm4uYXBwbHkodGhpcyxpLm1hcChmdW5jdGlvbihqKXtyZXR1cm4gdGhpc1tqXX0sdGhpcykpO2lmKHR5cGVvZiBtb2R1bGU9PVwib2JqZWN0XCIpe21vZHVsZS5leHBvcnRzPW99ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT1cImZ1bmN0aW9uXCIpe2RlZmluZShpLG4pfWVsc2V7dGhpc1thXT1vfX0uY2FsbFxuKHRoaXMsICdFYXNpbmcnLCBbXSwgZnVuY3Rpb24oKSB7XG5cbiAgdmFyIGVhc2luZ3MgPSB7XG4gICAgJ2xpbmVhcic6ICAgICAgICAgWzAuMjUwLCAwLjI1MCwgMC43NTAsIDAuNzUwXSxcbiAgICAnZWFzZSc6ICAgICAgICAgICBbMC4yNTAsIDAuMTAwLCAwLjI1MCwgMS4wMDBdLFxuICAgICdlYXNlSW4nOiAgICAgICAgIFswLjQyMCwgMC4wMDAsIDEuMDAwLCAxLjAwMF0sXG4gICAgJ2Vhc2VPdXQnOiAgICAgICAgWzAuMDAwLCAwLjAwMCwgMC41ODAsIDEuMDAwXSxcbiAgICBcImVhc2VJbk91dFwiOiAgICAgIFswLjQyMCwgMC4wMDAsIDAuNTgwLCAxLjAwMF0sXG4gICAgXCJlYXNlSW5RdWFkXCI6ICAgICBbMC41NTAsIDAuMDg1LCAwLjY4MCwgMC41MzBdLFxuICAgIFwiZWFzZUluQ3ViaWNcIjogICAgWzAuNTUwLCAwLjA1NSwgMC42NzUsIDAuMTkwXSxcbiAgICBcImVhc2VJblF1YXJ0XCI6ICAgIFswLjg5NSwgMC4wMzAsIDAuNjg1LCAwLjIyMF0sXG4gICAgXCJlYXNlSW5RdWludFwiOiAgICBbMC43NTUsIDAuMDUwLCAwLjg1NSwgMC4wNjBdLFxuICAgIFwiZWFzZUluU2luZVwiOiAgICAgWzAuNDcwLCAwLjAwMCwgMC43NDUsIDAuNzE1XSxcbiAgICBcImVhc2VJbkV4cG9cIjogICAgIFswLjk1MCwgMC4wNTAsIDAuNzk1LCAwLjAzNV0sXG4gICAgXCJlYXNlSW5DaXJjXCI6ICAgICBbMC42MDAsIDAuMDQwLCAwLjk4MCwgMC4zMzVdLFxuICAgIFwiZWFzZUluQmFja1wiOiAgICAgWzAuNjAwLCAtMC4yODAsIDAuNzM1LCAwLjA0NV0sXG4gICAgXCJlYXNlT3V0UXVhZFwiOiAgICBbMC4yNTAsIDAuNDYwLCAwLjQ1MCwgMC45NDBdLFxuICAgIFwiZWFzZU91dEN1YmljXCI6ICAgWzAuMjE1LCAwLjYxMCwgMC4zNTUsIDEuMDAwXSxcbiAgICBcImVhc2VPdXRRdWFydFwiOiAgIFswLjE2NSwgMC44NDAsIDAuNDQwLCAxLjAwMF0sXG4gICAgXCJlYXNlT3V0UXVpbnRcIjogICBbMC4yMzAsIDEuMDAwLCAwLjMyMCwgMS4wMDBdLFxuICAgIFwiZWFzZU91dFNpbmVcIjogICAgWzAuMzkwLCAwLjU3NSwgMC41NjUsIDEuMDAwXSxcbiAgICBcImVhc2VPdXRFeHBvXCI6ICAgIFswLjE5MCwgMS4wMDAsIDAuMjIwLCAxLjAwMF0sXG4gICAgXCJlYXNlT3V0Q2lyY1wiOiAgICBbMC4wNzUsIDAuODIwLCAwLjE2NSwgMS4wMDBdLFxuICAgIFwiZWFzZU91dEJhY2tcIjogICAgWzAuMTc1LCAwLjg4NSwgMC4zMjAsIDEuMjc1XSxcbiAgICBcImVhc2VJbk91dFF1YWRcIjogIFswLjQ1NSwgMC4wMzAsIDAuNTE1LCAwLjk1NV0sXG4gICAgXCJlYXNlSW5PdXRDdWJpY1wiOiBbMC42NDUsIDAuMDQ1LCAwLjM1NSwgMS4wMDBdLFxuICAgIFwiZWFzZUluT3V0UXVhcnRcIjogWzAuNzcwLCAwLjAwMCwgMC4xNzUsIDEuMDAwXSxcbiAgICBcImVhc2VJbk91dFF1aW50XCI6IFswLjg2MCwgMC4wMDAsIDAuMDcwLCAxLjAwMF0sXG4gICAgXCJlYXNlSW5PdXRTaW5lXCI6ICBbMC40NDUsIDAuMDUwLCAwLjU1MCwgMC45NTBdLFxuICAgIFwiZWFzZUluT3V0RXhwb1wiOiAgWzEuMDAwLCAwLjAwMCwgMC4wMDAsIDEuMDAwXSxcbiAgICBcImVhc2VJbk91dENpcmNcIjogIFswLjc4NSwgMC4xMzUsIDAuMTUwLCAwLjg2MF0sXG4gICAgXCJlYXNlSW5PdXRCYWNrXCI6ICBbMC42ODAsIC0wLjU1MCwgMC4yNjUsIDEuNTUwXVxuICB9XG5cbiAgdmFyIHZhbGlkYXRlID0gZnVuY3Rpb24odHlwZSkge1xuICAgIGlmICghdHlwZSlcbiAgICAgIHJldHVybiBlYXNpbmdzLmxpbmVhciAvLyBhbGxvd3MgRWFzaW5nKClcblxuICAgIGlmICggIWVhc2luZ3MuaGFzT3duUHJvcGVydHkodHlwZSkgKVxuICAgICAgdGhyb3cgJ0Vhc2luZyAnK3R5cGUrJyBub3QgZm91bmQuJ1xuXG4gICAgcmV0dXJuIGVhc2luZ3NbdHlwZV1cbiAgfVxuXG4gIHZhciB0b0Z1bmN0aW9uID0gZnVuY3Rpb24oYmV6KSB7XG4gICAgdmFyIHBvbHlCZXogPSBmdW5jdGlvbihwMSwgcDIpIHtcbiAgICAgIHZhciBBID0gW251bGwsIG51bGxdLCBCID0gW251bGwsIG51bGxdLCBDID0gW251bGwsIG51bGxdXG4gICAgICB2YXIgYmV6Q29PcmQgPSBmdW5jdGlvbih0LCBheCkge1xuICAgICAgICBDW2F4XSA9IDMgKiBwMVtheF0sIEJbYXhdID0gMyAqIChwMltheF0gLSBwMVtheF0pIC0gQ1theF0sIEFbYXhdID0gMSAtIENbYXhdIC0gQltheF1cbiAgICAgICAgcmV0dXJuIHQgKiAoQ1theF0gKyB0ICogKEJbYXhdICsgdCAqIEFbYXhdKSlcbiAgICAgIH1cbiAgICAgIHZhciB4RGVyaXYgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiBDWzBdICsgdCAqICgyICogQlswXSArIDMgKiBBWzBdICogdClcbiAgICAgIH1cbiAgICAgIHZhciB4Rm9yVCA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgdmFyIHggPSB0LCBpID0gMCwgelxuICAgICAgICB3aGlsZSAoKytpIDwgMTQpIHtcbiAgICAgICAgICB6ID0gYmV6Q29PcmQoeCwgMCkgLSB0XG4gICAgICAgICAgaWYgKE1hdGguYWJzKHopIDwgMWUtMykgXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIHggLT0geiAvIHhEZXJpdih4KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gYmV6Q29PcmQoeEZvclQodCksIDEpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbih4LCB0LCBiLCBjLCBkKSB7XG4gICAgICByZXR1cm4gYyAqIHBvbHlCZXooW2JlelswXSwgYmV6WzFdXSwgW2JlelsyXSwgYmV6WzNdXSkodC9kKSArIGJcbiAgICB9XG4gIH1cblxuICB2YXIgZWFzaW5nID0gZnVuY3Rpb24odHlwZSkge1xuICAgIHJldHVybiB0b0Z1bmN0aW9uKHZhbGlkYXRlKHR5cGUpKVxuICB9XG4gIGVhc2luZy5iZXogPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgcmV0dXJuIHZhbGlkYXRlKHR5cGUpXG4gIH1cbiAgXG4gIGVhc2luZy50b0Z1bmN0aW9uID0gdG9GdW5jdGlvblxuXG4gIHJldHVybiBlYXNpbmdcbn0pIiwiLypcbiAqIExpcHN1bVxuICogQ3JlYXRlIHJhbmRvbSBsaXBzdW0gd29yZHMsIHNlbnRlbmNlcyBvciBwYXJhZ3JhcGhzXG4gKiBGaXJzdCAmIHNlY29uZCBhcmd1bWVudHMgZGVmaW5lcyBhIHJhbmdlLCBmLmV4IExpcHN1bS53b3JkKDIsNikgcmV0dXJucyBtaW5pbXVtIDIgYW5kIG1heGltdW0gNiB3b3Jkcy5cbiAqL1xuXG4hZnVuY3Rpb24oYSxpLG4sbyl7bz1pLmxlbmd0aCYmdHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIj9mdW5jdGlvbihlLHQsbil7bj1bXTtmb3IodD0wO3Q8aS5sZW5ndGg7dCsrKXtuLnB1c2gocmVxdWlyZShpW3RdLnRvTG93ZXJDYXNlKCkpKX1yZXR1cm4gZS5hcHBseShudWxsLG4pfShuKTpuLmFwcGx5KHRoaXMsaS5tYXAoZnVuY3Rpb24oail7cmV0dXJuIHRoaXNbal19LHRoaXMpKTtpZih0eXBlb2YgbW9kdWxlPT1cIm9iamVjdFwiKXttb2R1bGUuZXhwb3J0cz1vfWVsc2UgaWYodHlwZW9mIGRlZmluZT09XCJmdW5jdGlvblwiKXtkZWZpbmUoaSxuKX1lbHNle3RoaXNbYV09b319LmNhbGxcbih0aGlzLCAnTGlwc3VtJywgW10sIGZ1bmN0aW9uKCkge1xuXG4gIHZhciB3b3JkcyA9ICdsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQgdXQgZWdldCB0dXJwaXMgZG9sb3IgaWQgZWxlbWVudHVtIHVybmEgc2VkIGFyY3UgbWFnbmEgYWNjdW1zYW4gdm9sdXRwYXQgdHJpc3RpcXVlIGV1IHJob25jdXMgYXQgbGVjdHVzIHF1aXNxdWUgbGFjdXMgYW50ZSBzZW1wZXIgaW4gZmV1Z2lhdCB2aXRhZSBjb21tb2RvIG5vbiBtYXVyaXMgcXVpc3F1ZSB2ZWwgc2VtIHNlbSBtYWVjZW5hcyBwZWxsZW50ZXNxdWUgdWx0cmljZXMgdHJpc3RpcXVlIGZ1c2NlIG5pYmggZW5pbSBwb3J0YSBpbiBjb252YWxsaXMgaWQgY29uc2VxdWF0IHF1aXMgcHVydXMgZnVzY2UgaWFjdWxpcyBlbmltIGlkIG1hdXJpcyBtb2xsaXMgaWQgYWNjdW1zYW4gaXBzdW0gc2FnaXR0aXMgcXVpc3F1ZSBpbiBwaGFyZXRyYSBtYWduYSBpbnRlZ2VyIGEgbWF0dGlzIG1hdXJpcyBudWxsYSBjb25kaW1lbnR1bSBtb2xlc3RpZSBtYXNzYSBhIG1hbGVzdWFkYSBkaWFtIHJ1dHJ1bSB2ZWwgc3VzcGVuZGlzc2UgZmVybWVudHVtIGxhY3VzIGlkIGVyYXQgdm9sdXRwYXQgY3Vyc3VzIGRvbmVjIGF0IGZlbGlzIGFudGUgZWdldCBjdXJzdXMgcmlzdXMgbnVuYyBpbiBvZGlvIG5lYyBtaSBncmF2aWRhIHJ1dHJ1bSBuZWMgcHVsdmluYXIgdHVycGlzIHF1aXNxdWUgaWQgdGVsbHVzIHNlbSBudW5jIHNlZCBkdWkgcXVpcyBtaSB0cmlzdGlxdWUgdml2ZXJyYScuc3BsaXQoJyAnKVxuICB2YXIgZW5kaW5ncyA9IFwiLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4/PyFcIlxuXG4gIHZhciByYW5kID0gZnVuY3Rpb24oIGxlbiApIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGxlbiApXG4gIH1cbiAgdmFyIHJhbmdlID0gZnVuY3Rpb24oIG1pbiwgbWF4ICkge1xuICAgIHJldHVybiByYW5kKCBtYXggLSBtaW4gKyAxICkgKyBtaW5cbiAgfVxuICB2YXIgY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKCB3b3JkICkge1xuICAgIHJldHVybiB3b3JkLnN1YnN0cigwLDEpLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnN1YnN0cigxKVxuICB9XG4gIHZhciB3b3JkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdvcmRzW3JhbmQod29yZHMubGVuZ3RoKV1cbiAgfVxuICB2YXIgZW5kaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGkgPSByYW5kKGVuZGluZ3MubGVuZ3RoKVxuICAgIHJldHVybiBlbmRpbmdzLnN1YnN0cmluZyhpLCBpKzEpXG4gIH1cblxuICByZXR1cm4ge1xuXG4gICAgd29yZHM6IGZ1bmN0aW9uKCBtaW4sIG1heCwgY2FwICkge1xuICAgICAgbWluID0gbWluIHx8IDFcblxuICAgICAgaWYgKCBtaW4gPCAxIClcbiAgICAgICAgcmV0dXJuICcnXG5cbiAgICAgIGlmICggbWF4ID09PSB0cnVlICkge1xuICAgICAgICBjYXAgPSB0cnVlXG4gICAgICAgIG1heCA9IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgaWYgKCB0eXBlb2YgbWF4ID09ICdudW1iZXInIClcbiAgICAgICAgbWluID0gcmFuZ2UobWluLCBtYXgpXG5cbiAgICAgIHZhciB0ZXh0ID0gY2FwID8gY2FwaXRhbGl6ZSh3b3JkKCkpIDogd29yZCgpXG5cbiAgICAgIHdoaWxlKCBtaW4tLSApXG4gICAgICAgIHRleHQgKz0gd29yZCgpICsgJyAnXG5cbiAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxuICAgIH0sXG5cbiAgICBzZW50ZW5jZXM6IGZ1bmN0aW9uKCBtaW4sIG1heCApIHtcbiAgICAgIG1pbiA9IG1pbiB8fCA4XG5cbiAgICAgIGlmICggbWluIDwgMSApXG4gICAgICAgIHJldHVybiAnJ1xuXG4gICAgICBpZiAoIHR5cGVvZiBtYXggPT0gJ251bWJlcicgKVxuICAgICAgICBtaW4gPSByYW5nZShtaW4sIG1heClcblxuICAgICAgdmFyIHRleHQgPSBjYXBpdGFsaXplKCB3b3JkKCkgKVxuICAgICAgdmFyIGNvbW1hID0gcmFuZCgyKSA/IHJhbmQoIG1pbi0xICkgOiBmYWxzZVxuXG4gICAgICB3aGlsZSggbWluLS0gKVxuICAgICAgICB0ZXh0ICs9IHdvcmQoKSArICgoIGNvbW1hICYmIGNvbW1hID09PSBtaW4gKSA/ICcsICcgOiAnICcpXG5cbiAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xccysvLCcgJykuc3Vic3RyKDAsIHRleHQubGVuZ3RoLTIpICsgJy4nXG4gICAgfSxcblxuICAgIHBhcmFncmFwaHM6IGZ1bmN0aW9uKCBtaW4sIG1heCApIHtcbiAgICAgIG1pbiA9IG1pbiB8fCA0MFxuICAgICAgaWYgKCBtaW4gPCAxIClcbiAgICAgICAgcmV0dXJuICcnXG5cbiAgICAgIGlmICggbWluIDwgOCApXG4gICAgICAgIHJldHVybiB0aGlzLnNlbnRlbmNlcyggbWluIClcblxuICAgICAgaWYgKCB0eXBlb2YgbWF4ID09ICdudW1iZXInIClcbiAgICAgICAgbWluID0gcmFuZ2UobWluLCBtYXgpXG5cbiAgICAgIHZhciBzZW50ZW5jZXMgPSBNYXRoLmZsb29yKG1pbi84KVxuICAgICAgdmFyIHJlc3QgPSBtaW4gLSAoc2VudGVuY2VzICogOClcbiAgICAgIHZhciB0ZXh0ID0gJydcblxuICAgICAgd2hpbGUoIHNlbnRlbmNlcy0tIClcbiAgICAgICAgdGV4dCArPSB0aGlzLnNlbnRlbmNlcyggOCApICsgJyAnXG5cbiAgICAgIGlmICggcmVzdCApXG4gICAgICAgIHJldHVybiB0ZXh0ICsgdGhpcy5zZW50ZW5jZXMocmVzdClcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIHRleHQuc3Vic3RyKDAsIHRleHQubGVuZ3RoLTIpXG4gICAgfVxuICB9XG59KVxuXG4iLCIvKiFcbiAqIFBpa2FkYXlcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNCBEYXZpZCBCdXNoZWxsIHwgQlNEICYgTUlUIGxpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20vZGJ1c2hlbGwvUGlrYWRheVxuICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSlcbntcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgbW9tZW50O1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gQ29tbW9uSlMgbW9kdWxlXG4gICAgICAgIC8vIExvYWQgbW9tZW50LmpzIGFzIGFuIG9wdGlvbmFsIGRlcGVuZGVuY3lcbiAgICAgICAgdHJ5IHsgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7IH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShtb21lbnQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uIChyZXEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIExvYWQgbW9tZW50LmpzIGFzIGFuIG9wdGlvbmFsIGRlcGVuZGVuY3lcbiAgICAgICAgICAgIHZhciBpZCA9ICdtb21lbnQnO1xuICAgICAgICAgICAgbW9tZW50ID0gcmVxLmRlZmluZWQgJiYgcmVxLmRlZmluZWQoaWQpID8gcmVxKGlkKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KG1vbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QuUGlrYWRheSA9IGZhY3Rvcnkocm9vdC5tb21lbnQpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKG1vbWVudClcbntcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBmZWF0dXJlIGRldGVjdGlvbiBhbmQgaGVscGVyIGZ1bmN0aW9uc1xuICAgICAqL1xuICAgIHZhciBoYXNNb21lbnQgPSB0eXBlb2YgbW9tZW50ID09PSAnZnVuY3Rpb24nLFxuXG4gICAgaGFzRXZlbnRMaXN0ZW5lcnMgPSAhIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyLFxuXG4gICAgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQsXG5cbiAgICBzdG8gPSB3aW5kb3cuc2V0VGltZW91dCxcblxuICAgIGFkZEV2ZW50ID0gZnVuY3Rpb24oZWwsIGUsIGNhbGxiYWNrLCBjYXB0dXJlKVxuICAgIHtcbiAgICAgICAgaWYgKGhhc0V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGUsIGNhbGxiYWNrLCAhIWNhcHR1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGVsLCBlLCBjYWxsYmFjaywgY2FwdHVyZSlcbiAgICB7XG4gICAgICAgIGlmIChoYXNFdmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLCBjYWxsYmFjaywgISFjYXB0dXJlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmRldGFjaEV2ZW50KCdvbicgKyBlLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZmlyZUV2ZW50ID0gZnVuY3Rpb24oZWwsIGV2ZW50TmFtZSwgZGF0YSlcbiAgICB7XG4gICAgICAgIHZhciBldjtcblxuICAgICAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgICAgIGV2LmluaXRFdmVudChldmVudE5hbWUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIGV2ID0gZXh0ZW5kKGV2LCBkYXRhKTtcbiAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgICAgICAgICBldiA9IGV4dGVuZChldiwgZGF0YSk7XG4gICAgICAgICAgICBlbC5maXJlRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgZXYpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRyaW0gPSBmdW5jdGlvbihzdHIpXG4gICAge1xuICAgICAgICByZXR1cm4gc3RyLnRyaW0gPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csJycpO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbilcbiAgICB7XG4gICAgICAgIHJldHVybiAoJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNuICsgJyAnKSAhPT0gLTE7XG4gICAgfSxcblxuICAgIGFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgaWYgKCFoYXNDbGFzcyhlbCwgY24pKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSAoZWwuY2xhc3NOYW1lID09PSAnJykgPyBjbiA6IGVsLmNsYXNzTmFtZSArICcgJyArIGNuO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gdHJpbSgoJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnKS5yZXBsYWNlKCcgJyArIGNuICsgJyAnLCAnICcpKTtcbiAgICB9LFxuXG4gICAgaXNBcnJheSA9IGZ1bmN0aW9uKG9iailcbiAgICB7XG4gICAgICAgIHJldHVybiAoL0FycmF5LykudGVzdChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSk7XG4gICAgfSxcblxuICAgIGlzRGF0ZSA9IGZ1bmN0aW9uKG9iailcbiAgICB7XG4gICAgICAgIHJldHVybiAoL0RhdGUvKS50ZXN0KE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSAmJiAhaXNOYU4ob2JqLmdldFRpbWUoKSk7XG4gICAgfSxcblxuICAgIGlzTGVhcFllYXIgPSBmdW5jdGlvbih5ZWFyKVxuICAgIHtcbiAgICAgICAgLy8gc29sdXRpb24gYnkgTWF0dGkgVmlya2t1bmVuOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80ODgxOTUxXG4gICAgICAgIHJldHVybiB5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwIHx8IHllYXIgJSA0MDAgPT09IDA7XG4gICAgfSxcblxuICAgIGdldERheXNJbk1vbnRoID0gZnVuY3Rpb24oeWVhciwgbW9udGgpXG4gICAge1xuICAgICAgICByZXR1cm4gWzMxLCBpc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdW21vbnRoXTtcbiAgICB9LFxuXG4gICAgc2V0VG9TdGFydE9mRGF5ID0gZnVuY3Rpb24oZGF0ZSlcbiAgICB7XG4gICAgICAgIGlmIChpc0RhdGUoZGF0ZSkpIGRhdGUuc2V0SG91cnMoMCwwLDAsMCk7XG4gICAgfSxcblxuICAgIGNvbXBhcmVEYXRlcyA9IGZ1bmN0aW9uKGEsYilcbiAgICB7XG4gICAgICAgIC8vIHdlYWsgZGF0ZSBjb21wYXJpc29uICh1c2Ugc2V0VG9TdGFydE9mRGF5KGRhdGUpIHRvIGVuc3VyZSBjb3JyZWN0IHJlc3VsdClcbiAgICAgICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKTtcbiAgICB9LFxuXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24odG8sIGZyb20sIG92ZXJ3cml0ZSlcbiAgICB7XG4gICAgICAgIHZhciBwcm9wLCBoYXNQcm9wO1xuICAgICAgICBmb3IgKHByb3AgaW4gZnJvbSkge1xuICAgICAgICAgICAgaGFzUHJvcCA9IHRvW3Byb3BdICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoaGFzUHJvcCAmJiB0eXBlb2YgZnJvbVtwcm9wXSA9PT0gJ29iamVjdCcgJiYgZnJvbVtwcm9wXS5ub2RlTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGF0ZShmcm9tW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IG5ldyBEYXRlKGZyb21bcHJvcF0uZ2V0VGltZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0FycmF5KGZyb21bcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gZnJvbVtwcm9wXS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gZXh0ZW5kKHt9LCBmcm9tW3Byb3BdLCBvdmVyd3JpdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3ZlcndyaXRlIHx8ICFoYXNQcm9wKSB7XG4gICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBmcm9tW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0bztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBkZWZhdWx0cyBhbmQgbG9jYWxpc2F0aW9uXG4gICAgICovXG4gICAgZGVmYXVsdHMgPSB7XG5cbiAgICAgICAgLy8gYmluZCB0aGUgcGlja2VyIHRvIGEgZm9ybSBmaWVsZFxuICAgICAgICBmaWVsZDogbnVsbCxcblxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IHNob3cvaGlkZSB0aGUgcGlja2VyIG9uIGBmaWVsZGAgZm9jdXMgKGRlZmF1bHQgYHRydWVgIGlmIGBmaWVsZGAgaXMgc2V0KVxuICAgICAgICBib3VuZDogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8vIHBvc2l0aW9uIG9mIHRoZSBkYXRlcGlja2VyLCByZWxhdGl2ZSB0byB0aGUgZmllbGQgKGRlZmF1bHQgdG8gYm90dG9tICYgbGVmdClcbiAgICAgICAgLy8gKCdib3R0b20nICYgJ2xlZnQnIGtleXdvcmRzIGFyZSBub3QgdXNlZCwgJ3RvcCcgJiAncmlnaHQnIGFyZSBtb2RpZmllciBvbiB0aGUgYm90dG9tL2xlZnQgcG9zaXRpb24pXG4gICAgICAgIHBvc2l0aW9uOiAnYm90dG9tIGxlZnQnLFxuXG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IG91dHB1dCBmb3JtYXQgZm9yIGAudG9TdHJpbmcoKWAgYW5kIGBmaWVsZGAgdmFsdWVcbiAgICAgICAgZm9ybWF0OiAnWVlZWS1NTS1ERCcsXG5cbiAgICAgICAgLy8gdGhlIGluaXRpYWwgZGF0ZSB0byB2aWV3IHdoZW4gZmlyc3Qgb3BlbmVkXG4gICAgICAgIGRlZmF1bHREYXRlOiBudWxsLFxuXG4gICAgICAgIC8vIG1ha2UgdGhlIGBkZWZhdWx0RGF0ZWAgdGhlIGluaXRpYWwgc2VsZWN0ZWQgdmFsdWVcbiAgICAgICAgc2V0RGVmYXVsdERhdGU6IGZhbHNlLFxuXG4gICAgICAgIC8vIGZpcnN0IGRheSBvZiB3ZWVrICgwOiBTdW5kYXksIDE6IE1vbmRheSBldGMpXG4gICAgICAgIGZpcnN0RGF5OiAwLFxuXG4gICAgICAgIC8vIHRoZSBtaW5pbXVtL2VhcmxpZXN0IGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWRcbiAgICAgICAgbWluRGF0ZTogbnVsbCxcbiAgICAgICAgLy8gdGhlIG1heGltdW0vbGF0ZXN0IGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWRcbiAgICAgICAgbWF4RGF0ZTogbnVsbCxcblxuICAgICAgICAvLyBudW1iZXIgb2YgeWVhcnMgZWl0aGVyIHNpZGUsIG9yIGFycmF5IG9mIHVwcGVyL2xvd2VyIHJhbmdlXG4gICAgICAgIHllYXJSYW5nZTogMTAsXG5cbiAgICAgICAgLy8gdXNlZCBpbnRlcm5hbGx5IChkb24ndCBjb25maWcgb3V0c2lkZSlcbiAgICAgICAgbWluWWVhcjogMCxcbiAgICAgICAgbWF4WWVhcjogOTk5OSxcbiAgICAgICAgbWluTW9udGg6IHVuZGVmaW5lZCxcbiAgICAgICAgbWF4TW9udGg6IHVuZGVmaW5lZCxcblxuICAgICAgICBpc1JUTDogZmFsc2UsXG5cbiAgICAgICAgLy8gQWRkaXRpb25hbCB0ZXh0IHRvIGFwcGVuZCB0byB0aGUgeWVhciBpbiB0aGUgY2FsZW5kYXIgdGl0bGVcbiAgICAgICAgeWVhclN1ZmZpeDogJycsXG5cbiAgICAgICAgLy8gUmVuZGVyIHRoZSBtb250aCBhZnRlciB5ZWFyIGluIHRoZSBjYWxlbmRhciB0aXRsZVxuICAgICAgICBzaG93TW9udGhBZnRlclllYXI6IGZhbHNlLFxuXG4gICAgICAgIC8vIGhvdyBtYW55IG1vbnRocyBhcmUgdmlzaWJsZSAobm90IGltcGxlbWVudGVkIHlldClcbiAgICAgICAgbnVtYmVyT2ZNb250aHM6IDEsXG5cbiAgICAgICAgLy8gaW50ZXJuYXRpb25hbGl6YXRpb25cbiAgICAgICAgaTE4bjoge1xuICAgICAgICAgICAgcHJldmlvdXNNb250aCA6ICdQcmV2aW91cyBNb250aCcsXG4gICAgICAgICAgICBuZXh0TW9udGggICAgIDogJ05leHQgTW9udGgnLFxuICAgICAgICAgICAgbW9udGhzICAgICAgICA6IFsnSmFudWFyeScsJ0ZlYnJ1YXJ5JywnTWFyY2gnLCdBcHJpbCcsJ01heScsJ0p1bmUnLCdKdWx5JywnQXVndXN0JywnU2VwdGVtYmVyJywnT2N0b2JlcicsJ05vdmVtYmVyJywnRGVjZW1iZXInXSxcbiAgICAgICAgICAgIHdlZWtkYXlzICAgICAgOiBbJ1N1bmRheScsJ01vbmRheScsJ1R1ZXNkYXknLCdXZWRuZXNkYXknLCdUaHVyc2RheScsJ0ZyaWRheScsJ1NhdHVyZGF5J10sXG4gICAgICAgICAgICB3ZWVrZGF5c1Nob3J0IDogWydTdW4nLCdNb24nLCdUdWUnLCdXZWQnLCdUaHUnLCdGcmknLCdTYXQnXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIG9uU2VsZWN0OiBudWxsLFxuICAgICAgICBvbk9wZW46IG51bGwsXG4gICAgICAgIG9uQ2xvc2U6IG51bGwsXG4gICAgICAgIG9uRHJhdzogbnVsbFxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIHRlbXBsYXRpbmcgZnVuY3Rpb25zIHRvIGFic3RyYWN0IEhUTUwgcmVuZGVyaW5nXG4gICAgICovXG4gICAgcmVuZGVyRGF5TmFtZSA9IGZ1bmN0aW9uKG9wdHMsIGRheSwgYWJicilcbiAgICB7XG4gICAgICAgIGRheSArPSBvcHRzLmZpcnN0RGF5O1xuICAgICAgICB3aGlsZSAoZGF5ID49IDcpIHtcbiAgICAgICAgICAgIGRheSAtPSA3O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhYmJyID8gb3B0cy5pMThuLndlZWtkYXlzU2hvcnRbZGF5XSA6IG9wdHMuaTE4bi53ZWVrZGF5c1tkYXldO1xuICAgIH0sXG5cbiAgICByZW5kZXJEYXkgPSBmdW5jdGlvbihpLCBpc1NlbGVjdGVkLCBpc1RvZGF5LCBpc0Rpc2FibGVkLCBpc0VtcHR5KVxuICAgIHtcbiAgICAgICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgICAgICAgIHJldHVybiAnPHRkIGNsYXNzPVwiaXMtZW1wdHlcIj48L3RkPic7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLWRpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVG9kYXkpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy10b2RheScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJzx0ZCBkYXRhLWRheT1cIicgKyBpICsgJ1wiIGNsYXNzPVwiJyArIGFyci5qb2luKCcgJykgKyAnXCI+PGJ1dHRvbiBjbGFzcz1cInBpa2EtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPicgKyBpICsgJzwvYnV0dG9uPicgKyAnPC90ZD4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJSb3cgPSBmdW5jdGlvbihkYXlzLCBpc1JUTClcbiAgICB7XG4gICAgICAgIHJldHVybiAnPHRyPicgKyAoaXNSVEwgPyBkYXlzLnJldmVyc2UoKSA6IGRheXMpLmpvaW4oJycpICsgJzwvdHI+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyQm9keSA9IGZ1bmN0aW9uKHJvd3MpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0Ym9keT4nICsgcm93cy5qb2luKCcnKSArICc8L3Rib2R5Pic7XG4gICAgfSxcblxuICAgIHJlbmRlckhlYWQgPSBmdW5jdGlvbihvcHRzKVxuICAgIHtcbiAgICAgICAgdmFyIGksIGFyciA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnPHRoIHNjb3BlPVwiY29sXCI+PGFiYnIgdGl0bGU9XCInICsgcmVuZGVyRGF5TmFtZShvcHRzLCBpKSArICdcIj4nICsgcmVuZGVyRGF5TmFtZShvcHRzLCBpLCB0cnVlKSArICc8L2FiYnI+PC90aD4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJzx0aGVhZD4nICsgKG9wdHMuaXNSVEwgPyBhcnIucmV2ZXJzZSgpIDogYXJyKS5qb2luKCcnKSArICc8L3RoZWFkPic7XG4gICAgfSxcblxuICAgIHJlbmRlclRpdGxlID0gZnVuY3Rpb24oaW5zdGFuY2UpXG4gICAge1xuICAgICAgICB2YXIgaSwgaiwgYXJyLFxuICAgICAgICAgICAgb3B0cyA9IGluc3RhbmNlLl9vLFxuICAgICAgICAgICAgbW9udGggPSBpbnN0YW5jZS5fbSxcbiAgICAgICAgICAgIHllYXIgID0gaW5zdGFuY2UuX3ksXG4gICAgICAgICAgICBpc01pblllYXIgPSB5ZWFyID09PSBvcHRzLm1pblllYXIsXG4gICAgICAgICAgICBpc01heFllYXIgPSB5ZWFyID09PSBvcHRzLm1heFllYXIsXG4gICAgICAgICAgICBodG1sID0gJzxkaXYgY2xhc3M9XCJwaWthLXRpdGxlXCI+JyxcbiAgICAgICAgICAgIG1vbnRoSHRtbCxcbiAgICAgICAgICAgIHllYXJIdG1sLFxuICAgICAgICAgICAgcHJldiA9IHRydWUsXG4gICAgICAgICAgICBuZXh0ID0gdHJ1ZTtcblxuICAgICAgICBmb3IgKGFyciA9IFtdLCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGkgKyAnXCInICtcbiAgICAgICAgICAgICAgICAoaSA9PT0gbW9udGggPyAnIHNlbGVjdGVkJzogJycpICtcbiAgICAgICAgICAgICAgICAoKGlzTWluWWVhciAmJiBpIDwgb3B0cy5taW5Nb250aCkgfHwgKGlzTWF4WWVhciAmJiBpID4gb3B0cy5tYXhNb250aCkgPyAnZGlzYWJsZWQnIDogJycpICsgJz4nICtcbiAgICAgICAgICAgICAgICBvcHRzLmkxOG4ubW9udGhzW2ldICsgJzwvb3B0aW9uPicpO1xuICAgICAgICB9XG4gICAgICAgIG1vbnRoSHRtbCA9ICc8ZGl2IGNsYXNzPVwicGlrYS1sYWJlbFwiPicgKyBvcHRzLmkxOG4ubW9udGhzW21vbnRoXSArICc8c2VsZWN0IGNsYXNzPVwicGlrYS1zZWxlY3QgcGlrYS1zZWxlY3QtbW9udGhcIj4nICsgYXJyLmpvaW4oJycpICsgJzwvc2VsZWN0PjwvZGl2Pic7XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob3B0cy55ZWFyUmFuZ2UpKSB7XG4gICAgICAgICAgICBpID0gb3B0cy55ZWFyUmFuZ2VbMF07XG4gICAgICAgICAgICBqID0gb3B0cy55ZWFyUmFuZ2VbMV0gKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaSA9IHllYXIgLSBvcHRzLnllYXJSYW5nZTtcbiAgICAgICAgICAgIGogPSAxICsgeWVhciArIG9wdHMueWVhclJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChhcnIgPSBbXTsgaSA8IGogJiYgaSA8PSBvcHRzLm1heFllYXI7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPj0gb3B0cy5taW5ZZWFyKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIicgKyAoaSA9PT0geWVhciA/ICcgc2VsZWN0ZWQnOiAnJykgKyAnPicgKyAoaSkgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeWVhckh0bWwgPSAnPGRpdiBjbGFzcz1cInBpa2EtbGFiZWxcIj4nICsgeWVhciArIG9wdHMueWVhclN1ZmZpeCArICc8c2VsZWN0IGNsYXNzPVwicGlrYS1zZWxlY3QgcGlrYS1zZWxlY3QteWVhclwiPicgKyBhcnIuam9pbignJykgKyAnPC9zZWxlY3Q+PC9kaXY+JztcblxuICAgICAgICBpZiAob3B0cy5zaG93TW9udGhBZnRlclllYXIpIHtcbiAgICAgICAgICAgIGh0bWwgKz0geWVhckh0bWwgKyBtb250aEh0bWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBodG1sICs9IG1vbnRoSHRtbCArIHllYXJIdG1sO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTWluWWVhciAmJiAobW9udGggPT09IDAgfHwgb3B0cy5taW5Nb250aCA+PSBtb250aCkpIHtcbiAgICAgICAgICAgIHByZXYgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01heFllYXIgJiYgKG1vbnRoID09PSAxMSB8fCBvcHRzLm1heE1vbnRoIDw9IG1vbnRoKSkge1xuICAgICAgICAgICAgbmV4dCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaHRtbCArPSAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtcHJldicgKyAocHJldiA/ICcnIDogJyBpcy1kaXNhYmxlZCcpICsgJ1wiIHR5cGU9XCJidXR0b25cIj4nICsgb3B0cy5pMThuLnByZXZpb3VzTW9udGggKyAnPC9idXR0b24+JztcbiAgICAgICAgaHRtbCArPSAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtbmV4dCcgKyAobmV4dCA/ICcnIDogJyBpcy1kaXNhYmxlZCcpICsgJ1wiIHR5cGU9XCJidXR0b25cIj4nICsgb3B0cy5pMThuLm5leHRNb250aCArICc8L2J1dHRvbj4nO1xuXG4gICAgICAgIHJldHVybiBodG1sICs9ICc8L2Rpdj4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJUYWJsZSA9IGZ1bmN0aW9uKG9wdHMsIGRhdGEpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0YWJsZSBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBjbGFzcz1cInBpa2EtdGFibGVcIj4nICsgcmVuZGVySGVhZChvcHRzKSArIHJlbmRlckJvZHkoZGF0YSkgKyAnPC90YWJsZT4nO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFBpa2FkYXkgY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBQaWthZGF5ID0gZnVuY3Rpb24ob3B0aW9ucylcbiAgICB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIG9wdHMgPSBzZWxmLmNvbmZpZyhvcHRpb25zKTtcblxuICAgICAgICBzZWxmLl9vbk1vdXNlRG93biA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5fdikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFoYXNDbGFzcyh0YXJnZXQsICdpcy1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtYnV0dG9uJykgJiYgIWhhc0NsYXNzKHRhcmdldCwgJ2lzLWVtcHR5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKG5ldyBEYXRlKHNlbGYuX3ksIHNlbGYuX20sIHBhcnNlSW50KHRhcmdldC5pbm5lckhUTUwsIDEwKSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtcHJldicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucHJldk1vbnRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2EtbmV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmV4dE1vbnRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fYyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25DaGFuZ2UgPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QtbW9udGgnKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b01vbnRoKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLXNlbGVjdC15ZWFyJykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9ZZWFyKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dENoYW5nZSA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBkYXRlO1xuXG4gICAgICAgICAgICBpZiAoZS5maXJlZEJ5ID09PSBzZWxmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc01vbWVudCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtb21lbnQob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQpO1xuICAgICAgICAgICAgICAgIGRhdGUgPSAoZGF0ZSAmJiBkYXRlLmlzVmFsaWQoKSkgPyBkYXRlLnRvRGF0ZSgpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKG9wdHMuZmllbGQudmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShpc0RhdGUoZGF0ZSkgPyBkYXRlIDogbnVsbCk7XG4gICAgICAgICAgICBpZiAoIXNlbGYuX3YpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Rm9jdXMgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRDbGljayA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dEJsdXIgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5fYykge1xuICAgICAgICAgICAgICAgIHNlbGYuX2IgPSBzdG8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuX2MgPSBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbkNsaWNrID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCxcbiAgICAgICAgICAgICAgICBwRWwgPSB0YXJnZXQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaGFzRXZlbnRMaXN0ZW5lcnMgJiYgaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0Lm9uY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ29uY2hhbmdlJywgJ3JldHVybjsnKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkRXZlbnQodGFyZ2V0LCAnY2hhbmdlJywgc2VsZi5fb25DaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3MocEVsLCAncGlrYS1zaW5nbGUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKChwRWwgPSBwRWwucGFyZW50Tm9kZSkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuX3YgJiYgdGFyZ2V0ICE9PSBvcHRzLnRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNlbGYuZWwuY2xhc3NOYW1lID0gJ3Bpa2Etc2luZ2xlJyArIChvcHRzLmlzUlRMID8gJyBpcy1ydGwnIDogJycpO1xuXG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICdtb3VzZWRvd24nLCBzZWxmLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICdjaGFuZ2UnLCBzZWxmLl9vbkNoYW5nZSk7XG5cbiAgICAgICAgaWYgKG9wdHMuZmllbGQpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0cy5maWVsZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzZWxmLmVsLCBvcHRzLmZpZWxkLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZEV2ZW50KG9wdHMuZmllbGQsICdjaGFuZ2UnLCBzZWxmLl9vbklucHV0Q2hhbmdlKTtcblxuICAgICAgICAgICAgaWYgKCFvcHRzLmRlZmF1bHREYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc01vbWVudCAmJiBvcHRzLmZpZWxkLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGVmYXVsdERhdGUgPSBtb21lbnQob3B0cy5maWVsZC52YWx1ZSwgb3B0cy5mb3JtYXQpLnRvRGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGVmYXVsdERhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKG9wdHMuZmllbGQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0cy5zZXREZWZhdWx0RGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGVmRGF0ZSA9IG9wdHMuZGVmYXVsdERhdGU7XG5cbiAgICAgICAgaWYgKGlzRGF0ZShkZWZEYXRlKSkge1xuICAgICAgICAgICAgaWYgKG9wdHMuc2V0RGVmYXVsdERhdGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldERhdGUoZGVmRGF0ZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuZ290b0RhdGUoZGVmRGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmdvdG9EYXRlKG5ldyBEYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgc2VsZi5lbC5jbGFzc05hbWUgKz0gJyBpcy1ib3VuZCc7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdjbGljaycsIHNlbGYuX29uSW5wdXRDbGljayk7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdmb2N1cycsIHNlbGYuX29uSW5wdXRGb2N1cyk7XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLnRyaWdnZXIsICdibHVyJywgc2VsZi5fb25JbnB1dEJsdXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIHB1YmxpYyBQaWthZGF5IEFQSVxuICAgICAqL1xuICAgIFBpa2FkYXkucHJvdG90eXBlID0ge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvbmZpZ3VyZSBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAqL1xuICAgICAgICBjb25maWc6IGZ1bmN0aW9uKG9wdGlvbnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fbykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28gPSBleHRlbmQoe30sIGRlZmF1bHRzLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG9wdHMgPSBleHRlbmQodGhpcy5fbywgb3B0aW9ucywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIG9wdHMuaXNSVEwgPSAhIW9wdHMuaXNSVEw7XG5cbiAgICAgICAgICAgIG9wdHMuZmllbGQgPSAob3B0cy5maWVsZCAmJiBvcHRzLmZpZWxkLm5vZGVOYW1lKSA/IG9wdHMuZmllbGQgOiBudWxsO1xuXG4gICAgICAgICAgICBvcHRzLmJvdW5kID0gISEob3B0cy5ib3VuZCAhPT0gdW5kZWZpbmVkID8gb3B0cy5maWVsZCAmJiBvcHRzLmJvdW5kIDogb3B0cy5maWVsZCk7XG5cbiAgICAgICAgICAgIG9wdHMudHJpZ2dlciA9IChvcHRzLnRyaWdnZXIgJiYgb3B0cy50cmlnZ2VyLm5vZGVOYW1lKSA/IG9wdHMudHJpZ2dlciA6IG9wdHMuZmllbGQ7XG5cbiAgICAgICAgICAgIHZhciBub20gPSBwYXJzZUludChvcHRzLm51bWJlck9mTW9udGhzLCAxMCkgfHwgMTtcbiAgICAgICAgICAgIG9wdHMubnVtYmVyT2ZNb250aHMgPSBub20gPiA0ID8gNCA6IG5vbTtcblxuICAgICAgICAgICAgaWYgKCFpc0RhdGUob3B0cy5taW5EYXRlKSkge1xuICAgICAgICAgICAgICAgIG9wdHMubWluRGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0RhdGUob3B0cy5tYXhEYXRlKSkge1xuICAgICAgICAgICAgICAgIG9wdHMubWF4RGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvcHRzLm1pbkRhdGUgJiYgb3B0cy5tYXhEYXRlKSAmJiBvcHRzLm1heERhdGUgPCBvcHRzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1heERhdGUgPSBvcHRzLm1pbkRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkob3B0cy5taW5EYXRlKTtcbiAgICAgICAgICAgICAgICBvcHRzLm1pblllYXIgID0gb3B0cy5taW5EYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgb3B0cy5taW5Nb250aCA9IG9wdHMubWluRGF0ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMubWF4RGF0ZSkge1xuICAgICAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheShvcHRzLm1heERhdGUpO1xuICAgICAgICAgICAgICAgIG9wdHMubWF4WWVhciAgPSBvcHRzLm1heERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICBvcHRzLm1heE1vbnRoID0gb3B0cy5tYXhEYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5KG9wdHMueWVhclJhbmdlKSkge1xuICAgICAgICAgICAgICAgIHZhciBmYWxsYmFjayA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIDEwO1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlWzBdID0gcGFyc2VJbnQob3B0cy55ZWFyUmFuZ2VbMF0sIDEwKSB8fCBmYWxsYmFjaztcbiAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZVsxXSA9IHBhcnNlSW50KG9wdHMueWVhclJhbmdlWzFdLCAxMCkgfHwgZmFsbGJhY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlID0gTWF0aC5hYnMocGFyc2VJbnQob3B0cy55ZWFyUmFuZ2UsIDEwKSkgfHwgZGVmYXVsdHMueWVhclJhbmdlO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnllYXJSYW5nZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZSA9IDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvcHRzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAodXNpbmcgTW9tZW50LmpzIGlmIGF2YWlsYWJsZSlcbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbihmb3JtYXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiAhaXNEYXRlKHRoaXMuX2QpID8gJycgOiBoYXNNb21lbnQgPyBtb21lbnQodGhpcy5fZCkuZm9ybWF0KGZvcm1hdCB8fCB0aGlzLl9vLmZvcm1hdCkgOiB0aGlzLl9kLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBNb21lbnQuanMgb2JqZWN0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAoaWYgYXZhaWxhYmxlKVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TW9tZW50OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBoYXNNb21lbnQgPyBtb21lbnQodGhpcy5fZCkgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGZyb20gYSBNb21lbnQuanMgb2JqZWN0IChpZiBhdmFpbGFibGUpXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNb21lbnQ6IGZ1bmN0aW9uKGRhdGUsIHByZXZlbnRPblNlbGVjdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGhhc01vbWVudCAmJiBtb21lbnQuaXNNb21lbnQoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoZGF0ZS50b0RhdGUoKSwgcHJldmVudE9uU2VsZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJuIGEgRGF0ZSBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBnZXREYXRlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBpc0RhdGUodGhpcy5fZCkgPyBuZXcgRGF0ZSh0aGlzLl9kLmdldFRpbWUoKSkgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBzZXREYXRlOiBmdW5jdGlvbihkYXRlLCBwcmV2ZW50T25TZWxlY3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2QgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShkYXRlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1pbiA9IHRoaXMuX28ubWluRGF0ZSxcbiAgICAgICAgICAgICAgICBtYXggPSB0aGlzLl9vLm1heERhdGU7XG5cbiAgICAgICAgICAgIGlmIChpc0RhdGUobWluKSAmJiBkYXRlIDwgbWluKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG1pbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKG1heCkgJiYgZGF0ZSA+IG1heCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtYXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2QgPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkodGhpcy5fZCk7XG4gICAgICAgICAgICB0aGlzLmdvdG9EYXRlKHRoaXMuX2QpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fby5maWVsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX28uZmllbGQudmFsdWUgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KHRoaXMuX28uZmllbGQsICdjaGFuZ2UnLCB7IGZpcmVkQnk6IHRoaXMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRPblNlbGVjdCAmJiB0eXBlb2YgdGhpcy5fby5vblNlbGVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ub25TZWxlY3QuY2FsbCh0aGlzLCB0aGlzLmdldERhdGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB2aWV3IHRvIGEgc3BlY2lmaWMgZGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b0RhdGU6IGZ1bmN0aW9uKGRhdGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghaXNEYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5feSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIHRoaXMuX20gPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnb3RvVG9kYXk6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBtb250aCAoemVyby1pbmRleCwgZS5nLiAwOiBKYW51YXJ5KVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b01vbnRoOiBmdW5jdGlvbihtb250aClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFpc05hTiggKG1vbnRoID0gcGFyc2VJbnQobW9udGgsIDEwKSkgKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX20gPSBtb250aCA8IDAgPyAwIDogbW9udGggPiAxMSA/IDExIDogbW9udGg7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbmV4dE1vbnRoOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICgrK3RoaXMuX20gPiAxMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX20gPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3krKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHByZXZNb250aDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoLS10aGlzLl9tIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX20gPSAxMTtcbiAgICAgICAgICAgICAgICB0aGlzLl95LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBmdWxsIHllYXIgKGUuZy4gXCIyMDEyXCIpXG4gICAgICAgICAqL1xuICAgICAgICBnb3RvWWVhcjogZnVuY3Rpb24oeWVhcilcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFpc05hTih5ZWFyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSB0aGUgbWluRGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0TWluRGF0ZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX28ubWluRGF0ZSA9IHZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdGhlIG1heERhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNldE1heERhdGU6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vLm1heERhdGUgPSB2YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVmcmVzaCB0aGUgSFRNTFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhdzogZnVuY3Rpb24oZm9yY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdiAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3B0cyA9IHRoaXMuX28sXG4gICAgICAgICAgICAgICAgbWluWWVhciA9IG9wdHMubWluWWVhcixcbiAgICAgICAgICAgICAgICBtYXhZZWFyID0gb3B0cy5tYXhZZWFyLFxuICAgICAgICAgICAgICAgIG1pbk1vbnRoID0gb3B0cy5taW5Nb250aCxcbiAgICAgICAgICAgICAgICBtYXhNb250aCA9IG9wdHMubWF4TW9udGg7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl95IDw9IG1pblllYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gbWluWWVhcjtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG1pbk1vbnRoKSAmJiB0aGlzLl9tIDwgbWluTW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbSA9IG1pbk1vbnRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl95ID49IG1heFllYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gbWF4WWVhcjtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG1heE1vbnRoKSAmJiB0aGlzLl9tID4gbWF4TW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbSA9IG1heE1vbnRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSByZW5kZXJUaXRsZSh0aGlzKSArIHRoaXMucmVuZGVyKHRoaXMuX3ksIHRoaXMuX20pO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZihvcHRzLmZpZWxkLnR5cGUgIT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0byhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMudHJpZ2dlci5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fby5vbkRyYXcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9vLm9uRHJhdy5jYWxsKHNlbGYpO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGFkanVzdFBvc2l0aW9uOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IHRoaXMuX28udHJpZ2dlciwgcEVsID0gZmllbGQsXG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuZWwub2Zmc2V0V2lkdGgsIGhlaWdodCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGxlZnQsIHRvcCwgY2xpZW50UmVjdDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjbGllbnRSZWN0ID0gZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgbGVmdCA9IGNsaWVudFJlY3QubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgICAgICAgICB0b3AgPSBjbGllbnRSZWN0LmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IHBFbC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIHRvcCAgPSBwRWwub2Zmc2V0VG9wICsgcEVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICB3aGlsZSgocEVsID0gcEVsLm9mZnNldFBhcmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCArPSBwRWwub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICAgICAgdG9wICArPSBwRWwub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVmYXVsdCBwb3NpdGlvbiBpcyBib3R0b20gJiBsZWZ0XG4gICAgICAgICAgICBpZiAobGVmdCArIHdpZHRoID4gdmlld3BvcnRXaWR0aCB8fFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5wb3NpdGlvbi5pbmRleE9mKCdyaWdodCcpID4gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgbGVmdCAtIHdpZHRoICsgZmllbGQub2Zmc2V0V2lkdGggPiAwXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IGxlZnQgLSB3aWR0aCArIGZpZWxkLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRvcCArIGhlaWdodCA+IHZpZXdwb3J0SGVpZ2h0ICsgc2Nyb2xsVG9wIHx8XG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLnBvc2l0aW9uLmluZGV4T2YoJ3RvcCcpID4gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgdG9wIC0gaGVpZ2h0IC0gZmllbGQub2Zmc2V0SGVpZ2h0ID4gMFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRvcCA9IHRvcCAtIGhlaWdodCAtIGZpZWxkLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuY3NzVGV4dCA9IFtcbiAgICAgICAgICAgICAgICAncG9zaXRpb246IGFic29sdXRlJyxcbiAgICAgICAgICAgICAgICAnbGVmdDogJyArIGxlZnQgKyAncHgnLFxuICAgICAgICAgICAgICAgICd0b3A6ICcgKyB0b3AgKyAncHgnXG4gICAgICAgICAgICBdLmpvaW4oJzsnKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVuZGVyIEhUTUwgZm9yIGEgcGFydGljdWxhciBtb250aFxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbih5ZWFyLCBtb250aClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdHMgICA9IHRoaXMuX28sXG4gICAgICAgICAgICAgICAgbm93ICAgID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXlzICAgPSBnZXREYXlzSW5Nb250aCh5ZWFyLCBtb250aCksXG4gICAgICAgICAgICAgICAgYmVmb3JlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpLmdldERheSgpLFxuICAgICAgICAgICAgICAgIGRhdGEgICA9IFtdLFxuICAgICAgICAgICAgICAgIHJvdyAgICA9IFtdO1xuICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KG5vdyk7XG4gICAgICAgICAgICBpZiAob3B0cy5maXJzdERheSA+IDApIHtcbiAgICAgICAgICAgICAgICBiZWZvcmUgLT0gb3B0cy5maXJzdERheTtcbiAgICAgICAgICAgICAgICBpZiAoYmVmb3JlIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBiZWZvcmUgKz0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2VsbHMgPSBkYXlzICsgYmVmb3JlLFxuICAgICAgICAgICAgICAgIGFmdGVyID0gY2VsbHM7XG4gICAgICAgICAgICB3aGlsZShhZnRlciA+IDcpIHtcbiAgICAgICAgICAgICAgICBhZnRlciAtPSA3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2VsbHMgKz0gNyAtIGFmdGVyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHIgPSAwOyBpIDwgY2VsbHM7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEgKyAoaSAtIGJlZm9yZSkpLFxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkID0gKG9wdHMubWluRGF0ZSAmJiBkYXkgPCBvcHRzLm1pbkRhdGUpIHx8IChvcHRzLm1heERhdGUgJiYgZGF5ID4gb3B0cy5tYXhEYXRlKSxcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA9IGlzRGF0ZSh0aGlzLl9kKSA/IGNvbXBhcmVEYXRlcyhkYXksIHRoaXMuX2QpIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGlzVG9kYXkgPSBjb21wYXJlRGF0ZXMoZGF5LCBub3cpLFxuICAgICAgICAgICAgICAgICAgICBpc0VtcHR5ID0gaSA8IGJlZm9yZSB8fCBpID49IChkYXlzICsgYmVmb3JlKTtcblxuICAgICAgICAgICAgICAgIHJvdy5wdXNoKHJlbmRlckRheSgxICsgKGkgLSBiZWZvcmUpLCBpc1NlbGVjdGVkLCBpc1RvZGF5LCBpc0Rpc2FibGVkLCBpc0VtcHR5KSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKytyID09PSA3KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChyZW5kZXJSb3cocm93LCBvcHRzLmlzUlRMKSk7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICByID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyVGFibGUob3B0cywgZGF0YSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNWaXNpYmxlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92O1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl92KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28uYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkRXZlbnQoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCAnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vLm9uT3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vLm9uT3Blbi5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB2ID0gdGhpcy5fdjtcbiAgICAgICAgICAgIGlmICh2ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KGRvY3VtZW50LCAnY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5jc3NUZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5lbCwgJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3YgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB0aGlzLl9vLm9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5vbkNsb3NlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHQU1FIE9WRVJcbiAgICAgICAgICovXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLmVsLCAnbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5lbCwgJ2NoYW5nZScsIHRoaXMuX29uQ2hhbmdlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5fby5maWVsZCwgJ2NoYW5nZScsIHRoaXMuX29uSW5wdXRDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuX28udHJpZ2dlciwgJ2NsaWNrJywgdGhpcy5fb25JbnB1dENsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5fby50cmlnZ2VyLCAnZm9jdXMnLCB0aGlzLl9vbklucHV0Rm9jdXMpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLl9vLnRyaWdnZXIsICdibHVyJywgdGhpcy5fb25JbnB1dEJsdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICByZXR1cm4gUGlrYWRheTtcblxufSkpO1xuIiwidmFyIEJhY2tib25lID0gcmVxdWlyZSgnYmFja2JvbmUnKVxuXG4vL1xuLy8gV29ya3MgYXJvdW5kIGlzc3VlIGludHJvZHVjZWQgaW4gQmFja2JvbmUgMS4xIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvYmFja2JvbmUvcHVsbC8yNzY2XG4vL1xuLy8gVGhpcyBmaWxlIGlzIHVubmVjZXNzYXJ5IHVuZGVyIEJhY2tib25lIDEuMCBhbmQgZWFybGllci5cbi8vXG4vLyBOb3RlIHRoYXQgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy9iYWNrYm9uZS9wdWxsLzI4OTAgc2hvdWxkIGhvcGVmdWxseSBtYWtlIHRoaXMgaXJyZXZlbGFudFxuLy9cbkJhY2tib25lLkhpc3RvcnkucHJvdG90eXBlLm5hdmlnYXRlID0gZnVuY3Rpb24oZnJhZ21lbnQsIG9wdGlvbnMpIHtcbiAgLypqc2hpbnQgY3VybHk6ZmFsc2UgKi9cbiAgaWYgKCFCYWNrYm9uZS5IaXN0b3J5LnN0YXJ0ZWQpIHJldHVybiBmYWxzZTtcbiAgaWYgKCFvcHRpb25zIHx8IG9wdGlvbnMgPT09IHRydWUpIG9wdGlvbnMgPSB7dHJpZ2dlcjogISFvcHRpb25zfTtcblxuICB2YXIgdXJsID0gdGhpcy5yb290ICsgKGZyYWdtZW50ID0gdGhpcy5nZXRGcmFnbWVudChmcmFnbWVudCB8fCAnJykpO1xuXG4gIC8vIFJlbW92ZWQgZnJvbSB0aGUgdXBzdHJlYW0gaW1wbDpcbiAgLy8gU3RyaXAgdGhlIGZyYWdtZW50IG9mIHRoZSBxdWVyeSBhbmQgaGFzaCBmb3IgbWF0Y2hpbmcuXG4gIC8vIGZyYWdtZW50ID0gZnJhZ21lbnQucmVwbGFjZShwYXRoU3RyaXBwZXIsICcnKTtcblxuICBpZiAodGhpcy5mcmFnbWVudCA9PT0gZnJhZ21lbnQpIHJldHVybjtcbiAgdGhpcy5mcmFnbWVudCA9IGZyYWdtZW50O1xuXG4gIC8vIERvbid0IGluY2x1ZGUgYSB0cmFpbGluZyBzbGFzaCBvbiB0aGUgcm9vdC5cbiAgaWYgKGZyYWdtZW50ID09PSAnJyAmJiB1cmwgIT09ICcvJykgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcblxuICAvLyBJZiBwdXNoU3RhdGUgaXMgYXZhaWxhYmxlLCB3ZSB1c2UgaXQgdG8gc2V0IHRoZSBmcmFnbWVudCBhcyBhIHJlYWwgVVJMLlxuICBpZiAodGhpcy5faGFzUHVzaFN0YXRlKSB7XG4gICAgdGhpcy5oaXN0b3J5W29wdGlvbnMucmVwbGFjZSA/ICdyZXBsYWNlU3RhdGUnIDogJ3B1c2hTdGF0ZSddKHt9LCBkb2N1bWVudC50aXRsZSwgdXJsKTtcblxuICAvLyBJZiBoYXNoIGNoYW5nZXMgaGF2ZW4ndCBiZWVuIGV4cGxpY2l0bHkgZGlzYWJsZWQsIHVwZGF0ZSB0aGUgaGFzaFxuICAvLyBmcmFnbWVudCB0byBzdG9yZSBoaXN0b3J5LlxuICB9IGVsc2UgaWYgKHRoaXMuX3dhbnRzSGFzaENoYW5nZSkge1xuICAgIHRoaXMuX3VwZGF0ZUhhc2godGhpcy5sb2NhdGlvbiwgZnJhZ21lbnQsIG9wdGlvbnMucmVwbGFjZSk7XG4gICAgaWYgKHRoaXMuaWZyYW1lICYmIChmcmFnbWVudCAhPT0gdGhpcy5nZXRGcmFnbWVudCh0aGlzLmdldEhhc2godGhpcy5pZnJhbWUpKSkpIHtcbiAgICAgIC8vIE9wZW5pbmcgYW5kIGNsb3NpbmcgdGhlIGlmcmFtZSB0cmlja3MgSUU3IGFuZCBlYXJsaWVyIHRvIHB1c2ggYVxuICAgICAgLy8gaGlzdG9yeSBlbnRyeSBvbiBoYXNoLXRhZyBjaGFuZ2UuICBXaGVuIHJlcGxhY2UgaXMgdHJ1ZSwgd2UgZG9uJ3RcbiAgICAgIC8vIHdhbnQgdGhpcy5cbiAgICAgIGlmKCFvcHRpb25zLnJlcGxhY2UpIHRoaXMuaWZyYW1lLmRvY3VtZW50Lm9wZW4oKS5jbG9zZSgpO1xuICAgICAgdGhpcy5fdXBkYXRlSGFzaCh0aGlzLmlmcmFtZS5sb2NhdGlvbiwgZnJhZ21lbnQsIG9wdGlvbnMucmVwbGFjZSk7XG4gICAgfVxuXG4gIC8vIElmIHlvdSd2ZSB0b2xkIHVzIHRoYXQgeW91IGV4cGxpY2l0bHkgZG9uJ3Qgd2FudCBmYWxsYmFjayBoYXNoY2hhbmdlLVxuICAvLyBiYXNlZCBoaXN0b3J5LCB0aGVuIGBuYXZpZ2F0ZWAgYmVjb21lcyBhIHBhZ2UgcmVmcmVzaC5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5hc3NpZ24odXJsKTtcbiAgfVxuICBpZiAob3B0aW9ucy50cmlnZ2VyKSByZXR1cm4gdGhpcy5sb2FkVXJsKGZyYWdtZW50KTtcbn07IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCd2ZGQvcm91dGVyJylcbnZhciBRdWVyeSA9IHJlcXVpcmUoJ3ZkZC9xdWVyeScpXG52YXIgVkREID0gcmVxdWlyZSgndmRkL3ZkZCcpXG52YXIgbW9kZWxzID0gcmVxdWlyZSgndmRkL21vZGVscycpXG52YXIgSG9tZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vaG9tZScpXG52YXIgU2VhcmNoQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9zZWFyY2gnKVxudmFyIFNvcnRDb21wb25lbnQgPSByZXF1aXJlKCcuL3NvcnQnKVxudmFyIFJlc3VsdHNDb21wb25lbnQgPSByZXF1aXJlKCcuL3Jlc3VsdHMnKVxudmFyIEZpbHRlcnNDb21wb25lbnQgPSByZXF1aXJlKCcuL2ZpbHRlcnMnKVxudmFyIERldGFpbENvbXBvbmVudCA9IHJlcXVpcmUoJy4vZGV0YWlsJylcbnZhciBNb2RhbENvbXBvbmVudCA9IHJlcXVpcmUoJy4vbW9kYWwnKVxudmFyIFpvb21Db21wb25lbnQgPSByZXF1aXJlKCcuL3pvb20nKVxudmFyIFBhZ2luYXRpb25Db21wb25lbnQgPSByZXF1aXJlKCcuL3BhZ2luYXRpb24nKVxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJylcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5JylcbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKVxudmFyIFBpd2lrID0gcmVxdWlyZSgndmRkL3Bpd2lrJylcblxudmFyIExvZ2luQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9sb2dpbicpXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG5cbiAgY2FjaGVkUXVlcnk6ICcnLFxuXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHsgXG4gICAgICB1cmw6ICdsb2FkaW5nJyxcbiAgICAgIHVybFBhcmFtczogW10sXG4gICAgICBtb3ZlOiB0cnVlLFxuICAgICAgcG9wT3V0OiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBnZXRCYWNrYm9uZU1vZGVsczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFsncmVzdWx0cycsICdkZXRhaWwnLCAncmVzcG9uc2VkYXRhJ11cbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBsaXN0ZW4gZm9yIGJhY2tib25lIGNoYW5nZXMgYW5kIGZvcmNlIHVwZGF0ZVxuICAgIGZvciggdmFyIGluc3QgaW4gbW9kZWxzICkge1xuICAgICAgbW9kZWxzW2luc3RdLm9uKCdhZGQgY2hhbmdlIHJlbW92ZSByZXNldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgIH0sIHRoaXMgKVxuICAgIH1cblxuICAgIC8vIFNldCBldmVudCBsaXN0ZW5lciBvbiBkb2N1bWVudFxuICAgICQoJ2JvZHknKS5vbignY2xpY2sucG9wb3V0JywgdGhpcy50b2dnbGVQb3BPdXQpXG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIGZvciggdmFyIGluc3QgaW4gbW9kZWxzIClcbiAgICAgIG1vZGVsc1tpbnN0XS5vZmYobnVsbCwgbnVsbCwgdGhpcylcblxuICAgICQoJ2JvZHknKS5vZmYoJ2NsaWNrLnBvcG91dCcpXG4gIH0sXG5cbiAgbG9hZE1vcmU6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghUXVlcnkuZ2V0KCdxJykpXG4gICAgICByZXR1cm5cbiAgICBRdWVyeS5zZXQoeyBwYWdlOiB+flF1ZXJ5LmdldCgncGFnZScpICsgMSB9KVxuICAgIFJvdXRlci5uYXZpZ2F0ZShRdWVyeS5idWlsZCgpLCB7dHJpZ2dlcjogdHJ1ZX0pXG4gIH0sXG5cbiAgY2xvc2VNb2RhbEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0UHJvcHMoe1xuICAgICAgbW9kYWw6bnVsbFxuICAgIH0pXG4gIH0sXG5cbiAgbW92ZUZsYWdIYW5kbGVyOiBmdW5jdGlvbihib29sKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3ZlOiBib29sXG4gICAgfSlcbiAgfSxcblxuICBsb2dpbkhhbmRsZXI6IGZ1bmN0aW9uKCBlICkge1xuICAgIGNvbnNvbGUubG9nKCdPcGVuIGxvZ2luJyk7XG4gICAgUGl3aWsudHJhY2tDbGljaygnTG9naW4nLCAnT3BlbiBkaWFsb2cnKVxuICAgIFZERC5sb2dpbigpXG4gIH0sXG5cbiAgdG9nZ2xlUG9wT3V0OiBmdW5jdGlvbiggZSApIHtcbiAgICB2YXIgJGNsaWNrVGFyZ2V0ID0gJCggZS50YXJnZXQgKVxuICAgIGlmICggdGhpcy5zdGF0ZS5wb3BPdXQgKSB7XG4gICAgICAgIFBpd2lrLnRyYWNrQ2xpY2soJ1BvcG91dCcsICdIaWRlJylcbiAgICAgIC8vIFBvcG91dCBpcyBvcGVuLCBjaGVjayBpZiBjbGljayBoYXBwZW5lZCBvdXRzaWRlXG4gICAgICBpZiAoICEkY2xpY2tUYXJnZXQuY2xvc2VzdCgnLnBvcG91dCcpLmxlbmd0aCApe1xuICAgICAgICB0aGlzLnNldFN0YXRlKCB7IHBvcE91dDogZmFsc2UgfSApXG4gICAgICB9IFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQb3B1dCBpcyBjbG9zZWQsIGNoZWNrIGlmIGNsaWNrIHRhcmdldCB3YXMgdXNlciBoZWFkZXJcbiAgICAgIGlmICggJGNsaWNrVGFyZ2V0LmNsb3Nlc3QoJy51c2VyYnV0dG9uJykubGVuZ3RoICl7IFxuICAgICAgICB0aGlzLnNldFN0YXRlKCB7IHBvcE91dDogdHJ1ZSB9IClcbiAgICAgICAgUGl3aWsudHJhY2tDbGljaygnUG9wb3V0JywgJ1Nob3cnKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBnb1RvRmF2b3VyaXRlczogZnVuY3Rpb24oIGUgKSB7XG4gICAgUGl3aWsudHJhY2tDbGljaygnR290bycsICdGYXZvdXJpdGVzJylcbiAgICB0aGlzLnNldFN0YXRlKCB7IHBvcE91dDogZmFsc2UgfSApXG4gICAgdmFyIHRhcmdldERhdGEgPSAkKCBlLmN1cnJlbnRUYXJnZXQgKS5kYXRhKClcbiAgICBpZiAoIHRhcmdldERhdGEudXJsICkge1xuICAgICAgUm91dGVyLm5hdmlnYXRlKCB0YXJnZXREYXRhLnVybCArICcvP3E9OmZhdm91cml0ZXMnLCB0cnVlIClcbiAgICB9IGVsc2Uge1xuICAgICAgUm91dGVyLm5hdmlnYXRlKCcvP3E9OmZhdm91cml0ZXMnLCB0cnVlKVxuICAgIH1cbiAgfSxcblxuICBnb1RvU2VhcmNoOiBmdW5jdGlvbiggZSApIHtcbiAgICBQaXdpay50cmFja0NsaWNrKCdHb3RvJywgJ1NlYXJjaCcpXG4gICAgdmFyIHRhcmdldERhdGEgPSAkKCBlLmN1cnJlbnRUYXJnZXQgKS5kYXRhKClcbiAgICB2YXIgcT10YXJnZXREYXRhLnVybC5zcGxpdCgnJicpWzBdO3E9cS5zdWJzdHIoNCk7XG4gICAgLy8gQ29uY2F0ZW5hdGluZyBldmVudCBhY3Rpb24gQ2xpY2tlZCB3aXRoIHF1ZXJ5IHN0cmluZyBiZWNhdXNlIG9mIGEgbGltaXRhdGlvbiBpbiBwaXdpayB3aGljaCBwcmV2ZW50cyB1cyBmcm9tIGRyaWxsaW5nIGRvd24gZnJvbSBDYXRlZ29yeS0+QWN0aW9uLT5OYW1lLiBDYW4gb25seSBkcmlsbCBkb3duIHR3byBsZXZlbHNcbiAgICBQaXdpay50cmFja0NsaWNrKCdIw6RuZGVsc2VyIGkgcHJlc3NlbicsIHEpXG4gICAgaWYgKCB0YXJnZXREYXRhLnVybCApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoIHsgcG9wT3V0OiBmYWxzZSB9IClcbiAgICAgIFJvdXRlci5uYXZpZ2F0ZSggdGFyZ2V0RGF0YS51cmwsIHRydWUgKVxuICAgIH1cbiAgfSxcblxuICBnb1RvSG9tZTogZnVuY3Rpb24oIGUgKSB7XG4gICAgUGl3aWsudHJhY2tDbGljaygnR290bycsICdIb21lJylcbiAgICB0aGlzLnNldFN0YXRlKCB7IHBvcE91dDogZmFsc2UgfSApXG4gICAgUm91dGVyLm5hdmlnYXRlKCAnLycsIHRydWUgKVxuICB9LFxuXG4gIGxvZ291dDogZnVuY3Rpb24oZSkge1xuICAgIFBpd2lrLnRyYWNrQ2xpY2soJ0xvZ291dCcpXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbW9kZWxzLnVzZXIubG9nb3V0KClcbiAgICBSb3V0ZXIubmF2aWdhdGUoJy8nLCB0cnVlKVxuICB9LFxuXG4gIHRvZ2dsZUZyZWU6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnRhcmdldC5jaGVja2VkID9cbiAgICAgIFF1ZXJ5LnNldCh7IGZyZWVvbmx5OiAxIH0pIDpcbiAgICAgIFF1ZXJ5LnJlbW92ZSgnZnJlZW9ubHknKVxuICAgIFJvdXRlci5uYXZpZ2F0ZSgnLycgKyBRdWVyeS5idWlsZCgpLCB7dHJpZ2dlcjogdHJ1ZX0pXG4gIH0sXG4gIFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gcmVuZGVyaW5nIGxvZ2ljIGJhc2VkIG9uIHN0YXRlIGdvZXMgaGVyZVxuXG4gICAgdmFyIGhpdHMgPSBtb2RlbHMucmVzcG9uc2VkYXRhLmdldCgnaGl0cycpXG4gICAgdmFyIHEgPSBRdWVyeS5nZXQoJ3EnKVxuICAgIHZhciBmcm9tID0gUXVlcnkuZ2V0KCdmcm9tJylcbiAgICB2YXIgdG8gPSBRdWVyeS5nZXQoJ3RvJylcbiAgICB2YXIgbmV3c3BhcGVyID0gUXVlcnkuZ2V0KCduZXdzcGFwZXInKVxuICAgIHZhciBpID0gaGl0cyAmJiBoaXRzID4gMCA/IGhpdHMudG9TdHJpbmcoKSA6ICdpbmdhJ1xuICAgIHZhciBuZXdzcGFwZXJGaWx0ZXJlZCA9ICggbmV3c3BhcGVyIClcbiAgICAgID8gKFxuICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcIm5ld3NwYXBlclwifSwgICcgaSAnICsgbmV3c3BhcGVyICsgJyAnKVxuICAgICAgKVxuICAgICAgOiBudWxsXG4gICAgdmFyIHRpbWVGaWx0ZXJlZCA9ICggZnJvbSAmJiB0byApXG4gICAgICA/IG1vbWVudCggZnJvbSApLmlzU2FtZSggdG8gKVxuICAgICAgICA/IChcbiAgICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcImRhdGVcIn0sICAnICcgKyBmcm9tICsgJyAnKVxuICAgICAgICApXG4gICAgICAgIDogKFxuICAgICAgICAgIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwicmFuZ2VcIn0sICcgbWVsbGFuICcsIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwiZGF0ZVwifSwgZnJvbSApLCAnIG9jaCAnLCBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcImRhdGVcIn0sIHRvICksICcgJylcbiAgICAgICAgKVxuICAgICAgOiBudWxsXG4gICAgdmFyIGRldGFpbCA9IG51bGxcbiAgICB2YXIgbmV4dFxuICAgIHZhciBwcmV2XG4gICAgdmFyIGZpbHRlcnNcbiAgICB2YXIgbWFpblxuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHZhciB1c2VyID0gbnVsbFxuICAgIHZhciBpc0ZyZWUgPSBOdW1iZXIoIFF1ZXJ5LmdldCgnZnJlZW9ubHknKSApXG5cbiAgICBoaXRzID0gbW9kZWxzLnJlc3BvbnNlZGF0YS5nZXQoJ2ZpcnN0UnVuJylcbiAgICAgID8gUmVhY3QuRE9NLmRpdihudWxsLCBcIkFudGFsIHRpZG5pbmdzc2lkb3I6IFwiLCBpKSBcbiAgICAgIDogUmVhY3QuRE9NLmRpdihudWxsLCBcIkRpbiBzw7ZrbmluZyBww6UgXCIsIFJlYWN0LkRPTS5zdHJvbmcobnVsbCwgcSksIG5ld3NwYXBlckZpbHRlcmVkLCB0aW1lRmlsdGVyZWQsIFwiIGdhdiBcIiwgaSwgXCIgXCIsIGhpdHMgPT0gMSA/ICd0csOkZmYnIDogJ3Ryw6RmZmFyJywgXCIuXCIpXG5cbiAgICBmcmVlb25seWJ1dHRvbiA9IG1vZGVscy5yZXNwb25zZWRhdGEuZ2V0KCdmaXJzdFJ1bicpID8gbnVsbCA6IChcbiAgICAgIFJlYWN0LkRPTS5sYWJlbCh7aWQ6IFwiZnJlZW9ubHlcIn0sIFxuICAgICAgICBSZWFjdC5ET00uaW5wdXQoe3R5cGU6IFwiY2hlY2tib3hcIiwgaWQ6IFwiZnJlZW9ubHlcIiwgY2hlY2tlZDogaXNGcmVlLCBvbkNoYW5nZTogdGhpcy50b2dnbGVGcmVlfSksIFxuICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcImljb25cIn0sIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtY2hlY2tcIn0pKSwgXG4gICAgICAgIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwidGV4dFwifSwgXCJWaXNhIGVuZGFzdCBmcml0dCBtYXRlcmlhbFwiKVxuICAgICAgKVxuICAgIClcblxuICAgIGlmICggIXEgKVxuICAgICAgaGl0cyA9IFJlYWN0LkRPTS5kaXYobnVsbClcblxuICAgIHZhciB1c2VyTmFtZSA9IG1vZGVscy51c2VyLmdldCgndXNlcm5hbWUnKVxuICAgIGlmICggIXVzZXJOYW1lICkge1xuICAgICAgdXNlciA9IChcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7aWQ6IFwidXNlclwiLCBvbkNsaWNrOiB0aGlzLmxvZ2luSGFuZGxlcn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJsb2dpblwifSwgXCJTZSBmYXZvcml0ZXIgXCIsIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtc3RhclwifSkpXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGZhdm91cml0ZXMgPSBtb2RlbHMudXNlci5nZXQoJ3VzZXJkYXRhJykuZmF2b3VyaXRlcy5tYXAoZnVuY3Rpb24oIGZhdiwgaW5kZXggKSB7XG4gICAgICAgIGlmICggaW5kZXggPCAyICkge1xuICAgICAgICAgIHZhciBpc0ludGVybmFsID0gdHJ1ZVxuICAgICAgICAgIHZhciBmaWVsZHMgPSBmYXYuX3NvdXJjZVxuICAgICAgICAgIHZhciBpbWcgPSAoZmllbGRzICYmICdAaWQnIGluIGZpZWxkcykgPyBmaWVsZHNbJ0BpZCddICsgJ19taW5pLicgKyAod2luZG93LkhPTUUgfHwgZmF2LmNvcHlyaWdodF9mcmVlID8gJ2pwZycgOiAnc3ZnJykgOiAnIydcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmxpKHtvbkNsaWNrOiBzZWxmLmdvVG9GYXZvdXJpdGVzLCBrZXk6IGZhdi51cmwsICdkYXRhLXVybCc6IGZhdi51cmwsICdkYXRhLXF1ZXJ5JzogZmF2LnF1ZXJ5fSwgXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5pbWcoe3NyYzogaW1nfSksIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiaW5mb1wifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmgyKG51bGwsIGZpZWxkcy5uZXdzcGFwZXIudGl0bGUudG9Mb3dlckNhc2UoKSksIFxuICAgICAgICAgICAgICAgIGZpZWxkcy5pc3N1ZS5pc3N1ZWRcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcylcblxuICAgICAgdmFyIHVzZXJDbGFzcyA9IHRoaXMuc3RhdGUucG9wT3V0ID8gJ29wZW4nIDogJydcblxuICAgICAgdXNlciA9IChcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7aWQ6IFwidXNlclwiLCBjbGFzc05hbWU6IHVzZXJDbGFzc30sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJsb2dnZWRpbi1hc1wifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uc3BhbihudWxsLCBcIklubG9nZ2FkIHNvbTogXCIsIFJlYWN0LkRPTS5zdHJvbmcobnVsbCwgdXNlck5hbWUpKSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uYSh7Y2xhc3NOYW1lOiBcImxvZ291dFwiLCBocmVmOiBcIiNcIiwgb25DbGljazogdGhpcy5sb2dvdXR9LCBcIkxvZ2dhIHV0IFwiLCBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBcImZhIGZhLXNpZ24tb3V0XCJ9KSlcbiAgICAgICAgICApLCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwidXNlcmJ1dHRvblwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiZmF2c1wifSwgZmF2b3VyaXRlcy5sZW5ndGgsIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtc3RhclwifSkpXG4gICAgICAgICAgKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcInBvcG91dFwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00udWwobnVsbCwgZmF2b3VyaXRlcyksIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7b25DbGljazogdGhpcy5nb1RvRmF2b3VyaXRlc30sIFwiVGlsbCBtaW5hIGZhdm9yaXRlclwiLCBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBcImZhIGZhLWNoZXZyb24tcmlnaHRcIn0pKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cblxuICAgIHN3aXRjaCggdGhpcy5zdGF0ZS51cmwgKSB7XG5cbiAgICAgIGNhc2UgJ2hvbWUnOlxuICAgICAgICBtYWluID0gSG9tZUNvbXBvbmVudCh7XG4gICAgICAgICAgZ29Ub1NlYXJjaDogdGhpcy5nb1RvU2VhcmNoXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ2RldGFpbCc6XG4gICAgICAgIHZhciByZXN1bHRzID0gbW9kZWxzLnJlc3VsdHNcbiAgICAgICAgaWYgKCByZXN1bHRzLmxlbmd0aCApIHtcbiAgICAgICAgICB2YXIgY3VycmVudCA9IFZERC5idWlsZFBlcm1hTGluayh0aGlzLnN0YXRlLnVybFBhcmFtcylcbiAgICAgICAgICByZXN1bHRzLmZvckVhY2goZnVuY3Rpb24ocmVzdWx0LCBpKSB7XG4gICAgICAgICAgICBpZiggcmVzdWx0LmdldEZpZWxkcygpWydAaWQnXSA9PSBjdXJyZW50ICkge1xuICAgICAgICAgICAgICBuZXh0ID0gcmVzdWx0cy5hdChpKzEpXG4gICAgICAgICAgICAgIHByZXYgPSByZXN1bHRzLmF0KGktMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB0aGlzKVxuICAgICAgICB9XG4gICAgICAgIGRldGFpbCA9IERldGFpbENvbXBvbmVudCh7XG4gICAgICAgICAgbmV4dDogbmV4dCxcbiAgICAgICAgICBwcmV2OiBwcmV2LFxuICAgICAgICAgIG1vdmU6IHRoaXMuc3RhdGUubW92ZSxcbiAgICAgICAgICBzZXRNb3ZlRmxhZzogdGhpcy5tb3ZlRmxhZ0hhbmRsZXIsXG4gICAgICAgICAgdXJsUGFyYW1zOiB0aGlzLnN0YXRlLnVybFBhcmFtc1xuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgICAgICBcbiAgICAgIGNhc2UgJzQwNCc6XG4gICAgICAgIGRldGFpbCA9IFJlYWN0LkRPTS5oMShudWxsLCBcIjQwNFwiKVxuICAgICAgICBicmVha1xuICAgIH1cblxuICAgIHZhciBoZWFkID0gKFxuICAgICAgUmVhY3QuRE9NLmRpdih7aWQ6IFwiaGVhZFwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5oMSh7Y2xhc3NOYW1lOiBcImhvbWVsaW5rXCIsIG9uQ2xpY2s6IHRoaXMuZ29Ub0hvbWV9LCBcIlPDtmsgYmxhbmQgc3ZlbnNrYSBkYWdzdGlkbmluZ2FyXCIpLCBcbiAgICAgICAgU2VhcmNoQ29tcG9uZW50KG51bGwpLCBcbiAgICAgICAgZnJlZW9ubHlidXR0b24sIFxuICAgICAgICBGaWx0ZXJzQ29tcG9uZW50KG51bGwpLCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImJsb2NrIGV4dHJhc1wifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcInN0YXRzXCJ9LCBoaXRzKSwgXG4gICAgICAgICAgU29ydENvbXBvbmVudChudWxsKVxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuXG4gICAgaWYgKCBRdWVyeS5nZXQoJ3EnKSA9PSAnOmZhdm91cml0ZXMnIClcbiAgICAgIGhlYWQgPSAoXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJmYXZoZWFkXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHtvbkNsaWNrOiB0aGlzLmdvVG9Ib21lfSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBcImZhIGZhLWNoZXZyb24tbGVmdFwifSksIFwiIFRpbGxiYWthIHRpbGwgc3RhcnRzaWRhblwiXG4gICAgICAgICAgKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmgxKG51bGwsIFwiTWluYSBGYXZvcml0ZXJcIilcbiAgICAgICAgKVxuICAgICAgKVxuXG4gICAgbWFpbiA9IG1haW4gfHwgKFxuICAgICAgUmVhY3QuRE9NLmRpdih7aWQ6IFwicHJpbWFyeVwiLCBjbGFzc05hbWU6IFwic2VhcmNoXCJ9LCBcbiAgICAgICAgaGVhZCwgXG4gICAgICAgIGRldGFpbCwgXG4gICAgICAgIFJlc3VsdHNDb21wb25lbnQoe21vdmU6IHRoaXMuc3RhdGUubW92ZSwgdXJsUGFyYW1zOiB0aGlzLnN0YXRlLnVybFBhcmFtc30pLCBcbiAgICAgICAgUGFnaW5hdGlvbkNvbXBvbmVudCh7cmVzcG9uc2VkYXRhOiBtb2RlbHMucmVzcG9uc2VkYXRhfSlcbiAgICAgIClcbiAgICApXG5cbiAgICB2YXIgbW9kYWxDb21wb25lbnQgPSBudWxsXG4gICAgdmFyIG1vZGFsID0gdGhpcy5wcm9wcy5tb2RhbFxuICAgIGlmICggbW9kYWwgKSB7XG4gICAgICBtb2RhbENvbXBvbmVudCA9IHtcbiAgICAgICAgbG9naW46IExvZ2luQ29tcG9uZW50XG4gICAgICB9WyBtb2RhbC5jb21wb25lbnQgXSh7XG4gICAgICAgIGFkZGZhdjogbW9kYWwuYWRkZmF2LFxuICAgICAgICBvblN1Y2Nlc3M6IG1vZGFsLm9uU3VjY2VzcyxcbiAgICAgICAgb25GYWlsOiBtb2RhbC5vbkZhaWwsXG4gICAgICAgIGNsYXNzTmFtZTogbW9kYWwuY29tcG9uZW50LFxuICAgICAgICBjbG9zZU1vZGFsOiB0aGlzLmNsb3NlTW9kYWxIYW5kbGVyXG4gICAgICB9KVxuICAgIH1cblxuICAgIHZhciB6b29tID0gdGhpcy5wcm9wcy56b29tXG4gICAgem9vbUNvbXBvbmVudCA9IHpvb20gPyBab29tQ29tcG9uZW50KHpvb20pIDogbnVsbFxuXG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2lkOiBcIndyYXBcIn0sIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtpZDogXCJ0b3BiYXJcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJpbm5lclwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiYmV0YWxvZ29cIn0sIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtYm9va21hcmstb1wifSksIFwiYmV0YXZlcnNpb25cIiksIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImZlZWRiYWNrXCJ9LCBSZWFjdC5ET00uYSh7aHJlZjogXCJodHRwOi8vZmVlZGJhY2sudGlkbmluZ2FyLmtiLnNlL1wiLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCBcIlR5Y2sgdGlsbCFcIikpLCBcbiAgICAgICAgICAgIHVzZXJcbiAgICAgICAgICApXG4gICAgICAgICksIFxuICAgICAgICBtYWluLCBcbiAgICAgICAgem9vbUNvbXBvbmVudCwgXG4gICAgICAgIE1vZGFsQ29tcG9uZW50KHtjbG9zZUhhbmRsZXI6IHRoaXMuY2xvc2VNb2RhbEhhbmRsZXIsIHNob3c6ICEhdGhpcy5wcm9wcy5tb2RhbH0sIFxuICAgICAgICAgIG1vZGFsQ29tcG9uZW50XG4gICAgICAgICksIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtpZDogXCJsb2FkbGF5ZXJcIn0sIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwic3Bpbm5lclwifSkpXG4gICAgICApXG4gICAgKVxuICB9XG59KVxuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCd2ZGQvcm91dGVyJylcbnZhciBRdWVyeSA9IHJlcXVpcmUoJ3ZkZC9xdWVyeScpXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpXG52YXIgVkREID0gcmVxdWlyZSgndmRkL3ZkZCcpXG52YXIgR2FsbGVyeUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vZ2FsbGVyeScpXG52YXIgVGltZWxpbmVDb21wb25lbnQgPSByZXF1aXJlKCcuL3RpbWVsaW5lJylcbnZhciBQdWJTdWIgPSByZXF1aXJlKCd2ZGQvcHVic3ViJylcbnZhciBtb2RlbHMgPSByZXF1aXJlKCd2ZGQvbW9kZWxzJylcbnZhciBQaXdpayA9IHJlcXVpcmUoJ3ZkZC9waXdpaycpXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmV4dDogbnVsbCxcbiAgICAgIHByZXY6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiAwLFxuICAgICAgcGFnZU51bWJlcjogbnVsbCxcbiAgICAgIGNhbGNIZWlnaHQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgbm9kZVRva2VuOiBudWxsLFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcblxuICAgIC8vIGxpc3RlbiBmb3IgYW4gYWN0aXZlIHJlc3VsdCBub2RlXG4gICAgdGhpcy5ub2RlVG9rZW4gPSBQdWJTdWIub24oJ25vZGUnLCB0aGlzLm9wZW4pXG4gIH0sXG5cbiAgYWN0aXZlTm9kZTogbnVsbCxcblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihwcm9wcykge1xuXG4gICAgaWYgKCB0aGlzLnN0YXRlLnBhZ2VOdW1iZXIgPT09IG51bGwgKSB7XG4gICAgICB2YXIgcGFnZU51bWJlciA9IHRoaXMuZ2V0UGFnZU51bWJlcihWREQuYnVpbGRQZXJtYUxpbmsodGhpcy5wcm9wcy51cmxQYXJhbXMpKVxuICAgICAgdHlwZW9mIHBhZ2VOdW1iZXIgPT0gJ251bWJlcicgJiYgdGhpcy5zZXRTdGF0ZSh7IHBhZ2VOdW1iZXI6IHBhZ2VOdW1iZXIgfSlcbiAgICB9XG4gIH0sXG5cbiAgZ2V0SGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgd2ggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gIH0sXG5cbiAgb3BlbjogZnVuY3Rpb24oZSkge1xuXG4gICAgdmFyIG5vZGUgPSBlLm5vZGVcblxuICAgIC8vIHJ1bnMgd2hlbiBhbiBhY3RpdmUgbm9kZSBpcyBmb3VuZFxuICAgIC8vIHBvc2l0aW9ucyB0aGUgZGV0YWlsIGFuZCBhbmltYXRlc1xuXG4gICAgaWYgKCAhbm9kZSB8fCBub2RlID09PSB0aGlzLmFjdGl2ZU5vZGUgKVxuICAgICAgcmV0dXJuXG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VOdW1iZXI6IG51bGxcbiAgICB9KVxuXG4gICAgdGhpcy5hY3RpdmVOb2RlID0gbm9kZVxuXG4gICAgdmFyICRub2RlID0gJChub2RlKVxuICAgIHZhciAkZWxlbSA9ICQodGhpcy5nZXRET01Ob2RlKCkpLmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKVxuICAgIHZhciAkcmVzdWx0cyA9ICQoJy5yZXN1bHRzJylcbiAgICB2YXIgdG9wID0gJG5vZGUuZGF0YSgncG9zJylcbiAgICB2YXIgaGVpZ2h0ID0gTWF0aC5taW4oMTAwMCwgTWF0aC5taW4oJCh3aW5kb3cpLmhlaWdodCgpLTE2MCwgJCh3aW5kb3cpLndpZHRoKCkvMikpXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNhbGNIZWlnaHQ6IGhlaWdodCB9KVxuICAgIHZhciAkYXJyID0gJCh0aGlzLnJlZnMuYXJyLmdldERPTU5vZGUoKSlcblxuICAgIGlmICggdG9wICYmIHRvcCAhPT0gdGhpcy5zdGF0ZS50b3AgKSB7XG4gICAgICB2YXIgd2lsbEV4cGFuZCA9IE1hdGguYWJzKCB0b3AgLSB0aGlzLnN0YXRlLnRvcCApID4gMTAwXG4gICAgICB2YXIgeVBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRvcDogdG9wXG4gICAgICB9KVxuXG4gICAgICB2YXIgbmV3UG9zXG4gICAgICAkZWxlbS5oZWlnaHQoMClcblxuICAgICAgdmFyIG1hc29ucnkgPSBWREQuZ2V0TWFzb25yeSgpXG5cbiAgICAgIGlmKG1hc29ucnkpIHtcbiAgICAgICAgbWFzb25yeS5tYXRyaXgoZnVuY3Rpb24ocm93cykge1xuICAgICAgICAgIHZhciBtYXJnaW5zID0gW11cbiAgICAgICAgICByb3dzLmZvckVhY2goZnVuY3Rpb24oY29scykge1xuXG4gICAgICAgICAgICBjb2xzLmZvckVhY2goZnVuY3Rpb24oY29sLCBjKSB7XG4gICAgICAgICAgICAgIGlmICggY29sLnRvcCsoY29sLmhlaWdodC8yKSA+IHRvcCApIHtcbiAgICAgICAgICAgICAgICBuZXdQb3MgPSB0b3AraGVpZ2h0KzIwXG4gICAgICAgICAgICAgICAgaWYgKCAhbWFyZ2lucy5oYXNPd25Qcm9wZXJ0eShjKSApXG4gICAgICAgICAgICAgICAgICBtYXJnaW5zW2NdID0gbmV3UG9zIC0gY29sLnRvcFxuICAgICAgICAgICAgICAgICQoY29sLmJyaWNrKS5kYXRhKCdleHRvcCcsIG1hcmdpbnNbY10pXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChjb2wuYnJpY2spLmRhdGEoJ2V4dG9wJywgMClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHZhciBwYWRkaW5nID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgbWFyZ2lucylcbiAgICAgICAgICBpZiAoICFwYWRkaW5nIHx8ICFpc0Zpbml0ZShwYWRkaW5nKSApXG4gICAgICAgICAgICBwYWRkaW5nID0gaGVpZ2h0XG4gICAgICAgICAgJHJlc3VsdHMuY3NzKCdwYWRkaW5nLWJvdHRvbScsIHBhZGRpbmcpXG4gICAgICAgICAgcmV0dXJuIHJvd3NcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRvID0gdG9wICsgJHJlc3VsdHMub2Zmc2V0KCkudG9wIC0gOTBcbiAgICAgICAgJGVsZW0uY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJylcbiAgICAgICAgaWYgKCB3aWxsRXhwYW5kICYmIHRoaXMucHJvcHMubW92ZSApIHtcbiAgICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0byB9LCA0MDAsICd2ZGQnKVxuICAgICAgICAgICRlbGVtLmFuaW1hdGUoe2hlaWdodDpoZWlnaHR9LCA0MDAsICd2ZGQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB0bylcbiAgICAgICAgICAkZWxlbS5oZWlnaHQoaGVpZ2h0KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9wcy5zZXRNb3ZlRmxhZyh0cnVlKVxuICAgICAgfS5iaW5kKHRoaXMpLCA0KVxuICAgICAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgJGVsZW0uY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJylcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFB1YlN1Yi5vZmYodGhpcy5ub2RlVG9rZW4pXG4gIH0sXG5cbiAgZ2V0QXJyUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgIGlmICggIXRoaXMuYWN0aXZlTm9kZSApXG4gICAgICByZXR1cm4gLTEwMFxuICAgIHJldHVybiAkKHRoaXMuYWN0aXZlTm9kZSkub2Zmc2V0KCkubGVmdCArIDEwMFxuICB9LFxuXG4gIG5hdmlnYXRlOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIFJvdXRlci5uYXZpZ2F0ZShWREQucGFyc2VQZXJtYUxpbmsobW9kZWwuZ2V0RmllbGRzKClbJ0BpZCddKSArICcvJyArIFF1ZXJ5LmJ1aWxkKCksIHsgdHJpZ2dlcjogdHJ1ZSB9KVxuICAgIFBpd2lrLnRyYWNrQ2xpY2soJ0RldGFpbHMnLCAnVmlldyBpbiBmdWxsc2NyZWVuJylcbiAgfSxcblxuICBwcmV2SGFuZGxlcjogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHRoaXMucHJvcHMuc2V0TW92ZUZsYWcoZmFsc2UpXG4gICAgdGhpcy5wcm9wcy5wcmV2ICYmIHRoaXMubmF2aWdhdGUodGhpcy5wcm9wcy5wcmV2KVxuICAgIFBpd2lrLnRyYWNrQ2xpY2soJ0RldGFpbHMnLCAnUGFnaW5hdGlvbjogUHJldmlvdXMnKVxuICB9LFxuXG4gIG5leHRIYW5kbGVyOiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdGhpcy5wcm9wcy5zZXRNb3ZlRmxhZyhmYWxzZSlcbiAgICB0aGlzLnByb3BzLm5leHQgJiYgdGhpcy5uYXZpZ2F0ZSh0aGlzLnByb3BzLm5leHQpXG4gICAgUGl3aWsudHJhY2tDbGljaygnRGV0YWlscycsICdQYWdpbmF0aW9uOiBOZXh0JylcbiAgfSxcblxuICBxdW90ZUNsaWNrSGFuZGxlcjogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0UGFnZU51bWJlcihlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UnKSlcbiAgICBQaXdpay50cmFja0NsaWNrKCdRdW90ZScsIGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZScpKVxuICB9LFxuXG4gIHNldFBhZ2VOdW1iZXI6IGZ1bmN0aW9uKG4pIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VOdW1iZXI6IHBhcnNlSW50KG4sIDEwKVxuICAgIH0pXG4gIH0sXG5cbiAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgIC8vdmFyIG1hc29ucnkgPSBWREQuZ2V0TWFzb25yeSgpXG4gICAgLy9tYXNvbnJ5ICYmIG1hc29ucnkucmVzZXQoKVxuICAgICQodGhpcy5nZXRET01Ob2RlKCkpLmFuaW1hdGUoe1xuICAgICAgaGVpZ2h0OiAwXG4gICAgfSwgNDAwLCAndmRkJywgZnVuY3Rpb24oKSB7XG4gICAgICBSb3V0ZXIubmF2aWdhdGUoJy8nICsgUXVlcnkuYnVpbGQoKSwgdHJ1ZSlcbiAgICB9KVxuICB9LFxuXG4gIGdldFBhZ2VOdW1iZXI6IGZ1bmN0aW9uKGlkKSB7XG4gICAgdmFyIHBhZ2VzID0gbW9kZWxzLmRldGFpbC5nZXRJc3N1ZUxpc3QoKVxuICAgIGlmICggcGFnZXMubGVuZ3RoICkge1xuICAgICAgZm9yKCB2YXIgaT0wOyBpPHBhZ2VzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiAoIHBhZ2VzW2ldICYmIHBhZ2VzW2ldLl9zb3VyY2UgJiYgcGFnZXNbaV0uX3NvdXJjZVsnQGlkJ10gPT09IGlkIClcbiAgICAgICAgICByZXR1cm4gaVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc05hbWVzID0gWydkZXRhaWwnXVxuICAgIHZhciAkcmVzdWx0cyA9ICQoJy5yZXN1bHRzJylcbiAgICB2YXIgbSA9ICRyZXN1bHRzLmxlbmd0aCA/ICRyZXN1bHRzLm9mZnNldCgpLnRvcCA6IDBcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiB0aGlzLnN0YXRlLnRvcCA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICB0b3A6IHRoaXMuc3RhdGUudG9wK20rMTAsXG4gICAgICBoZWlnaHQ6IDYwMFxuICAgIH1cblxuICAgIHZhciBzbmlwcGV0cyA9IG51bGxcbiAgICB2YXIgaW1hZ2VzID0gW11cbiAgICB2YXIgaGl0cyA9IG1vZGVscy5kZXRhaWwuZ2V0SGl0cygpXG4gICAgdmFyIGlzc3VlID0gbW9kZWxzLmRldGFpbC5nZXRJc3N1ZSgpXG4gICAgdmFyIGlkID0gVkRELmJ1aWxkUGVybWFMaW5rKHRoaXMucHJvcHMudXJsUGFyYW1zKVxuICAgIHZhciB0aXRsZSA9ICcnXG4gICAgdmFyIGRhdGUgPSAnJ1xuICAgIHZhciBpc3N1ZXMgPSBtb2RlbHMuZGV0YWlsLmdldElzc3VlTGlzdCgpXG4gICAgdmFyIGhpZ2hsaWdodHMgPSB7fVxuICAgIGlmICggaGl0cyApIHtcbiAgICAgIHNuaXBwZXRzID0gbW9kZWxzLmRldGFpbC5nZXRIaXRMaXN0KCkubWFwKGZ1bmN0aW9uKGhpdCwgaSkge1xuICAgICAgICBpZiAoIGhpdC5oaWdobGlnaHQgKSB7XG4gICAgICAgICAgdmFyIHBhZ2VOdW1iZXIgPSB0aGlzLmdldFBhZ2VOdW1iZXIoaGl0Ll9zb3VyY2VbJ0BpZCddKVxuICAgICAgICAgIHZhciBobCA9IFtdXG4gICAgICAgICAgdmFyIGNvbnRlbnRzID0gaGl0LmhpZ2hsaWdodC5jb250ZW50Lm1hcChmdW5jdGlvbihjb250ZW50LCBpKSB7XG4gICAgICAgICAgICBobC5wdXNoKGNvbnRlbnQucmVwbGFjZSgvLio8ZW0+KC4qKTxcXC9lbT4uKi8sICckMScpKVxuICAgICAgICAgICAgaWYgKCBpICYmIGk8aGl0LmhpZ2hsaWdodC5jb250ZW50Lmxlbmd0aC0xIClcbiAgICAgICAgICAgICAgY29udGVudCArPSAnIDxiPi4uLjwvYj4gJ1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LkRPTS5zcGFuKHtkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6IGNvbnRlbnR9fSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHZhciBjbGFzc05hbWVzID0gWydxdW90ZSddXG4gICAgICAgICAgaGlnaGxpZ2h0c1twYWdlTnVtYmVyLnRvU3RyaW5nKCldID0gaGwuc2xpY2UoMClcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBjbGFzc05hbWVzLmpvaW4oJyAnKSwgJ2RhdGEtcGFnZSc6IHBhZ2VOdW1iZXIsIG9uQ2xpY2s6IHRoaXMucXVvdGVDbGlja0hhbmRsZXJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1xdW90ZS1yaWdodFwifSksIFxuICAgICAgICAgICAgICBjb250ZW50c1xuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcylcbiAgICB9XG4gICAgaWYgKCBpc3N1ZSApIHtcbiAgICAgIHZhciBmaXJzdCA9IG1vZGVscy5kZXRhaWwuZ2V0SXNzdWVMaXN0KClbMF1cbiAgICAgIGlmICggZmlyc3QgKSB7XG4gICAgICAgIHRpdGxlID0gVkRELmNhcGl0YWxpemUoZmlyc3QuX3NvdXJjZS5uZXdzcGFwZXIudGl0bGUpXG4gICAgICAgIGRhdGUgPSBkYXRlIHx8IGZpcnN0Ll9zb3VyY2UuaXNzdWUuaXNzdWVkXG4gICAgICB9XG4gICAgfVxuICAgIHZhciBhcnJTdHlsZSA9IHsgbGVmdDogdGhpcy5nZXRBcnJQb3NpdGlvbigpIH1cblxuICAgIC8qIEVuYWJsZSBpZiB3ZSBoYXZlIGltYWdlIHdpZHRoL2hlaWdodFxuICAgIHZhciByID0gMTBcblxuICAgIGlzc3Vlcy5mb3JFYWNoKGZ1bmN0aW9uKGlzc3VlKSB7XG4gICAgICBjb25zb2xlLmxvZyhpc3N1ZS5fc291cmNlKVxuICAgICAgciA9IE1hdGgubWluKHIsIGlzc3VlLl9zb3VyY2UuaW1hZ2Uud2lkdGgvaXNzdWUuX3NvdXJjZS5pbWFnZS5oZWlnaHQpXG4gICAgfSlcbiAgICAqL1xuXG4gICAgLy8gZm9yIG5vdyB3ZSBzZXQgYSB0ZW1wb3JhcnkgcmF0aW8gdGhhdCBzdWl0cyBtb3N0IGltYWdlc1xuICAgIHIgPSAwLjdcblxuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IGNsYXNzTmFtZXMuam9pbignICcpLCBzdHlsZTogc3R5bGV9LCBcbiAgICAgICAgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1jYXJldC11cCBhcnJcIiwgcmVmOiBcImFyclwiLCBzdHlsZTogYXJyU3R5bGV9KSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogJ3ByZXYnICsgKHRoaXMucHJvcHMucHJldiA/ICcnIDogJyBkaXNhYmxlZCcpLCBvbkNsaWNrOiB0aGlzLnByZXZIYW5kbGVyfSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1jYXJldC1sZWZ0XCJ9KVxuICAgICAgICApLCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiAnbmV4dCcgKyAodGhpcy5wcm9wcy5uZXh0ID8gJycgOiAnIGRpc2FibGVkJyksIG9uQ2xpY2s6IHRoaXMubmV4dEhhbmRsZXJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBcImZhIGZhLWNhcmV0LXJpZ2h0XCJ9KVxuICAgICAgICApLCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcInNoYXJlXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBcImZhIGZhLXR3aXR0ZXJcIn0pLCBcbiAgICAgICAgICBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBcImZhIGZhLWZhY2Vib29rLXNxdWFyZVwifSksIFxuICAgICAgICAgIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtZW52ZWxvcGVcIn0pXG4gICAgICAgICksIFxuICAgICAgICBHYWxsZXJ5Q29tcG9uZW50KHtyYXRpbzogciwgaGlnaGxpZ2h0czogaGlnaGxpZ2h0cywgc2V0UGFnZU51bWJlcjogdGhpcy5zZXRQYWdlTnVtYmVyLCBwYWdlTnVtYmVyOiB0aGlzLnN0YXRlLnBhZ2VOdW1iZXIsIGNhbGNIZWlnaHQ6IHRoaXMuc3RhdGUuY2FsY0hlaWdodH0pLCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcInRpdGxlXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uc3Ryb25nKG51bGwsIHRpdGxlKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLnNwYW4oe2NsYXNzTmFtZTogXCJkYXRlXCJ9LCBkYXRlKVxuICAgICAgICApLCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcInF1b3Rlc1wifSwgXG4gICAgICAgICAgc25pcHBldHNcbiAgICAgICAgKSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJjbG9zZXJcIiwgb25DbGljazogdGhpcy5jbG9zZX0sIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtdGltZXNcIn0pKSwgXG4gICAgICAgIFRpbWVsaW5lQ29tcG9uZW50KHtzZXRQYWdlTnVtYmVyOiB0aGlzLnNldFBhZ2VOdW1iZXIsIHBhZ2VOdW1iZXI6IHRoaXMuc3RhdGUucGFnZU51bWJlcn0pXG4gICAgICApXG4gICAgKVxuICB9XG59KVxuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbnZhciBGaWx0ZXJOZXdzcGFwZXJDb21wb25lbnQgPSByZXF1aXJlKCcuL2ZpbHRlcnMvbmV3c3BhcGVyL25ld3NwYXBlcicpXG52YXIgRmlsdGVyRGF0ZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vZmlsdGVycy9kYXRlL2RhdGUnKVxuLy92YXIgRmlsdGVyTWFwQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9maWx0ZXJzL21hcC9tYXAnKVxuLy92YXIgRmlsdGVyUG9saXRpY2FsQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9maWx0ZXJzL3BvbGl0aWNhbC9wb2xpdGljYWwnKVxuLy92YXIgRmlsdGVyRmVhdHVyZXNDb21wb25lbnQgPSByZXF1aXJlKCcuL2ZpbHRlcnMvZmVhdHVyZXMvZmVhdHVyZXMnKVxudmFyIFF1ZXJ5ID0gcmVxdWlyZSgndmRkL3F1ZXJ5JylcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCd2ZGQvcm91dGVyJylcbnZhciBtb2RlbHMgPSByZXF1aXJlKCd2ZGQvbW9kZWxzJylcbnZhciBQdWJTdWIgPSByZXF1aXJlKCd2ZGQvcHVic3ViJylcbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKVxuXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ2V4cG9ydHMnLFxuXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vcmU6IGZhbHNlLFxuICAgICAgbmV3c3BhcGVyOiAnJyxcbiAgICAgIGZyb206ICcnLFxuICAgICAgdG86ICcnXG4gICAgfVxuICB9LFxuXG4gIHNldERhdGVzOiBmdW5jdGlvbiggZSApIHtcbiAgICBpZiAoIGUuZnJvbSB8fCBlLmZyb20gPT09ICcnIHx8IGUuZnJvbSA9PT0gbnVsbCApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoIHsgZnJvbTogZS5mcm9tIH0gKVxuICAgIH1cbiAgICBpZiAoIGUudG8gfHwgZS50byA9PT0gJycgfHwgZS50byA9PT0gbnVsbCApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoIHsgdG86IGUudG8gfSApXG4gICAgfVxuICB9LFxuXG4gIGZpbHRlck9uRGF0ZXM6IGZ1bmN0aW9uKCBmb3JjZSApIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICBpZiAoIG1vbWVudCggc2VsZi5zdGF0ZS5mcm9tICkuaXNWYWxpZCgpICkge1xuICAgICAgUXVlcnkuc2V0KCB7IGZyb206IHNlbGYuc3RhdGUuZnJvbSB9IClcbiAgICB9IGVsc2UgaWYgKCAhUXVlcnkuZ2V0KCAnZnJvbScgKSB8fCBmb3JjZSApIHtcbiAgICAgIFF1ZXJ5LnJlbW92ZSggJ2Zyb20nIClcbiAgICB9XG4gICAgaWYgKCBtb21lbnQoIHNlbGYuc3RhdGUudG8gKS5pc1ZhbGlkKCkgKSB7XG4gICAgICBRdWVyeS5zZXQoIHsgdG86IHNlbGYuc3RhdGUudG8gfSApXG4gICAgfSBlbHNlIGlmICggIVF1ZXJ5LmdldCggJ3RvJyApIHx8IGZvcmNlICkge1xuICAgICAgUXVlcnkucmVtb3ZlKCAndG8nIClcbiAgICB9XG4gICAgUXVlcnkucmVtb3ZlKCdwYWdlJylcbiAgICAvLyBGZXRjaCBkYXRhXG4gICAgUm91dGVyLm5hdmlnYXRlKCcvJyArIFF1ZXJ5LmJ1aWxkKCksIHt0cmlnZ2VyOiB0cnVlfSlcbiAgICAvLyBTdGF0ZSBpcyBmb3IgZGlzcGxheSBvbmx5LCByZXNldCBpdCBub3cgdGhhdCB3ZSd2ZSBnb3QgbmV3IGRhdGFcbiAgICBzZWxmLnNldFN0YXRlKHtcbiAgICAgIGZyb206IG51bGwsXG4gICAgICB0bzogbnVsbFxuICAgIH0pXG4gIH0sXG5cbiAgZ2V0UmFuZ2VGcm9tRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGVzID0gbW9kZWxzLnJlc3BvbnNlZGF0YS5nZXREYXRlcygpLmRhdGFcbiAgICB2YXIgcHJlY2lzaW9uID0gbW9kZWxzLnJlc3BvbnNlZGF0YS5nZXREYXRlcygpLnByZWNpc2lvblxuICAgIHZhciBmcm9tID0gXy5taW4oZGF0ZXMsIGZ1bmN0aW9uKGQpe3JldHVybiBkLnRlcm19KVxuICAgIHZhciB0byA9ICBfLm1heChkYXRlcywgZnVuY3Rpb24oZCl7cmV0dXJuIGQudGVybX0pXG4gICAgZnJvbSA9IG1vbWVudCggZnJvbS50ZXJtICkuc3RhcnRPZiggcHJlY2lzaW9uICkuZm9ybWF0KCAnWVlZWS1NTS1ERCcgKVxuICAgIHRvID0gbW9tZW50KCB0by50ZXJtICkuZW5kT2YoIHByZWNpc2lvbiApLmZvcm1hdCggJ1lZWVktTU0tREQnIClcbiAgICByZXR1cm4ge1xuICAgICAgZnJvbTogZnJvbSxcbiAgICAgIHRvOiB0b1xuICAgIH1cbiAgfSxcblxuICB0b2dnbGVNb3JlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttb3JlOiAhdGhpcy5zdGF0ZS5tb3JlfSk7XG4gIH0sXG5cbiAgb25Sb3V0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXREYXRlcyh7XG4gICAgICB0bzogUXVlcnkuZ2V0KCd0bycpLFxuICAgICAgZnJvbTogUXVlcnkuZ2V0KCdmcm9tJylcbiAgICB9KVxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgUm91dGVyLm9uKCdyb3V0ZScsIHRoaXMub25Sb3V0ZSlcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XG4gICAgUm91dGVyLm9mZigncm91dGUnLCB0aGlzLm9uUm91dGUpXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgIGlmICggIVF1ZXJ5LmdldCgncScpIClcbiAgICAgIHJldHVybiBSZWFjdC5ET00uZGl2KG51bGwpXG5cbiAgICB2YXIgbW9yZUNsYXNzID0gdGhpcy5zdGF0ZS5tb3JlID8gJ21vcmUgb3BlbicgOiAnbW9yZSdcbiAgICB2YXIgbmV3c3BhcGVyRGlzcGxheURhdGEgPSBtb2RlbHMucmVzcG9uc2VkYXRhLmdldE5ld3NwYXBlcnMoKVxuXG4gICAgdmFyIGZyb20gPSB0aGlzLnN0YXRlLmZyb20gfHwgUXVlcnkuZ2V0KCdmcm9tJykgfHwgdGhpcy5nZXRSYW5nZUZyb21EYXRhKCkuZnJvbVxuICAgIHZhciB0byA9IHRoaXMuc3RhdGUudG8gfHwgUXVlcnkuZ2V0KCd0bycpIHx8IHRoaXMuZ2V0UmFuZ2VGcm9tRGF0YSgpLnRvXG5cbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImJsb2NrIGZpbHRlcnNcIn0sIFxuICAgICAgICBGaWx0ZXJOZXdzcGFwZXJDb21wb25lbnQoe25ld3NwYXBlcjogdGhpcy5zdGF0ZS5uZXdzcGFwZXIsIGRpc3BsYXlEYXRhOiBuZXdzcGFwZXJEaXNwbGF5RGF0YX0pLCBcbiAgICAgICAgRmlsdGVyRGF0ZUNvbXBvbmVudCh7ZnJvbTogZnJvbSwgdG86IHRvLCBcbiAgICAgICAgICBzZXREYXRlczogdGhpcy5zZXREYXRlcywgZmlsdGVyT25EYXRlczogdGhpcy5maWx0ZXJPbkRhdGVzfSlcbiAgICAgICAgLyogIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bW9yZUNsYXNzfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiIG9uQ2xpY2s9eyB0aGlzLnRvZ2dsZU1vcmUgfT5cbiAgICAgICAgICAgIDxoMj5GbGVyIGZpbHRlcjwvaDI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPEZpbHRlck1hcENvbXBvbmVudCByZXN1bHRzPXt0aGlzLnByb3BzLnJlc3VsdHN9IC8+XG4gICAgICAgICAgPEZpbHRlclBvbGl0aWNhbENvbXBvbmVudCByZXN1bHRzPXt0aGlzLnByb3BzLnJlc3VsdHN9IC8+XG4gICAgICAgICAgPEZpbHRlckZlYXR1cmVzQ29tcG9uZW50IHJlc3VsdHM9e3RoaXMucHJvcHMucmVzdWx0c30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICovXG4gICAgICApXG4gICAgKVxuICB9XG59KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKVxudmFyIGQzID0gcmVxdWlyZSgnZDMnKVxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpXG52YXIgcGlrYWRheSA9IHJlcXVpcmUoJ3Bpa2FkYXknKVxudmFyIGxvY2FsZSA9IHJlcXVpcmUoJ3ZkZC9sb2NhbGUnKVxudmFyIHJlc3BvbnNlZGF0YSA9IHJlcXVpcmUoJ3ZkZC9tb2RlbHMnKS5yZXNwb25zZWRhdGFcbnZhciBUaW1lbGluZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGltZWxpbmUnKVxudmFyIHN3ZWRpc2ggPSByZXF1aXJlKCd2ZGQvbG9jYWxlJylcblxudmFyIG91dGVyd2lkdGggPSA2NTBcbnZhciBvdXRlcmhlaWdodCA9IDE0MFxuXG52YXIgZnJvbVBpY2tlciwgdG9QaWNrZXJcbnZhciBmaWVsZHMsIHRyaWdnZXJzXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZnJvbTogdGhpcy5wcm9wcy5mcm9tLFxuICAgICAgdG86IHRoaXMucHJvcHMudG9cbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24oIHByb3BzICkge1xuICAgIHRoaXMuc2V0U3RhdGUoIHByb3BzIClcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdmFyIHNldHRlciA9IHRoaXMucHJvcHMuc2V0RGF0ZXNcbiAgICB2YXIgdHJpZ2dlciA9IHRoaXMucHJvcHMuZmlsdGVyT25EYXRlc1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHZhciBwaWthRGVmYXVsdHMgPSB7XG4gICAgICBpMThuOiBzd2VkaXNoLnBpa2FkYXksXG4gICAgICBmaXJzdERheTogMSxcbiAgICAgIHNldERlZmF1bHREYXRlOiB0cnVlLFxuICAgICAgeWVhclJhbmdlOiAxNVxuICAgIH1cblxuICAgIGZpZWxkcyA9IHtcbiAgICAgIGZyb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcm9tRmllbGQnKSxcbiAgICAgIHRvOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9GaWVsZCcpXG4gICAgfVxuICAgIHRyaWdnZXJzID0ge1xuICAgICAgZnJvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zyb21UcmlnZ2VyJyksXG4gICAgICB0bzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvVHJpZ2dlcicpXG4gICAgfVxuXG4gICAgZnJvbVBpY2tlciA9IG5ldyBwaWthZGF5KCBfLmV4dGVuZCggcGlrYURlZmF1bHRzLCB7XG4gICAgICBmaWVsZDogZmllbGRzWyAnZnJvbScgXSxcbiAgICAgIHRyaWdnZXI6IHRyaWdnZXJzWyAnZnJvbScgXSxcbiAgICAgIG1pbkRhdGU6IG1vbWVudCggJzE4MDAtMDEtMDEnICkudG9EYXRlKCksXG4gICAgICBvblNlbGVjdDogZnVuY3Rpb24oIGRhdGUgKSB7XG4gICAgICAgIHNldHRlciggeyBmcm9tOiBtb21lbnQoIGRhdGUgKS5mb3JtYXQoICdZWVlZLU1NLUREJyApIH0gKVxuICAgICAgICB0cmlnZ2VyKClcbiAgICAgIH0sXG4gICAgICBvbk9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldERhdGUoIHNlbGYucHJvcHMuZnJvbSwgdHJ1ZSApXG4gICAgICAgIHRoaXMuc2V0TWF4RGF0ZSggbW9tZW50KCBzZWxmLnByb3BzLnRvICkudG9EYXRlKCkgKVxuICAgICAgfVxuICAgIH0gKSApXG5cbiAgICB0b1BpY2tlciA9IG5ldyBwaWthZGF5KCBfLmV4dGVuZCggcGlrYURlZmF1bHRzLCB7XG4gICAgICBmaWVsZDogZmllbGRzWyAndG8nIF0sXG4gICAgICB0cmlnZ2VyOiB0cmlnZ2Vyc1sgJ3RvJyBdLFxuICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uKCBkYXRlICkge1xuICAgICAgICBzZXR0ZXIoIHsgdG86IG1vbWVudCggZGF0ZSApLmZvcm1hdCggJ1lZWVktTU0tREQnICkgfSApXG4gICAgICAgIHRyaWdnZXIoKVxuICAgICAgfSxcbiAgICAgIG9uT3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0ZSggc2VsZi5wcm9wcy50bywgdHJ1ZSApXG4gICAgICAgIHRoaXMuc2V0TWluRGF0ZSggbW9tZW50KCBzZWxmLnByb3BzLmZyb20gKS50b0RhdGUoKSApXG4gICAgICB9XG4gICAgfSApIClcblxuICB9LFxuXG4gIGRhdGVDaGFuZ2U6IGZ1bmN0aW9uKCB0YXJnZXQsIGV2ZW50ICkge1xuICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIGJvdGggZnJvbSBhbmQgdG8gdmFsdWVzIGluIHBheWxvYWRcbiAgICB2YXIgcGF5bG9hZCA9IHtcbiAgICAgIGZyb206IHRoaXMucHJvcHMuZnJvbSxcbiAgICAgIHRvOiB0aGlzLnByb3BzLnRvXG4gICAgfVxuICAgIC8vIFRoZW4gb3ZlcnJpZGUgdGhlIGN1cnJlbnRcbiAgICBwYXlsb2FkWyB0YXJnZXQgXSA9IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIHRoaXMuc2V0U3RhdGUoIHBheWxvYWQgKVxuICB9LFxuXG4gIGRhdGVGb2N1czogZnVuY3Rpb24oIHRhcmdldCwgZXZlbnQgKSB7XG4gICAgLy8gdmFyIERPTXRhcmdldCA9IGZpZWxkc1sgdGFyZ2V0IF1cbiAgICAvLyBjb25zb2xlLmxvZyggdGFyZ2V0LCBldmVudCApO1xuICB9LFxuXG4gIGRhdGVCbHVyOiBmdW5jdGlvbiggdGFyZ2V0LCBldmVudCApIHtcbiAgICAvLyB2YXIgRE9NdGFyZ2V0ID0gZmllbGRzWyB0YXJnZXQgXVxuICAgIC8vIGNvbnNvbGUubG9nKCB0YXJnZXQsIGV2ZW50ICk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRvUGlja2VyLmRlc3Ryb3koKVxuICAgIGZyb21QaWNrZXIuZGVzdHJveSgpXG4gIH0sXG5cbiAgcmVzZXREYXRlRmlsdGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnByb3BzLnNldERhdGVzKHtcbiAgICAgIGZyb206ICcnLFxuICAgICAgdG86ICcnXG4gICAgfSlcbiAgICAvLyBNYWtlIHN1cmUgZGF0ZXMgYXJlIHJlc2V0LiBcbiAgICAvLyBGaXhlcyBidWcgXCJSZW5zYS1rbmFwcGVuIGtyw6R2ZXIgdHbDpSBrbGljay4uLlwiXG4gICAgdmFyIHNlbGYgPSAgdGhpc1xuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5wcm9wcy5maWx0ZXJPbkRhdGVzKCB0cnVlIClcbiAgICB9LCA0IClcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiZmlsdGVyIGRhdGVcIn0sIFxuICAgICAgICBUaW1lbGluZUNvbXBvbmVudCh7d2lkdGg6IG91dGVyd2lkdGgsIGhlaWdodDogb3V0ZXJoZWlnaHQsIFxuICAgICAgICAgIHNldERhdGVzOiB0aGlzLnByb3BzLnNldERhdGVzLCBcbiAgICAgICAgICBmaWx0ZXJPbkRhdGVzOiB0aGlzLnByb3BzLmZpbHRlck9uRGF0ZXN9KSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2lkOiBcImRhdGV0ZXh0XCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00ubGFiZWwoe2h0bWxGb3I6IFwiZnJvbUZpZWxkXCJ9LCBcIkZyw6VuOlwiKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmlucHV0KHt0eXBlOiBcInRleHRcIiwgaWQ6IFwiZnJvbUZpZWxkXCIsIGF1dG9Db21wbGV0ZTogXCJvZmZcIiwgbmFtZTogXCJmcm9tXCIsIFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZnJvbSwgXG4gICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5kYXRlQ2hhbmdlLmJpbmQobnVsbCwgJ2Zyb20nKSwgXG4gICAgICAgICAgICBvbkZvY3VzOiB0aGlzLmRhdGVGb2N1cy5iaW5kKG51bGwsICdmcm9tJyksIFxuICAgICAgICAgICAgb25CbHVyOiB0aGlzLmRhdGVCbHVyLmJpbmQobnVsbCwgJ2Zyb20nKX0pLCBcbiAgICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcImljb25cIn0sIFJlYWN0LkRPTS5pKHtpZDogXCJmcm9tVHJpZ2dlclwiLCBjbGFzc05hbWU6IFwiZmEgZmEtY2FsZW5kYXJcIn0pKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKHtodG1sRm9yOiBcInRvRmllbGRcIn0sIFwiVGlsbDpcIiksIFxuICAgICAgICAgIFJlYWN0LkRPTS5pbnB1dCh7dHlwZTogXCJ0ZXh0XCIsIGlkOiBcInRvRmllbGRcIiwgYXV0b0NvbXBsZXRlOiBcIm9mZlwiLCBuYW1lOiBcInRvXCIsIFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudG8sIFxuICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuZGF0ZUNoYW5nZS5iaW5kKG51bGwsICd0bycpLCBcbiAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMuZGF0ZUZvY3VzLmJpbmQobnVsbCwgJ3RvJyksIFxuICAgICAgICAgICAgb25CbHVyOiB0aGlzLmRhdGVCbHVyLmJpbmQobnVsbCwgJ3RvJyl9KSwgXG4gICAgICAgICAgUmVhY3QuRE9NLnNwYW4oe2NsYXNzTmFtZTogXCJpY29uXCJ9LCBSZWFjdC5ET00uaSh7aWQ6IFwidG9UcmlnZ2VyXCIsIGNsYXNzTmFtZTogXCJmYSBmYS1jYWxlbmRhclwifSkpLCBcbiAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHtvbkNsaWNrOiB0aGlzLnJlc2V0RGF0ZUZpbHRlcn0sIFwiUmVuc2FcIilcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgfVxufSlcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG52YXIgZDMgPSByZXF1aXJlKCdkMycpXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50JylcbnZhciByYW5nZSA9IHJlcXVpcmUoJ21vbWVudC1yYW5nZScpXG52YXIgcGlrYWRheSA9IHJlcXVpcmUoJ3Bpa2FkYXknKVxudmFyIFF1ZXJ5ID0gcmVxdWlyZSgndmRkL3F1ZXJ5JylcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCd2ZGQvcm91dGVyJylcbnZhciBzd2VkaXNoID0gcmVxdWlyZSgndmRkL2xvY2FsZScpXG52YXIgbW9kZWxzID0gcmVxdWlyZSgndmRkL21vZGVscycpXG52YXIgUHViU3ViID0gcmVxdWlyZSgndmRkL3B1YnN1YicpXG5cbnZhciBtYXJnaW4gPSB7dG9wOiAwLCByaWdodDogMTAsIGJvdHRvbTogMjAsIGxlZnQ6IDB9XG52YXIgd2lkdGgsaGVpZ2h0LFxuICAgIHhBeGlzLHhheCx4LFxuICAgIGJydXNoLGJydXNocmVjdCxcbiAgICBjb250ZXh0LGJhcnMsXG4gICAgZGF0YSxkYXRhbGVuZ3RoLFxuICAgIHByZWNpc2lvbixcbiAgICBiYXJXaWR0aCxcbiAgICB0b29sdGlwXG5cbi8vIFNldCBzd2VkaXNoIGFzIHRoZSBkZWZhdWx0IGxhbmd1YWdlIGZvciB0aWNrcyBhbmQgZG8gc29tZSBmb3JtYXR0aW5nXG52YXIgc3dlZGlzaExvY2FsZSA9IGQzLmxvY2FsZSggc3dlZGlzaC5kMyApXG52YXIgY3VzdG9tVGltZUZvcm1hdCA9IHN3ZWRpc2hMb2NhbGUudGltZUZvcm1hdC5tdWx0aShbXG4gIFsgJycsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuZ2V0TWlsbGlzZWNvbmRzKCkgfSBdLFxuICBbICcnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmdldFNlY29uZHMoKSB9IF0sXG4gIFsgJycsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuZ2V0TWludXRlcygpIH0gXSxcbiAgWyAnJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5nZXRIb3VycygpIH0gXSxcbiAgWyAnJWUgJWInLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmdldERheSgpICYmIGQuZ2V0RGF0ZSgpICE9IDEgfSBdLFxuICBbICclYiAlZCcsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuZ2V0RGF0ZSgpICE9IDEgfSBdLFxuICBbICclYicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuZ2V0TW9udGgoKSB9IF0sXG4gIFsgJyVZJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gdHJ1ZSB9IF1cbl0pXG5cbnZhciBnZXREYXRlU3RyaW5nID0gZnVuY3Rpb24oZHRlKSB7XG4gIHJldHVybiBtb21lbnQoIGR0ZSApLmZvcm1hdCggJ1lZWVktTU0tREQnIClcbn1cblxudmFyIHR5cGUgPSBmdW5jdGlvbiggZCwgaSApIHtcbiAgZC50ZXJtID0gbmV3IERhdGUoZC50ZXJtKVxuICBkLmNvdW50ID0gK2QuY291bnRcbiAgcmV0dXJuIGRcbn1cblxudmFyIGJydXNoTW92ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBHZXQgYnJ1c2ggZnJvbSBhbmQgdG8gcG9pbnRzXG4gIHZhciBleHRlbnQgPSBicnVzaC5leHRlbnQoKVxuICB2YXIgZnJvbSA9IGV4dGVudFswXVxuICB2YXIgdG8gPSBleHRlbnRbMV1cbiAgLy8gTWFrZSBzdXJlIHRoaXMgaXMgbm90IGEgc2luZ2xlIGNsaWNrIGluc2lkZSB0aGUgZGF0ZSBjYW52YXNcbiAgaWYgKCAhbW9tZW50KGZyb20pLmRpZmYobW9tZW50KHRvKSkgKSByZXR1cm5cblxuICAvLyBUaGlzIGRvZXNuJ3Qgd29yayBiZWNhdXNlIHRoZSBkYXRhIGlzIHVwZGF0ZWQgY29udGludW91c2x5IGR1cmluZyBicnVzaGluZyBvciBzbXRoXG4gIC8vIHZhciBicnVzaFJhbmdlID0gbW9tZW50KCkucmFuZ2UoIGZyb20sIHRvIClcbiAgLy8gYmFycy5jbGFzc2VkKCdicnVzaGVkJywgZnVuY3Rpb24oZCkge1xuICAvLyAgIHNlbGVjdGVkID0gbW9tZW50KCBkLnRlcm0gKS53aXRoaW4oIGJydXNoUmFuZ2UgKVxuICAvLyAgIC8vY29uc29sZS5sb2coc2VsZWN0ZWQpO1xuICAvLyAgIHJldHVybiBzZWxlY3RlZFxuICAvLyB9KVxuXG4gIFB1YlN1Yi50cmlnZ2VyKCAnZGF0ZWNoYW5nZScsIHsgZnJvbTogZ2V0RGF0ZVN0cmluZyggZnJvbSApLCB0bzogZ2V0RGF0ZVN0cmluZyggdG8gKSB9IClcbn1cblxudmFyIGJydXNoRW5kID0gZnVuY3Rpb24oKSB7XG4gIC8vIFNldCBuZXcgcXVlcnlzdHJpbmcgYmFzZWQgb24gc2VsZWN0aW9uXG4gIHZhciBleHRlbnQgPSBicnVzaC5leHRlbnQoKVxuICBcbiAgLy8gTWFrZSBzdXJlIHRoaXMgaXMgbm90IGEgc2luZ2xlIGNsaWNrIGluc2lkZSB0aGUgZGF0ZSBjYW52YXNcbiAgaWYgKCAhbW9tZW50KGV4dGVudFswXSkuZGlmZihtb21lbnQoZXh0ZW50WzFdKSkgKSByZXR1cm5cblxuICAvLyBSZW1vdmUgc2VsZWN0aW9uIGluZGljYXRvciBmcm9tIGNhbnZhc1xuICBjb250ZXh0LnNlbGVjdCgnLmJydXNoJykuY2FsbChicnVzaC5jbGVhcigpKVxuXG4gIFB1YlN1Yi50cmlnZ2VyKCAnZGF0ZXNldCcgKVxufVxuXG52YXIgYmFyQ2xpY2sgPSBmdW5jdGlvbihlKXtcbiAgdmFyIHN0YXJ0XG4gIHZhciBlbmRcbiAgdmFyIGJhclByZWNpc2lvbiA9IGUucHJlY1xuXG4gIHN0YXJ0ID0gZ2V0RGF0ZVN0cmluZyggbW9tZW50KCBlLnRlcm0gKS5zdGFydE9mKCBiYXJQcmVjaXNpb24gKSApXG4gIGVuZCA9IGdldERhdGVTdHJpbmcoIG1vbWVudCggZS50ZXJtICkuZW5kT2YoIGJhclByZWNpc2lvbiApIClcblxuICBQdWJTdWIudHJpZ2dlciggJ2RhdGVjaGFuZ2UnLCB7IGZyb206IHN0YXJ0LCB0bzogZW5kIH0gKVxuICBQdWJTdWIudHJpZ2dlciggJ2RhdGVzZXQnIClcbn1cblxudmFyIGJhck92ZXIgPSBmdW5jdGlvbiggYmFyICkge1xuICB2YXIgZGF0ZUZvcm1hdFxuICBpZiAoIHByZWNpc2lvbiA9PSAnbW9udGgnICkge1xuICAgIGRhdGVGb3JtYXQgPSBzd2VkaXNoTG9jYWxlLnRpbWVGb3JtYXQoJyViICVZJylcbiAgfSBlbHNlIGlmICggcHJlY2lzaW9uID09ICdkYXknICkge1xuICAgIGRhdGVGb3JtYXQgPSBzd2VkaXNoTG9jYWxlLnRpbWVGb3JtYXQoJyVhLCAlZCAlYiAlWScpXG4gIH0gZWxzZSB7XG4gICAgZGF0ZUZvcm1hdCA9IHN3ZWRpc2hMb2NhbGUudGltZUZvcm1hdCgnJVknKVxuICB9XG4gIHZhciBkYXRlID0gZGF0ZUZvcm1hdCggYmFyLnRlcm0gKSArICcsPGJyPidcbiAgdmFyIHRleHQgPSAoIGJhci5jb3VudCA9PSAxKSA/ICcgdHLDpGZmLicgOiAnIHRyw6RmZmFyLidcblxuICB0b29sdGlwXG4gICAgLmh0bWwoIGRhdGUgKyBiYXIuY291bnQgKyB0ZXh0IClcbiAgICAuYXR0ciggJ2NsYXNzJywgJycgKVxufVxuXG52YXIgYmFyT3V0ID0gZnVuY3Rpb24oKSB7XG4gIHRvb2x0aXBcbiAgLmF0dHIoICdjbGFzcycsICdoaWRkZW4nIClcbn1cblxudmFyIGJhck1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdG9vbHRpcFxuICAgIC5zdHlsZSggJ3RvcCcsICggZDMuZXZlbnQucGFnZVkgLSAyMCApICsgJ3B4JylcbiAgICAuc3R5bGUoICdsZWZ0JywgKCBkMy5ldmVudC5wYWdlWCArIDIwICkgKyAncHgnKVxufVxuXG52YXIgY3JlYXRlQ2hhcnQgPSBmdW5jdGlvbiggcHJvcHMgKSB7XG4gIHdpZHRoID0gKCBwcm9wcyApID8gcHJvcHMud2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCA6IDBcbiAgaGVpZ2h0ID0gKCBwcm9wcyApID8gcHJvcHMuaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20gOiAwXG5cbiAgeCA9IGQzLnRpbWUuc2NhbGUoKS5yYW5nZShbMCwgd2lkdGhdKVxuICB5ID0gZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoW2hlaWdodCwgMF0pXG5cbiAgLy8gU2V0IHN3ZWRpc2ggYXMgdGljayBsYW5ndWFnZVxuICB4QXhpcyA9IGQzLnN2Zy5heGlzKCkuc2NhbGUoeCkub3JpZW50KCdib3R0b20nKS50aWNrRm9ybWF0KCBjdXN0b21UaW1lRm9ybWF0IClcblxuICByZXR1cm4gZnVuY3Rpb24oIG1lICkge1xuICAgIG1lLmFwcGVuZCgnZGVmcycpLmFwcGVuZCgnY2xpcFBhdGgnKVxuICAgICAgLmF0dHIoJ2lkJywgJ2NsaXAnKVxuICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICsgbWFyZ2luLmJvdHRvbSlcblxuICAgIGNvbnRleHQgPSBtZS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NvbnRleHQnKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywnICsgbWFyZ2luLnRvcCArICcpJylcbiAgICAgIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCNjbGlwKScpXG5cbiAgICB4YXggPSBjb250ZXh0LmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIGhlaWdodCArICcpJylcblxuICAgIGJydXNoID0gZDMuc3ZnLmJydXNoKClcbiAgICAgIC54KHgpXG4gICAgICAub24oJ2JydXNoJywgYnJ1c2hNb3ZlIClcbiAgICAgIC5vbignYnJ1c2hlbmQnLCBicnVzaEVuZCApXG5cbiAgICBicnVzaHJlY3QgPSBjb250ZXh0LmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnYnJ1c2gnKVxuICAgICAgLmNhbGwoYnJ1c2gpXG4gICAgICAuc2VsZWN0QWxsKCdyZWN0JylcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG5cbiAgICB0b29sdGlwID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAuYXR0cignaWQnLCAndG9vbHRpcCcpXG4gICAgICAuYXR0cignY2xhc3MnLCAnaGlkZGVuJylcblxuICAgIG1lLmF0dHIoJ2NsYXNzJywgJ2hpZGRlbicpXG4gIH1cbn1cblxudmFyIHVwZGF0ZUNoYXJ0ID0gZnVuY3Rpb24oIHByb3BzICkge1xuICB2YXIgZnJvbSA9IFF1ZXJ5LmdldCgnZnJvbScpXG4gIHZhciB0byA9IFF1ZXJ5LmdldCgndG8nKVxuICB2YXIgcmVzcG9uc2VEYXRhID0gbW9kZWxzLnJlc3BvbnNlZGF0YS5nZXREYXRlcyggZnJvbSwgdG8gKVxuICB2YXIgZGF0YSA9IHJlc3BvbnNlRGF0YS5kYXRhXG4gIHByZWNpc2lvbiA9IHJlc3BvbnNlRGF0YS5wcmVjaXNpb25cblxuICAvLyBSZW1vdmUgYmFyZ3JvdXBzIG9uIGVhY2ggcmVwYWludFxuICBkMy5zZWxlY3RBbGwoJy5iYXJzJykucmVtb3ZlKClcblxuICByZXR1cm4gKCBkYXRhICYmIGRhdGEubGVuZ3RoICkgPyBmdW5jdGlvbihtZSkge1xuXG4gICAgdmFyIHhEb21haW4gPSBkMy5leHRlbnQoZGF0YS5tYXAoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50ZXJtIH0pKVxuXG4gICAgLy8gVXNlIGRvbWFpbiBmb3IgZnJvbSBhbmQgdG8gdmFsdWVzIGlmIHRoZXkgZG9uJ3QgZXhpc3QgaW4gdGhlIHF1ZXJ5IHN0cmluZ1xuICAgIC8vIEluIGVpdGhlciBjYXNlLCB3ZSB1c2UgbW9tZW50IHRvIHJldHVybiBzdGFydE9mL2VuZE9mIGJhc2VkIG9uIHByZWNpc2lvblxuICAgIGlmICggZnJvbSAmJiB0bykge1xuICAgICAgZnJvbSA9IG1vbWVudCggZnJvbSApLnN0YXJ0T2YoIHByZWNpc2lvbiApLnRvRGF0ZSgpXG4gICAgICB0byA9IG1vbWVudCggdG8gKS5lbmRPZiggcHJlY2lzaW9uICkudG9EYXRlKClcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbSA9IG1vbWVudCggeERvbWFpblswXSApLnN0YXJ0T2YoIHByZWNpc2lvbiApLnRvRGF0ZSgpXG4gICAgICB0byA9IG1vbWVudCggeERvbWFpblsxXSApLmVuZE9mKCBwcmVjaXNpb24gKS50b0RhdGUoKVxuICAgIH1cbiAgXG4gICAgLy8gU2V0IGJhcldpZHRoIGFuZCBkb21haW4gYmFzZWQgb24gd2hhdCBwcmVjaXNpb24gd2UncmUgb25cbiAgICBkYXRlRGlmZiA9IG1vbWVudCggdG8gKS5kaWZmKCBmcm9tLCBwcmVjaXNpb24gKVxuICAgIGRhdGFsZW5ndGggPSBkYXRhLmxlbmd0aCB8fCAzMFxuXG4gICAgaWYgKCBwcmVjaXNpb24gPT0gJ2RheScgKSB7XG4gICAgICAvLyBOZXcgZnJvbSAyMDE0LTA5LTEwLCBhbHdheXMgdXNlIG1vbnRoIGxlbmd0aC4gV29ya3M/XG4gICAgICBkYXRhbGVuZ3RoID0gbW9tZW50KCBmcm9tICkuZGF5c0luTW9udGgoKVxuICAgICAgLy8gT24gZGF5IHZpZXcsIGFsd2F5cyBzaG93IGZ1bGwgbW9udGhcbiAgICAgIGJhcldpZHRoID0gKCB3aWR0aCAvIGRhdGFsZW5ndGggKSAtIDJcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUGFkIG9uZSBbcHJlY2lzaW9uXSB1bml0IGF0IGVuZCBvZiBvZiBzY2FsZVxuICAgICAgYmFyV2lkdGggPSBkYXRlRGlmZiA/IHdpZHRoIC8gKCBkYXRlRGlmZiArIDQgKSA6IHdpZHRoIC8gKGRhdGFsZW5ndGggKyA0KVxuICAgIH1cbiAgICAvLyBObyBuZWdhdGl2ZSBudW1iZXJzXG4gICAgYmFyV2lkdGggPSBNYXRoLmFicyggYmFyV2lkdGggKVxuICAgIFxuICAgIC8vIDIwMTQtMDktMTA6IFJlbW92ZSBwYWRkaW5nLCBzaG91bGQgYmUgc29sdmVkIGJ5IGVuc3VyZURhdGUoKSBpbiBtb2RlbHMuanNcbiAgICAvL3hEb21haW5bMV0gPSBtb21lbnQoIHhEb21haW5bMV0gKS5hZGQoIDEsIHByZWNpc2lvbiApLnRvRGF0ZSgpXG4gICAgXG4gICAgeC5kb21haW4oIHhEb21haW4gKVxuICAgIHkuZG9tYWluKCBbMCwgZDMubWF4KGRhdGEsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuY291bnQgfSldIClcbiAgICBcbiAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhIGJhcldpZHRoIGlmIGFsbCBlbHNlIGZhaWxzXG4gICAgYmFyV2lkdGggPSBiYXJXaWR0aCB8fCAxMFxuXG4gICAgLy8gU2V0IGNvbnRleHR1YWwgY2xhc3Mgb24geFhpYXNcbiAgICBkMy5zZWxlY3QoICcueC5heGlzJyApLmF0dHIoICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBiYXJXaWR0aCAvIDIgKyAnLCcgKyBoZWlnaHQgKyAnKScgKVxuXG4gICAgYmFyZ3JvdXAgPSBjb250ZXh0LmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ2JhcnMgJyArIHByZWNpc2lvbilcblxuICAgIGJhcnMgPSBiYXJncm91cC5zZWxlY3RBbGwoJy5iYXInKVxuICAgICAgLmRhdGEoIGRhdGEsIGZ1bmN0aW9uKGQpe3JldHVybiBkLnRlcm19IClcblxuICAgIHZhciBkYXRlUmFuZ2UgPSBtb21lbnQoKS5yYW5nZSggZnJvbSwgdG8gKVxuXG4gICAgYmFycy5lbnRlcigpXG4gICAgICAuYXBwZW5kKCAncmVjdCcgKVxuICAgICAgLmF0dHIoICd4JywgZnVuY3Rpb24oZCl7IHJldHVybiB4KGQudGVybSkgfSApXG4gICAgICAuYXR0ciggJ3knLCBmdW5jdGlvbihkKSB7IHJldHVybiB5KGQuY291bnQpIH0gKVxuICAgICAgLmF0dHIoICdoZWlnaHQnLCBmdW5jdGlvbihkKSB7IHJldHVybiBoZWlnaHQgLSB5KGQuY291bnQpIH0gKVxuICAgICAgLmF0dHIoICd3aWR0aCcsIGJhcldpZHRoIClcbiAgICAgIC5hdHRyKCAnZGF0YS1kYXRlJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50ZXJtIH0gKVxuICAgICAgLmF0dHIoICdkYXRhLWNvdW50JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5jb3VudCB9IClcbiAgICAgIC5hdHRyKCAnY2xhc3MnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIC8vIElmIHdlJ3JlIGRvd24gb24gYSBzaW5nbGUgZGF5LCBtYXJrIHRoYXQgZGF5XG4gICAgICAgIGlmICggbW9tZW50KCBkLnRlcm0gKS5pc1NhbWUoIGZyb20gKSAmJiBtb21lbnQoIGQudGVybSApLmlzU2FtZSggdG8gKSApIHtcbiAgICAgICAgICByZXR1cm4gJ2JhciBzZWxlY3RlZCAnICsgZC5wcmVjXG4gICAgICAgIH0gZWxzZSBpZiAoIG1vbWVudCggZC50ZXJtICkud2l0aGluKCBkYXRlUmFuZ2UgKSAmJiBwcmVjaXNpb24gPT0gJ2RheScgKSB7XG4gICAgICAgICAgcmV0dXJuICdiYXIgaW4tcmFuZ2UgJyArIGQucHJlY1xuICAgICAgICB9wqBlbHNlIHsgXG4gICAgICAgICAgcmV0dXJuICdiYXIgJyArIGQucHJlYyBcbiAgICAgICAgfVxuICAgICAgfSApXG4gICAgICAub24oICdjbGljaycsIGJhckNsaWNrIClcbiAgICAgIC5vbiggJ21vdXNlb3ZlcicsIGJhck92ZXIgKVxuICAgICAgLm9uKCAnbW91c2VvdXQnLCBiYXJPdXQgKVxuICAgICAgLm9uKCAnbW91c2Vtb3ZlJywgYmFyTW92ZSApXG5cbiAgICAvLyBUaGlzIGRvZXNuJ3QgZXZlbiBzZWVtIHRvIGhhcHBlbiwgYnV0IGtlZXAgaXQgZm9yIG5vd1xuICAgIGJhcnMuZXhpdCgpXG4gICAgICAub24oICdjbGljaycsIG51bGwgKVxuICAgICAgLm9uKCAnbW91c2VvdmVyJywgbnVsbCApXG4gICAgICAub24oICdtb3VzZW91dCcsIG51bGwgKVxuICAgICAgLm9uKCAnbW91c2Vtb3ZlJywgbnVsbCApXG4gICAgICAucmVtb3ZlKClcblxuICAgIG1lLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKVxuXG4gICAgeGF4LnRyYW5zaXRpb24oKS5kdXJhdGlvbig1MDApXG4gICAgIC5jYWxsKHhBeGlzKVxuXG4gIH0gOiBmdW5jdGlvbiggbWUgKXtcbiAgICBtZS5jbGFzc2VkKCdoaWRkZW4nLCB0cnVlKVxuICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICBkYXRlQ2hhbmdlVG9rZW46IG51bGwsXG4gIGRhdGVTZXRUb2tlbjogbnVsbCxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5kYXRlQ2hhbmdlVG9rZW4gPSBQdWJTdWIub24oICdkYXRlY2hhbmdlJywgdGhpcy5wcm9wcy5zZXREYXRlcyApXG4gICAgdGhpcy5kYXRlU2V0VG9rZW4gPSBQdWJTdWIub24oICdkYXRlc2V0JywgdGhpcy5wcm9wcy5maWx0ZXJPbkRhdGVzIClcblxuICAgIHZhciBub2RlID0gdGhpcy5nZXRET01Ob2RlKClcbiAgICBkMy5zZWxlY3QoIG5vZGUgKVxuICAgICAgLmNhbGwoIGNyZWF0ZUNoYXJ0KCB0aGlzLnByb3BzICkgKVxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBQdWJTdWIub2ZmKHRoaXMuZGF0ZUNoYW5nZVRva2VuKVxuICAgIFB1YlN1Yi5vZmYodGhpcy5kYXRlU2V0VG9rZW4pXG4gIH0sXG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiggcHJvcHMgKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLmdldERPTU5vZGUoKVxuICAgIGQzLnNlbGVjdCggbm9kZSApXG4gICAgICAuY2FsbCggdXBkYXRlQ2hhcnQoIHByb3BzICkgKVxuICAgIHJldHVybiBmYWxzZVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5zdmcoe3dpZHRoOiB0aGlzLnByb3BzLndpZHRoLCBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0fSlcbiAgICApXG4gIH1cbn0pXG4iLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3ZkZC9yb3V0ZXInKVxudmFyIFF1ZXJ5ID0gcmVxdWlyZSgndmRkL3F1ZXJ5JylcbnZhciBQaXdpayA9IHJlcXVpcmUoJ3ZkZC9waXdpaycpXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG5cbiAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCBlICkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGlmICggdGhpcy5wcm9wcy5oaXRzIDwgMSkgXG4gICAgICByZXR1cm5cblxuICAgIFBpd2lrLnRyYWNrQ2xpY2soJ05ld3NwYXBlcicsICdGaWx0ZXInLCB0aGlzLnByb3BzLmlzYWN0aXZlID8gJ1JlbW92ZScgOiAnQWRkJylcbiAgICBQaXdpay50cmFja0V2ZW50KCdOZXdzcGFwZXIgZmlsdGVyJywgdGhpcy5wcm9wcy5pc2FjdGl2ZSA/ICdSZW1vdmUnIDogJ0FkZCcsIHRoaXMucHJvcHMubmFtZSlcblxuICAgIHZhciBxdWVyeSA9ICF0aGlzLnByb3BzLmlzYWN0aXZlID8gdGhpcy5wcm9wcy5uYW1lIDogJydcblxuICAgIGlmICggcXVlcnkgKSB7XG4gICAgICBRdWVyeS5zZXQoIHsgbmV3c3BhcGVyOiBxdWVyeSB9ICkgICAgICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICBRdWVyeS5yZW1vdmUoJ25ld3NwYXBlcicpXG4gICAgfVxuXG4gICAgUm91dGVyLm5hdmlnYXRlKCcvJyArIFF1ZXJ5LmJ1aWxkKCksIHt0cmlnZ2VyOiB0cnVlfSlcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGNsYXNzZXNcbiAgICB2YXIgaWNvbnNcblxuICAgIGlmICggdGhpcy5wcm9wcy5oaXRzID4gMCkge1xuICAgICAgLy8gV2UgaGF2ZSBoaXRzIGZyb20gdGhpcyBuZXdzcGFwZXIsIG1ha2UgaXQgZmlsdGVyYWJsZVxuICAgICAgLy8gRmlyc3QgY2hlY2sgaWYgaXQncyBpbiB1c2UgYWxyZWFkeVxuICAgICAgaWYgKCB0aGlzLnByb3BzLmlzYWN0aXZlICkge1xuICAgICAgICAgIGNsYXNzZXMgPSAnYWN0aXZlJ1xuICAgICAgICAgIGljb25zID0gUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1taW51cy1jaXJjbGVcIn0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsYXNzZXMgPSAnJ1xuICAgICAgICAgIGljb25zID0gUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1wbHVzLWNpcmNsZVwifSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhc3NlcyA9ICdkaXNhYmxlZCdcbiAgICAgIGljb25zID0gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uYnV0dG9uKHtvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLCBjbGFzc05hbWU6IGNsYXNzZXMgfSwgXG4gICAgICAgICB0aGlzLnByb3BzLm5hbWUsIFwiIChcIiwgIHRoaXMucHJvcHMuaGl0cywgXCIpIFwiLCBpY29ucyBcbiAgICAgIClcbiAgICApXG5cbiAgfVxufSlcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG52YXIgUXVlcnkgPSByZXF1aXJlKCd2ZGQvcXVlcnknKVxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3ZkZC9yb3V0ZXInKVxudmFyIEJ1dHRvbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vYnV0dG9uJylcbi8vdmFyIHJlc3BvbnNlZGF0YSA9IHJlcXVpcmUoJ3ZkZC9tb2RlbHMnKS5yZXNwb25zZWRhdGFcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgIFF1ZXJ5LnJlbW92ZSgnbmV3c3BhcGVyJylcbiAgICBSb3V0ZXIubmF2aWdhdGUoJy8nICsgUXVlcnkuYnVpbGQoKSwge3RyaWdnZXI6IHRydWV9KVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5ld3NwYXBlcnMgPSB0aGlzLnByb3BzLmRpc3BsYXlEYXRhIHx8IFtdXG4gICAgdmFyIGlzQWN0aXZlXG4gICAgdmFyIHF1ZXJ5ID0gZGVjb2RlVVJJQ29tcG9uZW50KCBRdWVyeS5nZXQoJ25ld3NwYXBlcicpIClcbiAgICB2YXIgYnV0dG9ucyA9IG5ld3NwYXBlcnMubWFwKGZ1bmN0aW9uKCBuZXdzcGFwZXIsIGluZGV4ICkge1xuICAgICAgaXNBY3RpdmUgPSBuZXdzcGFwZXIudGVybSA9PT0gcXVlcnlcbiAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBzaG93IDEwIG5ld3NwYXBlcnMgdG9wcywgZGVhbCB3aXRoIGZ1bGwgbGlzdCBlbHNld2hlcmVcbiAgICAgIHJldHVybiAoIGluZGV4IDwgMTAgKSA/IEJ1dHRvbkNvbXBvbmVudCh7a2V5OiBpbmRleCwgbmFtZTogIG5ld3NwYXBlci50ZXJtLCBoaXRzOiAgbmV3c3BhcGVyLmNvdW50LCBpc2FjdGl2ZTogaXNBY3RpdmUgfSkgOiBudWxsXG4gICAgfSwgdGhpcylcblxuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiZmlsdGVyIG5ld3NwYXBlclwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJidXR0b25zXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHtvbkNsaWNrOiB0aGlzLnJlc2V0LCBjbGFzc05hbWU6ICBxdWVyeSA/ICcnIDogJ2FjdGl2ZSd9LCBcIkFsbGEgdGlkbmluZ2FyXCIpLCBcbiAgICAgICAgICBidXR0b25zIFxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICB9XG59KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG52YXIgUXVlcnkgPSByZXF1aXJlKCd2ZGQvcXVlcnknKVxudmFyIFZERCA9IHJlcXVpcmUoJ3ZkZC92ZGQnKVxudmFyIFBhbiA9IHJlcXVpcmUoJ3ZkZC9wYW4nKVxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3ZkZC9yb3V0ZXInKVxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKVxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJylcbnZhciBtb2RlbHMgPSByZXF1aXJlKCd2ZGQvbW9kZWxzJylcbnZhciBQaXdpayA9IHJlcXVpcmUoJ3ZkZC9waXdpaycpXG5cbnZhciB0aW1lciA9IDBcblxudmFyIElNQUdFU0laRSA9IDUxMiAvLyBhZGp1c3QgdGhpcyBmb3IgbGFyZ2VyIHRodW1ibmFpbCBpbWFnZXNcbnZhciBNT1ZFID0gMTUwIC8vIHBpeGVscyB0byBtb3ZlIGZvciBlYWNoIGtleSBjb21tYW5kXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geyBsb2FkaW5nOiBmYWxzZSB9XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZXM6IFtdLFxuICAgICAgc2V0UGFnZU51bWJlcjogZnVuY3Rpb24oKXt9XG4gICAgfVxuICB9LFxuXG4gIG5leHRIYW5kbGVyOiBmdW5jdGlvbihlKSB7XG4gICAgZSAmJiBlLnByZXZlbnREZWZhdWx0KClcbiAgICB2YXIgcGFnZXMgPSBtb2RlbHMuZGV0YWlsLmdldElzc3VlTGlzdCgpXG4gICAgaWYgKCB0aGlzLnByb3BzLnBhZ2VOdW1iZXIgPCBwYWdlcy5sZW5ndGgtMSApIHtcbiAgICAgIHRoaXMucHJvcHMuc2V0UGFnZU51bWJlciggdGhpcy5wcm9wcy5wYWdlTnVtYmVyKzEgKVxuICAgICAgXG4gICAgfVxuICAgIFBpd2lrLnRyYWNrQ2xpY2soJ0dhbGxlcnknLCAnUGFnaW5hdGlvbjogTmV4dCcpXG4gIH0sXG5cbiAgcHJldkhhbmRsZXI6IGZ1bmN0aW9uKGUpIHtcbiAgICBlICYmIGUucHJldmVudERlZmF1bHQoKVxuICAgIGlmICggdGhpcy5wcm9wcy5wYWdlTnVtYmVyICkge1xuICAgICAgdGhpcy5wcm9wcy5zZXRQYWdlTnVtYmVyKCB0aGlzLnByb3BzLnBhZ2VOdW1iZXItMSApXG4gICAgfVxuICAgIFBpd2lrLnRyYWNrQ2xpY2soJ0dhbGxlcnknLCAnUGFnaW5hdGlvbjogUHJldmlvdXMnKVxuICB9LFxuXG4gIGltYWdlQ2xpY2tIYW5kbGVyOiBmdW5jdGlvbihlKSB7XG5cbiAgICB2YXIgJGltZyA9ICQoZS5jdXJyZW50VGFyZ2V0KSBcbiAgICB2YXIgcG9zID0gJGltZy5vZmZzZXQoKVxuXG4gICAgdGhpcy56b29tKFxuICAgICAgKGUucGFnZVggLSBwb3MubGVmdCkgLyAkaW1nLndpZHRoKCksIFxuICAgICAgKGUucGFnZVkgLSBwb3MudG9wKSAvICRpbWcuaGVpZ2h0KClcbiAgICApXG4gICAgUGl3aWsudHJhY2tDbGljaygnR2FsbGVyeScsICdJbWFnZScpXG4gIH0sXG5cbiAgem9vbTogZnVuY3Rpb24oeCwgeSkge1xuICAgIFZERC56b29tKHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5LFxuICAgICAgaGlnaGxpZ2h0czogdGhpcy5wcm9wcy5oaWdobGlnaHRzLFxuICAgICAgcGFnZU51bWJlcjogdGhpcy5wcm9wcy5wYWdlTnVtYmVyXG4gICAgfSlcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIC8vdGhpcy56b29tKDEwMCwxMDApXG4gICAgfS5iaW5kKHRoaXMpLCAxNTAwKVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc2l6ZSA9ICdtaW5pJ1xuICAgIHZhciBwYWdlcyA9IG1vZGVscy5kZXRhaWwuZ2V0SXNzdWVMaXN0KClcbiAgICB2YXIgaW1hZ2UgPSBwYWdlc1sgdGhpcy5wcm9wcy5wYWdlTnVtYmVyIF1cbiAgICB2YXIgaW1nXG4gICAgdmFyIGhpZ2hsaWdodFxuICAgIHZhciB3ID0gMFxuICAgIHZhciBoID0gMFxuICAgIHZhciBpc1N2ZyA9IGZhbHNlXG4gICAgXG4gICAgaWYgKCBpbWFnZSApIHtcbiAgICAgIGlmICggd2luZG93LkhPTUUgKVxuICAgICAgICBpc1N2ZyA9IGZhbHNlXG4gICAgICBlbHNlXG4gICAgICAgIGlzU3ZnID0gIWltYWdlLmNvcHlyaWdodF9mcmVlXG4gICAgICB2YXIgc3JjID0gVkRELmltZ0hhY2soaW1hZ2UuX3NvdXJjZVsnQGlkJ10rJ190aHVtYi4nICsgKGlzU3ZnID8gJ3N2ZycgOiAnanBnJykpXG4gICAgICB2YXIgaW0gPSB7XG4gICAgICAgIHN0eWxlOiB7IGJhY2tncm91bmRJbWFnZTogJ3VybCgnK3NyYysnKScgfSxcbiAgICAgICAga2V5OiArbmV3IERhdGUoKSxcbiAgICAgICAgcmVmOiAnaW1hZ2UnXG4gICAgICB9XG4gICAgICBpZiAoICFpc1N2ZyApXG4gICAgICAgIGltLm9uQ2xpY2sgPSB0aGlzLmltYWdlQ2xpY2tIYW5kbGVyXG4gICAgICBpbWcgPSBSZWFjdC5ET00uZGl2KGltKVxuICAgIH1cblxuICAgIHZhciBwcmV2Y2xhc3MgPSB0aGlzLnByb3BzLnBhZ2VOdW1iZXIgPT09IDAgPyAnIGRpc2FibGVkJyA6ICcnXG4gICAgdmFyIG5leHRjbGFzcyA9IHRoaXMucHJvcHMucGFnZU51bWJlciA9PT0gcGFnZXMubGVuZ3RoLTEgPyAnIGRpc2FibGVkJyA6ICcnXG5cbiAgICB2YXIgYmFubmVyXG4gICAgaWYgKCBpc1N2ZyApIHtcbiAgICAgIGJhbm5lciA9IChcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImJhbm5lclwifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBcIlVwcGhvdnNyw6R0dHNza3lkZGF0IG1hdGVyaWFsLCBrYW4gZW5kYXN0IGzDpHNhcyBkaWdpdGFsdCBww6UgS3VuZ2wuIGJpYmxpb3Rla2V0LlwiKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS11bml2ZXJzaXR5XCJ9KVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgdmFyIGhsID0gdGhpcy5wcm9wcy5oaWdobGlnaHRzW3RoaXMucHJvcHMucGFnZU51bWJlcl1cblxuICAgIGlmICggaGwgJiYgaGwubGVuZ3RoICkge1xuICAgICAgdmFyIHNyYyA9IFZERC5pbWdIYWNrKGltYWdlLl9zb3VyY2VbJ0BpZCddKVxuICAgICAgdmFyIGltID0ge1xuICAgICAgICBzdHlsZTogeyBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJytzcmMrJ19oaXRzLnN2Zz9oPScrZW5jb2RlVVJJQ29tcG9uZW50KGhsLmpvaW4oJywnKSkrJyknIH0sXG4gICAgICAgIGNsYXNzTmFtZTogJ2hsJyxcbiAgICAgICAgcmVmOiAnaGlnaGxpZ2h0J1xuICAgICAgfVxuICAgICAgaWYgKCAhaXNTdmcgKVxuICAgICAgICBpbS5vbkNsaWNrID0gdGhpcy5pbWFnZUNsaWNrSGFuZGxlclxuICAgICAgaGlnaGxpZ2h0ID0gUmVhY3QuRE9NLmRpdihpbSlcbiAgICB9XG5cbiAgICAvLyBhZGp1c3QgaW1hZ2Ugc2l6ZVxuICAgIGlmICggdGhpcy5wcm9wcy5yYXRpbyApIHtcbiAgICAgIGggPSB0aGlzLnByb3BzLmNhbGNIZWlnaHQgLSAxMDBcbiAgICAgIHcgPSBoKnRoaXMucHJvcHMucmF0aW9cbiAgICAgIHZhciBuciA9IE1hdGgubWluKElNQUdFU0laRS93LElNQUdFU0laRS9oKVxuICAgICAgaWYgKCBuciA8IDEgKSB7XG4gICAgICAgIGggKj0gbnJcbiAgICAgICAgdyAqPSBuclxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIGhpZ2hsaWdodCApXG4gICAgICBoaWdobGlnaHQgPSBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiaGlnaGxpZ2h0XCJ9LCBoaWdobGlnaHQpXG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogJ2dpbWFnZScgKyAoaXNTdmcgPyAnIHN2Zyc6ICcnKSwgc3R5bGU6IHt3aWR0aDp3LGhlaWdodDpofX0sIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiaW1hZ2VcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwic3Bpbm5lciBsaWdodFwifSksIFxuICAgICAgICAgIGltZ1xuICAgICAgICApLCBcbiAgICAgICAgaGlnaGxpZ2h0LCBcbiAgICAgICAgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJsZWZ0IGZhIGZhLWFuZ2xlLWxlZnRcIitwcmV2Y2xhc3MsIG9uQ2xpY2s6IHRoaXMucHJldkhhbmRsZXJ9KSwgXG4gICAgICAgIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwicmlnaHQgZmEgZmEtYW5nbGUtcmlnaHRcIituZXh0Y2xhc3MsIG9uQ2xpY2s6IHRoaXMubmV4dEhhbmRsZXJ9KSwgXG4gICAgICAgIGJhbm5lclxuICAgICAgKVxuICAgIClcbiAgfVxufSlcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG52YXIgU2VhcmNoQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9zZWFyY2gnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ2V4cG9ydHMnLFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgdmFyIGxhdGVzdCA9IFJlYWN0LkRPTS5wKG51bGwsIFwiQW5kcmFzIHPDtmtuaW5nYXIgw6RyIGludGUgdGlsbGfDpG5nbGlndCB1bmRlciBiZXRhLXBlcmlvZGVuLlwiKVxuICAgIHZhciBzZWFyY2hlcyA9IG51bGxcbiAgICB2YXIgdGVtcFNlYXJjaGVzID0gW1xuICAgICAgeyB0ZXh0OiAnT2xvZiBQYWxtZScsIGRlc2M6ICdWYWQgc2tyZXYgdGlkbmluZ2FybmEgb20gT2xvZiBQYWxtZSAxOTg2PycsIHVybDogJy8/cT1vbG9mfjElMjBwYWxtZX4xJyB9LCAvLyAmZnJvbT0xOTg1LTEyLTI1JnRvPTE5ODYtMTItMjRcbiAgICAgIHsgdGV4dDogJ0t1bmdsaWd0IGJyw7ZsbG9wJywgZGVzYzogJ0h1ciBoYXIga3VuZ2xpZ2EgYnLDtmxsb3Agc2tpbGRyYXRzIGdlbm9tIHRpZGVybmE/JywgdXJsOiAnLz9xPWt1bmdsaWd0fjElMjBiciVDMyVCNmxsb3B+MScgfSxcbiAgICAgIHsgdGV4dDogJ0t2aW5ubGlnIHLDtnN0csOkdHQnLCBkZXNjOiAnVmFkIGhhciBza3Jpdml0cyBvbSBrdmlubmxpZyByw7ZzdHLDpHR0PycsIHVybDogJy8/cT1yJUMzJUI2c3RyJUMzJUE0dHR+MSUyMGt2aW5ubGlnJyB9LCAvLyAmZnJvbT0xODk5LTEyLTI2JnRvPTE5MzAtMDEtMjRcbiAgICAgIHsgdGV4dDogJ1bDpHJsZHN1dHN0w6RsbG5pbmcnLCBkZXNjOiAnVmFkIGhhciBza3Jpdml0cyBvbSBvbGlrYSB2w6RybGRzdXRzdMOkbGxuaW5nYXI/JywgdXJsOiAnLz9xPVYlQzMlQTRybGRzdXRzdCVDMyVBNGxsbmluZyonIH0sXG4gICAgICB7IHRleHQ6ICdUc3VuYW1pJywgZGVzYzogJ1ZhZCBoYXIgc2tyaXZpdHMgb20gdHN1bmFtaXM/JywgdXJsOiAnLz9xPXRzdW5hbWknIH0sIC8vICZmcm9tPTE5NjktMDEtMDEmdG89MjAwNC0wNy0xNlxuICAgICAgeyB0ZXh0OiAnVGhlIEJlYXRsZXMnLCBkZXNjOiAnIFZhZCBza3JldiB0aWRuaW5nYXJuYSBvbSBUaGUgQmVhdGxlcz8nLCB1cmw6ICcvP3E9YmVhdGxlc34yJTIwc3ZlcmlnZX4yJyB9LCAvLyAmZnJvbT0xOTYyLTEyLTMwJnRvPTE5NjMtMTItMzFcbiAgICAgIHsgdGV4dDogJ01lbG9kaWZlc3RpdmFsJywgZGVzYzogJ1ZhZCBza3JldnMgb20gbWVsb2RpZmVzdGl2YWxlbj8nLCB1cmw6ICcvP3E9TWVsb2RpZmVzdGl2YWwqJyB9LCAvLyAmZnJvbT0xOTgzLTEyLTI1JnRvPTE5ODUtMDEtMTBcbiAgICAgIHsgdGV4dDogJ0Fmc2VnbGEnLCBkZXNjOiAnQWZzZWdsYScsIHVybDogJy8/cT1hZnNlZ2xhJyB9LFxuICAgICAgeyB0ZXh0OiAnUXZpbm5hJywgZGVzYzogJ1F2aW5uYScsIHVybDogJy8/cT1xdmlubmEnIH0sXG4gICAgICB7IHRleHQ6ICdZLWZyb250JywgZGVzYzogJ1ktZnJvbnQnLCB1cmw6ICcvP3E9JTIyeS1mcm9udCUyMicgfSBdXG5cbiAgICBzZWFyY2hlcyAgPSB0ZW1wU2VhcmNoZXMubWFwKGZ1bmN0aW9uKCBzZWFyY2gsIGluZGV4ICkge1xuICAgICAgcmV0dXJuIFJlYWN0LkRPTS5idXR0b24oe29uQ2xpY2s6IHNlbGYucHJvcHMuZ29Ub1NlYXJjaCwgY2xhc3NOYW1lOiBcInNlYXJjaGVzXCIsIGtleTogc2VhcmNoLnVybCwgJ2RhdGEtdXJsJzogc2VhcmNoLnVybH0sIHNlYXJjaC50ZXh0Lyo8aSBjbGFzc05hbWU9XCJmYSBmYS1zdGFyXCIgLz4qLylcbiAgICB9KVxuXG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2lkOiBcInByaW1hcnlcIn0sIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtpZDogXCJoZWFkXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiaW50cm9kdWN0aW9uXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5pbWcoe3NyYzogXCIvc3RhdGljL2kvcmVhZGVyLnN2Z1wiLCB3aWR0aDogXCI0MFwiLCBoZWlnaHQ6IFwiMzBcIn0pLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5oMShudWxsLCBcIlPDtmsgYmxhbmQgc3ZlbnNrYSBkYWdzdGlkbmluZ2FyXCIpLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiSSBiZXRhdmVyc2lvbmVuIGthbiBkdSBzw7ZrYSBpIFN2ZW5za2EgRGFnYmxhZGV0IG9jaCBBZnRvbmJsYWRldCBmcsOlbiBzdGFydCB0aWxsIG51dGlkLiBIZWx0IGZyaXR0IG1hdGVyaWFsIGZpbm5zIGZyYW0gdGlsbCAxODYzLlwiKVxuICAgICAgICAgICksIFxuICAgICAgICAgIFNlYXJjaENvbXBvbmVudChudWxsKVxuICAgICAgICApLCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7aWQ6IFwic3VnZ2VzdGlvbnNcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJpbm5lclwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiY29sIGxhdGVzdFwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uaDIobnVsbCwgXCJTZW5hc3RlIHPDtmtuaW5nYXJcIiksIFxuICAgICAgICAgICAgbGF0ZXN0XG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJ3aWRlIGNvbCBzZWFyY2hlc1wifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uaDIobnVsbCwgXCJIw6RuZGVsc2VyIGkgcHJlc3NlblwiKSwgXG4gICAgICAgICAgICBzZWFyY2hlc1xuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2lkOiBcImNvbG9waG9uXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiaW5uZXJcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImNvbCBoZWxwXCJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImhlYWRlclwifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1zdGFyXCJ9KSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmgxKG51bGwsIFwiU3BhcmEgZGluYSBzw7ZrbmluZ2FyXCIpXG4gICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIkR1IGthbiBsb2dnYSBpbiBvY2ggc3BhcmEgZGluYSBzw7ZrbmluZ2FyIHPDpSBkdSBrYW4gc2UgZGVtIGhvcyBvc3MgcMOlIEt1bmdsLiBiaWJsaW90ZWtldFwiKVxuICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiY29sIGNvcHlyaWdodFwifSwgXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJoZWFkZXJcIn0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtaW5zdGl0dXRpb25cIn0pLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uaDEobnVsbCwgXCJVcHBob3ZzcsOkdHRcIilcbiAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiTWF0ZXJpYWwgcHVibGljZXJhdCBzZW5hcmUgw6RuIDE1MCDDpXIgw6RyIHVwcGhvdnNyw6R0dHNza3lkZGF0IG9jaCBrYW4gZW5kYXN0IGzDpHNhcyBpIHNpbiBoZWxoZXQgcMOlIEt1bmdsLiBiaWJsaW90ZWtldC5cIilcbiAgICAgICAgICAgICksIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImNvbCBsb2dvXCJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImhlYWRlclwifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmltZyh7c3JjOiBcIi9zdGF0aWMvaS9rYi1ncmV5LnN2Z1wiLCB3aWR0aDogXCI4MFwiLCBoZWlnaHQ6IFwiODBcIn0pXG4gICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIkh1bWxlZ8OlcmRzZ2F0YW4gMjYsXCIsIFJlYWN0LkRPTS5icihudWxsKSwgXG4gICAgICAgICAgICAgIFwiSHVtbGVnw6VyZGVuLCBTdG9ja2hvbG1cIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG5cbiAgfVxufSlcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG52YXIgbW9kZWxzID0gcmVxdWlyZSgndmRkL21vZGVscycpXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpXG52YXIgUGl3aWsgPSByZXF1aXJlKCd2ZGQvcGl3aWsnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ2V4cG9ydHMnLFxuXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZ2lzdGVyRXJyb3I6ICcnLFxuICAgICAgbG9naW5FcnJvcjogJycsXG4gICAgICBmb3Jnb3RFcnJvcjogJycsXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGZvcmdvdDogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgbG9naW46IGZ1bmN0aW9uKCkge1xuICAgIFBpd2lrLnRyYWNrRXZlbnQoJ0xvZ2luJywgJ0F0dGVtcHQnKVxuICAgIG1vZGVscy51c2VyLmxvZ2luKFxuICAgICAgdGhpcy5yZWZzLmxvZ2luX3VzZXIuZ2V0RE9NTm9kZSgpLnZhbHVlLFxuICAgICAgdGhpcy5yZWZzLmxvZ2luX3Bhc3MuZ2V0RE9NTm9kZSgpLnZhbHVlLFxuICAgICAgdGhpcy5yZWZzLnJlbWVtYmVyLmdldERPTU5vZGUoKS5jaGVja2VkLFxuICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIFBpd2lrLnRyYWNrRXZlbnQoJ0xvZ2luJywgJ1N1Y2Nlc3NmdWwnKVxuICAgICAgICB2YXIgbXNnID0gJ0R1IGhhciBsb2dnYXQgaW4gc29tICcrbW9kZWxzLnVzZXIuZ2V0KCd1c2VybmFtZScpICsgJy4gJ1xuICAgICAgICBpZih0aGlzLnByb3BzLmFkZGZhdilcbiAgICAgICAgICBtc2cgKz0gJ0RpbiBmYXZvcml0bcOkcmtuaW5nIGhhciBzcGFyYXRzLidcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgc3VjY2VzczogbXNnXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKClcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGZ1bmN0aW9uKG1zZykge1xuICAgICAgICBQaXdpay50cmFja0V2ZW50KCdMb2dpbicsICdGYWlsZWQnLCBtc2cpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGxvZ2luRXJyb3I6IG1zZyxcbiAgICAgICAgICByZWdpc3RlckVycm9yOiAnJ1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLnByb3BzLm9uRmFpbChtc2cpXG4gICAgICB9LmJpbmQodGhpcylcbiAgICApXG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc3VjY2VzczogZmFsc2UgfSlcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcy5nZXRET01Ob2RlKCkpLmZpbmQoJ2lucHV0OmZpcnN0JykuZm9jdXMoKVxuICAgIH0uYmluZCh0aGlzKSwgNClcbiAgfSxcblxuICBiYWNrVG9Mb2dpbjogZnVuY3Rpb24oKSB7XG4gICAgUGl3aWsudHJhY2tDbGljaygnR290bycsICdMb2dpbicpXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBmb3Jnb3Q6IGZhbHNlLFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICByZWdpc3RlckVycm9yOiAnJyxcbiAgICAgIGZvcmdvdEVycm9yOiAnJyxcbiAgICAgIGxvZ2luRXJyb3I6ICcnXG4gICAgfSlcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzLmdldERPTU5vZGUoKSkuZmluZCgnaW5wdXQ6Zmlyc3QnKS5mb2N1cygpXG4gICAgfS5iaW5kKHRoaXMpLCA0KVxuICB9LFxuXG4gIHJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcbiAgICBQaXdpay50cmFja0V2ZW50KCdSZWdpc3RlcicsICdBdHRlbXB0JylcbiAgICB2YXIgcGFzcyA9IHRoaXMucmVmcy5yZWdfcGFzcy5nZXRET01Ob2RlKCkudmFsdWVcbiAgICB2YXIgcmVwZWF0ID0gdGhpcy5yZWZzLnJlZ19wYXNzX3JlcGVhdC5nZXRET01Ob2RlKCkudmFsdWVcbiAgICBpZiAoIHBhc3MgIT09IHJlcGVhdCApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICByZWdpc3RlckVycm9yOiAnRGluYSBsw7ZzZW5vcmQgbWF0Y2hhciBpbnRlJyxcbiAgICAgICAgbG9naW5FcnJvcjogJydcbiAgICAgIH0pXG4gICAgICB0aGlzLnJlZnMucmVnX3Bhc3MuZ2V0RE9NTm9kZSgpLmZvY3VzKClcbiAgICAgIFBpd2lrLnRyYWNrRXZlbnQoJ1JlZ2lzdGVyJywgJ0ZhaWxlZCcsICdEaW5hIGzDtnNlbm9yZCBtYXRjaGFyIGludGUnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIFBpd2lrLnRyYWNrRXZlbnQoJ1JlZ2lzdGVyJywgJ1N1Y2Nlc3NmdWwnKVxuICAgIG1vZGVscy51c2VyLnJlZ2lzdGVyKFxuICAgICAgdGhpcy5yZWZzLnJlZ191c2VyLmdldERPTU5vZGUoKS52YWx1ZSxcbiAgICAgIHBhc3MsXG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9ICdSZWdpc3RyZXJpbmdlbiDDpHIga2xhciBvY2ggZHUgw6RyIG51IGlubG9nZ2FkLiAnXG4gICAgICAgIGlmKHRoaXMucHJvcHMuYWRkZmF2KVxuICAgICAgICAgIG1zZyArPSAnRGluIGZhdm9yaXRtw6Rya25pbmcgaGFyIHNwYXJhdHMuJ1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBzdWNjZXNzOiBtc2dcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Y2Nlc3MoKVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZnVuY3Rpb24obXNnKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHJlZ2lzdGVyRXJyb3I6IG1zZyxcbiAgICAgICAgICBsb2dpbkVycm9yOiAnJ1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLnByb3BzLm9uRmFpbChtc2cpXG4gICAgICB9LmJpbmQodGhpcylcbiAgICApXG4gIH0sXG5cbiAgZm9yZ290OiBmdW5jdGlvbigpIHtcbiAgICBQaXdpay50cmFja0NsaWNrKCdGb3Jnb3QnLCAnQWNjb3VudCcpXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGZvcmdvdDogdHJ1ZSxcbiAgICAgIGZvcmdvdEVycm9yOiAnJ1xuICAgIH0pXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucmVmcy5mb3Jnb3RfdXNlci5nZXRET01Ob2RlKCkuZm9jdXMoKVxuICAgIH0uYmluZCh0aGlzKSwgMTApXG4gIH0sXG5cbiAgZm9yZ290UGFzczogZnVuY3Rpb24oKSB7XG4gICAgUGl3aWsudHJhY2tDbGljaygnRm9yZ290JywgJ1Bhc3N3b3JkJylcbiAgICB2YXIgbm9kZSA9IHRoaXMucmVmcy5mb3Jnb3RfdXNlci5nZXRET01Ob2RlKClcbiAgICBpZiAoICFub2RlLnZhbHVlICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGZvcmdvdEVycm9yOiAnRHUgbcOlc3RlIGZ5bGxhIGkgZW4gZS1wb3N0YWRyZXNzLidcbiAgICAgIH0pXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBub2RlLmZvY3VzKClcbiAgICAgIH0sNClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBtb2RlbHMudXNlci5mb3Jnb3QoXG4gICAgICBub2RlLnZhbHVlLFxuICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSAnVmkgaGFyIHNraWNrYXQgaW5zdHJ1a3Rpb25lciB0aWxsICcrIG5vZGUudmFsdWUgKyAnLiAnXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHN1Y2Nlc3M6IG1zZyxcbiAgICAgICAgICBmb3Jnb3Q6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKClcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGZ1bmN0aW9uKG1zZykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBmb3Jnb3RFcnJvcjogbXNnXG4gICAgICAgIH0pXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbm9kZS5mb2N1cygpXG4gICAgICAgIH0sNClcbiAgICAgICAgdGhpcy5wcm9wcy5vbkZhaWwobXNnKVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKVxuICB9LFxuICBcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVnaXN0ZXJFcnJvciA9IHRoaXMuc3RhdGUucmVnaXN0ZXJFcnJvciA/XG4gICAgICBSZWFjdC5ET00ucCh7Y2xhc3NOYW1lOiBcImVycm9yXCJ9LCB0aGlzLnN0YXRlLnJlZ2lzdGVyRXJyb3IpIDpcbiAgICAgIG51bGxcblxuICAgIHZhciBsb2dpbkVycm9yID0gdGhpcy5zdGF0ZS5sb2dpbkVycm9yID9cbiAgICAgIFJlYWN0LkRPTS5wKHtjbGFzc05hbWU6IFwiZXJyb3JcIn0sIHRoaXMuc3RhdGUubG9naW5FcnJvcikgOlxuICAgICAgbnVsbFxuXG4gICAgaWYgKHRoaXMuc3RhdGUuc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImxvZ2luXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiYmFyXCJ9KSwgXG4gICAgICAgICAgUmVhY3QuRE9NLnAoe2NsYXNzTmFtZTogXCJzdWNjZXNzXCJ9LCB0aGlzLnN0YXRlLnN1Y2Nlc3MpLCBcbiAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHtjbGFzc05hbWU6IFwiY2xvc2UgYnRuXCIsIG9uQ2xpY2s6IHRoaXMucHJvcHMuY2xvc2VNb2RhbH0sIFwiU3TDpG5nIGbDtm5zdHJldFwiKVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUuZm9yZ290KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwibG9naW5cIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJiYXJcIn0pLCBcbiAgICAgICAgICBSZWFjdC5ET00ucCh7Y2xhc3NOYW1lOiBcInN1Y2Nlc3NcIn0sIFwiQW5nZSBkaW4gZXBvc3Qgc8OlIHNraWNrYXIgdmkgaW5zdHJ1a3Rpb25lciBvbSBodXIgZHUgw6V0ZXJzdMOkbGxlciBkaXR0IGzDtnNlbm9yZC5cIiksIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJmb3Jtc1wifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiaW5saW5lXCJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKG51bGwsIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5zcGFuKG51bGwsIFwiRS1wb3N0IChhbnbDpG5kYXJuYW1uKVwiKSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KHt0eXBlOiBcInRleHRcIiwgcmVmOiBcImZvcmdvdF91c2VyXCJ9KVxuICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7Y2xhc3NOYW1lOiBcImNsb3NlIGJ0blwiLCBvbkNsaWNrOiB0aGlzLmZvcmdvdFBhc3N9LCBcIlNraWNrYVwiKSwgXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5hKHtjbGFzc05hbWU6IFwiY2FuY2VsXCIsIGhyZWY6IFwiI1wiLCBvbkNsaWNrOiB0aGlzLmJhY2tUb0xvZ2lufSwgXCJBdmJyeXRcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLCBcbiAgICAgICAgICBSZWFjdC5ET00ucCh7Y2xhc3NOYW1lOiBcImVycm9yXCJ9LCB0aGlzLnN0YXRlLmZvcmdvdEVycm9yKVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJsb2dpblwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJiYXJcIn0pLCBcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1zdGFyXCJ9KSwgXCIgRsO2ciBhdHQga3VubmEgZmF2b3JpdG3DpHJrYSBtw6VzdGUgZHUgbG9nZ2EgaW4gaG9zIG9zcy4gT20gZHUgaW50ZSBoYXIgZXR0IGtvbnRvIGthbiBkdSBza2FwYSBldHQgaMOkci5cIiksIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiZm9ybXNcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJyZWdcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKG51bGwsIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uc3BhbihudWxsLCBcIkUtcG9zdCAoYW52w6RuZGFybmFtbilcIiksIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uaW5wdXQoe3R5cGU6IFwidGV4dFwiLCByZWY6IFwicmVnX3VzZXJcIn0pXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbChudWxsLCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLnNwYW4obnVsbCwgXCJMw7ZzZW5vcmRcIiksIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uaW5wdXQoe3R5cGU6IFwicGFzc3dvcmRcIiwgcmVmOiBcInJlZ19wYXNzXCJ9KVxuICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICBSZWFjdC5ET00ubGFiZWwobnVsbCwgXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5zcGFuKG51bGwsIFwiVXBwcmVwYSBsw7ZzZW5vcmRcIiksIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uaW5wdXQoe3R5cGU6IFwicGFzc3dvcmRcIiwgcmVmOiBcInJlZ19wYXNzX3JlcGVhdFwifSlcbiAgICAgICAgICAgICksIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7b25DbGljazogdGhpcy5yZWdpc3Rlcn0sIFwiU2thcGEga29udG9cIiksIFxuICAgICAgICAgICAgcmVnaXN0ZXJFcnJvclxuICAgICAgICAgICksIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJsb2dcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKG51bGwsIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uc3BhbihudWxsLCBcIkUtcG9zdCAoYW52w6RuZGFybmFtbik6XCIpLCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KHt0eXBlOiBcInRleHRcIiwgcmVmOiBcImxvZ2luX3VzZXJcIn0pXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbChudWxsLCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLnNwYW4obnVsbCwgXCJMw7ZzZW5vcmRcIiksIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uaW5wdXQoe3R5cGU6IFwicGFzc3dvcmRcIiwgcmVmOiBcImxvZ2luX3Bhc3NcIn0pXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbCh7Y2xhc3NOYW1lOiBcImNoZWNrYm94XCJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KHt0eXBlOiBcImNoZWNrYm94XCIsIHJlZjogXCJyZW1lbWJlclwifSksIFwiIFwiLCBSZWFjdC5ET00uc3BhbihudWxsLCBcIktvbSBpaMOlZyBtaWdcIilcbiAgICAgICAgICAgICksIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmEoe2NsYXNzTmFtZTogXCJmb3Jnb3RcIiwgaHJlZjogXCIjXCIsIG9uQ2xpY2s6IHRoaXMuZm9yZ290fSwgXCJHbMO2bXQgbMO2c2Vub3JkXCIpLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oe29uQ2xpY2s6IHRoaXMubG9naW59LCBcIkxvZ2dhIGluXCIpLCBcbiAgICAgICAgICAgIGxvZ2luRXJyb3JcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG4gIH1cbn0pXG4iLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKVxudmFyIFBpd2lrID0gcmVxdWlyZSgndmRkL3Bpd2lrJylcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbG9zZUhhbmRsZXI6IGZ1bmN0aW9uKCl7fVxuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24obW9kYWwpIHtcbiAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSgpXG4gIH0sXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgJG1vZGFsID0gJCh0aGlzLnJlZnMubW9kYWwuZ2V0RE9NTm9kZSgpKVxuICAgIHZhciB3aWR0aCA9ICQoJyNtb2RhbC1jb250ZW50Jykub3V0ZXJXaWR0aCgpXG4gICAgJG1vZGFsLmNzcygnbWFyZ2luLWxlZnQnLCB3aWR0aC8tMilcbiAgfSxcblxuICBvbkNsb3NlOiBmdW5jdGlvbihlKSB7XG4gICAgUGl3aWsudHJhY2tDbGljaygnTW9kYWwnLCAnQ2xvc2UnKVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHR5cGVvZiB0aGlzLnByb3BzLmNsb3NlSGFuZGxlciA9PSAnZnVuY3Rpb24nICYmIHRoaXMucHJvcHMuY2xvc2VIYW5kbGVyKClcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtpZDogXCJtb2RhbC13cmFwcGVyXCIsIGNsYXNzTmFtZTogdGhpcy5wcm9wcy5zaG93ID8gJ3Nob3cnIDogJyd9LCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7aWQ6IFwibW9kYWxcIiwgcmVmOiBcIm1vZGFsXCIsIGNsYXNzTmFtZTogdGhpcy5wcm9wcy5jbGFzc05hbWV9LCBcbiAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHtpZDogXCJtb2RhbC1jbG9zZVwiLCBvbkNsaWNrOiB0aGlzLm9uQ2xvc2V9LCBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBcImZhIGZhLXRpbWVzXCJ9KSksIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2lkOiBcIm1vZGFsLWNvbnRlbnRcIn0sIFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgIClcbiAgICAgICAgKSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2lkOiBcImJhY2tkcm9wXCIsIG9uQ2xpY2s6IHRoaXMub25DbG9zZX0pXG4gICAgICApXG4gICAgKVxuICB9XG59KVxuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG4gIFxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxudmFyIFF1ZXJ5ID0gcmVxdWlyZSgndmRkL3F1ZXJ5JylcbnZhciAkwqA9IHJlcXVpcmUoJ2pxdWVyeScpXG52YXIgUm91dGVyID0gcmVxdWlyZSgndmRkL3JvdXRlcicpXG52YXIgcmVzcG9uc2VkYXRhID0gcmVxdWlyZSgndmRkL21vZGVscycpLnJlc3BvbnNlZGF0YVxudmFyIFBpd2lrID0gcmVxdWlyZSgndmRkL3Bpd2lrJylcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICBuZXh0SGFuZGxlcjogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHZhciBwYWdlID0gfn5RdWVyeS5nZXQoJ3BhZ2UnKSB8fCAxXG4gICAgUXVlcnkuc2V0KHsgcGFnZTogcGFnZSsxIH0pXG4gICAgdGhpcy5uYXZpZ2F0ZSgpXG4gICAgUGl3aWsudHJhY2tDbGljaygnRmF2b3VyaXRlcycsICdQYWdpbmF0aW9uOiBOZXh0JylcbiAgfSxcblxuICBuYXZpZ2F0ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyICRyZXN1bHRzID0gJCgnLnJlc3VsdHMnKVxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAkcmVzdWx0cy5vZmZzZXQoKS50b3AtNzgpXG4gICAgJHJlc3VsdHMuY3NzKHsgcGFkZGluZ0JvdHRvbTogMCB9KVxuICAgIFJvdXRlci5uYXZpZ2F0ZShRdWVyeS5idWlsZCgpLCB7IHRyaWdnZXI6IHRydWUgfSlcbiAgfSxcblxuICBwcmV2SGFuZGxlcjogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHZhciBwYWdlID0gfn5RdWVyeS5nZXQoJ3BhZ2UnKVxuICAgIGlmICggIXBhZ2UgKVxuICAgICAgcmV0dXJuXG4gICAgaWYgKCBwYWdlIDwgMiApXG4gICAgICBRdWVyeS5yZW1vdmUoJ3BhZ2UnKVxuICAgIGVsc2VcbiAgICAgIFF1ZXJ5LnNldCh7IHBhZ2U6IHBhZ2UtMSB9KVxuICAgIHRoaXMubmF2aWdhdGUoKVxuICAgIFBpd2lrLnRyYWNrQ2xpY2soJ0Zhdm91cml0ZXMnLCAnUGFnaW5hdGlvbjogUHJldmlvdXMnKVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAhUXVlcnkuZ2V0KCdxJykgKVxuICAgICAgcmV0dXJuIFJlYWN0LkRPTS5kaXYobnVsbClcbiAgICB2YXIgcGFnZSA9IFF1ZXJ5LmdldCgncGFnZScpIHx8IDFcbiAgICB2YXIgdG90YWwgPSByZXNwb25zZWRhdGEuZ2V0KCdmaXJzdFJ1bicpIFxuICAgICAgPyAxIFxuICAgICAgOiBNYXRoLmNlaWwocmVzcG9uc2VkYXRhLmdldCgnaGl0cycpLzUwKVxuICAgIHZhciBhY3RpdmUgPSByZXNwb25zZWRhdGEuZ2V0KCdmaXJzdFJ1bicpXG4gICAgICA/IG51bGwgXG4gICAgICA6IHBhZ2UgPiAwIFxuICAgICAgICA/IFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwiYWN0aXZlXCJ9LCBSZWFjdC5ET00uc3Ryb25nKG51bGwsIHBhZ2UpLCBcIi9cIiwgUmVhY3QuRE9NLnNwYW4obnVsbCwgdG90YWwpKSBcbiAgICAgICAgOiBudWxsXG4gICAgaWYgKCAhdG90YWwgfHwgaXNOYU4odG90YWwpIClcbiAgICAgIHJldHVybiBSZWFjdC5ET00uZGl2KG51bGwpXG4gICAgdmFyIHByZXYgPSBSZWFjdC5ET00uYnV0dG9uKHtjbGFzc05hbWU6IFwicHJldlwiLCBvbkNsaWNrOiB0aGlzLnByZXZIYW5kbGVyfSwgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1hbmdsZS1sZWZ0XCJ9KSwgXCIgRsO2cmVnw6VlbmRlXCIpXG4gICAgdmFyIG5leHQgPSBSZWFjdC5ET00uYnV0dG9uKHtjbGFzc05hbWU6IFwibmV4dFwiLCBvbkNsaWNrOiB0aGlzLm5leHRIYW5kbGVyfSwgXCJOw6RzdGEgXCIsIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtYW5nbGUtcmlnaHRcIn0pKVxuICAgIGlmICggcGFnZSA9PSB0b3RhbCApXG4gICAgICBuZXh0ID0gbnVsbFxuICAgIGlmICggcGFnZSA8IDIgKVxuICAgICAgcHJldiA9IG51bGxcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcInBhZ2luYXRpb25cIn0sIFxuICAgICAgICBwcmV2LCBcbiAgICAgICAgYWN0aXZlLCBcbiAgICAgICAgbmV4dFxuICAgICAgKVxuICAgIClcbiAgfVxufSlcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG52YXIgUXVlcnkgPSByZXF1aXJlKCd2ZGQvcXVlcnknKVxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3ZkZC9yb3V0ZXInKVxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKVxudmFyIFZERCA9IHJlcXVpcmUoJ3ZkZC92ZGQnKVxudmFyIFB1YlN1YiA9IHJlcXVpcmUoJ3ZkZC9wdWJzdWInKVxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJylcbnZhciB1c2VyID0gcmVxdWlyZSgndmRkL21vZGVscycpLnVzZXJcbnZhciBQaXdpayA9IHJlcXVpcmUoJ3ZkZC9waXdpaycpXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50JylcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgYWN0aXZlOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBoYXNOb2RlOiBmYWxzZSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oZWxlbSkge1xuXG4gICAgLy8gZG8gdGhlIGxvYWRpbWFnZSBhbmltYXRpb24gYW5kIGFkanVzdCBtYXNvbnJ5XG5cbiAgICB2YXIgaW1nID0gdGhpcy5yZWZzLmltYWdlLmdldERPTU5vZGUoKVxuXG4gICAgdmFyIGxvYWRSZWFkeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCB0aGlzLmlzTW91bnRlZCgpIClcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IGZhbHNlIH0pXG4gICAgfS5iaW5kKHRoaXMpXG5cbiAgICB2YXIgbGF5b3V0UmVhZHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtYXNvbnJ5ID0gVkRELmdldE1hc29ucnkoKVxuICAgICAgaWYgKCBtYXNvbnJ5ICkge1xuICAgICAgICBtYXNvbnJ5LmxheW91dCgpXG4gICAgICAgIHRoaXMuc2V0Tm9kZSgpIC8vIHNldHMgdGhlIGFjdGl2ZSBub2RlIHNvIGRldGFpbCBrbm93cyBpdOKAmXMgcG9zaXRpb25cbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcylcblxuICAgIHZhciBpbWFnZVJlYWR5ID0gZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUpIHtcbiAgICAgICAgaWYgKCBlLnR5cGUgPT0gJ2Vycm9yJyApXG4gICAgICAgICAgJChlLnRhcmdldCkuc2libGluZ3MoJy5zcGlubmVyJykuYWRkQ2xhc3MoJ25vdGZvdW5kJylcbiAgICAgICAgZWxzZVxuICAgICAgICAgICQoZS50YXJnZXQpLmFuaW1hdGUoeyBvcGFjaXR5OjEgfSwgNDAwLCBsb2FkUmVhZHkpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKVxuICAgICAgfSBlbHNlXG4gICAgICAgIGxvYWRSZWFkeSgpXG4gICAgICBcbiAgICAgIHNldFRpbWVvdXQobGF5b3V0UmVhZHksIDEwKVxuICAgIH1cblxuICAgIGlmICghaW1nIHx8IGltZy5yZWFkeSlcbiAgICAgIGltYWdlUmVhZHkoKVxuICAgIGVsc2VcbiAgICAgICQoaW1nKS5jc3MoJ29wYWNpdHknLCAwKS5sb2FkKGltYWdlUmVhZHkpLmVycm9yKGltYWdlUmVhZHkpXG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaGFzTm9kZSA9IGZhbHNlXG4gIH0sXG5cbiAgc2V0Tm9kZTogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5wcm9wcy5pc2FjdGl2ZSkge1xuICAgICAgUHViU3ViLnRyaWdnZXIoJ25vZGUnLCB7IG5vZGU6IHRoaXMucmVmcy5yZXN1bHQuZ2V0RE9NTm9kZSgpIH0pXG4gICAgfVxuICB9LFxuXG4gIGNsaWNrSGFuZGxlcjogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHZhciBpID0gdGhpcy5wcm9wcy5yZXN1bHQuZ2V0RmllbGRzKClbJ0BpZCddXG4gICAgUm91dGVyLm5hdmlnYXRlKFZERC5wYXJzZVBlcm1hTGluayhpKSArICcvJyArIFF1ZXJ5LmJ1aWxkKCksIHRydWUpXG4gICAgUGl3aWsudHJhY2tDbGljaygnUmVzdWx0cycsIGkpXG4gIH0sXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldE5vZGUoKVxuICB9LFxuXG4gIG9uRmF2OiBmdW5jdGlvbihlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHZhciBmaWVsZHMgPSB0aGlzLnByb3BzLnJlc3VsdC5nZXRGaWVsZHMoKVxuICAgIHZhciB1cmwgPSBWREQucGFyc2VQZXJtYUxpbmsoZmllbGRzWydAaWQnXSlcblxuICAgIGlmICggZS5jdXJyZW50VGFyZ2V0LmNsYXNzTmFtZSA9PSAnYWN0aXZlJyB8fCBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJlbW92ZXInKSApIHtcbiAgICAgIHJldHVybiBWREQucmVtb3ZlRmF2b3VyaXRlKHsgdXJsOiB1cmx9KVxuICAgIH1cbiAgICB2YXIgZW50cnkgPSB0aGlzLnByb3BzLnJlc3VsdC50b0pTT04oKVxuICAgIFZERC5hZGRGYXZvdXJpdGUoJC5leHRlbmQoZW50cnksIHtcbiAgICAgIGRhdGU6ICtuZXcgRGF0ZSgpLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBxdWVyeTogUXVlcnkuZ2V0KClcbiAgICB9KSlcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmaWVsZHMgPSB0aGlzLnByb3BzLnJlc3VsdC5nZXRGaWVsZHMoKVxuICAgIHZhciBpbWcgPSBmaWVsZHNbJ0BpZCddICsgJ190aHVtYi4nICsgKHdpbmRvdy5IT01FIHx8IHRoaXMucHJvcHMucmVzdWx0LmdldCgnY29weXJpZ2h0X2ZyZWUnKSA/ICdqcGcnIDogJ3N2ZycpXG4gICAgdmFyIGxvYWRlciA9IHRoaXMuc3RhdGUubG9hZGluZyA/IFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwic3Bpbm5lclwifSkgOiBudWxsXG4gICAgdmFyIGNsYXNzTmFtZXMgPSBbJ3Jlc3VsdCddXG5cbiAgICB0aGlzLnByb3BzLmlzYWN0aXZlICYmIGNsYXNzTmFtZXMucHVzaCgnYWN0aXZlJylcbiAgICB2YXIgaXNGYXZvdXJpdGUgPSB1c2VyLmdldCgndXNlcmRhdGEnKSAmJiAhIV8uZmluZFdoZXJlKHVzZXIuZ2V0KCd1c2VyZGF0YScpLmZhdm91cml0ZXMsIHtcbiAgICAgIHVybDogVkRELnBhcnNlUGVybWFMaW5rKGZpZWxkc1snQGlkJ10pIFxuICAgIH0pXG5cbiAgICB2YXIgc25pcHBldHMgPSBudWxsXG4gICAgdmFyIHNuaXBwZXRjb250YWluZXIgPSBudWxsXG4gICAgdmFyIGhpZ2hsaWdodHMgPSB0aGlzLnByb3BzLnJlc3VsdC5nZXQoJ2hpZ2hsaWdodCcpXG4gICAgaWYgKCBoaWdobGlnaHRzICkge1xuICAgICAgc25pcHBldHMgPSBoaWdobGlnaHRzLmNvbnRlbnQubWFwKGZ1bmN0aW9uKHNuaXAsIGkpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwic25pcHAgc1wiK2ksIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7IF9faHRtbDogc25pcH19KVxuICAgICAgfSlcbiAgICAgIHNuaXBwZXRjb250YWluZXIgPSAoXG4gICAgICAgIFJlYWN0LkRPTS5wKHtjbGFzc05hbWU6IFwic25pcHBldFwifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLnNwYW4oe2NsYXNzTmFtZTogXCJxdW90ZVwifSwgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1xdW90ZS1yaWdodFwifSkpLCBcbiAgICAgICAgICBzbmlwcGV0c1xuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgdmFyIGJhbm5lclxuICAgIGlmICggd2luZG93LkhPTUUgKVxuICAgICAgYmFubmVyID0gbnVsbFxuICAgIGVsc2UgaWYoICF0aGlzLnByb3BzLnJlc3VsdC5nZXQoJ2NvcHlyaWdodF9mcmVlJykgKSB7XG4gICAgICBiYW5uZXIgPSAoXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJiYW5uZXJcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwiYXJyXCJ9KSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS11bml2ZXJzaXR5XCJ9KVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgdmFyIGhpZ2hsaWdodFxuICAgIGlmICggaGlnaGxpZ2h0cyApIHtcbiAgICAgIHZhciBobCA9IFtdXG4gICAgICBoaWdobGlnaHRzLmNvbnRlbnQuZm9yRWFjaChmdW5jdGlvbihoKSB7XG4gICAgICAgIGhsLnB1c2goaC5yZXBsYWNlKC8uKjxlbT4oLiopPFxcL2VtPi4qLywgJyQxJykpXG4gICAgICB9KVxuICAgICAgdmFyIHNyYyA9IFZERC5pbWdIYWNrKGZpZWxkc1snQGlkJ10pXG4gICAgICBoaWdobGlnaHQgPSBSZWFjdC5ET00uaW1nKHtzcmM6IHNyYysnX2hpdHMuc3ZnP2g9JytobC5qb2luKCcsJyksIGNsYXNzTmFtZTogXCJoaWdobGlnaHRcIiwgcmVmOiBcImhpZ2hsaWdodFwifSlcbiAgICB9XG5cbiAgICBpbWcgPSBWREQuaW1nSGFjayhpbWcpXG5cbiAgICB2YXIgZmF2ID0gUmVhY3QuRE9NLmJ1dHRvbih7b25DbGljazogdGhpcy5vbkZhdiwgY2xhc3NOYW1lOiBpc0Zhdm91cml0ZSA/ICdhY3RpdmUnOicnfSwgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1zdGFyXCJ9KSlcblxuICAgIGlmICggUXVlcnkuZ2V0KCdxJykgPT0gJzpmYXZvdXJpdGVzJyApIHtcblxuICAgICAgdmFyIGRhdGUgPSAnJ1xuXG4gICAgICBpZiAodXNlci5nZXQoJ3VzZXJkYXRhJykpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBfLmZpbmRXaGVyZSh1c2VyLmdldCgndXNlcmRhdGEnKS5mYXZvdXJpdGVzLCB7XG4gICAgICAgICAgdXJsOiBWREQucGFyc2VQZXJtYUxpbmsoZmllbGRzWydAaWQnXSkgXG4gICAgICAgIH0pXG4gICAgICAgIHZhciBvbmVEYXkgPSAyNCo2MCo2MCoxMDAwXG4gICAgICAgIHZhciBkID0gbmV3IERhdGUoZGF0YS5kYXRlKVxuICAgICAgICB2YXIgbiA9IG5ldyBEYXRlKClcbiAgICAgICAgdmFyIGRpZmYgPSBuLmdldERheSgpIC0gZC5nZXREYXkoKVxuICAgICAgICBpZiAoICFkaWZmIClcbiAgICAgICAgICBkYXRlID0gJ0lkYWcnXG4gICAgICAgIGVsc2UgaWYgKCBkaWZmID09PSAxIClcbiAgICAgICAgICBkYXRlID0gJ0lnw6VyJ1xuICAgICAgICBlbHNlIGlmICggZGlmZiA8IDE0IClcbiAgICAgICAgICBkYXRlID0gZGlmZiArICcgZGFnYXIgc2VkYW4nXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBkYXRlID0gbW9tZW50KGQpLmZvcm1hdCgnTU0tREQtWVlZWScpXG4gICAgICB9XG5cbiAgICAgIGZhdiA9IFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJmYXZ0aW1lXCJ9LCBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBcImZhIGZhLXN0YXJcIn0pLCBcIiBcIiwgZGF0ZSwgXCIgXCIsIFJlYWN0LkRPTS5zcGFuKHsnZGF0YS1yZW1vdmVyJzogXCJ0cnVlXCIsIHRpdGxlOiBcIlRhIGJvcnQgZmF2b3JpdFwiLCBvbkNsaWNrOiB0aGlzLm9uRmF2fSwgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS10aW1lc1wifSkpKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IGNsYXNzTmFtZXMuam9pbignICcpLCBvbkNsaWNrOiB0aGlzLmNsaWNrSGFuZGxlciwgcmVmOiBcInJlc3VsdFwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJyZXN1bHQtaW5uZXJcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJ0aXRsZVwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uc3Ryb25nKG51bGwsIFZERC5jYXBpdGFsaXplKGZpZWxkcy5uZXdzcGFwZXIudGl0bGUpKSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcImRhdGVcIn0sIGZpZWxkcy5pc3N1ZS5pc3N1ZWQpXG4gICAgICAgICAgKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImltYWdlXCJ9LCBcbiAgICAgICAgICAgIGxvYWRlciwgXG4gICAgICAgICAgICBSZWFjdC5ET00uaW1nKHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBpbWd9KSwgXG4gICAgICAgICAgICBoaWdobGlnaHRcbiAgICAgICAgICApLCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiY29udGVudFwifSwgXG4gICAgICAgICAgICBzbmlwcGV0Y29udGFpbmVyXG4gICAgICAgICAgKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImZhdlwifSwgXG4gICAgICAgICAgICBmYXZcbiAgICAgICAgICApXG4gICAgICAgICksIFxuICAgICAgICBiYW5uZXJcbiAgICAgIClcbiAgICApXG4gIH1cbn0pXG4iLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxudmFyIE1hc29ucnkgPSByZXF1aXJlKCd2ZGQvbWFzb25yeScpXG52YXIgUmVzdWx0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9yZXN1bHQnKVxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKVxudmFyIFF1ZXJ5ID0gcmVxdWlyZSgndmRkL3F1ZXJ5JylcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCd2ZGQvcm91dGVyJylcbnZhciBWREQgPSByZXF1aXJlKCd2ZGQvdmRkJylcbnZhciBtb2RlbHMgPSByZXF1aXJlKCd2ZGQvbW9kZWxzJylcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICBjYWNoZWRRdWVyeTogJycsXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aXZlSWQ6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHVsID0gdGhpcy5nZXRET01Ob2RlKClcblxuICAgIHZhciBtYXNvbnJ5ID0gbmV3IE1hc29ucnkodWwsIHtcbiAgICAgIG9uYnJpY2s6IHRoaXMucHJvcHMub25icmlja1xuICAgIH0pXG4gICAgbWFzb25yeS5sYXlvdXQoKVxuICAgICQod2luZG93KS5vbigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyKVxuXG4gICAgLy8gc2F2ZSBhcyBnbG9iYWxcbiAgICBWREQuc2V0TWFzb25yeShtYXNvbnJ5KVxuXG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZScsIHRoaXMucmVzaXplSGFuZGxlcilcbiAgICBWREQuc2V0TWFzb25yeShudWxsKVxuICB9LFxuXG4gIHJlc2l6ZUhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXNvbnJ5ID0gVkRELmdldE1hc29ucnkoKVxuICAgIG1hc29ucnkgJiYgbWFzb25yeS5sYXlvdXQoKVxuICB9LFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZXNpemVIYW5kbGVyKClcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpc0FjdGl2ZVxuICAgIHZhciBjbGFzc05hbWVzID0gWydyZXN1bHRzJ11cbiAgICBpZiAoICF0aGlzLnByb3BzLm1vdmUgKVxuICAgICAgY2xhc3NOYW1lcy5wdXNoKCdkb250bW92ZScpXG4gICAgdmFyIHJlc3VsdHMgPSBtb2RlbHMucmVzdWx0cy5tYXAoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICBpc0FjdGl2ZSA9IHJlc3VsdC5nZXRGaWVsZHMoKVsnQGlkJ10gPT0gVkRELmJ1aWxkUGVybWFMaW5rKHRoaXMucHJvcHMudXJsUGFyYW1zKVxuICAgICAgcmV0dXJuIFJlc3VsdENvbXBvbmVudCh7a2V5OiByZXN1bHQuY2lkLCByZXN1bHQ6IHJlc3VsdCwgaXNhY3RpdmU6IGlzQWN0aXZlfSlcbiAgICB9LCB0aGlzKVxuICAgIHJldHVybiAoUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBjbGFzc05hbWVzLmpvaW4oJyAnKX0sIHJlc3VsdHMpKVxuICB9XG59KVxuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCd2ZGQvcm91dGVyJylcbnZhciBRdWVyeSA9IHJlcXVpcmUoJ3ZkZC9xdWVyeScpXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpOyB3aW5kb3cualF1ZXJ5ID0gJCAvLyBXb3JrYXJvdW5kIGZvciBzdHVwaWQgYnVnLiBXaWxsIGhvcGVmdWxseSBiZSBmaXhlZCBpbiBUeXBlYWhlYWQgMC4xMS5cbnZhciB0eXBlYWhlYWQgPSByZXF1aXJlKCd0eXBlYWhlYWQuanMnKVxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJylcblxudmFyIGdsb2JhbFhIUiA9IHtcbiAgYWJvcnQ6IGZ1bmN0aW9uKCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJydcbiAgICB9XG4gIH0sXG5cbiAgY2hhbmdlSGFuZGxlcjogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBlLnRhcmdldC52YWx1ZX0pXG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgUXVlcnkuZ2V0KCdxJykgJiYgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IFF1ZXJ5LmdldCgncScpIH0pXG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgLy8gQ3JlYXRlIGEgZGVib3VuY2VkIGZ1bmN0aW9uIGZvciBBSkFYIHNlYXJjaCBzdWdnZXN0aW9uc1xuICAgIHZhciBnZXRTdWdnZXN0aW9ucyA9IF8uZGVib3VuY2UoIGZ1bmN0aW9uKCBxdWVyeSwgY2IgKSB7XG4gICAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSwgbG9hZGVkLCBmaW5pc2hcbiAgICAgIFxuICAgICAgdmFyICRzZWFyY2hmb3JtID0gJCggJyNzZWFyY2hmb3JtJyApXG4gICAgICAkc2VhcmNoZm9ybS5hZGRDbGFzcyggJ2xvYWRpbmcnIClcbiAgICAgIFxuICAgICAgZ2xvYmFsWEhSLmFib3J0KClcbiAgICAgIGdsb2JhbFhIUiA9ICQuZ2V0SlNPTignL2FwaS9zdWdnZXN0P3E9JyArIHF1ZXJ5LCBmdW5jdGlvbiggcmVzcG9uc2UgKSB7XG4gICAgICAgIGxvYWRlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgICRzZWFyY2hmb3JtLnJlbW92ZUNsYXNzKCAnbG9hZGluZycgKVxuICAgICAgICB2YXIgcmV0dXJuRGF0YSA9IF8ubWFwKCByZXNwb25zZS5zdWdnZXN0aW9ucywgZnVuY3Rpb24oIHMgKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBocmFzZTogc1sgMCBdLFxuICAgICAgICAgICAgc2NvcmU6IHNbIDEgXVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgZmluaXNoID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgZmV0Y2ggdG9vaycsIGxvYWRlZCAtIHN0YXJ0LCAnbWlsbGlzZWNvbmRzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIG1hc3NhZ2UgdG9vaycsIGZpbmlzaCAtIGxvYWRlZCwgJ21pbGxpc2Vjb25kcycpO1xuICAgICAgICBjYiggcmV0dXJuRGF0YSApXG4gICAgICB9KVxuICAgIH0sIDIwMCApXG4gICAgXG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgc2VsZi5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKClcblxuICAgICQoIHRoaXMucmVmcy5xLmdldERPTU5vZGUoKSApLnR5cGVhaGVhZCh7XG4gICAgICBtaW5MZW5ndGg6IDMsXG4gICAgICBoaWdobGlnaHQ6IHRydWUsXG4gICAgICBoaW50OiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3N1Z2dzJyxcbiAgICAgIGRpc3BsYXlLZXk6ICdwaHJhc2UnLFxuICAgICAgc291cmNlOiBmdW5jdGlvbiggcXVlcnksIGNiICkge1xuICAgICAgICBnZXRTdWdnZXN0aW9ucyggcXVlcnksIGNiIClcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgLy9lbXB0eTogJzxzcGFuIGNsYXNzPVwidHQtc3VnZ2VzdGlvbnNcIj48ZGl2IGNsYXNzPVwidHQtY29udGFpbmVyXCI+PGRpdiBjbGFzcz1cInJlc3VsdCBlbXB0eVwiPjxwPkluZ2EgdHLDpGZmYXI8L3A+PC9kaXY+PC9kaXY+PC9zcGFuPicsXG4gICAgICAgIHN1Z2dlc3Rpb246IGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicmVzdWx0XCI+JyxcbiAgICAgICAgICAgICAgICAnPHA+JyArIHJlc3VsdC5waHJhc2UgKyAnPC9wPicsXG4gICAgICAgICAgICAnPC9kaXY+J1xuICAgICAgICAgIF0uam9pbignXFxuJylcbiAgICAgICAgfSxcbiAgICAgICAgZm9vdGVyOiAnPHNwYW4gY2xhc3M9XCJ0dC1zdWdnZXN0aW9uc1wiPjxkaXYgY2xhc3M9XCJ0dC1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwicmVzdWx0IGhlbHBcIj48cD5UaXBzOiBGw6UgbWVkIGFsdGVybmF0aXZhIHN0YXZuaW5nYXIgZ2Vub20gYXR0IGzDpGdnYSB0aWxsIH4yIDwvcD48L2Rpdj48L2Rpdj48L3NwYW4+J1xuICAgICAgfVxuICAgIH0pLm9uKCd0eXBlYWhlYWQ6c2VsZWN0ZWQnLCBmdW5jdGlvbiggZXYsIG9iICkge1xuICAgICAgc2VsZi5kb1NlYXJjaCggb2IucGhyYXNlIClcbiAgICB9KS5vbigndHlwZWFoZWFkOm9wZW5lZCcsIGZ1bmN0aW9uKCBldiwgb2IgKSB7XG4gICAgICAkKCAnI3NlYXJjaCcgKS5hZGRDbGFzcyggJ29wZW5lZCcgKVxuICAgIH0pLm9uKCd0eXBlYWhlYWQ6Y2xvc2VkJywgZnVuY3Rpb24oIGV2LCBvYiApIHtcbiAgICAgICQoICcjc2VhcmNoJyApLnJlbW92ZUNsYXNzKCAnb3BlbmVkJyApXG4gICAgfSlcbiAgICB0aGlzLnJlZnMucS5nZXRET01Ob2RlKCkuZm9jdXMoKVxuICB9LFxuICBcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgJCggJyNzZWFyY2gnICkudHlwZWFoZWFkKCdkZXN0cm95JylcbiAgfSxcblxuICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbiggZSApIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIC8vIEdldCB2YWx1ZSBmcm9tIFR5cGVhaGVhZCBpZiBwb3NzaWJsZS5cbiAgICAvLyBGYWxsIGJhY2sgdG8gc3RhdGUuXG4gICAgaWYgKCAkKCcudHlwZWFoZWFkJykudHlwZWFoZWFkKCd2YWwnKSApIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuc3RhdGUudmFsdWUgPSAkKCcudHlwZWFoZWFkJykudHlwZWFoZWFkKCd2YWwnKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlXG4gICAgfVxuICAgIHNlbGYuZG9TZWFyY2goIHZhbHVlIClcbiAgfSxcblxuICBkb1NlYXJjaDogZnVuY3Rpb24oIHEgKSB7XG4gICAgaWYgKCBxICkge1xuICAgICAgLy8gQWJvcnQgYW55IG9uZ29pbmcgWEhSIHJlcXVlc3RcbiAgICAgIGdsb2JhbFhIUi5hYm9ydCgpXG4gICAgICAvLyBSZXN0b3JlIHNlYXJjaCBidXR0b25cbiAgICAgICQoJyNzZWFyY2hmb3JtJykucmVtb3ZlQ2xhc3MoICdsb2FkaW5nJyApXG4gICAgICAvLyBNYWtlIHN1cmUgdHlwZWFoZWFkIGlzIGFsd2F5cyBjbG9zZWRcbiAgICAgICQoJyNzZWFyY2gnKS50eXBlYWhlYWQoJ2Nsb3NlJyk7XG4gICAgICBRdWVyeS5zZXQoe3E6IHF9KVxuICAgICAgUXVlcnkucmVtb3ZlKCdpJylcbiAgICAgIFF1ZXJ5LnJlbW92ZSgnZnJvbScpXG4gICAgICBRdWVyeS5yZW1vdmUoJ3RvJylcbiAgICAgIFF1ZXJ5LnJlbW92ZSgnaXNzbicpXG4gICAgICBRdWVyeS5yZW1vdmUoJ25ld3NwYXBlcicpXG4gICAgICBRdWVyeS5yZW1vdmUoJ3BhZ2UnKVxuICAgICAgUm91dGVyLm5hdmlnYXRlKCcvJyArIFF1ZXJ5LmJ1aWxkKCksIHt0cmlnZ2VyOiB0cnVlfSlcbiAgICB9XG4gICAgZWxzZVxuICAgICAgdGhpcy5yZWZzLnEuZ2V0RE9NTm9kZSgpLmZvY3VzKClcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBicmVhZGNydW1icyA9IG51bGxcbiAgICB2YXIgZnJlZW9ubHlidXR0b24gPSBudWxsXG5cbiAgICBpZiAoIDAgPT09IDEpIHtcbiAgICAgIGJyZWFkY3J1bWJzID0gKFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiYnJlYWRjcnVtYnNcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJ0ZXh0XCJ9XG4gICAgICAgICAgKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImZhdlwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKG51bGwsIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtc3RhclwifSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJibG9jayBzZWFyY2hcIn0sIFxuICAgICAgICBSZWFjdC5ET00uZm9ybSh7aWQ6IFwic2VhcmNoZm9ybVwiLCBhY3Rpb246IFwiI1wiLCBvblN1Ym1pdDogdGhpcy5zdWJtaXRIYW5kbGVyfSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmlucHV0KHtpZDogXCJzZWFyY2hcIiwgcmVmOiBcInFcIiwgY2xhc3NOYW1lOiBcImlucHV0XCIsIGF1dG9Gb2N1czogdHJ1ZSwgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxuICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuY2hhbmdlSGFuZGxlciwgYXV0b0NvbXBsZXRlOiBcIm9mZlwifSksIFxuICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oe2NsYXNzTmFtZTogXCJidXR0b25cIiwgaWQ6IFwic3VibWl0XCJ9LCBcIlPDtmtcIiwgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcInNwaW5uZXIgbGlnaHRcIn0pKSwgXG4gICAgICAgICAgYnJlYWRjcnVtYnNcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgfVxufSlcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG52YXIgUXVlcnkgPSByZXF1aXJlKCd2ZGQvcXVlcnknKVxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3ZkZC9yb3V0ZXInKVxuLy8gdmFyIG1vZGVscyA9IHJlcXVpcmUoJ3ZkZC9tb2RlbHMnKVxuLy8gdmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJylcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgIFF1ZXJ5LnJlbW92ZSgnc29ydCcpXG4gICAgUm91dGVyLm5hdmlnYXRlKCcvJyArIFF1ZXJ5LmJ1aWxkKCksIHt0cmlnZ2VyOiB0cnVlfSlcbiAgfSxcblxuICB0b2dnbGVEYXRlT3JkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzb3J0ID0gUXVlcnkuZ2V0KCdzb3J0JylcbiAgICBpZiAoICFzb3J0IHx8IHNvcnQgPT0gJ2FzYycgKSB7XG4gICAgICBRdWVyeS5zZXQoIHsgc29ydDogJ2Rlc2MnIH0gKVxuICAgIH0gZWxzZSB7XG4gICAgICBRdWVyeS5zZXQoIHsgc29ydDogJ2FzYycgfSApXG4gICAgfVxuICAgIFJvdXRlci5uYXZpZ2F0ZSgnLycgKyBRdWVyeS5idWlsZCgpLCB7dHJpZ2dlcjogdHJ1ZX0pXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgIGlmICggIVF1ZXJ5LmdldCgncScpIClcbiAgICAgIHJldHVybiBSZWFjdC5ET00uZGl2KG51bGwpXG5cbiAgICB2YXIgc29ydCA9IFF1ZXJ5LmdldCgnc29ydCcpXG4gICAgdmFyIGRhdGVPcmRlciA9ICcnXG5cbiAgICBpZiAoIHNvcnQgKSB7XG4gICAgICBpZiAoIHNvcnQgPT0gJ2FzYycgKSBkYXRlT3JkZXIgPSAoIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtY2hldnJvbi11cFwifSkgKVxuICAgICAgaWYgKCBzb3J0ID09ICdkZXNjJyApIGRhdGVPcmRlciA9ICggUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1jaGV2cm9uLWRvd25cIn0pIClcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLnNwYW4oe2NsYXNzTmFtZTogXCJzb3J0XCJ9LCBcbiAgICAgICAgXCJTb3J0ZXJhOlwiLCBcbiAgICAgICAgUmVhY3QuRE9NLnNwYW4oe2NsYXNzTmFtZTogXCJidXR0b25zXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHtvbkNsaWNrOiB0aGlzLnJlc2V0LCBjbGFzc05hbWU6ICBzb3J0ID8gJycgOiAnYWN0aXZlJ30sIFwiUmVsZXZhbnNcIiksIFxuICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oe29uQ2xpY2s6IHRoaXMudG9nZ2xlRGF0ZU9yZGVyLCBjbGFzc05hbWU6ICBzb3J0ID8gJ2FjdGl2ZScgOiAnJ30sIFwiRGF0dW0gXCIsIGRhdGVPcmRlcilcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgfVxufSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKVxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3ZkZC9yb3V0ZXInKVxudmFyIFF1ZXJ5ID0gcmVxdWlyZSgndmRkL3F1ZXJ5JylcbnZhciBtb2RlbHMgPSByZXF1aXJlKCd2ZGQvbW9kZWxzJylcbnZhciBWREQgPSByZXF1aXJlKCd2ZGQvdmRkJylcbnZhciBQaXdpayA9IHJlcXVpcmUoJ3ZkZC9waXdpaycpXG5cbnZhciBXSURUSCA9IDBcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3RpdmU6IDAsXG4gICAgICBsZW5ndGg6IDBcbiAgICB9XG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geyBtb3VzZVg6IG51bGwgfVxuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUpXG4gICAgdGhpcy5vblJlc2l6ZSgpXG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUpXG4gIH0sXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm9uUmVzaXplKClcbiAgfSxcblxuICBvblJlc2l6ZTogZnVuY3Rpb24oZSkge1xuICAgIFdJRFRIID0gJCh0aGlzLmdldERPTU5vZGUoKSkub3V0ZXJXaWR0aCgpXG4gIH0sXG5cbiAgZ2V0UG9zaXRpb246IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgaWYgKCB0eXBlb2YgaW5kZXggIT0gJ251bWJlcicgKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB2YXIgcGFnZXMgPSBtb2RlbHMuZGV0YWlsLmdldElzc3VlTGlzdCgpXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoIFdJRFRIICogKCBpbmRleC8ocGFnZXMubGVuZ3RoLTEpICkgKVxuICB9LFxuXG4gIGdldEluZGV4OiBmdW5jdGlvbih4KSB7XG4gICAgdmFyIHBhZ2VzID0gbW9kZWxzLmRldGFpbC5nZXRJc3N1ZUxpc3QoKVxuICAgIHJldHVybiBNYXRoLmZsb29yKCAoeC9XSURUSCkgKiBwYWdlcy5sZW5ndGggKVxuICB9LFxuXG4gIGdldFg6IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gZS5wYWdlWCAtICQodGhpcy5nZXRET01Ob2RlKCkpLm9mZnNldCgpLmxlZnRcbiAgfSxcblxuICBtb3ZlSGFuZGxlcjogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBtb3VzZVg6IGUucGFnZVggfSlcbiAgfSxcblxuICBvdXRIYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgbW91c2VYOiBudWxsIH0pXG4gIH0sXG5cbiAgY2xpY2tIYW5kbGVyOiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleCggdGhpcy5nZXRYKGUpIClcbiAgICBjb25zb2xlLmxvZygnSU5ERVgnLCBpbmRleClcbiAgICB0aGlzLnByb3BzLnNldFBhZ2VOdW1iZXIoaW5kZXgpXG4gICAgUGl3aWsudHJhY2tDbGljaygnVGltZWxpbmUnLCBpbmRleClcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zaXRpb24oIHRoaXMucHJvcHMucGFnZU51bWJlciApXG4gICAgXG4gICAgdmFyIHBvc2l0aW9uID0gdHlwZW9mIHBvcyA9PSAnbnVtYmVyJyA/IFxuICAgICAgUmVhY3QuRE9NLnNwYW4oe2NsYXNzTmFtZTogXCJwb3NpdGlvblwiLCBzdHlsZToge2xlZnQ6IHBvc319KSA6IG51bGxcblxuICAgIHZhciB0aHVtYlN0eWxlID0geyBsZWZ0OiAwLCBkaXNwbGF5OiAnbm9uZScgfVxuICAgIHZhciB0aHVtYm5haWwgPSBudWxsXG5cbiAgICB2YXIgaGl0cyA9IG1vZGVscy5kZXRhaWwuZ2V0SGl0TGlzdCgpXG4gICAgdmFyIHBhZ2VzID0gbW9kZWxzLmRldGFpbC5nZXRJc3N1ZUxpc3QoKVxuXG4gICAgdmFyIG1hcmtzID0gaGl0cy5tYXAoZnVuY3Rpb24oaGl0LCBpKSB7XG4gICAgICB2YXIgaW5kZXggPSAwXG4gICAgICB2YXIgaWQgPSBoaXQuX3NvdXJjZVsnQGlkJ11cbiAgICAgIHBhZ2VzLmZvckVhY2goZnVuY3Rpb24ocGFnZSwgaSkge1xuICAgICAgICBpZihwYWdlLl9zb3VyY2VbJ0BpZCddID09IGlkKVxuICAgICAgICAgIGluZGV4ID0gaVxuICAgICAgfSlcbiAgICAgIHZhciBjbGFzc05hbWVzID0gWydmYScsICdmYS1ib29rbWFyayddXG4gICAgICBpZiAoIGluZGV4ID09PSB0aGlzLnByb3BzLnBhZ2VOdW1iZXIgKVxuICAgICAgICBjbGFzc05hbWVzLnB1c2goJ2FjdGl2ZScpXG4gICAgICB2YXIgc3R5bGUgPSB7IGxlZnQ6IHRoaXMuZ2V0UG9zaXRpb24oaW5kZXgpIH1cbiAgICAgIHJldHVybiBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBjbGFzc05hbWVzLmpvaW4oJyAnKSwgc3R5bGU6IHN0eWxlfSlcbiAgICB9LCB0aGlzKVxuXG4gICAgaWYgKCB0aGlzLnN0YXRlLm1vdXNlWCAhPT0gbnVsbCApIHtcbiAgICAgIHZhciB4ID0gdGhpcy5nZXRYKHsgcGFnZVg6IHRoaXMuc3RhdGUubW91c2VYIH0pXG4gICAgICB0aHVtYlN0eWxlID0geyBcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgbGVmdDogeCB8fCAwXG4gICAgICB9XG4gICAgICB0aHVtYm5haWwgPSBwYWdlc1sgdGhpcy5nZXRJbmRleCh4KSBdXG4gICAgICBpZiAoIHRodW1ibmFpbCApXG4gICAgICAgIHRodW1ibmFpbCA9IFZERC5pbWdIYWNrKHRodW1ibmFpbC5fc291cmNlWydAaWQnXSsnX21pY3JvLicgKyAodGh1bWJuYWlsLmNvcHlyaWdodF9mcmVlID8gJ2pwZycgOiAnc3ZnJykpXG5cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcInRpbWVsaW5lXCIsIG9uTW91c2VNb3ZlOiB0aGlzLm1vdmVIYW5kbGVyLCBvbkNsaWNrOiB0aGlzLmNsaWNrSGFuZGxlciwgb25Nb3VzZU91dDogdGhpcy5vdXRIYW5kbGVyfSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJ0aHVtYlwiLCBzdHlsZTogdGh1bWJTdHlsZX0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJpbWdcIn0sIFJlYWN0LkRPTS5pbWcoe3NyYzogdGh1bWJuYWlsfSkpLCBcbiAgICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcImFycm93XCJ9KVxuICAgICAgICApLCBcbiAgICAgICAgcG9zaXRpb24sIFxuICAgICAgICBtYXJrc1xuICAgICAgKVxuICAgIClcbiAgfVxufSlcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG52YXIgUXVlcnkgPSByZXF1aXJlKCd2ZGQvcXVlcnknKVxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKVxudmFyIFZERCA9IHJlcXVpcmUoJ3ZkZC92ZGQnKVxudmFyIG1vZGVscyA9IHJlcXVpcmUoJ3ZkZC9tb2RlbHMnKVxudmFyIFBhbiA9IHJlcXVpcmUoJ3ZkZC9wYW4nKVxuXG52YXIgZCA9IGRvY3VtZW50XG52YXIgJHdpbiA9ICQod2luZG93KVxudmFyIHN1cHBvcnQgPSAoIHR5cGVvZiBkLmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gIT09ICd1bmRlZmluZWQnIClcbnZhciBNT1ZFID0gMTUwXG52YXIgcmV0ZmFsc2UgPSBmdW5jdGlvbigpeyByZXR1cm4gZmFsc2UgfVxudmFyIHRyYW5zbGF0ZTNkID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgdmFyIGhhczNkXG4gIHZhciB0cmFuc2Zvcm1zID0ge1xuICAgICAgJ3dlYmtpdFRyYW5zZm9ybSc6Jy13ZWJraXQtdHJhbnNmb3JtJyxcbiAgICAgICdPVHJhbnNmb3JtJzonLW8tdHJhbnNmb3JtJyxcbiAgICAgICdtc1RyYW5zZm9ybSc6Jy1tcy10cmFuc2Zvcm0nLFxuICAgICAgJ01velRyYW5zZm9ybSc6Jy1tb3otdHJhbnNmb3JtJyxcbiAgICAgICd0cmFuc2Zvcm0nOid0cmFuc2Zvcm0nXG4gIH1cbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lmluc2VydEJlZm9yZShlbCwgbnVsbClcbiAgZm9yICh2YXIgdCBpbiB0cmFuc2Zvcm1zKSB7XG4gICAgaWYgKCB0eXBlb2YgZWwuc3R5bGVbdF0gIT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICBlbC5zdHlsZVt0XSA9ICd0cmFuc2xhdGUzZCgxcHgsMXB4LDFweCknXG4gICAgICBoYXMzZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHRyYW5zZm9ybXNbdF0pXG4gICAgfVxuICB9XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbClcbiAgcmV0dXJuIChoYXMzZCAhPT0gdW5kZWZpbmVkICYmIGhhczNkLmxlbmd0aCA+IDAgJiYgaGFzM2QgIT09IFwibm9uZVwiKVxufSgpKVxuLy8gRG91YmxlY2hlY2sgYWdhaW5zdCB0aGlzOiBodHRwOi8vZ2VuZXJhdGVkY29udGVudC5vcmcvcG9zdC83MDM0NzU3MzI5NC9pcy15b3VyLWZ1bGxzY3JlZW4tYXBpLWNvZGUtdXAtdG8tZGF0ZS1maW5kLW91dC1ob3ctdG9cbnZhciBjYW5GdWxsc2NyZWVuID0gISEoZC5ib2R5LnJlcXVlc3RGdWxsc2NyZWVuIHx8IGQuYm9keS5tc1JlcXVlc3RGdWxsc2NyZWVuIHx8IGQuYm9keS5tb3pSZXF1ZXN0RnVsbHNjcmVlbiB8fCBkLmJvZHkud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICBwYW46IG51bGwsXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICB6OiAwLFxuICAgICAgcGFuWDogMCxcbiAgICAgIHBhblk6IDAsXG4gICAgICBwYW5aOiAwLFxuICAgICAgb3V0OiBmYWxzZSxcbiAgICAgIHBhZ2U6IHRoaXMucHJvcHMucGFnZU51bWJlciB8fCAwLFxuICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICBkaXJlY3Rpb246IG51bGwsXG4gICAgICBoaWdobGlnaHQ6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucGFuICYmIHRoaXMucGFuLmRlc3Ryb3koKVxuICAgICR3aW4ub2ZmKCdrZXlkb3duJywgdGhpcy5vbktleSkub2ZmKCdrZXl1cCcsIHRoaXMub2ZmS2V5KVxuICAgIGlmICggZC5leGl0RnVsbHNjcmVlbiApXG4gICAgICBkLmV4aXRGdWxsc2NyZWVuKClcbiAgICBlbHNlIGlmICggZC5tc0NhbmNlbEZ1bGxzY3JlZW4gKVxuICAgICAgZC5tc0NhbmNlbEZ1bGxzY3JlZW4oKVxuICAgIGVsc2UgaWYgKCBkLm1vekNhbmNlbEZ1bGxTY3JlZW4gKVxuICAgICAgZC5tb3pDYW5jZWxGdWxsU2NyZWVuKClcbiAgICBlbHNlIGlmICggZC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuIClcbiAgICAgIGQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpXG5cbiAgICBkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCB0aGlzLm9uRnNDaGFuZ2UpXG4gICAgZC5yZW1vdmVFdmVudExpc3RlbmVyKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCB0aGlzLm9uRnNDaGFuZ2UpXG4gICAgZC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgdGhpcy5vbkZzQ2hhbmdlKVxuICAgIGQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIHRoaXMub25Gc0NoYW5nZSlcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgbm9kZSA9IHRoaXMuZ2V0RE9NTm9kZSgpXG4gICAgJHdpbi5vbigna2V5ZG93bicsIHRoaXMub25LZXkpLm9uKCdrZXl1cCcsIHRoaXMub2ZmS2V5KVxuXG4gICAgaWYgKCBub2RlLnJlcXVlc3RGdWxsc2NyZWVuIClcbiAgICAgIG5vZGUucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIGVsc2UgaWYgKCBub2RlLm1zUmVxdWVzdEZ1bGxzY3JlZW4gKVxuICAgICAgbm9kZS5tc1JlcXVlc3RGdWxsc2NyZWVuKClcbiAgICBlbHNlIGlmICggbm9kZS5tb3pSZXF1ZXN0RnVsbFNjcmVlbiApXG4gICAgICBub2RlLm1velJlcXVlc3RGdWxsU2NyZWVuKClcbiAgICBlbHNlIGlmICggbm9kZS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbiApXG4gICAgICBub2RlLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKClcblxuICAgIGQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIHRoaXMub25Gc0NoYW5nZSlcbiAgICBkLmFkZEV2ZW50TGlzdGVuZXIoJ01TRnVsbHNjcmVlbkNoYW5nZScsIHRoaXMub25Gc0NoYW5nZSlcbiAgICBkLmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCB0aGlzLm9uRnNDaGFuZ2UpXG4gICAgZC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgdGhpcy5vbkZzQ2hhbmdlKVxuXG4gICAgdGhpcy5pbml0aWFsaXplKClcblxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbWFnZSA9IHRoaXMucmVmcy5pbWFnZS5nZXRET01Ob2RlKClcbiAgICB0aGlzLmxvYWRJbWFnZShpbWFnZS5zcmMsIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxvYWRJbml0OiBmYWxzZSxcbiAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgIH0pXG5cbiAgICAgIHZhciBtID0gdGhpcy5nZXRNZWFzdXJlcygpXG5cbiAgICAgIHZhciBwYW4gPSB0aGlzLnBhbiA9IFBhbih0aGlzLnJlZnMucGFuLmdldERPTU5vZGUoKSwge1xuICAgICAgICBtb3VzZW1vdmU6IGZhbHNlLFxuICAgICAgICB4OiBNYXRoLm1pbigwLCBNYXRoLm1heCggLSh0aGlzLnByb3BzLngqbS5pdyksIC0obS5pdy1tLnd3KSkpLFxuICAgICAgICB5OiBNYXRoLm1pbigwLCBNYXRoLm1heCggLSh0aGlzLnByb3BzLnkqbS5paCksIC0obS5paC1tLndoKSkpXG4gICAgICB9KVxuICAgICAgcGFuLm9uUGFuKGZ1bmN0aW9uKHgseSx6KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHBhblg6IHgsXG4gICAgICAgICAgcGFuWTogeSxcbiAgICAgICAgICBwYW5aOiB6XG4gICAgICAgIH0pXG4gICAgICB9LmJpbmQodGhpcykpXG4gICAgfSlcbiAgfSxcblxuICBsb2FkSW1hZ2U6IGZ1bmN0aW9uKHNyYywgY2FsbGJhY2spIHtcbiAgICB2YXIgbG9hZGVyID0gbmV3IEltYWdlKClcbiAgICBsb2FkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIHt3aWR0aDogbG9hZGVyLndpZHRoLCBoZWlnaHQ6IGxvYWRlci5oZWlnaHR9KVxuICAgICAgbG9hZGVyID0gbnVsbFxuICAgIH0uYmluZCh0aGlzKVxuICAgIGxvYWRlci5zcmMgPSBzcmNcbiAgfSxcblxuICBnZXRNZWFzdXJlczogZnVuY3Rpb24oKSB7XG4gICAgdmFyICRpbWcgPSAkKHRoaXMucmVmcy5pbWFnZS5nZXRET01Ob2RlKCkpXG4gICAgdmFyIG8gPSB7XG4gICAgICB3aDogJHdpbi5oZWlnaHQoKSxcbiAgICAgIHd3OiAkd2luLndpZHRoKCksXG4gICAgICBpdzogJGltZy53aWR0aCgpLFxuICAgICAgaWg6ICRpbWcuaGVpZ2h0KClcbiAgICB9XG4gICAgby53aCA9IE1hdGgubWluKG8uaWgsIG8ud2gpXG4gICAgby53dyA9IE1hdGgubWluKG8uaXcsIG8ud3cpXG4gICAgby5jeCA9IChvLml3Ly0yKSsoby53dy8yKVxuICAgIG8uY3kgPSAoby5paC8tMikrKG8ud2gvMilcbiAgICBvLnJhdGlvID0gTWF0aC5taW4oby53dy9vLml3LCBvLndoL28uaWgpXG4gICAgcmV0dXJuIG9cbiAgfSxcblxuICBtb3ZlOiBmdW5jdGlvbihkaXJlY3Rpb24pIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5vdXQgfHwgIXRoaXMucGFuKVxuICAgICAgcmV0dXJuXG4gICAgaWYgKCB0eXBlb2YgZGlyZWN0aW9uID09ICdvYmplY3QnIClcbiAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbi5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXInKVxuICAgIGlmICggISgvXih1cHxkb3dufGxlZnR8cmlnaHQpJC8udGVzdChkaXJlY3Rpb24pKSApXG4gICAgICByZXR1cm5cbiAgICB2YXIgbSA9IHRoaXMuZ2V0TWVhc3VyZXMoKVxuICAgIHZhciB4ID0gdGhpcy5zdGF0ZS5wYW5YXG4gICAgdmFyIHkgPSB0aGlzLnN0YXRlLnBhbllcbiAgICBpZiAoIGRpcmVjdGlvbiA9PSAndXAnIClcbiAgICAgIHkgKz0gTU9WRVxuICAgIGlmICggZGlyZWN0aW9uID09ICdkb3duJyApXG4gICAgICB5IC09IE1PVkVcbiAgICBpZiAoIGRpcmVjdGlvbiA9PSAnbGVmdCcgKVxuICAgICAgeCArPSBNT1ZFXG4gICAgaWYgKCBkaXJlY3Rpb24gPT0gJ3JpZ2h0JyApXG4gICAgICB4IC09IE1PVkVcblxuICAgIHRoaXMucGFuLnNldFBvc2l0aW9uKFxuICAgICAgTWF0aC5taW4oMCwgTWF0aC5tYXgoeCwgLShtLml3LW0ud3cpKSksXG4gICAgICBNYXRoLm1pbigwLCBNYXRoLm1heCh5LCAtKG0uaWgtbS53aCkpKVxuICAgIClcbiAgfSxcblxuICBvbktleTogZnVuY3Rpb24oZSkge1xuICAgIGlmICggZS53aGljaCA9PSAyNyApe1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBWREQuY2xvc2Vab29tKClcbiAgICB9XG4gICAgaWYgKCBlLndoaWNoID09IDE3ICkgeyAvLyBjdHJsXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHRoaXMudHJhdmVsKCdwcmV2JylcbiAgICAgIHRoaXMua2V5UHJlc3MoJ3ByZXYnKVxuICAgIH1cbiAgICBpZiAoIGUud2hpY2ggPT0gMTggKSB7IC8vIGFsdFxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB0aGlzLnRyYXZlbCgnbmV4dCcpXG4gICAgICB0aGlzLmtleVByZXNzKCduZXh0JylcbiAgICB9XG4gICAgaWYgKCBlLndoaWNoID09IDM3ICkgeyAvLyBsZWZ0XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHRoaXMubW92ZSgnbGVmdCcpXG4gICAgICB0aGlzLmtleVByZXNzKCdsZWZ0JylcbiAgICB9XG4gICAgaWYgKCBlLndoaWNoID09IDM5ICkgeyAvLyByaWdodFxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB0aGlzLm1vdmUoJ3JpZ2h0JylcbiAgICAgIHRoaXMua2V5UHJlc3MoJ3JpZ2h0JylcbiAgICB9XG4gICAgaWYgKCBlLndoaWNoID09IDM4ICkgeyAvLyB1cFxuICAgICAgdGhpcy5tb3ZlKCd1cCcpXG4gICAgICB0aGlzLmtleVByZXNzKCd1cCcpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gICAgaWYgKCBlLndoaWNoID09IDQwICkgeyAvLyBkb3duXG4gICAgICB0aGlzLm1vdmUoJ2Rvd24nKVxuICAgICAgdGhpcy5rZXlQcmVzcygnZG93bicpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gICAgaWYgKCAoZS53aGljaCA9PSAxODcgfHwgZS53aGljaCA9PSAxNzEpICYmIHRoaXMuc3RhdGUub3V0KSB7IC8vICtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgdGhpcy5rZXlQcmVzcygncGx1cycpXG4gICAgICB0aGlzLnpvb20oKVxuICAgIH1cbiAgICBpZiAoIChlLndoaWNoID09IDE4OSB8fCBlLndoaWNoID09IDE3MykgJiYgIXRoaXMuc3RhdGUub3V0KSB7IC8vIC1cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgdGhpcy5rZXlQcmVzcygnbWludXMnKVxuICAgICAgdGhpcy56b29tKClcbiAgICB9XG4gICAgaWYgKCBlLndoaWNoID09IDMyICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy56b29tKClcbiAgICB9XG4gICAgaWYgKCBlLndoaWNoID09IDEzICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB0aGlzLnRvZ2dsZUhpZ2hsaWdodCgpXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGUud2hpY2gpXG4gIH0sXG5cbiAga2V5UHJlc3M6IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBkaXJlY3Rpb246IGRpcmVjdGlvbiB9KVxuICB9LFxuXG4gIG9mZktleTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBkaXJlY3Rpb246IGZhbHNlIH0pXG4gIH0sXG5cbiAgdHJhdmVsOiBmdW5jdGlvbih3aGVyZSkge1xuICAgIGlmICggIXRoaXMucGFuIHx8IHRoaXMuc3RhdGUubG9hZGluZyApXG4gICAgICByZXR1cm5cbiAgICB2YXIgcGFnZXMgPSBtb2RlbHMuZGV0YWlsLmdldElzc3VlTGlzdCgpXG5cbiAgICBpZiAoIHR5cGVvZiB3aGVyZSA9PSAnb2JqZWN0JyApXG4gICAgICB3aGVyZSA9IHdoZXJlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWRpcicpXG4gICAgaWYgKCAhKC9eKHByZXZ8bmV4dCkkLy50ZXN0KHdoZXJlKSkgKVxuICAgICAgcmV0dXJuXG5cbiAgICB2YXIgbiA9IHRoaXMuc3RhdGUucGFnZVxuICAgIGlmICggd2hlcmUgPT0gJ25leHQnICYmIG4gPCBwYWdlcy5sZW5ndGggLSAxIClcbiAgICAgIG4rK1xuICAgIGVsc2UgaWYgKCB3aGVyZSA9PSAncHJldicgJiYgbiApXG4gICAgICBuLS1cbiAgICBlbHNlXG4gICAgICByZXR1cm5cbiAgICB2YXIgaW1hZ2UgPSBwYWdlc1sgbiBdXG4gICAgaWYgKCAhaW1hZ2UgKVxuICAgICAgcmV0dXJuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSlcbiAgICB0aGlzLmxvYWRJbWFnZShpbWFnZS5fc291cmNlWydAaWQnXSsnLmpwZycsIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFxuICAgICAgICBwYWdlOiBuLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgfSlcbiAgICB9KVxuICAgIGlmICggdGhpcy5zdGF0ZS5vdXQgJiYgdGhpcy5wYW4gKSB7XG4gICAgICB2YXIgbSA9IHRoaXMuZ2V0TWVhc3VyZXMoKVxuICAgICAgdGhpcy5wYW4uc2V0UG9zaXRpb24obS5jeCwgbS5jeSwgbS5yYXRpbylcbiAgICB9IFxuICB9LFxuXG4gIHpvb206IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICBpZiAoICF0aGlzLnBhbiApXG4gICAgICByZXR1cm5cbiAgICB2YXIgbSA9IHRoaXMuZ2V0TWVhc3VyZXMoKVxuICAgIGlmICggdGhpcy5zdGF0ZS5vdXQgKSB7XG4gICAgICBpZiAoIHggKVxuICAgICAgICB4ID0gLShtLml3ICogKHgvbS5pdykpXG4gICAgICBpZiAoIHkgKVxuICAgICAgICB5ID0gLShtLmloICogKHkvbS5paCkpXG4gICAgICB4ID0gTWF0aC5taW4oMCwgTWF0aC5tYXgoeCwgbS53dy1tLml3KSlcbiAgICAgIHkgPSBNYXRoLm1pbigwLCBNYXRoLm1heCh5LCBtLndoLW0uaWgpKVxuICAgICAgdGhpcy5wYW4uc2V0UG9zaXRpb24oeCwgeSwgMSlcbiAgICAgIHRoaXMucGFuLmVuYWJsZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFuLnNldFBvc2l0aW9uKFxuICAgICAgICBNYXRoLm1pbigwLCBNYXRoLm1heChtLmN4LCBtLnd3LW0uaXcpKSxcbiAgICAgICAgTWF0aC5taW4oMCwgTWF0aC5tYXgobS5jeSwgbS53aC1tLmloKSksXG4gICAgICAgIG0ucmF0aW9cbiAgICAgIClcbiAgICAgIHRoaXMucGFuLmRpc2FibGUoKVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG91dDogIXRoaXMuc3RhdGUub3V0XG4gICAgfSlcbiAgfSxcblxuICB6b29tQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZygnem9vbWNsaWNrJywgZSlcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB2YXIgZGlyID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXInKVxuICAgIGlmICggKHRoaXMuc3RhdGUub3V0ICYmIGRpciA9PSAnbWludXMnKSB8fCAoIXRoaXMuc3RhdGUub3V0ICYmIGRpciA9PSAncGx1cycpIClcbiAgICAgIHJldHVyblxuICAgIHRoaXMuem9vbSgpXG4gIH0sXG5cbiAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgIFZERC5jbG9zZVpvb20oKVxuICB9LFxuXG4gIG9uRnNDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZygnSEVSRSEnKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBpZiggIShcbiAgICAgICAgZC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgICBkLm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XG4gICAgICAgIGQubXNGdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgICBkLmZ1bGxzY3JlZW5FbGVtZW50XG4gICAgICApICkge1xuICAgICAgdGhpcy5jbG9zZSgpXG4gICAgfVxuICB9LFxuXG4gIGRibENsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgaWYgKCB0aGlzLnN0YXRlLm91dCApIHtcbiAgICAgIHZhciB4XG4gICAgICB2YXIgeVxuICAgICAgdmFyIG9mZnNldCA9ICQoZS50YXJnZXQpLm9mZnNldCgpXG4gICAgICB4ID0gZS5jbGllbnRYICsgZC5ib2R5LnNjcm9sbExlZnQgKyBkLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IC0gTWF0aC5mbG9vcihvZmZzZXQubGVmdClcbiAgICAgIHkgPSBlLmNsaWVudFkgKyBkLmJvZHkuc2Nyb2xsVG9wICArIGQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAgLSBNYXRoLmZsb29yKG9mZnNldC50b3ApICsgMVxuICAgICAgdGhpcy56b29tKHgseSlcbiAgICB9XG4gICAgZWxzZVxuICAgICAgdGhpcy56b29tKClcbiAgfSxcblxuICB0b2dnbGVIaWdobGlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBoaWdobGlnaHQ6ICF0aGlzLnN0YXRlLmhpZ2hsaWdodCB9KVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgcGFnZXMgPSBtb2RlbHMuZGV0YWlsLmdldElzc3VlTGlzdCgpXG4gICAgdmFyIGhpZ2hsaWdodHMgPSB0aGlzLnByb3BzLmhpZ2hsaWdodHNcbiAgICB2YXIgcGFnZSA9IHBhZ2VzWyB0aGlzLnN0YXRlLnBhZ2UgXVxuICAgIHZhciBoaWdobGlnaHRzID0gdGhpcy5wcm9wcy5oaWdobGlnaHRzWyB0aGlzLnN0YXRlLnBhZ2UgXVxuICAgIHZhciBzY2FsZSA9ICdzY2FsZSgnK3RoaXMuc3RhdGUucGFuWisnLCcrdGhpcy5zdGF0ZS5wYW5aKycpJ1xuXG4gICAgdmFyIGltZ1N0eWxlID0ge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSxcbiAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IHNjYWxlLFxuICAgICAgJy1tcy10cmFuc2Zvcm0nOiBzY2FsZVxuICAgIH1cblxuICAgIGlmICggdGhpcy5zdGF0ZS5sb2FkaW5nIClcbiAgICAgIGltZ1N0eWxlLm9wYWNpdHkgPSAwLjNcblxuICAgIHZhciBpbWFnZSA9IHBhZ2UgP1xuICAgICAgUmVhY3QuRE9NLmltZyh7c3JjOiAgcGFnZS5fc291cmNlWydAaWQnXSsnLmpwZycsIHJlZjogXCJpbWFnZVwiLCBzdHlsZTogaW1nU3R5bGUsIG9uRHJhZzogcmV0ZmFsc2V9KSA6IG51bGxcblxuICAgIHZhciBoaWdobGlnaHQgPSB0aGlzLnN0YXRlLmhpZ2hsaWdodCAmJiBoaWdobGlnaHRzICYmIGhpZ2hsaWdodHMubGVuZ3RoICYmICF0aGlzLnN0YXRlLmxvYWRpbmcgP1xuICAgICAgUmVhY3QuRE9NLmltZyh7Y2xhc3NOYW1lOiBcImhpZ2hsaWdodFwiLCBzcmM6ICBwYWdlLl9zb3VyY2VbJ0BpZCddKydfaGl0cy5zdmc/aD0nK2hpZ2hsaWdodHMuam9pbignLCcpLCByZWY6IFwiaGlnaGxpZ2h0XCIsIHN0eWxlOiBpbWdTdHlsZSwgb25EcmFnOiByZXRmYWxzZX0pIDogbnVsbFxuXG4gICAgdmFyIHBhblN0eWxlID0gdHJhbnNsYXRlM2QgPyBcbiAgICAgIHsgXG4gICAgICAgIFdlYmtpdFRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKCcrdGhpcy5zdGF0ZS5wYW5YKydweCwnK3RoaXMuc3RhdGUucGFuWSsncHgsMCknLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgnK3RoaXMuc3RhdGUucGFuWCsncHgsJyt0aGlzLnN0YXRlLnBhblkrJ3B4LDApJ1xuICAgICAgfSA6IHsgdG9wOiB0aGlzLnN0YXRlLnBhblksIGxlZnQ6IHRoaXMuc3RhdGUucGFuWCB9XG5cblxuICAgIHZhciBkaXJDbGFzcyA9IHRoaXMuc3RhdGUub3V0ID8gJ2Rpc2FibGVkJyA6ICcnXG4gICAgdmFyIGtleUNsYXNzID0gJ2tleXMgJyt0aGlzLnN0YXRlLmRpcmVjdGlvblxuICAgIHZhciBuZXh0Q2xhc3MgPSB0aGlzLnN0YXRlLnBhZ2UgPT0gcGFnZXMubGVuZ3RoLTEgPyAnZGlzYWJsZWQnIDogJydcbiAgICB2YXIgcHJldkNsYXNzID0gIXRoaXMuc3RhdGUucGFnZSA/ICdkaXNhYmxlZCcgOiAnJ1xuICAgIHZhciBobENsYXNzID0gKCFoaWdobGlnaHRzIHx8ICFoaWdobGlnaHRzLmxlbmd0aCkgPyAnZGlzYWJsZWQnIDogKHRoaXMuc3RhdGUuaGlnaGxpZ2h0ID8gJ2FjdGl2ZScgOiAnJylcblxuICAgIHZhciB0aXRsZSA9ICcnXG4gICAgdmFyIGRhdGUgPSAnJ1xuICAgIHZhciBpc3N1ZSA9IG1vZGVscy5kZXRhaWwuZ2V0SXNzdWUoKVxuICAgIGlmICggaXNzdWUgKSB7XG4gICAgICB2YXIgZmlyc3QgPSBtb2RlbHMuZGV0YWlsLmdldElzc3VlTGlzdCgpWzBdXG4gICAgICBpZiAoIGZpcnN0ICkge1xuICAgICAgICB0aXRsZSA9IFZERC5jYXBpdGFsaXplKGZpcnN0Ll9zb3VyY2UubmV3c3BhcGVyLnRpdGxlKVxuICAgICAgICBkYXRlID0gZGF0ZSB8fCBmaXJzdC5fc291cmNlLmlzc3VlLmlzc3VlZFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtpZDogXCJ6b29tXCIsIG9uU2VsZWN0OiByZXRmYWxzZX0sIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwibWV0YVwifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLnNwYW4oe2NsYXNzTmFtZTogXCJ0aXRsZVwifSwgdGl0bGUpLCBcbiAgICAgICAgICBSZWFjdC5ET00uc3Bhbih7Y2xhc3NOYW1lOiBcImRhdGVcIn0sIGRhdGUpXG4gICAgICAgICksIFxuICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHtjbGFzc05hbWU6IFwiY2xvc2VcIiwgb25DbGljazogVkRELmNsb3NlWm9vbX0sIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtdGltZXNcIn0pKSwgXG4gICAgICAgIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwic3Bpbm5lciBsaWdodFwiLCByZWY6IFwic3Bpbm5lclwifSksIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtyZWY6IFwicGFuXCIsIHN0eWxlOiBwYW5TdHlsZSwgb25Eb3VibGVDbGljazogdGhpcy5kYmxDbGljaywgY2xhc3NOYW1lOiBcImltYWdlc1wifSwgXG4gICAgICAgICAgaW1hZ2UsIFxuICAgICAgICAgIGhpZ2hsaWdodFxuICAgICAgICApLCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBrZXlDbGFzc30sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJkaXJlY3Rpb25zXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oe29uQ2xpY2s6IHRoaXMubW92ZSwgY2xhc3NOYW1lOiBkaXJDbGFzcywgJ2RhdGEtZGlyJzogXCJ1cFwifSwgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1jYXJldC11cFwifSkpLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oe29uQ2xpY2s6IHRoaXMubW92ZSwgY2xhc3NOYW1lOiBkaXJDbGFzcywgJ2RhdGEtZGlyJzogXCJsZWZ0XCJ9LCBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBcImZhIGZhLWNhcmV0LWxlZnRcIn0pKSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHtvbkNsaWNrOiB0aGlzLm1vdmUsIGNsYXNzTmFtZTogZGlyQ2xhc3MsICdkYXRhLWRpcic6IFwiZG93blwifSwgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1jYXJldC1kb3duXCJ9KSksIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7b25DbGljazogdGhpcy5tb3ZlLCBjbGFzc05hbWU6IGRpckNsYXNzLCAnZGF0YS1kaXInOiBcInJpZ2h0XCJ9LCBSZWFjdC5ET00uaSh7Y2xhc3NOYW1lOiBcImZhIGZhLWNhcmV0LXJpZ2h0XCJ9KSlcbiAgICAgICAgICApLCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiem9vbVwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHtvbkNsaWNrOiB0aGlzLnpvb21DbGljaywgY2xhc3NOYW1lOiAhdGhpcy5zdGF0ZS5vdXQgPyAnZGlzYWJsZWQnIDogJycsICdkYXRhLWRpcic6IFwicGx1c1wifSwgUmVhY3QuRE9NLmkoe2NsYXNzTmFtZTogXCJmYSBmYS1wbHVzXCJ9KSksIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7b25DbGljazogdGhpcy56b29tQ2xpY2ssIGNsYXNzTmFtZTogdGhpcy5zdGF0ZS5vdXQgPyAnZGlzYWJsZWQnIDogJycsICdkYXRhLWRpcic6IFwibWludXNcIn0sIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtbWludXNcIn0pKVxuICAgICAgICAgICksIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJuYXZcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7b25DbGljazogdGhpcy50cmF2ZWwsIGNsYXNzTmFtZTogcHJldkNsYXNzLCAnZGF0YS1kaXInOiBcInByZXZcIn0sIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtYW5nbGUtZG91YmxlLWxlZnRcIn0pKSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwicGFnZXNcIn0sIFwiU2lkYSBcIiwgUmVhY3QuRE9NLnN0cm9uZyh7Y2xhc3NOYW1lOiBcInBhZ2VcIn0sIHRoaXMuc3RhdGUucGFnZSsxKSwgXCIgYXYgXCIsIFJlYWN0LkRPTS5zdHJvbmcobnVsbCwgcGFnZXMubGVuZ3RoKSksIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7b25DbGljazogdGhpcy50cmF2ZWwsIGNsYXNzTmFtZTogbmV4dENsYXNzLCAnZGF0YS1kaXInOiBcIm5leHRcIn0sIFJlYWN0LkRPTS5pKHtjbGFzc05hbWU6IFwiZmEgZmEtYW5nbGUtZG91YmxlLXJpZ2h0XCJ9KSlcbiAgICAgICAgICApLCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiaGxcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7b25DbGljazogdGhpcy50b2dnbGVIaWdobGlnaHQsIGNsYXNzTmFtZTogaGxDbGFzc30sIFwi4pagXCIpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICB9XG59KSIsInZhciBBcHBDb21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvYXBwJylcbnZhciBMaXBzdW0gPSByZXF1aXJlKCdhaW5vanMvbGlwc3VtJylcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbnZhciBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJylcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCd2ZGQvcm91dGVyJylcbnZhciBRdWVyeSA9IHJlcXVpcmUoJ3ZkZC9xdWVyeScpXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKVxudmFyIG1vZGVscyA9IHJlcXVpcmUoJ3ZkZC9tb2RlbHMnKVxudmFyIFZERCA9IHJlcXVpcmUoJ3ZkZC92ZGQnKVxudmFyIEVhc2luZyA9IHJlcXVpcmUoJ2Fpbm9qcy9lYXNpbmcnKVxudmFyIFBpd2lrID0gcmVxdWlyZSgndmRkL3Bpd2lrJylcblxuLy8gc2hpbXNcbnJlcXVpcmUoJy4vYmFja2JvbmUucXVlcnlwYXJhbXMtMS4xLXNoaW0nKVxuXG5SZWFjdC5pbml0aWFsaXplVG91Y2hFdmVudHModHJ1ZSlcblxuQmFja2JvbmUuJCA9ICRcblxuJC5lYXNpbmcudmRkID0gRWFzaW5nKCdlYXNlSW5PdXRRdWFydCcpXG5cblBpd2lrLmluaXQoKVxuXG52YXIgQXBwXG5cbi8qIERFQlVHXG53aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAkKCcjbW9kYWwtd3JhcHBlcicpLnNob3coKTtcbiAgJCgnI2JhY2tkcm9wJykuY3NzKCdvcGFjaXR5JywgMSlcbiAgJCgnI2xvYWRsYXllcicpLmhpZGUoKVxuICAkKCcjbW9kYWwnKS5jc3Moe1xuICAgIHdpZHRoOiA1MDAsXG4gICAgaGVpZ2h0OiAzMDAsXG4gICAgbWFyZ2luTGVmdDogLTI1MCxcbiAgICBvcGFjaXR5OjFcbiAgfSlcbiAgdmFyIGVyciA9ICtBcnJheS5wcm90b3R5cGUuam9pbi5jYWxsKGFyZ3VtZW50cywgJ1xcbicpXG4gICQoJyNtb2RhbC1jb250ZW50JykuYWRkQ2xhc3MoJ2Vycm9yJykuaHRtbChcIjxoMz5Ib3Bwc2FuITwvaDM+PHA+RXR0IGZlbCBoYXIgdXBwc3TDpXR0IGkgcHJvZ3JhbW1ldCBvY2ggZHUgbcOlc3RlIGxhZGRhIG9tIHNpZGFuLjwvcD5cIitcbiAgICBcIjxidXR0b24gb25jbGljaz0nd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpJz5MYWRkYSBvbTwvYnV0dG9uPjx0ZXh0YXJlYT5ERUJVRzogXCIrZXJyK1wiPC90ZXh0YXJlYT5cIilcbiAgdHJhY2tFdmVudCgnQXBwbGljYXRpb24nLCAnRXJyb3InLCBlcnIpXG4gIHJldHVybiBmYWxzZVxufVxuKi9cblxudmFyIGNhY2hlID0ge31cblxuLy8gcXVlcnkgY2FjaGVcbnZhciBoYXNDaGFuZ2VkID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgY2hhbmdlZCA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHZhciB2YWwgPSBRdWVyeS5nZXQoa2V5KSxcbiAgICAgICAgaGFzID0gY2FjaGUuaGFzT3duUHJvcGVydHkoa2V5KVxuICAgIGlmICggKCBoYXMgJiYgY2FjaGVba2V5XSA9PT0gdmFsICkgfHwgKCB0eXBlb2YgdmFsID09ICd1bmRlZmluZWQnICYmICFoYXMgKSApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBjYWNoZVtrZXldID0gdmFsXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGtleXMgPSAkLm1ha2VBcnJheShhcmd1bWVudHMpXG4gICAgZm9yKCB2YXIgaT0wOyBpPGtleXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiAoIGNoYW5nZWQoa2V5c1tpXSkgKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufSgpKVxuXG4vLyBDcmVhdGUgYSBsaXN0IG9mIHF1ZXJ5c3RyaW5nIHRvIGxpc3RlbiB0b1xudmFyIHdhdGNoYWJsZXMgPSBbICdxJywgJ2Zyb20nLCAndG8nLCAnbmV3c3BhcGVyJywgJ3BhZ2UnLCAnZnJlZW9ubHknLCAnc29ydCcgXVxuLy8gTWFrZSBzdXJlIG5vIHdhdGNoYWJsZXMgYXJlIHRocm93biBvdXQgb2YgY2FjaGUgXG53YXRjaGFibGVzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gIGNhY2hlW2tleV0gPSB1bmRlZmluZWRcbn0pXG5cbndpbmRvdy5SdW4gPSBmdW5jdGlvbigpIHtcblxuICAvLyBjcmVhdGUgdGhlIHRvcC1sZXZlbCByZWFjdCBhcHBcbiAgQXBwID0gUmVhY3QucmVuZGVyQ29tcG9uZW50KEFwcENvbXBvbmVudCgpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpXG5cbiAgLy8gbG9hZCB1c2VyIG1vZGVsIGZyb20gdGVtcGxhdGUgZGF0YSBpZiBsb2dnZWQgaW5cbiAgaWYgKCB0eXBlb2Ygd2luZG93LlVTRVIgPT0gJ29iamVjdCcgKSB7XG4gICAgbW9kZWxzLnVzZXIuc2V0VXNlcihVU0VSKVxuICAgIGRlbGV0ZSB3aW5kb3cuVVNFUlxuICB9XG5cbiAgLy8gc3RhcnQgcm91dGVyXG4gIFJvdXRlci5vbigncm91dGUnLCBmdW5jdGlvbih1cmwsIHBhcmFtcykge1xuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSAnYXBwLScrdXJsXG5cbiAgICAvLyBEbyB0aGUgZGF0YSBBUEnigJlzIGJhc2VkIG9uIFVSTFMgYW5kIGluamVjdCBpbnRvIEJhY2tib25lXG4gICAgLy8gVGhlIEFwcCB3aWxsIGxpc3RlbiB0byBhbGwgYmFja2JvbmUgY2hhbmdlcyBhbmQgdXBkYXRlIHRoZSBpbnRlcmZhY2UgYWNjb3JkaW5nbHlcbiAgICBcbiAgICBRdWVyeS5zeW5jKClcblxuICAgIFBpd2lrLmVuYWJsZUxpbmtUcmFja2luZygpXG4gICAgUGl3aWsudHJhY2tQYWdlVmlldygpXG5cbiAgICBpZiAoIHVybCA9PSAnaG9tZSAnKSB7XG4gICAgICAvLyBHZXQgc29tZSBpbml0aWFsIGRhdGEsIGxpa2UgZGF0ZSBzcGFuIGFuZCBhbGwgbmV3c3BhcGVyc1xuICAgICAgLy8gTm90IG5lZWRlZCBhdCB0aGUgbW9tZW50XG4gICAgICAvLyBpZiggIVF1ZXJ5LmdldCgncScpICkge1xuICAgICAgLy8gICAkLmdldCgnL3N0YXRpYy9zdGF0cy5qc29uJywgZnVuY3Rpb24odGhpbmdzKSB7XG4gICAgICAvLyAgICAgbW9kZWxzLnJlc3VsdHMucmVzZXQodGhpbmdzLmhpdHMuaGl0cylcbiAgICAgIC8vICAgICBtb2RlbHMucmVzcG9uc2VkYXRhLnNldCggeyBcbiAgICAgIC8vICAgICAgIGhpdHM6IHRoaW5ncy5oaXRzLnRvdGFsLFxuICAgICAgLy8gICAgICAgdG9wc2NvcmU6IHRoaW5ncy5oaXRzLm1heF9zY29yZSxcbiAgICAgIC8vICAgICAgIGZhY2V0czogdGhpbmdzLmZhY2V0cyxcbiAgICAgIC8vICAgICAgIGZpcnN0UnVuOiB0cnVlXG4gICAgICAvLyAgICAgfSApXG4gICAgICAvLyAgIH0pXG4gICAgICAvLyB9XG4gICAgfSBlbHNlIGlmICggKHVybCA9PSAnc2VhcmNoJyB8fCB1cmwgPT0gJ2RldGFpbCcpICYmIHBhcmFtcyAmJiBwYXJhbXNbMF0gKSB7XG5cbiAgICAgIGlmICggUXVlcnkuZ2V0KCdxJykgPT0gJzpmYXZvdXJpdGVzJyApIHtcbiAgICAgICAgY2FjaGVbJ3EnXSA9ICc6ZmF2b3VyaXRlcydcbiAgICAgICAgaWYgKCAhbW9kZWxzLnVzZXIuZ2V0KCd1c2VybmFtZScpIClcbiAgICAgICAgICByZXR1cm4gUm91dGVyLm5hdmlnYXRlKCcvJywgdHJ1ZSlcbiAgICAgICAgdmFyIGZhdnMgPSBtb2RlbHMudXNlci5nZXQoJ3VzZXJkYXRhJykuZmF2b3VyaXRlc1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwwKVxuICAgICAgICAvLyBtYW51YWxseSBzb3J0IGluIG1vZGVsXG4gICAgICAgIGZhdnMgPSBfLnNvcnRCeShmYXZzLCBmdW5jdGlvbihmYXYpIHtcbiAgICAgICAgICByZXR1cm4gLWZhdi5kYXRlXG4gICAgICAgIH0pXG4gICAgICAgIG1vZGVscy5yZXN1bHRzLnJlc2V0KCBmYXZzIClcbiAgICAgICAgbW9kZWxzLnJlc3BvbnNlZGF0YS5zZXQoe1xuICAgICAgICAgIGhpdHM6IGZhdnMubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIC8vIFN5bmMgcXVlcnkgc3RyaW5nIHdpdGggZXhpc3RpbmcgcGFyYW1ldGVycyBhbmQgbGlzdGVuIGZvciBjaGFuZ2VzXG4gICAgICBlbHNlIGlmICggaGFzQ2hhbmdlZC5hcHBseSggbnVsbCwgd2F0Y2hhYmxlcyApICkge1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NOYW1lID0gJ2xvYWRpbmcnXG4gICAgICAgICQuZ2V0KCcvYXBpL2pzb24nICsgUXVlcnkuYnVpbGQoIHdhdGNoYWJsZXMgKSwgZnVuY3Rpb24odGhpbmdzKSB7XG4gICAgICAgICAgX3BhcS5wdXNoKFsndHJhY2tTaXRlU2VhcmNoJywgUXVlcnkuZ2V0KCdxJyksIGZhbHNlLCB0aGluZ3MuaGl0cy50b3RhbF0pXG4gICAgICAgICAgbW9kZWxzLnJlc3VsdHMucmVzZXQodGhpbmdzLmhpdHMuaGl0cylcbiAgICAgICAgICBtb2RlbHMucmVzcG9uc2VkYXRhLnNldCggeyBcbiAgICAgICAgICAgIGhpdHM6IHRoaW5ncy5oaXRzLnRvdGFsLFxuICAgICAgICAgICAgdG9wc2NvcmU6IHRoaW5ncy5oaXRzLm1heF9zY29yZSxcbiAgICAgICAgICAgIGZhY2V0czogdGhpbmdzLmZhY2V0cyxcbiAgICAgICAgICAgIGZpcnN0UnVuOiBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTmFtZSA9ICcnXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGlmICggdXJsID09ICdzZWFyY2gnICkge1xuICAgICAgICB2YXIgbWFzb25yeSA9IFZERC5nZXRNYXNvbnJ5KClcbiAgICAgICAgbWFzb25yeSAmJiBtYXNvbnJ5LnJlc2V0KClcbiAgICAgIH1cblxuICAgICAgaWYgKCB1cmwgPT0gJ2RldGFpbCcgKSB7XG4gICAgICAgIHZhciBwYWdlSWQgPSBWREQuYnVpbGRQZXJtYUxpbmsocGFyYW1zKVxuICAgICAgICBpZiAoIHBhZ2VJZCApIHtcbiAgICAgICAgICB2YXIgaXNzdWVJZCA9IHBhZ2VJZC5zcGxpdCgnLycpLnNsaWNlKDAsIDUpLmpvaW4oJy8nKVxuICAgICAgICAgIHZhciBpc3N1ZSA9ICdpc3N1ZS5AaWQ6XCInICsgaXNzdWVJZCArICdcIidcbiAgICAgICAgICB2YXIgcSA9IFF1ZXJ5LmdldCgncScpXG4gICAgICAgICAgaWYgKCBxID09ICc6ZmF2b3VyaXRlcycgKSB7XG4gICAgICAgICAgICB2YXIgZmF2ID0gXy5maW5kV2hlcmUobW9kZWxzLnVzZXIuZ2V0KCd1c2VyZGF0YScpLmZhdm91cml0ZXMsIHsgdXJsOiBWREQucGFyc2VQZXJtYUxpbmsocGFnZUlkKSB9KVxuICAgICAgICAgICAgaWYgKCBmYXYgKSB7XG4gICAgICAgICAgICAgIHEgPSBmYXYucXVlcnkucVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFJvdXRlci5uYXZpZ2F0ZSgnLz9xPTpmYXZvdXJpdGVzJywgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcSA9IHEgfHwgJyonXG4gICAgICAgICAgJC53aGVuKFxuICAgICAgICAgICAgJC5nZXRKU09OKCcvYXBpL2pzb24/c29ydD1UcnVlJnE9JyArIHEgKyAnKycgKyBpc3N1ZSksXG4gICAgICAgICAgICAkLmdldEpTT04oJy9hcGkvanNvbj9zb3J0PVRydWUmbj0xMDAwJnE9JyArIGlzc3VlKVxuICAgICAgICAgICAgLy8kLmdldEpTT04oJy9hcGkvanNvbj9xPScgKyBxICsgJysnICsgaXNzdWUpLFxuICAgICAgICAgICAgLy8kLmdldEpTT04oJy9hcGkvanNvbj9uPTEwMDAmcT0nICsgaXNzdWUpXG4gICAgICAgICAgKS5kb25lKGZ1bmN0aW9uKGhpdHMsIGlzc3VlKSB7XG4gIFxuICAgICAgICAgICAgLy8gdGVtcCBzb3J0aW5nIFRPRE86IE5ZIHNvZmZhXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgdmFyIHJlZyA9IC9cXC9wYXJ0XFwvKFtcXGRdKylcXC9wYWdlXFwvKFtcXGRdKykkL1xuICAgICAgICAgICAgdmFyIHNvcnQgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgIGEgPSBhLl9zb3VyY2VbJ0BpZCddLm1hdGNoKHJlZylcbiAgICAgICAgICAgICAgYiA9IGIuX3NvdXJjZVsnQGlkJ10ubWF0Y2gocmVnKVxuICAgICAgICAgICAgICBhWzFdID0gcGFyc2VJbnQoYVsxXSlcbiAgICAgICAgICAgICAgYVsyXSA9IHBhcnNlSW50KGFbMl0pXG4gICAgICAgICAgICAgIGJbMV0gPSBwYXJzZUludChiWzFdKVxuICAgICAgICAgICAgICBiWzJdID0gcGFyc2VJbnQoYlsyXSlcblxuICAgICAgICAgICAgICBpZiAoIGFbMV0gPiBiWzFdIHx8IGFbMl0gPiBiWzJdICkgcmV0dXJuIDFcbiAgICAgICAgICAgICAgaWYgKCBhWzFdIDwgYlsxXSB8fCBhWzJdIDwgYlsyXSApIHJldHVybiAtMVxuICAgICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpc3N1ZVswXS5oaXRzLmhpdHMuc29ydChzb3J0KVxuICAgICAgICAgICAgKi8gIFxuICAgICAgICAgICAgbW9kZWxzLmRldGFpbC5zZXQoe1xuICAgICAgICAgICAgICBoaXRzOiBoaXRzWzBdLFxuICAgICAgICAgICAgICBpc3N1ZTogaXNzdWVbMF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIHVybCA9PSAnZmF2b3VyaXRlcycgKSB7XG4gICAgICBtb2RlbHMuZmF2b3VyaXRlcy5yZXNldChtb2RlbHMudXNlci5nZXQoJ3VzZXJkYXRhJykuZmF2b3VyaXRlcylcbiAgICB9XG5cbiAgICBBcHAuc2V0U3RhdGUoeyBcbiAgICAgIHVybDogdXJsLCBcbiAgICAgIHVybFBhcmFtczogcGFyYW1zIHx8IFtdIFxuICAgIH0pXG5cbiAgICAvLyBFeHBvc2UgQXBwIHRvIFZERFxuICAgIFZERC5zZXRBcHAoQXBwKVxuXG4gIH0pXG5cbiAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCh7cHVzaFN0YXRlOiB0cnVlfSlcbiAgXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgJ2QzJzoge1xuICAgICdkZWNpbWFsJzogJy4nLFxuICAgICd0aG91c2FuZHMnOiAnLCcsXG4gICAgJ2dyb3VwaW5nJzogWzNdLFxuICAgICdjdXJyZW5jeSc6IFsnJywgJ1NFSyddLFxuICAgICdkYXRlVGltZSc6ICclYSAlYiAlZSAlWCAlWScsXG4gICAgJ2RhdGUnOiAnJVktJW0tJWQnLFxuICAgICd0aW1lJzogJyVIOiVNOiVTJyxcbiAgICAncGVyaW9kcyc6IFtdLFxuICAgICdkYXlzJzogWydTw7ZuZGFnJywgJ03DpW5kYWcnLCAnVGlzZGFnJywgJ09uc2RhZycsICdUb3JzZGFnJywgJ0ZyZWRhZycsICdMw7ZyZGFnJ10sXG4gICAgJ3Nob3J0RGF5cyc6IFsnU8O2bicsICdNw6VuJywgJ1RpcycsICdPbnMnLCAnVG9yJywgJ0ZyZScsICdMw7ZyJ10sXG4gICAgJ21vbnRocyc6IFsnSmFudWFyaScsICdGZWJydWFyaScsICdNYXJzJywgJ0FwcmlsJywgJ01haicsICdKdW5pJywgJ0p1bGknLCAnQXVndXN0aScsICdTZXB0ZW1iZXInLCAnT2t0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddLFxuICAgICdzaG9ydE1vbnRocyc6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01haicsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2t0JywgJ05vdicsICdEZWMnXVxuICB9LFxuICAncGlrYWRheSc6IHtcbiAgICAgICdwcmV2aW91c01vbnRoJyA6ICdGw7ZyZWcuIG3DpW5hZCcsXG4gICAgICAnbmV4dE1vbnRoJyAgICAgOiAnTsOkc3RhIG3DpW5hZCcsXG4gICAgICAnbW9udGhzJyAgICAgICAgOiBbJ0phbnVhcmknLCAnRmVicnVhcmknLCAnTWFycycsICdBcHJpbCcsICdNYWonLCAnSnVuaScsICdKdWxpJywgJ0F1Z3VzdGknLCAnU2VwdGVtYmVyJywgJ09rdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXSxcbiAgICAgICd3ZWVrZGF5cycgICAgICA6IFsnU8O2bmRhZycsICdNw6VuZGFnJywgJ1Rpc2RhZycsICdPbnNkYWcnLCAnVG9yc2RhZycsICdGcmVkYWcnLCAnTMO2cmRhZyddLFxuICAgICAgJ3dlZWtkYXlzU2hvcnQnIDogWydTw7ZuJywgJ03DpW4nLCAnVGlzJywgJ09ucycsICdUb3InLCAnRnJlJywgJ0zDtnInXVxuICB9XG59IiwidmFyICQgPSByZXF1aXJlKCdqcXVlcnknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsZW0sIG9wdGlvbnMpIHtcblxuICBvcHRpb25zID0gJC5leHRlbmQoe1xuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBndXR0ZXI6IG51bGwsXG4gICAgICBvbmJyaWNrOiAkLm5vb3BcbiAgfSwgb3B0aW9ucyApXG5cbiAgdmFyICRlbGVtID0gJChlbGVtKVxuXG4gIGlmICggJGVsZW0uZGF0YSgnbWFzb25yeScpICkgXG4gICAgcmV0dXJuICRlbGVtLmRhdGEoJ21hc29ucnknKVxuXG4gIHZhciBjYWxjdWxhdGVNYXRyaXggPSBmdW5jdGlvbigpIHtcbiAgICBcbiAgICB2YXIgJGJyaWNrcyA9ICRlbGVtLmNoaWxkcmVuKClcbiAgICB2YXIgd2lkdGggPSAkZWxlbS53aWR0aCgpXG4gICAgdmFyIGJyaWNrV2lkdGggPSBvcHRpb25zLndpZHRoIHx8ICRicmlja3MuZXEoMCkub3V0ZXJXaWR0aCgpXG4gICAgdmFyIGd1dHRlciA9IG9wdGlvbnMuZ3V0dGVyIHx8ICRicmlja3MuZXEoMCkub3V0ZXJXaWR0aCh0cnVlKSAtIGJyaWNrV2lkdGhcbiAgICB2YXIgY29sQ291bnQgPSBNYXRoLmZsb29yKCB3aWR0aCAvIChicmlja1dpZHRoK2d1dHRlcikgKVxuICAgIHZhciBjb2xIZWlnaHQgPSBbXVxuICAgIHZhciBtYXRyaXggPSBbXVxuICAgIHZhciBpID0gMFxuICAgIHZhciB0aGlzQ29sID0gMFxuICAgIHZhciB0aGlzUm93ID0gMFxuICAgIHZhciBjb3VudCA9IDBcbiAgICB2YXIgY3NzID0ge1xuICAgICAgJ2Zsb2F0JzogJ25vbmUnLFxuICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICAgICdkaXNwbGF5JzogL14oPyEuKmNocm9tZSkuKnNhZmFyaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgPyAnaW5saW5lLWJsb2NrJyA6ICdibG9jaydcbiAgICB9XG4gICAgXG4gICAgaWYgKCAhJGJyaWNrcy5sZW5ndGggKVxuICAgICAgcmV0dXJuXG4gICAgICBcbiAgICBmb3IgKCA7IGkgPCBjb2xDb3VudDsgaSsrIClcbiAgICAgIGNvbEhlaWdodFsgaSBdID0gMFxuXG4gICAgJGVsZW0uY3NzKCAncG9zaXRpb24nLCAncmVsYXRpdmUnIClcblxuICAgICRicmlja3MuY3NzKCBjc3MgKS5lYWNoKCBmdW5jdGlvbiggaiwgYnJpY2sgKSB7XG5cbiAgICAgIHRoaXNSb3cgPSBNYXRoLmZsb29yKGNvdW50L2NvbENvdW50KVxuICAgICAgY291bnQrK1xuXG4gICAgICB2YXIgJGJyaWNrID0gJCggYnJpY2sgKVxuXG4gICAgICB2YXIgaGVpZ2h0ID0gJGJyaWNrLm91dGVySGVpZ2h0KCB0cnVlIClcblxuICAgICAgZm9yICggaSA9IGNvbENvdW50LTE7IGkgPiAtMTsgaS0tICkge1xuICAgICAgICBpZiAoIGNvbEhlaWdodFsgaSBdID09PSBNYXRoLm1pbi5hcHBseSggTWF0aCwgY29sSGVpZ2h0ICkgKVxuICAgICAgICAgIHRoaXNDb2wgPSBpXG4gICAgICB9XG5cbiAgICAgIHZhciBzeiA9IHtcbiAgICAgICAgdG9wOiBjb2xIZWlnaHRbIHRoaXNDb2wgXSxcbiAgICAgICAgbGVmdDogKGJyaWNrV2lkdGgrZ3V0dGVyKSAqIHRoaXNDb2xcbiAgICAgIH1cblxuICAgICAgaWYgKCB0eXBlb2Ygc3oudG9wICE9PSAnbnVtYmVyJyB8fCB0eXBlb2Ygc3oubGVmdCAhPT0gJ251bWJlcicgKVxuICAgICAgICByZXR1cm5cblxuICAgICAgc3oudG9wID0gTWF0aC5yb3VuZChzei50b3ApXG4gICAgICBzei5sZWZ0ID0gTWF0aC5yb3VuZChzei5sZWZ0KVxuXG4gICAgICBjb2xIZWlnaHRbIHRoaXNDb2wgXSArPSBoZWlnaHRcblxuICAgICAgaWYgKCB0eXBlb2YgbWF0cml4W3RoaXNSb3ddID09ICd1bmRlZmluZWQnIClcbiAgICAgICAgbWF0cml4W3RoaXNSb3ddID0gW11cblxuICAgICAgbWF0cml4W3RoaXNSb3ddW3RoaXNDb2xdID0gJC5leHRlbmQoe30sIHN6LCB7IGJyaWNrOiBicmljaywgaGVpZ2h0OiBoZWlnaHQgfSlcbiAgICAgICRicmljay5kYXRhKCdwb3MnLCBzei50b3AraGVpZ2h0KVxuICAgIH0pXG5cbiAgICAkZWxlbS5oZWlnaHQoTWF0aC5tYXguYXBwbHkoTWF0aCwgY29sSGVpZ2h0KSlcbiAgICBcbiAgICByZXR1cm4gbWF0cml4XG4gIH1cblxuICB2YXIgbGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hdHJpeCA9IGNhbGN1bGF0ZU1hdHJpeCgpXG4gICAgaWYgKCAhbWF0cml4IClcbiAgICAgIHJldHVyblxuICAgIG1hdHJpeC5mb3JFYWNoKGZ1bmN0aW9uKHJvdykge1xuICAgICAgcm93LmZvckVhY2goZnVuY3Rpb24oY29sKSB7XG4gICAgICAgIHZhciBleHRvcCA9ICQoY29sLmJyaWNrKS5kYXRhKCdleHRvcCcpXG4gICAgICAgICQoY29sLmJyaWNrKS5jc3Moe1xuICAgICAgICAgIHRvcDogY29sLnRvcCArIChleHRvcCB8fMKgMCksXG4gICAgICAgICAgbGVmdDogY29sLmxlZnRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHZhciByZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXRyaXggPSBjYWxjdWxhdGVNYXRyaXgoKVxuICAgIGlmICggIW1hdHJpeCApXG4gICAgICByZXR1cm5cbiAgICB2YXIgY29sSGVpZ2h0ID0gW11cbiAgICBtYXRyaXguZm9yRWFjaChmdW5jdGlvbihyb3cpIHtcbiAgICAgIHJvdy5mb3JFYWNoKGZ1bmN0aW9uKGNvbCwgaSkge1xuICAgICAgICAkKGNvbC5icmljaykuZGF0YSgnZXh0b3AnLDApLmNzcyh7XG4gICAgICAgICAgdG9wOiBjb2wudG9wLFxuICAgICAgICAgIGxlZnQ6IGNvbC5sZWZ0XG4gICAgICAgIH0pXG4gICAgICAgIGlmICggdHlwZW9mIGNvbEhlaWdodFtpXSA9PSAndW5kZWZpbmVkJyApXG4gICAgICAgICAgY29sSGVpZ2h0W2ldID0gMFxuICAgICAgICBjb2xIZWlnaHRbaV0gKz0gY29sLnRvcFxuICAgICAgfSlcbiAgICB9KVxuICAgICRlbGVtLmhlaWdodChNYXRoLm1heC5hcHBseShNYXRoLCBjb2xIZWlnaHQpKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgMClcbiAgfVxuXG4gIHZhciByZWZyZXNoID0gZnVuY3Rpb24oZWxlbSkge1xuICAgIGlmICggZWxlbSAmJiAhJChlbGVtKS5kYXRhKCdtYXNvbnJ5JykgKSB7XG4gICAgICAkZWxlbSA9ICQoZWxlbSkuZGF0YSgnbWFzb25yeScsIHRydWUpXG4gICAgfVxuICAgIGxheW91dCgpXG4gIH1cblxuICB2YXIgbWF0cml4ID0gZnVuY3Rpb24oIHBhcnNlciApIHtcbiAgICB2YXIgJGJyaWNrcyA9ICRlbGVtLmNoaWxkcmVuKClcbiAgICAkYnJpY2tzLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKVxuICAgIHBhcnNlcihjYWxjdWxhdGVNYXRyaXgoKSlcbiAgICAkYnJpY2tzLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgfVxuXG4gIHZhciBhcGkgPSB7XG4gICAgbGF5b3V0OiBsYXlvdXQsXG4gICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICBlbGVtZW50OiBlbGVtLFxuICAgIHJlZnJlc2g6IHJlZnJlc2gsXG4gICAgbWF0cml4OiBtYXRyaXgsXG4gICAgcmVzZXQ6IHJlc2V0XG4gIH1cblxuICAkZWxlbS5kYXRhKCdhcGknLCBhcGkpXG4gIHJldHVybiBhcGlcbn1cbiIsInZhciBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJylcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5JylcbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50JylcbnZhciBRdWVyeSA9IHJlcXVpcmUoJ3ZkZC9xdWVyeScpXG52YXIgUGl3aWsgPSByZXF1aXJlKCd2ZGQvcGl3aWsnKVxuXG52YXIgRGV0YWlsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgZ2V0SGl0czogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCdoaXRzJylcbiAgfSxcbiAgZ2V0SXNzdWU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldCgnaXNzdWUnKVxuICB9LFxuICBnZXRIaXRMaXN0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBbXVxuICAgIHZhciBoaXRzID0gdGhpcy5nZXRIaXRzKClcbiAgICBpZiAoIGhpdHMgJiYgaGl0cy5oaXRzICYmIGhpdHMuaGl0cy5oaXRzICkge1xuICAgICAgcmVzcG9uc2UgPSBoaXRzLmhpdHMuaGl0cy5zbGljZSgwKVxuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfSxcbiAgZ2V0SXNzdWVMaXN0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBbXVxuICAgIHZhciBoaXRzID0gdGhpcy5nZXRJc3N1ZSgpXG4gICAgaWYgKCBoaXRzICYmIGhpdHMuaGl0cyAmJiBoaXRzLmhpdHMuaGl0cyApIHtcbiAgICAgIHJlc3BvbnNlID0gaGl0cy5oaXRzLmhpdHMuc2xpY2UoMClcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzLmRldGFpbCA9IG5ldyBEZXRhaWwoKVxuXG52YXIgUmVzcG9uc2VEYXRhID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgZ2V0RGF0ZXM6IGZ1bmN0aW9uKCBmcm9tLCB0byApIHtcbiAgICB2YXIgZmFjZXRzID0gdGhpcy5nZXQoJ2ZhY2V0cycpXG4gICAgaWYgKCAhZmFjZXRzICkgcmV0dXJuIGZhbHNlXG4gICAgdmFyIHJlc3BvbnNlXG4gICAgdmFyIGRhdGFcbiAgICB2YXIgcHJlY2lzaW9uID0gZmFjZXRzLnByZWNpc2lvblxuICAgIHZhciBub3JtYWxpemUgPSBmdW5jdGlvbiggZCwgcCApIHtcbiAgICAgIHZhciBmb3JtYXQgPSBwID09ICd5ZWFyJ1xuICAgICAgICA/ICdZWVlZJ1xuICAgICAgICA6IHAgPT0gJ21vbnRoJ1xuICAgICAgICAgID8gJ1lZWVktTU0nXG4gICAgICAgICAgOiAnWVlZWS1NTS1ERCdcbiAgICAgIGQudGVybSA9ICggdHlwZW9mIGQudGVybSA9PSAnc3RyaW5nJyApID8gbW9tZW50KCBkLnRlcm0sIGZvcm1hdCApLnRvRGF0ZSgpIDogZC50ZXJtXG4gICAgICBkLmNvdW50ID0gK2QuY291bnRcbiAgICAgIGQucHJlYyA9IHBcbiAgICAgIHJldHVybiBkXG4gICAgfVxuICAgIHZhciBlbnN1cmVEYXRlID0gZnVuY3Rpb24oIGRhdGUsIGRhdGEgKSB7XG4gICAgICB2YXIgZGF0ZU9iaiA9IF8uZmluZCggZGF0YSwgZnVuY3Rpb24oIGQgKSB7XG4gICAgICAgICAgcmV0dXJuIG1vbWVudCggZCApLmlzU2FtZSggZGF0ZSwgcHJlY2lzaW9uIClcbiAgICAgICAgfSApIFxuICAgICAgICBkYXRlT2JqIHx8IGRhdGEucHVzaCgge1xuICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICAgIHByZWM6IHByZWNpc2lvbixcbiAgICAgICAgICB0ZXJtOiBkYXRlXG4gICAgICAgIH0gKVxuICAgIH1cblxuICAgIGRhdGEgPSBmYWNldHNbICdpc3N1ZV9pc3N1ZWRfZmFjZXQnIF0udGVybXNcbiAgICAvLyBOb3JtYWxpemUgZGF0YVxuICAgIGRhdGEgPSBkYXRhLm1hcCggZnVuY3Rpb24oIGQgKXtcbiAgICAgIHJldHVybiBub3JtYWxpemUoIGQsIHByZWNpc2lvbiApXG4gICAgfSApXG5cbiAgICAvLyBHZXQgdGhlIGFtb3VudCBvZiBtb250aHMgYmV0d2VlbiBmcm9tIGFuZCB0byBkYXRlXG4gICAgaWYgKCBmcm9tICYmIHRvICkge1xuICAgICAgLy8gT25seSBmaWx0ZXIgb3V0IGRhdGVzIG91dHNpZGUgcmFuZ2UgaWYgcHJlY2lzaW9uIGlzIG1vbnRocyBvciB5ZWFyc1xuICAgICAgdmFyIHN0YXJ0LCBlbmRcbiAgICAgIGlmICggcHJlY2lzaW9uID09ICd5ZWFyJyB8fCBwcmVjaXNpb24gPT0gJ21vbnRoJyApIHtcbiAgICAgICAgc3RhcnQgPSBtb21lbnQoIGZyb20gKS5zdGFydE9mKCBwcmVjaXNpb24gKS50b0RhdGUoKVxuICAgICAgICBlbmQgPSBtb21lbnQoIHRvICkuZW5kT2YoIHByZWNpc2lvbiApLnRvRGF0ZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydCA9IG1vbWVudCggZnJvbSApLnN0YXJ0T2YoICdtb250aCcgKS50b0RhdGUoKVxuICAgICAgICBlbmQgPSBtb21lbnQoIHRvICkuZW5kT2YoICdtb250aCcgKS50b0RhdGUoKVxuICAgICAgfVxuXG4gICAgICAvLyBXZSB3YW50IHRvIGVuc3VyZSBmaXJzdCBhbmQgbGFzdCBkYXlzIG9mIGRhdGUgc3BhbiBhcmUgYWx3YXlzIHByZXNlbnQgaW4gZGF0YVxuICAgICAgZW5zdXJlRGF0ZSggc3RhcnQsIGRhdGEsIHByZWNpc2lvbiApXG4gICAgICBlbnN1cmVEYXRlKCBlbmQsIGRhdGEsIHByZWNpc2lvbiApXG5cbiAgICAgIGRhdGEgPSBkYXRhLmZpbHRlciggZnVuY3Rpb24oIGQgKXtcbiAgICAgICAgcmV0dXJuIGQudGVybSA+PSBzdGFydCAmJiBkLnRlcm0gPD0gZW5kXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgcHJlY2lzaW9uOiBwcmVjaXNpb25cbiAgICB9XG5cbiAgfSxcblxuICBnZXROZXdzcGFwZXJzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZmFjZXRzID0gdGhpcy5nZXQoJ2ZhY2V0cycpXG4gICAgaWYgKCFmYWNldHMpIHJldHVybiBmYWxzZVxuICAgIHJldHVybiBmYWNldHMubmV3c3BhcGVyX3RpdGxlX2ZhY2V0LnRlcm1zXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzLnJlc3BvbnNlZGF0YSA9IG5ldyBSZXNwb25zZURhdGEoKVxuXG52YXIgUmVzdWx0ID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgZ2V0RmllbGRzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ19zb3VyY2UnKVxuICB9XG59KVxudmFyIFJlc3VsdHMgPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG4gIG1vZGVsOiBSZXN1bHRcbn0pXG5cbm1vZHVsZS5leHBvcnRzLnJlc3VsdHMgPSBuZXcgUmVzdWx0cygpXG5cbnZhciBVc2VyID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgc2F2ZVVzZXJEYXRhOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdXNlcmRhdGEgPSB0aGlzLnRvSlNPTigpLnVzZXJkYXRhXG4gICAgJC5wb3N0KCcvdXNlcicsIHt1c2VyZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlcmRhdGEpfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdVc2VyZGF0YSBzYXZlZCcpXG4gICAgfSlcbiAgfSxcbiAgc2V0VXNlcjogZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKVxuICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSlcbiAgICB0aGlzLnNldChkYXRhLCB7c2lsZW50OiB0cnVlfSlcbiAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZScpXG4gIH0sXG4gIGZldGNoVXNlcjogZnVuY3Rpb24oc3VjY2Vzcykge1xuICAgICQud2hlbihcbiAgICAgICQuZ2V0KCcvdXNlcicsIHRoaXMuc2V0VXNlci5iaW5kKHRoaXMpKVxuICAgICkudGhlbihzdWNjZXNzKVxuICB9LFxuICBsb2dpbjogZnVuY3Rpb24odSwgcCwgciwgc3VjY2VzcywgZmFpbCkge1xuICAgICQud2hlbihcbiAgICAgICQucG9zdCgnL2xvZ2luJywge3VzZXJuYW1lOiB1LCBwYXNzd29yZDogcCwgcmVtZW1iZXI6IHJ9LCB0aGlzLnNldFVzZXIuYmluZCh0aGlzKSlcbiAgICApLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSlcbiAgICAgIGlmICggJ2VycicgaW4gcmVzcG9uc2UgKVxuICAgICAgICBmYWlsKHJlc3BvbnNlLm1zZylcbiAgICAgIGVsc2VcbiAgICAgICAgc3VjY2VzcygpXG4gICAgfSlcbiAgfSxcbiAgZm9yZ290OiBmdW5jdGlvbih1LCBzdWNjZXNzLCBmYWlsKSB7XG4gICAgJC53aGVuKFxuICAgICAgJC5wb3N0KCcvcmVxdWVzdF9yZXNldCcsIHt1c2VybmFtZTogdX0pXG4gICAgKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpXG4gICAgICBpZiAoICdlcnInIGluIHJlc3BvbnNlIClcbiAgICAgICAgZmFpbChyZXNwb25zZS5tc2cpXG4gICAgICBlbHNlXG4gICAgICAgIHN1Y2Nlc3MoKVxuICAgIH0pXG4gIH0sXG4gIGxvZ291dDogZnVuY3Rpb24oKSB7XG4gICAgJC5nZXQoJy9sb2dvdXQnLCBmdW5jdGlvbihhKSB7XG4gICAgICBpZiAoIGEgPT0gJ29rJyApe1xuICAgICAgICB0aGlzLmNsZWFyKClcbiAgICAgICAgUGl3aWsudHJhY2tFdmVudCgnTG9nb3V0JywgJ1N1Y2Nlc3NmdWwnKVxuICAgICAgfWVsc2V7XG4gICAgICAgIGFsZXJ0KCdOw6Vnb250aW5nIGdpY2sgZmVsIG9jaCBkdSBrdW5kZSBpbnRlIGxvZ2dhcyB1dCcpXG4gICAgICAgIFBpd2lrLnRyYWNrRXZlbnQoJ0xvZ291dCcsICdGYWlsZWQnKVxuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSlcbiAgfSxcbiAgcmVnaXN0ZXI6IGZ1bmN0aW9uKHUsIHAsIHN1Y2Nlc3MsIGZhaWwpIHtcbiAgICAkLndoZW4oXG4gICAgICAkLnBvc3QoJy9yZWdpc3RlcicsIHt1c2VybmFtZTogdSwgcGFzc3dvcmQ6IHB9LCB0aGlzLnNldFVzZXIuYmluZCh0aGlzKSlcbiAgICApLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSlcbiAgICAgIGlmICggJ2VycicgaW4gcmVzcG9uc2UgKXtcbiAgICAgICAgZmFpbChyZXNwb25zZS5tc2cpXG4gICAgICAgIFBpd2lrLnRyYWNrRXZlbnQoJ1JlZ2lzdGVyJywgJ0ZhaWxlZCcsIHJlc3BvbnNlLm1zZylcbiAgICAgIH1lbHNle1xuICAgICAgICBzdWNjZXNzKClcbiAgICAgICAgUGl3aWsudHJhY2tFdmVudCgnUmVnaXN0ZXInLCAnU3VjY2Vzc2Z1bCcpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgZGVmYXVsdHM6IHtcbiAgICB1c2VyZGF0YToge1xuICAgICAgc2VhcmNoZXM6IFtdLFxuICAgICAgZmF2b3VyaXRlczogW10sXG4gICAgICByZWxhdGVkOiBbXVxuICAgIH1cbiAgfVxufSlcbnZhciB1c2VyID0gbmV3IFVzZXIoKVxudXNlci5vbignY2hhbmdlOnVzZXJkYXRhJywgZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2F2ZVVzZXJEYXRhKClcbn0pXG5tb2R1bGUuZXhwb3J0cy51c2VyID0gdXNlclxuXG53aW5kb3cuTW9kZWxzID0gbW9kdWxlLmV4cG9ydHNcbiIsInZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcblxuICAgIHJlcXVlc3RGcmFtZSA9IChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgciA9ICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXG4gICAgICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IFxuICAgICAgICAgIHdpbmRvd1snd2Via2l0JytyXSB8fCBcbiAgICAgICAgICB3aW5kb3dbJ21veicrcl0gfHwgXG4gICAgICAgICAgd2luZG93WydvJytyXSB8fCBcbiAgICAgICAgICB3aW5kb3dbJ21zJytyXSB8fCBcbiAgICAgICAgICBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKVxuICAgICAgICAgIH1cbiAgICB9KCkpLFxuXG4gICAgY29vcmRzID0gZnVuY3Rpb24oIGUgKSB7XG5cbiAgICAgICAgdmFyIGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgICBnZXQgPSBmdW5jdGlvbiggZSwgbHIgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjciA9ICdzY3JvbGwnICsgbHIsXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudCA9IGxyID09ICdMZWZ0JyA/ICdjbGllbnRYJyA6ICdjbGllbnRZJztcbiAgICAgICAgICAgICAgICByZXR1cm4gZVtjbGllbnRdICsgKCBodG1sWyBzY3IgXSA/IGh0bWxbIHNjciBdIDogZG9jdW1lbnQuYm9keVsgc2NyIF0gKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY3JvbGxZID0gZG9jdW1lbnQuYWxsID8gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgOiB3aW5kb3cucGFnZVlPZmZzZXRcblxuICAgICAgICByZXR1cm4gJ3RvdWNoZXMnIGluIGUgJiYgZS50b3VjaGVzLmxlbmd0aCA/IHtcbiAgICAgICAgICAgIHg6IGUudG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgIHk6IGUudG91Y2hlc1swXS5wYWdlWSAtIHNjcm9sbFlcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICAgIHg6IGUucGFnZVggfHwgZ2V0KCBlLCAnTGVmdCcpLFxuICAgICAgICAgICAgeTogKCBlLnBhZ2VZIHx8IGdldCggZSwgJ1RvcCcpICkgLSBzY3JvbGxZXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGRlYyA9IGZ1bmN0aW9uKCBudW0gKSB7XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgbnVtICE9ICdudW1iZXInICkge1xuICAgICAgICAgICAgbnVtID0gbnVtICogMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuID0gbnVtLnRvRml4ZWQoIDIgKSAqIDE7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhuKSA+IDAuMiA/IG4gOiAwO1xuICAgIH0sXG5cbiAgICBNID0gTWF0aCxcblxuICAgIHBmID0gcGFyc2VGbG9hdCxcblxuICAgIHBvcyxcblxuICAgIHN1cHBvcnQgPSAoIHR5cGVvZiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtICE9PSAndW5kZWZpbmVkJyApLFxuXG4gICAgdG91Y2ggPSAhISggJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQgKSxcblxuICAgIGF0dGFjaCA9ICEhKCAnYXR0YWNoRXZlbnQnIGluIGRvY3VtZW50ICksXG5cbiAgICBhZGRFdmVudCA9IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBmbiApIHtcbiAgICAgICAgaWYgKCBhdHRhY2ggKSB7XG4gICAgICAgICAgICBlbGVtLmF0dGFjaEV2ZW50KCAnb24nICsgdHlwZSwgZm4gKTtcbiAgICAgICAgfSBlbHNlIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZm4gKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVFdmVudCA9IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBmbiApIHtcbiAgICAgICAgaWYgKCBhdHRhY2ggKSB7XG4gICAgICAgICAgICBlbGVtLmRldGFjaEV2ZW50KCAnb24nICsgdHlwZSwgZm4gKTtcbiAgICAgICAgfSBlbHNlIGlmICgncmVtb3ZlRXZlbnRMaXN0ZW5lcicgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgZm4gKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXRmYWxzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGdldFN0eWxlID0gZnVuY3Rpb24oIGVsZW0sIG0gKSB7XG4gICAgICAgIGlmICggJ2RlZmF1bHRWaWV3JyBpbiBkb2N1bWVudCApIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsZW0sICcnKS5nZXRQcm9wZXJ0eVZhbHVlKCBtICk7XG4gICAgICAgIH0gZWxzZSBpZiAoICdjdXJyZW50U3R5bGUnIGluIGVsZW0gKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5jdXJyZW50U3R5bGVbIG0gXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRTdHlsZSA9IGZ1bmN0aW9uKCBlbGVtLCBzdHlsZXMgKSB7XG4gICAgICAgIGZvciAoIHZhciBwcm9wIGluIHN0eWxlcyApIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGVbcHJvcF0gPSBzdHlsZXNbIHByb3AgXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRXSCA9IGZ1bmN0aW9uKCBlbGVtLCBtICkge1xuXG4gICAgICAgIHZhciBvZmZzZXQgPSAnb2Zmc2V0JyArIG0uc3Vic3RyKDAsMSkudG9VcHBlckNhc2UoKSArIG0uc3Vic3RyKDEpO1xuXG4gICAgICAgIGlmICggZWxlbVsgb2Zmc2V0IF0gKSB7XG4gICAgICAgICAgICByZXR1cm4gcGYoIGVsZW1bIG9mZnNldCBdICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBmKCBnZXRTdHlsZSggZWxlbSwgbSApICk7XG4gICAgfSxcblxuICAgIHRyYW5zbGF0ZTNkID0gZnVuY3Rpb24oIGVsZW0sIGFyciwgc2NhbGUgKSB7XG4gICAgICAgIGFyciA9IGFyciB8fCBbMCwwLDBdO1xuICAgICAgICBmb3IgKCB2YXIgaSBpbiBhcnIgKSB7XG4gICAgICAgICAgICBhcnJbaV0gKz0gJ3B4JztcbiAgICAgICAgfVxuICAgICAgICBzY2FsZSA9IHNjYWxlIHx8IDFcbiAgICAgICAgZWxlbS5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGFyci5qb2luKCcsJykgKyAnKSc7XG4gICAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucyApIHtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBjYWxsYmFja3MgPSBbXVxuICAgIHZhciB3aWxsU3RvcCA9IGZhbHNlXG4gICAgdmFyIGRpc2FibGVkID0gZmFsc2VcbiAgICB2YXIgcmVsZWFzZWQgPSBmYWxzZVxuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIG1vdXNlbW92ZTogZmFsc2UsXG4gICAgICAgICAgICBmcHM6IDgwLFxuICAgICAgICAgICAgc21vb3RobmVzczogMy4yLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfSxcbiAgICAgICAgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlIHx8IHdpbmRvdyxcbiAgICAgICAgbW92ZSA9IGZhbHNlLFxuICAgICAgICBkZWN4ID0gMCwgZGVjeSA9IDAsXG4gICAgICAgIHdpbldpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgIHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgaW1hZ2VzID0gZWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJyksXG4gICAgICAgIGltZyA9IGltYWdlc1swXSxcbiAgICAgICAgeCA9IG9wdGlvbnMueCB8fFxuICAgICAgICAgICAgLXBmKCBnZXRTdHlsZSggZWxlbSwgJ2xlZnQnICkgKSB8fCAwLFxuICAgICAgICB5ID0gb3B0aW9ucy55IHx8XG4gICAgICAgICAgICAtcGYoIGdldFN0eWxlKCBlbGVtLCAndG9wJyApICkgfHwgMCxcbiAgICAgICAgZHggPSB4LCBjeCA9IHgsXG4gICAgICAgIGR5ID0geSwgY3kgPSB5LFxuICAgICAgICBtaW54ID0gMCwgbWlueSA9IDAsXG4gICAgICAgIG14LCBteSwgd2lkdGgsIGhlaWdodCwgeHgsIHl5LCB6eixcbiAgICAgICAgZHogPSAxLCBjeiA9IDEsXG5cbiAgICAgICAgbG9vcCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBpZiAoIHRvdWNoIHx8ICFvcHRpb25zLm1vdXNlbW92ZSApIHtcblxuICAgICAgICAgICAgICAgIGRlY3ggPSBkZWMoKCBkeCAtIGN4ICkgLyBvcHRpb25zLnNtb290aG5lc3MpO1xuICAgICAgICAgICAgICAgIGRlY3kgPSBkZWMoKCBkeSAtIGN5ICkgLyBvcHRpb25zLnNtb290aG5lc3MpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCAhbW92ZSAmJiByZWxlYXNlZCAmJiAoZGVjeCB8fCBkZWN5KSApIHtcbiAgICAgICAgICAgICAgICAgICAgZHggKz0gZGVjeDtcbiAgICAgICAgICAgICAgICAgICAgZHkgKz0gZGVjeTtcbiAgICAgICAgICAgICAgICAgICAgeCA9IGR4ID0gTS5taW4oIDAsIE0ubWF4KCBkeCwgbWlueCApICk7XG4gICAgICAgICAgICAgICAgICAgIHkgPSBkeSA9IE0ubWluKCAwLCBNLm1heCggZHksIG1pbnkgKSApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY3ggPSAwO1xuICAgICAgICAgICAgICAgICAgICBkZWN5ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG14ID0gZHggLSBjeDtcbiAgICAgICAgICAgIG15ID0gZHkgLSBjeTtcbiAgICAgICAgICAgIG16ID0gZHogLSBjejtcblxuICAgICAgICAgICAgdmFyIG11bHRpcGxpZXIgPSAoIW1vdmUgJiYgIXJlbGVhc2VkKSA/IDEuNSA6IDFcblxuICAgICAgICAgICAgY3ggKz0gZGVjKCBteCAvIChtdWx0aXBsaWVyKm9wdGlvbnMuc21vb3RobmVzcykgKTtcbiAgICAgICAgICAgIGN5ICs9IGRlYyggbXkgLyAobXVsdGlwbGllcipvcHRpb25zLnNtb290aG5lc3MpICk7XG4gICAgICAgICAgICBjeiArPSBteiowLjJcblxuICAgICAgICAgICAgLy8gcm91bmQgdXBcbiAgICAgICAgICAgIGlmICggTS5hYnMoIG14ICkgPCAxICkge1xuICAgICAgICAgICAgICAgIGN4ID0gTWF0aC5yb3VuZCggY3ggKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBNLmFicyggbXkgKSA8IDEgKSB7XG4gICAgICAgICAgICAgICAgY3kgPSBNYXRoLnJvdW5kKCBjeSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIE1hdGguYWJzKG16LnRvRml4ZWQoNCkpID09ICcwLjAwMDEnIClcbiAgICAgICAgICAgICAgICBjeiA9IGR6ID0gY3oudG9GaXhlZCg0KSoxXG5cbiAgICAgICAgICAgIGlmICggeHggIT09IGRlYyhjeCkgfHwgeXkgIT09IGRlYyhjeSkgfHwgenogIT09IGN6IClcbiAgICAgICAgICAgICAgICBzZXRQb3NpdGlvbihkZWMoY3gpLCBkZWMoY3kpLCBjeilcbiAgICAgICAgICAgIGlmICggIXdpbGxTdG9wICkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RGcmFtZShsb29wKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFBvc2l0aW9uID0gZnVuY3Rpb24ocHgsIHB5LCBweikge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGlmICggc3VwcG9ydCApIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUzZCggZWxlbSwgWyBweCwgcHksIDAgXSApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmxlZnQgPSBweCArICdweCc7XG4gICAgICAgICAgICAgICAgZWxlbS5zdHlsZS50b3AgPSBweSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBweiAhPSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBpPTA7IGltYWdlc1tpXTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlc1tpXS5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoJytweisnLCcrcHorJyknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHp6ID0gcHpcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBjYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIGZuKHB4LCBweSwgcHopXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgeHggPSBweFxuICAgICAgICAgICAgeXkgPSBweVxuICAgICAgICB9LFxuXG4gICAgICAgIG9ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aWR0aCAgPSB3aW5kb3cuaW5uZXJXaWR0aDsvL2dldFdIKCBwYXJlbnQsICd3aWR0aCcgKTtcbiAgICAgICAgICAgIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDsvL2dldFdIKCBwYXJlbnQsICdoZWlnaHQnICk7XG4gICAgICAgICAgICBtaW54ID0gKCBnZXRXSCggZWxlbSwgJ3dpZHRoJyApIC0gd2lkdGggKSAqIC0xO1xuICAgICAgICAgICAgbWlueSA9ICggZ2V0V0goIGVsZW0sICdoZWlnaHQnICkgLSBoZWlnaHQgKSAqIC0xO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRpZCA9IG51bGwsXG5cbiAgICAgICAgb25tb3ZlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCAhbW92ZSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggZS50b3VjaGVzICYmIGUudG91Y2hlcy5sZW5ndGggPiAxICkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9zID0gY29vcmRzKCBlICk7XG5cbiAgICAgICAgICAgIGlmICggb3B0aW9ucy5tb3VzZW1vdmUgJiYgIXRvdWNoICkge1xuICAgICAgICAgICAgICAgIGR4ID0geCAtIE0uYWJzKCBwb3MueC93aWR0aCAqIG1pbnggKTtcbiAgICAgICAgICAgICAgICBkeSA9IHkgLSBNLmFicyggcG9zLnkvaGVpZ2h0ICogbWlueSApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkeCA9IHBvcy54IC0geDtcbiAgICAgICAgICAgICAgICBkeSA9IHBvcy55IC0geTtcblxuICAgICAgICAgICAgICAgIGlmICggZHggPiAwICkge1xuICAgICAgICAgICAgICAgICAgICB4ID0gcG9zLng7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggZHggPCBtaW54ICkge1xuICAgICAgICAgICAgICAgICAgICB4ID0gcG9zLnggLSBtaW54O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggZHkgPiAwICkge1xuICAgICAgICAgICAgICAgICAgICB5ID0gcG9zLnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggZHkgPCBtaW55ICkge1xuICAgICAgICAgICAgICAgICAgICB5ID0gcG9zLnkgLSBtaW55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGR4ID0gTS5taW4oIDAsIE0ubWF4KCBkeCwgbWlueCApICk7XG4gICAgICAgICAgICBkeSA9IE0ubWluKCAwLCBNLm1heCggZHksIG1pbnkgKSApO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uc3RhcnQgPSBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIGlmICggJ2NvbnRhaW5zJyBpbiBkb2N1bWVudC5ib2R5ICYmICFlbGVtLmNvbnRhaW5zKGUudGFyZ2V0KSApXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgIGlmICggZGlzYWJsZWQgKVxuICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICByZWxlYXNlZCA9IGZhbHNlXG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBvcyA9IGNvb3JkcyggZSApO1xuXG4gICAgICAgICAgICBtb3ZlID0gdHJ1ZTtcblxuICAgICAgICAgICAgeCA9IHBvcy54IC0geDtcbiAgICAgICAgICAgIHkgPSBwb3MueSAtIHk7XG4gICAgICAgICAgICBkZWN4ID0gMDtcbiAgICAgICAgICAgIGRlY3kgPSAwO1xuXG4gICAgICAgICAgICBhZGRFdmVudCggZG9jdW1lbnQsICdtb3VzZW1vdmUnLCBvbm1vdmUgKTtcbiAgICAgICAgICAgIGFkZEV2ZW50KCBkb2N1bWVudCwgJ3RvdWNobW92ZScsIG9ubW92ZSApO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZWxlYXNlZCA9IHRydWVcbiAgICAgICAgICAgIG1vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHggPSBkeDtcbiAgICAgICAgICAgIHkgPSBkeTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KCBkb2N1bWVudCwgJ21vdXNlbW92ZScsIG9ubW92ZSApO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQoIGRvY3VtZW50LCAndG91Y2htb3ZlJywgb25tb3ZlICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFzUGl4ZWxFdmVudCA9IGZhbHNlLFxuICAgICAgICBkZWx0YSA9IDAsXG5cbiAgICAgICAgb253aGVlbCA9IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgaWYgKCBkaXNhYmxlZCApXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgIG1vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHggPSBkeDtcbiAgICAgICAgICAgIHkgPSBkeTtcblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICAgIC8vIEZGIDMuNitcbiAgICAgICAgICAgIGlmICggZS50eXBlID09ICdNb3pNb3VzZVBpeGVsU2Nyb2xsJyApIHtcblxuICAgICAgICAgICAgICAgIGhhc1BpeGVsRXZlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRlbHRhID0gZS5kZXRhaWwgLyAtNztcblxuICAgICAgICAgICAgLy8gb3RoZXIgZ2Vja29cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGUudHlwZSA9PSAnRE9NTW91c2VTY3JvbGwnICkge1xuICAgICAgICAgICAgICAgIGlmICggaGFzUGl4ZWxFdmVudCApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQoIGUuY3VycmVudFRhcmdldCwgZS50eXBlLCBhcmd1bWVudHMuY2FsbGVlICk7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhID0gZS5kZXRhaWwgKiAtMztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHdlYmtpdCArIElFXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbHRhID0gZS53aGVlbERlbHRhIC8gMTg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHdlYmtpdCBob3Jpem9udGFsXG4gICAgICAgICAgICBpZiAoICd3aGVlbERlbHRhWCcgaW4gZSApIHtcbiAgICAgICAgICAgICAgICBkeCArPSBlLndoZWVsRGVsdGFYIC8gMTg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpcmVmb3ggaG9yaXpvbnRhbFxuICAgICAgICAgICAgaWYgKCAnSE9SSVpPTlRBTF9BWElTJyBpbiBlICYmIGUuYXhpcyA9PSBlLkhPUklaT05UQUxfQVhJUyApIHtcbiAgICAgICAgICAgICAgICBkeCArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGR5ICs9IGRlbHRhO1xuICAgICAgICB9O1xuXG4gICAgZm9yICggdmFyIGQgaW4gZGVmYXVsdHMgKSB7XG4gICAgICAgIG9wdGlvbnNbZF0gPSBkIGluIG9wdGlvbnMgPyBvcHRpb25zW2RdIDogZGVmYXVsdHNbZF07XG4gICAgfVxuXG4gICAgaWYgKCBzdXBwb3J0ICkge1xuXG4gICAgICAgIGVsZW0uc3R5bGUubGVmdCA9IDA7XG4gICAgICAgIGVsZW0uc3R5bGUudG9wID0gMDtcblxuICAgICAgICB0cmFuc2xhdGUzZCggZWxlbSwgW3gseSwwXSApO1xuICAgIH1cblxuICAgIGlmICggZ2V0U3R5bGUoIHBhcmVudCwgJ3Bvc2l0aW9uJyApID09ICdzdGF0aWMnICkge1xuICAgICAgICBzZXRTdHlsZSggcGFyZW50LCB7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH0gKTtcbiAgICB9XG5cbiAgICBzZXRTdHlsZSggZWxlbSwgeyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9ICk7XG5cbiAgICBpZiAoIG9wdGlvbnMubW91c2Vtb3ZlICYmICF0b3VjaCApIHtcblxuICAgICAgICBtb3ZlID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9ucy5zbW9vdGhuZXNzICo9IDU7XG4gICAgICAgIGFkZEV2ZW50KCBkb2N1bWVudCwgJ21vdXNlbW92ZScsIG9ubW92ZSApO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBhZGRFdmVudCggcGFyZW50LCAnbW91c2Vkb3duJywgb25zdGFydCApO1xuICAgICAgICBhZGRFdmVudCggcGFyZW50LCAnbW91c2V1cCcsIG9uZW5kICk7XG4gICAgICAgIGFkZEV2ZW50KCBwYXJlbnQsICdtb3VzZW91dCcsIG9uZW5kICk7XG4gICAgICAgIGFkZEV2ZW50KCBwYXJlbnQsICdNb3pNb3VzZVBpeGVsU2Nyb2xsJywgb253aGVlbCApO1xuICAgICAgICBhZGRFdmVudCggcGFyZW50LCAnRE9NTW91c2VTY3JvbGwnLCBvbndoZWVsICk7XG4gICAgICAgIGFkZEV2ZW50KCBwYXJlbnQsICdtb3VzZXdoZWVsJywgb253aGVlbCApO1xuXG4gICAgfVxuXG4gICAgYWRkRXZlbnQoIHBhcmVudCwgJ3RvdWNoc3RhcnQnLCBvbnN0YXJ0ICk7XG4gICAgYWRkRXZlbnQoIHBhcmVudCwgJ3RvdWNoZW5kJywgb25lbmQgKTtcblxuICAgIGFkZEV2ZW50KCB3aW5kb3csICdyZXNpemUnLCBvbnJlc2l6ZSApO1xuXG4gICAgb25yZXNpemUoKTtcblxuICAgIC8vIElFXG4gICAgaWYgKCBhdHRhY2ggKSB7XG4gICAgICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KCdvbmRyYWdzdGFydCcsIHJldGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBHT1xuICAgIGxvb3AoKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25QYW46IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaChjYilcbiAgICAgICAgfSxcbiAgICAgICAgc2V0UG9zaXRpb246IGZ1bmN0aW9uKHN4LCBzeSwgc3opIHtcbiAgICAgICAgICAgIHJlbGVhc2VkID0gZmFsc2VcbiAgICAgICAgICAgIGlmICggc3ggKVxuICAgICAgICAgICAgICAgIGR4ID0geCA9IHh4ID0gc3hcbiAgICAgICAgICAgIGlmICggc3kgKVxuICAgICAgICAgICAgICAgIGR5ID0geSA9IHl5ID0gc3lcbiAgICAgICAgICAgIGlmICggc3ogKVxuICAgICAgICAgICAgICAgIGR6ID0gc3pcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Wm9vbTogZnVuY3Rpb24obnopIHtcbiAgICAgICAgICAgIGR6ID0gbnpcbiAgICAgICAgfSxcbiAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZW5hYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aWxsU3RvcCA9IHRydWVcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IFtdXG4gICAgICAgICAgICByZW1vdmVFdmVudCggcGFyZW50LCAnbW91c2Vkb3duJywgb25zdGFydCApO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQoIHBhcmVudCwgJ3RvdWNoc3RhcnQnLCBvbnN0YXJ0ICk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCggcGFyZW50LCAnbW91c2V1cCcsIG9uZW5kICk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCggcGFyZW50LCAndG91Y2hlbmQnLCBvbmVuZCApO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQoIHBhcmVudCwgJ21vdXNlb3V0Jywgb25lbmQgKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KCB3aW5kb3csICdyZXNpemUnLCBvbnJlc2l6ZSApO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQoIHBhcmVudCwgJ01vek1vdXNlUGl4ZWxTY3JvbGwnLCBvbndoZWVsICk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCggcGFyZW50LCAnRE9NTW91c2VTY3JvbGwnLCBvbndoZWVsICk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCggcGFyZW50LCAnbW91c2V3aGVlbCcsIG9ud2hlZWwgKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KCBkb2N1bWVudCwgJ21vdXNlbW92ZScsIG9ubW92ZSApO1xuXG4gICAgICAgICAgICBpZiAoIGF0dGFjaCApIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kZXRhY2hFdmVudCgnb25kcmFnc3RhcnQnLCByZXRmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwidmFyIF9wYXEgPSBbXVxudmFyIGluaXRpYWxpemVkID0gZmFsc2VcblxuLy8gUGl3aWsgaGVscGVyKHMpIHRvIGxvZyBDdXN0b20gZXZlbnRzXG52YXIgdHJhY2tFdmVudCA9IGZ1bmN0aW9uKGNhdGVnb3J5LCBhY3Rpb24sIG5hbWUpe1xuICBpZiggdHlwZW9mIG5hbWUgIT0gJ3VuZGVmaW5lZCcgKVxuICAgIF9wYXEucHVzaChbJ3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBuYW1lXSlcbiAgZWxzZVxuICAgIF9wYXEucHVzaChbJ3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uXSlcbn1cblxubW9kdWxlLmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIGluaXRpYWxpemVkIClcbiAgICByZXR1cm5cbiAgaW5pdGlhbGl6ZWQgPSB0cnVlXG4gIF9wYXEgPSB3aW5kb3cuX3BhcSA9IF9wYXEuc2xpY2UoMClcblxuICBfcGFxLnB1c2goWyd0cmFja1BhZ2VWaWV3J10pXG4gIF9wYXEucHVzaChbJ3NldFNpdGVJZCcsIDFdKVxuICB2YXIgdT0oKFwiaHR0cHM6XCIgPT0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wpID8gXCJodHRwc1wiIDogXCJodHRwXCIpICsgXCI6Ly8xOTMuMTAuNzUuNjg6ODA4MC9waXdpay9cIlxuICBfcGFxLnB1c2goWydzZXRUcmFja2VyVXJsJywgdSsncGl3aWsucGhwJ10pXG5cbiAgLy8gTG9hZCBwaXdpay5qcyBhc3luY2hyb251c2x5XG4gIHZhciBkID0gZG9jdW1lbnRcbiAgdmFyIGcgPSBkLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gIHZhciBzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF1cbiAgZy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCdcbiAgZy5kZWZlciA9IHRydWVcbiAgZy5hc3luYyA9IHRydWVcbiAgZy5zcmMgPSB1KydwaXdpay5qcydcbiAgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShnLHMpXG59XG5cbm1vZHVsZS5leHBvcnRzLnRyYWNrUGFnZVZpZXcgPSBmdW5jdGlvbigpIHtcbiAgX3BhcS5wdXNoKFsndHJhY2tQYWdlVmlldyddKVxufVxuXG5tb2R1bGUuZXhwb3J0cy50cmFja0NsaWNrID0gZnVuY3Rpb24oYWN0aW9uLCBuYW1lKXtcbiAgdHJhY2tFdmVudCgnQ2xpY2snLCBhY3Rpb24sIG5hbWUpXG59XG5cbm1vZHVsZS5leHBvcnRzLmVuYWJsZUxpbmtUcmFja2luZyA9IGZ1bmN0aW9uKCkge1xuICBfcGFxLnB1c2goWydlbmFibGVMaW5rVHJhY2tpbmcnXSkvLyBUZWxsIFBpd2lrIHRvIHRyYWNrIGxpbmtzICh3ZSBuZWVkIHRvIHJ1biB0aGlzIGFmdGVyIGxpbmtzIGhhdmUgYmVlbiBnZW5lcmF0ZWQsIHNvIGtlZXAgdGhpcyBsaW5lIGhlcmUpXG59XG5cbm1vZHVsZS5leHBvcnRzLnRyYWNrRXZlbnQgPSB0cmFja0V2ZW50IiwiXG52YXIgdG9waWNzID0ge31cbnZhciBzdWJVaWQgPSAtMVxuXG5tb2R1bGUuZXhwb3J0cy5vbiA9IGZ1bmN0aW9uKHRvcGljLCBmdW5jKSB7XG4gIGlmICghdG9waWNzW3RvcGljXSkge1xuICAgIHRvcGljc1t0b3BpY10gPSBbXVxuICB9XG4gIHZhciB0b2tlbiA9ICgrK3N1YlVpZCkudG9TdHJpbmcoKVxuICB0b3BpY3NbdG9waWNdLnB1c2goe1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBmdW5jOiBmdW5jXG4gIH0pXG4gIHJldHVybiB0b2tlblxufVxuXG5tb2R1bGUuZXhwb3J0cy50cmlnZ2VyID0gZnVuY3Rpb24odG9waWMsIGFyZ3MpIHtcbiAgaWYgKCF0b3BpY3NbdG9waWNdKVxuICAgIHJldHVybiBmYWxzZVxuICB2YXIgc3Vic2NyaWJlcnMgPSB0b3BpY3NbdG9waWNdXG4gIHZhciBsZW4gPSBzdWJzY3JpYmVycyA/IHN1YnNjcmliZXJzLmxlbmd0aCA6IDBcbiAgd2hpbGUgKGxlbi0tKVxuICAgIHN1YnNjcmliZXJzW2xlbl0uZnVuYyhhcmdzKVxuICByZXR1cm4gdHJ1ZVxufVxuXG5tb2R1bGUuZXhwb3J0cy5vZmYgPSBmdW5jdGlvbih0b2tlbikge1xuICBmb3IgKHZhciBtIGluIHRvcGljcykge1xuICAgIGlmICh0b3BpY3NbbV0pIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gdG9waWNzW21dLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICBpZiAodG9waWNzW21dW2ldLnRva2VuID09PSB0b2tlbikge1xuICAgICAgICAgIHRvcGljc1ttXS5zcGxpY2UoaSwgMSlcbiAgICAgICAgICByZXR1cm4gdG9rZW5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn0iLCJ2YXIgcGFyYW1zID0ge31cbnZhciBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgc3luYzogZnVuY3Rpb24ocXVlcnkpIHtcblxuICAgIHF1ZXJ5ID0gcXVlcnkgfHwgQmFja2JvbmUuaGlzdG9yeS5nZXRGcmFnbWVudCgpLnRvU3RyaW5nKCkucmVwbGFjZSgvXlxcPy8sJycpXG5cbiAgICB2YXIgbWF0Y2ggPSAvKFteXFw/XSspXFw/KC4qKS8uZXhlYyhxdWVyeSlcbiAgICBpZiAoIG1hdGNoICYmIG1hdGNoWzJdIClcbiAgICAgIHF1ZXJ5ID0gbWF0Y2hbMl1cblxuICAgIHBhcmFtcyA9IHt9XG5cbiAgICBpZiAoICFxdWVyeSApXG4gICAgICByZXR1cm5cblxuICAgIHF1ZXJ5LnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihwYXJ0KSB7XG4gICAgICBwYXJ0ID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnQpLnNwbGl0KCc9JylcbiAgICAgIHBhcmFtc1twYXJ0WzBdXSA9IHBhcnRbMV1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG5cbiAgYnVpbGQ6IGZ1bmN0aW9uKGF0dHJzKSB7XG4gICAgdmFyIGFyciA9IFtdXG4gICAgZm9yKCB2YXIgaSBpbiBwYXJhbXMgKSB7XG4gICAgICBpZiAoIGF0dHJzICYmIGF0dHJzLmxlbmd0aCAmJiBhdHRycy5pbmRleE9mKGkpID09IC0xIClcbiAgICAgICAgY29udGludWVcbiAgICAgIGFyci5wdXNoKCBlbmNvZGVVUklDb21wb25lbnQoaSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2ldKSApXG4gICAgfVxuICAgIHJldHVybiAnPycrKGFyci5qb2luKCcmJykpXG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbihhdHRyKSB7XG4gICAgaWYgKCAhYXR0ciApXG4gICAgICByZXR1cm4gcGFyYW1zXG4gICAgaWYgKCBwYXJhbXMuaGFzT3duUHJvcGVydHkoYXR0cikgKVxuICAgICAgcmV0dXJuIHBhcmFtc1thdHRyXVxuICB9LFxuXG4gIGdldEVuY29kZWQ6IGZ1bmN0aW9uKGF0dHIpIHtcbiAgICBpZiAoYXR0cilcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoIHRoaXMuZ2V0KGF0dHIpIClcbiAgICByZXR1cm4gJydcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uKHApIHtcbiAgICBmb3IoIHZhciBpIGluIHAgKSB7XG4gICAgICBwYXJhbXNbaV0gPSBwW2ldXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbihpKSB7XG4gICAgaWYoIHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShpKSApXG4gICAgICBkZWxldGUgcGFyYW1zW2ldXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufSIsInZhciBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJylcbnZhciBSb3V0ZXIgPSBCYWNrYm9uZS5Sb3V0ZXIuZXh0ZW5kKHtcbiAgcm91dGVzOiB7XG4gICAgXCI/OnF1ZXJ5XCI6IFwic2VhcmNoXCIsXG4gICAgXCJcIjogXCJob21lXCIsXG4gICAgXCJmYXZvdXJpdGVzXCI6IFwiZmF2b3VyaXRlc1wiLFxuICAgIFwiOmlzc24vOmRhdGUvZWRpdGlvbi86ZWRpdGlvbi9wYXJ0LzpwYXJ0L3BhZ2UvOnBhZ2UvXCI6IFwiZGV0YWlsXCIsIC8vIC86ZGF0ZS9lZGl0aW9uLzplZGl0aW9uL3BhcnQvOnBhcnQvcGFnZS86cGFnZSgvKVxuICAgIFwiKm5vdEZvdW5kXCI6IFwiNDA0XCJcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUm91dGVyKCkiLCJ2YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpXG52YXIgbW9kZWxzID0gcmVxdWlyZSgnLi9tb2RlbHMnKVxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJylcbnZhciBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJylcbnZhciBQaXdpayA9IHJlcXVpcmUoJ3ZkZC9waXdpaycpXG5cbnZhciBzY3JvbGxlZCA9IDBcbnZhciBBcHAgPSBudWxsXG52YXIgbWFzb25yeSA9IG51bGxcblxudmFyIGxvZ2luID0gZnVuY3Rpb24oZG9uZSkge1xuICBpZiAoIEFwcCApIHtcbiAgICBBcHAuc2V0UHJvcHMoe1xuICAgICAgbW9kYWw6IHtcbiAgICAgICAgYWRkZmF2OiAhIWRvbmUsXG4gICAgICAgIGNvbXBvbmVudDogJ2xvZ2luJyxcbiAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0eXBlb2YgZG9uZSA9PSAnZnVuY3Rpb24nICYmIGRvbmUoKVxuICAgICAgICB9LFxuICAgICAgICBvbkZhaWw6IGZ1bmN0aW9uKG1zZykgeyB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzLnpvb20gPSBmdW5jdGlvbihwcm9wcykge1xuICBpZiAoIEFwcCApIHtcbiAgICBBcHAuc2V0UHJvcHMoe1xuICAgICAgem9vbTogcHJvcHNcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzLmNsb3NlWm9vbSA9IGZ1bmN0aW9uKCkge1xuICBBcHAgJiYgQXBwLnNldFByb3BzKHsgem9vbTogZmFsc2UgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMuaW1nSGFjayA9IGZ1bmN0aW9uKHNyYykge1xuICByZXR1cm4gc3JjXG4gIHJldHVybiBzcmNcbiAgICAucmVwbGFjZSgvMTQwM1xcLTk2NTYvLCAnMTEwMy05MDAwJylcbiAgICAucmVwbGFjZSgvMjAwMVxcLTM4NjgvLCAnMTEwMS0yNDEyJylcbn1cblxubW9kdWxlLmV4cG9ydHMuc2V0QXBwID0gZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgQXBwID0gaW5zdGFuY2Vcbn1cblxubW9kdWxlLmV4cG9ydHMuc2V0TWFzb25yeSA9IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIG1hc29ucnkgPSBpbnN0YW5jZVxufVxuXG5tb2R1bGUuZXhwb3J0cy5nZXRNYXNvbnJ5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBtYXNvbnJ5XG59XG5cbm1vZHVsZS5leHBvcnRzLnJldGluYSA9IGZ1bmN0aW9uKCkge1xuICBpZiAod2luZG93Lm1hdGNoTWVkaWEpIHtcbiAgICB2YXIgbXEgPSB3aW5kb3cubWF0Y2hNZWRpYShcIm9ubHkgc2NyZWVuIGFuZCAobWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjMpLCBvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIuNi8yKSwgb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMyksIG9ubHkgc2NyZWVuICBhbmQgKG1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMyksIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDEuM2RwcHgpXCIpXG4gICAgaWYgKG1xICYmIG1xLm1hdGNoZXMgfHwgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGVsc2VcbiAgICAgIHJldHVybiBmYWxzZVxuICB9IGVsc2UgaWYgKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEgKVxuICAgIHJldHVybiB0cnVlXG4gIHJldHVybiBmYWxzZVxufVxuXG5tb2R1bGUuZXhwb3J0cy5jYXBpdGFsaXplID0gZnVuY3Rpb24oc3RyKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgc3RyLnRvTG93ZXJDYXNlKCkuc3BsaXQoL1xccysvZykuZm9yRWFjaChmdW5jdGlvbih3b3JkKSB7XG4gICAgcmVzdWx0LnB1c2god29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc3Vic3RyKDEpKVxuICB9KVxuICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKVxufVxuXG5tb2R1bGUuZXhwb3J0cy5hZGRGYXZvdXJpdGUgPSBmdW5jdGlvbihmYXYpIHtcbiAgUGl3aWsudHJhY2tDbGljaygnRmF2b3VyaXRlcycsICdBZGQnLCAobW9kZWxzLnVzZXIuZ2V0KCd1c2VybmFtZScpID8gJ0xvZ2dlZCBpbicgOiAnTm90IGxvZ2dlZCBpbicpKVxuICB2YXIgc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIGRpcnR5IGJsaW5rXG4gICAgdmFyICRmYXYgPSAkKCcjdXNlciAuZmF2cycpLmZhZGVUbygyMDAsIDAuNSlcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJGZhdi5mYWRlVG8oMjAwLCAxKVxuICAgIH0sMjAwKVxuICAgIHZhciBkYXRhID0gbW9kZWxzLnVzZXIuZ2V0KCd1c2VyZGF0YScpXG4gICAgdmFyIGZhdnMgPSBkYXRhLmZhdm91cml0ZXMgfHwgW11cbiAgICB2YXIgZXhpc3RzID0gXy5maW5kV2hlcmUoZmF2cywge3VybDogZmF2LnVybH0pXG4gICAgaWYgKGV4aXN0cykge1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIHtcbiAgICAgIGZhdnMucHVzaChmYXYpXG4gICAgICBkYXRhLmZhdm91cml0ZXMgPSBmYXZzXG4gICAgICBtb2RlbHMudXNlci5zZXQoJ3VzZXJkYXRhJywgZGF0YSlcbiAgICAgIG1vZGVscy51c2VyLnRyaWdnZXIoJ2NoYW5nZTp1c2VyZGF0YScsIG1vZGVscy51c2VyLCBkYXRhKSAvLyBzYXZlcyB0byBzZXJ2ZXJcbiAgICAgIEJhY2tib25lLmhpc3RvcnkubG9hZFVybCgpXG4gICAgfVxuICB9XG4gIGlmICghbW9kZWxzLnVzZXIuZ2V0KCd1c2VybmFtZScpKVxuICAgIHJldHVybiBsb2dpbihzYXZlKVxuICBlbHNlXG4gICAgc2F2ZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzLnJlbW92ZUZhdm91cml0ZSA9IGZ1bmN0aW9uKGZhdikge1xuICBQaXdpay50cmFja0NsaWNrKCdGYXZvdXJpdGVzJywgJ1JlbW92ZScsIChtb2RlbHMudXNlci5nZXQoJ3VzZXJuYW1lJykgPyAnTG9nZ2VkIGluJyA6ICdOb3QgbG9nZ2VkIGluJykpXG4gIHZhciBkYXRhID0gbW9kZWxzLnVzZXIuZ2V0KCd1c2VyZGF0YScpXG4gIHZhciBmYXZzID0gZGF0YS5mYXZvdXJpdGVzXG4gIHZhciBmaWx0ZXJlZCA9IGZhdnMuZmlsdGVyKGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4gZi51cmwgIT09IGZhdi51cmxcbiAgfSlcbiAgaWYgKCAhXy5pc0VxdWFsKGZhdnMsIGZpbHRlcmVkKSApIHtcbiAgICBkYXRhLmZhdm91cml0ZXMgPSBmaWx0ZXJlZFxuICAgIG1vZGVscy51c2VyLnNldCgndXNlcmRhdGEnLCBkYXRhKVxuICAgIG1vZGVscy51c2VyLnRyaWdnZXIoJ2NoYW5nZTp1c2VyZGF0YScsIG1vZGVscy51c2VyLCBkYXRhKVxuICAgIEJhY2tib25lLmhpc3RvcnkubG9hZFVybCgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMubG9naW4gPSBsb2dpblxuXG4vLyBQYXJzZSBvdXQgdGhlIHBhdGhuYW1lIGZyb20gVVJMLCBmZXggaHR0cDovL3RpZG5pbmdhci5iay5zZS9mb28gPT4gL2Zvb1xubW9kdWxlLmV4cG9ydHMucGFyc2VQZXJtYUxpbmsgPSBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIGZha2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgZmFrZS5ocmVmID0gdXJsXG4gIGlmIChmYWtlLmhvc3QgPT09IFwiXCIpIC8vIElFOVxuICAgIGZha2UuaHJlZiA9IGZha2UuaHJlZlxuICByZXR1cm4gZmFrZS5wYXRobmFtZVxufVxuXG4vLyBidWlsZCBwZXJtYUxpbmtzIGZyb20gdXJsIHBhcmFtcyBhcnJheSBcIjppc3NuLzpkYXRlL2VkaXRpb24vOmVkaXRpb24vcGFydC86cGFydC9wYWdlLzpwYWdlL1wiXG5tb2R1bGUuZXhwb3J0cy5idWlsZFBlcm1hTGluayA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICBwYXJhbXMgPSBwYXJhbXMuc2xpY2UoMCw1KVxuICBwYXJhbXMuc3BsaWNlKDIsIDAsICdlZGl0aW9uJylcbiAgcGFyYW1zLnNwbGljZSg0LCAwLCAncGFydCcpXG4gIHBhcmFtcy5zcGxpY2UoNiwgMCwgJ3BhZ2UnKVxuICByZXR1cm4gJ2h0dHA6Ly90aWRuaW5nYXIua2Iuc2UvJytwYXJhbXMuam9pbignLycpXG59XG4iXX0=
