from django.urls import path
from .views import post_list_and_create, hello_world_view, load_post_data_view

# from . import views

app_name = 'posts_app'

urlpatterns = [
    path('', post_list_and_create, name='post_index'),
    path('hello/', hello_world_view, name='simple'),
    path('load_post/', load_post_data_view, name='load_post'),
]
