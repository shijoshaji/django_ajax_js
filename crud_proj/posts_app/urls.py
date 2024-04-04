from django.urls import path
from .views import post_list_and_create, hello_world_view, load_post_data_view, like_unlike_post_view

# from . import views

app_name = 'posts_app'

urlpatterns = [
    path('', post_list_and_create, name='post_index'),
    path('like_unlike/', like_unlike_post_view, name='like_unlike'),
    path('hello/', hello_world_view, name='simple'),
    path('load_post/<int:num_of_posts>/', load_post_data_view, name='load_post'),

]
