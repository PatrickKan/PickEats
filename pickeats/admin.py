from django.contrib import admin
from .models import Preference, Profile, Allergy, Goal

admin.site.register(Preference)
admin.site.register(Profile)
admin.site.register(Allergy)
admin.site.register(Goal)