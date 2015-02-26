// notifications.js

var notifications = new function()
{
    var self = this;

    self.bindRemoveLinks = function ()
    {
        $(".remove-notification").click( function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $menu = $( this ).closest(".dropdown-menu");
            console.log($menu);

            var $li = $( this ).closest("li");

            $.postWithCsrf("/notifications/remove/" + $li.attr("data-id"), {}, function (data) {
                if (!data.success)
                {
                    console.error("Notification " + $li.attr("data-id") + " could not be removed.");
                }
            })

            $li.remove();

            // Decrement the number of remaining notifications
            $( ".notification-badge" ).text(parseInt($( ".notification-badge" ).text()) - 1);

            // Remove the whole menu if there are none left
            if ($menu.children().length == 0)
            {
                $menu.remove();
                $( ".notifications" ).remove();
            }
        });
    };
}

module.exports = notifications;
