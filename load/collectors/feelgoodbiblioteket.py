#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .blog import *

if __name__ == "__main__":
    consume("http://feelgoodbiblioteket.com/feed/atom/", {'Accept': 'application/atom+xml'})


