# Cherry

LIBRIS search hypothesis (MVP)

## The index

The elasticsearch parent records are stored in the cherry index as type 'record'. They are derived from LIBRIS XL records, focusing on fiction records.

### Create the index

There is a json file in the 'load/' directory (cherry\_es\_config.json) containing all required settings and mappings for the index. There are two ways to create the index.

Using python:

    $ python -m load.create_index --server <es host>

To see all available options, use the ```--help``` option.

Using curl:

    $ curl -XPOST http://<es host>:<es port>/<indexname>/ -d@load/cherry\_es\_config.json

### Load base data

The ```load.base``` module contains a query which selects records from the LIBRISXL index to use for cherry.

    $ python -m load.base --from <LIBRISXL es host> --xlindex <indexname> --to <cherry es host> --index <indexname (defaults to cherry)>

Default values for arguments assume a strictly localhost setup.

### Load blog data

The ```load.blog``` module loads data from blogs. There are a number of preconfigured feed urls in the module, but others can be added on the command line.

    $ python -m load.blog --server <es host> --blog <blogname or 'all' to load all> --feed <url to atom feed>

The ```--blog``` and ```--feed``` options are mutually exclusive.

## Miscellaneous

Run a converter manually:

    $ python -m convert.boktipset JSON_DATA_FILE

Optionally, look at it as Turtle:

    $ python -m convert.boktipset JSON_DATA_FILE | rdfpipe -ijson-ld:base=./,context=convert/context.jsonld -oturtle -

