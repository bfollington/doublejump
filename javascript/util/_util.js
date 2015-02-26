var util = new function()
{
    this.init = function()
    {
        // Shim for String.trunc()
        String.prototype.trunc = String.prototype.trunc ||
            function(n) {
                return this.length > n ? this.substr(0, n - 3)+'...' : this;
            };
    }

    // Extract a mongoId from a model
    this.getId = function(attrs)
    {

        // Use a Mongo Id if we don't have one already
        if (!attrs.id && attrs["_id"]["$oid"])
        {
            return attrs["_id"]["$oid"];
        } else {
            return attrs.id;
        }
    }

    this.definedIn = function(obj, variable)
    {
        return
    }

    this.defined = function(variable)
    {
        return typeof window[variable] != "undefined";
    }

    this.convertToSlug = function(text)
    {
        return text
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-');
    }

    this.convertToLowercase = function(text)
    {
        return text.toLowerCase();
    }

    this.supportsTransitions = function() {
        var b = document.body || document.documentElement,
            s = b.style,
            p = 'transition';

        if (typeof s[p] == 'string') { return true; }

        // Tests for vendor specific prop
        var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
        p = p.charAt(0).toUpperCase() + p.substr(1);

        for (var i=0; i<v.length; i++) {
            if (typeof s[v[i] + p] == 'string') { return true; }
        }

        return false;
    }

    this.isVisible = function($elem)
    {
        if ($elem.css("display") != "none" && $elem.css("visibility") != "hidden")
        {
            return true;
        } else {
            return false;
        }
    }

    this.insertTextAtCursor = function(text) {
        var sel, range, html;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode( document.createTextNode(text) );
            }
        } else if (document.selection && document.selection.createRange) {
            document.selection.createRange().text = text;
        }
    }

    this.saveSelection = function() {
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            return document.selection.createRange();
        }
        return null;
    }

    this.restoreSelection = function(range) {
        if (range) {
            if (window.getSelection) {
                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && range.select) {
                range.select();
            }
        }
    }

    this.findBootstrapEnvironment = function() {
        var envs = ["ExtraSmall", "Small", "Medium", "Large"];
        var envValues = ["xs", "sm", "md", "lg"];

        var $el = $('<div>');
        $el.appendTo($('body'));

        for (var i = envValues.length - 1; i >= 0; i--) {
            var envVal = envValues[i];

            $el.addClass('hidden-'+envVal);
            if ($el.is(':hidden')) {
                $el.remove();
                return envs[i]
            }
        };
    }

    this.getViewportWidth = function()
    {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    this.getViewportHeight = function()
    {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }

}

module.exports = util;
