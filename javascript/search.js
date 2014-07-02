var searchTerm = "", categoryFilter = "";

function bindDefinitionSearchField()
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

function bindCourseSearchField()
{

    $(".js-course-filter").keyup( function() {

        searchTerm = $(this).val().toLowerCase();

        filterCourses(searchTerm, categoryFilter);

        
    });

    $(".js-category-tag").click( function() {

        if ($(this).attr("data-selected") != "true")
        {
            categoryFilter = $(this).attr("data-category").toLowerCase();

            $(".js-category-tag").each( function() {
                $(this).css("background-color", $(this).attr("data-bg"));
                $(this).attr("data-selected", "false");
            });

            $(this).css("background-color", $(this).attr("data-bg-selected"));
            $(this).attr("data-selected", "true");

            
        } else {
            categoryFilter = "";
            $(this).css("background-color", $(this).attr("data-bg"));
            $(this).attr("data-selected", "false");
        }

        filterCourses(searchTerm, categoryFilter);

    });

}

function filterCourses(searchTerm, categoryFilter)
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

bindCourseSearchField();
bindDefinitionSearchField();