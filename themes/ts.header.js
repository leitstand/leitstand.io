/*
	*
	* Header & Mega-Dropdown
	* Description:
	*
	* @copyright triplesense
	* @author Fabian Schultz-Fademrecht, Sebastian G. Marinescu
	* @version 1.0
	*
	*/

(function ($) {
    'use strict';

    $.widget('ts.header', $.ts.base, {

        // options
        options: {
            cartAmountSelector: '.header__icon--cart-amount'
        },

        /**
         * Constructor
         */
        _create: function () {
            this.activeClass = 'header__navigation__link--active';
            this.$activeLink = null;
            this.$collapsibleDump = $('#accordionDump');
            this.cdIsOpen = false;
            this.$navWrapper = $('.header__navigation-wrapper');

            this._bindEvents();
        },

        /**
         * Bind events
         */
        _bindEvents: function () {
            this.element.find('.header__burger--check').on('change.header', $.proxy(this._toggleState, this));
            this.element.find('.header__navigation__sub__closer').on('click.header', $.proxy(this._closeSubMenu, this));
            this.element.find('.header__navigation__link').on('click.header', $.proxy(this._checkActiveState, this));
            this.element.find('.header__accordion > .header__navigation__link').on('click.header', $.proxy(this._checkAccordion, this));
        },

        _toggleState: function (e) {
            var checked = $(e.currentTarget).is(':checked');
            this.element.find('.header__burger').toggleClass('header__burger--open', checked);
        },

        _closeSubMenu: function (e) {
            var $activeCheckbox = $(e.currentTarget).parents('.header__navigation-wrapper').find('input:checked');
            $activeCheckbox.removeAttr('checked');
            this._resetActiveState();
            this._resetCollapsibleDump();
        },

        _checkActiveState: function(e) {
            var $clickedLink = $(e.currentTarget),
                $checkboxSibling = $clickedLink.siblings('input[type=checkbox]');

            if ($checkboxSibling.length === 0) {
                return;
            }

            if ($clickedLink.hasClass(this.activeClass) && $clickedLink.parents('.header__navigation').length === 1) {
                this._resetActiveState();
                this._resetCollapsibleDump();
                return;
            }

            if ($clickedLink.hasClass(this.activeClass) && $clickedLink.parents('.header__navigation').length > 1) {
                $clickedLink.removeClass(this.activeClass);
                return;
            }

            if (!this.$activeLink) {
                this.$activeLink = this.$navWrapper.find('.' + this.activeClass);
                this.$activeLink.removeClass(this.activeClass);
            } else {
                if ($clickedLink.parents('.header__navigation').length > 1) {
                    $clickedLink.parents('.header__navigation').eq(0).find('.' + this.activeClass).removeClass(this.activeClass);
                }
            }

            $clickedLink.addClass(this.activeClass);
        },

        _resetActiveState: function() {
            this.$navWrapper.find('[data-toggle=collapse').each(function (index, el) {
                $(el.hash).collapse('hide');
            });
            this.$navWrapper.find('.' + this.activeClass).removeClass(this.activeClass);
            this.$activeLink.addClass(this.activeClass);
        },

        _checkAccordion: function(e) {
            var self = this,
                $clickedLink = $(e.currentTarget),
                $checkboxSibling = $clickedLink.siblings('input[type=checkbox]'),
                $accordionContent = $clickedLink.siblings('.header__accordion-content');

            if (window.innerWidth < 1200) {
                return;
            }

            // reset on mobile vp change?

            if ($accordionContent.length === 0) {
                return;
            }

            if ($accordionContent.length !== 0 && $clickedLink.hasClass(this.activeClass)) {

                if (this.cdIsOpen) {
                    this._resetCollapsibleDump();
                    this.$collapsibleDump.one('hidden.bs.collapse', function () {
                        setTimeout(function () {
                            self._openCollapsibleDump($accordionContent);
                        }, 1)
                    });
                } else {
                    this._openCollapsibleDump($accordionContent);
                }


            } else {
                this._closeCollapsibleDump();
            }
        },

        _openCollapsibleDump: function($accordionContent) {
            this.$collapsibleDump.html($accordionContent.clone());

            this.$collapsibleDump.find('label').each(function () {
                this.setAttribute('for', 'cd-' + this.getAttribute('for'));
            });
            this.$collapsibleDump.find('input[type=checkbox]').each(function () {
                this.id = 'cd-' + this.id;
            });

            this.$collapsibleDump.collapse('show');
            this.cdIsOpen = true;
        },

        _closeCollapsibleDump: function() {
            this.$collapsibleDump.collapse('hide');
            this.cdIsOpen = false;
        },

        _resetCollapsibleDump: function() {
            var self = this;

            if (this.cdIsOpen) {
                this._closeCollapsibleDump();
            }
        },

        // External function to update cart count
        cartCount: function (count) {
            var $cartAmountSelector = this.element.find(this.options.cartAmountSelector),
                newCount = count || 0;

            $cartAmountSelector.find('amount').text(newCount);
            (newCount > 0) ? $cartAmountSelector.addClass('header__icon--cart-amount--active') : $cartAmountSelector.removeClass('header__icon--cart-amount--active');
        },

        /**
         * Destroy everything
         */
        _destroy: function () {

        }
    });

})(jQuery);
