#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .blog import *

if __name__ == "__main__":
    consume("http://feeds.feedburner.com/Kulturloggen", {'Accept': 'application/atom+xml'})



