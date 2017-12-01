Quick start
===========

This is my interning report at OSP using a boilerplate for the 17-18 program of la Balsamine Theatre, based on
HTML2print.

Licence
-------

This file is part of HTML2print.

HTML2print is free software: you can redistribute it and/or modify it under the
terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option) any
later version.

HTML2print is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License along
with HTML2print.  If not, see <http://www.gnu.org/licenses/>.


Pre-requisites
--------------

Make sure you have all the system-wide dependencies

    sudo apt-get update
    sudo apt-get install python-virtualenv

Install the python dependencies

    virtualenv venv
    source venv/bin/activate
    pip install -r requirements.txt

Generate the content

    make


Using HTML2print
----------------

Starts the serveur

    make serve

Visit the URL:

    http://localhost:8000
