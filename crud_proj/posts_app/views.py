from django.http import JsonResponse
from django.shortcuts import render
# from django.core import serializers

from .models import Post


# Create your views here.
def post_list_and_create(request):
    qs = Post.objects.all()
    return render(request, 'posts/index.html', {'qs': qs})


def hello_world_view(request):
    print('here we are trying for a ajax call', request)

    return JsonResponse({'text': 'Hello woodie'})


def load_post_data_view(request, num_of_posts):
    print('here we are trying for a ajax call load post', request)
    total_posts = Post.objects.all().count()
    qs = Post.objects.all()
    # qs = Post.objects.order_by('-id')

    # data = serializers.serialize('json', qs)

    visible_posts = 2
    upper_limit = num_of_posts
    lower_limit = upper_limit - visible_posts

    # data = []
    # for obj in qs:
    #     item = {
    #         'id': obj.id,
    #         'title': obj.title,
    #         'body': obj.body,
    #         'author': obj.author.user.username
    #     }
    #     data.append(item)
    # NOTE: Above code can be written using list comprehension

    data = [
        {
            'id': obj.id,
            'title': obj.title,
            'body': obj.body,
            'author': obj.author.user.username,
            'liked': request.user in obj.liked.all(),
            'likes_count': obj.like_counts,
        }
        for obj in qs
    ]
    if total_posts == len(data):
        return JsonResponse({'data': data[lower_limit:upper_limit], 'size': total_posts})
    return JsonResponse({'msg': 'Data exported is not right'})
