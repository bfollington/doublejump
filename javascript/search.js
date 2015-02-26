var search = new function()
{
    var self = this;

    self.searchTerm = "";
    self.categoryFilter = "";

    self.bindDefinitionSearchField = function()
    {

        $(".js-definition-filter").keyup( function() {

            var searchTerm = $(this).val().toLowerCase();

            $(".definition-block").each( function() {
                var
                definitionTerm = $(this).attr("data-definition-name").toLowerCase(),
                show = false;

                if ( definitionTerm.indexOf(searchTerm) >= 0 || searchTerm.indexOf(definitionTerm) >= 0 )
                {
                    show = true;
                }

                if (show)
                {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }

            });


        });

    }

    self.bindCourseSearchField = function()
    {

        $(".js-course-filter").keyup( function() {

            self.searchTerm = $(this).val().toLowerCase();

            self.filterCourses(self.searchTerm, self.categoryFilter);


        });

        $(".js-category-tag").click( function() {

            if ($(this).attr("data-selected") != "true")
            {
                self.categoryFilter = $(this).attr("data-category").toLowerCase();

                $(".js-category-tag").each( function() {
                    $(this).css("background-color", $(this).attr("data-bg"));
                    $(this).attr("data-selected", "false");
                });

                $(this).css("background-color", $(this).attr("data-bg-selected"));
                $(this).attr("data-selected", "true");


            } else {
                self.categoryFilter = "";
                $(this).css("background-color", $(this).attr("data-bg"));
                $(this).attr("data-selected", "false");
            }

            self.filterCourses(self.searchTerm, self.categoryFilter);

        });

    }

    self.filterCourses = function(searchTerm, categoryFilter)
    {

        $(".course-block").each( function() {
            var
            categoryName = $(this).attr("data-category-name").toLowerCase(),
            courseName = $(this).attr("data-course-name").toLowerCase(),
            show = false;

            if (   courseName.indexOf(searchTerm) >= 0
                || searchTerm.indexOf(courseName) >= 0
                || categoryName.indexOf(searchTerm) >= 0
                || searchTerm.indexOf(categoryName) >= 0)
            {
                show = true;
            }

            if ( categoryName.indexOf(categoryFilter) == -1 )
            {
                show = false;
            }

            if (show)
            {
                $(this).parent().show();
            } else {
                $(this).parent().hide();
            }

        });
    }
}

module.exports = search;
