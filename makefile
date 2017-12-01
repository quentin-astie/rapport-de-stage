# This file is part of HTML2print.
#
# HTML2print is free software: you can redistribute it and/or modify it under the
# terms of the GNU Affero General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option) any
# later version.
#
# HTML2print is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
# PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
# details.
#
# You should have received a copy of the GNU Affero General Public License along
# with HTML2print.  If not, see <http://www.gnu.org/licenses/>.





# Avoids unexpected shell behaviors
SHELL := /usr/bin/env bash





#############
# Variables #
#############

# Finds content files
MARKDOWN_FILES = $(shell find content -type f -name '*.md' | sort)

# Computes the destination name of individual markdown files
HTML_FILES = $(patsubst content/%.md, build/html/%.html, $(MARKDOWN_FILES))

# Finds layout files
LAYOUT_FILES = $(shell find layout -type f -name '*.html')





#############
# Shortcuts #
#############

# use `make` or `make all` to generate everything we need
all: story json

# use `make story` to convert all the markdown files
story: build/html/story.html

# use `make json` to generate a json list of layouts (use in HTML2print interface)
json: build/js/src.json





############
# Recipies #
############

# converts from markdown to html individual files
build/html/%.html : content/%.md
	mkdir -p $(@D)
	# pandoc -f markdown -t html -o $@ $<
	python2 bin/md2html.py $< | \
	python2 bin/microtypo.py - $@


# concatenate individual html files into one big html file
build/html/story.html : $(HTML_FILES)
	cat $^ > $@


# generates a json list of layouts (used in HTML2print interface)
build/js/src.json : $(LAYOUT_FILES)
	mkdir -p $(@D)
	python2 bin/makejson.py --outfile $@ $^


# deletes the build directory
.PHONY: serve
serve:
	python2 bin/serveit.py


# deletes the build directory
.PHONY: clean
clean:
	rm -fr build
