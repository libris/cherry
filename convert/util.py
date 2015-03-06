# -*- coding: UTF-8 -*-
from collections import OrderedDict, Callable
import json


def to_mapped_entity(source, *items):
    if not source:
        return
    entity = None
    for item in items:
        entity = entity or OrderedDict()
        if isinstance(item, str):
            key, dest = item, item
        else:
            key, dest = item
        copy(source, key, entity, dest)
    return entity

def copy(source, key, dest, dest_key=None):
    v = source.get(key)
    if v:
        if isinstance(dest_key, dict):
            for step, dest_key in dest_key.items():
                dest[step] = (dest_key(source, v)
                        if isinstance(dest_key, Callable)
                        else {dest_key: v})
        else:
            dest[dest_key or key] = v

def find_as_list(source, *key_path):
    step = source
    for key in key_path:
        step = step.get(key)
        if not step:
            return None
    return as_list(step)

def as_list(item):
    return [item] if item and not isinstance(item, list) else item or []

def add_non_empty(subj, key, obj):
    if isinstance(obj, list):
        subj.setdefault(key, []).extend(obj)
    elif isinstance(obj, dict):
        subj.setdefault(key, OrderedDict()).update(obj)

def typed(rtype, obj=None):
    o = OrderedDict({'@type': rtype})
    if obj:
        o.update(obj)
    return o

def main(converter, args):
    fpath = args.pop(0)
    with open(fpath) as fp:
        data = json.load(fp)
    result = converter(data)
    print json.dumps(result,
            sort_keys=False, indent=2, separators=(',', ': '),
            ensure_ascii=False).encode('utf-8')
