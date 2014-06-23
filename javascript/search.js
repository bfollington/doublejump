var searchTerm = "", categoryFilter = "";

function bindCourseSearchField()
{

    $(".js-course-filter").keyup( function() {

        searchTerm = $(this).val().toLowerCase();

        filterCourses(searchTerm, categoryFilter);

        
    });

    $(".js-category-tag").click( function() {
        categoryFilter = $(this).attr("data-category").toLowerCase();

        $(".js-category-tag").each( function() {
            $(this).css("background-color", $(this).attr("data-bg"));
        });

        $(this).css("background-color", $(this).attr("data-bg-selected"));

        filterCourses(searchTerm, categoryFilter);

    });

}

function filterCourses(searchTerm, categoryFilter)
{
    console.log(searchTerm, categoryFilter);

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