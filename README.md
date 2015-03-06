# Cherry

LIBRIS search hypothesis (MVP)

## Miscellaneous

Run a converter manually:

    $ python -m convert.boktipset JSON_DATA_FILE

Optionally, look at it as Turtle:

    $ python -m convert.boktipset JSON_DATA_FILE | rdfpipe -ijson-ld:base=./,context=convert/context.jsonld -oturtle -

