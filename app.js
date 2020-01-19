//code runs after the page has been loaded completely
$(document).ready(function(){

	//container element for graphics
	var canvas = document.getElementById('meme');
	//returns a drawing context on the canvas(in this case 2 dimensional rendering context)
	context = canvas.getContext('2d');

	//function that handles all the drawing
	var drawMeme = () => {
		var fontFamily = document.getElementById('font_family').value;
		var img = document.getElementById('start-image');
		var font = document.getElementById('text_font_size');
		var textColor = document.getElementById('text_color').value;
		console.log(textColor);
		var memeWidth = img.width;
		console.log(memeWidth)
		var memeHeight = img.height;
		var fontSize = parseInt(font.value);
		// set form field properties
		$('#text_top_offset').attr('max', memeHeight);
		$('#text_bottom_offset').attr('max', memeHeight);

		// initialize canvas element with desired dimensions
		canvas.width = memeWidth;
		canvas.height = memeHeight;
		
		//erases the pixels a rectangular area by setting them to transparent black
		context.clearRect(0, 0, canvas.width, canvas.height);

		//display the selected image on the canvas starting at the desired points on the x,y axis
		context.drawImage(img, 0, 0, memeWidth, memeHeight);
		
		context.font = fontSize + 'px' + "'" + fontFamily + "'";
		context.fillStyle = textColor;
		context.textAlign = 'center';
		context.textBaseline = 'top';
		//transform the text to upper case
		var topText = document.getElementById('text_top').value;
		topText = topText.toUpperCase();
		//start the line at the middle of the canvas on the x-axis
		x = memeWidth / 2;
		//start the line at the top of the canvas or, depends on the user's choice
		y = parseInt($('#text_top_offset').val());
		//the text spreads to only 85% of the width of the meme
		var maxTextAreaWidth = memeWidth * 0.85;
		var lineHeight = fontSize + 10;
		wrapText( context, topText, x, y, maxTextAreaWidth, lineHeight, false);


		//the text baseline is the bottom of the box/canvas
		context.textBaseline = 'bottom';
		var bottomText = document.getElementById('text_bottom').value;
		bottomText = bottomText.toUpperCase();
		y = parseInt( $('#text_bottom_offset').val() );
		wrapText( context, bottomText, x, y, maxTextAreaWidth, lineHeight,  true);


	};

	var wrapText = function( context, text, x, y, maxTextAreaWidth, lineHeight, fromBottom ){
		
		//unshift to add new elements at the beginning of the array and push to add elements to the beginning of the array
		if ( fromBottom ) {
			var pushMethod = 'unshift';
		} else {
			var pushMethod = 'push';
		}

		if ( fromBottom ) {
			lineHeight = -lineHeight;
		} else {
			lineHeight = lineHeight;
		}

		// lineHeight = (fromBottom) ? -lineHeight : lineHeight;
		//array to store a number of words that will fit into a line
		var lines = [];

		var y = y;
		var line = '';
		//splits the sentence in separate words
		//becomes an array of words
		var words = text.split(' ');

		for ( var n = 0; n < words.length; n++ ){
			//for every word in the array, devides them into separate variables
			var testline = line + ' ' + words[n];
			//checks the width in pixels of the words
			//returns an object
			var metrics = context.measureText(testline);
			//stores the width of the testline from the metrics object
			var testWidth = metrics.width;

			if ( testWidth > maxTextAreaWidth ){
				//pushes or unshifts the words from the lines
				lines[pushMethod](line);
				line = words[n] + ' ';
			} else {
				line = testline;
			}
		};	
		lines[pushMethod](line);
		console.log(lines);
		for (var k in lines ) {
			//draws the outlines of the characters of a text string at the specified coordinates
			context.strokeText( lines[k] , x , y + lineHeight * k);
			context.fillText( lines[k] , x , y + lineHeight * k);
		}	
	};

	//function that deals with image upload and display on the page
	var memeImg = document.getElementById('imgInp');
	//when a change is triggered on the input element
	memeImg.addEventListener( 'change' , function(){
		//stores the input element into a variable
		var input = this;
		

		// lets web applications asynchronously read the contents of files stored on the user's computer
		var reader = new FileReader();

		//event handler executed when the load event is fired
		reader.onload = function(event) {
			//console.log(event.target);
			var startImage = document.getElementById('start-image');
			startImage.src = event.target.result;
			startImage.setAttribute('crossorigin', 'anonymous');
		};

		reader.readAsDataURL(input.files[0]);
		//function fires after 0.7s
		window.setTimeout(function(){
			drawMeme();
		}, 700);
	});

	//event listeners on the inputs 
	
	//handles the top text input
	$(document).on('change', '#text_top', function() {
		drawMeme();
	});

	//handles the bottom text input
	$(document).on('change', '#text_bottom', function() {
		drawMeme();
	});

	//handles the text offset of top and bottom
	$(document).on('input change', '#text_top_offset', function() {
		$('#text_top_offset__val').text( $(this).val() );
		drawMeme();
	});

	$(document).on('input change', '#text_bottom_offset', function() {
		$('#text_bottom_offset__val').text( $(this).val() );
		drawMeme();
	});

	//handles the font size of the text
	$(document).on('input change', '#text_font_size', function() {
		$('#text_font_size__val').text( $(this).val() );
		drawMeme();
	});

	//handles the font of the text
	$(document).on('change', '#font_family', function() {
		drawMeme();
	});

	//	//handles the font of the text
	$(document).on('change', '#text_color', function() {
		drawMeme();
	});

	// downloads meme
	$('#download_meme').click(function(e){
		$(this).attr('href', canvas.toDataURL());
		$(this).attr('download', 'meme.png');
	});

	//initialize the function to fill the canvas with a certain picture at the beginning
	window.setTimeout(function(){
		drawMeme();
	}, 100);
	
});