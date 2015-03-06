# -*- coding: UTF-8 -*-
from .util import *


def to_jsonld(source):
    result = typed('ItemPage')
    copy(source, 'source', result, {'publisher': 'name'})

    answer = source['answer']
    book = result['item'] = typed('Book')
    copy(answer, 'bookid', book, 'id')
    copy(answer, 'url', book)
    copy(answer, 'name', book)
    copy(answer, 'image', book)

    add_non_empty(book, 'isbn',
            list(set(find_as_list(answer, 'isbns', 'isbn'))))

    add_non_empty(book, 'author',
            to_mapped_entity(answer,
                ('author_id', 'id'),
                ('author_link', 'url'),
                ('author_name', 'name')))

    add_non_empty(book, 'genre', [
            typed('Intangible', genre)
            for genre in find_as_list(answer, 'genres', 'genre')])

    article_link = 'describedBy'#'article'
    review_link = 'describedBy'#'review'
    comment_link = 'describedBy'#'comment'

    saga = answer.get('saga')
    if saga:
        add_non_empty(book, article_link, [
                OrderedDict([
                    ('@type', 'Article'),
                    ('textHTML', saga),
                    ('publisher', {'name': 'saga'})]) ])

    add_non_empty(book, article_link, [
            typed('BlogPosting', to_mapped_entity(blog,
                ('link', 'url'),
                ('title', 'name'),
                ('source', {'publisher': 'name'})))
            for blog in find_as_list(answer, 'blogs')])

    add_non_empty(book, article_link, [
            typed('Review', to_mapped_entity(review,
                ('link', 'url'),
                ('source', {'publisher': 'name'})))
            for review in find_as_list(answer, 'paper_reviews', 'item')])

    add_non_empty(book, article_link, [
            typed('Review', to_mapped_entity(review,
                ('title', 'name'),
                ('text', {'textHTML':
                    lambda o, v: v.replace('&lt;', '<').replace('&gt;', '>')}),
                ('grade', {'rating': 'ratingValue'}),
                ('member', {'creator': lambda o, v:
                    typed('Person', to_mapped_entity(o,
                        ('member', 'id'),
                        ('membername', 'name'),
                        ('memberimage', 'image')))})))
            for review in find_as_list(answer, 'reviews', 'review')])

    # NOTE: find_as_list(answer, 'events', 'event') is only a partial union of
    # 'comments' and 'graders', structured differently (and with more detail
    # for 'time'). Since its partial, we use the latter lists instead.

    add_non_empty(book, comment_link, [
            typed('Comment', to_mapped_entity(comment,
                'text',
                ('time', 'dateCreated'),
                ('member', {'creator': lambda o, v: typed('Person', v)}),
                ('grade', {'rating': 'ratingValue'})))
            for comment in find_as_list(answer, 'comments', 'bookcomments', 'bookcomment')])

    add_non_empty(book, comment_link, [
            typed('Comment', to_mapped_entity(comment,
                ('id', {'creator':
                    lambda o, v: typed('Person', to_mapped_entity(o,
                        'id', 'name', 'image'))}),
                ('grade', {'rating': lambda o, v: {'ratingValue': v['value']}})))
            for comment in find_as_list(answer, 'graders', 'member')])

    add_non_empty(book, 'workExample', [
            "urn:isbn:%s" % isbn
            for isbn in set(find_as_list(answer, 'related_isbns', 'isbn'))])

    add_non_empty(book, 'isSimilarTo', [
            typed('Book', to_mapped_entity(book,
                'url', 'name', 'id',
                ('grade_average', 'aggregateRating')))
            for book in find_as_list(answer, 'similarbooks', 'books', 'book')])

    return result


if __name__ == '__main__':
    import sys
    main(to_jsonld, sys.argv[1:])
