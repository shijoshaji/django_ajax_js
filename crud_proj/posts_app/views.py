from django.http import JsonResponse
from django.shortcuts import render
from django.core import serializers

from .models import Post


# Create your views here.
def post_list_and_create(request):
    qs = Post.objects.all()
    return render(request, 'posts/index.html', {'qs': qs})


def hello_world_view(request):
    print('here we are trying for a ajax call')

    return JsonResponse({'text': 'Hellowodie'})


def load_post_data_view(request):
    qs = Post.objects.all()
    data = serializers.serialize('json', qs)
    return JsonResponse({'data': data})
