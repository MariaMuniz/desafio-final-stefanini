(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .controller('RegistroController', registroController);

    registroController.$inject = ['helperFactory', 'ClienteService'];

    function registroController(helper, service) {
        var vm = this;
        /* ***************    INIT VARIÁVEIS    *********************************** */
        // Array do exemplo do uso do 'ngOptions'
        // vm.tiposEmail = [
        //     { id: 1, desc: '@hotmail.com', disable: false, tipo: 'geral' },
        //     { id: 2, desc: '@outlook.com', disable: false, tipo: 'geral' },
        //     { id: 3, desc: '@gmail.com', disable: false, tipo: 'geral' },
        //     { id: 4, desc: '@stefanini.com', disable: false, tipo: 'corporativo' },
        //     { id: 5, desc: '@yahoo.com.br', disable: true, tipo: 'geral' },
        //     { id: 6, desc: '@empresa.com.br', disable: false, tipo: 'corporativo' },
        //     { id: 7, desc: '@teste.com', disable: true, tipo: 'corporativo' },
        // ];

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.go = helper.go;
        vm.registrar = registrar;

        function registrar() {
            const endereco = {
                logradouro: vm.endereco.logradouro,
                cep: vm.endereco.cep,
                complemento: vm.endereco.complemento,
                numero: vm.endereco.numero,
                bairro: vm.endereco.bairro,
                cidade: vm.endereco.cidade,
                uf: vm.endereco.uf
            }

            const novoCliente = {
                nome: vm.user.nome,
                email: vm.user.email,
                cpf: vm.user.cpf,
                cep: vm.user.cep,
                endereco: endereco
            };

            return service.registrar(novoCliente)
                .then(tratarRes);

            // Estou usando uma função declarada em vez de uma função anônima dentro do '.then(fn)'
            // Observe que essa função 'tratarRes' está dentro da função 'register'
            // Então ela só está disponível para ser usada dentro do escopo da
            // função 'register', caso tentar usa-la no contexto da controller
            // não vai funcionar porque vai dizer que não existe essa função
            function tratarRes(_resp) {
                if (_resp.error) {
                    helper.addMsg(_resp.msg, 'danger', 'Tente novamente');
                } else {
                    helper.addMsg(_resp.message, 'success');
                    helper.path('/home');
                    helper.setRootScope('userLogged', _resp.userLogged);
                }

            }
        }
        /* ***************    FUNÇÕES INSTERNAS    ******************************** */

    }

})();