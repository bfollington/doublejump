var paymentValidation = new function()
{
    this.init = function init()
    {
        if (typeof Stripe == "undefined" || typeof jQuery.payment == "undefined")
        {
            console.error("Payment Validation has a hard dependency on the Stripe API and the jQuery Payment Plugin.");
            return;
        }

        Stripe.setPublishableKey('#{stripe_publishable_key}');

        $('#cc_num').payment('formatCardNumber');
        $('#cc_cvc').payment('formatCardCVC');
        $('#cc_expire').payment('formatCardExpiry');

        $("#cc_expire").keyup( function() {
            var expiry = $(this).payment('cardExpiryVal');

            $("#cc_exp_month").val(expiry.month);
            $("#cc_exp_year").val(expiry.year);
        });

        $('#editAccountSettingsForm').submit(function(event) {
            var $form = $(this);

            // Disable the submit button to prevent repeated clicks
            $form.find('button').prop('disabled', true);

            Stripe.card.createToken($form, stripeResponseHandler);

            // Prevent the form from submitting with the default action
            return false;
        });

        function stripeResponseHandler(status, response) {
            var $form = $('#editAccountSettingsForm');

            if (response.error) {
                // Show the errors on the form
                $form.find('.payment-errors').text(response.error.message);
                $form.find('button').prop('disabled', false);
            } else {
                // response contains id and card, which contains additional card details
                var token = response.id;
                // Insert the token into the form so it gets submitted to the server
                $form.append($('<input type="hidden" name="stripeToken" />').val(token));
                // and submit
                $form.get(0).submit();
            }
        };
    }
}

