/**
 *
 * Javascript Utility Functions for APEX and other Web Application Frameworks
 *
 * @created Oct 2017
 *
 * @author Stefan Obermeyer
 *
 * @version 0.1.0 24.10.2017 SOB: created
 * @version 1.0.0 28.10.2017 SOB: added Array.replace and Array.equals
 *
 **/

/**
 * @namespace OJSutils (O's Javascript Utilities 2017/11/01)
 * 
 **/
var OJSutils = {};

/**
 * @class Logger
 *
 * @param {String}  m     Message to be logged to console.
 * @param {Boolean} d     Debug (local) to be set in functions to support granular debugging.
 * @param {String}  l     Log Level of Message ( [I]nfo, [W]arning, [D]ebug, [E]rror - Default: console.log = Info ).
 * @param {Boolean} s     Supress Message, no matter what is set as localDebug, globalDebug and if Force Logging is false
 * @param {Boolean} f     Force Logging: log message, no matter what is set as localDebug or globalDebug or supressMessage!
 *
 * @memberof OJSutils.Logger
 * 
 * @function log          logs Message m to standard console output.
 * @param {Array}   opts  Options Array to determine, if message will be logged [localDebug, supressMessage, forceLogging].
 *                        Uses global variable gDebug as last evaluation point to enable quick debugging.
 *
 * @requires OJStypes
 *
 **/

/**
 *
 * @example
 *
 * // Create a new instance of Logger
 * var $log = new OJSutils.Logger();
 *
 * // call function log with Debug enforced (true) and logLevel "WARNING" (W)
 * $log.log("Hello", "W");
 *
 * // default loglevel (null = info) and setting localDebug = true
 * $log.log("You again:-)", null, [true]);
 *
 * // logLevel "ERROR" (E) and forceLogging = true
 * $log.log("You again:-)", "E", [null, null, true])
 *
 **/

// global Debug
var gDebug = false;

// global Force Logging
var gForce = false;

OJSutils = (function() {
    /** Class Logger **/
    var Logger = function() {
        this.message = null;
        this.loglevel = "I";
        this.localDebug = false;
        this.supressLog = false;
        this.forceLogging = false;
    };
    /** Logger Class Methods **/
    Logger.prototype = {
        log: function(m, l, userOptions) {
            this.message = m;
            this.loglevel = l;
            //this.options = [false, false, false];
            //this.Options = this.array.replace(this.options, opts);
            this.defaultOptions = new OJStype.Array([false, false, false]);
            if (userOptions) {
                this.Options = this.defaultOptions.replaceBy(userOptions);
            } else {
                this.Options = this.defaultOptions;
            }
            this.localDebug = this.Options[0];
            this.supressLog = this.Options[1];
            this.forceLogging = this.Options[2];
            //private methods
            this.ConsoleOut = function(m) {
                if (this.loglevel) {
                    switch (this.loglevel) {
                        case "W":
                            console.warn(m);
                            break;
                        case "E":
                            console.error(m);
                            break;
                        case "D":
                            console.debug(m); // synonym for log (behaves differently in browsers)
                            break;
                        default:
                            console.log(m); // if using I(nfo) or unknown
                    }
                } else {
                    console.log(m);
                }
            };
            // here we check for supressLog first, since it can only be overridden by forceLogging.
            if ((typeof this.supressLog !== "undefined" && this.supressLog == true ?
                    this.forceLogging :
                    (this.localDebug || gDebug)
                )) {
                this.ConsoleOut(this.message);
            }
        }
    };
    // end of method (more classes and methods can be appended with semicolons as separator)

    /** return class objects **/
    return {
        Logger: Logger
    };
})();