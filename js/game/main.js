define(function (require) {
    var $ = require('jquery'),
        lib = require('./lib'),
        controller = require('./controller/controller'),
        model = require('./model/model');


    controller.setModel(model);
    $(function () {
        controller.render(lib.getBody());
    });
});