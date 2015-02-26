var payment = require("payment_validation");

var PaymentDetails = new function()
{
    this.run = function(opts)
    {
        payment.init();
    }
}

module.exports = PaymentDetails;
