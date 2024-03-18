from django.contrib.auth.models import User
from django.db import models

from profile_app.models import Profile


# Create your models here.
class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True, verbose_name='Active Status')

    class Meta:
        abstract = True


class Post(BaseModel):
    title = models.CharField(max_length=200, verbose_name='Post Tile')
    body = models.TextField(max_length=2000, verbose_name='Post Description')
    liked = models.ManyToManyField(User, blank=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title}"
