var eventUtil = new function()
{
  this.stopEventPropagating = function(e)
  {
      if (!e)
        e = window.event;

      //IE9 & Other Browsers
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      //IE8 and Lower
      else {
        e.cancelBubble = true;
      }
  }

  this.eventTargetDoesNotInclude = function(event, element)
  {
      return ( $(event.target).closest(element).length == 0 );
  }
}

module.exports = eventUtil;
