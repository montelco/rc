(function ($, window, document) {
    "use strict";
    var pluginName = "accessibleMegaMenu",
        defaults = {
            uuidPrefix: "accessible-megamenu", // unique ID's are required to indicate aria-owns, aria-controls and aria-labelledby
            menuClass: "accessible-megamenu", // default css class used to define the megamenu styling
            topNavItemClass: "accessible-megamenu-top-nav-item", // default css class for a top-level navigation item in the megamenu
            panelClass: "accessible-megamenu-panel", // default css class for a megamenu panel
            panelGroupClass: "accessible-megamenu-panel-group", // default css class for a group of items within a megamenu panel
            hoverClass: "hover", // default css class for the hover state
            focusClass: "focus", // default css class for the focus state
            openClass: "open", // default css class for the open state
            openDelay: 0, // default open delay when opening menu via mouseover,
            debug: true
        },
        Keyboard = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            keyMap: {
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                190: "."
            }
        };
    
    function AccessibleMegaMenu(element, options) {
        this.element = element;

        // merge optional settings and defaults into settings
        this.settings = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.mouseTimeoutID = null;
        this.focusTimeoutID = null;
        this.mouseFocused = false;
        this.justFocused = false;

        this.init();
    }

    AccessibleMegaMenu.prototype = (function () {

        /* private attributes and methods ------------------------ */
        var uuid = 0,
            keydownTimeoutDuration = 1000,
            keydownSearchString = "",
            isTouch = typeof window.hasOwnProperty === "function" && !!window.hasOwnProperty("ontouchstart"),
            _getPlugin,
            _addUniqueId,
            _togglePanel,
            _clickHandler,
            _clickOutsideHandler,
            _DOMAttrModifiedHandler,
            _focusInHandler,
            _focusOutHandler,
            _keyDownHandler,
            _mouseDownHandler,
            _mouseOverHandler,
            _mouseOutHandler,
            _toggleExpandedEventHandlers,
            _log;

        /**
         * @name jQuery.fn.accessibleMegaMenu~_getPlugin
         * @desc Returns the parent accessibleMegaMenu instance for a given element
         * @param {jQuery} element
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _getPlugin = function (element) {
            return $(element).closest(':data(plugin_' + pluginName + ')').data("plugin_" + pluginName);
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_addUniqueId
         * @desc Adds a unique id and element.
         * The id string starts with the
         * string defined in settings.uuidPrefix.
         * @param {jQuery} element
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _addUniqueId = function (element) {
            element = $(element);
            var settings = this.settings;
            if (!element.attr("id")) {
                element.attr("id", settings.uuidPrefix + "-" + new Date().getTime() + "-" + (++uuid));
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_togglePanel
         * @desc Toggle the display of mega menu panels in response to an event.
         * The optional boolean value 'hide' forces all panels to hide.
         * @param {event} event
         * @param {Boolean} [hide] Hide all mega menu panels when true
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _togglePanel = function (event, hide) {
            _log("Toggling Panel")
            var target = $(event.target),
                that = this,
                settings = this.settings,
                menu = this.menu,
                topli;

            if (target.closest('.' + settings.panelClass).length === 1) {
                topli = $('.' + settings.topNavItemClass).eq($('.' + this.settings.panelClass).index(target.closest('.' + settings.panelClass)));
            } else {
                topli = target.closest('.' + settings.topNavItemClass);
            }

            var navbar = topli.parent();
            var panel = $('.' + this.settings.panelClass).eq(navbar.find('.' + this.settings.topNavItemClass).index(topli));

            var newfocus;

            _toggleExpandedEventHandlers.call(this, true);
            _log("Checking for hide flag");
            if (hide || !$('.has-children').children('ul.cd-secondary-nav').hasClass("is-hidden")) {

                _log("Hide flagged: Hiding all panels");
                topli = menu.find('.' + settings.topNavItemClass + ' .' + settings.openClass + ':first').closest('.' + settings.topNavItemClass);

                _log("Removing Classes from Navbar Parent");
                navbar.parent()
                    .find('[aria-expanded]')
                    .attr('aria-expanded', 'false')
                    .removeClass(settings.openClass)
                    .attr('aria-hidden', 'true');
                var selected = $('.has-children').children('ul.cd-secondary-nav');
                selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
                $('.cd-overlay').removeClass('is-visible');

                // end rcgc

                if ((event.type === 'keydown' && event.keyCode === Keyboard.ESCAPE) || event.type === 'DOMAttrModified') {
                    newfocus = topli.find(':tabbable:first');
                    setTimeout(function () {
                        menu.find('[aria-expanded].' + that.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
                        newfocus.focus();
                        that.justFocused = false;
                    }, 99);
                }
            } else if (topli.length === 0) {
                _log("Not Top Nav Link - removing Classes from Navbar Parent");

                navbar.parent.find('[aria-expanded=true]')
                    .attr('aria-expanded', 'false')
                    .removeClass(settings.openClass)
                    .filter('.' + settings.panelClass)
                    .attr('aria-hidden', 'true');

                // end rcgc

                navbar.parent
            }
            else {

                _log("Hide not flagged");

                navbar.parent()
                    .find('[aria-expanded]')
                    .attr('aria-expanded', 'false')
                    .removeClass(settings.openClass)
                    .attr('aria-hidden', 'true');

                panel.attr('aria-expanded', 'true')
                    .addClass(settings.openClass)
                    .attr('aria-hidden', 'false');


                if (event.type === 'mouseover' && target.is(':tabbable') && topli.length === 1 && panel.length === 0 && menu.has(document.activeElement).length > 0) {
                    target.focus();
                    that.justFocused = false;
                }

                _toggleExpandedEventHandlers.call(that);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_clickHandler
         * @desc Handle click event on mega menu item
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _clickHandler = function (event) {
            _log("Click handler called")

        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_clickOutsideHandler
         * @desc Handle click event outside of a the megamenu
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _clickOutsideHandler = function (event) {
            _log("Click outside Handler called");

        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_DOMAttrModifiedHandler
         * @desc Handle DOMAttrModified event on panel to respond to Windows 8 Narrator ExpandCollapse pattern
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _DOMAttrModifiedHandler = function (event) {

        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_focusInHandler
         * @desc Handle focusin event on mega menu item.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _focusInHandler = function (event) {
            _log("Focus IN handler called")
            clearTimeout(this.focusTimeoutID);
            var target = $(event.target),
                // rcgc
                // trigger focus on next element, show corresponding panel
                // panel = target.closest('.' + this.settings.panelClass);
                panel = $('.' + this.settings.panelClass).eq(this.menu.find('.' + this.settings.topNavItemClass).index(target.parent()));
            // rnd rcgc
            target
                .addClass(this.settings.focusClass)
                .on('click.accessible-megamenu', $.proxy(_clickHandler, this));
            this.justFocused = !this.mouseFocused;
            this.mouseFocused = false;
            if (this.panels.not(panel).filter('.' + this.settings.openClass).length) {
                _togglePanel.call(this, event);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_focusOutHandler
         * @desc Handle focusout event on mega menu item.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _focusOutHandler = function (event) {
            _log("Focus OUT handler called");

        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_keyDownHandler
         * @desc Handle keydown event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _keyDownHandler = function (event) {
            _log("Keyboard pressed");
            var that = (this.constructor === AccessibleMegaMenu) ? this : _getPlugin(this), // determine the AccessibleMegaMenu plugin instance
                settings = that.settings,
                target = $($(this).is('.' + settings.hoverClass + ':tabbable') ? this : event.target), // if the element is hovered the target is this, otherwise, its the focused element
                menu = that.menu,
                topnavitems = that.topnavitems,
                topli = target.closest('.' + settings.topNavItemClass),
                tabbables = menu.parent().find(':tabbable'),

                panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
                panelGroups = panel.find('.' + settings.panelGroupClass),
                currentPanelGroup = target.closest('.' + settings.panelGroupClass),
                currentPanelIndex = $('.' + settings.panelClass).index(panel),


                next,
                keycode = event.keyCode || event.which,
                start,
                i,
                o,
                label,
                found = false,
                newString = Keyboard.keyMap[event.keyCode] || '',
                regex,
                isTopNavItem = (topli.length === 1 && panel.length === 0);

            if (target.is("input:focus, select:focus, textarea:focus, button:focus")) {
                // if the event target is a form element we should handle keydown normally
                return;
            }

            if (target.is('.' + settings.hoverClass + ':tabbable')) {
                $('html').off('keydown.accessible-megamenu');
            }

            switch (keycode) {
                case Keyboard.ESCAPE:
                    _log("Keyboard ESCAPE Pressed");
                    _togglePanel.call(that, event, true);
                    break;

                case Keyboard.DOWN:
                    _log("Keyboard DOWN Pressed")
                    event.preventDefault();
                    if (isTopNavItem) {
                        _log("Top Nav Item Link")
                        _togglePanel.call(that, event);

                        found = (this.panels.eq(topli.parent().find('.' + settings.topNavItemClass).index(topli)).find(':tabbable:first').focus().length === 1);
                        // end rcgc
                    } else {
                        _log("Sub Nav Item Link")
                        found = (tabbables.filter(':gt(' + tabbables.index(target) + '):first').focus().length === 1);
                    }
                    break;


                case Keyboard.UP:
                    _log("Keyboard UP pressed")
                    event.preventDefault();
                    if (isTopNavItem && target.hasClass(settings.openClass)) {
                        _togglePanel.call(that, event, true);
                        next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                        if (next.children('.' + settings.panelClass).length) {
                            found = (next.children()
                                .attr('aria-expanded', 'true')
                                .addClass(settings.openClass)
                                .filter('.' + settings.panelClass)
                                .attr('aria-hidden', 'false')
                                .find(':tabbable:last')
                                .focus() === 1);
                        }
                    } else if (!isTopNavItem) {
                        var newFocusItem = tabbables.filter(':lt(' + tabbables.index(target) + '):last');
                        if (newFocusItem.parent().hasClass(settings.topNavItemClass)) {
                            newFocusItem = topnavitems.eq(currentPanelIndex).find('a');
                        }
                        found = (newFocusItem.focus().length === 1);
                    }

                    if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                        tabbables = $(':tabbable');
                        i = tabbables.index(target);
                        found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                    }
                    break;


                case Keyboard.RIGHT:
                    event.preventDefault();
                    if (isTopNavItem) {
                        found = (topnavitems.filter(':gt(' + topnavitems.index(topli) + '):first').find(':tabbable:first').focus().length === 1);
                    } else {
                        if (panelGroups.length && currentPanelGroup.length) {
                            // if the current panel contains panel groups, and we are able to focus the first tabbable element of the next panel group
                            found = (panelGroups.filter(':gt(' + panelGroups.index(currentPanelGroup) + '):first').find(':tabbable:first').focus().length === 1);
                        }

                        if (!found) {
                            found = (topli.find(':tabbable:first').focus().length === 1);
                        }
                    }
                    break;


                case Keyboard.LEFT:
                    event.preventDefault();
                    if (isTopNavItem) {
                        found = (topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last').find(':tabbable:first').focus().length === 1);
                    } else {
                        if (panelGroups.length && currentPanelGroup.length) {
                            // if the current panel contains panel groups, and we are able to focus the first tabbable element of the previous panel group
                            found = (panelGroups.filter(':lt(' + panelGroups.index(currentPanelGroup) + '):last').find(':tabbable:first').focus().length === 1);
                        }

                        if (!found) {
                            found = (topli.find(':tabbable:first').focus().length === 1);
                        }
                    }
                    break;


                case Keyboard.TAB:
                    i = tabbables.index(target);
                    if (event.shiftKey && isTopNavItem && target.hasClass(settings.openClass)) {
                        _togglePanel.call(that, event, true);
                        next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                        if (next.children('.' + settings.panelClass).length) {
                            found = next.children()
                                .attr('aria-expanded', 'true')
                                .addClass(settings.openClass)
                                .filter('.' + settings.panelClass)
                                .attr('aria-hidden', 'false')
                                .find(':tabbable:last')
                                .focus();
                        }
                    } else if (event.shiftKey && i > 0) {
                        found = (tabbables.filter(':lt(' + i + '):last').focus().length === 1);
                    } else if (!event.shiftKey && i < tabbables.length - 1) {
                        found = (tabbables.filter(':gt(' + i + '):first').focus().length === 1);
                    } else if (window.opera && opera.toString() === "[object Opera]") {
                        tabbables = $(':tabbable');
                        i = tabbables.index(target);
                        if (event.shiftKey) {
                            found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):last').focus().length === 1);
                        } else {
                            found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                        }
                    }

                    if (found) {
                        event.preventDefault();
                    }
                    break;

                case Keyboard.SPACE:
                    if (isTopNavItem) {
                        event.preventDefault();
                        _clickHandler.call(that, event);
                    } else {
                        return true;
                    }
                    break;

                case Keyboard.ENTER:
                    return true;
                    break;

                default:
                    // alphanumeric filter
                    clearTimeout(this.keydownTimeoutID);

                    keydownSearchString += newString !== keydownSearchString ? newString : '';

                    if (keydownSearchString.length === 0) {
                        return;
                    }

                    this.keydownTimeoutID = setTimeout(function () {
                        keydownSearchString = '';
                    }, keydownTimeoutDuration);

                    if (isTopNavItem && !target.hasClass(settings.openClass)) {
                        tabbables = tabbables.filter(':not(.' + settings.panelClass + ' :tabbable)');
                    } else {
                        tabbables = topli.find(':tabbable');
                    }

                    if (event.shiftKey) {
                        tabbables = $(tabbables.get()
                            .reverse());
                    }

                    for (i = 0; i < tabbables.length; i++) {
                        o = tabbables.eq(i);
                        if (o.is(target)) {
                            start = (keydownSearchString.length === 1) ? i + 1 : i;
                            break;
                        }
                    }

                    regex = new RegExp('^' + keydownSearchString.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'), 'i');

                    for (i = start; i < tabbables.length; i++) {
                        o = tabbables.eq(i);
                        label = $.trim(o.text());
                        if (regex.test(label)) {
                            found = true;
                            o.focus();
                            break;
                        }
                    }
                    if (!found) {
                        for (i = 0; i < start; i++) {
                            o = tabbables.eq(i);
                            label = $.trim(o.text());
                            if (regex.test(label)) {
                                o.focus();
                                break;
                            }
                        }
                    }
                    break;
            }
            that.justFocused = false;
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseDownHandler
         * @desc Handle mousedown event on mega menu.
         * @param {event} Event object
         * @memberof accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseDownHandler = function (event) {
            // rcgc mouseDown handled in main function
            // if ($(event.target).is(this.settings.panelClass) || $(event.target).closest(":focusable").length) {
            //     this.mouseFocused = true;
            // }
            // clearTimeout(this.mouseTimeoutID);
            // this.mouseTimeoutID = setTimeout(function () {
            //     clearTimeout(this.focusTimeoutID);
            // }, 1);
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseOverHandler
         * @desc Handle mouseover event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseOverHandler = function (event) {
            // rcgc mouseOver handled in main function
            // clearTimeout(this.mouseTimeoutID);
            // var that = this;
            // this.mouseTimeoutID = setTimeout(function () {
            //     $(event.target).addClass(that.settings.hoverClass);
            //     _togglePanel.call(that, event);
            //     if ($(event.target).is(':tabbable')) {
            //         $('html').on('keydown.accessible-megamenu', $.proxy(_keyDownHandler, event.target));
            //     }
            // }, this.settings.openDelay);
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseOutHandler
         * @desc Handle mouseout event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseOutHandler = function (event) {
            // rcgc mouseOut handled in main function
            // clearTimeout(this.mouseTimeoutID);
            // var that = this;
            // $(event.target)
            //     .removeClass(that.settings.hoverClass);

            // that.mouseTimeoutID = setTimeout(function () {
            //     _togglePanel.call(that, event, true);
            // }, 250);
            // if ($(event.target).is(':tabbable')) {
            //     $('html').off('keydown.accessible-megamenu');
            // }
        };

        _toggleExpandedEventHandlers = function (hide) {
            _log("Expanded Event Handler Called");
            var menu = this.menu;
            // if (hide) {
            //     $('html').off('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu');

            //     menu.find('[aria-expanded].' + this.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
            // } else {
            //     $('html').on('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu', $.proxy(_clickOutsideHandler, this));

            //     /* Narrator in Windows 8 automatically toggles the aria-expanded property on double tap or click.
            //        To respond to the change to collapse the panel, we must add a listener for a DOMAttrModified event. */
            //     menu.find('[aria-expanded=true].' + this.settings.panelClass).on('DOMAttrModified.accessible-megamenu', $.proxy(_DOMAttrModifiedHandler, this));
            // }
        };

        _log = function (msg) {
            if (msg) {
                //console.log(msg);
            }

        };

        /* public attributes and methods ------------------------- */
        return {
            constructor: AccessibleMegaMenu,

            /**
             * @lends jQuery.fn.accessibleMegaMenu
             * @desc Initializes an instance of the accessibleMegaMenu plugins
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            init: function () {
                var settings = this.settings,
                    nav = $(this.element),
                    // rcgc
                    // menu = nav.children().first(),
                    menu = nav.children().first(),
                    // end rcgc
                    topnavitems = menu.children();
                this.start(settings, nav, menu, topnavitems);
            },

            start: function (settings, nav, menu, topnavitems) {
                var that = this;
                this.settings = settings;
                this.menu = menu;
                this.topnavitems = topnavitems;

                nav.attr("role", "navigation");
                nav.addClass('testing_123');
                menu.addClass(settings.menuClass);
                topnavitems.each(function (i, topnavitem) {
                    var topnavitemlink, topnavitempanel;
                    topnavitem = $(topnavitem);
                    topnavitem.addClass(settings.topNavItemClass);
                    topnavitemlink = topnavitem.find(":tabbable:first");
                    topnavitempanel = topnavitem.children(":not(:tabbable):last");
                    _addUniqueId.call(that, topnavitemlink);
                    if (topnavitempanel.length) {
                        _addUniqueId.call(that, topnavitempanel);
                        topnavitemlink.attr({
                            // "aria-haspopup": true,
                            "aria-controls": topnavitempanel.attr("id"),
                            "aria-expanded": false
                        });

                        topnavitempanel.attr({
                            "role": "region",
                            "aria-expanded": false,
                            "aria-hidden": true
                        })
                            .addClass(settings.panelClass)
                            .not("[aria-labelledby]")
                            .attr("aria-labelledby", topnavitemlink.attr("id"));
                    }
                });

                this.panels = menu.parent().find("." + settings.panelClass);

                menu.parent().on("focusin.accessible-megamenu", ":focusable, ." + settings.panelClass, $.proxy(_focusInHandler, this))
                    .on("focusout.accessible-megamenu", ":focusable, ." + settings.panelClass, $.proxy(_focusOutHandler, this))
                    .on("keydown.accessible-megamenu", $.proxy(_keyDownHandler, this))
                    .on("mouseover.accessible-megamenu", $.proxy(_mouseOverHandler, this))
                    .on("mouseout.accessible-megamenu", $.proxy(_mouseOutHandler, this))
                    .on("mousedown.accessible-megamenu", $.proxy(_mouseDownHandler, this));

                if (isTouch) {
                    menu.on("touchstart.accessible-megamenu", $.proxy(_clickHandler, this));
                }

                menu.find("hr").attr("role", "separator");

                if ($(document.activeElement).closest(menu).length) {
                    $(document.activeElement).trigger("focusin.accessible-megamenu");
                }
            },

            /**
             * @desc Get default values
             * @example $(selector).accessibleMegaMenu("getDefaults");
             * @return {object}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getDefaults: function () {
                return this._defaults;
            },

            /**
             * @desc Get any option set to plugin using its name (as string)
             * @example $(selector).accessibleMegaMenu("getOption", some_option);
             * @param {string} opt
             * @return {string}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getOption: function (opt) {
                return this.settings[opt];
            },

            /**
             * @desc Get all options
             * @example $(selector).accessibleMegaMenu("getAllOptions");
             * @return {object}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getAllOptions: function () {
                return this.settings;
            },

            /**
             * @desc Set option
             * @example $(selector).accessibleMegaMenu("setOption", "option_name",  "option_value",  reinitialize);
             * @param {string} opt - Option name
             * @param {string} val - Option value
             * @param {boolean} [reinitialize] - boolean to re-initialize the menu.
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            setOption: function (opt, value, reinitialize) {
                this.settings[opt] = value;
                if (reinitialize) {
                    this.init();
                }
            }
        };
    }());

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new $.fn[pluginName].AccessibleMegaMenu(this, options));
            }
        });
    };

    $.fn[pluginName].AccessibleMegaMenu = AccessibleMegaMenu;

    /* :focusable and :tabbable selectors from
       https://raw.github.com/jquery/jquery-ui/master/ui/jquery.ui.core.js */

    /**
     * @private
     */
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
            return $.css(this, "visibility") === "hidden";
        }).length;
    }

    /**
     * @private
     */
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img,
            nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled :
                "a" === nodeName ?
                        element.href || isTabIndexNotNaN :
                        isTabIndexNotNaN) &&
                            // the element and all of its ancestors must be visible
                            visible(element);
    }

    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
            return function (elem) {
                return !!$.data(elem, dataName);
            };
        }) : // support: jQuery <1.8
                function (elem, i, match) {
                    return !!$.data(elem, match[3]);
                },

        focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },

        tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });
}(jQuery, window, document));
