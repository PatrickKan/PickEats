from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Todo(models.Model):
    task = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User, related_name="todos", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task

class Preference(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    description = models.CharField(max_length=255)

class Profile(models.Model):
    """ More info about a user. Automatically created in register serializer when user is created.

    user, latitude, longitude, radius=5000,
    price_1=True, price_2=True, price_3=True, price_4=True
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    latitude = models.DecimalField(max_digits=22, decimal_places=16)
    longitude = models.DecimalField(max_digits=22, decimal_places=16)
    radius = models.IntegerField(default=5000, validators=[MinValueValidator(100), MaxValueValidator(40000)])
    price_1 = models.BooleanField(default=True)
    price_2 = models.BooleanField(default=True)
    price_3 = models.BooleanField(default=True)
    price_4 = models.BooleanField(default=True)
