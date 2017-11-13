/**
 *
 * Javascript Type Functions for APEX and other Web Application Frameworks
 *
 * @created Oct/Nov 2017
 *
 * @author Stefan Obermeyer (except where indicated)
 *
 * @version 0.1.0 24.10.2017 SOB: created
 * @version 1.0.0 31.10.2017 SOB: added Types and moved Array functions
 * @version 1.0.1 05.11.2017 SOB: added Options and merge Array function
 *
 * 
 * 
 * 
 **/

/*jshint esversion: 6*/

/**
 * @namespace OJStype (O's Javascript "Types" and Extensions 2017/11/01)
 **/
var OJStype = {};

OJStype.Option = function(o) {
    // constructor
    this.options = null;
    if (o && o.constructor == Object &&
        !(o instanceof Array)) {
        //console.log('making object');
        this.options = new OJStype.Object(o);
    } else if (o && (o instanceof Array)) {
        this.options = new OJStype.Array(o);
        console.log('making Array with length: ' + this.options.length);
    } else if (o && (typeof o == "string")) {
        //console.log('making options object from json string');
        this.options = new OJStype.Object(o);
    } else {
<<<<<<< HEAD
        //console.log('making options object from: ' + typeof o);
        this.options = new Object(o);
    }
    //console.log('made this.options object: ' + this.options.constructor);
    // methods
    this.options.mergeOptions = function(options, returnAsObjectType = false, unique = false) {
        var i, opt, opts, returnObject;
        if (options && options[0].constructor == Object &&
            !(options[0] instanceof Array)) {
            opts = new OJStype.Object();
            returnObject = new Object({});
=======
        if (o) {
            this.options = new String(o);
        } else {
            this.options = new Object(o);
        }
        console.log('Making Options Object from: ' + this.options.constructor);
    };
    //console.log('made this.options object: ' + this.options.constructor);
    // methods
    this.options.mergeOptions = function(options, myOptions = { "write": "true", "append": "true" }, returnAsObjectType = false, unique = false) {
        var opt, opts, returnObject;
        if (options && options[0].constructor == Object &&
            !(options[0] instanceof Array)) {
            opts = new OJStype.Object([]);
            returnObject = new Object();
>>>>>>> origin/master
            // Options is an array of objects that get processed in order
            for (i = 0; i < options.length; ++i) {
                if (opts.isObject(options[i])) {
                    opt = options[i];
                } else {
                    (opts.toObject(options[i]));
                }
                opts = opts.mergeWith(opt);
            }
            for (var key in opts) {
                // returnAsObjectType: filter object methods to return raw object
                if (opts.hasOwnProperty(key) &&
                    opts[key].toString().substring(0, 8) !== "function") {
                    //console.log(key + " -> " + opts[key]);
                    returnObject[key] = opts[key];
                }
            }
        } else if (options && (options instanceof Array || options[0] instanceof Array)) {
<<<<<<< HEAD
            // Options are array[s] of arrays that get processed in order
            // Works best with 2 arrays. More are supported, but not stable yet //TODO

            //console.log('options.toString().split: ' + options.toString().split(',') + ' ' + options.length);
            opts = options.toString().split(',');
            returnObject = new Array([]);
            var j, str = new OJStype.String();
            if (options.length == 1) {
                //console.log('this.length: ' + this.length + " opts.length: " + opts.length);
                for (i = 0; i < opts.length; ++i) {
                    //console.log(i + ' ' + ' this.options[' + i + ']: ' + this[i] + ' - opts [' + i + ']: ' + opts[i]);
                    if (Number(opts[i])) {
                        o = Number(opts[i]);
                    } else if ((opts[i] == "true" || opts[i] == "false")) {
                        o = str.toBoolean(opts[i]);
                    } else {
                        o = opts[i];
                    }
                    this[i] = o;
                }
                for (i = 0; i < this.length; ++i) {
                    returnObject.push(this[i]);
                }
                return (returnAsObjectType ? this : returnObject);
            } else {
                opts = new OJStype.Option([]);
                for (j = 0; j < options.length; ++j) {
                    for (i = 0; i < options[j].length; ++i) {
                        opts1 = options[j][i];
                        opts2 = options[j][i + 1];
                        opts3 = new OJStype.Array(opts1);
                        if (opts2) {
                            opts3.replaceBy(opts2, { "write": "true", "append": "true" });
                            if (unique) {
                                opts = opts.unique(opts3);
                            } else {
                                opts[j] = (opts3);
                            }
=======
            // Option Arrays are array[s] of arrays that get merged in order
            var returnObject = Array(),
                optionsMerger = function(a, returnAsObjType, myOptions) {
                    var o, returnObject = Array();
                    for (i = 0; i < a.length; ++i) {
                        if (a[i + 1]) {
                            o = new OJStype.Array(a[i]);
                            //console.log(o = o.replaceBy(a[i + 1], myOptions));
                            o = o.replaceBy(a[i + 1], myOptions)
                            a[i + 1] = o;
>>>>>>> origin/master
                        }
                    }
                    for (i = 0; i < o.length; ++i) {
                        returnObject.push(o[i]);
                    }
                    return (returnAsObjType ? new OJStype.Option(o) : returnObject);
                };
            opts = optionsMerger(options, returnAsObjectType, myOptions);
            for (i = 0; i < opts.length; ++i) {
                returnObject.push(opts[i]);
            }
        }
        return (returnAsObjectType ? opts : returnObject);
    };
    return (this.options);
};


OJStype.Object = function(o) {
    // constructor
    this.object = new Object([]);
    if (o && o.constructor === Object) {
        this.object = new Object(o);
    } else if (o && o.constructor === String) {
        try {
            this.object = JSON.parse(o);
        } catch (err) {
            console.warn(' Invalid JSON string: "' + o + '" returning input.');
            this.object = String(o);
            return this.Object;
        }
    }
    // methods
    this.object.isObject = function(obj) {
        if (obj && obj.constructor === Object) {
            return true;
        } else {
            return false;
        }
    };
    this.object.mergeWith = function(obj) {
        var o1 = (this.isObject(this) ? this : JSON.parse(this));
        var o2 = (this.isObject(obj) ? obj : JSON.parse(obj));
        //console.log('o1 Props: ' + Object.getOwnPropertyNames(o1));
        //console.log('o2 Props: ' + Object.getOwnPropertyNames(o2));
        // initialize new object
        var object = new OJStype.Object();
        Object.keys(o1).forEach((key) => object[key] = o1[key]);
        Object.keys(o2).forEach((key) => object[key] = o2[key]);
        return (object);
    };
    this.object.toObject = function(str) {
        var object = {};
        if (str && str.constructor === String) {
            try {
                object = JSON.parse(str);
            } catch (err) {
                console.warn('Invalid JSON string: ' + str);
            }
        } else {
            return false;
        }
        return object;
    };
    return (this.object);
};


OJStype.String = function(s) {
    // constructor
    this.string = String();
    if (s && s.constructor === String) {
        this.string = String(s);
    }
    // methods
    this.string.isString = function(s) {
        if (s && s.constructor === String) {
            return true;
        } else {
            return false;
        }
    };
    this.string.toBoolean = function(s, c) {
        if (s && this.isString(s) && (s == "true" || s == c)) {
            return true;
        } else if (s && this.isString(s) && (s == "false" || s == c)) {
            return false;
        } else {
            return false;
        }
    };
    return (this.string);
};

OJStype.Number = function(i) {
    // constructor
    this.number = Number();
    if (i && i.constructor === Number) {
        this.number = Number(i);
    }
    this.number.isNumber = function(i) {
        if (typeof(i) !== 'boolean') {
            j = (i ? i : this);
            if (!isNaN(j)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    this.number.isOdd = function(i) {
        if (typeof(i) !== 'boolean') {
            j = (i ? i : this);
            if (!isNaN(j) && j % 2 !== 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    this.number.isEven = function(i) {
        if (typeof(i) !== 'boolean') {
            j = (i ? i : this);
            if (!isNaN(j) && j % 2 === 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    return (this.number);
};

OJStype.Array = function(a) {
    // constructor
    this.array = new Array([]);
    // see if some array been passed in and apply if so
    if (a && a.constructor === Array) {
        for (var i = 0; i < a.length; ++i) {
            this.array.push(a[i]);
        }
    }
    // Array Options
    this.array.Options = { "write": "false" }; // modify this.array when supported?

    this.array.unique = function(array) {
        this.concat(array);
        this.c = new OJStype.Array(this.concat(array));
        for (var i = 0; i < this.c.length; ++i) {
            for (var j = i + 1; j < this.c.length; ++j) {
                if (this.c[i] === this.c[j])
                    this.c.splice(j--, 1);
            }
        }
        return (this.c);
    };
    this.array.isArray = function(array) {
        if (array && (array.constructor == Array || (array instanceof Array))) {
            return true;
        } else {
<<<<<<< HEAD
            console.log('arrayIn is: ' + array.constructor);
            return false;
=======
            return false;
            //console.log('arrayIn is: ' + array.constructor);
>>>>>>> origin/master
        }
    };
    this.array.odd = function(w = false) {
        var a = new OJStype.Array();
        var n = new OJStype.Number();
        for (var i = 0; i < this.length; ++i) {
            if (n.isOdd(this[i])) {
                //build a new array with only odd elements
                if (w) a.push(this[i]);
            } else {
                //w(rite) this.array? if then remove even element
                if (w) this.splice(i--, 1);
            }
        }
        return (w ? this : a);
    };
    this.array.even = function(w = false) {
        var a = new OJStype.Array();
        var n = new OJStype.Number();
        for (var i = 0; i < this.length; ++i) {
            if (n.isEven(this[i])) {
                //build a new array with only even elements
                if (w) a.push(this[i]);
            } else {
                //w(rite) this.array? if then remove odd element
                if (w) this.splice(i--, 1);
            }
        }
        return (w ? this : a);
    };
    this.array.toArray = function(array, options) {
        //console.log('options.toString().split: ' + array.toString().split(',') + ' ' + array.length);
        return (Array(array.toString().split(',')) ? Array(array.toString().split(',')) : array.toString());
    };
    this.array.convertTo = function(value, options = { "returnType": "native" }) {
        var o, v = value;
<<<<<<< HEAD
        //console.log('converting value: ' + v);
=======
        console.log('converting value: ' + v);
>>>>>>> origin/master
        if (v && options.returnType == "native") {
            if (Number(v)) {
                o = Number(v);
            } else if ((v == "true" || v == "false")) {
                o = Boolean(v);
            } else {
                o = v;
            }
            console.log('converting ' + o);
            return (o);
        }
    };
<<<<<<< HEAD
    this.array.replaceBy = function(array, userOptions = {}) {
            var o, i;
            console.log('options.toString().split: ' + array.toString().split(',') + ' ' + array.length);
            var returnObject = Array();
            var str = new OJStype.String();
            var opt = new OJStype.Option();
            var defaultOptions = { "write": "true", "truncate": "false", "append": "false" };
            var arrayOptions = opt.mergeOptions([this.Options, defaultOptions, userOptions]);
            // parsing final options
            write = str.toBoolean(arrayOptions.write);
            append = str.toBoolean(arrayOptions.append);
            truncate = str.toBoolean(arrayOptions.truncate);
            returnAsObjectType = write;
            console.log('Final Array.replaceBy Options: "write" = ' + write + ' | "append" = ' + append + ' | "trunc" = ' + truncate);
            // returning Final Options to this.Options
            this.Options = arrayOptions;
            // start replacing array
            a = array.toString().split(',');
            //console.log('this.length: ' + this.length + " arrayIn.length: " + a.length);
            for (i = 0; i < this.length; ++i) {
                console.log(i + ' ' + ' this.array[' + i + ']: ' + this[i] + ' - arrayIn [' + i + ']: ' + a[i]);
                if (a[i] && typeof a[i] !== "undefined" && a[i] !== null) {
                    if (typeof a[i] === 'boolean') {
                        o = Boolean(a[i]);
                    }
                } else {
                    o = this.convertTo(a[i]);
                }
                if (write) {
                    this[i] = o;
                } else {
                    returnObject.push(o);
                }
            }
            if (append) {
                if (a.length > this.length) {
                    //console.log('Array: appending ' + (a.length - this.length) + ' element/s');
                    for (i = a.length + (this.length - a.length); i < a.length; ++i) {
                        if (typeof a[i] === 'boolean') {
                            Boolean(o = a[i]);
                        } else {
                            o = this.convertTo(a[i]);
                        }
                        if (write) {
                            this[i] = o;
                        } else {
                            returnObject.push(o);
                        }
                    }
                }
            }
            if (truncate) {
                if (a.length < this.length) {
                    //console.log('Array: truncating ' + (this.length - a.length) + ' element/s ' + returnObject.length);
                    for (i = this.length + (a.length - this.length); i < this.length; ++i) {
                        if (write) {
                            this.splice(i--, 1);
                        }
                    }
=======
    this.array.replaceBy = function(array, userOptions) {
        var o;
        //console.log('options.toString().split: ' + array.toString().split(',') + ' ' + array.length);
        var returnObject = Array();
        var str = new OJStype.String();
        var opt = new OJStype.Option();
        var defaultOptions = { "write": "true", "truncate": "false", "append": "false" };
        var arrayOptions = opt.mergeOptions([this.Options, defaultOptions, userOptions]);
        // parsing final options
        write = str.toBoolean(arrayOptions.write);
        append = str.toBoolean(arrayOptions.append);
        truncate = str.toBoolean(arrayOptions.truncate);
        returnAsObjectType = write;
        console.log('Final Array.replaceBy Options: "write" = ' + write + ' | "append" = ' + append + ' | "trunc" = ' + truncate);
        // returning Final Options to this.Options
        this.Options = arrayOptions;
        // start replacing array
        a = array.toString().split(',');
        //console.log('this.length: ' + this.length + " arrayIn.length: " + a.length);
        for (i = 0; i < this.length; ++i) {
            //console.log('Array replceBy Loop('i + '): ' + ' this.array[' + i + ']: ' + this[i] + ' - arrayIn [' + i + ']: ' + a[i]);
            if (a[i]) {
                if (Number(a[i])) {
                    o = Number(a[i]);
                } else if ((a[i] == "true" || a[i] == "false")) {
                    o = str.toBoolean(a[i]);
                } else {
                    o = a[i];
                }
                if (write) {
                    this[i] = o;
                } else {
                    returnObject[i] = o
                }
            } else {
                if (truncate && write) {
                    this.splice(i--, 1);
>>>>>>> origin/master
                }
            }
        }
        if (append) {
            if (a.length > this.length) {
                //console.log('Array: appending ' + (a.length - this.length) + ' element/s');
                for (var i = a.length + (this.length - a.length); i < a.length; ++i) {
                    if (Number(a[i])) {
                        o = Number(a[i]);
                    } else if ((a[i] == "true" || a[i] == "false")) {
                        o = str.toBoolean(a[i]);
                    } else {
                        o = a[i];
                    }
                    if (write) {
                        this.push(o);
                    } else {
                        returnObject.push(o);
                    }
                }
            }
        }
        return (returnAsObjectType ? this : returnObject);
    };
    this.array.equals = function(array) {
        // https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
        this.a = array;
        // if the other array is a falsy value, return
        if (!this.a || !this)
            return false;
        // compare lengths - can save a lot of time
        if (this.length != this.a.length)
            return false;
        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && this.a[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(this.a[i]))
                    return false;
            } else if (this[i] != this.a[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };
    // end of Array Objects
    return (this.array);
};