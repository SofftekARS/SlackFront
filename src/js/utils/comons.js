
 // Disable weekend selection
 function disabled(data) {
   var date = data.date,
     mode = data.mode;
   return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
 }

 function getDayClass(data) {
   var date = data.date,
     mode = data.mode;
   if (mode === 'day') {
     var dayToCheck = new Date(date).setHours(0,0,0,0);

     for (var i = 0; i < $scope.events.length; i++) {
       var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

       if (dayToCheck === currentDay) {
         return $scope.events[i].status;
       }
     }
   }

   return '';
 }
