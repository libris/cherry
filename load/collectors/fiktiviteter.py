#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .blog import *

if __name__ == "__main__":
    consume("http://www.fiktiviteter.se/feed/atom/?paged={page}", {'Accept': 'application/atom+xml'})
