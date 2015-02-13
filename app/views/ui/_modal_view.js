var ModalView = (function() {
    return Pillar.View.extend({
        init: function(opts)
        {

        },

        events: {
            "hidden.bs.modal": "modalHidden"
        },

        draw: function()
        {
            var html = this.template({});
            this.setElement(html);
        },

        modalHidden: function(e)
        {
            // When the modal fades out, we remove it from the DOM
            console.log("HIDDEN");
            this.remove();
        },

        hideModal: function()
        {
            this.$el.modal('hide');
        },

        showModal: function()
        {
            this.$el.modal({});
        }
    });
})();
