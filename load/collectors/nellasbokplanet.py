#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .blog import *

if __name__ == "__main__":
    consume("http://nellasbocker.blogspot.se/feeds/posts/default", {'Accept': 'application/atom+xml'})

