$(document).ready(function () {
    $('#compare').mergely({
	   width: 'auto',
		  height: 'auto', // containing div must be given a height
		  cmsettings: { readOnly: true },
    });
	var lhs_url = 'lhs.txt';
	var rhs_url = 'rhs.txt'
	$.ajax({
        type: 'GET', async: true, dataType: 'text',
        url: lhs_url,
        success: function (response) {
			$('#path-lhs').text(lhs_url);
			$('#compare').mergely('lhs', response);
		}
    });
	$.ajax({
        type: 'GET', async: true, dataType: 'text',
        url: rhs_url,
		success: function (response) {
			$('#path-rhs').text(rhs_url);
			$('#compare').mergely('rhs', response);
		}
    });

	function checkFileList(files) {
        if (typeof window.FileReader !== 'function')
			error_msg("The file API isn't supported on this browser yet.");

		if (files.length>0) readFile(files[0], "lhs");
        if (files.length>1) readFile(files[1], "rhs");
    }

	function readFile(file, side) {
        var reader = new FileReader();
        reader.onload = function file_onload() {
		// document.getElementById('td1').innerHTML = ..
            $('#path-'+side).text(file.name);
			$('#compare').mergely(side, reader.result);
        }
        reader.readAsBinaryString(file);

    }
	
    function download_content(a, side) {
	   //a.innerHTML = "preparing content..";
        var txt = $('#compare').mergely('get', side);
        var datauri = "data:plain/text;charset=UTF-8," + encodeURIComponent(txt);
		a.setAttribute('download', side+".txt");
		a.setAttribute('href', datauri);
		//a.innerHTML = "content ready.";
	}
	
    document.getElementById('save-lhs').addEventListener('mouseover', function() { download_content(this, "lhs"); }, false);
    
    document.getElementById('save-rhs').addEventListener('mouseover', function() { download_content(this, "lhs"); }, false);
    document.getElementById('ignorews').addEventListener('change', function() {
        $('#compare').mergely('options', { ignorews: this.checked });
			}, false);

    });