InpuText - A jQuery input field extension
================================

Easily turn any input field into an error-checking input field, complete with data types and custom patterns.

\<head\> section includes
---
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script type="text/javascript" src="inputext.js"></script>
	
Usage
---

	$('input').InpuText({ options });
	
Customization Options
---

**width**: (Default: '200px')
- Integer or string

**height**: (Default: '30px')
- Integer or string

**type**: (Default: 'text')
- 'text' or 'password' (Sets type input property)

**pattern**: (Default: '.?' - Accepts all characters and a blank field)
- Regex string

**patternErrMsg**: (Default: 'Pattern mis-match')
- String to display on pattern error

**placeholder**: (Default: '')
- String to display before typing in the field

**required**: (Default: false)
- Boolean (Sets required flag on input field - error will display if input is blank)

**maxLength**: (Default: -1 - No max length)
- Integer (Sets maxLength input property)

**readOnly**: (Default: false)
- Boolean (Sets readonly input property)

**disabled**: (Default: false)
- Boolean (Sets disabled input property)

**dataType**: (Default: 'string')
- 'string' (built in string regex)
- 'integer' (built in integer regex)
- 'real' (built in real number regex)
- 'hex' (built in hex number regex)

**target**: (Default: '')
- Selector string target for error message to display

**triggerOnLoad**: (Default: false)
- Boolean (Triggers keyup event on page load. Only works if there's not placeholder text)

Test File
---
Play around in inpuTextTest.html to see what these options can do.

Enjoy!