from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver

from .models import Profile


@receiver(post_save, sender=User)
def post_save_create_profile(sender, instance, created, *args, **kwargs):
    print('sender', sender)
    print('instance', instance)
    print('created', created)
    print('args', args)
    print('kwargs', kwargs)

    if created:
        print('we are creating profiles')
        Profile.objects.create(user=instance)
