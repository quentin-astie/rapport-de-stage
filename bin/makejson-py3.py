#! /usr/bin/env python3


# Copyright (C) 2015-2017 Alexandre Leray (Open Source Publishing)

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.

# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.


# Generates a json to populate the HTML2Print drop-down menu
#
# Usage:
#
#     ./makejson.py -o out.json file1.html file2.html file3.html


import json


def make_json(infiles):
    src = {}

    for path in infiles:
        src[path.split("/")[1]] = path

    return json.dumps(src, sort_keys=True, indent=4)


if __name__ == '__main__':
    import argparse
    import sys

    parser = argparse.ArgumentParser()
    parser.add_argument('infiles', nargs='+', type=str, default=sys.stdin)
    parser.add_argument('-o', '--outfile', nargs='?', type=argparse.FileType('w'), default=sys.stdout)
    args = parser.parse_args()

    js = make_json(args.infiles)
    args.outfile.write(js)
