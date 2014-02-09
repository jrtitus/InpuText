/*********************************************
InpuText - A jQuery input field extension

Copyright (c) 2014 Jeffrey Titus

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***********************************************/
(function($){
	var methods = {
		init: function(options){
			var settings = $.extend({
				'width':'200px',
				'height':'30px',
				'type':'text',			// Marks the text field as being a textfield or a password field (default: text)
				'pattern':'.?',			// Makes the text field adhere to a pattern. Only works if dataType = string (default: accepts all characters and blank field)
				'placeholder':'',		// Assigns default text (the text you see before you type) (default: none)
				'required':false,		// Designates the text field as a required field (default:false)
				'maxLength':-1,			// Defines a maxlength attribute for the text field (default: no max length)
				'readonly':false,		// Marks the text field as readonly or r/w (default: r/w)
				'disabled':false,		// Marks the text field as disabled or enabled (default: enabled)
				'dataType':'string',	// String, integer, real, hex (default: string)
				'target':'',			// Element the error message will be loaded into on keyup event (default: no target)
				'triggerOnLoad': false	// Triggers keyup on page load. Will only work if there's no default text set (default: false)
			}, options);

			return this.each(function(){
				var _errorMsg = '';


				$(this).on('iT_error', function(){
					$(settings.target).html($(this).attr('data-err'));
				});


				$(this).keyup(function(){
					if($(this).val() === '' && settings.required){
						setInError(this);
						_errorMsg = 'Required field is blank';
					}else if(!$(this).val().match(settings.pattern) && $(this).val() !== '' && settings.dataType === 'string'){
						setInError(this);
						_errorMsg = 'Pattern mis-match';
					}else if($(this).val() !== '' && settings.dataType === 'integer' && !$(this).val().match(/^[0-9]+$/)){
						setInError(this);
						_errorMsg = 'Field value is not an Integer';
					}else if($(this).val() !== '' && settings.dataType === 'real' && !$(this).val().match(/^\d+$|^\.\d+$|^\d+\.\d+$/)){
						setInError(this);
						_errorMsg = 'Field value is not a Real (0.0)';
					}else if($(this).val() !== '' && settings.dataType === 'hex' && !$(this).val().match(/^0x[0-9a-fA-F]+$/)){
						setInError(this);
						_errorMsg = 'Field value is not a Hex number (0x...)';
					}else{
						setSuccessful(this);
						_errorMsg = '';
					}

					if(settings.target.length > 0){
						//Puts error message as a property in the text field and fires an 'iT_error' event to be caught elsewhere
						$(this).attr('data-err',_errorMsg).trigger('iT_error');
					}


				})
				.focus(function(){
					if($(this).val() === settings.placeholder){
						$(this).val('')
						.css('color', '#333')
						.prop('type', settings.type);
					}
				})
				.blur(function(){
					if($(this).val() === ''){
						$(this).val(settings.placeholder)
						.css('color', '#AAA')
						.prop('type', 'text');
					}
				})
				.css({'border-radius':'5px', 'color':'#AAA', 'padding-left':'5px'})
				.width(settings.width)
				.height(settings.height)
				.prop('type', 'text')
				.val(settings.placeholder)
				.after('<span style="display:inline-block;margin-left:7px;vertical-align:middle;border:0;background:#FFF;"><span></span></span>');

				if(settings.maxLength > -1){
					$(this).prop('maxlength', settings.maxLength)
				}

				if(settings.readonly){
					$(this).attr('readonly', 'readonly');
				}

				if(settings.disabled){
					$(this).attr('disabled', 'disabled');
				}

				//Not all that useful, but I'll keep it here
				if(settings.triggerOnLoad && settings.placeholder === ''){
					$(this).trigger('keyup');
				}
			});
		},
		hide: function(){
			return this.each(function(){
				$(this).hide();
			});
		},
		show: function(){
			return this.each(function(){
				$(this).show();
			});
		},
		destroy : function() {
			return this.each(function(){
				$(this).off('keyup');
				$(this).off('focus');
				$(this).off('blur');
				$(this).off('iT_error');
				$(this).remove();
			});
		}
	};

	var setInError = function(tf){
		$(tf).addClass('ui-state-error')
		.next('span').addClass('ui-state-error')
		.children().eq(0).addClass('ui-icon ui-icon-alert');
	};

	var setSuccessful = function(tf){
		$(tf).removeClass('ui-state-error')
		.next('span').removeClass('ui-state-error')
		.children().eq(0).removeClass('ui-icon ui-icon-alert');
	};

	$.fn.InpuText = function(method){
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.InpuText' );
		}
	};
})(jQuery);