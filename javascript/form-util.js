// form-util.js provides form handling abstractions

function appendErrors(errorsData, $form, errorsSelector)
{
    for (var i in errorsData)
    {
        if (Array.isArray(errorsData[i]))
        {
            for (var j = 0; j < errorsData[i].length; j++)
            {
                $form.find(errorsSelector).append(errorsData[i][j]);
                $form.find(errorsSelector).append("<br>");
            }
        } else {
            $form.find(errorsSelector).append(errorsData[i]);
            $form.find(errorsSelector).append("<br>");
        }
        
        animate(errorsSelector, "fadeInUp");
    }
}