#! /usr/bin/env python2
# -*- coding: utf-8 -*-


# Copyright (C) 2015 Alexandre Leray

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


# Converts Markdown files to HTML
#
# Usage:
#
#     ./generate.py infile.md outfile.html


import markdown


def md2html(src):
    """docstring for main"""
    extensions = [
        'extra',
        'meta',
        'figcaption',
    ]

    md = markdown.Markdown(output_format="html5", extensions=extensions)
    return md.convert(src)


if __name__ == '__main__':
    import argparse
    import sys

    parser = argparse.ArgumentParser()
    parser.add_argument('infile', nargs='?', type=argparse.FileType('r'), default=sys.stdin)
    parser.add_argument('outfile', nargs='?', type=argparse.FileType('w'), default=sys.stdout)
    args = parser.parse_args()

    content = args.infile.read()
    try:
        unicode_content = content.decode("utf-8")
    except UnicodeDecodeError:
        unicode_content = content.decode("iso8559-1")

    html = md2html(unicode_content)

    args.outfile.write(html.encode("utf-8"))
