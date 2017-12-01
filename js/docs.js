/**
 * This file is part of HTML2print.
 * 
 * HTML2print is free software: you can redistribute it and/or modify it under the
 * terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 * 
 * HTML2print is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License along
 * with HTML2print.  If not, see <http://www.gnu.org/licenses/>.
 */


window.HTML2print = window.HTML2print || {};


(function(undefined) {
    'use strict';


    // http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
    function callAjax(url, callback){
        var xmlhttp;
        // compatible with IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                // CHANGE WINDOW TITLE WITH FILENAME
                //var windowTitle = /\/.+\/(.+).json/.exec(url);
                //top.document.title = windowTitle[1];
                callback(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }


    HTML2print.Docs = function() {};

    HTML2print.Docs.prototype.initialize = function(src) {
        this.src = src || {};

        var viewport = document.getElementById("viewport");
        var toolbar = document.getElementById("toolbar");
        var select = document.createElement('select');
        select.setAttribute('name', 'documents');

        for (var key in this.src) {
            var elt = document.createElement("option");
            elt.setAttribute('value', this.src[key]);
            var txt = document.createTextNode(key);
            elt.appendChild(txt);
            select.appendChild(elt);
        }

        toolbar.insertBefore(select, toolbar.firstChild);

        // restores last document or loads the first one
        var hash = window.location.hash;
        if (hash && hash.substring(0,2) === "#!") {
            var src = hash.substring(2);
            viewport.src = src; 
            select.value = src;
        } else {
            var stateObj = { doc: select.value };
            window.history.pushState(stateObj, "", "#!" + select.value);
            viewport.src = select.value;
        };

        // push to history when on changes document
        select.addEventListener("change", function(event) {
            var stateObj = { doc: this.value };
            window.history.pushState(stateObj, "", "#!" + this.value);
            viewport.src = this.value;
        });
    }

    callAjax("build/js/src.json", function(data) {
        var src = JSON.parse(data);
        var docs = new HTML2print.Docs;
        docs.initialize(src);
    });
})();
