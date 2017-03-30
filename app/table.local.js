'use strict';

var app = angular.module('customerAdminApp', []);
app.controller('customerAppController', ['$scope','$timeout', function ($scope, $timeout) {
    $scope.saved = localStorage.getItem('customerDetails');
    $scope.customerDetails = (localStorage.getItem('customerDetails') !== null) ? JSON.parse($scope.saved) : [
        {
            emailAddress: 'ckent@dailyplanet.com',
            firstName: 'Clark',
            lastName: 'Kent',
            phoneNumber: '434-215-1938',
            streetAddress: '',
            modified: false
        },
        {
            emailAddress: 'bwayne@wayneenterprises.com',
            firstName: 'Bruce',
            lastName: 'Wayne',
            phoneNumber: '272-720-1939',
            streetAddress: '7273 Palasaides Blvd, Gotham City, NY 10203',
            modified: false
        },
        {
            emailAddress: 'diana@themyscira.gov',
            firstName: 'Diana',
            lastName: 'Prince',
            phoneNumber: '',
            streetAddress: '',
            modified: false
        },
        {
            emailAddress: 'hal.jordan@usaf.gov',
            firstName: 'Hal',
            lastName: 'Jordan',
            phoneNumber: '514-651-1959',
            streetAddress: '',
            modified: false
        },
        {
            emailAddress: 'barry_allen@ccpd.gov',
            firstName: 'Barry',
            lastName: 'Allen',
            phoneNumber: '',
            streetAddress: '',
            modified: false
        }
    ];

    $scope.display = function() {
      $scope.displaySuccess = true;
      $timeout(function() {
        $scope.displaySuccess = false;
      }, 1500)
    };
    //Customer Info form
    $scope.addNew = function (customerDetail) {
        $scope.customerDetails.push({
            'emailAddress': customerDetail.emailAddress,
            'firstName': customerDetail.firstName,
            'lastName': customerDetail.lastName,
            'phoneNumber': customerDetail.phoneNumber,
            'streetAddress': customerDetail.streetAddress
        });
        localStorage.setItem('customerDetails', JSON.stringify($scope.customerDetails));
        $scope.displayMessage = "Record added successfully!";
        
       // Reset values for the "Customer Info" form upon successful submission
        $scope.customerDetail.emailAddress = null;
        $scope.customerDetail.firstName = null;
        $scope.customerDetail.lastName = null;
        $scope.customerDetail.phoneNumber = null;
        $scope.customerDetail.streetAddress = null;
        $scope.addUser.$setPristine();
        $scope.addUser.$setUntouched();
    };

    //Save changes to current records
    $scope.save = function (index) {
        var state = JSON.parse(localStorage.getItem('customerDetails'));
        state[index] = $scope.customerDetails[index];
        localStorage.setItem('customerDetails', JSON.stringify(state));
        $scope.displayMessage = "Record saved successfully!";

    };

    //Get index of record, set form to "dirty" if a checkbox is selected.  I do this because the ng-model/ng-checked pairing is weird with setting dirty.
    $scope.report = function (customerDetail, index) {
        $scope.customerDetails[index].selected = !$scope.customerDetails[index].selected;
        if ($scope.customerDetails[index].selected === true) {
          $scope.customerTable.$setDirty();
        }
    };

    //Check all the things!!
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.customerDetails, function (customerDetail) {
            customerDetail.selected = $scope.selectedAll;
        });
    };

    //Remove record(s)
    $scope.remove = function () {
        var newones = [];
        angular.forEach($scope.customerDetails, function (customerDetail) {
            if (!customerDetail.selected) {
                newones.push(customerDetail);
            }
        });
        $scope.customerDetails = newones;
        localStorage.setItem('customerDetails', JSON.stringify($scope.customerDetails));
        $scope.displayMessage = "Record removed successfully!";
    };

}]);
