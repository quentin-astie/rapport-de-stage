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


;(function(undefined) {
    // http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
    function callAjax(url, callback){
        var xmlhttp;
        // compatible with IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                // CHANGE WINDOW TITLE WITH FILENAME
                var windowTitle = /\/.+\/(.+).html/.exec(url);
                top.document.title = windowTitle[1];
                callback(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    // loads stories
    var stories = document.querySelectorAll('article[data-src]');

    for (var i = 0, l = stories.length; i < l; i ++) {
        var v = stories[i];
        var src = v.dataset.src;
        var cb = v.dataset.cb;

        callAjax(src, function(data) {
            v.innerHTML = data;

            if (cb) {
                eval(cb);
            }
        });
    }
})();

;(function(undefined) {
    if (! Modernizr.regions) {
        console.log('no support for css regions; loading the polyfill');
        var script = document.createElement('script');
        script.setAttribute('src', '../../vendors/css-regions-polyfill-custom-medor.js');
        document.getElementsByTagName('head')[0].appendChild(script);
    };
})();
