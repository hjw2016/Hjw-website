define(["text!./select.html", "css!./select.css"], function(tpl) {
    return {
        template: tpl,
        props: {
            /**
             * Contains the currently selected value. Very similar to a
             * `value` attribute on an <input>. In most cases, you'll want
             * to set this as a two-way binding, using :value.sync. However,
             * this will not work with Vuex, in which case you'll need to use
             * the onChange callback property.
             * @type {Object||String||null}
             */
            value: {
                default: null
            },

            /**
             * An array of strings or objects to be used as dropdown choices.
             * If you are using an array of objects, vue-select will look for
             * a `label` key (ex. [{label: 'This is Foo', value: 'foo'}]). A
             * custom label key can be set with the `label` prop.
             * @type {Object}
             */
            options: {
                type: Array,
                default: [],
            },

            /**
             * Sets the max-height property on the dropdown list.
             * @deprecated
             * @type {String}
             */
            maxHeight: {
                type: String,
                default: '400px'
            },

            /**
             * Enable/disable filtering the options.
             * @type {Boolean}
             */
            searchable: {
                type: Boolean,
                default: true
            },

            /**
             * Equivalent to the `multiple` attribute on a `<select>` input.
             * @type {Object}
             */
            multiple: {
                type: Boolean,
                default: false
            },

            /**
             * Equivalent to the `placeholder` attribute on an `<input>`.
             * @type {Object}
             */
            placeholder: {
                type: String,
                default: ''
            },

            /**
             * Sets a Vue transition property on the `.dropdown-menu`. vue-select
             * does not include CSS for transitions, you'll need to add them yourself.
             * @type {String}
             */
            transition: {
                type: String,
                default: 'expand'
            },

            /**
             * Enables/disables clearing the search text when an option is selected.
             * @type {Boolean}
             */
            clearSearchOnSelect: {
                type: Boolean,
                default: true
            },

            /**
             * Tells vue-select what key to use when generating option
             * labels when each `option` is an object.
             * @type {String}
             */
            label: {
                type: String,
                default: 'label'
            },

            /**
             * An optional callback function that is called each time the selected
             * value(s) change. When integrating with Vuex, use this callback to trigger
             * an action, rather than using :value.sync to retreive the selected value.
             * @type {Function}
             * @default {null}
             */
            onChange: Function
        },

        data: function() {
            return {
                search: '',
                open: false,
                typeAheadPointer: -1,
            }
        },

        watch: {
            value: function(val, old) {
                this.onChange && val !== old ? this.onChange(val) : null
            },
            options: function() {
                this.$set('value', this.multiple ? [] : null)
            },
            multiple: function(val) {
                this.$set('value', val ? [] : null)
            },
            filteredOptions: function() {
                this.typeAheadPointer = 0;
            },
        },

        methods: {

            /**
             * Select a given option.
             * @param  {Object||String} option
             * @return {void}
             */
            select: function(option) {
                if (!this.isOptionSelected(option)) {
                    if (this.multiple) {

                        if (!this.value) {
                            this.$set('value', [option])
                        } else {
                            this.value.push(option)
                        }

                    } else {
                        this.value = option
                    }
                } else {
                    if (this.multiple) {
                        this.value.$remove(option)
                    }
                }

                this.onAfterSelect(option)
            },

            /**
             * Called from this.select after each selection.
             * @param  {Object||String} option
             * @return {void}
             */
            onAfterSelect: function(option) {
                if (!this.multiple) {
                    this.open = !this.open
                }

                if (this.clearSearchOnSelect) {
                    this.search = ''
                }

                // if( this.onChange ) {
                //   this.onChange(this.$get('value'))
                // }
            },

            /**
             * Toggle the visibility of the dropdown menu.
             * @param  {Event} e
             * @return {void}
             */
            toggleDropdown: function(e) {
                if (e.target === this.$els.openIndicator || e.target === this.$els.search || e.target === this.$els.toggle || e.target === this.$el) {
                    if (this.open) {
                        this.$els.search.blur() // dropdown will close on blur
                    } else {
                        this.open = true
                        this.$els.search.focus()
                    }
                }
            },

            /**
             * Check if the given option is currently selected.
             * @param  {Object||String}  option
             * @return {Boolean}         True when selected || False otherwise
             */
            isOptionSelected: function(option) {
                if (this.multiple && this.value) {
                    return this.value.indexOf(option) !== -1
                }

                return this.value === option;
            },

            /**
             * If the selected option has option['value'] return it.
             * Otherwise, return the entire option.
             * @param  {Object||String} option
             * @return {Object||String}
             */
            getOptionValue: function(option) {
                if (typeof option === 'object' && option.value) {
                    return option.value;
                }

                return option;
            },

            /**
             * Generate the option label text. If {option}
             * is an object, return option[this.label].
             *
             * @param  {Object || String} option
             * @return {String}
             */
            getOptionLabel: function(option) {
                if (typeof option === 'object') {
                    if (this.label && option[this.label]) {
                        return option[this.label];
                    } else if (option.label) {
                        return option.label
                    }
                }
                return option;
            },

            /**
             * Move the typeAheadPointer visually up the list by
             * subtracting the current index by one.
             * @return {void}
             */
            typeAheadUp: function() {
                if (this.typeAheadPointer > 0) this.typeAheadPointer--
            },

            /**
             * Move the typeAheadPointer visually down the list by
             * adding the current index by one.
             * @return {void}
             */
            typeAheadDown: function() {
                if (this.typeAheadPointer < this.filteredOptions.length - 1) this.typeAheadPointer++
            },

            /**
             * Select the option at the current typeAheadPointer position.
             * Optionally clear the search input on selection.
             * @return {void}
             */
            typeAheadSelect: function() {
                if (this.filteredOptions[this.typeAheadPointer]) {
                    this.select(this.filteredOptions[this.typeAheadPointer]);
                }

                if (this.clearSearchOnSelect) {
                    this.search = "";
                }
            },

            /**
             * If there is any text in the search input, remove it.
             * Otherwise, blur the search input to close the dropdown.
             * @return {[type]} [description]
             */
            onEscape: function() {
                if (!this.search.length) {
                    this.$els.search.blur()
                } else {
                    this.$set('search', '')
                }
            },

            /**
             * Delete the value on Delete keypress when there is no
             * text in the search input, & there's tags to delete
             * @return {this.value}
             */
            maybeDeleteValue: function() {
                if (!this.$els.search.value.length && this.value) {
                    return this.multiple ? this.value.pop() : this.$set('value', null)
                }
            }
        },

        computed: {

            /**
             * Classes to be output on .dropdown
             * @return {Object}
             */
            dropdownClasses: function() {
                return {
                    open: this.open,
                    searchable: this.searchable
                }
            },

            /**
             * Return the placeholder string if it's set
             * & there is no value selected.
             * @return {String} Placeholder text
             */
            searchPlaceholder: function() {
                if (this.isValueEmpty && this.placeholder) {
                    return this.placeholder;
                }
            },

            /**
             * The currently available options, filtered
             * by the search elements value.
             * @return {[type]} [description]
             */
            filteredOptions: function() {
                return this.$options.filters.filterBy(this.options, this.search)
            },

            /**
             * Check if there aren't any options selected.
             * @return {Boolean}
             */
            isValueEmpty: function() {
                if (this.value) {
                    if (typeof this.value === 'object') {
                        return !Object.keys(this.value).length
                    }
                    return !this.value.length
                }

                return true;
            },

            /**
             * Return the current value in array format.
             * @return {Array}
             */
            valueAsArray: function() {
                if (this.multiple) {
                    return this.value
                } else if (this.value) {
                    return [this.value]
                }

                return []
            }
        }
    }
})