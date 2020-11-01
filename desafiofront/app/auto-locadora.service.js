(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .service('autoLocadoraService', autoLocadoraService);

    autoLocadoraService.$inject = ['$http', 'constantes', 'helperFactory'];

    function autoLocadoraService($http, constantes, helper) {

        return {
            listar: listar
        }

        // ======================================

        function listar() {
        //     return Promise.resolve([
        //     {
        //         modelo: 'Gol',
        //         ano: 2020,
        //         marca: 'Volkswagen',
        //         placa: 'NSU 3569'
        //     },
        //     {
        //         modelo: 'Gol',
        //         ano: 2020,
        //         marca: 'Volkswagen',
        //         placa: 'NSU 3569'
        //     },
        //     {
        //         modelo: 'Gol',
        //         ano: 2020,
        //         marca: 'Volkswagen',
        //         placa: 'NSU 3569'
        //     }
        // ]);
            return $http.get(constantes.URL_BASE + '/carro')
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }

    }


})();