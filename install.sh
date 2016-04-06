#!/bin/sh

RUBY_VERSION=$(ruby --version | sed 's/ruby \([0-9]\+\).*/\1/')

[ "$RUBY_VERSION" -ge 2 ] || {
  echo "You need to install Ruby, or upgrade to Ruby >= 2."
  exit 1
}

gem update
gem install bundler
bundle install

