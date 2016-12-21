'use strict';

var app = angular.module('customerAdminApp', []);
app.controller('customerAppController', ['$scope', function ($scope) {
    $scope.saved = localStorage.getItem('customerDetails');
    $scope.customerDetails = (localStorage.getItem('customerDetails') !== null) ? JSON.parse($scope.saved) : [
        {
            emailAddress : 'ckent@dailyplanet.com',
            firstName : 'Clark',
            lastName : 'Kent',
            phoneNumber : '434-215-1938',
            streetAddress : '',
            modified: false
        },
        {
            emailAddress : 'bwayne@wayneenterprises.com',
            firstName : 'Bruce',
            lastName : 'Wayne',
            phoneNumber : '272-720-1939',
            streetAddress : '7273 Palasaides Blvd, Gotham City, NY 10203',
            modified: false
        },
        {
            emailAddress : 'diana@themyscira.gov',
            firstName : 'Diana',
            lastName : 'Prince',
            phoneNumber : '',
            streetAddress : '',
            modified: false
        },
        {
            emailAddress : 'hal.jordan@usaf.gov',
            firstName: 'Hal',
            lastName: 'Jordan',
            phoneNumber: '514-651-1959',
            streetAddress : '',
            modified: false
        },
        {
            emailAddress : 'barry_allen@ccpd.gov',
            firstName : 'Barry',
            lastName : 'Allen',
            phoneNumber : '',
            streetAddress : '',
            modified: false
        }
    ];
    localStorage.setItem('customerDetails', JSON.stringify($scope.customerDetails));
    $scope.addNew = function (customerDetail) {
        $scope.customerDetails.push({
            'emailAddress' : customerDetail.emailAddress,
            'firstName' : customerDetail.firstName,
            'lastName' : customerDetail.lastName,
            'phoneNumber' : customerDetail.phoneNumber,
            'streetAddress' : customerDetail.streetAddress
        });
        $scope.PD = {};
        localStorage.setItem('customerDetails', JSON.stringify($scope.customerDetails));
    };

    $scope.save = function (index) {
        var state = JSON.parse(localStorage.getItem('customerDetails'));
        state[index] = $scope.customerDetails[index];
        localStorage.setItem('customerDetails', JSON.stringify(state));
    };
    
    $scope.remove = function () {
        var newones = [];
        angular.forEach($scope.customerDetails, function (customerDetail) {
            if (!customerDetail.selected) {
                newones.push(customerDetail);
            }
        });
        $scope.customerDetails = newones;
        localStorage.setItem('customerDetails', JSON.stringify($scope.customerDetails));
    };

    $scope.report = function (customerDetail, index) {
        $scope.customerDetails[index].selected = !$scope.customerDetails[index].selected;
    };

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
}]);