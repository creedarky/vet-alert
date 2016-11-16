'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './especie.routes';

export class EspecieComponent {
    /*@ngInject*/
    especie = {
        nombre: '',
        nombre_comun: '',
        minPpm: '',
        maxPpm: '',
        minTemp: '',
        maxTemp: ''
    };

    errors = {};
    submitted = false;


    constructor(especieService, $state) {
        this.especieService = especieService;

        //this.$state = $state;
    }


    crearEspecie(form) {
        this.submitted = true;
        if (form.$valid) {
                this.especieService.save({
                nombreComun: this.especie.nombreComun,
                nombre: this.especie.nombre,
                minPpm: this.especie.minPpm,
                maxPpm: this.especie.maxPpm,
                minTemp: this.especie.minTemp,
                maxTemp: this.especie.maxTemp
            }).$promise.then(
                    this.submitted = false,
                    this.especie= {}
                )
                .catch(err => {
                    err = err.data;
                    this.errors = {};

                });


        }
    }
}

export default angular.module('webappApp.views.especie', [uiRouter])
    .config(routes)
    .component('especie', {
        template: require('./especie.html'),
        controller: EspecieComponent,
        controllerAs: 'vm'
    })
    .name;
