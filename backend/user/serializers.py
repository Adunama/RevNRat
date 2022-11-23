from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('pk', 'first_name', 'last_name', 'email', 'classroom')

