var app = angular.module('fileCompare', []);
app.controller('ctrl', function($scope) {
    $scope.file1 = null;
    $scope.file2 = null;
    
    $scope.getFile1 = function(obj){
        $scope.file1 = obj.files[0];
        console.log("sd");
    }
    
    $scope.getFile2 = function(obj){
        $scope.file2 = obj.files[0];
    }
    
    $scope.compare = function(){
        $scope.readFile($scope.file1, "lhs");
        $scope.readFile($scope.file2, "rhs");        
    }
    
    $scope.readFile = function(file, side) {
        var reader = new FileReader();
        reader.onload = function file_onload() {
		// document.getElementById('td1').innerHTML = ..
            $('#path-'+side).text(file.name);
			$('#compare').mergely(side, reader.result);
        }
        reader.readAsBinaryString(file);

    }
});

$(document).ready(function () {
    $('#compare').mergely({
        width: 'auto',
        height: 'auto', // containing div must be given a height
        cmsettings: { readOnly: true },
    });
});
