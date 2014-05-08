function appendErrors(errorsData, $form, errorsSelector)
{
    for (var i in errorsData)
    {
        $form.find(errorsSelector).append(errorsData[i]);
        $form.find(errorsSelector).append("<br>");
        animate(errorsSelector, "fadeInUp");
    }
}